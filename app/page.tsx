/**
 * Rendering : server component
 * Data Fetching : Server (server action)
 */

import { Box, Typography } from '@mui/joy'

import PostCard from '@/app/components/common/postCard'
import { prismaClientDB } from '@/app/lib/prismaClient'
import { Posts } from "@/app/common/types/posts";


export default async function Home() {
  const getAllPosts: Posts = await prismaClientDB.post.findMany({
    select: {
      id: true,
      title: true,
      createdAt: true,
      owner: {
        select: {
          id: true,
          name: true,
        }
      },
      likes: {
        select: {
          userId: true,
          user: {
            select: {
              email: true
            }
          }
        }
      },
      _count: {
        select: { likes: true },
      },
    },
    orderBy: [
      {
        updatedAt: 'desc',
      }
    ],
  })
  
  return (
    <Box sx={{p: "12px", bgcolor: "#fff"}}>
      <Box key="home_title" sx={{mb: "12px"}}>
        <Typography level="title-lg" textTransform="uppercase" sx={{ letterSpacing: '0.2rem', }}>Posts</Typography>
      </Box>
      <Box key="home_posts" sx={{ gap: 2,  bgcolor: "white", display: "flex", justifyContent:"space-around", flexDirection:"row", flexWrap: 'wrap'}}>
        {[...getAllPosts].map(
          (post, index: number) => <PostCard post={post}/>)
        } 
      </Box>
    </Box>
  )
}
