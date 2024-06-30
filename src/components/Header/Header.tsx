import { Box, BoxProps, Typography } from "@mui/material";
import { Colors } from "../../colors";
interface props {
  sx?: BoxProps["sx"];
}
const Header = (props: props) => {
  return (
    <Box
      sx={{
        ...props.sx,
        backgroundColor: Colors.background,
        display: "flex",
        alignItems: "center",
        pl: "20px",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography sx={{ color: Colors.accent1 }} variant="h4">
          Bo
        </Typography>
        <Typography sx={{ color: Colors.accent2 }} variant="h4">
          Guesser
        </Typography>
      </Box>
    </Box>
  );
};

export default Header;
