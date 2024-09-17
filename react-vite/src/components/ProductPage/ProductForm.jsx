import {Form, Link, useActionData, useLoaderData, useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import './ProductForm.css'
import { PacmanLoader } from 'react-spinners';

function ProductForm() {
    const navigate = useNavigate();
    const product = useLoaderData() || {};
    const [isLoading, setIsLoading] = useState(false)

    const user = useSelector(state => state.session.user);
    const formMethod = product && product.id ? 'put' : 'post';
    const actionUrl = product && product.id ? `/account/products/${product.id}/edit` : '/account/products/new';
    const actionResults = useActionData();

    useEffect(() => {
        setIsLoading(false)
    }, [actionResults])

    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [navigate, user]);

    return isLoading ? <div className="product-form"><PacmanLoader /></div> : (
        <div className="new-product-page">
            <h1>{product.id ? 'Update Your Product' : 'Create a New Product'}</h1>
            <Form method={formMethod} className='product-form' action={actionUrl} encType='multipart/form-data' onSubmit={() => setIsLoading(true)}>
                <div className="product-name-form">
                    <label htmlFor="name">Name</label>
                    <p>Enter a short and descriptive name for your product.</p>
                        <input
                            id='name' type='text' defaultValue={product.name} name='name'
                            required minLength={5} maxLength={50}
                        />
                    {actionResults != undefined && actionResults.error && actionResults.name && <p>{actionResults.name}</p>}
                </div>
                <div className="product-description-form">
                    <label htmlFor='description'>Description</label>
                    <p>Provide a detailed description of your product in 1000 characters or less. Highlight key features to attract potential buyers.</p>
                        <textarea
                            name='description' id='description' defaultValue={product.description}
                            required maxLength='1000'
                        />
                    {actionResults != undefined && actionResults.error && actionResults.description && <p>{actionResults.description}</p>}
                </div>
                <div className="product-price">
                    <label htmlFor='price'>Price</label>
                    <p>Set the retail price of your product. Note: This amount is before taxes and fees.</p>
                        <input
                            id='price' type='number' defaultValue={product.price} name='price'
                            required min='0' step='1.00'
                        />
                    {actionResults != undefined && actionResults.error && actionResults.price && <p>{actionResults.price}</p>}
                </div>
                <div className="product-images-form">
                    <label htmlFor='previewImage'>Upload images for your product.</label>
                    <p>Upload a high-quality image to showcase your product and capture buyers&apos; interest.</p>
                    {product.id ?
                        <div>
                            <p>Current Photo:<img className='product-image-form' src={product.previewImage} alt={product.name}/></p>
                            <div className='image-upload'>
                                <input
                                    type='file'
                                    accept='image/*'
                                    name='image1'
                                />
                                {actionResults != undefined && actionResults.error && actionResults.previewImage && <p>{actionResults.previewImage}</p>}
                            </div>
                        </div> :
                        <div className='image-upload'>
                            <input
                                type='file'
                                accept='image/*'
                                name='image1'
                                required
                            />
                            {actionResults != undefined && actionResults.error && actionResults.previewImage && <p>{actionResults.previewImage}</p>}
                        </div>
                        }
                </div>
                {actionResults != undefined && !actionResults.error ? <>
                     <p>{actionResults.message}</p>
                     <Link to={'/account/products'}>
                         <button>View Account Products</button>
                     </Link>
                     <Link to={`/products/${product.id}`}>
                         <button>View Product Page</button>
                     </Link>
                     </> : <button type="submit">{product.id ? 'Update Product' : 'Create Product'}</button>
                 }
            </Form>
        </div>
    )
}

export default ProductForm;
