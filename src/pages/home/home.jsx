import { useDispatch } from "react-redux";
import { logout } from "../../redux/store/auth/authActions";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return (
        <div>
            <button onClick={() => dispatch(logout())}>Cerrar sesión</button>
            <button onClick={()=>navigate("/addProducts")}>ir a add Products</button>
        </div>
    )
}

export default Home;