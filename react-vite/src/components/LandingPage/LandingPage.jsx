import { useLoaderData, useNavigation, useRouteLoaderData } from "react-router-dom";
import ProductTiles from "../ProductTiles/ProductTiles";

function LandingPage() {
    const products = useRouteLoaderData("root");
    const { state } = useNavigation();

    return (
        <div>
            {state === 'loading' ? <h1>Loading</h1> :
            products.map(element => (
                <ProductTiles key={element.id} product={element} />
            ))
            }
        </div>

    );
}

export default LandingPage;
