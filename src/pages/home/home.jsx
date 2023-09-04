import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/store/auth/authActions";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fillProductsFromCollection, searcProductsAction } from "../../redux/store/products/productAction";
import Card from "../../components/card/card";
import { searchProducts } from "../../redux/store/products/productsSlice";

const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [activeSearch, setActiveSearch] = useState(false);
    const [productList, setProductList] = useState([]);
    const { userLogged } = useSelector(store => store.auth);
    const { products, search }= useSelector(store=>store.products)

    useEffect(() => {
        dispatch(fillProductsFromCollection());
        if (activeSearch) {
            setProductList(search)
        } else {
            setProductList(products)
        }
    }, [dispatch, activeSearch, search, products]);

    const searching = (e) => {
        const searchParam = e.target.value;
        
        if (searchParam.length > 3) {
            console.log(e.target.value);
            setActiveSearch(true);
            dispatch(searcProductsAction(searchParam));
        }
        
    }

    const otherSearch = (e) => {
        const searchParam = e.target.value;

        if (searchParam.length > 3) {
            console.log(e.target.value);
            setActiveSearch(true);
            const filter = products?.filter(product => product.name.toLowerCase().includes(searchParam.toLowerCase()))
            dispatch(searchProducts(filter));
        }
    }

    return (
        <div>
            <button onClick={() => dispatch(logout())}>Cerrar sesión</button>
            <button onClick={() => navigate("/addProducts")}>ir a add Products</button>
            <div>
                <p>Hola! {userLogged?.displayName}</p>
                <img src={userLogged?.photoURL} alt={userLogged?.displayName} />
            </div>
            <main>
                <input placeholder="Search" onChange={otherSearch} />
                <button onClick={()=>setActiveSearch(false)}>Clear</button>
                <section>{
                    productList.map(product => (
                        <Card key={product.id } product={product} />
                    ))
                }</section>
            </main>
        </div>
    )
}

export default Home;