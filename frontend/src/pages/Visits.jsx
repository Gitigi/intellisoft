const patients = [
  {name: 'John Doe', age: 24, last_visited: '20/03/2023'},
  {name: 'Eric Dubay', age: 24, last_visited: '20/03/2023'},
  {name: 'Paul Doe', age: 24, last_visited: '20/03/2023'},
  {name: 'Ester Doe', age: 24, last_visited: '20/03/2023'},
  {name: 'James Doe', age: 24, last_visited: '20/03/2023'},
]

export default function Visits() {
  return <div className="flex flex-col gap-2">
    <div className='flex justify-between'>
      <input className='py-2 px-4 border rounded-lg w-1/4 self-end' type='text' placeholder='Search' />
      <input className='py-2 px-4 border rounded-lg w-1/4 self-end' type='date' placeholder='Search' />
    </div>
    <div className='border rounded-b-lg'>
      <table className='w-full table-fixed px-2 rounded-lg border-collapse'>
        <thead className='bg-green-300'>
          <tr className='text-left rounded-lg'>
            <th className='py-3 px-2 text-white border border-slate-300 rounded-lg'>Name</th>
            <th className='py-3 px-2 text-white border border-slate-300'>Age</th>
            <th className='py-3 px-2 text-white border border-slate-300'>Last Visited</th>
          </tr>
        </thead>
        <tbody className='[&>*:nth-child(even)]:bg-green-100/40 rounded-lg'>
          {patients.map( (patient,index) => <tr key={ index }>
            <td className='py-3 px-2 text-slate-900 border-t border-r border-slate-300'>{ patient.name }</td>
            <td className='py-3 px-2 border-t border-r border-slate-300'>{ patient.age }</td>
            <td className='py-3 px-2 border-t border-slate-300'>{ patient.last_visited }</td>
          </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
}
