import {Link, useLoaderData, useRevalidator} from 'react-router-dom';
import {useEffect} from 'react';
import {useModal} from '../../context/Modal';
import {DeleteProductModal} from './DeleteProductModal';

function EditProductTiles() {
    let products = useLoaderData()
    let revalidator = useRevalidator()
    const {setModalContent, closeModal} = useModal();

    useEffect(() => {
        closeModal()
    }, [products])

    // handle on click for delete a product
    const handleDeleteProduct = (productId) => {
        setModalContent(
            <DeleteProductModal
                productId={productId}
                onClose={() => {
                    revalidator.revalidate()
                }}
            />
        );
    };

    return (
        <div className='account-products-page'>
            <div className='account-product-buttons'>
                <Link to={'/account/products/new'}>
                    <button>Create Product</button>
                </Link>
            </div>
            {products.map(product => (
                <div className="my-product-tile" key={product.id}>
                    <img src={product.previewImage} className="my-product-images"/>
                    <Link to={`/products/${product.id}`}>
                        <h3 className="my-product-name-sc">{product.name}</h3>
                    </Link>
                    <p>Price: {product.price}</p>
                    <div className='product-buttons'>
                        <div>
                            <Link to={`/account/products/${product.id}/edit`}>
                                <button className="edit-product">Edit Item</button>
                            </Link>
                        </div>
                        <div>
                            <button className="remove-product" onClick={() => handleDeleteProduct(product.id)}>Delete
                                Item
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default EditProductTiles;
