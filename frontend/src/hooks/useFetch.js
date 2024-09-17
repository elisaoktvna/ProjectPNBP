import { useEffect, useState } from "react";
import { useGlobalContext } from "../contexts/GlobalContext";

export const useFetch = (url, option) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState([]);
  const { reload } = useGlobalContext();
  useEffect(() => {
    getData();
  }, [reload]);
  const getData = async () => {
    const res = await fetch(process.env.REACT_APP_BASE_URL + url, option);
    if (res.ok) {
      const result = await res.json();
      setData(result);
    }
  };

  return { error, data };
};
