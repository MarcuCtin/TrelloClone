import Board from '@/components/Board'
import React from 'react'
import BoardPage from '../../page'
type PageProps = {
	params: {
		boardId: string
		cardId: string
	}
}
const CardPage = ({ params }: PageProps) => {
	return <BoardPage params={params} />
}

export default CardPage
