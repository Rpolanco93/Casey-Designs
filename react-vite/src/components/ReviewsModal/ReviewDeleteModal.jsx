import {useFetcher} from 'react-router-dom';

export const DeleteReviewModal = ({ productId, onClose }) => {
    const fetcher = useFetcher({ key: 'delete-review'})
    // const handleSubmit = async () => {
    //     await fetch(`/api/reviews/${productId}`, {
    //         method: 'delete'
    //     })
    //     .then(() => onClose())
    //     .catch(err => console.error("Error deleting review:", err));
    // };

    return (
        <fetcher.Form className="delete-product-modal" method={'DELETE'} action={`products/${productId}/review`}>
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to delete this product?</p>
            <div className="cancel-delete"><button type='submit'>Yes, Delete</button></div>
            <button onClick={onClose}>Cancel</button>
        </fetcher.Form>
    );
};
