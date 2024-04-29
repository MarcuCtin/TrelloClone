'use client'
import { useParams, useRouter } from 'next/navigation'
import React, { FormEvent, useContext, useEffect } from 'react'
import { BoardContext, BoardContextProps } from '../BoardContextProvider'
import { Card, useMutation, useStorage, useThreads } from '@/app/liveblocks.config'
import { shallow } from '@liveblocks/client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faComments,
	faEllipsis,
	faFileLines,
	faTrash,
} from '@fortawesome/free-solid-svg-icons'
import DeleteWithConfirmation from '../DeleteWithConfirmation'
import CancelBtn from '../CancelBtn'
import CardDescription from '../CardDescription'

const CardModal = () => {
	const router = useRouter()
	const params = useParams()
	const {threads} = useThreads()
	const { setOpenCard } = useContext<BoardContextProps>(BoardContext)
	const [editMode, setEditMode] = React.useState(false)
	const card = useStorage((root) => {
		return root.cards.find((c) => {
			console.log(c.id, params.cardId.toString())
			return c.id === params.cardId.toString()
		})
	}, shallow)
	useEffect(() => {
		if (params.cardId && setOpenCard) {
			setOpenCard(params.cardId.toString())
		}
	}, [params, setOpenCard])
	function handleBackdropClick() {
		router.back()
	}
	const updateCard = useMutation(({ storage }, cardId, updateData) => {
		const index = storage
			.get('cards')
			.findIndex((c) => c.toObject().id === cardId)
		const card = storage.get('cards').get(index)
		if (card) {
			for (let key in updateData) {
				card?.set(key as keyof Card, updateData[key])
			}
		}
	}, [])
	function handleDelete() {
		deleteCard(params.cardId)
		setOpenCard && setOpenCard(null)
		router.back()
	}
	function handleNameCardChange(ev: FormEvent) {
		ev.preventDefault()
		const input = (ev.target as HTMLFormElement).querySelector('input')
		if (input) {
			const newName = input?.value
			updateCard(params.cardId, { name: newName })
			input.value = ''
			setEditMode(!editMode)
		}
	}
	const deleteCard = useMutation(({ storage }, id) => {
		const cards = storage.get('cards')
		const cardIndex = cards.findIndex((c) => c.toObject().id === id)
		cards.delete(cardIndex)
	}, [])
	return (
		<div
			onClick={handleBackdropClick}
			className='absolute inset-0 bg-black/70 backdrop-blur'
		>
			<div
				onClick={(e) => e.stopPropagation()}
				className='bg-white p-4 mt-8 max-w-xs mx-auto rounded-md'
			>
				{!editMode && (
					<div className='flex justify-between'>
						<h3 className='text-lg'>{card?.name}</h3>
						<button
							onClick={() => setEditMode(!editMode)}
							className='text-gray-300'
						>
							<FontAwesomeIcon icon={faEllipsis} />
						</button>
					</div>
				)}
				{editMode && (
					<div>
						<form onSubmit={handleNameCardChange}>
							<input
								type='text'
								defaultValue={card?.name}
								className='mb-2'
							/>
							<button type='submit' className='w-full'>
								Save
							</button>
						</form>
						<div className='mt-2'>
							<DeleteWithConfirmation
								onDelete={() => handleDelete()}
							/>
						</div>
						<CancelBtn onClick={() => setEditMode(!editMode)} />
					</div>
				)}
				{!editMode && (
					<div>
						<h2 className='flex gap-1 items-center mt-2'>
							<FontAwesomeIcon
								icon={faFileLines}
								className='py-1 px-2'
							/>
							<span className='text-md'>Description</span>
						</h2>
						<CardDescription />
						<h2 className='flex gap-1 items-center mt-2'>
							<FontAwesomeIcon
								icon={faComments}
								className='py-1 px-2'
							/>
							<span className='text-md'>Comments</span>
						</h2>
						{
							threads && threads.map((thread) => {
								<div key={thread.id}>
									<Thread thread={thread} id={thread.id}/>

								</div>
						}
					</div>
				)}
			</div>
		</div>
	)
}

export default CardModal
