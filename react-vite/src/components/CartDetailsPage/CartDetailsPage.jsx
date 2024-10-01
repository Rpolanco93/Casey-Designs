import {useSelector} from "react-redux";

function CartDetailPage() {
    const currentUser = useSelector((state) => state.session.user);
    return <h1>Cart Details for {currentUser.first_name}</h1>
}

export default CartDetailPage;
