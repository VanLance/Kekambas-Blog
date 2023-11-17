import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import UserType from '../types/auth';
import { login, getMe } from '../lib/apiWrapper';
import CategoryType from '../types/category';

type LoginProps = {
    logUserIn: (user:UserType) => void,
    isLoggedIn: boolean,
    flashMessage: (message:string, category:CategoryType) => void
}

export default function Login({ logUserIn, isLoggedIn, flashMessage }: LoginProps) {

    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn){
            navigate('/')
        }
    })

    const [userFormData, setUserFormData] = useState<Partial<UserType>>({username:'', password:''})

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserFormData({...userFormData, [e.target.name]: e.target.value})
    }

    const handleFormSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();
        const response = await login(userFormData.username!, userFormData.password!)
        if (response.error){
            flashMessage(response.error, 'warning')
        } else {
            localStorage.setItem('token', response.data?.token as string)
            const response2 = await getMe(response.data?.token as string)
            logUserIn(response2.data!);
            navigate('/');
        }
    }

    return (
        <>
            <h1 className="text-center">Log In</h1>
            <Card className='mt-3'>
                <Card.Body>
                    <Form onSubmit={handleFormSubmit}>
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
