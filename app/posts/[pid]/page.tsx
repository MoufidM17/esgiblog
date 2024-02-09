"use client"
import { IconButton, Stack, Typography } from "@mui/joy";
import { useEffect, useState } from "react";

import { fetchPost } from "@/app/actions/post";
import { PostType } from "@/app/common/types/posts";
import { convertDateToString, toUppercaseFirstChar } from "@/app/lib/utils";
import { useSession } from "next-auth/react";
import { Edit2 } from "react-feather";


export default function PostItem({ params }: { params: { pid: string } }) {
    const { data: session } = useSession()
    const [post, setPost] = useState<PostType>(null)

    const getPost = async (id: string) => {
        const data = await fetchPost({postId: id})
        setPost(data)
    }
    const handlePostEditButtonClick = () => {

    }
    
    useEffect(() => {
        getPost(params.pid as string)        
    },[params.pid, session])

    
    return (
        <Stack spacing={2}>
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
            {session && session?.user?.email == post?.owner.email ? 
                <IconButton onClick={handlePostEditButtonClick}>
                    <Edit2></Edit2> Modifier
                </IconButton>
            : <></>}
        </Stack>
    )
}