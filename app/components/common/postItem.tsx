"use client"
import { Stack, Typography } from "@mui/joy";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import { fetchPost } from "@/app/actions/post";
import { GetPostType } from "@/app/common/types/posts";
import { convertDateToString, toUppercaseFirstChar } from "@/app/lib/utils";
import PostEditor from "@/app/components/common/postEditor";
import PostViewer from "@/app/components/common/postViewer";


export default function PostItem({ postId = "new" }: { postId?: string }) {
    const { data: session } = useSession()
    const [post, setPost] = useState<GetPostType>(null)
    const [description, setDescription] = useState<string>("")

    const getPost = async (id: string) => {
        const data : GetPostType= await fetchPost({postId: id})
        setPost(data)
        if (data?.description) setDescription(data?.description) 
    }
    
    useEffect(() => {
        if (postId == "new") {
            setPost({id: "", title: "les avantages de l'IA pour optimiser votre expérience-utilisateur", description: "", owner: {email: session?.user?.email, name: session?.user?.name}, updatedAt: new Date()} as GetPostType)
        } else {
            getPost(postId as string)
        }
    },[postId, session])
    
    return (
        <Stack spacing={2} sx={{bgcolor: "#fff"}}>
            { post ? 
                <Stack key={post.id} alignItems="center" sx={{pt: "1.5rem"}} spacing={3}>
                    <Stack>
                        <Typography level="title-lg" alignSelf="center" fontSize="26px">{toUppercaseFirstChar(post?.title ?? "")}</Typography>
                        <Typography level="body-md" alignSelf="center">Auteur : {toUppercaseFirstChar(post?.owner?.name ?? "") ?? "Esgi"}</Typography>
                        <Typography level="body-sm" alignSelf="center">Mise à jour : {toUppercaseFirstChar(convertDateToString(post.updatedAt ?? (new Date())))}</Typography>
                    </Stack>
                    {/* Check logged user is owner */}
                    {(session && session?.user?.email == post?.owner?.email) ? 
                        <PostEditor data={post} isNew={postId == "new"}/>
                    : 
                        <PostViewer content={description} />
                    }
                </Stack>
            : <></>
            }
        </Stack>
    )
}