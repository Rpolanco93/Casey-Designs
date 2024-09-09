export const DeleteProductModal = ({ productId, onClose }) => {
    const handleSubmit = async () => {
        await fetch(`/api/products/${productId}`, {
            method: 'delete'
        })
        .then(() => onClose())
        .catch(err => console.error("Error deleting review:", err));
    };

    return (
        <div className="delete-product-modal">
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to delete this product?</p>
            <div className="cancel-delete"><button onClick={handleSubmit}>Yes, Delete</button></div>
            <button ç>Cancel</button>
        </div>
    );
};
