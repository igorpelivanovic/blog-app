import { FC, useEffect, useMemo } from "react";
import { useGetPostById } from "../query/posts/useGetPostByIdQuery";
import { useNavigate, useParams } from "react-router-dom";
import { useGetAuthUser } from "../query/auth/user";
import { generatePostImgUrlFromID } from "../utils/generateImgUrl";
import ManagePostForm, { DefaultValueFormProps, ManagePostFormSubmitData } from "../components/forms/ManagePostForm";
import ManagePostContainer from "./ManagePost";

const title: string = 'edit post'

const EditPostPage: FC = ()=>{
    
    const { postId } = useParams<string>()

    const navigate = useNavigate()

    if( !postId ) return

    const { data: postData } = useGetPostById(Number(postId))

    const { data: userData } = useGetAuthUser()

    if(!postData || !userData) return

    useEffect(()=>{
        if(postData.userId !== userData?.id){
            navigate(`/post/${postId}`, {replace: true})
            return
        }
    }, [postData.userId, userData?.id])

    const generateUrl = useMemo(()=>generatePostImgUrlFromID(userData.id, {
        'width': 800,
        'height': 550
    }), [userData?.id])

    const defaultValueForm: DefaultValueFormProps  = {...postData, image: generateUrl}

    const onSubmitMenageForm = (data: ManagePostFormSubmitData) => {
/*         console.log(data)
 */    }

    return(
        <ManagePostContainer titlePage={title}>
            <ManagePostForm defaultValue={defaultValueForm} onSubmit={onSubmitMenageForm}></ManagePostForm>
        </ManagePostContainer >
    )
}

export default EditPostPage