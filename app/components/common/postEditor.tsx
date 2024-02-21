'use client'
import "@/app/testStyle/style.scss"
// import { useEditor, EditorContent } from '@tiptap/react'
import { Color } from '@tiptap/extension-color'
import axios from 'axios';
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import { EditorProvider, useCurrentEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Button, CircularProgress, IconButton, Stack } from "@mui/joy"
import { useCallback, useEffect, useState } from 'react'
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import { File, Save } from "react-feather"
import { addPost, updatePost } from "@/app/actions/post"
import { GetPostType } from "@/app/common/types/posts"
import { z } from "zod";

const schema = z.object({
  message: z.object({
    role: z.string(),
    content: z.string(),
  })
});

const MenuBar = () => {
  const { editor } = useCurrentEditor()

  if (!editor) {
    return null
  }

  return (
    <Stack direction="row" spacing={1}  sx={{bgcolor:"#000", justifyContent:"space-around", p: 1}}>
      <Button
        color={editor.isActive('bold') ? "warning" : "neutral"}
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleBold()
            .run()
        }
        // className={editor.isActive('bold') ? 'is-active' : ''}
      >
        bold
      </Button>
      <Button
        color={editor.isActive('italic') ? "warning" : "neutral"}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleItalic()
            .run()
        }
        // className={editor.isActive('italic') ? 'is-active' : ''}
      >
        italic
      </Button>
      <Button
        color={editor.isActive('strike') ? "warning" : "neutral"}
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleStrike()
            .run()
        }
        // className={editor.isActive('strike') ? 'is-active' : ''}
      >
        strike
      </Button>
      <Button
        color={editor.isActive('code') ? "warning" : "neutral"}
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleCode()
            .run()
        }
        // className={editor.isActive('code') ? 'is-active' : ''}
      >
        code
      </Button>
      <Button color={editor.isActive('unsetAllMarks') ? "warning" : "neutral"} onClick={() => editor.chain().focus().unsetAllMarks().run()}>
        clear marks
      </Button>
      <Button color={editor.isActive('clearNodes') ? "warning" : "neutral"} onClick={() => editor.chain().focus().clearNodes().run()}>
        clear nodes
      </Button>
      <Button
        color={editor.isActive('paragraph') ? "warning" : "neutral"}
        onClick={() => editor.chain().focus().setParagraph().run()}
        // className={editor.isActive('paragraph') ? 'is-active' : ''}
      >
        paragraph
      </Button>
      <Button
        color={editor.isActive('heading', { level: 1 }) ? "warning" : "neutral"}
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        // className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
      >
        h1
      </Button>
      <Button
        color={editor.isActive('heading', { level: 2 }) ? "warning" : "neutral"}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        // className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
      >
        h2
      </Button>
      <Button
        color={editor.isActive('heading', { level: 3 }) ? "warning" : "neutral"}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        // className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
      >
        h3
      </Button>
      <Button
        color={editor.isActive('heading', { level: 4 }) ? "warning" : "neutral"}
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        // className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}
      >
        h4
      </Button>
      <Button
        color={editor.isActive('heading', { level: 5 }) ? "warning" : "neutral"}
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        // className={editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}
      >
        h5
      </Button>
      <Button
        color={editor.isActive('heading', { level: 6 }) ? "warning" : "neutral"}
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        // className={editor.isActive('heading', { level: 6 }) ? 'is-active' : ''}
      >
        h6
      </Button>
      <Button
        color={editor.isActive('bulletList') ? "warning" : "neutral"}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        // className={editor.isActive('bulletList') ? 'is-active' : ''}
      >
        bullet list
      </Button>
      <Button
        color={editor.isActive('orderedList') ? "warning" : "neutral"}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        // className={editor.isActive('orderedList') ? 'is-active' : ''}
      >
        ordered list
      </Button>
      <Button
        color={editor.isActive('codeBlock') ? "warning" : "neutral"}
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive('codeBlock') ? 'is-active' : ''}
      >
        code block
      </Button>
      <Button
        color={editor.isActive('blockquote') ? "warning" : "neutral"}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive('blockquote') ? 'is-active' : ''}
      >
        blockquote
      </Button>
      <Button color={editor.isActive('bold') ? "warning" : "neutral"} onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        horizontal rule
      </Button>
      <Button color={editor.isActive('bold') ? "warning" : "neutral"} onClick={() => editor.chain().focus().setHardBreak().run()}>
        hard break
      </Button>
      <Button
        color={editor.isActive('undo') ? "warning" : "neutral"}
        onClick={() => editor.chain().focus().undo().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .undo()
            .run()
        }
      >
        undo
      </Button>
      <Button
        color={editor.isActive('redo') ? "warning" : "neutral"}
        onClick={() => editor.chain().focus().redo().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .redo()
            .run()
        }
      >
        redo
      </Button>
      {/* <Button
        color={editor.isActive('bold') ? "warning" : "neutral"}
        onClick={() => editor.chain().focus().setColor('#958DF1').run()}
        className={editor.isActive('textStyle', { color: '#958DF1' }) ? 'is-active' : ''}
      >
        purple
      </Button> */}
    </Stack>
  )
}

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  // TextStyle.configure({ types: [ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
]

const PostEditorActions = ({post, newDescription, isNewPost, setter}: {post: GetPostType, newDescription: string, isNewPost: boolean, setter: (value: string) => void}) => {
  const router = useRouter()
  const { data: session } = useSession()
  const [isLoading, setIsLoading] = useState<boolean>(false)


  const handlePostAddButtonClick = async () => {
    if (post != null) {
      const { id, owner, ...data } = post 
      await addPost({post: {...data, description: newDescription, userId: session?.user?.id}})
      router.replace(`/posts`)
      alert("Créer avec succès")
    } else {
      alert("Erreur lors de la création du post")
    }
  }

  const handlePostCancelChangeButtonClick = async () => {
    if (post != null) {
      const { owner, description, ...data } = post     
      await updatePost({post: {...data, description: newDescription}})
      router.push(`/posts`)
    } else {
      alert("Erreur du serveur")
    }
  }

  const handlePostSaveButtonClick = async () => {
    if (post != null) {
      const { owner, description, ...data } = post     
      await updatePost({post: {...data, description: newDescription}})
      router.push(`/posts/${post?.id}`)
      alert("Mise à jour avec succès")
    } else {
      alert("Error")
    }
  }

  const generateDescription = async (data: string) => {
    if (!post) {
      alert("Error : Impossible de générer la description")
      return
    }
    setIsLoading(true)
    fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: data,
      }),
    })
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      return schema.safeParse(json);
    })
    .then((d) => {
      return d.data.message.content;
    })
    .then((dd) => {
      dd = dd.replaceAll("<body>", "").replaceAll("</body>", "")
      setter(dd)
    })
    .catch((error) => {
      console.error(error);
    }).finally
    (() => {
      setIsLoading(false)
    });
  }

  return (
    <Stack direction="row" spacing={2} justifyContent="center">
      <IconButton sx={{gap: 1, p: 1}} variant="outlined"  onClick={handlePostCancelChangeButtonClick}>
        Retour à l'acceuil
      </IconButton>
      <IconButton sx={{bgcolor: "#000", p: 1, gap: 1}} variant="solid" onClick={() => {
        if (post) {
          generateDescription(post.title)
        }
      }}>
        { isLoading ? <CircularProgress sx={{color: "#fff"}}/> : <File/> }  Générer la description
      </IconButton>
      <IconButton sx={{bgcolor: "#000", p: 1, gap: 1}} variant="solid" onClick={() => isNewPost ? handlePostAddButtonClick() : handlePostSaveButtonClick()}>
        <Save/> {isNewPost ? "Créer" : "Enregistrer"}
      </IconButton>
    </Stack>
  )
}


const PostEditor = ({data, isNew}: {data: GetPostType, isNew: boolean}) => {
  const defaultContent = "<p>Hello World! 🌎️</p>"
  const [desc, setDesc] = useState<string>(defaultContent)

  useEffect(() => {
    if (data && data.description.length > 0) {
      setDesc(data.description) 
    }
  },[data,])

  return (
    <Stack key={"post_editor"} spacing={2} sx={{bgcolor: "#fff", p: 2, m: 10}}>
      <EditorProvider key={desc} slotBefore={<MenuBar />} extensions={extensions} content={desc } children={<PostEditorActions post={data} newDescription={desc} isNewPost={isNew} setter={setDesc}/>} onUpdate={({editor})=>{
        setDesc(editor.getHTML())
      }}
      ></EditorProvider>
    </Stack>
  )
}

export default PostEditor