import React, { useState } from "react";
import { useAddBedsMutation, useGetAllHospitalsQuery } from "../../services/hospitalApi";
function AddBed(){
    var {isLoading,data}=useGetAllHospitalsQuery();
    var [addBedsToDB]=useAddBedsMutation()
    var [bedCount,setBedCount]=useState(0);
    var [bedPrice,setBedPrice]=useState(0)
    var [selectedBedType,setSelectedBedType]=useState('')
    var [selectedHospital,setSelectedHospital]=useState(null)
    
    var [bedTypes,setBedTypes]=useState([])
    
    function UpdateBedTypes(u){
        var selectedHospitalDetails=JSON.parse(u)
        setBedTypes(selectedHospitalDetails.bedTypes)
        setSelectedHospital(selectedHospitalDetails.id)
    }
    function saveBed(){
        var newbeds=[]
       var numBeds=selectedHospital.beds.filter(b=>b.bedType===selectedBedType).length
        for(var i=0;i<=bedCount-1;i++){
            var newBed={
            bedstatus:'open',
            bedType:selectedBedType,
            bedPrice,
            patients:[],
            bedID:`${selectedBedType+(i+1)}`
        }
        newbeds.push(newBed)
    }
 var latestHospitalDetails={...selectedHospital,beds:[...selectedHospital.beds,...newbeds]};
 setSelectedHospital({...selectedHospital,beds:[...selectedHospital.beds,...newbeds]})
 addBedsToDB(latestHospitalDetails)
  }
    return (
        <div className="border border-2 border-warning m-2 p-2">
            <h1>Add Bed</h1>
            {
                isLoading && (<b>loading</b>)
            }
            {
                !isLoading && (
                    <div>
                    <select onChange={(e)=>{setSelectedHospital(JSON.parse(e.target.value))}}>
                        <option value={null} disabled selected>select</option>
                   
                    {
                        data.map((a)=>{
                            return <option value={JSON.stringify(a)}>{a.hospitalName}</option>
                        })
                    }
                    </select>
                    </div>
                )
            }
            {
               selectedHospital && selectedHospital.bedTypes.length>0 && (
                    <div>
                    <select onChange={(e)=>{setSelectedBedType(e.target.value)}}>
                        <option value={null} disabled selected>selected</option>
                        {

                        selectedHospital.bedTypes.map((b)=>{
                            return <option value={(b.bedType)}>{b.bedType}</option>
                        })
                        }
                    </select>
                    <br />
                    <input type="number" placeholder="Bed Count" onChange={(e)=>{setBedCount(e.target.value)}} /><br/>
                    <input type="number" placeholder="Bed Price" onChange={(e)=>{setBedPrice(e.target.value)}} /><br></br>
                </div>
                )
            }
            <button onClick={()=>{saveBed()}}>Save Beds</button>
        </div>
    )
}
export default AddBed;