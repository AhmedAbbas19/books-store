import Skeleton from "react-loading-skeleton";


const BookDetailsSkeleton: React.FC = () => {
  return (
    <>
        <Skeleton width="300px" height="450px"></Skeleton>
        <div style={{marginLeft: '32px', paddingTop: '8px', width: '100%'}}>
            <Skeleton width="200px" height="16px"></Skeleton>
            <Skeleton width="300px" height="16px" style={{marginBottom: '14px'}}></Skeleton>
            <Skeleton width="100%" count={6}></Skeleton>
        </div>
    </>
  );
};

export default BookDetailsSkeleton;