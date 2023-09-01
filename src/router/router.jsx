import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginByPhone from "../pages/loginByPhone/loginByPhone";
import InsertCode from "../pages/insertCode/insertCode";
import Register from "../pages/register/register";
import LoginByEmailAndPassword from "../pages/loginByEmailAndPass/loginByEmailAndPass";
import Home from "../pages/home/home";


const Router = () => {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/">
                  <Route index element={<LoginByPhone />} />
                  <Route path="insertcode" element={<InsertCode />} />
                  <Route path="register" element={<Register />} />
                  <Route path="login" element={<LoginByEmailAndPassword />} />
                  <Route path="home" element={<Home/> } />
              </Route>
          </Routes>
      </BrowserRouter>
  )
}

export default Router;