import { useForm } from "react-hook-form";
import "./formProducts.scss";
import fileUpload from "../../service/fileUpload";
import { useDispatch } from "react-redux";
import { createAProductAction } from "../../redux/store/products/productAction";
import Swal from "sweetalert2";

const FormProducts = () => {
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    
    const createProduct = async (data) => {
        const image = data.image[0];
        const imageURL = await fileUpload(image);        
        if (imageURL) {
            const newProduct = {
                ...data,
                image: imageURL
            }
            dispatch(createAProductAction(newProduct));
            Swal.fire("Excelente!", "El producto fue creado exitosamente", "success");
        } else {
            Swal.fire("Oops!", "Hubo un error en la carga de la imágen", "error")
        }
    }
    return (
        <main className="form-products">
            <h1>Agregar Productos</h1>
            <form onSubmit={handleSubmit(createProduct)}>
                <label>Nombre del producto: </label>
                <input type="text" {...register("name")} />
                <label>Descripción del producto: </label>
                <input type="text" {...register("description")} />
                <label>Precio del producto: </label>
                <input type="text" {...register("price")} />
                <label>Cantidad:</label>
                <input type="text" {...register("quantity")} />
                <label>Categoría:</label>
                <select {...register("category")}>
                    <option value="">Seleccione una categoría</option>
                </select>
                <label>Imagen del producto: </label>
                <input type="file" {...register("image")} />
                <button type="submit">Crar producto</button>
            </form>
        </main>
    )
}

export default FormProducts;