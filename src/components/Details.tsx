'use client'

import { faCaretLeft } from '@fortawesome/free-solid-svg-icons'
import { SolvedData } from '../data'
import { FaIcon } from './FaIcon'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import clsx from 'clsx'
import { dates } from '../helper/dates'
import jsonDiff from 'json-diff'

export interface DetailsProps {
  data: {
    id: string
    title: string
    changes: { start: string; end: string; content: object[] }[]
    solved: SolvedData
    visits: { [key: string]: number }
  }
}

export function Details({ data }: DetailsProps) {
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(1)

  const solvedPerVersion = useMemo(
    () =>
      data.changes.map((change) => {
        let result = 0
        let i = dates.indexOf(change.start)
        while (i < dates.length && dates[i] !== change.end) {
          const sessions = new Set(
            data.solved[dates[i]].map((x) => x.sessionId)
          )
          result += sessions.size
          i++
        }
        return result
      }),
    [data.changes, data.solved]
  )

  const visitsPerVersion = useMemo(
    () =>
      data.changes.map((change) => {
        let result = 0
        let i = dates.indexOf(change.start)
        while (i < dates.length && dates[i] !== change.end) {
          result += data.visits[dates[i]]
          i++
        }
        return result
      }),
    [data.changes, data.visits]
  )
  return (
    <>
      <div className="py-4 pl-8 text-3xl bg-gray-50">
        <Link href="/" className="inline-block mr-8">
          <FaIcon icon={faCaretLeft} />
        </Link>{' '}
        {data.title}
      </div>
      <div className="my-8 flex flex-wrap mx-12">
        {data.changes.map((change, i) => {
          return (
            <div
              className={clsx(
                'h-36 w-56 p-2 m-4 rounded-xl',
                i == start || i == end
                  ? 'bg-green-200'
                  : i >= start && i < end
                  ? 'bg-yellow-200'
                  : 'bg-gray-100'
              )}
              key={i}
            >
              <p>Version {i + 1}</p>
              <p>Start: {change.start}</p>
              <p className="mb-2">Ende: {change.end}</p>
              {change.start == change.end ? (
                <p>
                  <i>Keine Daten</i>
                </p>
              ) : (
                <>
                  <p>Aufrufe: {visitsPerVersion[i]}</p>
                  <p>gelöste Aufgaben: {solvedPerVersion[i]}</p>
                </>
              )}
            </div>
          )
        })}
      </div>
      <div className="mt-6 text-center w-full">
        Vergleiche{' '}
        <select
          className="p-2"
          value={start}
          onChange={(e) => {
            const newStart = parseInt(e.target.value)
            setStart(newStart)
            if (newStart >= end) {
              setEnd(newStart + 1)
            }
          }}
        >
          {data.changes.map((_, i) => {
            if (i + 1 == data.changes.length) return null
            return (
              <option key={i} value={i}>
                Version {i + 1}
              </option>
            )
          })}
        </select>{' '}
        mit{' '}
        <select
          className="p-2"
          value={end}
          onChange={(e) => {
            const newEnd = parseInt(e.target.value)
            setEnd(newEnd)
            if (start >= newEnd) {
              setStart(newEnd - 1)
            }
          }}
        >
          {data.changes.map((_, i) => {
            if (i == 0) return null
            if (i <= start) return null
            return (
              <option key={i} value={i}>
                Version {i + 1}
              </option>
            )
          })}
        </select>
      </div>
      <div className="flex m-4">
        <div className="flex-1 border p-4">
          <p>
            <strong>Version {start + 1}</strong>
          </p>
          {renderVersion(start)}
        </div>
        <div className="flex-1 border p-4">
          <p>Änderungen</p>
          <pre className="mt-4 bg-yellow-100">
            {jsonDiff.diffString(
              data.changes[start].content,
              data.changes[end].content,
              {
                color: false,
              }
            )}
          </pre>
        </div>
        <div className="flex-1 border p-4">
          <p>
            <strong>Version {end + 1}</strong>
          </p>
          {renderVersion(end)}
        </div>
      </div>
    </>
  )

  function renderVersion(i: number) {
    const content = data.changes[i].content
    return (
      <>
        {content.map((entry: any) => {
          if (entry.__typename == 'text-exercise') {
            return (
              <p key={entry.__id} className="my-2">
                Aufgabe {entry.__id} ({entry.current_revision_id}){' '}
                {renderSolved(
                  entry.__id,
                  data.changes[i].start,
                  data.changes[i].end,
                  i
                )}
              </p>
            )
          } else if (entry.__typename == 'text-exercise-group') {
            return (
              <div key={entry.__id} className="my-2">
                <p className="my-2">
                  {' '}
                  Gruppe {entry.__id} ({entry.current_revision_id})
                </p>
                {entry.children
                  ? entry.children.map((child: any) => {
                      return (
                        <p key={child.__id} className="ml-5 my-2">
                          Teilaufgabe {child.__id} ({child.current_revision_id}){' '}
                          {renderSolved(
                            child.__id,
                            data.changes[i].start,
                            data.changes[i].end,
                            i
                          )}
                        </p>
                      )
                    })
                  : null}
              </div>
            )
          }
        })}
      </>
    )
  }

  function renderSolved(
    entityId: number,
    start: string,
    end: string,
    version: number
  ) {
    let solved = 0
    let i = dates.indexOf(start)
    while (i < dates.length && dates[i] !== end) {
      const sessions = new Set(
        data.solved[dates[i]]
          .filter((x) => x.entityId == entityId)
          .map((x) => x.sessionId)
      )
      solved += sessions.size
      i++
    }
    if (solved == 0) return null
    return (
      <span>
        {' '}
        -{' '}
        <strong>
          {((solved / visitsPerVersion[version]) * 100).toFixed(2)}%
        </strong>{' '}
        gelöst ({solved})
      </span>
    )
  }
}
