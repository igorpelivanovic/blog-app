type PostBodyContentProps = {
    postContent: string
}

const PostBodyContent: React.FunctionComponent<PostBodyContentProps> = ({ postContent }) => {
    return (
        <div className="text-xl">
            <p className="first-letter:uppercase">{postContent}</p>
        </div>
    )
}


export default PostBodyContent