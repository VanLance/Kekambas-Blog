import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import UserType from '../types/auth';
import { createNewUser, login } from '../lib/apiWrapper';
import CategoryType from '../types/category';

type SignUpProps = {
    logUserIn: (user:UserType) => void,
    flashMessage: (message:string, category:CategoryType) => void
}

export default function SignUp({ logUserIn, flashMessage }: SignUpProps) {

    const navigate = useNavigate();

    const [userFormData, setUserFormData] = useState<Partial<UserType>>(
        {
            firstName: '',
            lastName: '',
            email: '',
            username: '',
            password: '',
            confirmPassword: ''
        }
    )

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setUserFormData({...userFormData, [e.target.name]: e.target.value})
    }

    const handleFormSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();
        const response = await createNewUser(userFormData);
        if (response.error){
            flashMessage(response.error, 'danger')
        } else {
            const newUser = response.data!
            const newUserTokenResponse = await login(userFormData.username!, userFormData.password!)
            localStorage.setItem('token', newUserTokenResponse.data?.token!)
            logUserIn(newUser);
            navigate('/');
        }
    }

    const validatePasswords = (password:string, confirmPassword:string):boolean => {
        return password.length >= 5 && password === confirmPassword
    }

    const validatedForm = validatePasswords(userFormData.password!, userFormData.confirmPassword!)

    return (
        <>
            <h1 className="text-center">Sign Up</h1>
            <Card className='mt-3'>
                <Card.Body>
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Label htmlFor='firstName'>First Name</Form.Label>
                        <Form.Control value={userFormData.firstName} name='firstName' onChange={handleInputChange} />

                        <Form.Label htmlFor='lastName'>Last Name</Form.Label>
                        <Form.Control value={userFormData.lastName} name='lastName' onChange={handleInputChange} />

                        <Form.Label htmlFor='email'>Email</Form.Label>
                        <Form.Control value={userFormData.email} name='email' type='email' onChange={handleInputChange} />

                        <Form.Label htmlFor='username'>Username</Form.Label>
                        <Form.Control value={userFormData.username} name='username' onChange={handleInputChange} />

                        <Form.Label htmlFor='password'>Password</Form.Label>
                        <Form.Control value={userFormData.password} name='password' type='password' onChange={handleInputChange} />

                        <Form.Label htmlFor='confirmPassword'>Confirm Password</Form.Label>
                        <Form.Control value={userFormData.confirmPassword} name='confirmPassword' type='password' onChange={handleInputChange} />

                        <Button type='submit' variant='outline-success' className='w-100 mt-3' disabled={!validatedForm}>Sign Up</Button>
                    </Form>
                </Card.Body>
            </Card>
        </>
    )
}
