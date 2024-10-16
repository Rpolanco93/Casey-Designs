import {Await, useFetcher} from "react-router-dom";
import {Suspense, useEffect, useState} from "react";
import {PacmanLoader} from "react-spinners";

export const ReviewUpsertModal = ({productId, onClose}) => {
    //Create a fetcher to load and submit
    const fetcher = useFetcher();

    //Create a promise to be resolved after data is loaded by the fetcher
    const [promise] = useState(Promise.withResolvers())

    //Track errors
    const [errors, setErrors] = useState({});

    //Track if the fetcher has been submitted
    const [submitted, setSubmitted] = useState(false);

    //Close the modal on Success otherwise alert the user
    useEffect(() => {
        //Create helper for fetcher data
        const data = fetcher.data;

        //If the fetcher is currently idle and there is no data loaded, load some
        if (!submitted && fetcher.state === "idle" && data === undefined) {
            return fetcher.load(`/products/${productId}/review`);
        }

        //If the fetcher is currently idle and there is data loaded, render
        if (!submitted && fetcher.state === "idle" && data !== undefined) {
            return promise.resolve(data);
        }

        //If the fetcher is currently idle, and we have submitted modal should be closed if there is no error
        if (submitted && fetcher.state === "idle") {
            //Debug logging
            //console.log(data);

            //If data is data after submitting or there is an error take action
            if (data === undefined || data.error) {
                //Set the error for user feedback
                setErrors({
                    message: data.message || 'An unknown error has occurred'
                });

                //Reset submitted state
                setSubmitted(false)
            } else {
                //Close the modal
                onClose();
            }
        }

        //If the fetcher crossed into the submitting state once idle modal should be closed
        if (!submitted && fetcher.state === "submitting") {
            setSubmitted(true)
        }
    }, [fetcher, promise, submitted, onClose, productId]);

    //Debug logging
    //console.log(fetcher);

    return (
        <div className="review-form-modal">
            <Suspense fallback={<PacmanLoader/>}>
                <Await
                    resolve={promise.promise}
                    errorElement={<p>Error loading review!</p>}
                >
                    {
                        review => (
                            <fetcher.Form method={review.review ? "put" : "post"}
                                          action={`products/${productId}/review`}>
                                <h2>{review.review ? "Update Your Review" : "Add A Review"}</h2>
                                <div className="review-text">
                                    <label htmlFor="review">Enter a Review</label>
                                    <textarea
                                        placeholder="Write a Review"
                                        name="review"
                                        required minLength={5} maxLength="1000"
                                        defaultValue={review.review}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="stars">Rating</label>
                                    <input
                                        type="number"
                                        name="stars"
                                        required
                                        min="1"
                                        max="5"
                                        step="1"
                                        defaultValue={review.stars}
                                    />
                                </div>
                                {Object.keys(errors).length > 0 && (
                                    <div className="review-errors">
                                        {Object.keys(errors).map(key => <p key={key}>{errors[key]}</p>)}
                                    </div>
                                )}
                                <div className="form-buttons">
                                    <button type="submit">Submit</button>
                                    <button onClick={onClose}>Cancel</button>
                                </div>
                            </fetcher.Form>
                        )
                    }
                </Await>
            </Suspense>
        </div>
    )
};
