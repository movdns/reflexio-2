import React from "react";
import { Box, Container, Grid } from "@mui/material";
import SkeletonCard from "./Card";

const DiarySkeleton = () => {
  return (
    <Box component="main" py={4}>
      <Container maxWidth={false}>
        <Grid container spacing={{ xs: 2, lg: 4 }}>
          <Box component={Grid} item xs={12} sm={6} md={4} lg={3}>
            <SkeletonCard height={94} />
          </Box>
          <Box
            component={Grid}
            item
            display={{ xs: "none", sm: "block" }}
            sm={3}
            md={3}
            lg={2}
          >
            <SkeletonCard height={94} />
          </Box>
          <Box
            component={Grid}
            item
            display={{ xs: "none", sm: "block" }}
            sm={3}
            md={3}
            lg={2}
          >
            <SkeletonCard height={94} />
          </Box>
          <Box
            component={Grid}
            item
            display={{ xs: "none", lg: "block" }}
            lg={2}
          >
            <SkeletonCard height={94} />
          </Box>
          <Box
            component={Grid}
            item
            display={{ xs: "none", lg: "block" }}
            lg={2}
          >
            <SkeletonCard height={94} />
          </Box>
          <Box
            component={Grid}
            item
            display={{ xs: "none", md: "block" }}
            md={2}
            lg={1}
          >
            <SkeletonCard height={94} />
          </Box>
        </Grid>

        <Grid container spacing={4} pt={4}>
          <Box
            component={Grid}
            item
            lg={3}
            display={{ xs: "none", lg: "block" }}
          >
            <SkeletonCard height={360} />
          </Box>

          <Grid item xs={12} md={8} lg={6}>
            <Grid container gap={4} direction="column">
              <SkeletonCard height={64} />
              <SkeletonCard height="70vh" />
            </Grid>
          </Grid>

          <Grid item xs={12} md={4} lg={3}>
            <SkeletonCard height={180} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default DiarySkeleton;
