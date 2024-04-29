/* eslint-disable react/jsx-key */
'use client'
import {
	deleteBoard,
	removeEmailFromBoard,
	updateBoard,
} from '@/app/actions/boardActions'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { RoomAccesses } from '@liveblocks/node'
import { useRouter } from 'next/navigation'
import React from 'react'

const EmailAccessList = ({
	boardId,
	userAccesses,
}: {
	boardId: string
	userAccesses: RoomAccesses
}) => {
	const router = useRouter()
	async function handleDelete(emailToDelete: string) {
		await removeEmailFromBoard(boardId, emailToDelete)
	}
	return (
		<div className='max-w-xs'>
			{Object.keys(userAccesses).map((email) => (
				<div
					key={email}
					className='max-w-xs justify-between flex gap-2 my-2 items-center border rounded-lg pl-4'
				>
					{email}
					<button className='btn' onClick={() => handleDelete(email)}>
						<FontAwesomeIcon icon={faTrash} />
					</button>
				</div>
			))}
		</div>
	)
}

export default EmailAccessList
