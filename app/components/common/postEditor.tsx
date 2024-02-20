'use client'
import "@/app/testStyle/style.scss"
// import { useEditor, EditorContent } from '@tiptap/react'
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import { Editor, EditorProvider, useCurrentEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Button, IconButton, Stack } from "@mui/joy"
import { useEffect, useState } from 'react'
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import { Edit2, Save } from "react-feather"
import { updatePost } from "@/app/actions/post"
import { Post } from "@prisma/client"
import { GetPostType } from "@/app/common/types/posts"

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

const PostEditorActions = ({post, newDescription}: {post: GetPostType, newDescription: string}) => {
  const router = useRouter()

  const handlePostCancelChangeButtonClick = async () => {
    if (post != null) {
      const { owner, description, ...data } = post     
      await updatePost({post: {...data, description: newDescription}})
      router.push(`/posts`)
    } else {
      alert("Error")
    }
  }

  const handlePostSaveButtonClick = async () => {
    if (post != null) {
      const { owner, description, ...data } = post     
      await updatePost({post: {...data, description: newDescription}})
      router.push(`/posts/${post?.id}`)
      alert("Updated")
    } else {
      alert("Error")
    }
  }

  return (
    <Stack direction="row" spacing={2} justifyContent="center">
      <IconButton sx={{gap: 1, p: 1}} variant="outlined"  onClick={handlePostCancelChangeButtonClick}>
        Retour à l'acceuil
      </IconButton>
      <IconButton sx={{bgcolor: "#000", p: 1, gap: 1}} variant="solid" onClick={handlePostSaveButtonClick}>
        <Save/> Enregistrer
      </IconButton>
    </Stack>
  )
}


const PostEditor = ({data}: {data: GetPostType}) => {
  const defaultContent = "<p>Hello World! 🌎️</p>"
  const [isUpdated, setIsUpdated] = useState<boolean>(false)
  const [desc, setDesc] = useState<string>("")

  useEffect(() => {
    if (data) setDesc(data?.description)
  },[data])

  return (
    <Stack  spacing={2} sx={{bgcolor: "#fff", p: 2, m: 10}}>
      <EditorProvider slotBefore={<MenuBar />} extensions={extensions} content={data?.description ?? defaultContent} children={<PostEditorActions post={data} newDescription={desc} />} onUpdate={({editor})=>{
        setDesc(editor.getHTML())
        setIsUpdated(prev => {
          if (!data) return false
          return data.description == desc
        })
      }}
      ></EditorProvider>
    </Stack>
  )
}

export default PostEditor