'use client'

import { SolvedData } from '../data'

export interface DetailsProps {
  data: {
    id: string
    title: string
    changes: { start: string; end: string; content: object }[]
    solved: SolvedData
  }
}

export function Details({ data }: DetailsProps) {
  return <>Auswertung {JSON.stringify(data)}</>
}
