import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { getAll, update, search, getOne } from "../api/books";

export enum IShelf {
  wantToRead = "wantToRead",
  reading = "currentlyReading",
  read = "read",
  none = "none",
}

export interface IBook {
  id: string;
  title: string;
  description: string;
  shelf: IShelf;
  authors: string[];
  imageLinks?: { smallThumbnail: string; thumbnail: string };
  categories?: string[];
  averageRating?: number;
  ratingsCount?: number;
}

export interface IBookState {
  data: IBook[];
  searchList: IBook[];
  detailedBook?: IBook;
  loading: boolean
}

const initialState: IBookState = {
  data: [],
  searchList: [],
  loading: false
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    addBooks: (state, action: PayloadAction<IBook[]>) => {
      return {...state, loading: false, data: [...action.payload]};
    },
    updateShelf: (state, action: PayloadAction<{ id: string; shelf: IShelf }>) => {
      return {
        ...state,
        loading: false,
        data: state.data.map((b) => {
          if (b.id === action.payload.id) {
            return { ...b, shelf: action.payload.shelf };
          }
          return b;
        }),
        searchList: state.searchList.map((b) => {
          if (b.id === action.payload.id) {
            return { ...b, shelf: action.payload.shelf };
          }
          return b;
        }),
        detailedBook: state.detailedBook && state.detailedBook.id === action.payload.id ? {
          ...state.detailedBook, shelf: action.payload.shelf
        } : state.detailedBook
      };
    },
    addSearchList: (state, action: PayloadAction<IBook[]>) => {
      return {...state, loading: false, searchList: action.payload.map(q => {
        const book = state.data.find(b => b.id === q.id);
        return {...q, shelf: book?.shelf || q.shelf}
      })};
    },
    addDetailedBook: (state, action: PayloadAction<IBook>) => {
      return {...state, loading: false, detailedBook: action.payload};
    },
    loading: (state, action: PayloadAction<boolean>) => {
      return {...state, loading: action.payload}
    }
  },
});
export const booksActions = booksSlice.actions;

export const fetchBooks = (): any => {
  return async (dispatch: Dispatch) => {
    dispatch(booksActions.loading(true));
    const { books } = await getAll();
    dispatch(booksActions.addBooks(books));
  };
};

export const updateShelf = (id: string, shelf: IShelf): any => {
    return async (dispatch: Dispatch) => {
      dispatch(booksActions.loading(true));
      await update(id, shelf);
      dispatch(booksActions.updateShelf({id, shelf}));
    };
};

export const searchBooks = (query: string): any => {
  return async (dispatch: Dispatch) => {
    dispatch(booksActions.loading(true));
    const {books} = await search(query);
    dispatch(booksActions.addSearchList(books?.length ? books : []));
  };
};

export const fetchBook = (id: string): any => {
  return async (dispatch: Dispatch) => {
    dispatch(booksActions.loading(true));
    const {book} = await getOne(id);
    dispatch(booksActions.addDetailedBook(book));
  };
};

export default booksSlice.reducer;
