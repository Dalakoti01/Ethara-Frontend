import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setProjects } from "../redux/projectSlice.js";

const useGetAllProjects = () => {
  const dispatch = useDispatch();

  const backendUri =
    import.meta.env.VITE_BACKEND_URI || "http://localhost:8000";

  useEffect(() => {
    const fetchAllProjects = async () => {
      try {
        const res = await axios.get(
          `${backendUri}/api/projects/all`,
          {
            withCredentials: true,
          }
        );

        if (res.data.success) {
          dispatch(setProjects(res.data.projects));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllProjects();
  }, [dispatch, backendUri]);
};

export default useGetAllProjects;