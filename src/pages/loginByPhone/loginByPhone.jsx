import "./loginByPhone.scss";

const LoginByPhone = () => {
  return (
    <main className="loginByPhone">
      <h1>Inicio de sesión por número celular</h1>

      <form>
        <label>Número celular:</label>
        <input type="text" placeholder="Ingrese su número celular" />
        <button type="submit">Enviar SMS</button>
      </form>
    </main>
  );
};

export default LoginByPhone;
