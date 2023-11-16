import axios from 'axios';
import PostType from '../types/post';
import APIResponse from '../types/api';
import UserType from '../types/auth';


const base: string = 'https://kekambas-132-api.onrender.com/api'
const postEndpoint: string = '/posts'
const userEndpoint: string = '/users'
const tokenEndpoint: string = '/token'


const apiClientNoAuth = () => axios.create(
    {
        baseURL: base
    }
)

const apiClientBasicAuth = (username:string, password:string) => axios.create(
    {
        baseURL: base,
        headers: {
            Authorization: 'Basic ' + btoa(`${username}:${password}`)
        }
    }
)


async function getAllPosts(): Promise<APIResponse<PostType[]>> {
    let data;
    let error;
    try {
        const response = await apiClientNoAuth().get(postEndpoint);
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.message
        } else {
            error = 'Something went wrong'
        }
    }
    return {data, error}
}


async function createNewUser(newUserData:Partial<UserType>): Promise<APIResponse<UserType>> {
    let data;
    let error;
    try{
        const response = await apiClientNoAuth().post(userEndpoint, newUserData);
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return {data, error}
}


async function login(username:string, password:string): Promise<APIResponse<{token:string}>> {
    let data;
    let error;
    try{
        const response = await apiClientBasicAuth(username, password).get(tokenEndpoint);
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return {data, error}
}


export {
    getAllPosts,
    createNewUser,
    login,
}
