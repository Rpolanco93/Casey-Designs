import { useLoaderData, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState, useRef } from 'react';

function ProductDetails() {
    const product = useLoaderData()
    const inputRefs = useRef({});
    const navigate = useNavigate();

    const user = useSelector(state => state.session.user);

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
            navigate('/');
        }
    }, [user, navigate]);

    // error validations
    // const validationErrors = () => {
    //     const newErrors = {};
    //     if (!name) newErrors.name = 'Name is required.';
    //     if (name.length > 50) newErrors.name = 'Name must be less than 50 characters.';
    //     if (!description) newErrors.description = 'A description is required.';
    //     if (description.length > 1000) newErrors.description = 'Description must be less than 1000 characters.';
    //     if (!price) newErrors.price = 'Price is required.';
    //     if (!product.id && !previewImage) newErrors.previewImage = 'A preview image is required.';
    //     return newErrors;
    // }

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        // const hasErrors = validationErrors();

        // // handle image URL extensions
        // const imageUrls = [previewImage, imageOne, imageTwo, imageThree].filter(url => url);
        // const invalidUrl = imageUrls.filter(url => {
        //     const extension = url.split('.').pop().toLowerCase();
        //     return !['png', 'jpg', 'jpeg'].includes(extension);
        // });

        // if (invalidUrl.length > 0) {
        //     setErrors(prevErrors => ({
        //         ...prevErrors,
        //         previewImage: 'Image URL needs to end in png, jpg or jpeg'
        //     }))
        //     return;
        // }

        // if (Object.keys(hasErrors).length > 0) {
        //     setErrors(hasErrors);
        //     const firstErrorField = Object.keys(hasErrors)[0];
        //     inputRefs.current[firstErrorField].scrollIntoView({ behavior: 'smooth' })
        // } else {
        //     const productData = {
        //         name,
        //         description,
        //         price: parseFloat(price),
        //         category_id: categoryId
        //     };

        //     try {
        //         // check form if creation or updating
        //         if (product.id) {
        //             await fetch({ product_id: product.id, ...productData }));
        //             navigate(`/products/${product.id}`)
        //         } else {
        //             const newProduct = await dispatch(fetchCreateProduct(productData))
        //             if (newProduct && newProduct.id) {
        //                 const newProductId = newProduct.id;
        //                 const imagePromise = imageUrls.map((url) => {
        //                     return dispatch(fetchAddImage({ product_id: newProductId, url }));
        //                 })
        //                 await Promise.all(imagePromise);
        //                 navigate(`/products/${newProductId}`);
        //             } else {
        //                 setErrors({form: 'Failed to create product. Please try again.'})
        //             }
        //         }
        //     } catch (res) {
        //         const data = await res.json();
        //         if (data && data.errors) {
        //             setErrors(data.errors);
        //         }
        //     }
        // }
    }

    return (
        <div className="new-product-page">
            <h1>{product.id ? 'Update Your Product' : 'Create a New Product'}</h1>
            <form onSubmit={handleSubmit} className='product-form'>
                <div className="product-name">
                    <label htmlFor="name">Name</label>
                    <p>Enter a short and descriptive name for your product.</p>
                        <input
                            id='name' type='text' value={name}
                            onChange={handleInputs(setName, 'name')}
                            ref={(el) => inputRefs.current.name = el}
                            required maxLength='50'
                        />
                    {errors.name && <p>{errors.name}</p>}
                </div>
                <div className="product-description">
                    <label htmlFor='description'>Description</label>
                    <p>Provide a detailed description of your product in 1000 characters or less. Highlight key features to attract potential buyers.</p>
                        <input
                            id='description' type='text-box' value={description}
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
                            id='price' type='number' value={price}
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
                            id='previewImage' type='url' value={previewImage}
                            onChange={handleInputs(setPreviewImage, 'previewImage')}
                            ref={(el) => inputRefs.current.previewImage = el}
                        />
                        {errors.previewImage && <p>{errors.previewImage}</p>}
                        <input
                            type='url' value={imageOne}
                            onChange={(e) => setImageOne(e.target.value)}
                        />
                        <input
                            type='url'
                            value={imageTwo}
                            onChange={(e) => setImageTwo(e.target.value)}
                        />
                        <input
                            type='url'
                            value={imageThree}
                            onChange={(e) => setImageThree(e.target.value)}
                        />
                </div>
                <button type='submit'>{product.id ? 'Update Product' : 'Create Product'}</button>
            </form>
        </div>
    )
}

export default ProductDetails;
