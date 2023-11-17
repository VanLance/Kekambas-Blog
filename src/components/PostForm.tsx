import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import PostType from '../types/post';

type Props = {}

export default function PostForm({}: Props) {
    const [postFormData, setPostFormData] = useState<Partial<PostType>>({title:'', body:''})

    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setPostFormData({...postFormData, [e.target.name]: e.target.value})
    }

    return (
        <Card>
            <Card.Body>
                <Form>
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