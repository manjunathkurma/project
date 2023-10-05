import React from "react";
import { useGetAllHospitalsQuery } from "../../services/hospitalApi";
import { Link } from "react-router-dom";
function Home(){
    var {isLoading,data}=useGetAllHospitalsQuery()
return (
    <div>
        <h1>Home</h1>
        {
            isLoading && (<b>wait</b>)
        }
        <ul className="d-flex flex-wrap">
        {
            !isLoading && (
                data.map((a)=>{
                    return <li style={{listStyle:'none'}}>
                       <div className="li">
                       <img src={a.image} style={{height:'200px'}}/>
                        <h2 >{a.hospitalName}</h2>
                        <h3>Place : {a.area}</h3>
                        <li>
                            <b>Total Beds : {a.beds.length}</b><br />
                            <Link to={`details/${a.id}`}>Details</Link>
                        </li>
                       </div>
                        </li>
                })
            )
        }
        </ul>
    </div>
)
}
export default Home