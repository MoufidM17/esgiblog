import { Box, Typography } from '@mui/joy'

import PostCard from './components/common/postCard'
import { prismaClientDB } from './lib/prismaClient'


export default async function Home() {

  const getAllPosts = await prismaClientDB.post.findMany({
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
    <Box sx={{p: "12px"}}>
      <Box sx={{mb: "12px"}}>
        <Typography level="title-lg" textTransform="uppercase" sx={{ letterSpacing: '0.2rem', }}>Posts</Typography>
      </Box>
      <Box sx={{ gap: 2,  bgcolor: "white", display: "flex", justifyContent:"space-around", flexDirection:"row", flexWrap: 'wrap'}}>
        {[...getAllPosts].map((article, index: number) => <PostCard post={article}/>)} 
      </Box>
    </Box>
  )
}
