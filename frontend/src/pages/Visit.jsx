export default function Visit() {
  return <div className="flex justify-center mt-6">
    <form className="mx-4 lg:w-1/3 shadow-[0_5px_15px_0_hsla(0,0%,0%,0.15)] p-6 rounded-lg">
      <h2 className="col-span-3 bg-blue-200/70 border rounded-lg p-2 text-center mb-8 font-semibold items-center justify-items-center content-center">Vitals</h2>
      <div className="grid grid-cols-3 gap-6">
        <label>Date</label>
        <input className="col-span-2 border rounded-lg focus-within:none focus-within:outline-none p-2" type="date" />

        <label>Height (cm)</label>
        <input className="col-span-2 border rounded-lg focus-within:none focus-within:outline-none p-2" type="text" />

        <label>Width (cm)</label>
        <input className="col-span-2 border rounded-lg focus-within:none focus-within:outline-none p-2" type="text" />

        <label>BMI (cm)</label>
        <input disabled className="col-span-2 border rounded-lg focus-within:none focus-within:outline-none p-2 bg-gray-200/60" type="text" />
      </div>
      

      <SectionA />
      <SectionB />

      <div className="grid grid-cols-3">
        <button className="mt-8 border border-green-600 bg-green-300/70 p-2 rounded-lg">
          Clear
        </button>
        <button className="mt-8 border border-green-600 bg-green-300/70 p-2 rounded-lg col-start-3 col-end-3">
          Save
        </button>
      </div>

    </form>
  </div>
}

function SectionA() {
 return <div className="mt-6">
  <h2 className="col-span-3 bg-blue-200/70 border rounded-lg p-2 text-center mb-4 font-semibold items-center justify-items-center content-center">Section A</h2>
  <div className="ml-2">
    <p className="font-semibold text-gray-600">General Health?</p>
    <ul className="ml-6">
      <li className="space-x-4">
        <input type="radio" className="border" />
        <label>Good</label>
      </li>
      <li className="space-x-4">
        <input type="radio" className="border" />
        <label>Poor</label>
      </li>
    </ul>
  </div>

  <div className="ml-2">
    <p className="font-semibold text-gray-600">Have you been on a diet to loose weight?</p>
    <ul className="ml-6">
      <li className="space-x-4">
        <input type="radio" className="border" />
        <label>Yes</label>
      </li>
      <li className="space-x-4">
        <input type="radio" className="border" />
        <label>No</label>
      </li>
    </ul>
  </div>
  <div className="mt-2 ml-2">
    <label className="font-semibold text-gray-600">Comments</label>
    <textarea className="border rounded-lg w-full">

    </textarea>
  </div>
</div>
}

function SectionB() {
  return <div className="mt-6">
   <h2 className="col-span-3 bg-blue-200/70 border rounded-lg p-2 text-center mb-4 font-semibold items-center justify-items-center content-center">Section A</h2>
   <div className="ml-2">
     <p className="font-semibold text-gray-600">General Health?</p>
     <ul className="ml-6">
       <li className="space-x-4">
         <input type="radio" className="border" />
         <label>Good</label>
       </li>
       <li className="space-x-4">
         <input type="radio" className="border" />
         <label>Poor</label>
       </li>
     </ul>
   </div>
 
   <div className="ml-2">
     <p className="font-semibold text-gray-600">Are you currentyly taking any drugs?</p>
     <ul className="ml-6">
       <li className="space-x-4">
         <input type="radio" className="border" />
         <label>Yes</label>
       </li>
       <li className="space-x-4">
         <input type="radio" className="border" />
         <label>No</label>
       </li>
     </ul>
   </div>
   <div className="mt-2 ml-2">
     <label className="font-semibold text-gray-600">Comments</label>
     <textarea className="border rounded-lg w-full">
 
     </textarea>
   </div>
 </div>
 }