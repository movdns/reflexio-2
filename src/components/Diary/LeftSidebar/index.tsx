import React from "react";
import SkeletonCard from "../Skeleton/Card";
import { CardMedia } from "@mui/material";
import post from "../../../common/assets/img/post.png";
import palette from "../../../common/palette";

const LeftSidebar = () => {
  return (
    <CardMedia
      component="img"
      height="auto"
      image="https://images.unsplash.com/photo-1533984649377-c20fc524425b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=900&q=60"
      alt="green iguana"
      sx={{ borderRadius: 3 }}
    />
  );
  // return <SkeletonCard height={360} />;
};

export default LeftSidebar;
