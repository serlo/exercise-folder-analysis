'use client'

import Link from 'next/link'
import { useState } from 'react'

export interface FolderOverviewProps {
  data: {
    id: string
    title: string
    changesCount: number
    visitCount: number
    solvedCount: number
  }[]
}

export function FolderOverview({ data }: FolderOverviewProps) {
  const [sort, setSort] = useState<
    'most-edited' | 'most-viewed' | 'most-solved'
  >('most-edited')

  const [sortedData, setData] = useState(data)

  return (
    <>
      <div className="text-right">
        Sortierung:{' '}
        <select
          className="p-2"
          value={sort}
          onChange={(e) => {
            if (e.target.value == 'most-edited') {
              setSort('most-edited')
              const newData = data.slice()
              newData.sort((a, b) => b.changesCount - a.changesCount)
              setData(newData)
            }
            if (e.target.value == 'most-viewed') {
              setSort('most-viewed')
              const newData = data.slice()
              newData.sort((a, b) => b.visitCount - a.visitCount)
              setData(newData)
            }
            if (e.target.value == 'most-solved') {
              setSort('most-solved')
              const newData = data.slice()
              newData.sort((a, b) => b.solvedCount - a.solvedCount)
              setData(newData)
            }
          }}
        >
          <option value="most-edited">meiste Bearbeitungen</option>
          <option value="most-viewed">meiste Aufrufe</option>
          <option value="most-solved">meist gelöste Aufgaben</option>
        </select>
      </div>
      {sortedData.map(
        ({ id, title, changesCount, visitCount, solvedCount }) => {
          return (
            <div key={id} className="my-6">
              <Link
                href={`/${id}`}
                className="text-blue-500 hover:text-blue-600 hover:underline"
              >
                {title}
              </Link>
              <p className="text-sm text-gray-700">
                {changesCount} Bearbeitung{changesCount !== 1 ? 'en' : ''} •{' '}
                {visitCount} Aufruf{visitCount !== 1 ? 'e' : ''} • {solvedCount}{' '}
                gelöste Aufgabe{solvedCount !== 1 ? 'n' : ''}
              </p>
            </div>
          )
        }
      )}
    </>
  )
}
