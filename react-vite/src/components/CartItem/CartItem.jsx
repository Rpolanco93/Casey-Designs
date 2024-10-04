import { FaDollarSign } from "react-icons/fa";
import './CartItem.css'
import {Link, useRevalidator} from "react-router-dom";

const CartItem = ({data}) => {
    const product = data.product
    let revalidator = useRevalidator()

    const handleMinusQuantity = async () => {
        await fetch(`/api/cart/${data.product_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                quantity: data.quantity - 1
            })
        }).then(() => revalidator.revalidate());
    }

    const handlePlusQuantity = async () => {
        await fetch(`/api/cart/${data.product_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                quantity: data.quantity + 1
            })
        }).then(() => revalidator.revalidate());
    }

    const removeItem = async () => {
        await fetch(`/api/cart/${data.product_id}`, {
            method: 'DELETE',
            body: JSON.stringify(data.product_id)
        }).then(() => revalidator.revalidate());
    }

    const getPrice = (itemPrice, quantity) => {
        let total = quantity * itemPrice
        return total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
        <div className="cart-item-tile">
            <img alt={'previewImage'} src={product.previewImage} className="cart-item-product-images" />
            <Link to={`/products/${product.id}`}>
                <h3 className="product-tile-name-sc">{product.name}</h3>
            </Link>
            <p><FaDollarSign/>{getPrice(product.price, data.quantity)}</p>
            <div className="edit-quantity">
                <button onClick={handleMinusQuantity}>-</button>
                <span>{data.quantity}</span>
                <button onClick={handlePlusQuantity}>+</button>
            </div>
            <div className="remove-from-cart">
                <button className="remove-item" onClick={removeItem}>Remove Item</button>
            </div>
        </div>
    )
}

export default CartItem;
