import { useEffect, type FC } from 'react'
import { EditorContent, useEditor } from '@tiptap/react'
import { FloatingMenu } from '@tiptap/react/menus'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import { MenuBar } from '@/components/NoteEditorMenuBar'

interface NoteEditorProps {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
}

const NoteEditor: FC<NoteEditorProps> = ({
  value = '',
  onChange,
  placeholder = '輸入筆記內容…',
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder,
      }),
    ],
    content: value || '<p></p>',
    immediatelyRender: true,
    editorProps: {
      attributes: {
        class: 'min-h-40 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-blue-500',
      },
    },
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML())
    },
  })

  useEffect(() => {
    if (!editor) return

    const currentHtml = editor.getHTML()
    const nextHtml = value || '<p></p>'

    if (currentHtml !== nextHtml) {
      editor.commands.setContent(nextHtml, { emitUpdate: false })
    }
  }, [editor, value])

  return (
    <div className="space-y-2">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
}

export default NoteEditor