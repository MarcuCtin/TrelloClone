'use client'
import { faArrowLeft, faTrash } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
type Props = {
	onDelete: () => void
}
const DeleteWithConfirmation = ({ onDelete }: Props) => {
	const [wannaDelete, setWannaDelete] = React.useState(false)
	if (wannaDelete) {
		return (
			<div className='text-center mt-4'>
				<h4 className='mb-2 mt-4'>Are you sure?</h4>
				<div className='grid grid-cols-2 gap-2'>
					<button
						className='btn w-full with-icon'
						onClick={() => setWannaDelete(!wannaDelete)}
					>
						<FontAwesomeIcon icon={faArrowLeft} />
						Cancel
					</button>
					<button className='btn red with-icon' onClick={onDelete}>
						<FontAwesomeIcon icon={faTrash} />
						Delete
					</button>
				</div>
			</div>
		)
	}
	return (
		<button
			onClick={() => {
				setWannaDelete(!wannaDelete)
			}}
			className='bg-red-500 rounded-md mt-1 text-white p-2 w-full justify-center items-center flex gap-1 '
		>
			<FontAwesomeIcon icon={faTrash} />
			Delete
		</button>
	)
}

export default DeleteWithConfirmation
