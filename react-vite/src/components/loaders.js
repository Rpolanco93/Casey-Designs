import {json} from "react-router-dom"

export async function productDetailsLoader({params}) {
    let [product, images, reviews] = await Promise.all([
        fetch(`/api/products/${params.productId}`),
        fetch(`/api/products/${params.productId}/reviews`)
    ])

    return json({product, images, reviews})
}
