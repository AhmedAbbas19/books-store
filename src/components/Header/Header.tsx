import { Link } from "react-router-dom";
import classes from "./Header.module.scss";

interface HeaderProps {
    
}
 
const Header: React.FC<HeaderProps> = () => {
    return ( 
        <div className={classes.header}>
            <img src="" alt="" />
            <h1>Books Store</h1>
            <Link to="/login" className={classes.auth}>Login</Link>
        </div>
     );
}
 
export default Header;