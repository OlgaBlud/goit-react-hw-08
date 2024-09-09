import { useDispatch, useSelector } from "react-redux";
import ContactForm from "../components/ContactForm/ContactForm";
import ContactList from "../components/ContactList/ContactList";
import SearchBox from "../components/SearchBox/SearchBox";

import { fetchContacts } from "../redux/contacts/operations";
import { useEffect } from "react";
import { selectContacts } from "../redux/contacts/selectors";
import toast, { Toaster } from "react-hot-toast";

const ContactsPage = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector(selectContacts);

  useEffect(() => {
    dispatch(fetchContacts())
      .unwrap()
      .then(() => {
        toast.success("Phonebook loaded successfully!");
      });
  }, [dispatch]);
  return (
    <>
      {loading && <h2>Loading...</h2>}
      {error && <h2>{error}</h2>}
      <Toaster />
      <ContactForm />
      <SearchBox />

      {items.length > 0 ? (
        <ContactList />
      ) : (
        <p>You don&apos;t have contacts yet!</p>
      )}
    </>
  );
};

export default ContactsPage;
