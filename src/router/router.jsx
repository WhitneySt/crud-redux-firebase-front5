import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginByPhone from "../pages/loginByPhone/loginByPhone";
import InsertCode from "../pages/insertCode/insertCode";
import Register from "../pages/register/register";
import LoginByEmailAndPassword from "../pages/loginByEmailAndPass/loginByEmailAndPass";
import Home from "../pages/home/home";
import PublicRouter from "./publicRouter";
import PrivateRouter from "./privateRouter";
import { onAuthStateChanged } from "firebase/auth";
// import DashboardRouter from "./dashboardRouter";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { auth } from "../firebase/firebaseConfig";
import { getUserActionFromCollection } from "../redux/store/auth/authActions";
import FormProducts from "../pages/formProducts/formProducts";


const Router = () => {
    const dispatch = useDispatch();
    const { isLogged, userLogged } = useSelector(store => store.auth);
    useEffect(() => { 
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/auth.user
                const uid = user.uid;
                console.log(user);
                if (!userLogged?.id) {
                    dispatch(getUserActionFromCollection(uid));
                }
                // ...
            } else {
                // User is signed out
                // ...
                console.log("No hay sesión activa");
            }
        })
    }, [dispatch, userLogged]);
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route element={<PublicRouter isAuthenticate={isLogged} />}>
                        <Route path="insertcode" element={<InsertCode />} />
                        <Route path="register" element={<Register />} />
                        <Route path="login" element={<LoginByEmailAndPassword />} />
                        <Route index element={<LoginByPhone />} />
                    </Route>
                    <Route element={<PrivateRouter isAuthenticate={isLogged} />}>
                        {/* <Route path="/*" element={ <DashboardRouter/>} /> */}
                        <Route path="/home" element={<Home />} />
                        <Route path="/addProducts" element={<FormProducts />} />
                    </Route>
                    
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;