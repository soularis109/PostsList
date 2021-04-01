import React, {useState} from 'react'
import {removePost, updatePost, updatePostBody, updatePostTitle} from "../../redux/posts-reducer";
import {useDispatch} from "react-redux";
import '../posts.css'

const Post = ({title, id, idx, body}) => {

    const dispatch = useDispatch();
    const [editMode, setEditMode] = useState(false);
    const [value, setValue] = useState('')

    const updateModeTitle = () => {
        if (editMode) {
            dispatch(updatePostTitle(id, value))
        }
        setEditMode(!editMode)
    }

    const updateModeBody = () => {
        if (editMode) {
            dispatch(updatePostBody(id, value))
        }
        setEditMode(!editMode)
    }

    return <>
        <div className='list__container'>
            {editMode ?
                <input className='item__titleInput border'
                       onChange={e => setValue(e.target.value)} value={value} autoFocus={true}/> :
                <div className='item__title border'>{title}</div>}</div>
        <div className='item__change'>
            <button className='item__edit' onClick={updateModeTitle}>
                {editMode ? 'Save' : 'Edit'}</button>
        </div>

        <div className='post__container'>
            {editMode ?
                <input className='item__titleInput border'
                       onChange={e => setValue(e.target.value)} value={value} autoFocus={true}/> :
                <div className='item__title border'>{body}</div>}</div>

        <div className='item__change'>
            <button className='item__edit' onClick={updateModeBody}>
                {editMode ? 'Save' : 'Edit'}</button>
        </div>
        <button className='item__edit' onClick={() => dispatch(removePost(idx))}>Delete</button>

    </>
}

export default Post;