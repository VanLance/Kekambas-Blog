import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PostType from '../types/post';
import { getPost, editPost, deletePost } from '../lib/apiWrapper';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import UserType from '../types/auth';
import CategoryType from '../types/category';


type EditPostProps = {
    currentUser: UserType|null,
    flashMessage: (message:string, category:CategoryType) => void
}

export default function EditPost({ currentUser, flashMessage }: EditPostProps) {
    const { postId } = useParams();
    const navigate = useNavigate();

    const [postToEdit, setPostToEdit] = useState<PostType|null>(null);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        async function getPostToEdit(){
            let response = await getPost(postId!);
            if (response.error){
                console.warn(response.error);
            } else {
                setPostToEdit(response.data!);
            }
        }

        getPostToEdit();
    }, []);

    useEffect(() => {
        if (postToEdit && currentUser){
            console.log(postToEdit, currentUser);
            if (postToEdit.userId !== currentUser.id){
                flashMessage('You do not have permission to edit this post.', 'warning');
                navigate('/posts');
            }
        }
    }, [postToEdit, currentUser])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setPostToEdit({...postToEdit!, [e.target.name]: e.target.value})
    }

    const handleFormSubmit = async (e:React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem('token') || ''
        const response = await editPost(token, postId!, postToEdit!);
        if (response.error){
            flashMessage(response.error, 'danger')
        } else {
            flashMessage(`${response.data?.title} has been edited`, 'success');
            navigate('/posts')
        }
    }

    const handleDeletePost = async () => {
        const token = localStorage.getItem('token') || ''
        const response = await deletePost(token, postId!);
        if (response.error){
            flashMessage(response.error, 'danger');
        } else {
            flashMessage(response.data?.success!, 'primary');
            navigate('/posts');
        }
    }

    return (
        <>
            <h1 className="text-center">Edit {postToEdit?.title}</h1>
            {postToEdit && (
                <Card>
                    <Card.Body>
                        <Form onSubmit={handleFormSubmit}>
                            <Form.Label>Edit Post Title</Form.Label>
                            <Form.Control name='title' value={postToEdit.title} onChange={handleInputChange} />
                            <Form.Label>Edit Post Body</Form.Label>
                            <Form.Control name='body' value={postToEdit.body} onChange={handleInputChange} />
                            <Button variant='success' className='mt-3 w-50' type='submit'>Edit Post</Button>
                            <Button variant='danger' className='mt-3 w-50' onClick={handleShow}>Delete Post</Button>
                        </Form>
                    </Card.Body>
                </Card>
            )}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete {postToEdit?.title}?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete {postToEdit?.title}? This action cannot be undone!
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={handleDeletePost}>
                        Delete Post
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}