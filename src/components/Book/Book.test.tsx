import * as booksReducer from '../../store/books-reducer';
import Book from './Book';
import { getBy, renderWithContext } from '../../utils/test-utils';
import { fireEvent } from '@testing-library/react';

const mockBook: booksReducer.IBook = {
    title: "Satire TV",
    description: "Satirical TV has become mandatory viewing for citizens",
    authors: ["Jonathan Gray"],
    categories: ["Performing Arts"],
    id: "1wy49i",
    shelf: booksReducer.IShelf.wantToRead
}

describe('Book', () => {
    test("should set fallback img src in case book has no thumbnail", () => {
        const element = renderWithContext(<Book book={mockBook}/>);
        const img = getBy('class')(element.container, 'img');
        expect(img?.getAttribute('src')).not.toBe('');
    });

    test("should call updateShelf action onChange select", () => {
        const updateShelfSpy = jest.spyOn(booksReducer, 'updateShelf');
        const {getByTestId} = renderWithContext(<Book book={mockBook}/>);
        const select = getByTestId('select');
        fireEvent.change(select);
        expect(updateShelfSpy).toBeCalled();
    });
})
