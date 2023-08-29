import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginByPhone from "../pages/loginByPhone/loginByPhone";


const Router = () => {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/">
                  <Route index element={ <LoginByPhone/>} />
              </Route>
          </Routes>
      </BrowserRouter>
  )
}

export default Router;