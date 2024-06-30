import { Box, Typography } from "@mui/material";
import OLMap, { AddDashedLine, AddMarker } from "../OLMap/OLMap";
import { Haversine, distanceToZoom, midpoint } from "../../utils";
import { boundingExtent } from "ol/extent";

interface props {
  selectedCoords?: Array<number> | null;
  coords: Array<number>;
}

const ResultAlert = (props: props) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        height: "50vh",
        width: "auto",
      }}
    >
      {props.selectedCoords ? (
        <>
          <OLMap
            id="map2"
            sx={{ height: "100%", flex: 1 }}
            init={(map, vectorSources) => {
              AddMarker(vectorSources[0], props.selectedCoords!);
              AddMarker(vectorSources[1], props.coords);
              AddDashedLine(
                vectorSources[2],
                props.coords,
                props.selectedCoords!
              );
              map.render();

              map
                .getView()
                .fit(boundingExtent([props.selectedCoords!, props.coords]), {
                  size: map.getSize(),
                  padding: [50, 50, 50, 50],
                });
            }}
          />
          <Typography variant="h4">
            Le erraste por
            {" " +
              Haversine(
                props.selectedCoords![0],
                props.selectedCoords![1],
                props.coords[0],
                props.coords[1]
              ).toFixed(2)}
            KM jajaja
          </Typography>
        </>
      ) : (
        <Typography variant="h4">No has elegido una ubicación</Typography>
      )}
    </Box>
  );
};

export default ResultAlert;
