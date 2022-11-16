import { makeStyles } from "@mui/styles";

export default makeStyles({
  card: {
    overflow: "visible",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  cardContent: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
  colorButtonContainer: {
    position: "absolute",
    right: 10,
    top: 10,
  },
  colorButtonCounter: {
    fontWeight: 100,
    fontSize: 0.7,
  },

  rightColumn: {
    width: "100%",
    minWidth: 180,
    order: 1,
    pt: 2,
    px: 1,
  },
});
