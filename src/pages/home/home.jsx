import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/store/auth/authActions";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userLogged }=useSelector(store=>store.auth)
    return (
        <div>
            <button onClick={() => dispatch(logout())}>Cerrar sesión</button>
            <button onClick={() => navigate("/addProducts")}>ir a add Products</button>
            <div>
                <p>Hola! {userLogged?.displayName}</p>
                <img src={userLogged?.photoURL} alt={userLogged?.displayName} />
            </div>
        </div>
    )
}

export default Home;