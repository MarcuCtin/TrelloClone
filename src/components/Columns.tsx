'use client'
import React, { Suspense } from 'react'
import NewColumnForm from './forms/NewColumnForm'
import { Column, useMutation, useStorage } from '@/app/liveblocks.config'
import { ReactSortable } from 'react-sortablejs'
import { default as BoardColumn } from './Column'
import { LiveList, LiveObject, shallow } from '@liveblocks/client'
const Columns = () => {
	const columns = useStorage((root) => {
		return root.columns.map((c) => ({ ...c }))
	}, shallow)
	const updateColumn = useMutation(
		({ storage }, columns: LiveObject<Column>[]) => {
			storage.set('columns', new LiveList(columns))
		},
		[]
	)
	function setColumnsOrder(sortedColumns: Column[]) {
		const newColumns: LiveObject<Column>[] = []
		sortedColumns.forEach((sortedColumn, newIndex) => {
			const newSortedColumn = { ...sortedColumn }
			newSortedColumn.index = newIndex
			newColumns.push(new LiveObject(newSortedColumn))
		})
		updateColumn(newColumns)
	}
	if (!columns) return
	return (
		<div className='flex gap-4'>
			<Suspense fallback={'loading'}>
				<ReactSortable
					group={'board-column'}
					list={columns || []}
					className='flex gap-4'
					ghostClass='opacity-40'
					setList={setColumnsOrder}
				>
					{columns &&
						columns.map((column, index) => (
							<BoardColumn key={index} {...column} />
						))}
				</ReactSortable>
			</Suspense>
			<NewColumnForm />
		</div>
	)
}

export default Columns
