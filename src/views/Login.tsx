import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import UserType from '../types/auth';

type Props = {}

export default function Login({}: Props) {

    const [userFormData, setUserFormData] = useState<Partial<UserType>>({username:'', password:''})

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserFormData({...userFormData, [e.target.name]: e.target.value})
    }
    
    return (
        <>
            <h1 className="text-center">Log In</h1>
            <Card className='mt-3'>
                <Card.Body>
                    <Form>
                        <Form.Label htmlFor='username'>Username</Form.Label>
                        <Form.Control value={userFormData.username} name='username' onChange={handleInputChange} />

                        <Form.Label htmlFor='password'>Password</Form.Label>
                        <Form.Control value={userFormData.password} name='password' type='password' onChange={handleInputChange} />

                        <Button type='submit' variant='outline-success' className='w-100 mt-3'>Log In</Button>
                    </Form>
                </Card.Body>
            </Card>
        </>
    )
}
