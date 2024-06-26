import { Box, Button, Typography } from "@mui/material";
import StreetView from "./components/StreetView/StreetView";
import useLocation from "./hooks/useLocation";
import OLMap, { AddMarker } from "./components/OLMap/OLMap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ResultAlert from "./components/ResultAlert/ResultAlert";

import { useEffect, useRef } from "preact/hooks";
import useCountdown from "./hooks/useCountdown";

const MySwal = withReactContent(Swal);

export function App() {
  const location = useLocation();
  const locationRef = useRef(location);

  useEffect(() => {
    locationRef.current = location;
  }, [location]);

  const showResults = () => {
    countDown.pause();
    console.log(locationRef.current);
    MySwal.fire({
      width: "50vw",
      title: (
        <ResultAlert
          coords={locationRef.current.coords!}
          selectedCoords={locationRef.current.selectedCoords}
        />
      ),
    }).then(() => {
      window.location.reload();
    });
  };

  const countDown = useCountdown(30, showResults);

  useEffect(() => {
    countDown.start();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Typography variant="h1" textAlign={"center"}>
        Boguesser
      </Typography>
      <Typography variant="h5" textAlign={"center"}>
        {countDown.displayText}
      </Typography>
      <Box sx={{ display: "flex" }}>
        {location.code && (
          <StreetView sx={{ height: "80vh" }} code={location.code} />
        )}
        <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <OLMap
            id="map1"
            sx={{ height: "100%", flex: 1 }}
            onClick={(map, vectorSources, coords) => {
              vectorSources[0].clear();
              location.setSelectedCoords(coords);
              AddMarker(vectorSources[0], coords);
            }}
          />
          <Button
            variant="outlined"
            disabled={!location.selectedCoords || countDown.displayText === "0"}
            onClick={showResults}
          >
            Confirmar
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
