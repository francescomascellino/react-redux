import { useState } from "react";

// IMPORT useDispatch TO CALL ACTIONS CREATED
import { useDispatch } from "react-redux";

// IMPORT ACTIONS FROM THE DESIRED SLICE
import { add } from "../redux/postsSlice";

import { useSelector } from 'react-redux';

function PostForm() {

    // POSTS USE A SELECTOR TO TAKE THE STATE VALUE FROM A SLICE IN THE STORE
    const posts = useSelector(
        (state) => state.posts.value // STATE-> SLICE NAME -> INITIAL STATE VALUE
    );

    // WE ASSIGN useDispatch TO A VARIABLE
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        userId: "",
        title: "",
        body: ""
    });

    function handleFieldChange(e) {

        console.log(e);

        const { name, value } = e.target

        setFormData({
            ...formData,
            [name]: value
        })
    };

    function resetForm(e) {
        e.preventDefault();

        return setFormData({
            userId: "",
            title: "",
            body: ""
        })

    };

    function handleSubmit(e) {
        e.preventDefault();

        if (formData.userId.length > 0 && formData.title.length > 0 && formData.body.length > 0) {
            const post = {
                id: posts.length + 1,
                userId: formData.userId,
                title: formData.title,
                body: formData.body,
            };

            console.log(post);

            setFormData({
                userId: "",
                title: "",
                body: ""
            });

            dispatch(add(post));
        }


        console.log(posts);
    };

    return (
        <>

            {/* FORM */}
            <form className="bg-light rounded"
                onSubmit={handleSubmit}>

                {/* NAME FORM */}
                <div className="mb-3 p-3">
                    <label htmlFor="userId" className="form-label">Name</label>
                    <input
                        type="text"
                        name="userId"
                        id="userId"
                        className="form-control"
                        placeholder="Rick Sanchez"
                        aria-describedby="helpId"
                        value={formData.userId}
                        onChange={handleFieldChange}
                    />
                    <small id="helpId" className="text-muted">Enter your name</small>
                </div >

                {/* TITLE FORM */}
                <div className="mb-3 p-3">
                    <label htmlFor="body" className="form-label">Title</label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        className="form-control"
                        placeholder="Write your post title here"
                        aria-describedby="helpId"
                        value={formData.title}
                        onChange={handleFieldChange}
                    />
                    <small id="helpId" className="text-muted">Enter a title for your post</small>
                </div >

                {/* BODY FORM */}
                <div className="mb-3 p-3">
                    <label htmlFor="body" className="form-label">Content</label>
                    <input
                        type="text"
                        name="body"
                        id="body"
                        className="form-control"
                        placeholder="Write something here"
                        aria-describedby="helpId"
                        value={formData.body}
                        onChange={handleFieldChange}
                    />
                    <small id="helpId" className="text-muted">Enter some content</small>
                </div >


                <div className="text-center py-2">

                    {/* RESET BUTTON */}
                    <button className="btn btn-dark mx-3" onClick={resetForm}>Reset Form</button>

                    {/* SUBMIT BUTTON */}
                    <button type="submit" className="btn btn-dark mx-3">Add Post</button>
                </div>

            </form>

        </>
    )

}

export default PostForm;