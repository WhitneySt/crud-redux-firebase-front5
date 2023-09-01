import { useForm } from "react-hook-form";
import "./register.scss";
import Swal from "sweetalert2";
import fileUpload from "../../service/fileUpload";
import { useDispatch, useSelector } from "react-redux";
import { createAnUser } from "../../redux/store/auth/authActions";
import { useNavigate } from "react-router-dom";

const Register = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const {error } = useSelector((store)=>store.auth);

    const userRegister = async(data) => {
        try {
            const imageFile = data.photoURL[0];
            const avatar = await fileUpload(imageFile);
            const newUser = {
                ...data,
                photoURL: avatar
            }
            console.log(newUser);
            dispatch(createAnUser(newUser));
            //Swal.fire("Excelente!", "Haz creado tu cuenta!", "success");
        } catch (error) {
            //Swal.fire("Oops!", "Hubo un error en la creación de tu cuenta", "error");
        }
        
    }

    if (error) {
        Swal.fire("Oops!", "Hubo un error en la creación de tu cuenta", "error");
    }
    if (error === false) {
         Swal.fire("Excelente!", "Haz creado tu cuenta!", "success").then(()=>navigate("/home"));
    }

    return (
        <main className="form-register">
            <h1>Crea una nueva cuenta</h1>
            <form onSubmit={handleSubmit(userRegister)}>
                <input type="text" placeholder="Nombre" {...register("displayName")} />
                <input type="text" placeholder="Email" {...register("email")} />
                <input type="password" placeholder="Contraseña" {...register("password")} />
                <input type="password" placeholder="Confirmar contraseña" />
                <input type="date" placeholder="Fecha de nacimiento" {...register("birthDate")} />
                <input type="number" placeholder="Número celular" {...register("phone")} />
                <input type="file" {...register("photoURL")} />
                <button type="submit">Crear cuenta</button>
            </form>
        </main>
    )
}

export default Register;