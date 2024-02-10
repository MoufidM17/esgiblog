"use server"
import { getServerSession } from "next-auth/next"
import { Post } from "@prisma/client";

import authOptions from "@/app/lib/authOptions";
import { prismaClientDB } from "@/app/lib/prismaClient";

export const addLike = async ({id}: {id: string}) => {
    const session = await getServerSession(authOptions);

    if (session?.user?.email == null) return null
    const user = await prismaClientDB.user.findUnique({
      select: {id: true},
      where: {
        email: session?.user?.email
      }
    })
    if (user == null) return null

    const updatedPost = await prismaClientDB.post.update({
      where: { id : id },
      data: {
        likes: {
          create: {
            userId: user.id,
          },
        },
      },
    })

    // await prismaClientDB.postLikes.create({
    //   data: {
    //     postId: id,
    //     userId: user.id
    //   }
    // })

    // await prismaClientDB.user.update({
    //   where: { id : id },
    //   data: {
    //     likedPosts: {
    //       create: {
    //         postId: id,
    //       },
    //     },
    //   },
    // });
}

export const removeLike = async ({id}: {id: string}) => {
    const session = await getServerSession(authOptions);
    if (session?.user?.email == null) return
    const user = await prismaClientDB.user.findUnique({
      select: {id: true},
      where: {
        email: session?.user?.email
      }
    })
    if (user == null) return

    const updatedPost = await prismaClientDB.post.update({
      where: { id : id },
      data: {
        likes: {
            deleteMany: {
                // Spécifiez les conditions pour supprimer le like du user puis l'association du like et du user
                userId: user.id,
            },
        },
      },
    })
}

export const fetchLikeCount = async ({postId}: {postId: string}) => {
    const postLikesPosts = await prismaClientDB.post.findUnique({
        where: { id : postId },
        select: {
            likes: true
        }
    })
    return postLikesPosts?.likes.length
}

export const fetchPost = async ({postId}: {postId: string}) => {
  return await prismaClientDB.post.findUnique({
    where: { id : postId },
    select: {
      title: true,
      description: true,
      userId: true,
      owner: {
        select: {
          name: true,
          email: true,
        }
      },
      updatedAt: true,
      createdAt: true,
    }
  })
}

export const addPost = async ({post}: {post: Post}) => {
  await prismaClientDB.post.create({
    data: post
  })
}

export const updatePost = async ({post}: {post: Post}) => {
  await prismaClientDB.post.update({
    where: {id: post.id},
    data: post
  })
}