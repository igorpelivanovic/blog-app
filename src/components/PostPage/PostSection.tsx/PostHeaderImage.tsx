import { useMemo } from "react"
import { generatePostImgUrlFromID } from "../../../utils/generateImgUrl"

type PostHeaderImageProps = {
    imgUrlParam: number
}

const PostHeaderImage: React.FunctionComponent<PostHeaderImageProps> = ({ imgUrlParam }) => {

    const generateUrl = useMemo(()=>generatePostImgUrlFromID(imgUrlParam, {
        'width': 800,
        'height': 550
    }), [imgUrlParam])

    return(
        <div className="rounded-t-3xl overflow-hidden border-image-fill-gradient">
            <img src={generateUrl} className="w-full relative -z-[1]" alt={`header imaage post ${imgUrlParam}`} />
        </div>
    )
}

export default PostHeaderImage