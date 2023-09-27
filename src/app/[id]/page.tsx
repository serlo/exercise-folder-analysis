import Link from 'next/link'
import { changes } from '../../data'

export function generateStaticParams() {
  return changes.map(([id]) => ({ id }))
}

export default function Index({ params }: { params: { id: string } }) {
  return (
    <>
      <div>Hi! {params.id}</div>
      <Link href="/">zurück --</Link>
    </>
  )
}
