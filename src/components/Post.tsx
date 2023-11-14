type PostType = {
    id: number;
    body: string;
    author: {
        user_id: number;
        username: string;
    };
};

export default function Post({ post }: { post: PostType }) {
    return (
        <p>
            <b>{post.author.username}</b> -- {post.body}
        </p>
    );
}
