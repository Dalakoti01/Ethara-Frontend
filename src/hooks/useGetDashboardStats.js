import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { setDashboard } from '../redux/authSlice';

const useGetDashboardStats = () => {
    const dispatch = useDispatch()
    const backendUri =
    import.meta.env.VITE_BACKEND_URI || "http://localhost:8000";

    useEffect(() => {
        const fetchDashboardStats = async() => {
            try {
                const res = await axios.get(`${backendUri}/api/auth/dashboard`,{
                    withCredentials:true
                })

                if(res.data.success){
                    dispatch(setDashboard(res.data.stats))
                }
            } catch (error) {
                console.log(error);
                
            }
        }
        fetchDashboardStats()
    },[dispatch,backendUri])
}

export default useGetDashboardStats