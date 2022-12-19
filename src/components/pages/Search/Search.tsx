import classes from "./Search.module.scss";
import { Link } from 'react-router-dom';
import useSelector from "../../../hooks/useSelector";
import Category from "../../Category/Category";
import { useDispatch } from "react-redux";
import { searchBooks, booksActions } from "../../../store/books-reducer";
import { useEffect } from "react";

interface SearchProps {}

const Search: React.FC<SearchProps> = () => {
  const {searchList: books} = useSelector(state => state.books);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(booksActions.addSearchList([]))
    }
  }, [dispatch])

  const changeHandler = (e: any) => {
    dispatch(searchBooks(e.target.value));
  }

  return (
    <>
      <div className={classes.search_bar}>
        <Link to="/" className={classes.close_search}>Back</Link>
        <input type="text" placeholder="Search by title, author, or ISBN" onChange={changeHandler}/>
      </div>
      <div className="container">
        {!!books.length ? <Category title={'Search Results'} books={books}></Category> : <div className={classes.no_results}>No Search Results.</div>}
      </div>
    </>
  );
};

export default Search;
