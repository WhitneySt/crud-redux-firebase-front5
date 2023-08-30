import { useForm } from "react-hook-form";
import "./loginByPhone.scss";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import Swal from "sweetalert2";

const LoginByPhone = () => {
  const { register, handleSubmit } = useForm();

  //Función que genera el recaptcha

  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(auth,'recaptch-container', {
      'size': 'invisible',
      'callback': () => {},
      //'appVerificationDisabledForTesting': true 
    });
    // try {
    //   window.recaptchaVerifier = new RecaptchaVerifier(
    //     "recaptch-container",
    //     {
    //       'size': 'invisible',
    //       'callback': () => {
    //       },
    //     },
    //     auth
    //   );
    //   window.recaptchaVerifier = new RecaptchaVerifier()
    // } catch (error) {
    //   console.log(error);
    // }
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
        //navigate("/insertcode");
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
    console.log(window.recaptchaVerifier);
    generateRecaptcha(data.phone);
    console.log(window.recaptchaVerifier);
    const appVerifier = window.recaptchaVerifier;
    sendSms(data.phone, appVerifier);
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
    </main>
  );
};

export default LoginByPhone;
