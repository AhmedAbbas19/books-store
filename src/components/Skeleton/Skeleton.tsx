import classes from "./Skeleton.module.scss"

const Skeleton: React.FC<{width: string, height: string}> = ({width, height}) => {
    return <div className={classes.skeleton_box} style={{width, height}}></div>;
}

export default Skeleton;