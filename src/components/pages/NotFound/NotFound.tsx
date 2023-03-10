import classes from "./NotFound.module.scss";
import { Link } from "react-router-dom";
import notFound from "../../../assets/png/404.png";

const NotFound: React.FC = () => {
    return ( 
        <div className={classes.not_found}>
            <img src={notFound} alt="" width="40%"/>
            <Link to="/" className={classes.close_search}>Home</Link>
        </div>
    )
}
 
export default NotFound;