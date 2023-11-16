import { useState, useEffect } from 'react';
import Post from "../components/Post";
import PostType from '../types/post';
import { getAllPosts } from '../lib/apiWrapper';


export default function PostsView() {
    const [posts, setPosts] = useState<PostType[]>([]);

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
            {posts.map((post) => (
                <Post key={post.id} post={post} />
            ))}
        </>
    );
}
