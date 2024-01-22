"use client"

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Toolbar } from './toolbar';


interface EditorProps {
  onChange: (value: string) => void;
  value: string;

}

export const Editor = ({
  onChange,
  value,
} : EditorProps) => {
  const editor = useEditor(({
    extensions: [
      StarterKit.configure({})
      
    ],

    content: value,
    editorProps: {
      attributes: {
        class: 
        "rounded-md border min-h-[150px] border-input p-2"
      },
    },
    onUpdate({editor}){
      onChange(editor.getText())
      console.log(editor.getText())
    }
  }))

  return (
    <div className="bg-white">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )

}