import { View, Map, Feature } from "ol";
import TileLayer from "ol/layer/Tile";
import { OSM, Vector as VectorSource } from "ol/source";
import { useEffect } from "preact/hooks";
import "ol/ol.css";
import { Box, BoxProps } from "@mui/material";
import { LineString, Point } from "ol/geom";
import { fromLonLat } from "ol/proj";
import Icon from "ol/style/Icon";
import Style from "ol/style/Style";
import Vector from "ol/layer/Vector";
import MapPin1 from "../../assets/map-pin.png";
import MapPin2 from "../../assets/map-pin2.png";
import Stroke from "ol/style/Stroke";

interface props {
  id: string;
  sx: BoxProps["sx"];
  onClick?: (
    map: Map,
    vectorSources: Array<VectorSource>,
    coords: Array<number>
  ) => any;
  init?: (map: Map, vectorSources: Array<VectorSource>) => any;
}

function OLMap(props: props) {
  useEffect(() => {
    const osmLayer = new TileLayer({
      preload: Infinity,
      source: new OSM(),
    });

    const map = new Map({
      target: props.id,
      layers: [osmLayer],
      view: new View({
        projection: "EPSG:4326",
        center: [-55.825371, -32.609488],
        zoom: 7,
      }),
    });

    const vectorSources: Array<VectorSource> = [
      new VectorSource({
        features: [],
      }),
      new VectorSource({
        features: [],
      }),
      new VectorSource({
        features: [],
      }),
    ] as any;

    const vectorLayers = [
      new Vector({
        source: vectorSources[0],
        style: new Style({
          image: new Icon({
            anchor: [0.5, 1],
            width: 32,
            height: 32,
            src: MapPin1,
          }),
        }),
      }),
      new Vector({
        source: vectorSources[1],
        style: new Style({
          image: new Icon({
            anchor: [0.5, 1],
            width: 32,
            height: 32,
            src: MapPin2,
          }),
        }),
      }),
      new Vector({
        source: vectorSources[2],
      }),
    ];

    map.addLayer(vectorLayers[0]);
    map.addLayer(vectorLayers[1]);
    map.addLayer(vectorLayers[2]);

    if (props.onClick) {
      map.on("click", (event) => {
        props.onClick!(map, vectorSources, event.coordinate);
      });
    }

    if (props.init) {
      props.init(map, vectorSources);
    }

    return () => map.setTarget(null!);
  }, []);

  return (
    <Box
      style={{
        height: "100%",
        width: "100%",
        borderRadius: "20px",
      }}
      sx={{ ...props.sx }}
      id={props.id}
    />
  );
}

export const AddMarker = (
  vectorSource: VectorSource,
  coords: Array<number>
) => {
  const markerFeature = new Feature({
    geometry: new Point(fromLonLat(coords, "EPSG:4326")),
  });

  vectorSource.addFeature(markerFeature);
};

export const AddDashedLine = (
  vectorSource: VectorSource,
  c1: Array<number>,
  c2: Array<number>
) => {
  const lineFeature = new Feature({
    geometry: new LineString([
      fromLonLat(c1, "EPSG:4326"),
      fromLonLat(c2, "EPSG:4326"),
    ]),
  });

  var lineStyle = new Style({
    stroke: new Stroke({
      color: "blue",
      width: 2,
      lineDash: [10, 10],
    }),
  });

  lineFeature.setStyle(lineStyle);

  vectorSource.addFeature(lineFeature);
};

export default OLMap;
