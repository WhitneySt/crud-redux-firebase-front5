
const Card = ({product={}}) => {
    return (
        <article>
            <figure>
                <img src={product?.image} alt={product?.name} />
            </figure>
            <h3>{product?.name}</h3>
        </article>
    )
    
}

export default Card;