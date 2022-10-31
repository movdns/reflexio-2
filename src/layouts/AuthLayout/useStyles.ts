import { makeStyles } from "@mui/styles";
import auth_bg from "~/common/assets/images/auth_bg.png";

export default makeStyles({
  wrapper: {
    height: "100vh",
  },
  leftSide: {
    backgroundImage: `url(${auth_bg})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "left",
    filter: "brightness(0.1)",
  },
});
