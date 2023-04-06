import { useMemo } from "react"
import { useForm } from "react-hook-form";

export default function Visit() {
  const { register, handleSubmit, watch, formState: {errors, isSubmitted}, reset } = useForm();
  const onSubmit = data => console.log(data);

  const mbi = useMemo(()=>{
    let height = (parseFloat(watch("height")) || 0) / 100;
    let width = parseFloat(watch("width")) || 0
    return width / (height * height)  || 0
  }, [watch("height"), watch("width")])

  console.log(errors)

  return <div className="flex justify-center mt-6">
    <form
      className="mx-4 lg:w-1/3 shadow-[0_5px_15px_0_hsla(0,0%,0%,0.15)] p-6 rounded-lg"
      onSubmit={handleSubmit(onSubmit)}
      >
      <h2 className="col-span-3 bg-blue-200/70 border rounded-lg p-2 text-center mb-8 font-semibold items-center justify-items-center content-center">Vitals</h2>
      <div className="grid grid-cols-3 gap-3">
        <label>Date</label>
        <div className="col-span-2">
          <input
            className="border rounded-lg focus-within:none focus-within:outline-none p-2"
            type="date"
            {...register("date", {required: true})}
            />
          { isSubmitted && errors.date ? <p className="text-red-800 font-medium">{errors.date.type}</p> : <p>&nbsp;</p> }
        </div>

        <label>Height (cm)</label>
        <div className="col-span-2">
          <input
            className="col-span-2 border rounded-lg focus-within:none focus-within:outline-none p-2"
            type="text"
            {...register("height", {required: true, pattern: /\d+(\.\d+)?/})}
            />
          { isSubmitted && errors.height ? <p className="text-red-800 font-medium">{errors.height.type}</p> : <p>&nbsp;</p> }
        </div>

        <label>Width (cm)</label>
        <div className="col-span-2">
          <input
            className="col-span-2 border rounded-lg focus-within:none focus-within:outline-none p-2"
            type="text"
            {...register("width", {required: true, pattern: /\d+(\.\d+)?/})}
            />
          { isSubmitted && errors.width ? <p className="text-red-800 font-medium">{errors.width.type}</p> : <p>&nbsp;</p> }
        </div>
        

        <label>BMI (cm)</label>
        <input value={mbi.toFixed(2)} disabled className="col-span-2 border rounded-lg focus-within:none focus-within:outline-none p-2 bg-gray-200/60" type="text" />
      </div>
      

      {mbi < 25 ? 
       <SectionA register={register} errors={errors} isSubmitted={isSubmitted} /> :
        <SectionB register={register} errors={errors} isSubmitted={isSubmitted} />
      }

      <div className="grid grid-cols-3">
        <button className="mt-8 border border-green-600 bg-green-300/70 p-2 rounded-lg" onClick={()=>reset()}>
          Clear
        </button>
        <input type="submit" value="Save" className="cursor-pointer mt-8 border border-green-600 bg-green-300/70 p-2 rounded-lg col-start-3 col-end-3" />
      </div>

    </form>
  </div>
}

function SectionA({ register, errors, isSubmitted }) {
 return <div className="mt-6">
  <h2 className="col-span-3 bg-blue-200/70 border rounded-lg p-2 text-center mb-4 font-semibold items-center justify-items-center content-center">Section A</h2>
  <div className="ml-2 mb-1">
    <p className="font-semibold text-gray-600">General Health?</p>
    <ul className="ml-6">
      <li className="space-x-4">
        <input type="radio" value="good" className="border" {...register("health", {required: true})} />
        <label>Good</label>
      </li>
      <li className="space-x-4">
        <input type="radio" value="poor" className="border" {...register("health", {required: true})} />
        <label>Poor</label>
      </li>
    </ul>
    { isSubmitted && errors.health ? <p className="text-red-800 font-medium">{errors.health.type}</p> : <p>&nbsp;</p> }
  </div>

  <div className="ml-2">
    <p className="font-semibold text-gray-600">Have you been on a diet to loose weight?</p>
    <ul className="ml-6">
      <li className="space-x-4">
        <input type="radio" value="yes" className="border" {...register("diet", {required: true})} />
        <label>Yes</label>
      </li>
      <li className="space-x-4">
        <input type="radio" value="no" className="border" {...register("diet", {required: true})} />
        <label>No</label>
      </li>
    </ul>
    { isSubmitted && errors.diet ? <p className="text-red-800 font-medium">{errors.diet.type}</p> : <p>&nbsp;</p> }
  </div>
  <div className="mt-2 ml-2">
    <label className="font-semibold text-gray-600">Comments</label>
    <textarea className="border rounded-lg w-full" {...register("comments")}>

    </textarea>
  </div>
</div>
}

function SectionB({register, errors, isSubmitted}) {
  return <div className="mt-6">
   <h2 className="col-span-3 bg-blue-200/70 border rounded-lg p-2 text-center mb-4 font-semibold items-center justify-items-center content-center">Section B</h2>
   <div className="ml-2 mb-1">
     <p className="font-semibold text-gray-600">General Health?</p>
     <ul className="ml-6">
       <li className="space-x-4">
         <input name="health" value="good" type="radio" className="border" {...register("health", {required: true})} />
         <label>Good</label>
       </li>
       <li className="space-x-4">
         <input name="health" value="poor" type="radio" className="border" {...register("health", {required: true})} />
         <label>Poor</label>
       </li>
     </ul>
     { isSubmitted && errors.health ? <p className="text-red-800 font-medium">{errors.health.type}</p> : <p>&nbsp;</p> }
   </div>
 
   <div className="ml-2">
     <p className="font-semibold text-gray-600">Are you currentyly taking any drugs?</p>
     <ul className="ml-6">
       <li className="space-x-4">
         <input type="radio" value="yes" className="border" {...register("drugs", {required: true})} />
         <label>Yes</label>
       </li>
       <li className="space-x-4">
         <input type="radio" value="no" className="border" {...register("drugs", {required: true})} />
         <label>No</label>
       </li>
     </ul>
     { isSubmitted && errors.drugs ? <p className="text-red-800 font-medium">{errors.drugs.type}</p> : <p>&nbsp;</p> }
   </div>
   <div className="mt-2 ml-2">
     <label className="font-semibold text-gray-600">Comments</label>
     <textarea className="border rounded-lg w-full" {...register("comments")}>
 
     </textarea>
   </div>
 </div>
 }