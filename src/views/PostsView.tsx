import { useState, useEffect } from 'react';
import Post from "../components/Post";
import PostType from '../types/post';
import { getAllPosts } from '../lib/apiWrapper';
import PostForm from '../components/PostForm';
import Button from 'react-bootstrap/Button';

type PostsViewProps = {
    isLoggedIn: boolean
}

export default function PostsView({ isLoggedIn }: PostsViewProps) {
    const [posts, setPosts] = useState<PostType[]>([]);
    const [displayForm, setDisplayForm] = useState(false);

    useEffect( () => {
        async function fetchData(){
            const response = await getAllPosts();
            if (response.data){
                setPosts(response.data);
            }
        };

        fetchData()
    }, [])

    return (
        <>
            <h2>Posts</h2>
            { isLoggedIn && <Button variant='primary' onClick={() => setDisplayForm(!displayForm)}>
                {displayForm ? 'Hide Form' : '+ Create New Post'}
            </Button>}
            
            {displayForm && <PostForm />}
            {posts.map((post) => (
                <Post key={post.id} post={post} />
            ))}
        </>
    );
}
