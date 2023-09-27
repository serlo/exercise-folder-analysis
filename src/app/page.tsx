import Link from 'next/link'
import { titles } from '../data'

export default function Index() {
  return (
    <div className="max-w-[800px] mx-auto mt-16">
      <h1 className="text-3xl mb-6">Aufgabenordner Analyse Q3/2023</h1>
      {Object.keys(titles).map((id) => {
        return (
          <div key={id} className="my-2">
            <Link href={`/${id}`}>
              {decodeURIComponent((titles as any)[id])}
            </Link>
          </div>
        )
      })}
    </div>
  )
}
