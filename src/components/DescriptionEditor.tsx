import LiveblocksProvider from '@liveblocks/yjs'
import React from 'react'
import { Doc } from 'yjs'
import { Editor, EditorContent, useEditor } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'
import { Placeholder } from '@tiptap/extension-placeholder'
import { Collaboration } from '@tiptap/extension-collaboration'
import { CollaborationCursor } from '@tiptap/extension-collaboration-cursor'
import { useSelf } from '@/app/liveblocks.config'
import {
	faBold,
	faHeading,
	faItalic,
	faUnderline,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Underline } from '@tiptap/extension-underline'
interface EditorProps {
	doc: Doc
	provider: LiveblocksProvider<any, any, any, any>
	cardId: string
}

const DescriptionEditor = ({ doc, provider, cardId }: EditorProps) => {
	const userInfo = useSelf((me) => me.info)
	if (!userInfo) {
		return null
	}
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const editor: Editor | null = useEditor({
		extensions: [
			StarterKit.configure({
				history: false,
			}),
			Placeholder.configure({
				emptyEditorClass: 'is-editor-empty',
				placeholder: 'Task description',
			}),
			Collaboration.configure({
				document: doc,
				field: cardId,
			}),
			CollaborationCursor.configure({
				provider,
				user: userInfo,
			}),
			Underline.configure(),
		],
	})
	return (
		<div>
			<div className='flex gap-1 row mb-1 mt-2 editor-btns'>
				<button
					className={editor?.isActive('bold') ? ' active' : ''}
					onClick={() => editor?.chain().focus().toggleBold().run()}
				>
					<FontAwesomeIcon icon={faBold} />
				</button>
				<button
					className={editor?.isActive('italic') ? ' active' : ''}
					onClick={() => editor?.chain().focus().toggleItalic().run()}
				>
					<FontAwesomeIcon icon={faItalic} />
				</button>
				<button
					className={editor?.isActive('underline') ? ' active' : ''}
					onClick={() =>
						editor?.chain().focus().toggleUnderline().run()
					}
				>
					<FontAwesomeIcon icon={faUnderline} />
				</button>
				<button
					className={editor?.isActive('heading') ? ' active' : ''}
					onClick={() =>
						editor
							?.chain()
							.focus()
							.toggleHeading({ level: 2 })
							.run()
					}
				>
					<FontAwesomeIcon icon={faHeading} />
				</button>
			</div>
			<EditorContent editor={editor} className='' />
		</div>
	)
}

export default DescriptionEditor
