import { IBook, IShelf, updateShelf } from "../../store/books-reducer";
import classes from "./Book.module.scss";
import { useDispatch } from "react-redux";
import Select from "../Select/Select";

const Book: React.FC<{book: IBook}> = ({book}) => {
    const dispatch = useDispatch();

    const updateShelfHandler = (id: number, shelf: IShelf): void => {
        dispatch(updateShelf(id, shelf));
    }

    return (
        <div className={classes.bookCard}>
            <div className={classes.thumb}>
                {book.shelf && <p className={classes.status}>{book.shelf}</p>}
                <img src={book.imageLinks?.smallThumbnail || 'https://via.placeholder.com/200x300'} alt={book.title} className={classes.img}/>
                <Select 
                    options={[
                        {value: IShelf.reading, label: 'Currently Reading'},
                        {value: IShelf.wantToRead, label: 'Want to Read'},
                        {value: IShelf.read, label: 'Read'},
                        {value: IShelf.none, label: 'None'},
                    ]}
                    initial={book.shelf}
                    changeHandler={(e) => updateShelfHandler(book.id, e.target.value as IShelf)}
                ></Select>
            </div>
            <div className={classes.info}>
                <p className={classes.author}>By: {book.authors?.join(', ')}</p>
                <p className={classes.title}>{book.title}</p>
            </div>
        </div>
    )
}

export default Book;