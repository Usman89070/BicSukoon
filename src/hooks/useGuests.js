import { guests } from '../data/guests'
import { about } from '../data/about'
import { useAdminList } from './useAdminList'

/** Honoured guests from the admin panel (or the built-in list). */
export const useGuests = () => useAdminList('guests', guests)

/** Board of Directors from the admin panel (or the built-in list). */
export const useBoard = () => useAdminList('board', about.board)
