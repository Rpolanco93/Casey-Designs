import { useNavigate } from "react-router-dom";

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

        const res = await submitEdit.json()
        return {res: {...res}, method: 'PUT', message: 'Successfully Updated Item!'}

    } else if (request.method === 'POST') {
        const submitPost = await fetch(`/api/products`, {
            method:'post',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(productSubmission)
        })

        const res = await submitPost.json()
        return {res: {...res}, method: 'POST', message: 'Successfully Created Item!'}
    }
    return {error: 'incorrect method'}
}

export default action;
