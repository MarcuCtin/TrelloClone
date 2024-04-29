import React, { SetStateAction, useState } from 'react'
import { ReactSortable } from 'react-sortablejs'
import { shallow } from '@liveblocks/client'
import { Card, useMutation, useStorage } from '@/app/liveblocks.config'
import { default as ColumnCard } from './Card'
import NewCardForm from './forms/NewCardForm'
import { rename } from 'fs'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faCancel,
	faEllipsis,
	faTrash,
} from '@fortawesome/free-solid-svg-icons'
import CancelBtn from './CancelBtn'

type ColumnProps = {
	id: string
	name: string
}

const Column = ({ id, name }: ColumnProps) => {
	const [renameMode, setRenameMode] = useState(false)
	const columnCards = useStorage<Card[]>((root) => {
		return root.cards
			?.filter((card) => card.columnId === id)
			.map((cards) => ({ ...cards }))
			.sort((a, b) => a.index - b.index)
	}, shallow)
	const updateCard = useMutation(({ storage }, index, updateData) => {
		//console.log(updateData, 'updateData')
		const card = storage.get('cards').get(index)
		if (card) {
			for (let key in updateData) {
				card?.set(key as keyof Card, updateData[key])
			}
		}
	}, [])
	const updateColumn = useMutation(({ storage }, id, newName) => {
		storage
			.get('columns')
			.find((c) => c.toObject().id === id)
			?.set('name', newName)
	}, [])
	const setTasksOrderForColumn = useMutation(
		({ storage }, sortedCards: Card[], newColumnId) => {
			const idsOfSortedCards = sortedCards.map((c) => c.id.toString())
			//console.log(idsOfSortedCards, 'idsOfSortedCards')
			const allCards: Card[] = [
				...storage.get('cards').map((c) => c.toObject()),
			]
			//console.log(allCards, 'allcards')
			idsOfSortedCards.forEach((sortedCardId, newIndexInCol) => {
				const cardStorageIndex = allCards.findIndex(
					(c) => c.id.toString() === sortedCardId
				)
				if (cardStorageIndex === -1) return
				updateCard(cardStorageIndex, {
					index: newIndexInCol,
					columnId: newColumnId,
				})
			})
		},
		[]
	)
	function handleRenameSubmit(e: React.FormEvent) {
		e.preventDefault()
		const input = e.target as HTMLFormElement
		if (input) {
			const newColName = input.querySelector('input')?.value
			updateColumn(id, newColName)
			setRenameMode(false)
		}
	}
	const deleteColumn = useMutation(({ storage }, id) => {
		const columns = storage.get('columns')
		const columnIndex = columns.findIndex((c) => c.toObject().id === id)
		columns.delete(columnIndex)
	}, [])
	return (
		<div className='w-48 shadow-sm bg-white rounded-md p-2'>
			{!renameMode && (
				<div className='flex justify-between mx-1'>
					<h3>{name}</h3>
					<button
						className='text-gray-300 ml-auto'
						onClick={() => setRenameMode(true)}
					>
						<FontAwesomeIcon icon={faEllipsis} />
					</button>
					<button onClick={() => setRenameMode(false)}></button>
				</div>
			)}
			{renameMode && (
				<div className='mb-8'>
					Edit name:
					<form
						action=''
						onSubmit={handleRenameSubmit}
						className='mb-1'
					>
						<input type='text' defaultValue={name} />
						<button type='submit' className='w-full mt-1'>
							Save
						</button>
					</form>
					<button
						onClick={() => deleteColumn(id)}
						className='text-white flex gap-2 w-full p-2 rounded-md justify-center items-center bg-red-400'
					>
						<FontAwesomeIcon icon={faTrash} />
						Delete column
					</button>
					<CancelBtn onClick={() => setRenameMode(false)} />
				</div>
			)}
			{columnCards && !renameMode && (
				<>
					<ReactSortable
						list={columnCards}
						group='cards'
						setList={(cards) => setTasksOrderForColumn(cards, id)}
						className='min-h-12'
						ghostClass='opacity-40'
					>
						{columnCards.map((card, index) => {
							return (
								<ColumnCard
									key={index}
									id={card.id}
									name={card.name}
								/>
							)
						})}
					</ReactSortable>
				</>
			)}

			{!renameMode && <NewCardForm columnId={id} />}
		</div>
	)
}

export default Column
