import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import Post from "./Post/Post";
import PostsForm from "./Post/PostsFrom";
import {getPost} from "../redux/posts-reducer";




const Posts = () => {

    const dispatch = useDispatch()
    const posts = useSelector(state => state.postsPage.posts)

    useEffect(() => {
       dispatch(getPost())
    },[])


    return <>
        <h1>Posts Lists</h1>
        <PostsForm/>
        {posts.map((post, id)  => <Post key={post.key} title={post.title} id={post.id} body={post.body} />)}
    </>
}

export default Posts;