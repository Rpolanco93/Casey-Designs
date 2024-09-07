import { useLoaderData, Form, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState, useRef } from 'react';

function ProductDetails() {
    const product = useLoaderData()
    const inputRefs = useRef({});

    const user = useSelector(state => state.session.user);
    const formMethod = product ? 'put' : 'post';
    const actionUrl = product ? `/account/products/${product.id}/edit` : '/account/products/new';

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [previewImage, setPreviewImage] = useState('');
    const [imageOne, setImageOne] = useState('');
    const [imageTwo, setImageTwo] = useState('');
    const [imageThree, setImageThree] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (!user) {
            Navigate('/');
        }
    }, [user]);

    // error validations
    const validationErrors = () => {
        const newErrors = {};
        if (!name) newErrors.name = 'Name is required.';
        if (name.length > 50) newErrors.name = 'Name must be less than 50 characters.';
        if (!description) newErrors.description = 'A description is required.';
        if (description.length > 1000) newErrors.description = 'Description must be less than 1000 characters.';
        if (!price) newErrors.price = 'Price is required.';
        if (!product.id && !previewImage) newErrors.previewImage = 'A preview image is required.';
        return newErrors;
    }

    useEffect(() => {
        if (product) {
            setName(product.name || "");
            setDescription(product.description || "");
            setPrice(product.price || "");
            setPreviewImage(product.previewImage || "");
        }
    }, [product]);

    // handle errors to clear when input is updated
    const handleInputs = (setter, field) => (e) => {
        setter(e.target.value);
        if (errors[field]) {
            setErrors((prevErrors) => {
                const newErrors = { ...prevErrors };
                delete newErrors[field];
                return newErrors;
            })
        }
    };

    return (
        <div className="new-product-page">
            <h1>{product.id ? 'Update Your Product' : 'Create a New Product'}</h1>
            <Form method={formMethod} className='product-form' action={actionUrl}>
                <div className="product-name">
                    <label htmlFor="name">Name</label>
                    <p>Enter a short and descriptive name for your product.</p>
                        <input
                            id='name' type='text' value={name} name='name'
                            onChange={handleInputs(setName, 'name')}
                            ref={(el) => inputRefs.current.name = el}
                            required maxLength='50'
                        />
                    {errors.name && <p>{errors.name}</p>}
                </div>
                <div className="product-description">
                    <label htmlFor='description'>Description</label>
                    <p>Provide a detailed description of your product in 1000 characters or less. Highlight key features to attract potential buyers.</p>
                        <textarea
                            name='description' id='description' type='textarea' value={description}
                            onChange={handleInputs(setDescription, 'description')}
                            ref={(el) => inputRefs.current.description = el}
                            required maxLength='1000'
                        />
                    {errors.description && <p>{errors.description}</p>}
                </div>
                <div className="product-price">
                    <label htmlFor='price'>Price</label>
                    <p>Set the retail price of your product. Note: This amount is before taxes and fees.</p>
                        <input
                            id='price' type='number' value={price} name='price'
                            onChange={handleInputs(setPrice, 'price')}
                            ref={(el) => inputRefs.current.price = el}
                            required min='0' step='1.00'
                        />
                    {errors.price && <p>{errors.price}</p>}
                </div>
                <div className="product-images">
                    <label htmlFor='previewImage'>Upload images for your product.</label>
                    <p>Upload high-quality images to showcase your product and capture buyers&apos; interest.</p>
                        <input
                            id='previewImage' type='url' value={previewImage} name='image1'
                            onChange={handleInputs(setPreviewImage, 'previewImage')}
                            ref={(el) => inputRefs.current.previewImage = el}
                        />
                        {errors.previewImage && <p>{errors.previewImage}</p>}
                        <input
                            type='url' value={imageOne} name='image2'
                            onChange={(e) => setImageOne(e.target.value)}
                        />
                        <input
                            type='url' name='image3'
                            value={imageTwo}
                            onChange={(e) => setImageTwo(e.target.value)}
                        />
                        <input
                            type='url' name='image4'
                            value={imageThree}
                            onChange={(e) => setImageThree(e.target.value)}
                        />
                </div>
                <button type="submit">{product.id ? 'Update Product' : 'Create Product'}</button>
            </Form>
        </div>
    )
}

export default ProductDetails;

export const productAction = async ({ request }) => {
    const data = await request.formData()

    const submission = {
        price: data.get('price')
    }

    console.log(submission)
}

//code prior to using Form from react
// (
//     <div className="new-product-page">
//         <h1>{product.id ? 'Update Your Product' : 'Create a New Product'}</h1>
//         <Form onSubmit={handleSubmit} className='product-form'>
//             <div className="product-name">
//                 <label htmlFor="name">Name</label>
//                 <p>Enter a short and descriptive name for your product.</p>
//                     <input
//                         id='name' type='text' value={name}
//                         onChange={handleInputs(setName, 'name')}
//                         ref={(el) => inputRefs.current.name = el}
//                         required maxLength='50'
//                     />
//                 {errors.name && <p>{errors.name}</p>}
//             </div>
//             <div className="product-description">
//                 <label htmlFor='description'>Description</label>
//                 <p>Provide a detailed description of your product in 1000 characters or less. Highlight key features to attract potential buyers.</p>
//                     <textarea
//                         id='description' type='textarea' value={description}
//                         onChange={handleInputs(setDescription, 'description')}
//                         ref={(el) => inputRefs.current.description = el}
//                         required maxLength='1000'
//                     />
//                 {errors.description && <p>{errors.description}</p>}
//             </div>
//             <div className="product-price">
//                 <label htmlFor='price'>Price</label>
//                 <p>Set the retail price of your product. Note: This amount is before taxes and fees.</p>
//                     <input
//                         id='price' type='number' value={price}
//                         onChange={handleInputs(setPrice, 'price')}
//                         ref={(el) => inputRefs.current.price = el}
//                         required min='0' step='1.00'
//                     />
//                 {errors.price && <p>{errors.price}</p>}
//             </div>
//             <div className="product-images">
//                 <label htmlFor='previewImage'>Upload images for your product.</label>
//                 <p>Upload high-quality images to showcase your product and capture buyers&apos; interest.</p>
//                     <input
//                         id='previewImage' type='url' value={previewImage}
//                         onChange={handleInputs(setPreviewImage, 'previewImage')}
//                         ref={(el) => inputRefs.current.previewImage = el}
//                     />
//                     {errors.previewImage && <p>{errors.previewImage}</p>}
//                     <input
//                         type='url' value={imageOne}
//                         onChange={(e) => setImageOne(e.target.value)}
//                     />
//                     <input
//                         type='url'
//                         value={imageTwo}
//                         onChange={(e) => setImageTwo(e.target.value)}
//                     />
//                     <input
//                         type='url'
//                         value={imageThree}
//                         onChange={(e) => setImageThree(e.target.value)}
//                     />
//             </div>
//             <button type='submit'>{product.id ? 'Update Product' : 'Create Product'}</button>
//         </Form>
//     </div>
// )
