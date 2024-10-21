import { FC } from "react";
import MenagePostForm, { ManagePostFormSubmitData } from "../components/forms/ManagePostForm";
import { useCreatePost } from "../query/posts/useCreatePost";
import ManagePostContainer from "./ManagePost";

const title: string = 'create new post'

const CreatePostPage: FC = ()=>{
    
    const mutate = useCreatePost()

    const onSubmitMenageForm = (data: ManagePostFormSubmitData) => {
        mutate?.mutateAsync(data).then((val)=>console.log(val))
    } 

    return(
        <ManagePostContainer titlePage={title}>
            <MenagePostForm onSubmit={onSubmitMenageForm} />
        </ManagePostContainer>
    )
}

export default CreatePostPage