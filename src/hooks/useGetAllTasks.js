import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTasks } from "../redux/taskSlice.js";

const useGetAllTasks = () => {
  const dispatch = useDispatch();

  const backendUri =
    import.meta.env.VITE_BACKEND_URI || "http://localhost:8000";

  useEffect(() => {
    const fetchAllTasks = async () => {
      try {
        const res = await axios.get(
          `${backendUri}/api/tasks/all`,
          {
            withCredentials: true,
          }
        );

        if (res.data.success) {
          dispatch(setTasks(res.data.tasks));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllTasks();
  }, [dispatch, backendUri]);
};

export default useGetAllTasks;