export default function Register() {
  return <div className="flex justify-center mt-6">
    <form className="w-1/3 shadow-[0_5px_15px_0_hsla(0,0%,0%,0.15)] p-6 rounded-lg">
      <h2 className="bg-blue-200/70 border rounded-lg p-2 text-center mb-8 font-semibold">Registration Page</h2>
      <div className="grid grid-cols-3 gap-6">
        <label>First Name</label>
        <input className="col-span-2 border rounded-lg focus-within:none focus-within:outline-none p-2" type="text" />

        <label>Last Name</label>
        <input className="col-span-2 border rounded-lg focus-within:none focus-within:outline-none p-2" type="text" />

        <label>DOB</label>
        <input className="col-span-2 border rounded-lg focus-within:none focus-within:outline-none p-2" type="date" />

        <label>Gender</label>
        <select className="col-span-2 p-2 bg-white border rounded-lg">
          <option value="M">Male</option>
          <option value="F">Female</option>
        </select>

        <button className="mt-8 border border-green-600 bg-green-300/70 p-2 rounded-lg">
          Clear
        </button>
        <button className="mt-8 border border-green-600 bg-green-300/70 p-2 rounded-lg col-start-3 col-end-3">
          Save
        </button>
      </div>

      <div>

      </div>

    </form>
  </div>
}
