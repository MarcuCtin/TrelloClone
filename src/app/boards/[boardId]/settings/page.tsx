'use server'
import BoardDeleteButton from '@/components/BoardDeleteButton'
import EmailAccessList from '@/components/EmailAccessList'
import NewBoardAccess from '@/components/forms/NewBoardAccess'
import { getUserEmail } from '@/lib/getUserEmail'
import { liveblocksClient } from '@/lib/liveblocksClient'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
type PageProps = {
	params: {
		boardId: string
	}
}
const BoardSettings = async ({ params }: PageProps) => {
	const { boardId } = params
	const userEmail = await getUserEmail()
	const boardInfo = await liveblocksClient.getRoom(boardId)
	if (!boardInfo.usersAccesses[userEmail]) {
		return 'access denied'
	}
	return (
		<div>
			<div className='flex gap-2 justify-between'>
				<Link
					className='inline-flex btn bg-gray-200 flex gap-1'
					href={`/boards/${boardId}`}
				>
					<FontAwesomeIcon className='h-5' icon={faArrowLeft} />
					Back to Board
				</Link>
				<BoardDeleteButton boardId={boardId} />
			</div>
			<h1 className='text-2xl'>
				Access to board {boardInfo.metadata.boardName}
			</h1>
			<div className='mb-6'>
				<EmailAccessList
					boardId={boardId}
					userAccesses={boardInfo.usersAccesses}
				/>
			</div>
			<NewBoardAccess boardId={boardId} />
		</div>
	)
}

export default BoardSettings
