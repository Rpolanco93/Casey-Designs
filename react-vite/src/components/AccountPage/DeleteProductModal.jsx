import {useState} from "react";
import {PacmanLoader} from "react-spinners";

export const DeleteProductModal = ({productId, onClose}) => {
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = () => {
        setIsLoading(true)
        fetch(`/api/products/${productId}`, {
            method: 'delete'
        })
            .then(() => onClose())
            .catch(err => {
                console.error("Error deleting review:", err)
                setIsLoading(false)
            });
    };

    return isLoading ? <PacmanLoader/> : (
        <div className="delete-product-modal">
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to delete this product?</p>
            <div className="cancel-delete">
                <button onClick={handleSubmit}>Yes, Delete</button>
            </div>
            <button onClick={onClose}>Cancel</button>
        </div>
    );
};
