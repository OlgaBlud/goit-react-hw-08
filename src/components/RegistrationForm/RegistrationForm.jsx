import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";

import css from "./RegistrationForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/auth/operations";
import { selectAuthError } from "../../redux/auth/selectors";

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const error = useSelector(selectAuthError);

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const RegisterFormValidationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Required!")
      .min(2, "Too Short!")
      .max(50, "Too Long!"),
    email: Yup.string().email("Invalid email").required("Email is required!"),
    password: Yup.string()
      .required("Password is required!")
      .min(8, "Password must contain at least 8 characters")
      .max(100, "Password must be less than 100 characters"),
  });
  const handleFormSubmit = (value) => {
    dispatch(register(value));
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleFormSubmit}
      validationSchema={RegisterFormValidationSchema}
    >
      <Form className={css.form}>
        <label className={css.label}>
          <span>Enter your name</span>
          <Field type="text" name="name" placeholder="Simon" />
          <ErrorMessage
            className={css.errorText}
            name="name"
            component="span"
          />
        </label>
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

        <button className={css.submitBtn} type="submit">
          Sign Up
        </button>
        {error && (
          <p className={css.errorText}>Oops, some error occurred... {error}</p>
        )}
      </Form>
    </Formik>
  );
};

export default RegistrationForm;
