import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginByPhone from "../pages/loginByPhone/loginByPhone";
import InsertCode from "../pages/insertCode/insertCode";


const Router = () => {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/">
                  <Route index element={<LoginByPhone />} />
                  <Route path="/insertcode" element={ <InsertCode/>} />
              </Route>
          </Routes>
      </BrowserRouter>
  )
}

export default Router;