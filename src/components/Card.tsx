'use client'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import React, { useContext, useEffect } from 'react'
import { BoardContext } from './BoardContextProvider'

const Card = ({ id, name }: { id: string; name: string }) => {
	const params = useParams()
	const router = useRouter()
	const { openCard, setOpenCard } = useContext(BoardContext)
	useEffect(() => {
		if (params.cardId && !openCard) {
			const { boardId, cardId } = params
			router.push(`/boards/${boardId}/cards/${cardId}`)
		}
	}, [params.cardId])
	return (
		<Link
			href={`/boards/${params.boardId}/cards/${id}`}
			className='border block my-2 p-4 bg-white rounded-md'
		>
			<h4>
				{name} {id}
			</h4>
		</Link>
	)
}

export default Card
