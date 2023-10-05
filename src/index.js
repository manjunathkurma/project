import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '../node_modules/bootstrap/dist/js/bootstrap.min';
import Home from './features/home/home';
import { store } from './app/store';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import AdminDashBoard from './features/admin/adminDashBoard';
import AddHospital from './features/admin/addhospital';
import { Provider } from 'react-redux';
import AddBed from './features/admin/addBed';
import HospitalDetails from './features/hospital/hospitalDetails';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children:[
      {
        path:'/admindashboard',
        element:<AdminDashBoard></AdminDashBoard>,
        children:[
          {
            path:'/admindashboard/addhospital',
            element:<AddHospital></AddHospital>
          },
          {
            path:'/admindashboard/addbed',
            element:<AddBed></AddBed>
          }
        ]
      },
      {
        path:'/details/:id',
        element:<HospitalDetails></HospitalDetails>
      },
      {
        path:'',
        element:<Home></Home>
      }
    ]
  }

]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <RouterProvider router={router}></RouterProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
