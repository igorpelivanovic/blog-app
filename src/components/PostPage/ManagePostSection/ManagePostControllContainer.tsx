import { FC, useCallback, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../../Modal/Modal";
import { GoXCircle } from "react-icons/go";
import { useDeletePost } from "../../../query/posts/useDeletePost";
import LoadSpinner from "../../Loader";

type ManagePostControllContainerProps = {
    postId: number
}

const ManagePostControllContainer: FC<ManagePostControllContainerProps> = ( {postId} ) => {

    const [ showModalDelete, setShowModalDelete ] = useState<boolean>(false)

    const navigate = useNavigate()

    const { mutateAsync, isLoading } = useDeletePost()

    const hideModal = useCallback(()=>{
        setShowModalDelete(false)
        return
    }, [])

    const showModal = useCallback(()=>{
        setShowModalDelete(true)
        return
    }, [])

    const cancelModal = useCallback(()=>{
        hideModal()
    }, [])

    const acceptModal = useCallback(()=>{
        mutateAsync(postId).then(response=>{
            if(response.data.isDeleted){ 
                navigate(`/profile/${response.data.userId}`)
            }
        })
        return
    }, [])

    return (
        <>
            <div className="space-x-5 text-base">
                <button className="inline-flex items-center bg-stone-300 hover:bg-stone-400 transition-colors py-1 px-3 space-x-1 rounded-md" type="button" onClick={showModal}><MdDelete /><span className="capitalize">delete</span></button>
                <Link className="inline-flex items-center bg-stone-300 hover:bg-stone-400 transition-colors py-1 px-3 space-x-1 rounded-md" to={`/edit-post/${postId}`}><MdEdit /><span className="capitalize">edit</span></Link>
            </div>
            {
                showModalDelete && 
                (
                    <Modal className="h-auto w-fit relative" closeButton={false} clickOutSideClose={true} disableOutSide={isLoading} closeModalFn={hideModal}>
                        {isLoading && (
                            <div className="absolute top-0 left-0 h-full w-full">
                                <LoadSpinner />
                            </div>
                        )}
                        <div className="text-center space-y-12 px-5">
                            <div className="flex flex-col items-center space-y-8 pt-2">
                                <GoXCircle className="text-6xl" />
                                <div className="space-y-4">
                                    <p className="first-letter:capitalize text-2xl font-semibold">are you sure?</p>
                                    <p className="first-letter:capitalize">do you really want to delete this post?</p>
                                </div>
                            </div>
                            <div className="space-x-5 font-semibold">
                                <button type="button" className="capitalize bg-red-800 py-1 px-8 rounded" onClick={cancelModal}>cancel</button>
                                <button type="button" className="capitalize bg-red-800 py-1 px-8 rounded" onClick={acceptModal}>delete</button>
                            </div>
                        </div>
                    </Modal>
                )
            }
        </>
    )
}

export default ManagePostControllContainer