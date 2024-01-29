import { cache } from 'react'
import { Avatar, Box, List, ListItem, ListItemContent, ListItemDecorator, Stack, Typography } from "@mui/joy";
import { prismaClientDB } from '../lib/prismaClient';
import { useSession } from "next-auth/react"

export const getUser = cache(async (id: string) => {
    const item = await prismaClientDB.user.findUnique({ where: {id} })
    return item
})


export default function AccountPage () {
    const { data: session } = useSession()
    console.log('datas => ', session);
    
    return (
        <Box component={'main'} sx={{p: 4, gap: 2}}>
            <Typography id="esgiblog-account-label" level="body-lg" textTransform="uppercase"
                sx={{ letterSpacing: '0.15rem', }}
            >
                Profile
            </Typography>
            <List>
                <ListItem>
                    <ListItemDecorator>
                        <Avatar src="https://lh3.googleusercontent.com/a/ACg8ocJkXB8ExBfOqxAUppbEBs0ZBZ1X1OpRY4ozM7lA9W9qF-U=s96-c"/>
                    </ListItemDecorator>
                    <ListItemContent>
                        <Typography level="body-lg" fontWeight='bold' textTransform="uppercase" >{'moufid MOUTAROU'}</Typography>
                        <Typography level="body-md" noWrap> moufidmoutarou04@gmail.com </Typography>
                    </ListItemContent>
                </ListItem>
            </List>
        </Box>
    );
}

