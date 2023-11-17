import { useState, useEffect } from 'react';
import Post from "../components/Post";
import PostType from '../types/post';
import { getAllPosts } from '../lib/apiWrapper';
import PostForm from '../components/PostForm';
import Button from 'react-bootstrap/Button';
import CategoryType from '../types/category';
import UserType from '../types/auth';

type PostsViewProps = {
    isLoggedIn: boolean,
    flashMessage: (message:string, category: CategoryType) => void,
    currentUser: UserType|null
}

export default function PostsView({ isLoggedIn, flashMessage, currentUser }: PostsViewProps) {
    const [posts, setPosts] = useState<PostType[]>([]);
    const [displayForm, setDisplayForm] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);

    useEffect( () => {
        async function fetchData(){
            const response = await getAllPosts();
            if (response.data){
                setPosts(response.data);
            }
        };

        fetchData()
    }, [formSubmitted])

    return (
        <>
            <h2>Posts</h2>
            { isLoggedIn && <Button variant='primary' onClick={() => setDisplayForm(!displayForm)}>
                {displayForm ? 'Hide Form' : '+ Create New Post'}
            </Button>}
            
            {displayForm && 
            <PostForm flashMessage={flashMessage} setDisplay={setDisplayForm} setForm={setFormSubmitted} toggle={formSubmitted} />}
            {posts.map((post) => (
                <Post key={post.id} post={post} currentUser={currentUser} />
            ))}
        </>
    );
}
