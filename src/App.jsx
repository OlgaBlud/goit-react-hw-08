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
import { Layout } from "./components/Layout";

const HomePage = lazy(() => import("./pages/HomePage"));
const RegistrationPage = lazy(() => import("./pages/RegistrationPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const ContactsPage = lazy(() => import("./pages/ContactsPage"));

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);
  // const isLogedIn = useSelector(selectAuthIsLoggedIn);
  const isRefreshing = useSelector(selectAuthIsRefreshing);
  // console.log("isLogedIn", isLogedIn);
  // console.log("isRefreshing", isRefreshing);

  return isRefreshing ? (
    <div>User is refreshing. Please wait.</div>
  ) : (
    <Layout>
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
    </Layout>

    // <div className="phonebookWrap">
    //   <header>
    //     <nav className="navigation">
    //
    //     </nav>
    //   </header>
  );
}

export default App;

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
