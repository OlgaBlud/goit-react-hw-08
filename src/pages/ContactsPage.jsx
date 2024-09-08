import { useDispatch, useSelector } from "react-redux";
import ContactForm from "../components/ContactForm/ContactForm";
import ContactList from "../components/ContactList/ContactList";
import SearchBox from "../components/SearchBox/SearchBox";
import { selectContacts } from "../redux/contacts/slice";
import { fetchContacts } from "../redux/contacts/operations";
import { useEffect } from "react";

const ContactsPage = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector(selectContacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  return (
    <>
      {loading && <h2>Loading...</h2>}
      {error && <h2>{error}</h2>}
      <ContactForm />
      <SearchBox />
      {items.length > 0 && <ContactList />};
    </>
  );
};

export default ContactsPage;
