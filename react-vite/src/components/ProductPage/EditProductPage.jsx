import {Form, useActionData, useLoaderData, useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {useEffect} from 'react';

function ProductForm() {
    const navigate = useNavigate();
    const product = useLoaderData() || {};

    const user = useSelector(state => state.session.user);
    const formMethod = product && product.id ? 'put' : 'post';
    const actionUrl = product ? `/account/products/${product.id}/edit` : '/account/products/new';
    const errors = useActionData() || {};

    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [navigate, user]);

    return (
        <div className="new-product-page">
            <h1>{product.id ? 'Update Your Product' : 'Create a New Product'}</h1>
            <Form method={formMethod} className='product-form' action={actionUrl}>
                <div className="product-name">
                    <label htmlFor="name">Name</label>
                    <p>Enter a short and descriptive name for your product.</p>
                        <input
                            id='name' type='text' defaultValue={product.name} name='name'
                            required minLength={5} maxLength={50}
                        />
                    {errors.name && <p>{errors.name}</p>}
                </div>
                <div className="product-description">
                    <label htmlFor='description'>Description</label>
                    <p>Provide a detailed description of your product in 1000 characters or less. Highlight key features to attract potential buyers.</p>
                        <textarea
                            name='description' id='description' defaultValue={product.description}
                            required maxLength='1000'
                        />
                    {errors.description && <p>{errors.description}</p>}
                </div>
                <div className="product-price">
                    <label htmlFor='price'>Price</label>
                    <p>Set the retail price of your product. Note: This amount is before taxes and fees.</p>
                        <input
                            id='price' type='number' defaultValue={product.price} name='price'
                            required min='0' step='1.00'
                        />
                    {errors.price && <p>{errors.price}</p>}
                </div>
                <div className="product-images">
                    <label htmlFor='previewImage'>Upload images for your product.</label>
                    <p>Upload high-quality images to showcase your product and capture buyers&apos; interest.</p>
                        <input
                            id='previewImage' type='url' defaultValue={product.previewImage} name='image1'
                        />
                        {errors.previewImage && <p>{errors.previewImage}</p>}
                        <input
                            type='url' defaultValue={product.imageOne} name='image2'
                        />
                        <input
                            type='url' name='image3'
                            defaultValue={product.imageTwo}
                        />
                        <input
                            type='url' name='image4'
                            defaultValue={product.imageThree}
                        />
                </div>
                <button type="submit">{product.id ? 'Update Product' : 'Create Product'}</button>
            </Form>
        </div>
    )
}

export default ProductForm;
