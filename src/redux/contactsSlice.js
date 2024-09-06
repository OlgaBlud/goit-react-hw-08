import { createSelector, createSlice } from "@reduxjs/toolkit";
import { fetchContacts, deleteContact, addContact } from "./contactsOps";
import { selectFilterValue } from "./filtersSlice";

const INITIAL_STATE = {
  items: [],
  loading: false,
  error: null,
};
const contactsSlice = createSlice({
  name: "contacts",
  initialState: INITIAL_STATE,

  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.items = payload;
      })
      .addCase(fetchContacts.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(deleteContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteContact.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.items = state.items.filter((item) => item.id !== payload.id);
      })
      .addCase(deleteContact.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(addContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addContact.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.items = [...state.items, payload];
      })
      .addCase(addContact.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const contactsReducer = contactsSlice.reducer;
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
