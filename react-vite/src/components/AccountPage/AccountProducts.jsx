import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import { useRevalidator } from "react-router-dom";

function EditProductTiles() {
    let products = useLoaderData()
    const revalidator = useRevalidator();
    const navigate = useNavigate()

    const deleteItem = async (productId) => {
        await fetch(`/api/products/${productId}`, {
            method: 'delete'
        })
    }

    return (
        <>
        <div>
            <Link to={'/account/products/new'}>
                <button>Create Product</button>
            </Link>
        </div>
        <div>
            {products.map(product => (
            <div className="my-product-tile" key={product.id}>
                <img src={product.previewImage} className="my-product-images" />
                <h3 className="my-product-name-sc">{product.name}</h3>
                <p>{product.price}</p>
                <div className="edit-product">
                    <Link to={`/account/products/${product.id}/edit`}>
                        <button className="edit-product">Edit Item</button>
                    </Link>
                </div>
                <div className="delete-product">
                    <button className="remove-product" onClick={() => deleteItem(product.id)}>Delete Item</button>
                </div>
            </div>
            ))}
        </div>
        </>
    )
}

export default EditProductTiles;
