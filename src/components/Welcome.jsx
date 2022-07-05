import {useSelector} from "react-redux";

const Welcome = () => {
    const {data} = useSelector((state) => state.sample)
    return (
        <div>
            <h1>{data?.title}</h1>
            <h3>{data?.subTitle}</h3>
        </div>
    )
}

export default Welcome;
