import {Routes, Route} from "react-router-dom";
import routes from "./routes";

const App = () => {
    return (
        <>
            <Routes>
                {routes.map((route, index) => (
                    <Route key={index} exact={route.exact} path={route.path}
                           element={<route.component/>}/>
                ))}
            </Routes>
        </>
    );
}

export default App;
