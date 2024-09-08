import "./App.css";

import { lazy, Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { NavLink, Route, Routes } from "react-router-dom";
import {
  selectAuthIsLoggedIn,
  selectAuthIsRefreshing,
} from "./redux/auth/selectors";
import { refreshUser } from "./redux/auth/operations";
import { RestrictedRoute } from "./components/RestrictedRoute";
import { PrivateRoute } from "./components/PrivateRoute";

const HomePage = lazy(() => import("./pages/HomePage"));
const RegistrationPage = lazy(() => import("./pages/RegistrationPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const ContactsPage = lazy(() => import("./pages/ContactsPage"));

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);
  const isLogedIn = useSelector(selectAuthIsLoggedIn);
  const isRefreshing = useSelector(selectAuthIsRefreshing);
  console.log("isLogedIn", isLogedIn);
  console.log("isRefreshing", isRefreshing);
  if (isRefreshing) {
    return <div>User is refreshing. Please wait.</div>;
  } else
    return (
      <div className="phonebookWrap">
        <header>
          <nav className="navigation">
            <NavLink to="/">Home Page</NavLink>
            {isLogedIn ? (
              <NavLink to="/contacts">Contacts Page</NavLink>
            ) : (
              <>
                <NavLink to="/login">Login Page</NavLink>
                <NavLink to="/register">Registration Page</NavLink>
              </>
            )}
          </nav>
        </header>
        <main>
          <Suspense fallback={<div>Loading ...</div>}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/register"
                element={<RestrictedRoute component={<RegistrationPage />} />}
              />
              <Route
                path="/login"
                element={<RestrictedRoute component={<LoginPage />} />}
              />
              <Route
                path="/contacts"
                element={<PrivateRoute component={<ContactsPage />} />}
              />
            </Routes>
          </Suspense>
        </main>
      </div>
    );
}

export default App;

// const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
// const RegisterPage = lazy(() => import("../pages/RegisterPage/RegisterPage"));
// const LoginPage = lazy(() => import("../pages/LoginPage/LoginPage"));
// const TasksPage = lazy(() => import("../pages/TasksPage/TasksPage"));

// export const App = () => {
//   const dispatch = useDispatch();
//   const isRefreshing = useSelector(selectIsRefreshing);

//   useEffect(() => {
//     dispatch(refreshUser());
//   }, [dispatch]);

//   return isRefreshing ? (
//     <b>Refreshing user...</b>
//   ) : (
//     <Layout>
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route
//           path="/register"
//           element={
//             <RestrictedRoute redirectTo="/tasks" component={<RegisterPage />} />
//           }
//         />
//         <Route
//           path="/login"
//           element={
//             <RestrictedRoute redirectTo="/tasks" component={<LoginPage />} />
//           }
//         />
//         <Route
//           path="/tasks"
//           element={
//             <PrivateRoute redirectTo="/login" component={<TasksPage />} />
//           }
//         />
//       </Routes>
//     </Layout>
//   );
// };
