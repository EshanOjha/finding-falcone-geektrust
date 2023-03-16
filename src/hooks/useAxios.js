import { useState, useEffect } from "react";
import axios from "axios";

axios.defaults.baseURL = "https://findfalcone.herokuapp.com";
export const useAxios = (axiosParams) => {
  const [response, setResponse] = useState([{}]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async (params) => {
      try {
        console.log(params)
        const result = await axios.request(params);
        console.log(result)
        setResponse(result.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData(axiosParams);
  }, []);

  return { response, error, loading };
};
