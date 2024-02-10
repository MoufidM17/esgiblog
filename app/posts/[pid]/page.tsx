"use client"
import { IconButton, Modal, ModalClose, ModalDialog, Stack, Typography } from "@mui/joy";
import { useEffect, useState } from "react";
import { Edit2, Save } from "react-feather";
import { useSession } from "next-auth/react";

import { fetchPost } from "@/app/actions/post";
import { PostType } from "@/app/common/types/posts";
import { convertDateToString, toUppercaseFirstChar } from "@/app/lib/utils";
import PostEditor from "@/app/components/common/postEditor";


export default function PostItem({ params }: { params: { pid: string } }) {
    const { data: session } = useSession()
    const [post, setPost] = useState<PostType>(null)
    const [description, setDescription] = useState<string>("")
    const [openModal, setOpenModal] = useState<boolean>(false)

    const getPost = async (id: string) => {
        const data = await fetchPost({postId: id})
        setPost(data)
    }
    const handlePostEditButtonClick = () => {
        setOpenModal(true)
    }

    const handlePostSaveButtonClick = () => {
        
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
                    <IconButton sx={{    p: 1}} variant="outlined"  onClick={handlePostEditButtonClick}>
                        <Edit2></Edit2> Modifier
                    </IconButton>
                    <IconButton sx={{bgcolor: "#000", p: 1}} variant="solid" onClick={handlePostSaveButtonClick}>
                        <Save></Save> Enregistrer
                    </IconButton>
                </Stack>
            : <></>}
            <Modal open={openModal} onClose={(_event: React.MouseEvent<HTMLButtonElement>, reason: string) => {
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