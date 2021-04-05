
import axios from "axios";

const SET_POSTS = "SET-POSTS",
    ADD_COMMENTS = "ADD-COMMENTS",
    ADD_POSTS = 'ADD-POSTS',
    REMOVE_POSTS = 'REMOVE-POSTS',
    UPDATE_POSTS = 'UPDATE-POSTS',
    UPDATE_POSTS__BODY = 'UPDATE-POSTS_BODY'


let initialState = {
    posts: [],
    comments: []
}


export default function postsReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_POSTS:
            let newPost = {
                id: action.id,
                title: action.newPostsList,
                body: action.newPostBody

            }
            return {
                ...state,
                posts: [...state.posts, newPost],

            }
        case REMOVE_POSTS: {
            return {...state, posts: state.posts.filter(post  => post.id !== action.payload)}
        }
        case UPDATE_POSTS:
            return {
                ...state,
                posts: [...state.posts.map(post => post.id === action.payload.id ? {
                    ...post,
                    title: action.payload.title
                } : post)]
            }
        case UPDATE_POSTS__BODY:
            return {
                ...state,
                posts: [...state.posts.map(post => post.id === action.payload.id ? {
                    ...post,
                    body: action.payload.body
                } : post)]
            }
        case SET_POSTS:
            return {...state, posts: [...state.posts, ...action.payload]}
        case ADD_COMMENTS:
            let newComment = {
                postId: action.postId,
                body: action.newComments
            }
            return {
                ...state,
                posts: [...state.posts, newComment],

            }
        default:
            return state
    }

}

export const addNewPost = (newPostsList,newPostBody) => ({type: ADD_POSTS, newPostsList, newPostBody});
export const addComments = (newComments) => ({type: ADD_COMMENTS, newComments});
export const removePost = (id) => ({type: REMOVE_POSTS, payload: id});
export const updatePostTitle = (id, title) => ({type: UPDATE_POSTS, payload: {id: id, title: title}})
export const updatePostBody = (id, body) => ({type: UPDATE_POSTS__BODY, payload: {id: id, body: body}})


export const setPosts = (payload) => ({type: SET_POSTS, payload});


// export const addComment = (newComments) => (dispatch) => {
//     axios.post('https://bloggy-api.herokuapp.com/comments')
//         .then(response => {
//             dispatch(addComments(newComments))
//         })
// }
export const addPost = (newPostsList,newPostBody) => (dispatch) => {
    axios.post('https://bloggy-api.herokuapp.com/posts',{title: newPostsList, body: newPostBody } )
        .then(response => {
            dispatch(addNewPost())
        })
}

export const getPost = () => async (dispatch) => {
    axios.get('https://bloggy-api.herokuapp.com/posts')
        .then(response => {
            dispatch(setPosts(response.data))

        })

}

export const deletePosts = (id) => async (dispatch) => {
    axios.delete(`https://bloggy-api.herokuapp.com/posts/${id}`)
        .then(response => {
            dispatch(removePost())
        })
        .catch(err => {
            console.log(err)
        })
}

export const updateTitle = (id, title) => (dispatch) => {
    axios.put(`https://bloggy-api.herokuapp.com/posts/${id}`, {title: title})
        .then(response => {
            console.log(response.data)
            dispatch(updatePostTitle(id, title))

        })
}

export const updateBody = (id, body) => (dispatch) => {
    axios.put(`https://bloggy-api.herokuapp.com/posts/${id}`, {body: body})
        .then(response => {
            dispatch(updatePostBody(id, body))
        })
}
