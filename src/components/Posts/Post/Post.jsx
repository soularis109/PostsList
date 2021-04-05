import React, {useEffect, useState} from 'react'
import {
    deletePosts,
    removePost,
    updateBody,
    updatePostBody,
    updatePostTitle,
    updateTitle
} from "../../redux/posts-reducer";
import {useDispatch, useSelector} from "react-redux";
import '../posts.css'
import {Comment} from "../Comment/Comment";


const Post = ({title, id, body}) => {

    const comments = useSelector(state => state.postsPage.comments)

    const dispatch = useDispatch();
    const [editMode, setEditMode] = useState(false);
    const [value, setValue] = useState('');

    const [secEditMode, setSecEditMode] = useState(false);

    const updateModeTitle = () => {
        if (editMode) {
            dispatch(updateTitle(id, value))
        }
        setEditMode(!editMode)
    }

    const updateModeBody = () => {
        if (secEditMode) {
            dispatch(updateBody(id, value))
        }
        setSecEditMode(!secEditMode)
    }


    return <>
        <div className='post__container border'>

            <div className='title'>
                <div className='title__item'>
                    {editMode ?
                        <input className='title__input'
                               onChange={e => setValue(e.target.value)} value={value} autoFocus={true}/> :
                        <div className='title__name border'>{title}</div>}</div>

                <div className='title__item'>
                    <button className='item__edit' onClick={updateModeTitle}>
                        {editMode ? 'Save' : 'Edit'}</button>
                </div>
            </div>

            <div className='body'>
                <div className='body__item'>
                    {secEditMode ?
                        <input className='item__titleInput border'
                               onChange={e => setValue(e.target.value)} value={value} autoFocus={true}/> :
                        <div className='body__name border'>{body}</div>}
                </div>
                <div className='body__item'>
                    <button className='item__edit' onClick={updateModeBody}>
                        {secEditMode ? 'Save' : 'Edit'}</button>
                </div>
            </div>
            <div className='comment__item'>
            {comments.map(comment => <Comment  key={comments.key} body={comment.body} id={comment.postId}/>
            )}
            </div>
        <button className='delete' onClick={() => dispatch(deletePosts(id))}>Delete</button>
        </div>
    </>
}

export default Post;