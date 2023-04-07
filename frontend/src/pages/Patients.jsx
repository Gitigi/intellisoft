import { Link, useNavigate } from "react-router-dom"
import {
  useQuery
} from 'react-query'

async function getPatients() {
  const res = await fetch(`${import.meta.env.VITE_API}/patients`)
  return await res.json()
}

export default function Patients() {
  const navigate = useNavigate()
  const query = useQuery('patients', getPatients)
  const patients = query?.data || []

  const gotoVisits = (e) => {
    const patientId = e.currentTarget.getAttribute('data-id')
    navigate(`/patients/${patientId}/visits`)
  }
  
  return <div className="contents">
    <div className='flex justify-between'>
      <Link to="/register" className='py-2 px-4 border rounded-lg bg-green-100 text-green-800 font-semibold'>Register</Link>
      <input className='hidden py-2 px-4 border rounded-lg w-1/4' type='text' placeholder='Search' />
    </div>
    <div className='border rounded-b-lg'>
      <table className='w-full table-fixed px-2 rounded-lg border-collapse'>
        <thead className='bg-green-300'>
          <tr className='text-left rounded-lg'>
            <th className='py-3 px-2 text-white border border-slate-300 rounded-lg'>First Name</th>
            <th className='py-3 px-2 text-white border border-slate-300'>Last Name</th>
            <th className='py-3 px-2 text-white border border-slate-300'>Age</th>
          </tr>
        </thead>
        <tbody className='[&>*:nth-child(even)]:bg-green-100/40 rounded-lg'>
          {patients.map( (patient,index) => <tr key={ index } className="hover:bg-green-200 cursor-pointer" data-id={patient.id} onClick={gotoVisits}>
            <td className='py-3 px-2 text-slate-900 border-t border-r border-slate-300'>{ patient.firstname }</td>
            <td className='py-3 px-2 border-t border-r border-slate-300'>{ patient.lastname }</td>
            <td className='py-3 px-2 border-t border-slate-300'>{ patient.age }</td>
          </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
}
