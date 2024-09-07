import { useNavigate, useLoaderData } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaPlusCircle, FaRegComment, FaStar } from 'react-icons/fa';
import './ProductPage.css'

function ProductDetails() {
    const [product, reviews] = useLoaderData()
    const user = useSelector(state => state.session.user)
    const navigate = useNavigate()

    // handle on click for add to cart
    const handleAddToCart = (productId) => {
        e.preventDefault()
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
                    <button
                        className='product-details-add'
                        onClick={() => user && product.isOwner ? navigate(`/account/products/${product.id}/edit`) : handleAddToCart(product.id)}
                    >
                        {user && product.isOwner ? 'Edit Product' : 'Add to Cart'}
                    </button>
                </div>
            </div>
            <div className='product-details-reviews'>
                <div className="review-head"><h2>Reviews</h2><FaRegComment /></div>
                {user && !product.isOwner ? (
                    <button onClick={handleAddReview}><FaPlusCircle/>Add a Review</button>
                ) : <button onClick={handleAddReview} disabled ><FaPlusCircle/>Add a Review</button>
                }
                {product.isOwner && <p>Add a review is disabled for the Product's owner</p>}
                {reviews.length && reviews.map(review => (
                    <div key={review.userId} className='product-details-review'>
                        <h5>{review.user.firstName}</h5>
                        <div className="avg-star"><p>{review.stars} </p><FaStar/></div>
                        <p className="review-text">{review.review}</p>
                        {user && review.userId === user.id && (
                            <div className="review-edit-delete">
                                <button onClick={() => handleEditReview(review)}>Edit</button>
                                <button onClick={() => handleDeleteReview(review)}>Delete</button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ProductDetails;
