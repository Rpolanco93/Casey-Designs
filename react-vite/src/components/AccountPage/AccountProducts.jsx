import { Link, useLoaderData, useRevalidator } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import { DeleteProductModal } from './DeleteProductModal';

function EditProductTiles() {
    let products = useLoaderData()
    let revalidator = useRevalidator()
    const { setModalContent, closeModal } = useModal();

    // handle on click for delete a product
    const handleDeleteProduct = (productId) => {
        setModalContent(
            <DeleteProductModal
                productId={productId}
                onClose={() => {
                    revalidator.revalidate()
                    closeModal()
                }}
            />
        );
    };

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
                    <button className="remove-product" onClick={() => handleDeleteProduct(product.id)}>Delete Item</button>
                </div>
            </div>
            ))}
        </div>
        </>
    )
}

export default EditProductTiles;
