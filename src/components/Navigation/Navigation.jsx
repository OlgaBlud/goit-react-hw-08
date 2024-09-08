import { useSelector } from "react-redux";
import css from "./Navigation.module.css";
import { selectAuthIsLoggedIn } from "../../redux/auth/selectors";
import { NavLink } from "react-router-dom";

export const Navigation = () => {
  const isLoggedIn = useSelector(selectAuthIsLoggedIn);
  return (
    <nav>
      <NavLink className={css.link} to="/">
        Home Page
      </NavLink>
      {isLoggedIn && (
        <NavLink className={css.link} to="/contacts">
          Contacts Page
        </NavLink>
      )}
    </nav>
  );
};

{
  /* //       {isLogedIn ? (
    //         <NavLink to="/contacts">Contacts Page</NavLink>
    //       ) : (
    //         <>
    //           <NavLink to="/login">Login Page</NavLink>
    //           <NavLink to="/register">Registration Page</NavLink>
    //         </>
    //       )} */
}
