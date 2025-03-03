import { FC} from "react";
import ManagePostForm from "../components/forms/ManagePostForm";

type MenagePostPageProps =  {
    titlePage: string
    children:  React.ReactElement<typeof ManagePostForm>
}

const ManagePostContainer:FC<MenagePostPageProps> = ( { titlePage, children } ) => {
    return (
        <div className="post-page-container h-full lg:gap-16 gap-5">
            <div>
                <h1 className="text-3xl text-center lg:text-left font-semibold first-letter:capitalize">{titlePage}</h1>
            </div>
            <div className="flex-1 flex flex-col">
                {children}
            </div>
        </div>
    )
}

export default ManagePostContainer