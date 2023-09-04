import { Route, Routes } from "react-router-dom";
import Home from "../pages/home/home";
import FormProducts from "../pages/formProducts/formProducts";


const DashboardRouter = () => {
    return (
        <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/addProducts" element={ <FormProducts/>} />
        </Routes>
    )
}

export default DashboardRouter;