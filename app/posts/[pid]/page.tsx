"use client"
import { Stack } from "@mui/joy";
// import { useParams } from "next/navigation";
import { fetchPost } from "../../actions/post";
import { useEffect, useState } from "react";
import { PostType } from "@/app/common/types/posts";


export default function PostItem({ params }: { params: { pid: string } }) {
    // const {pid} = useParams()
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
                <div dangerouslySetInnerHTML={{ __html: post.description }} />
                : <></>
            }
        </Stack>
    )
}