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