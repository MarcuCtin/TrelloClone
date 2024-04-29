import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useRoom } from '@/app/liveblocks.config'
import { Doc } from 'yjs'
import LiveblocksProvider from '@liveblocks/yjs'
import DescriptionEditor from './DescriptionEditor'
const CardDescription = () => {
	const { cardId } = useParams()
	const room = useRoom()
	const [doc, setDoc] = useState<Doc>()
	const [provider, setProvider] = useState<LiveblocksProvider<
		any,
		any,
		any,
		any
	> | null>(null)
	useEffect(() => {
		const yDoc = new Doc()
		const yProvider = new LiveblocksProvider(room, yDoc)
		setDoc(yDoc)
		setProvider(yProvider)
		return () => {
			yProvider.destroy()
			yDoc.destroy()
		}
	}, [room])
	if (!doc || !provider) return null
	return (
		<div>
			<DescriptionEditor
				doc={doc}
				provider={provider}
				cardId={cardId.toString()}
			/>
		</div>
	)
}

export default CardDescription
