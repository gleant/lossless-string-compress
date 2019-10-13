import { useState, useEffect } from "react";
import axios from "axios";

export function useCompressApi() {
  const [inputData, setInputData] = useState("");
  const [data, setData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/compress`,
        inputData,
        {
          responseType: "text",
          headers: {
            "Content-Type": "text/plain",
          },
        },
      );
      setData(response.data);
    };
    if (inputData) {
      fetchData();
    } else {
      setData("");
    }
  }, [inputData]);

  return [data, setInputData];
}

export function useDecompressApi() {
  const [inputData, setInputData] = useState("");
  const [data, setData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/decompress`,
        inputData,
        {
          responseType: "text",
          headers: {
            "Content-Type": "text/plain",
          },
        },
      );
      setData(response.data);
    };
    if (inputData) {
      fetchData();
    } else {
      setData("");
    }
  }, [inputData]);

  return [data, setInputData];
}
