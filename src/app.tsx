import { Box, Button, Typography, useThemeProps } from "@mui/material";
import StreetView from "./components/StreetView/StreetView";
import useLocation from "./hooks/useLocation";
import OLMap, { AddMarker } from "./components/OLMap/OLMap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ResultAlert from "./components/ResultAlert/ResultAlert";

const MySwal = withReactContent(Swal);

export function App() {
  const location = useLocation();

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
              console.log(map);
            }}
          />
          <Button
            variant="outlined"
            disabled={!location.selectedCoords}
            onClick={() => {
              MySwal.fire({
                width: "50vw",
                title: (
                  <ResultAlert
                    coords={location.coords!}
                    selectedCoords={location.selectedCoords!}
                  />
                ),
              });
            }}
          >
            Confirmar
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
