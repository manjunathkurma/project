import React, { useState } from "react";
import { Formik } from "formik";
import { bedTypes } from "../../constents";
import { useAddHospitalsMutation } from "../../services/hospitalApi";
function AddHospital(){
  var [newbedtype,setNewbedtype]=useState({
    bedType:'',
    price:0
  })
  var [addBedTypes,setAddBedTypes]=useState([]);
  var [addHospital]=useAddHospitalsMutation()
  function addBedType(){
    setAddBedTypes([...addBedTypes,newbedtype])
  }
return (
        <Formik
       initialValues={{
         hospitalName: '',
          image: '',
          area:'',
          review:[],
          bedTypes:[],
          beds:[]
         }}

       onSubmit={(values)=>{
        values.bedTypes=[...addBedTypes]
        addHospital(values).then((res)=>{
          console.log(res)
        })
       }}
         >
    
       {({
         values,
         errors,
         touched,
         handleChange,
         handleBlur,
         handleSubmit,
         isSubmitting,
         /* and other goodies */
       }) => (
         <form onSubmit={handleSubmit}>
           <input
             type="text"
             name="hospitalName"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.hospitalName}
             placeholder="Hospital Name"
           />
           <br />
           <input
             type="text"
             name="image"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.image}
             placeholder="image"
           />
           <br />
            <input
             type="text"
             name="area"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.area}
             placeholder="location"
           />
           <br />
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
 Add Bed Type 
</button>
<br />
<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">Add Bed With Price</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <label htmlFor="">Select Bed Type</label>
        <select onChange={(e)=>{setNewbedtype({...newbedtype,bedType:e.target.value})}}>
          <option value={null} disabled selected>Please select</option>
          {
            bedTypes.map((a)=>{
              return <option value={a}>{a}</option>
            })
          }
        </select><br />
        <input type="text" placeholder="Price" onChange={(e)=>{setNewbedtype({...newbedtype,price:e.target.value})}}/>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={()=>{addBedType(values)}}>Add Bed Types</button>
      </div>
    </div>
  </div>
</div>
           <button type="submit" >
             Submit
           </button>
         </form>
       )}
     </Formik>
    
)
}
export default AddHospital;