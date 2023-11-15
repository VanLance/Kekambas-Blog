import { useState, useEffect } from 'react';
import Post from "../components/Post";

type Post = {
    id:number,
    body:string,
    author: {
        user_id: number,
        username: string
    }
}

export default function PostsView() {
    const [x, setX] = useState(true)
    const [posts, setPosts] = useState<Post[]>([])

    useEffect(() => {
        if (x){
            console.log('Hello', x)
        } else {
            console.log('Goodbye', x)
        }
    }, [x])

    useEffect( () => {
        console.log('The side effect is running');
        // Code to mimic fetching data from API
        setTimeout(() => setPosts([
            {
                id: 1,
                body: "I'm missing kekambas",
                author: {
                    user_id: 1,
                    username: "brians",
                },
            },
            {
                id: 2,
                body: "Killer job on that whitebaord",
                author: {
                    user_id: 2,
                    username: "sarahs",
                },
            },
            {
                id: 3,
                body: "Isn't React Fun",
                author: {
                    user_id: 3,
                    username: "dylans",
                },
            },
        ]), 1000)
    }, [])

    return (
        <>
            <h2>Posts</h2>
            {posts.map((post, i) => (
                <Post key={i} post={post} />
            ))}
            <button onClick={() => setX(!x)}>Change X</button>
            <button onClick={() => setPosts([])}>Clear Posts</button>
        </>
    );
}
