import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PostType from '../types/post';
import { getPost } from '../lib/apiWrapper';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
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

    return (
        <>
            <h1 className="text-center">Edit {postToEdit?.title}</h1>
            {postToEdit && (
                <Card>
                    <Card.Body>
                        <Form>
                            <Form.Label>Edit Post Title</Form.Label>
                            <Form.Control name='title' value={postToEdit.title} />
                            <Form.Label>Edit Post Body</Form.Label>
                            <Form.Control name='body' value={postToEdit.body} />
                            <Button variant='success' className='mt-3 w-50' type='submit'>Edit Post</Button>
                            <Button variant='danger' className='mt-3 w-50'>Delete Post</Button>
                        </Form>
                    </Card.Body>
                </Card>
            )}
        </>
    )
}