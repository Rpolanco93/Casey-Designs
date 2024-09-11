import {Await, useLoaderData, useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {FaPlusCircle, FaRegComment, FaStar} from 'react-icons/fa';
import {useModal} from '../../context/Modal';
import {ReviewUpsertModal} from '../ReviewsModal/ReviewUpsertModal';
import {Suspense} from 'react';
import {DeleteReviewModal} from '../ReviewsModal/ReviewDeleteModal';
import './ProductPage.css'
import {PacmanLoader} from "react-spinners";

function ProductDetails() {
    const navigate = useNavigate()
    const data = useLoaderData()

    const user = useSelector(state => state.session.user)

    const { setModalContent, closeModal } = useModal();


    // handle on click for add to cart
    const handleAddToCart = () => {

    };

    // handle on click for add a review
    const handleAddReview = () => {
        setModalContent(
            <ReviewUpsertModal
                productId={data.product.id}
                onClose={closeModal}
            />
        );
    };

    // handle on click for edit a review
    const handleEditReview = () => {
        setModalContent(
            <ReviewUpsertModal
                productId={data.product.id}
                onClose={closeModal}
            />
        );
    };

    // handle on click for delete a review
    const handleDeleteReview = async () => {
        setModalContent(
            <DeleteReviewModal
                productId={data.product.id}
                onClose={closeModal}
            />
        )
    };

    //npm install react-spinners --save
    return (
        <div className='product-details-page'>
            <Suspense fallback={<PacmanLoader/>}>
                <Await
                    resolve={data.product}
                    errorElement={<p>Error loading product!</p>}
                >
                    {
                        product => (
                            <div className={"details"}>
                                <h1>{product.name}</h1>
                                <div className='product-details'>
                                    <div className='product-images'>
                                        <img className='product-image-main' src={product.previewImage} alt={product.name}/>

                                    </div>
                                    <div className='product-info'>
                                        <p className="product-description">{product.description}</p>
                                        <div className="product-price-d-page"><h3>Price: ${product.price}</h3><p>+tx</p>
                                        </div>
                                        <button
                                            className='product-details-add'
                                            onClick={() => user && product.isOwner ? navigate(`/account/products/${product.id}/edit`) : handleAddToCart(product.id)}
                                        >
                                            {user && product.isOwner ? 'Edit Product' : 'Add to Cart'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </Await>
            </Suspense>
            <Suspense fallback={<PacmanLoader/>}>
                <Await
                    resolve={data.reviews}
                    errorElement={<p>Error loading reviews!</p>}
                >
                    {
                        reviews => (
                            <div className={'reviews'}>
                                <div className="review-head"><h2>Reviews</h2><FaRegComment/></div>
                                {
                                    user && !data.product.isOwner ?
                                        <button onClick={handleAddReview}><FaPlusCircle/>Add a Review</button> :
                                        <button onClick={handleAddReview} disabled ><FaPlusCircle/>Add a Review</button>
                                }
                                {data.product.isOwner && <p>Add a review is disabled for the Product&apos;s owner</p>}
                                {reviews.length && reviews.map(review => (
                                    <div key={review.userId} className='product-details-review'>
                                        <h5>{review.user.firstName}</h5>
                                        <div className="avg-star"><p>{review.stars} </p><FaStar/></div>
                                        <p className="review-text">{review.review}</p>
                                        {user && review.userId === user.id && (
                                            <div className="review-edit-delete">
                                                <button onClick={() => handleEditReview(review)}>Edit</button>
                                                <button onClick={() => handleDeleteReview()}>Delete</button>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )
                    }
                </Await>
            </Suspense>
        </div>
    )
}

export default ProductDetails;
