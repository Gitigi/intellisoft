import { useQuery } from "react-query"
import { useLocation, useSearchParams, useNavigate } from "react-router-dom"

async function getVisits(date) {
  date = date === null ? '' : date
  const res = await fetch(`${import.meta.env.VITE_API}/visits?date=${date}`)
  return await res.json()
}

export default function Visits() {
  const [ searchParams, setSearchParams ] = useSearchParams()
  const navigate = useNavigate()
  const query = useQuery(['visits', searchParams.get('date')], getVisits.bind(null, searchParams.get('date')))
  const visits = query?.data || []

  const filterDateChanged = (e) => {
    setSearchParams({date: e.target.value})
  }

  const gotoVisit = (e) => {
    const visitId = e.currentTarget.getAttribute('data-id')
    navigate(`/visits/${visitId}`)
  }

  return <div className="flex flex-col gap-2">
    <div className='flex justify-end'>
      <input className='hidden py-2 px-4 border rounded-lg w-1/4' type='text' placeholder='Search' />
      <input defaultValue={searchParams.get('date')} onChange={filterDateChanged} className='py-2 px-4 border rounded-lg w-1/4 self-end ' type='date' placeholder='Search' />
    </div>
    <div className='border rounded-b-lg'>
      <table className='w-full table-fixed px-2 rounded-lg border-collapse'>
        <thead className='bg-green-300'>
          <tr className='text-left rounded-lg'>
            <th className='py-3 px-2 text-white border border-slate-300 rounded-lg'>Name</th>
            <th className='py-3 px-2 text-white border border-slate-300'>Age</th>
            <th className='py-3 px-2 text-white border border-slate-300'>BMI Status</th>
          </tr>
        </thead>
        <tbody className='[&>*:nth-child(even)]:bg-green-100/40 rounded-lg'>
          {visits.map( (visit,index) => <tr key={ index } className="hover:bg-green-200 cursor-pointer" data-id={visit.id} onClick={gotoVisit}>
            <td className='py-3 px-2 text-slate-900 border-t border-r border-slate-300'>{ visit.patient.firstname } { visit.patient.lastname }</td>
            <td className='py-3 px-2 border-t border-r border-slate-300'>{ visit.patient.age }</td>
            <td className='py-3 px-2 border-t border-slate-300'>{ visit.mbi_status }</td>
          </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
}
