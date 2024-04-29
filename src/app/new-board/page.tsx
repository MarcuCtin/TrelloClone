'use client';
import React from 'react';
import { createBoard } from '../actions/boardActions';
import { redirect } from 'next/navigation';
const NewBoardPage = () => {
async function handleNewBoardSubmit(formData: FormData) {
    const boardName = formData.get('name') as string;
    const { id } = await createBoard(boardName) as { id: string };
    redirect('/boards/' + id);
}
	return (
		<div>
			<form action={handleNewBoardSubmit} className='max-w-xl'>
				<h1 className='text-2xl mb-4'>Create New Board</h1>
				<input type='text' placeholder='board name' name='name' />

				<button type='submit' className='mt-2 w-full'>
					Create board
				</button>
			</form>
		</div>
	);
};

export default NewBoardPage;
