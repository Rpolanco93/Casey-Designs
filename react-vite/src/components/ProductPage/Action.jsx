import { redirect } from "react-router-dom";

export const productAction = async ({ params, request }) => {
    const form = await request.formData();
    const data = Object.fromEntries(form);

    if (!(new Set(['POST', 'PUT']).has(request.method.toUpperCase()))) {
         return {
            error: true,
            message: 'Unsupported HTTP method.'
        };
    }

    const url = params.productId ? `/api/products/${params.productId}` : `/api/products`;
    const product = {
        name: data.name,
        price: data.price,
        description: data.description
    };

    const response = await fetch(url, {
        method: request.method,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(product)
    });

    try {
        const json = await response.json()

        //Check if response has validation errors
        if (response.status == 400) {
            return {
                error: true,
                ...json
            }
        }

        //Every worked as expected
        if (params.productId) {
            return {res: {...json}, error: false, message: 'Successfully Updated Item!'}
        } else {
            return redirect(`/products/${json.id}`)
        }
    } catch (error) {
         return {
            error: true,
            message: error.message
        }
    }

 }

 export const reviewAction = async ({params, request}) => {
    const form = await request.formData();
    const data = Object.fromEntries(form);

    if ((new Set(['POST', 'PUT']).has(request.method.toUpperCase()))) {
        const something = await reviewUpsert(params, request, data)
        return something
    } else if ((new Set(['DELETE']).has(request.method.toUpperCase()))) {
        const somethingelse = await reviewDelete(params, request, data)
        return somethingelse
   } else {
        return {message: 'unsupported'}
   }
 }

 const reviewDelete = async (params, request, data) => {
    const url = `/api/reviews/${params.productId}`

    const response = await fetch(url, {
        method: request.method
    });

    try {
        const json = await response.json()

        //Check if response has validation errors
        if (response.status == 400) {
            return {
                error: true,
                ...json
            }
        }

        //Every worked as expected
        return {res: {...json}, error: false, message: 'Review Deleted!'}
        // return redirect(`/products/${params.productId}`)

    } catch (error) {
         return {
            error: true,
            message: error.message
        }
    }
 }

 const reviewUpsert = async (params, request, data) => {
    const url = `/api/products/${params.productId}/reviews`

    const response = await fetch(url, {
        method: request.method,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });

    try {
        const json = await response.json()

        //Check if response has validation errors
        if (response.status == 400) {
            return {
                error: true,
                ...json
            }
        }

        //Every worked as expected
        return {res: {...json}, error: false, message: 'Review Created!'}
        // return redirect(`/products/${params.productId}`)

    } catch (error) {
         return {
            error: true,
            message: error.message
        }
    }
 }

 export const fetcherReset = (fetcher) => {
    fetcher.submit({}, {action: '/data/reset-fetcher', method: 'post'})
}
