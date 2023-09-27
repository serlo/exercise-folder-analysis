import { SolvedData, changes, solved, titles, visits } from '../../data'
import { Details, DetailsProps } from '../../components/Details'

export function generateStaticParams() {
  return changes.map(([id]) => ({ id }))
}

export default function Index({ params }: { params: { id: string } }) {
  const solvedByDate: SolvedData = {}

  for (const key in solved) {
    const relevant = solved[key].filter((entry) => {
      return (
        entry.path == `/${params.id}` || entry.path.includes(`/${params.id}/`)
      )
    })
    solvedByDate[key] = relevant
  }

  const visitsByDate: { [key: string]: number } = {}

  for (const key in visits) {
    visitsByDate[key] = visits[key][params.id]
  }

  const data: DetailsProps['data'] = {
    id: params.id,
    title: decodeURIComponent(titles[params.id]),
    changes: changes.find((c) => c[0] == params.id)![1],
    solved: solvedByDate,
    visits: visitsByDate,
  }

  return (
    <>
      <Details data={data} />
    </>
  )
}
