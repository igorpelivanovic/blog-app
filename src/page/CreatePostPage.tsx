import { FC } from "react";
import MenagePostForm, { ManageFormT } from "../components/forms/ManagePostForm";
import { useCreatePost } from "../query/posts/useCreatePost";
import ManagePostContainer from "./ManagePost";

const title: string = 'create new post'

const CreatePostPage: FC = ()=>{
    
    const mutate = useCreatePost()

    const onSubmitMenageForm = async(data: ManageFormT): Promise<void> => {
        const formatData = (({image, ...other})=>({image: image?.[0], ...other}))(data)
        await mutate?.mutateAsync(formatData)
        return
    } 

    return(
        <ManagePostContainer titlePage={title}>
            <MenagePostForm  onSubmit={onSubmitMenageForm} />
        </ManagePostContainer>
    )
}

export default CreatePostPage