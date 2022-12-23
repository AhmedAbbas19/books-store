import { IBook, IShelf } from "../store/books-reducer";
import axiosInstance from "./axios";

let token = localStorage.token;
if (!token) token = localStorage.token = Math.random().toString(36).substr(-8);

const config = {
  headers: {
    Accept: "application/json",
    Authorization: token,
  },
};

export const getAll = () => axiosInstance.get<any, {books: IBook[]}>("books", config);

export const getOne = (id: string) => axiosInstance.get<any, {book: IBook}>(`books/${id}`, config);

export const update = (id: string, shelf: IShelf) => axiosInstance.put<any, IBook>(`books/${id}`, {shelf}, config);

export const search = (query: string, maxResults: number = 300) => axiosInstance.post<any, {books: IBook[]}>("search", {query, maxResults}, config);
