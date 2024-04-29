'use client'
import { useMutation } from '@/app/liveblocks.config'
import { LiveObject } from '@liveblocks/client'
import React, { FormEvent } from 'react'
import uniqid from 'uniqid'

const NewColumnForm = () => {
	const addColumn = useMutation(({ storage }, colName) => {
		return storage.get('columns').push(
			new LiveObject({
				name: colName,
				id: uniqid.time(),
				index: 9999,
			})
		)
	}, [])
	function handleNewCol(ev: FormEvent) {
		ev.preventDefault()
		const input = (ev.target as HTMLFormElement).querySelector('input')
		if (input) {
			const colName = input?.value
			addColumn(colName)
			input.value = ''
		}
	}

	return (
		<form onSubmit={handleNewCol} className='max-w-xs'>
			<label className='block'>
				<span className='text-gray-600 block'>Column name</span>
				<input type='text' placeholder='New Column Name' />
			</label>
			<button type='submit' className='mt-2 block w-full'>
				Create Column
			</button>
		</form>
	)
}

export default NewColumnForm
