import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import PostType from "../types/post";
import UserType from "../types/auth";

type PostProps = {
    post: PostType,
    currentUser: UserType|null
}

export default function Post({ post, currentUser }: PostProps) {
    return (
        <Card className='my-3'>
            {/* <Card.Img variant='top' src={post.imageUrl} /> */}
            <Card.Body>
                <Card.Title>{ post.title }</Card.Title>
                <Card.Text>{ post.body }</Card.Text>
                <Card.Subtitle>Posted at {post.dateCreated} by {post.author.username}</Card.Subtitle>
                {post.userId === currentUser?.id && (
                    <Link to={`/posts/${post.id}`}>
                        <Button variant='light' className='mt-3'>Edit Post</Button>
                    </Link>
                )}
            </Card.Body>
        </Card>
    );
}
