import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import PostType from '../types/post';
import { createPost } from '../lib/apiWrapper';
import CategoryType from '../types/category';

type Props = {
    flashMessage: (message:string, category: CategoryType) => void,
    setDisplay: (display:boolean) => void,
    setForm: (form:boolean) => void,
    toggle: boolean
}

export default function PostForm({ flashMessage, setDisplay, setForm, toggle }: Props) {
    const [postFormData, setPostFormData] = useState<Partial<PostType>>({title:'', body:''})

    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setPostFormData({...postFormData, [e.target.name]: e.target.value})
    }

    const handleFormSubmit = async (e:React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem('token') || ''
        const response = await createPost(token, postFormData);
        if (response.error){
            flashMessage(response.error, 'danger');
        } else {
            flashMessage(`${response.data?.title} has been created`, 'info');
            setDisplay(false);
            setForm(!toggle);
        }
    }

    return (
        <Card>
            <Card.Body>
                <Form onSubmit={handleFormSubmit}>
                    <Form.Label htmlFor='title'>Title</Form.Label>
                    <Form.Control name='title' placeholder='Enter Post Title' onChange={handleInputChange} value={postFormData.title} />
                    <Form.Label htmlFor='body'>Body</Form.Label>
                    <Form.Control name='body' placeholder='Enter Body Title' onChange={handleInputChange} value={postFormData.body} />
                    <Button variant='primary' className='w-100 mt-3' type='submit'>Create Post</Button>
                </Form>
            </Card.Body>
        </Card>
    )
}