import booksReducer, { booksActions, fetchBook, fetchBooks, IBook, IBookState, IShelf, searchBooks, updateShelf } from './books-reducer';

let dispatch: jest.Mock<any, any>;
const initialState = {data: [], searchList: [], loading: false};
const mockBook: IBook = {
    title: "Satire TV",
    description: "Satirical TV has become mandatory viewing for citizens",
    authors: ["Jonathan Gray"],
    categories: ["Performing Arts"],
    imageLinks: {smallThumbnail: "test.com", thumbnail: "test.com"},
    id: "1wy49i",
    shelf: IShelf.wantToRead
}

jest.mock("../api/books", () => {
    return {
        async getAll() {return {books: [mockBook]}},
        async update() {return {}},
        async search(query: string) {return {books: [mockBook]}},
        async getOne() {return {book: mockBook}}
    }
})

describe('Books Reducer', () => {
    beforeEach(() => {
        dispatch = jest.fn();
    });

    test('should return initial state', () => {
        const newState = booksReducer(initialState, {type: ""});
        expect(newState).toEqual(initialState);
    });

    test('should return state with newly added book', () => {
        const newState = booksReducer(initialState, booksActions.addBooks([mockBook]));
        expect(newState.data).toEqual([mockBook]);
    });

    test('should return state with updated shelf', () => {
        const state: IBookState = {
            data: [mockBook],
            searchList: [mockBook],
            detailedBook: mockBook,
            loading: false
        }
        const newState = booksReducer(state, booksActions.updateShelf({id: '1wy49i', shelf: IShelf.read}));
        expect(newState.data).toEqual([{...mockBook, shelf: IShelf.read}]);
        expect(newState.searchList).toEqual([{...mockBook, shelf: IShelf.read}]);
        expect(newState.detailedBook).toEqual({...mockBook, shelf: IShelf.read});
    });

    test('should return initial state', () => {
        const newState = booksReducer(initialState, {type: ""});
        expect(newState).toEqual(initialState);
    });

    test('should return state with newly added searchList', () => {
        const newState = booksReducer(initialState, booksActions.addSearchList([mockBook]));
        expect(newState.searchList).toEqual([mockBook]);
    });

    test('should return state with newly added detailedBook', () => {
        const newState = booksReducer(initialState, booksActions.addDetailedBook(mockBook));
        expect(newState.detailedBook).toEqual(mockBook);
    });

    test('should return state with updated loading state', () => {
        const newState = booksReducer(initialState, booksActions.loading(true));
        expect(newState.loading).toEqual(true);
    });

    test('should fetch books', async () => {
        const thunkAction = fetchBooks();
        await thunkAction(dispatch, () => initialState);
        const {calls} = dispatch.mock;
        expect(calls[1][0].payload.length).toBeGreaterThan(0);
    });

    test('should update shelf for book', async () => {
        const thunkAction = updateShelf('1wy49i', IShelf.read);
        await thunkAction(dispatch, () => initialState);
        const {calls} = dispatch.mock;
        expect(calls[1][0].payload).toEqual({id: '1wy49i', shelf: IShelf.read});
    });

    test('should search for books', async () => {
        const thunkAction = searchBooks('the');
        await thunkAction(dispatch, () => initialState);
        const {calls} = dispatch.mock;
        expect(calls[1][0].payload.length).toBeGreaterThan(0);
    });

    test('should fetch one book', async () => {
        const thunkAction = fetchBook('1wy49i');
        await thunkAction(dispatch, () => initialState);
        const {calls} = dispatch.mock;
        expect(calls[1][0].payload.id).toBe('1wy49i');
    });
})