import { FC} from "react";
import ManagePostForm from "../components/forms/ManagePostForm";

type MenagePostPageProps =  {
    titlePage: string
    children:  React.ReactElement<typeof ManagePostForm>
}

const ManagePostContainer:FC<MenagePostPageProps> = ( { titlePage, children } ) => {
    return (
        <div className="post-page-container space-y-16">
            <div>
                <h1 className="text-3xl font-semibold first-letter:capitalize">{titlePage}</h1>
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}

export default ManagePostContainer