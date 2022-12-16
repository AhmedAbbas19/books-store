import classes from "./Home.module.scss";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Category from "../../Category/Category";
import useSelector from "../../../hooks/useSelector";
import { fetchBooks, IShelf } from "../../../store/books-reducer";
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
    const {data: books} = useSelector(state => state.books);
    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(fetchBooks());
    }, [dispatch])
  
    const reading = books.filter(b => b.shelf === IShelf.reading);
    const wantToRead = books.filter(b => b.shelf === IShelf.wantToRead);
    const read = books.filter(b => b.shelf === IShelf.read);
  
    return (
      <>
        <div className="container">
          <Category title={'Reading'} books={reading}></Category>
          <Category title={'Want To Read'} books={wantToRead}></Category>
          <Category title={'Read'} books={read}></Category>
        </div>
        <div className={classes.open_search}>
          <Link to="/search">Add a book</Link>
        </div>
      </>
    );
}

export default Home;