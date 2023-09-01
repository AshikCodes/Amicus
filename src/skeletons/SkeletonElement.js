import './Skeleton.css';
import Shimmer from './Shimmer';

const SkeletonElement = ({ type }) => {
    const classes = `skeleton ${type}`
    return ( 
        <div className="skeleton-wrapper">
            <div className={classes}></div>
            <Shimmer />
        </div>
     );
}
 
export default SkeletonElement;