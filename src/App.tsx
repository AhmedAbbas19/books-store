import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import BookDetails from './components/pages/BookDetails/BookDetails';
import Home from "./components/pages/Home/Home";
import Search from "./components/pages/Search/Search";

const App: React.FC = () => {
  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/search" element={<Search/>}></Route>
        <Route path="/book/:id" element={<BookDetails/>}></Route>
        <Route path="*" element={<Navigate to="/" replace />}/>
      </Routes>
    </>
  );
}

export default App;
