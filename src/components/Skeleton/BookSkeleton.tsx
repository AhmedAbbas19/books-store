import Skeleton from "react-loading-skeleton";

const BookSkeleton: React.FC<{ repeat: number }> = ({ repeat }) => {
  return (
    <>
      {Array.from({ length: repeat }, (_, i) => i).map((i) => (
        <div key={i} data-testid="skeleton">
          <Skeleton width="200px" height="300px"></Skeleton>
          <Skeleton width="100px" height="16px"></Skeleton>
          <Skeleton width="200px" height="16px"></Skeleton>
        </div>
      ))}
    </>
  );
};

export default BookSkeleton;
