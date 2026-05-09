import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setMyTasks } from "../redux/taskSlice";
import { setMyProjects } from "../redux/projectSlice";

const useGetMyProjects = () => {
  const dispatch = useDispatch();

  const backendUri =
    import.meta.env.VITE_BACKEND_URI || "http://localhost:8000";
    useEffect(() => {
        const fetchMyProjects = async () => {
            try {
                const res = await axios.get(`${backendUri}/api/projects/getMyProjects`, {
                    withCredentials: true,
                });

                if(res.data.success) {
                    dispatch(setMyProjects(res.data.projects));
                }
            } catch (error) {
                console.log(error);
                
            }
        }
        fetchMyProjects()
    },[dispatch, backendUri])
};

export default useGetMyProjects;
