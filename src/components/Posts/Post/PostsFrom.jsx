import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {addNewPost, addPost} from "../../redux/posts-reducer";
import {Modal} from "react-bootstrap";
import './post.css'
import axios from "axios";

let PostsForm = () => {

    const dispatch = useDispatch()
    const [value, setValue] = useState('')
    const [body, setBody] = useState('')
    const [show, setShow] = useState(false)


    const onSubmit = e => {
        e.preventDefault();
        if (value.length <= 0) {
            return value
        } else {
            dispatch(addPost(value, body))
            setValue('')
            setBody('')
        }
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Body>
                        <form onSubmit={onSubmit}>
                            <div className='modal__container'>
                                <div>Title</div>
                                <input
                                    className='todo__inp border'
                                    name="newPostsList"
                                    type="text"
                                    placeholder="Add title"
                                    onChange={e => setValue(e.target.value)} value={value}/>
                                <div>Body</div>
                                <input
                                    className='todo__inp border'
                                    name="newPostBody"
                                    type="text"
                                    placeholder="Add body"
                                    onChange={e => setBody(e.target.value)} value={body}/>
                                <div>
                                    <button onClick={handleClose}>add</button>
                                </div>
                            </div>
                        </form>
                    </Modal.Body>
                </Modal.Header>
            </Modal>
            <button className='todo__btn' onClick={handleShow}>Add Post</button>

        </>
    )
}


export default PostsForm;