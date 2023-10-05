import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAddBedsMutation, useGetHospitalDetailsByIdQuery, useLazyGetAllHospitalsQuery } from "../../services/hospitalApi";
import _ from 'lodash'
import { GoogleAuthProvider,getAuth,signInWithPopup } from "firebase/auth";
const provider =new GoogleAuthProvider()
function HospitalDetails(){
    var p=useParams()
    var {isLoading,data}=useGetHospitalDetailsByIdQuery(p.id)
    var [updateBeds]=useAddBedsMutation()
    var [getHospitalDetails]=useLazyGetAllHospitalsQuery()
    var [beds,setBeds]=useState(null)
    var [bedTypes,setBedTypes]=useState([])
    var[selectedBed,setSeletedBed]=useState(-1)
    useEffect(()=>{
        if(data){
            var bedsByCategory=_.groupBy(data.beds,'bedType')
            console.log(bedsByCategory)
            setBeds(bedsByCategory)
            var temp=[]
            for(var k in bedsByCategory){
                temp.push(k)
            }
            setBedTypes([...temp])
        }
    },[data])
    function occupyBed(bid){
        console.clear()
        console.log(data)
        setSeletedBed(bid)
        var tempBeds=data.beds
        tempBeds=tempBeds.map((b)=>{
            console.log(b)
            if(b.bedID===bid){
                return {...b,bedstatus:'occupied'}
            }
            else{
                return b
            }
        })
        console.log('t:',tempBeds)
        var bedsByCategory=_.groupBy(tempBeds,'bedType')
        setBeds(bedsByCategory)
    }
    function updateHospital(){
        const auth=getAuth()
        signInWithPopup(auth,provider).then((result)=>{
            const credential=GoogleAuthProvider.credentialFromResult(result)
            const token=credential.accessToken
            const user=result.user
      
        console.clear()
        console.log(beds)
        console.log(token)
        console.log(user)

        var temp=Object.values(beds).flat(1)
        temp=temp.map((d)=>{
            if(d.bedID===selectedBed){
                return {...d,patients:[...d.patients,{useremail:user.email,token:user.accessToken}]}
            }
            else{
                return d
            }
        })
        data={...data,beds:[...temp]}
        updateBeds(data).then(()=>{
            alert('updated')
            getHospitalDetails(p.id)
        })
    }).catch((error)=>{
        console.log(error)
    })
    }
    return (
        <div>
            <h1>Hospital Details</h1>
            {
                isLoading && ('wait')
            }
            {
                !isLoading && (
                    <div>
                        <h2>{data.hospitalName.toUpperCase()}</h2>
                    <ul>
                        {
                            bedTypes.map((a,i)=>{                           
                                return <li keys={i}>
                                    {a}-{beds[a].length}
                                    {
                                        beds[a].map((b)=>{
                                          
                                            return(
                                            <>
                                              {b.bedstatus==='open' &&<i class="bi bi-clipboard m-1 h4" onClick={()=>{occupyBed(b.bedID)}}></i>}
                                             {b.bedstatus==='occupied' && <i class="bi bi-clipboard-fill m-1 h4" onClick={()=>{occupyBed(b.bedID)}}></i>}
                                            </>
                                            )
                                        })
                                    }
                                    </li>
                            })
                        }
                    </ul>
                    <button onClick={()=>{updateHospital()}}>Book</button>
                    </div>
                )
            }
        </div>
    )
}
export default HospitalDetails