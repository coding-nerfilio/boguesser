import styles from "./StreetView.module.css";
import { Box, BoxProps } from "@mui/material";

interface props {
  sx?: BoxProps["sx"];
  code: string;
}
const StreetView = (props: props) => {
  return (
    <Box className={styles.mapContainer} sx={{ ...props.sx }}>
      <iframe
        class={styles.mapIframe}
        id="streetViewIframe"
        src={`https://www.google.com/maps/embed?pb=${props.code}`}
        width="100%"
        height="100%"
        style="border:0;"
        loading="eager"
        aria-hidden="true"
      />
    </Box>
  );
};

export default StreetView;
