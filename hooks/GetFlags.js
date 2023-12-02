import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { API_REGION_URL } from "../Constants";

export const GetFlags = () => {
  const [flags, setFlags] = useState([]);
  const [allFlags, setAllFlags] = useState([]);

  const fetchFlags = useCallback(
    async (customFlags = []) => {
      try {
        let fetchedFlags;

        // Fetch all flags only if allFlags is empty
        if (allFlags.length === 0) {
          const response = await axios.get(`${API_REGION_URL}/all`);
          fetchedFlags = response.data;

          // Store all fetched flags in the allFlags state
          setAllFlags(fetchedFlags);
        } else {
          fetchedFlags = allFlags;
        }

        // Select four random flags from the array of all flags or use customFlags if provided
        const selectedFlags =
          customFlags.length > 0 ? customFlags : fetchedFlags.slice(0, 4);

        // Add the isCorrectAnswer property and set it to false by default
        const flagsWithCorrectAnswer = selectedFlags.map((flag) => ({
          ...flag,
          isCorrectAnswer: false,
        }));

        setFlags(flagsWithCorrectAnswer);
      } catch (error) {
        console.error("Error fetching flags data: ", error);
      }
    },
    [allFlags]
  );

  useEffect(() => {
    // Fetch flags only if allFlags is empty
    if (allFlags.length === 0) {
      fetchFlags();
    }
  }, [allFlags, fetchFlags]);

  return { flags, fetchFlags, allFlags };
};

export default GetFlags;
