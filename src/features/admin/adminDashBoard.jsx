import React from "react";
import { Outlet,Link } from "react-router-dom";
function AdminDashBoard(){
return (
    <div>
        <h1>Admin DashBoard</h1>
        <Link to='addhospital'><button className="btn btn-danger">Add hospital</button></Link>&nbsp;
        <Link to='addBed'><button className="btn btn-success">Add Bed</button></Link>
        <Outlet></Outlet>
    </div>
)
}
export default AdminDashBoard