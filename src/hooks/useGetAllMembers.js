import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAllUsers } from "../redux/authSlice";

const useGetAllMembers = () => {
  const dispatch = useDispatch();

  const backendUri =
    import.meta.env.VITE_BACKEND_URI || "http://localhost:8000";

  useEffect(() => {
    const fetchAllProjects = async () => {
      try {
        const res = await axios.get(
          `${backendUri}/api/auth/allMembers`,
          {
            withCredentials: true,
          }
        );

        if (res.data.success) {
          dispatch(setAllUsers(res.data.members));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllProjects();
  }, [dispatch, backendUri]);
};

export default useGetAllMembers;