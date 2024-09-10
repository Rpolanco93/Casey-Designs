import {redirect} from "react-router-dom";

export const productAction = async ({params, request}) => {
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
        if (response.status === 400) {
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

    if ((new Set(['POST', 'PUT', 'DELETE']).has(request.method.toUpperCase()))) {
        const url = `/api/products/${params.productId}/review`

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
            if (!response.ok) {
                return reply(true, response.statusText, json);
            }

            //Every worked as expected
            return reply(false, `Review ${request.method.toUpperCase()} Completed!`);
        } catch (error) {
            return reply(true, error.message);
        }
    } else {
        return reply(true, `Unsupported HTTP method: ${request.method.toUpperCase()}`)
    }
}

const reply = (error, message, json = {}) => {
    return {
        error: error,
        message: message,
        ...json
    };
}
