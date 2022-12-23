import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import useSelector from "../../../hooks/useSelector";
import {
  fetchBook,
  IShelf,
  updateShelf,
} from "../../../store/books-reducer";
import Select from "../../Select/Select";
import BookDetailsSkeleton from "../../Skeleton/BookDetailsSkeleton";
import classes from "./BookDetails.module.scss";

const BookDetails: React.FC = () => {
  const { id } = useParams();
  const {loading, detailedBook: book} = useSelector(state => state.books);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBook(String(id)));
  }, [id, dispatch]);

  const updateShelfHandler = (id: string, shelf: IShelf): void => {
    dispatch(updateShelf(id, shelf));
  };

  return (
    <div className="container">
        <Link to="/" className={classes.close_search}>Back</Link>
        <div className={classes.bookCard}>
            {(!book || loading) && <BookDetailsSkeleton/>}
            {(book && !loading) && (<>
              <div className={classes.thumb}>
                  {book.shelf && <p className={classes.status}>{book.shelf}</p>}
                  <img src={book.imageLinks?.thumbnail || 'https://via.placeholder.com/300x450'} alt={book.title} className={classes.img}/>
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
                  {book.categories && <p className={classes.category}>{book.categories}</p>}
                  <p className={classes.author}>By: {book.authors?.join(', ')}</p>
                  <p className={classes.title}>{book.title}</p>
                  {book.averageRating && <p className={classes.rating}>
                      <img src="/assets/svg/star.svg" alt="" width="24" height="24"/>
                      {book.averageRating} ({book.ratingsCount})
                  </p>}
                  <p className={classes.description}>{book.description}</p>
              </div>
            </>)}
        </div>
    </div>
  );
};

export default BookDetails;
