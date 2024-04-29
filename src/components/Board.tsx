'use client'
import Column from './Column'
import React, { FormEvent, useState } from 'react'
import { RoomProvider } from '@/app/liveblocks.config'
import { LiveList } from '@liveblocks/client'
import { ClientSideSuspense } from '@liveblocks/react'
import Columns from './Columns'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import { updateBoard } from '@/app/actions/boardActions'
import { useRouter } from 'next/navigation'
import BoardContextProvider from './BoardContextProvider'
interface BoardProps {
	id: string
	name: string
}
export default function Board({ id, name }: BoardProps) {
	const [renameMode, setRenameMode] = useState(false)
	const router = useRouter()
	const handleNameSubmit = async (e: FormEvent) => {
		e.preventDefault()
		const input = (e.target as HTMLFormElement).querySelector('input')
		if (input) {
			const newName = input?.value
			await updateBoard(id, { metadata: { boardName: newName } })
			input.value = ''
			setRenameMode(false)
			router.refresh()
		}
	}
	return (
		<BoardContextProvider>
			<RoomProvider
				id={id}
				initialStorage={{
					columns: new LiveList(),
					cards: new LiveList(),
				}}
				initialPresence={{}}
			>
				<ClientSideSuspense fallback={<div>Loading</div>}>
					{() => (
						<>
							<div className='flex gap-2 justify-between items-center mb-4'>
								<div>
									{!renameMode && (
										<h1
											className='text-2xl'
											onClick={() => setRenameMode(true)}
										>
											Board {name}
										</h1>
									)}
									{renameMode && (
										<>
											<form
												action=''
												onSubmit={handleNameSubmit}
											>
												<input
													type='text'
													defaultValue={name}
												/>
											</form>
										</>
									)}
								</div>
								<Link
									href={`/boards/${id}/settings`}
									className='flex gap-2 items-center btn'
								>
									<FontAwesomeIcon icon={faCog} />
									Settings
								</Link>
							</div>
							<Columns />
						</>
					)}
				</ClientSideSuspense>
			</RoomProvider>
		</BoardContextProvider>
	)
}
