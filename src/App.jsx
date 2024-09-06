import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import ContactForm from "./components/ContactForm/ContactForm";
import ContactList from "./components/ContactList/ContactList";
import SearchBox from "./components/SearchBox/SearchBox";
import { selectContacts } from "./redux/contacts/slice";
import { lazy, Suspense, useEffect } from "react";
import { fetchContacts } from "./redux/contacts/operations";
import { NavLink, Route, Routes } from "react-router-dom";

const HomePage = lazy(() => import("./pages/HomePage"));
const ContactsPage = lazy(() => import("./pages/ContactsPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegistrationPage = lazy(() => import("./pages/RegistrationPage"));
function App() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector(selectContacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className="phonebookWrap">
      <header>
        <nav className="navigation">
          <NavLink to="/">Home Page</NavLink>
          <NavLink to="/contacts">Contacts Page</NavLink>
          <NavLink to="/login">Login Page</NavLink>
          <NavLink to="/register">Registration Page</NavLink>
        </nav>
      </header>
      <main>
        <h1>Phonebook</h1>
        {loading && <h2>Loading...</h2>}
        {error && <h2>{error}</h2>}
        <ContactForm />
        <SearchBox />
        {items.length > 0 && <ContactList />}
        <Suspense fallback={<div>Loading ...</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/contacts" element={<ContactsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegistrationPage />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}

export default App;
