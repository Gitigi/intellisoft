import { useState } from 'react'
import {
  useHref,
  Routes,
  Route,
  Link,
  Outlet
} from "react-router-dom";
import Patients from './pages/Patients';
import Visits from './pages/Visits';
import Register from './pages/Register';
import Visit from './pages/Visit';

function App() {
  return (
    <div className='container mx-auto'>
      <h2 className='text-3xl text-slate-700 shadow-md py-2 font-bold px-4'>Intellisoft Kenya</h2>
      <div className='lg:mx-24 flex flex-col gap-2'>
        
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Patients />} />
            <Route path="visits" element={<Visits />} />
          </Route>
          <Route path="/register" element={<Register />} />
          <Route path="/visit" element={<Visit />} />
        </Routes>
      </div>
    </div>
  )
}

function Layout() {
  let href = useHref();
  return <>
    <ul className='flex items-stretch mt-8 border rounded-t-lg divide-x'>
      <li className={`flex-1 font-bold text-gray-500 ${href === '/' ? 'border-b-2 border-green-200' : ''}`}>
        <Link className='w-full py-4 inline-block text-center' to="/">Patients</Link>
      </li>
      <li className={`flex-1 font-bold text-gray-500 ${href === '/visits' ? 'border-b-2 border-green-200' : ''}`}>
        <Link className='w-full py-4 inline-block text-center' to="/visits">Visits</Link>
      </li>
    </ul>
    <Outlet />
  </>
}

export default App
