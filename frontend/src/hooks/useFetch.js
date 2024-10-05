import { useEffect, useState } from "react";
import { useGlobalContext } from "../contexts/GlobalContext";
import { getLocalStorage } from "../helpers/localStorage";

export const useFetch = (url, option) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const { reload } = useGlobalContext();
  useEffect(() => {
    getData();
  }, [reload]);
  const getData = async () => {
    const token = getLocalStorage("site");
    try {
      const res = await fetch(process.env.REACT_APP_BASE_URL + url, {
        headers: {
          Authorization: "Bearer " + token,
        },
        ...option,
      });
      if (res.ok) {
        const result = await res.json();
        setData(result);
      }
    } catch (error) {
      setError(error);
    }
  };

  return { error, data };
};
