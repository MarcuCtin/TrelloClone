import { Dispatch, SetStateAction, createContext } from 'react'
import React from 'react'
export type OpenCardId = string | null
export type BoardContextProps = {
	openCard?: OpenCardId
	setOpenCard?: Dispatch<SetStateAction<OpenCardId>>
}
export type ProviderProps = {
	children: React.ReactNode
}
export const BoardContext = createContext<BoardContextProps>({})
const BoardContextProvider = ({ children }: ProviderProps) => {
	const [openCard, setOpenCard] = React.useState<OpenCardId>(null)

	return (
		<BoardContext.Provider value={{ openCard, setOpenCard }}>
			{children}
		</BoardContext.Provider>
	)
}

export default BoardContextProvider
