import {createSlice }from "@reduxjs/toolkit"

const modeSlice = createSlice({
    name: "mode",
    initialState: {
        mode: localStorage.getItem("mode") || "light",
        refresh: false,
        token: null,
        rootApi: "http://localhost:2000/api",
        auth: null,
        findFriends: [],
        posts:[],
        comments : [
            {
                id: 1,
                comment: "This is comment 1",
                avtar: "https://static.fotor.com/app/features/img/aiart/Cyberpunk/Cyberpunk%20female%20soldier%20generated%20by%20Fotor's%20AI%20art%20maker.png",
                timestamp: 1680158972757,
                user: "ak"
            },
            {
                id: 2,
                comment: "This is comment 2",
                avtar: "https://static.fotor.com/app/features/img/aiart/Cyberpunk/Cyberpunk%20female%20soldier%20generated%20by%20Fotor's%20AI%20art%20maker.png",
                timestamp: 1680158972757,
                user: "cedv"
            },
        ],
        auth: null,
        token: localStorage.getItem("token")
    },
    reducers:{
        changeMode: (state) =>{
            state.mode = state.mode === "light" ? "dark" : "light";
            localStorage.setItem("mode", state.mode); 
        },
        getAllPosts:(state, action) => {
            state.posts = action.payload
        },
        setRefresh: (state, action)=>{
            state.refresh = action.payload
        },
        addComment: (state, action)=>{
            const {comment} = action.payload;
            console.log(comment);
            state.comments.push({
                comment, 
                avtar: "https://static.fotor.com/app/features/img/aiart/Cyberpunk/Cyberpunk%20female%20soldier%20generated%20by%20Fotor's%20AI%20art%20maker.png",
                user: "John Wick",
                timestamp: Date.now(),
                id: state.comments.length + 1
            })
        },
        startSession: (state, action)=>{
            const token = action.payload
            console.log(token);
            localStorage.setItem("token", token)
        },
        getCurrentUser: (state, action)=>{
            // console.log(action.payload);
            state.auth = action.payload;
        },
        getFindFriends: (state, action) => {
            state.findFriends = action.payload;
        },
    }
})

export const {changeMode, addPost, deletePost, setRefresh, deleteComment, addComment, startSession, getCurrentUser, getFindFriends, getAllPosts} = modeSlice.actions

export default modeSlice.reducer;
