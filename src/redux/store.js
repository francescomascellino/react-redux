import { configureStore } from "@reduxjs/toolkit";

// WE IMPORT THE SLICES WE WILL USE. A SLICE IS A "PIECE", A "PART" OF A STATE.
import { postsReducer } from './postsSlice';

// WE USE configureStore FROM REDUX TOOLKIT TO CONFIGURE OUR STORE
export default configureStore({

    reducer: {

        // WE ASSIGN THE NAME OF EACH SLICE AS A PROPERTY AND THE REDUCER FUNCTION AS THE VALUE FOR THAT PROPERTY.
        posts: postsReducer,

    }

})