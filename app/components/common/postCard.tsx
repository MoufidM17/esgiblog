"use client";
import {useEffect, useState} from "react";
import {
  IconButton,
  Typography,
  Divider,
  Card,
  CardContent,
  CardOverflow,
  CardActions,
  Box,
  AspectRatio,
} from "@mui/joy";
import { Heart } from "react-feather";
import { useRouter } from "next/navigation";
import { signIn, useSession } from 'next-auth/react'
import Link from "next/link";
import { addLike, fetchLikeCount, removeLike } from "@/app/actions/post";
// import { prismaClientDB } from "@/app/lib/prismaClient";
// import useFavoriteStore from "../../../store/favoriteStore";
// import { Rating, Recipe } from "@prisma/client";

export type PostCardType = {
  id: string,
  title: string,
  owner: {
    id: string,
    name: string | null,
    // email: string | null,
  };
  likes: {
    user: {
        email: string | null;
    };
    userId: string;
  }[],
  _count: {
    likes: number,
  };
}
const defaultPost = {
  id: "1",
  title: "title:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  owner : {
    id: "u1",
    name: "Author Name",
  },
  likes: [{
      user: {
          email: "email@gmail.com",
      },
      userId: "ul1"
  }],
  _count: {
    likes: 0,
  }
}
export default function PostCard({post = defaultPost}: {post?: PostCardType}) {
  const { id, title, owner, likes, _count } = post
  const router = useRouter()
  const { data : session } = useSession()
  const [isFavorite, setIsFavorite] = useState<boolean>(false)
  const [countLike, setCountLike] = useState<number>(0)
  //   const { updateFavorites, getFavorites } = useFavoriteStore((state) => state);

  const addLikeToPost = async () => {
    const u = await addLike({id});
    // setUser(u);
  };

  const removeLikeToPost = async () => {
    const u = await removeLike({id});
    // setUser(u);
  };

  const handleSetFavorite = async () => {
    if (!session || !session.user){
      signIn()
      return
    } 
    
    
    setIsFavorite(prev => !prev)
    if (isFavorite) {
      setCountLike(prevCountLike => prevCountLike -1)
      removeLikeToPost()
    } else {
      setCountLike(prevCountLike => prevCountLike + 1)
      addLikeToPost()
    }
    // setCountLike(_count.likes)
  }

  useEffect(() => {
    // Mettre à jour visuellement après chaque clic sur le bouton
    setCountLike(_count.likes);
  
    // Vérifier si l'utilisateur a aimé ce poste après chaque clic sur le bouton
    const isUserFavorite = likes.find((value) => value.user.email === session?.user?.email);
    setIsFavorite(!!isUserFavorite);
  }, [likes, _count.likes, session?.user?.email]);

  useEffect(() => {
    const fetchData = async () => {
      const likeCount = await fetchLikeCount({postId: id})
      if (likeCount) setCountLike(likeCount)

      const isUserFavorite = likes.find((value) => value.user.email == session?.user?.email)
      if (isUserFavorite) setIsFavorite(true)
    }

    fetchData();
    
    
  }, [])
  
  return (
    <Card key={`postCard_${id}`} variant="outlined" sx={{ width: 390 }}>
      <Box sx={{display:"flex", alignItems: "flex-start", justifyContent: "space-between", wordWrap: "break-word"}}>
        <Box width={'80%'}>
          <Link href={`/posts/${ id }`}>
            <Typography level="title-lg" >{title}</Typography>
          </Link>
        </Box>
        <IconButton aria-label="Like minimal photography" variant="plain" onClick={handleSetFavorite} sx={{mt: "-0.5rem", "&:hover:":{color: "red"}}}>
          <Heart color={ isFavorite ? "#000" : 'grey'}/>
        </IconButton>
      </Box>
      <AspectRatio minHeight="120px" maxHeight="200px">
        <img
          src="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286"
          srcSet="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286&dpr=2 2x"
          loading="lazy"
          alt=""
        />
      </AspectRatio>
      <CardContent>
        <Typography>Author : {owner.name?.toLocaleUpperCase()}</Typography>
      </CardContent>
      <CardOverflow variant="soft">
        <Divider inset="context" />
        <CardActions orientation="horizontal" sx={{display: 'flex', justifyContent: 'space-between'}}>
          <Typography level="body-xs">{countLike.toString()} like(s)</Typography>
          <Typography level="body-xs">{"time"}</Typography>
        </CardActions>
      </CardOverflow>
    </Card>
  );
}