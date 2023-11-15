import { useState, useEffect } from 'react';
import Post from "../components/Post";
import PostType from '../types/post';


export default function PostsView() {
    const [posts, setPosts] = useState<PostType[]>([]);

    useEffect( () => {
        fetch('https://kekambas-132-api.onrender.com/api/posts')
            .then(res => res.json())
            .then(data => setPosts(data))
    }, [])

    return (
        <>
            <h2>Posts</h2>
            {posts.map((post) => (
                <Post key={post.id} post={post} />
            ))}
        </>
    );
}
