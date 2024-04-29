'use server'
import Board from '@/components/Board'
import { getUserEmail } from '@/lib/getUserEmail'
import { liveblocksClient } from '@/lib/liveblocksClient'
import React, { FC } from 'react'
interface PageProps {
	params: {
		boardId: string
	}
}
const BoardPage: FC<PageProps> = async (props: PageProps) => {
	const boardId = props.params.boardId
	const userEmail = await getUserEmail()
	const boardInfo = await liveblocksClient.getRoom(boardId)
	const userAccess = boardInfo.usersAccesses?.[userEmail]
	let hasAccess = userAccess && [...userAccess].includes('room:write')

	if (!hasAccess) {
		return (
			<div>
				<h1>You dont have access to this board</h1>
			</div>
		)
	}

	const boardName = Array.isArray(boardInfo.metadata.boardName)
		? boardInfo.metadata.boardName[0]
		: boardInfo.metadata.boardName

	return (
		<div>
			<Board name={boardName} id={boardId} />
		</div>
	)
}

export default BoardPage
