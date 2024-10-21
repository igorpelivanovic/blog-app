import { FC } from "react";
import { MdEdit, MdDelete } from "react-icons/md";

const ManageCommentContainer: FC = () => {
    return (
        <div className="space-x-2">
            <button type="button" className="p-1 text-xl bg-slate-500">
                <span>
                    <MdEdit />
                </span>
            </button>
            <button type="button" className="p-1 text-xl bg-slate-500">
                <span>
                    <MdDelete />
                </span>
            </button>
        </div>
    )
}

export default ManageCommentContainer