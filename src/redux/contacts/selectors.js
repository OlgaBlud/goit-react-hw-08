import { createSelector } from "@reduxjs/toolkit";
import { selectFilterValue } from "../filters/selectors";

export const selectContacts = (state) => state.contacts;
export const selectContactsItems = (state) => state.contacts.items;
export const selectFilteredContacts = createSelector(
  [selectContactsItems, selectFilterValue],
  (contacts, filterValue) => {
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filterValue.toLowerCase())
    );
  }
);
