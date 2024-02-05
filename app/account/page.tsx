'use client'
// import { cache } from 'react'
import { Avatar, Box, List, ListItem, ListItemContent, ListItemDecorator, Stack, Typography } from "@mui/joy";
// import { prismaClientDB } from '../lib/prismaClient';
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation";

// export const getUser = cache(async (id: string) => {
//     const item = await prismaClientDB.user.findUnique({ where: {id} })
//     return item
// })


export default function AccountPage () {
    const { data: session } = useSession()

    // Redirect if user session is not defined
    if (!session) {
        redirect('/')
    }
    
    return (
        <Box component={'main'} sx={{p: 4, gap: 2}}>
            <Typography id="esgiblog-account-label" level="body-lg" textTransform="uppercase" sx={{ letterSpacing: '0.15rem', }}>
                Profile
            </Typography>
            <List>
                <ListItem>
                    <ListItemDecorator>
                        <Avatar src={session.user?.image ?? "P"}/>
                    </ListItemDecorator>
                    <ListItemContent>
                        <Typography level="body-lg" fontWeight='bold' textTransform="uppercase" >{session.user?.name ?? "John Deo"}</Typography>
                        <Typography level="body-md" noWrap>{session.user?.email ?? "johndeo@gmail.com"}</Typography>
                    </ListItemContent>
                </ListItem>
            </List>
        </Box>
    );
}

