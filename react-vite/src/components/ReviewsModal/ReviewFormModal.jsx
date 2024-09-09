import {Form, useSubmit} from 'react-router-dom';

export const AddReviewModal = ({ productId, onClose }) => {
    const actionUrl = `products/${productId}/review/new`
    const reviewMethod = 'post'

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(e.target.elements)
    };

    return (
        <div className='review-form-modal'>
            <h2>Add a Review</h2>
            <Form meothod={reviewMethod} className='review-form' action={actionUrl}>
                <div className='review-text'>
                    <label htmlFor='review'>Enter a Review</label>
                    <textarea
                        placeholder='Write a Review'
                        id='review'
                        name='review'
                        type='text'
                        required minLength={5} maxLength="1000"
                    />
                </div>
                <div>
                    <label htmlFor='stars'>Rating</label>
                    <input
                        type="number"
                        name='stars'
                        required
                        min="1"
                        max="5"
                        step='1.00'
                    />
                </div>
                {/* {errors.length > 0 && (
                    <div className='review-errors'>
                        {errors.map((error, index) => <p key={index}>{error}</p>)}
                    </div>
                )} */}
                <div className='form-buttons'>
                    <button onSubmit={handleSubmit}>Submit</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </Form>
        </div>
    )
};


export const EditReviewModal = ({ productId, review, onClose }) => {
    return (
        <div className="review-form-modal">
            <h2>Edit Review</h2>
            <textarea
                value={updatedReview}
                onChange={(e) => setUpdatedReview(e.target.value)}
                required maxLength="1000"
            />
            <input
                type="number"
                value={starRating}
                onChange={(e) => setStarRating(Number(e.target.value))}
                min="1"
                max="5"
            />
            {errors.length > 0 && (
                <div className='review-errors'>
                    {errors.map((error, index) => <p key={index}>{error}</p>)}
                </div>
            )}
            <button onClick={handleSubmit}>Submit</button>
            <div className="cancel-delete"><button onClick={onClose}>Cancel</button></div>
        </div>
    );
};


export const DeleteReviewModal = ({ productId, review, onClose }) => {
    const dispatch = useDispatch();

    const handleSubmit = () => {
        dispatch(fetchDeleteReview({
            product_id: productId,
            review_id: review.id
        })).then(() => {
            dispatch(fetchProductId(productId));
            onClose();
        })
        .catch(err => console.error("Error deleting review:", err));
    };

    return (
        <div className="review-form-modal">
            <h2>Confirm Delete?</h2>
            <p>Are you sure you want to delete this review?</p>
            <div className="cancel-delete"><button onClick={handleSubmit}>Yes, Delete</button></div>
            <button onClick={onClose}>Cancel</button>
        </div>
    );
};
