'use client'
import { addEmailToBoard } from '@/app/actions/boardActions'
import { useRouter } from 'next/navigation'
import React, { useRef } from 'react'

const NewBoardAccess = ({ boardId }: { boardId: string }) => {
	const router = useRouter()
	const inputRef = useRef<HTMLInputElement>(null)
	async function addEmail(formData: FormData) {
		const email = (formData.get('email') as string) || ''
		addEmailToBoard(boardId, email).then((res) => {
			if (res === true) router.refresh()
		})
		if (inputRef.current) inputRef.current.value = ''
		router.refresh()
	}
	return (
		<form action={addEmail} className='max-w-xs'>
			<h2 className='text-lg mb-2'>Add Email</h2>
			<input
				ref={inputRef}
				type='text'
				name='email'
				placeholder='j-2n@example.com'
			/>
			<button className='w-full mt-2' type='submit'>
				Save
			</button>
		</form>
	)
}

export default NewBoardAccess
