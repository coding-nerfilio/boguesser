import { Box, BoxProps, Button, ButtonProps } from "@mui/material";
import { useState } from "preact/hooks";

interface props {
  children: any;
  inactiveSX: BoxProps["sx"];
  activeSX: BoxProps["sx"];
}

const Portal = (props: props) => {
  const [active, setActive] = useState(false);

  const onMouseEnter = (event: Event) => {
    if (!active) {
      event.stopPropagation();
      setActive(true);
    }
  };

  const onMouseLeave = (event: Event) => {
    event.stopPropagation(); // Evita que el evento de clic se propague al contenedor
    setActive(false);
  };

  return (
    <Box
      sx={{
        position: "absolute",
        transition: "top 0.5s, left 0.5s, height 0.5s, width 0.5s",
        overflow: "hidden",
        ...(active ? props.activeSX : props.inactiveSX),
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {props.children}
    </Box>
  );
};

export default Portal;
