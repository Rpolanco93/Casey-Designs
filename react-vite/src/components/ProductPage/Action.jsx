export const action = async ({ params, request }) => {
    const form = await request.formData();
    const data = Object.fromEntries(form);
    const productSubmission = {
        name: data.name,
        price: data.price,
        description: data.description
    }

    if (request.method === 'PUT') {
        const submitEdit = await fetch(`/api/products/${params.productId}`, {
            method:'put',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(productSubmission)
        })
        return {submitEdit}
    } else if (request.method === 'POST') {
        console.log('its working')
        const submitPost = await fetch(`/api/products`, {
            method:'post',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(productSubmission)
        })

        return {submitPost}
    }
    return {error: 'incorrect method'}
}

export default action;
