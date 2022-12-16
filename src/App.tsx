import { Routes, Route, Navigate } from 'react-router-dom';
import classes from './App.module.scss';
import Home from "./components/pages/Home/Home";
import Search from "./components/pages/Search/Search";

const App: React.FC = () => {
  return (
    <>
      <div className={classes.title}><h1>Books Store</h1></div>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/search" element={<Search/>}></Route>
        <Route path="*" element={<Navigate to="/" replace />}/>
      </Routes>
    </>
  );
}

export default App;
