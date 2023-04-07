import { useQuery } from "react-query"
import { Link, useParams, useNavigate } from "react-router-dom"

async function getVisits(id) {
  const res = await fetch(`${import.meta.env.VITE_API}/patients/${id}/visits`)
  return await res.json()
}

async function getPatient(id) {
  const res = await fetch(`${import.meta.env.VITE_API}/patients/${id}`)
  return await res.json()
}

export default function PatientVisits() {
  const { patientId } = useParams()
  const navigate = useNavigate()
  const query = useQuery(['patient_visits', patientId], () => getVisits(patientId))
  const patient_query = useQuery(['patients', patientId], () => getPatient(patientId))
  const visits = query?.data || []
  const patient = patient_query?.data

  const gotoVisit = (e) => {
    const visitId = e.currentTarget.getAttribute('data-id')
    navigate(`/visits/${visitId}`)
  }

  return <div className="mt-8 flex flex-col gap-2">
    <h2 className="bg-green-100/50 p-2 rounded-lg text-center capitalize font-bold mb-2 text-gray-800">{patient?.firstname} {patient?.lastname}</h2>
    <div className='flex justify-between'>
      <Link to={`/patients/${patientId}/visits/new`} className='py-2 px-4 border rounded-lg bg-green-100 text-green-800 font-semibold'>Add Visit</Link>
      <input className='hidden py-2 px-4 border rounded-lg w-1/4 self-end' type='date' placeholder='Search' />
    </div>
    <div className='border rounded-b-lg'>
      <table className='w-full table-fixed px-2 rounded-lg border-collapse'>
        <thead className='bg-green-300'>
          <tr className='text-left rounded-lg'>
            <th className='py-3 px-2 text-white border border-slate-300 rounded-lg'>Date</th>
            <th className='py-3 px-2 text-white border border-slate-300'>BMI Status</th>
          </tr>
        </thead>
        <tbody className='[&>*:nth-child(even)]:bg-green-100/40 rounded-lg'>
          {visits.map( (visit,index) => <tr key={ index } className="hover:bg-green-200 cursor-pointer" data-id={visit.id} onClick={gotoVisit}>
            <td className='py-3 px-2 text-slate-900 border-t border-r border-slate-300'>{ (new Date(visit.visit_date)).toDateString() } </td>
            <td className='py-3 px-2 border-t border-slate-300'>{ visit.mbi_status }</td>
          </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
}
