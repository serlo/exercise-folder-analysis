import titlesData from './titles.json'
import changesData from './changes.json'
import solvedData from './__solvedExercises.json'
import visitsData from './__dailyVisits.json'

// Define types or interfaces for the JSON data
type TitlesData = { [key: string]: string }
type ChangesData = [string, { start: string; end: string; content: object }[]][]
type SolvedData = {
  [key: string]: {
    id: number
    path: string
    entityId: number
    revisionId: number
    type: string
    result: 'correct'
    timestamp: string
    sessionId: string
  }[]
}
type VisitsData = { [key: string]: { [key: string]: number } }

// Export the typed JSON data
export const titles: TitlesData = titlesData as any
export const changes: ChangesData = changesData as any
export const solved: SolvedData = solvedData as any
export const visits: VisitsData = visitsData as any
