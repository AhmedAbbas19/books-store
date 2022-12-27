import { IBook, IShelf } from '../../store/books-reducer';
import { renderWithContext } from "../../utils/test-utils";
import * as reactRedux from "react-redux";
import Category from "./Category";

const mockBook: IBook = {
    title: "Satire TV",
    description: "Satirical TV has become mandatory viewing for citizens",
    authors: ["Jonathan Gray"],
    categories: ["Performing Arts"],
    id: "1wy49i",
    shelf: IShelf.wantToRead
}

jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useSelector: jest.fn().mockReturnValue({loading: false})
}));

describe('Category', () => {
    test('should render passed title', () => {
        const {getByText} = renderWithContext(<Category books={[mockBook]} title={'test shelf'}/>);
        expect(getByText('test shelf')).toBeInTheDocument();
    });

    test('should render Skeleton in case loading', () => {
        jest.spyOn(reactRedux, 'useSelector').mockReturnValue({loading: true});
        const {getAllByTestId} = renderWithContext(<Category books={[mockBook]} title={'test shelf'}/>);
        const skeleton = getAllByTestId('skeleton');
        expect(skeleton.length).toBeGreaterThan(0);
    });
})