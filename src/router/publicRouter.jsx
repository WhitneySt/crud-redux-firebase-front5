import { Navigate, Outlet } from "react-router-dom";

const PublicRouter = ({ isAuthenticate }) => {
    return (
        <div>{isAuthenticate ? <Navigate to={"/home"} /> : <Outlet />}</div>
    )
}

export default PublicRouter;