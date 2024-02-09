"use client"
import { Stack, Typography } from "@mui/joy";
import { useEffect, useState } from "react";

import { fetchPost } from "@/app/actions/post";
import { PostType } from "@/app/common/types/posts";
import { convertDateToString, toUppercaseFirstChar } from "@/app/lib/utils";


export default function PostItem({ params }: { params: { pid: string } }) {
    const [post, setPost] = useState<PostType>(null)

    const getPost = async (id: string) => {
        const data = await fetchPost({postId: id})
        setPost(data)
    }
    
    useEffect(() => {
        getPost(params.pid as string)        
    },[params.pid])

    
    return (
        <Stack spacing={2}>
            { post ? 
                <Stack alignItems="center" sx={{pt: "1.5rem"}} spacing={3}>
                    <Stack alignSelf="center">
                        <Typography level="title-lg" fontSize="24px">{toUppercaseFirstChar(post.title)}</Typography>
                        <Typography level="body-md" alignSelf="center">Auteur : {toUppercaseFirstChar(post.owner.name) ?? "Esgi"}</Typography>
                        <Typography level="body-sm" alignSelf="center">Mise à jour : {toUppercaseFirstChar(convertDateToString(post.updatedAt))}</Typography>
                    </Stack>
                    <div dangerouslySetInnerHTML={{ __html: post.description }} />
                </Stack>
                : <></>
            }
        </Stack>
    )
}