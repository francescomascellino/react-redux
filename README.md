# React Exercise: Tic-Tac-Toe

# Basics

## Initialize a new project
```bash
npm create vite@latest . -- --template react
```

### Install Bootstrap dependances if necessary
```bash
npm i --save bootstrap @popperjs/core

npm i --save-dev sass
```

## Install Redux and its Toolkit
```bash
npm install @reduxjs/toolkit react-redux
```

## Create a new "slice"

_postSlice.js_
```js
// IMPORT THE createSlice FUNCTION FROM REDUX TOOLKIT 
import { createSlice } from "@reduxjs/toolkit";

export const postsSlice = createSlice({

    // NAME OF THE SLICE
    name: "posts",

    // INITIAL STATE VALUE FOR THE SLICE
    initialState: {
        value: [
            {
                id: 1,
                title: "TEST POPST 1",
                body: "This is a test post. It's just for testing purposes.",
            },

            {
                id: 2,
                title: "TEST POST 2",
                body: "This is a test post. It's just for testing purposes.",
            }
        ],
    },

    // WE DEFINE THE REDUCERS ACTIONS
    reducers: {

        add: (state, action) => {
            state.value.push(action.payload);
        },

    },

});

// WE EXPORT THE SLICE ACTIONS AND REDUCERS
export const { add } = postsSlice.actions;

export const postsReducer = postsSlice.reducer;
```

## Create a _store.js_ file and import the slices we created
```js
import { configureStore } from "@reduxjs/toolkit";

// WE IMPORT THE SLICES REDUCERS WE WILL USE. A SLICE IS A "PIECE", A "PART" OF A STATE.
import { postsReducer } from './postsSlice';

// WE USE configureStore FROM REDUX TOOLKIT TO CONFIGURE OUR STORE
export default configureStore({

    reducer: {

        // WE ASSIGN THE NAME OF EACH SLICE AS A PROPERTY AND THE REDUCER FUNCTION AS THE VALUE FOR THAT PROPERTY.
        posts: postsReducer,

    }

})
```

## Import _store_ FROM _store.js and _Provider_ from Redux. We then wrap our Provider around our Aoo component so the store will be accessible.

_main.jsx_
```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.scss';

// IMPORT store REDUX/STORE WE EXPORTED
import store from './redux/store.js';

// IMPORT PROVIDER FROM REDUX
import { Provider } from 'react-redux';


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>

        {/* ASSIGN THE REDUX STORE TO THE PROVIDER */}
        {/* NOW OUR APP CAN CONSUME THE VALUES PROVIDED FROM PROVIDER */}
        <Provider store={store}>

            <App />

        </Provider>

    </React.StrictMode>,
)
```

import { useState } from 'react';

import './App.css';

import { useSelector } from 'react-redux';

import PostForm from './components/postform';

## We import _useSelector_  to access the global state of our app, which is stored in the Redux Store. This hook allows us to select specific data from that state. In this case we are selecting the data from postSlice.
```js
import { useSelector } from 'react-redux';

function App() {

    // POSTS USE A SELECTOR TO TAKE THE STATE VALUE FROM A SLICE IN THE STORE
    const posts = useSelector(
        (state) => state.posts.value // STATE-> SLICE NAME -> INITIAL STATE VALUE
    );

    return (
        <>

            {/* OTHER CODE */}

            <div id="container" className="posts-list">

                {
                    {/* WE CAN MAP THE DATA FROM THE STATE OF OUR SLICE THANKS TO THE SELECTOE */}
                    posts.slice().reverse().map((post) => (
                        <div className='bg-light rounded p-2 my-3' key={post.id}>

                            <div>
                                <span>
                                    {post.userId}
                                </span>
                            </div>

                            <h4>Title: {post.title}
                            </h4>

                            <p>
                                {post.body}
                            </p>
                        </div>

                    ))
                }

            </div>

        </>
    )
}

export default App
```

## We use the _useDispatch_ hook to call the actions from our reducer

_PostForm.jsx_ Component
```js
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

            // WE USE THE add ACTION FROM OUR SLICE THANKS TO useDispatch
            dispatch(add(post));
        }


        console.log(posts);
    };

    return (
        <>

            {/* FORM */}
            {/* ON SUBMIT WE RECALL  FUNCTION THAT USES THE add ACTION */}
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
```

### useState and useEffect basics
https://github.com/francescomascellino/react-socialposts


### useReducer basics
https://github.com/francescomascellino/react-useReducer