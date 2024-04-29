import { faCancel } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const CancelBtn = ({ onClick }: { onClick: () => void }) => {
	return (
		<button
			className=' flex gap-2 w-full rounded-md justify-center items-center bg-gray-200 mt-1'
			onClick={onClick}
		>
			<FontAwesomeIcon icon={faCancel} />
			Cancel Edit
		</button>
	)
}

export default CancelBtn
