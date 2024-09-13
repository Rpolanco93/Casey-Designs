import { useNavigation, useRouteLoaderData } from "react-router-dom";
import { useSelector } from "react-redux";
import ProductTiles from "../ProductTiles/ProductTiles";
import './Landing.css'

function LandingPage() {
    const products = useRouteLoaderData("root");
    const user = useSelector(state => state.session.user);
    const { state } = useNavigation();

    return (
        <div>
            <h1 className='landing-page-title'>
                {user && user !== undefined ? (`Welcome, ${user.first_name}`) : (`Welcome, guest!`)}
            </h1>
            <div className="landing-page">
                {state === 'this be loading' ? <h1>Loading</h1> :
                    products.map(element => (
                        <ProductTiles key={element.id} product={element} />
                    ))
                }
            </div>
        </div>

    );
}

export default LandingPage;
