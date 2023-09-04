import { useForm } from "react-hook-form";
import "./formProducts.scss";
import fileUpload from "../../service/fileUpload";
import { useDispatch, useSelector } from "react-redux";
import { createAProductAction } from "../../redux/store/products/productAction";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { fillCategoriesAction } from "../../redux/store/categories/categoriesActions";

const FormProducts = () => {
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const { categories } = useSelector(store => store.categories);

    useEffect(() => {
        dispatch(fillCategoriesAction())
    }, [dispatch]);

    const createProduct = async (data) => {
        const image = data.image[0];
        const imageURL = await fileUpload(image);
        if (imageURL) {
            const newProduct = {
                ...data,
                image: imageURL,
                nameToLowerCase: data.name.toLowerCase()
            }
            console.log(newProduct);
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
                    {
                        categories.map(category => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))
                    }
                </select>
                <label>Imagen del producto: </label>
                <input type="file" {...register("image")} />
                <button type="submit">Crar producto</button>
            </form>
        </main>
    )
}

export default FormProducts;