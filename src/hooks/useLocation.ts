import { useEffect, useState } from "preact/hooks";
import locations from "../assets/locations.json";
import { Haversine, codeToCoords, randomNumber } from "../utils";

const useLocation = () => {
  const [code, setCode] = useState<null | string>(null);
  const [coords, setCoords] = useState<null | Array<number>>(null);

  const [selectedCoords, setSelectedCoords] = useState<
    Array<number> | undefined
  >(undefined);

  const init = () => {
    const location = locations[randomNumber(0, locations.length - 1)];
    setCode(location);
    setCoords(codeToCoords(location));
  };

  useEffect(() => {
    init();
  }, []);

  return { code, coords, selectedCoords, setSelectedCoords, init };
};

export default useLocation;
