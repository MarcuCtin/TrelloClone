'use client'
import React from 'react'

import { deleteBoard } from '@/app/actions/boardActions'
import { useRouter } from 'next/navigation'

const BoardDeleteButton = ({ boardId }: { boardId: string }) => {
	const router = useRouter()
	async function handleDeleteBoard() {
		await deleteBoard(boardId)
		router.push('/')
	}
	return (
		<button className='btn bg-red-500 p-4' onClick={handleDeleteBoard}>
			DeleteBoard
		</button>
	)
}

export default BoardDeleteButton
