import { useDispatch, useSelector } from "react-redux";
import Contact from "../Contact/Contact";
import css from "./ContactList.module.css";
import { selectFilteredContacts } from "../../redux/contactsSlice";

import { deleteContact } from "../../redux/contactsOps";

const ContactList = () => {
  const dispatch = useDispatch();
  const filteredContacts = useSelector(selectFilteredContacts);

  if (filteredContacts.length === 0) {
    return;
  }

  return (
    <ul className={css.contactList}>
      {filteredContacts.map(({ id, name, number }) => {
        return (
          <Contact
            key={id}
            id={id}
            name={name}
            phone={number}
            deleteContacts={(contactId) => {
              dispatch(deleteContact(contactId));
            }}
          />
        );
      })}
    </ul>
  );
};

export default ContactList;
