'use server';
import { getUserEmail } from '@/lib/getUserEmail';
import { liveblocksClient } from '@/lib/liveblocksClient';
import Link from 'next/link';
import React from 'react';

export default async function Boards() {
	const email = await getUserEmail();
	const { data: rooms } = await liveblocksClient.getRooms({
		userId: email,
	});
	return (
		<div className='my-4 grid md:grid-cols-4 gap-2'>
			{rooms?.length > 0 &&
				rooms.map((room) => (
					<Link
						className='bg-gray-200 p-4 rounded-md block'
						href={`/boards/${room.id}`}
						key={room.id}
					>
						<h1>{room.metadata.boardName}</h1>
					</Link>
				))}
		</div>
	);
}
