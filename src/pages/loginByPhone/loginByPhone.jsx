import { useForm } from "react-hook-form";
import "./loginByPhone.scss";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/store/auth/authActions";
import { useEffect } from "react";
import { searchDoc } from "../../service/getUser";

const LoginByPhone = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    const params = {collectionName: "test", fieldName: "nombre", searchTerm: "whit"}
    searchDoc(params);
  },[])

  //Función que genera el recaptcha

  const generateRecaptcha = () => {
    try {      
      window.recaptchaVerifier = new RecaptchaVerifier(auth,'recaptch-container', {
        'size': 'invisible',
        'callback': () => {},
      });
    } catch (error) {
      console.log(error);      
    }

  };

  //Función que envía el código de verificación
  const sendSms = (number, recaptchaVerifier) => {
    signInWithPhoneNumber(auth, `+57${number}`, recaptchaVerifier)
      .then((response) => {
        window.confirmationResult = response;
        console.log(response);
        Swal.fire(
          "Excelente",
          `Te enviaremos un mensaje para confirmar a ${number}`,
          "success"
        );
      })
      .then(() => {
        navigate("/insertcode");
      })
      .catch((error) => {
        console.log(error);
        Swal.fire(
          "Ops!",
          `Ocurrió un error al realizar tu solicitud ${error.message}`,
          "error"
        );
      });
  };

  const onSubmit = (data) => {
    // //genera el recaptcha
    generateRecaptcha(data.phone);
    const appVerifier = window.recaptchaVerifier;
    sendSms(data.phone, appVerifier);
  };

  const loginWithGoogle = () => { 
    dispatch(login());
  };
  return (
    <main className="loginByPhone">
      <h1>Inicio de sesión por número celular</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Número celular:</label>
        <input
          type="text"
          placeholder="Ingrese su número celular"
          {...register("phone")}
        />
        <button type="submit">
          Enviar SMS
        </button>
      </form>
      <div id="recaptch-container"></div>
      <button type="button" onClick={loginWithGoogle}>Iniciar sesión con Google</button>
      <button type="button" onClick={()=>navigate('/login')}>Iniciar sesión con email y contraseña</button>
    </main>
  );
};

export default LoginByPhone;
