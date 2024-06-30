import { Box, Button, Typography } from "@mui/material";
import StreetView from "./components/StreetView/StreetView";
import useLocation from "./hooks/useLocation";
import OLMap, { AddMarker } from "./components/OLMap/OLMap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ResultAlert from "./components/ResultAlert/ResultAlert";

import { useEffect, useRef } from "preact/hooks";
import useCountdown from "./hooks/useCountdown";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Portal from "./components/Portal/Portal";
import { Colors } from "./colors";

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

  const countDown = useCountdown(9999, showResults);

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
      <Header sx={{ height: "15vh" }} />

      <Box sx={{ display: "flex", justifyItems: "center", width: "100vw" }}>
        {location.code && (
          <StreetView
            sx={{ height: "80vh", width: "100vw" }}
            code={location.code}
          />
        )}
        <Portal
          activeSX={{
            height: "50vh",
            width: "50vw",
            top: "43vh",
            left: "48vw",
            border: `5px solid ${Colors.accent1}`,
            borderRadius: "20px",
          }}
          inactiveSX={{
            height: "19vh",
            width: "19vw",
            top: "74vh",
            left: "79vw",
            border: `5px solid ${Colors.accent1}`,
            borderRadius: "20px",
          }}
        >
          <OLMap
            id="map1"
            sx={{ borderRadius: "20px" }}
            onClick={(map, vectorSources, coords) => {
              vectorSources[0].clear();
              location.setSelectedCoords(coords);
              AddMarker(vectorSources[0], coords);
            }}
          />
        </Portal>
      </Box>
      <Button
        sx={{
          position: "absolute",
          left: "86vw",
          top: "95.5vh",
          color: "white",
          fontWeight: "bold",
          borderColor: Colors.accent1,
          background: Colors.accent1,
        }}
        variant="contained"
        onClick={showResults}
      >
        Adivinar
      </Button>
      <Footer sx={{ height: "5vh" }} />
    </Box>
  );
}

/*  <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <OLMap
            id="map1"
            sx={{ height: "100%", flex: 1 }}
            onClick={(map, vectorSources, coords) => {
              vectorSources[0].clear();
              location.setSelectedCoords(coords);
              AddMarker(vectorSources[0], coords);
            }}
          />
         
        </Box>*/
