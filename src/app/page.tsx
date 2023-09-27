import { FolderOverview } from '../components/FolderOverview'
import entries from '../data/folder_overview_data.json'

export default function Index() {
  // generate data entries
  /*const entries = changes.map(([id, changes]) => {
    let visitCount = 0
    for (const key in visits) {
      visitCount += visits[key][id]
    }
    let solvedCount = 0
    for (const key in solved) {
      const sessions = new Set(
        solved[key]
          .filter((entry) => {
            return entry.path == `/${id}` || entry.path.includes(`/${id}/`)
          })
          .map((entry) => entry.sessionId)
      )
      solvedCount += sessions.size
    }
    return {
      id,
      title: decodeURIComponent(titles[id]),
      changesCount: changes.length - 1,
      visitCount,
      solvedCount,
    }
  })
  writeFileSync('folder_overview_data.json', JSON.stringify(entries))*/

  return (
    <div className="max-w-[800px] mx-auto mt-16">
      <h1 className="text-3xl mb-4">Aufgabenordner Analyse Q3/2023</h1>
      <p className="mb-8">2023-06-10 bis 2023-09-25</p>
      <FolderOverview data={entries} />
    </div>
  )
}
