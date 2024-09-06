import { useNavigate, useLoaderData } from 'react-router-dom';


function EditProductTiles() {
    let products = useLoaderData()
    const navigate = useNavigate()

    const deleteItem = async (productId) => {
        fetch(`/api/products/${productId}`, {
            method: 'DELETE'
        })
        products = (await fetch('/api/products/current')).json()
    }

    return (
        products.map(product => (
            <div className="my-product-tile" key={product.id}>
            <img src={product.previewImage} className="my-product-images" />
            <h3 className="my-product-name-sc">{product.name}</h3>
            <p>{product.price}</p>
            <div className="edit-product">
                <a href={`/products/${product.id}/edit`}>
                    <button className="edit-product">Edit Item</button>
                </a>
            </div>
            <div className="delete-product">
                <button className="remove-product" onClick={deleteItem}>Delete Item</button>
            </div>
        </div>
        ))
    )
}

export default EditProductTiles;
