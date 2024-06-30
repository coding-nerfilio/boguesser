import { Box, BoxProps, Typography } from "@mui/material";
import { Colors } from "../../colors";
import FavoriteIcon from "@mui/icons-material/Favorite";

interface props {
  sx?: BoxProps["sx"];
}
const Footer = (props: props) => {
  return (
    <Box
      sx={{
        ...props.sx,
        backgroundColor: Colors.background,
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography mr="5px" color="white" fontWeight={"bold"}>
        Hecho con{" "}
      </Typography>{" "}
      <FavoriteIcon sx={{ color: Colors.accent2 }} />{" "}
      <Typography ml="5px" fontWeight={"bold"} color="white">
        {" "}
        por Fran
      </Typography>
    </Box>
  );
};
export default Footer;
