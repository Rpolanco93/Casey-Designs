import {useFetcher} from 'react-router-dom';

export const AddReviewModal = ({productId, onClose}) => {
    const fetcher = useFetcher({ key: 'add-review'});

    return (
        <div className='review-form-modal'>
            <h2>Add a Review</h2>
            <fetcher.Form method={'POST'} action={`products/${productId}/review`}>
                <div className='review-text'>
                    <label htmlFor='review'>Enter a Review</label>
                    <textarea
                        placeholder='Write a Review'
                        name='review'
                        required minLength={5} maxLength="1000"
                    />
                </div>
                <div>
                    <label htmlFor='stars'>Rating</label>
                    <input
                        type="number"
                        name="stars"
                        required
                        min="1"
                        max="5"
                        step="1"
                    />
                </div>
                {/* {errors.length > 0 && (
                    <div className='review-errors'>
                        {errors.map((error, index) => <p key={index}>{error}</p>)}
                    </div>
                )} */}
                <div className='form-buttons'>
                    <button type="submit">Submit</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </fetcher.Form>
        </div>
    )
};
