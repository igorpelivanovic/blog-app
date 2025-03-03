import { Navigate, RouteObject } from "react-router-dom"
import HeaderLayout from "./layout/HeaderLayout"
import HomePage from "./page/Home"
import SearchPage from "./page/Search"
import { Suspense } from "react"
import LoadSpinner from "./components/Loader"
import TagPage from "./page/Tags"
import PostPage from "./page/Post"
import SingInPage from "./page/SingIn"
import AppLayout from "./layout/AppLayout"
import NotSingGuard from "./guards/notSingGuard"
import IsSingGuard from "./guards/isSingGuard"
import ProfilePage from "./page/Profile"
import CreatePostPage from "./page/CreatePostPage"
import EditPostPage from "./page/EditPostPage"
import HttpErrorBounderyPage from "./components/HttpErrorBoundery"
import { GrDocumentExcel } from "react-icons/gr";
import { FaUserXmark } from "react-icons/fa6"


const routes: RouteObject[]  = [
    {
        path: "",
        element: <Suspense fallback={<LoadSpinner/>}><AppLayout /></Suspense>,
        ErrorBoundary: ()=>{
            return <HttpErrorBounderyPage hanlder={{
                default: {
                    title: 'something wrong, please try again later'
                }}
            } />
        },
        children: [
            {
                path: "",
                element: <HeaderLayout />,
                children: [
                    {
                        index: true,
                        element: <Suspense fallback={<LoadSpinner/>}><HomePage /></Suspense>
                    },
                    {
                        path: "search",
                        element: <Suspense fallback={<LoadSpinner/>}><SearchPage /></Suspense>
                    },
                    {
                        path: "tag/:tagId",
                        element: <Suspense fallback={<LoadSpinner/>}><TagPage /></Suspense>
                    },
                    {
                        path: "post/:postId",
                        errorElement: <HttpErrorBounderyPage hanlder={{
                            404: {
                                title: 'post not found',
                                icon: <GrDocumentExcel />
                            },
                            default: {
                                title: 'something wrong, please try again later'
                            }}
                        } />,
                        element: <Suspense fallback={<LoadSpinner/>}><PostPage /></Suspense>
                    },
                    {
                        path: "profile/:userId",
                        element: <Suspense fallback={<LoadSpinner/>}><ProfilePage /></Suspense>,
                        errorElement: <HttpErrorBounderyPage hanlder={{
                            404: {
                                title: 'user not found',
                                icon: <FaUserXmark />
                            },
                            default: {
                                title: 'something wrong, please try again later'
                            }}
                        } />,
                    },
                    {
                        path: "/",
                        element: <IsSingGuard />,
                        children: [
                            {
                                path: "new-post",
                                element: <CreatePostPage />
                            },
                            {
                                path: "edit-post/:postId",
                                element: <EditPostPage />
                            }
                        ]
                    }
                ],
            },
            {
                path: "/",
                element: <NotSingGuard />,
                children: [
                    {
                        path: "login",
                        element: <SingInPage />
                    }
                ]
            },
            {
                path: "*",
                element: <Navigate replace={true} to={"/"} />
            }
        ]
    }
]

export { routes }

