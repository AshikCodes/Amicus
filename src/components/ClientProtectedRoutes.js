import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router";
import { useDispatch } from "react-redux";
import { setUserData } from "../reducers/userReducer";

const ClientProtectedRoutes = () => {
    const dispatch = useDispatch()
    const userInfo = JSON.parse(localStorage.getItem("loggedAppUser"));
    dispatch(setUserData(userInfo))


    return ( 
        userInfo ? <Outlet /> : <Navigate to='/login' />
     );
}
 
export default ClientProtectedRoutes;