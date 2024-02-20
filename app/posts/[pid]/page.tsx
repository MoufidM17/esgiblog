"use client"
import { IconButton, Modal, ModalClose, ModalDialog, Stack, Typography } from "@mui/joy";
import { useEffect, useState } from "react";
import { Edit2, Save } from "react-feather";
import { useSession } from "next-auth/react";

import { fetchPost, updatePost } from "@/app/actions/post";
import { GetPostType } from "@/app/common/types/posts";
import { convertDateToString, toUppercaseFirstChar } from "@/app/lib/utils";
import PostEditor from "@/app/components/common/postEditor";
import { useRouter } from "next/navigation";
import { useRouter as useNavigationRouter } from 'next/router';
import PostViewer from "@/app/components/common/postViewer";


export default function PostItem({ params }: { params: { pid: string } }) {
    const router = useRouter()
    const { data: session } = useSession()
    const [post, setPost] = useState<GetPostType>(null)
    const [description, setDescription] = useState<string>("")
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [isSame, setIsSame] = useState<boolean>(true)

    const getPost = async (id: string) => {
        const data : GetPostType= await fetchPost({postId: id})
        setPost(data)
        if (data?.description) setDescription(data?.description) 
    }
    
    const handlePostEditButtonClick = () => {
        setOpenModal(true)
    }

    const handlePostSaveButtonClick = async () => {
        if (post != null) {
            const { owner, ...data } = post     
            await updatePost({post: {...data}})
            alert("Updated")
        } else {
            alert("Error")
        }
        setIsSame(true)
        router.push("/")
    }

    const handleModalClose = () => {
        if (post?.description != description) {
            setPost((prevPost: GetPostType) => {
                if (!prevPost) return prevPost
                const d ={...prevPost, description: description}
                console.log("datas => ",d);
                
                return d
            });
            setIsSame(false)
        }
        
    }
    
    useEffect(() => {
        getPost(params.pid as string)
    },[params.pid, session])
    
    return (
        <Stack spacing={2} sx={{bgcolor: "#fff"}}>
            {/* Post Viewer */}
            { post ? 
                <Stack key={post.id} alignItems="center" sx={{pt: "1.5rem"}} spacing={3}>
                    <Stack>
                        <Typography level="title-lg" alignSelf="center" fontSize="26px">{toUppercaseFirstChar(post?.title ?? "")}</Typography>
                        <Typography level="body-md" alignSelf="center">Auteur : {toUppercaseFirstChar(post?.owner?.name ?? "") ?? "Esgi"}</Typography>
                        <Typography level="body-sm" alignSelf="center">Mise à jour : {toUppercaseFirstChar(convertDateToString(post.updatedAt ?? (new Date())))}</Typography>
                    </Stack>
                    {(session && session?.user?.email == post?.owner?.email) ? 
                        <PostEditor data={post}/>
                    : 
                        <PostViewer content={description} />
                    }
                    {/* <div  dangerouslySetInnerHTML={{ __html: post.description }} /> */}
                </Stack>
            : <></>
            }
            {/* Post Button Actions */}
            {/* Check the owner */}
            {/* { (session && session?.user?.email == post?.owner?.email) ? 
                <Stack direction="row" spacing={2} justifyContent="center">
                    <IconButton sx={{gap: 1, p: 1}} variant="outlined"  onClick={handlePostEditButtonClick}>
                        <Edit2></Edit2> Modifier
                    </IconButton>
                    {!isSame ?
                        <IconButton sx={{bgcolor: "#000", p: 1, gap: 1}} variant="solid" onClick={handlePostSaveButtonClick}>
                            <Save/> Enregistrer
                        </IconButton>
                        : <></>
                    }
                </Stack>
            : <></>} */}
            {/* Post Edit Modal */}
            {/* <Modal open={openModal} onClose={(_event: React.MouseEvent<HTMLButtonElement>, reason: string) => {
                    handleModalClose()
                    setOpenModal(false);
                }}
            >
                <ModalDialog layout={"fullscreen"} sx={{bgcolor: "#fff"}}>
                    <ModalClose size="lg" sx={{bgcolor: "#000"}}/>
                    <Stack  spacing={2} sx={{overflow: "auto", bgcolor: "#000", p: 2, mt:4}}>
                        <PostEditor data={post} content={post?.description} onSave={setDescription}/>
                    </Stack>
                </ModalDialog>
            </Modal> */}
        </Stack>
    )
}