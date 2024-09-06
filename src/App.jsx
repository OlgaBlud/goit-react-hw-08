import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import ContactForm from "./components/ContactForm/ContactForm";
import ContactList from "./components/ContactList/ContactList";
import SearchBox from "./components/SearchBox/SearchBox";
import { selectContacts } from "./redux/contactsSlice";
import { useEffect } from "react";
import { fetchContacts } from "./redux/contactsOps";

function App() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector(selectContacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className="phonebookWrap">
      <h1>Phonebook</h1>
      {loading && <h2>Loading...</h2>}
      {error && <h2>{error}</h2>}
      <ContactForm />
      <SearchBox />
      {items.length > 0 && <ContactList />}
    </div>
  );
}

export default App;
