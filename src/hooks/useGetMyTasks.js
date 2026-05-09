import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setMyTasks } from "../redux/taskSlice";

const useGetMyTasks = () => {
  const dispatch = useDispatch();

  const backendUri =
    import.meta.env.VITE_BACKEND_URI || "http://localhost:8000";
    useEffect(() => {
        const fetchMyTasks = async () => {
            try {
                const res = await axios.get(`${backendUri}/api/tasks/getMyTasks`, {
                    withCredentials: true,
                });

                if(res.data.success) {
                    dispatch(setMyTasks(res.data.tasks));
                }
            } catch (error) {
                console.log(error);
                
            }
        }
        fetchMyTasks()
    },[dispatch, backendUri])
};

export default useGetMyTasks;
