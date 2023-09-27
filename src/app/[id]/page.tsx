import Link from 'next/link'
import { titles } from '../../data'

export function generateStaticParams() {
  return Object.keys(titles).map((id) => ({ id }))
}

export default function Index({ params }: { params: { id: string } }) {
  return (
    <>
      <div>Hi! {params.id}</div>
      <Link href="/">zurück --</Link>
    </>
  )
}
