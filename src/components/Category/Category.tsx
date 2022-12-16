import { IBook } from "../../store/books-reducer";
import classes from "./Category.module.scss"
import Book from "../Book/Book";
import useSelector from "../../hooks/useSelector";
import BookSkeleton from "../Skeleton/BookSkeleton";

const Category: React.FC<{books: IBook[], title: string}> = ({books, title}) => {
    const {loading} = useSelector(state => state.books);

    return (
        <>
            <h2 className={classes.title}>{title}</h2>
            <div className={classes.category}>
                {loading && <BookSkeleton repeat={4}></BookSkeleton> }
                {!loading && books.map(b => <Book key={b.id} book={b}></Book>)}
            </div>
        </>
    )
}

export default Category;