import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import BookDetails from './components/pages/BookDetails/BookDetails';
import Home from "./components/pages/Home/Home";
import NotFound from './components/pages/NotFound/NotFound';
import Search from "./components/pages/Search/Search";

const App: React.FC = () => {
  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/search" element={<Search/>}/>
        <Route path="/book/:id" element={<BookDetails/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </>
  );
}

export default App;
