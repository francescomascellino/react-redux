import { useState } from 'react';

import './App.css';



function App() {
    const [count, setCount] = useState(0)

    // POSTS USE A SELECTOR TO TAKE THE STATE VALUE FROM A SLICE IN THE STORE
    const posts = useSelector(
        (state) => state.posts.value // STATE-> SLICE NAME -> INITIAL STATE VALUE
    );

    return (
        <>

            <div className='container'>
                <div className="row">
                    <PostForm></PostForm>
                </div>
            </div>

            <h1 className="text-light mb-3">Redux Posts</h1>

            <div id="container" className="posts-list">

                {
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
