import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";

import css from "./LoginForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/auth/operations";
import { selectAuthError } from "../../redux/auth/selectors";

const LoginForm = () => {
  const dispatch = useDispatch();
  const error = useSelector(selectAuthError);
  console.log(error);
  const initialValues = {
    email: "",
    password: "",
  };

  const loginFormValidationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required!"),
    password: Yup.string()
      .required("Password is required!")
      .min(8, "Password must contain at least 8 characters")
      .max(100, "Password must be less than 100 characters"),
  });
  const handleFormSubmit = (value) => {
    // console.log(value);
    dispatch(login(value));
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleFormSubmit}
      validationSchema={loginFormValidationSchema}
    >
      <Form className={css.form}>
        <label className={css.label}>
          <span>Email</span>
          <Field
            type="text"
            name="email"
            placeholder="test.example@gmail.com"
          />
          <ErrorMessage
            className={css.errorText}
            name="email"
            component="span"
          />
        </label>

        <label className={css.label}>
          <span>Password</span>
          <Field
            type="password"
            name="password"
            placeholder="Enter your password"
          />
          <ErrorMessage
            className={css.errorText}
            name="password"
            component="span"
          />
        </label>

        <button
          //   disabled={Object.keys(errors).length > 0}
          className={css.submitBtn}
          type="submit"
        >
          Log In
        </button>
        {error && <div className={css.errorText}>Some error occurred. </div>}
      </Form>
    </Formik>
  );
};

export default LoginForm;
