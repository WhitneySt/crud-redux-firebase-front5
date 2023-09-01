import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginWithEmailAndPassword } from "../../redux/store/auth/authActions";
import Swal from "sweetalert2";

const LoginByEmailAndPassword = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const { error } = useSelector((store) => store.auth);

    const signIn = (data) => {
        dispatch(loginWithEmailAndPassword(data));
    }

    if (error) {
        Swal.fire("Oops!", "Ha occurrido un error en el inicio de sesión", "error");
    }
    if (error === false) {
        Swal.fire("Excelente", "Haz iniciado sesión correctamente", "success").then(()=>navigate("/home"));
    }
    return (
        <main>
            <button type="button" onClick={() => navigate(-1)}>Atras</button>
            <h1>Inicia sesión con un correo y una contraseña</h1>
            <form onSubmit={handleSubmit(signIn)}>
                <input type="text" placeholder="Correo electrónico" {...register("email")} />
                <input type="password" placeholder="Contraseña" {...register("password")} />
                <button type="submit">Iniciar Sesión</button>
            </form>
            <p>¿No tienes una cuenta creada con email y contraseña? puedes hacer click <Link to={"/register"}>aquí</Link></p>
        </main>
    )

}
export default LoginByEmailAndPassword;