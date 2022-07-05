import {Routes, Route} from "react-router-dom";
import routes from "./routes";
import {Toaster} from "react-hot-toast";

const App = () => {
    return (
        <>
            <Toaster position="top-center" reverseOrder={false}/>
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
