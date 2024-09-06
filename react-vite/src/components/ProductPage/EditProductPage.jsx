import { useLoaderData } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaPlusCircle, FaRegComment, FaStar } from 'react-icons/fa';
import './ProductPage.css'

function ProductDetails() {
    const product = useLoaderData()
    const user = useSelector(state => state.session.user)

    // handle on click for add to cart
    const handleAddToCart = (productId) => {
        // add code to add to cart
        return
    };

    // handle on click for add a review
    const handleAddReview = () => {
        // add code to add review
        return
    };

    // handle on click for edit a review
    const handleEditReview = (review) => {
        // add code for edit review
        return
    };

    // handle on click for delete a review
    const handleDeleteReview = (review) => {
        // add code for delete review
        return
    };

    return (
        <div className='product-details-page'>
            <h1>{product.name}</h1>
            <div className='product-details'>
                <div className='product-images'>
                    <img className='product-image-main' src={product.preview_image} alt={product.name}/>

                </div>
                <div className='product-info'>
                    <p className="product-description">{product.description}</p>
                    <div className="product-price-d-page"><h3>Price: ${product.price}</h3><p>+tx</p></div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails;
