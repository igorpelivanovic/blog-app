import { FC, useEffect } from "react";
import { useGetPostById } from "../query/posts/useGetPostByIdQuery";
import { useNavigate, useParams } from "react-router-dom";
import { useGetAuthUser } from "../query/auth/user";
import ManagePostForm, { ManageFormT } from "../components/forms/ManagePostForm";
import ManagePostContainer from "./ManagePost";
import { useUpdatePost } from "../query/posts/useUpdatePost";

const title: string = 'edit post'

const EditPostPage: FC = ()=>{
    
    const { postId } = useParams<string>()

    const navigate = useNavigate()

    if( !postId ) return

    const { mutateAsync } = useUpdatePost()

    const { data: postData } = useGetPostById(Number(postId))

    const { data: userData } = useGetAuthUser()

    if(!postData || !userData) return

    useEffect(()=>{
        if(postData.userId !== userData?.id){
            navigate(`/post/${postId}`, {replace: true})
            return
        }
    }, [postData.userId, userData?.id])

    const onSubmitMenageForm = async(data: Partial<ManageFormT>) => {
        try{
            await mutateAsync( (({image, ...postData})=>({id: parseInt(postId), image: image?.[0], ...postData}))(data))
            navigate(`/post/${postId}`, {replace: true})
        }catch(e){
        }
    }

    return(
        <ManagePostContainer titlePage={title}>
            <ManagePostForm defaultValue={postData} onlyDirtySubmit={true} onSubmit={onSubmitMenageForm} submitBtnLabel="edit"></ManagePostForm>
        </ManagePostContainer >
    )
}

export default EditPostPage