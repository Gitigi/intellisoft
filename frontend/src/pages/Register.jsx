import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query"
import { useNavigate } from 'react-router-dom';

async function registerPatient(data) {
  const res = await fetch(`${import.meta.env.VITE_API}/patients`, {
    method: 'POST',
    mode: "cors",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  const patient = await res.json()
  return patient
}

export default function Register() {
  const queryClient = useQueryClient()
  const navigate = useNavigate();
  const { register, handleSubmit, formState: {errors, isSubmitted}, reset } = useForm();

  const mutation = useMutation(registerPatient, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('patients')
      navigate(`/patients/${data.id}/visits/new`)
    },
  })

  const onSubmit = data => {
    mutation.mutate(data)
  };

  return <div className="flex justify-center mt-6">
    <form className="mx:2 lg:mx-auto lg:w-1/3 shadow-[0_5px_15px_0_hsla(0,0%,0%,0.15)] p-6 rounded-lg"
      onSubmit={handleSubmit(onSubmit)}>
      <h2 className="bg-blue-200/70 border rounded-lg p-2 text-center mb-8 font-semibold">Registration Page</h2>
      <div className="grid grid-cols-3 gap-2">
        <label>First Name</label>
        <div className="col-span-2">
          <input className="border rounded-lg focus-within:none focus-within:outline-none p-2"
            type="text"
            name="firstname"
            {...register("firstname", {required: true})}
            />
          { isSubmitted && errors.firstname ? <p className="text-red-800 font-medium">{errors.firstname.type}</p> : <p>&nbsp;</p> }
        </div>

        <label>Last Name</label>
        <div className="col-span-2">
          <input className="border rounded-lg focus-within:none focus-within:outline-none p-2"
            type="text"
            {...register("lastname", {required: true})}
            />
          { isSubmitted && errors.lastname ? <p className="text-red-800 font-medium">{errors.lastname.type}</p> : <p>&nbsp;</p> }
        </div>

        <label>DOB</label>
        <div className="col-span-2 ">
          <input className="border rounded-lg focus-within:none focus-within:outline-none p-2 w-full"
            type="date"
            {...register("dob", {required: true})}
            />
          { isSubmitted && errors.dob ? <p className="text-red-800 font-medium">{errors.dob.type}</p> : <p>&nbsp;</p> }
        </div>

        <label>Gender</label>
        <div className="col-span-2 ">
          <select className="p-2 bg-white border rounded-lg w-full"
            {...register("gender", {required: true})}>
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>
          { isSubmitted && errors.gender ? <p className="text-red-800 font-medium">{errors.gender.type}</p> : <p>&nbsp;</p> }
        </div>

        <button className="mt-8 border border-green-600 bg-green-300/70 p-2 rounded-lg" onClick={()=>reset()}>
          Clear
        </button>
        <input type="submit" value="Save" className="cursor-pointer mt-8 border border-green-600 bg-green-300/70 p-2 rounded-lg col-start-3 col-end-3" />
      </div>
    </form>
  </div>
}
