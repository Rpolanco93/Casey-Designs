import {useFetcher} from 'react-router-dom';
import {useEffect} from "react";

export const DeleteReviewModal = ({productId, onClose}) => {
    //Do not set a "key" for the fetcher to prevent caching
    const fetcher = useFetcher()

    //Close the modal on Success otherwise alert the user
    useEffect(() => {
        const data = fetcher.data || {};

        //Early out if error key is not set
        if (data.error === undefined) {
            return;
        }

        //Success
        if (!data.error) {
            //Close the modal
            onClose();

            //Abort further processing
            return;
        }

        //An error happened and we need to do something
        alert(data.message)
    }, [fetcher, onClose])

    return (
        <fetcher.Form className="delete-product-modal" method={'delete'} action={`products/${productId}/review`}>
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to delete this product?</p>
            <div className="cancel-delete">
                <button type='submit'>Yes, Delete</button>
            </div>
            <button onClick={onClose}>Cancel</button>
        </fetcher.Form>
    );
};
