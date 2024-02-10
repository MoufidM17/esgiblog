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


export default function PostItem({ params }: { params: { pid: string } }) {
    const router = useRouter()
    const { data: session } = useSession()
    const [post, setPost] = useState<GetPostType>(null)
    const [description, setDescription] = useState<string>("")
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [isSame, setIsSame] = useState<boolean>(false)

    const getPost = async (id: string) => {
        const data = await fetchPost({postId: id})
        setPost(data)
    }
    const handlePostEditButtonClick = () => {
        setOpenModal(true)
    }

    const handlePostSaveButtonClick = async () => {
        if (post != null) {
            const { owner, ...data } = post     
            await updatePost({post: {id: params.pid, ...data}})
            alert("Updated")
        } else {
            alert("Error")
        }
        router.push("/")
    }
    
    useEffect(() => {
        getPost(params.pid as string)        
    },[params.pid, session])

    
    return (
        <Stack spacing={2} sx={{bgcolor: "#fff"}}>
            { post ? 
                <Stack alignItems="center" sx={{pt: "1.5rem"}} spacing={3}>
                    <Stack>
                        <Typography level="title-lg" alignSelf="center" fontSize="26px">{toUppercaseFirstChar(post.title)}</Typography>
                        <Typography level="body-md" alignSelf="center">Auteur : {toUppercaseFirstChar(post.owner.name) ?? "Esgi"}</Typography>
                        <Typography level="body-sm" alignSelf="center">Mise à jour : {toUppercaseFirstChar(convertDateToString(post.updatedAt))}</Typography>
                    </Stack>
                    <div dangerouslySetInnerHTML={{ __html: post.description }} />
                </Stack>
                : <></>
            }
            {(session && session?.user?.email == post?.owner.email) ? 
                <Stack direction="row" spacing={2} justifyContent="center">
                    <IconButton sx={{gap: 1, p: 1}} variant="outlined"  onClick={handlePostEditButtonClick}>
                        <Edit2></Edit2> Modifier
                    </IconButton>
                    {isSame ?
                        <IconButton sx={{bgcolor: "#000", p: 1, gap: 1}} variant="solid" onClick={handlePostSaveButtonClick}>
                            <Save/> Enregistrer
                        </IconButton>
                        : <></>
                    }
                </Stack>
            : <></>}
            <Modal open={openModal} onClose={(_event: React.MouseEvent<HTMLButtonElement>, reason: string) => {
                    setPost((prev: GetPostType) => {
                        if (!prev) return prev
                        if (!description) return prev
                        if (post?.description != description) setIsSame(true)
                        return {...prev, description}
                    })
                    setOpenModal(false);
                }}
            >
                <ModalDialog layout={"fullscreen"} sx={{bgcolor: "#fff"}}>
                    <ModalClose size="lg" sx={{bgcolor: "#000"}}/>
                    <Stack  spacing={2} sx={{overflow: "auto", bgcolor: "#000", p: 2, mt:4}}>
                        <PostEditor content={post?.description} onSave={setDescription}/>
                    </Stack>
                </ModalDialog>
            </Modal>
        </Stack>
    )
}