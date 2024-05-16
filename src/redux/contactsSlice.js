import { createSlice, nanoid } from "@reduxjs/toolkit";
import { deleteContactsThunk, fetchContactsThunk } from "./contactsOps";

const initialState = {
  items: [],
  isLoading: false,
  isError: false,
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  selectors: {
    selectContacts: (state) => state.items,
    selectIsLoading: (state) => state.isLoading,
    selectIsError: (state) => state.isError,
  },
  reducers: {
    addContact: {
      reducer(state, { payload }) {
        state.items.push(payload);
      },
      prepare(item) {
        return {
          payload: {
            id: nanoid(),
            name: item.name,
            number: item.number,
          },
        };
      },
    },
    deleteContact: (state, { payload }) => {
      state.items = state.items.filter((item) => item.id !== payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContactsThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchContactsThunk.fulfilled, (state, { payload }) => {
        state.items = payload;
        state.isLoading = false;
      })
      .addCase(fetchContactsThunk.rejected, (state, { payload }) => {
        state.isError = payload;
      })
      .addCase(deleteContactsThunk.fulfilled, (state, { payload }) => {
        state.items = state.items.filter((item) => item.id !== payload);
      });
  },
});

export const contactsReducer = contactsSlice.reducer;
export const { addContact, deleteContact } = contactsSlice.actions;
export const { selectContacts } = contactsSlice.selectors;
