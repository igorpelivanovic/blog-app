import { useMemo } from "react"
import { generatePostImgUrlFromID } from "../../../utils/generateImgUrl"
import noImageSrc from "../../../assets/images/no-image.png"

type PostHeaderImageProps = {
    imgUrlParam: number
    img?: string | null
}

const PostHeaderImage: React.FunctionComponent<PostHeaderImageProps> = ({ imgUrlParam, img }) => {

    const generateUrl = useMemo(()=>{
        console.log(img)
        if(img) return img
        else if (img === null) return noImageSrc
        return generatePostImgUrlFromID(imgUrlParam, {
            'width': 800,
            'height': 550
        })
    }, [imgUrlParam, img])

    return(
        <div className="rounded-t-3xl overflow-hidden  max-w-[800px] max-h-[500px] border-image-fill-gradient">
            <img src={generateUrl} className="w-full  relative  object-center -z-[1]" alt={`header imaage post ${imgUrlParam}`} />
        </div>
    )
}

export default PostHeaderImage