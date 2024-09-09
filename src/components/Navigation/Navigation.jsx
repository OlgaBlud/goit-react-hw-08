import { useSelector } from "react-redux";
import css from "./Navigation.module.css";
import { selectAuthIsLoggedIn } from "../../redux/auth/selectors";
import { NavLink } from "react-router-dom";

export const Navigation = () => {
  const isLoggedIn = useSelector(selectAuthIsLoggedIn);
  return (
    <nav className={css.navigation}>
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
