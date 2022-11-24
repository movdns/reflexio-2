import React, { FC } from "react";
import MomentItem from "~/components/TimelineView/MomentList/MomentItem";
import Timeline from "@mui/lab/Timeline";
import TimeLineItem from "~/components/shared/Timeline/TimelineItem";
import { Box, Typography, Divider, Card, Stack, Badge } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import MomentForm from "~/components/TimelineView/MomentList/MomentForm";
import Glyph from "~/components/shared/Glyph";
import { StickyContainer, Sticky } from "react-sticky";

type MomentGroupProps = {};

const MomentGroup: FC<MomentGroupProps> = () => {
  return (
    <Grid container spacing={3} direction="column">
      {/*<Grid container spacing={3}>*/}
      {/*  <Grid xs={12}>*/}
      {/*    <Divider sx={{ width: "100%" }} flexItem variant="fullWidth">*/}
      {/*      <Typography fontSize={35}>Today, 21 Nov</Typography>*/}
      {/*    </Divider>*/}
      {/*  </Grid>*/}
      {/*  <Grid xs={7} pt={0}>*/}
      {/*    <Timeline>*/}
      {/*      <TimeLineItem*/}
      {/*        title="26:00"*/}
      {/*        chainColor="#eee"*/}
      {/*        titleColor="#bbb"*/}
      {/*        actions={<Glyph code="plus" size={30} iconType="light" />}*/}
      {/*      >*/}
      {/*        <Grid container spacing={3}>*/}
      {/*          <MomentItem*/}
      {/*            title="New Word"*/}
      {/*            color="black"*/}
      {/*            glyphCode="typewriter"*/}
      {/*            createdAt="12:34"*/}
      {/*            description="Convenience - зручність"*/}
      {/*          />*/}
      {/*          <MomentItem*/}
      {/*            title="So f*king work!"*/}
      {/*            color="turquoise"*/}
      {/*            glyphCode="face-melting"*/}
      {/*            createdAt="12:10"*/}
      {/*          />*/}
      {/*        </Grid>*/}
      {/*      </TimeLineItem>*/}
      {/*      <TimeLineItem*/}
      {/*        title="25:00"*/}
      {/*        chainColor="#eee"*/}
      {/*        titleColor="#bbb"*/}
      {/*        actions={<Glyph code="plus" size={30} iconType="light" />}*/}
      {/*      >*/}
      {/*        <Grid container spacing={3}>*/}
      {/*          <MomentItem*/}
      {/*            title="New Word"*/}
      {/*            color="black"*/}
      {/*            glyphCode="typewriter"*/}
      {/*            createdAt="12:34"*/}
      {/*            description="Convenience - зручність"*/}
      {/*          />*/}
      {/*          <MomentItem*/}
      {/*            title="So f*king work!"*/}
      {/*            color="turquoise"*/}
      {/*            glyphCode="face-melting"*/}
      {/*            createdAt="12:10"*/}
      {/*          />*/}
      {/*        </Grid>*/}
      {/*      </TimeLineItem>*/}
      {/*    </Timeline>*/}
      {/*  </Grid>*/}
      {/*  <Grid xs={5} pt={0}>*/}
      {/*    <StickyContainer style={{ height: "100%" }}>*/}
      {/*      <Sticky style={{ height: "100%" }} disableCompensation>*/}
      {/*        {({ style }) => (*/}
      {/*          <Box style={style}>*/}
      {/*            <Box py={3}>*/}
      {/*              <Card>*/}
      {/*                <Box>*/}
      {/*                  <Box*/}
      {/*                    sx={{*/}
      {/*                      position: "relative",*/}
      {/*                      background: "#F08699",*/}
      {/*                      width: "100%",*/}
      {/*                      height: 184,*/}
      {/*                      borderRadius: 3,*/}
      {/*                    }}*/}
      {/*                  >*/}
      {/*                    <Box*/}
      {/*                      position="absolute"*/}
      {/*                      left={16}*/}
      {/*                      bottom={16}*/}
      {/*                      width={80}*/}
      {/*                      height={80}*/}
      {/*                      bgcolor="white"*/}
      {/*                      borderRadius={3}*/}
      {/*                      display="flex"*/}
      {/*                      alignItems="center"*/}
      {/*                      justifyContent="center"*/}
      {/*                    >*/}
      {/*                      <Glyph*/}
      {/*                        code="face-hand-peeking"*/}
      {/*                        color="#F08699"*/}
      {/*                        size={60}*/}
      {/*                        iconType="solid"*/}
      {/*                      />*/}
      {/*                    </Box>*/}

      {/*                    <Box*/}
      {/*                      position="absolute"*/}
      {/*                      left={0}*/}
      {/*                      top={24}*/}
      {/*                      px={2.5}*/}
      {/*                      height={40}*/}
      {/*                      bgcolor="white"*/}
      {/*                      borderRadius="0 8px 8px 0"*/}
      {/*                      display="flex"*/}
      {/*                      alignItems="center"*/}
      {/*                      justifyContent="center"*/}
      {/*                    >*/}
      {/*                      <Typography fontSize={18} fontWeight={100}>*/}
      {/*                        Day #17*/}
      {/*                      </Typography>*/}
      {/*                    </Box>*/}

      {/*                    <Box*/}
      {/*                      position="absolute"*/}
      {/*                      right={24}*/}
      {/*                      top={0}*/}
      {/*                      px={1}*/}
      {/*                      py={1}*/}
      {/*                      bgcolor="white"*/}
      {/*                      borderRadius="0 0 8px 8px"*/}
      {/*                      display="flex"*/}
      {/*                      alignItems="center"*/}
      {/*                      justifyContent="center"*/}
      {/*                    >*/}
      {/*                      <Glyph*/}
      {/*                        code="gear"*/}
      {/*                        color="#F08699"*/}
      {/*                        size={20}*/}
      {/*                        iconType="solid"*/}
      {/*                      />*/}
      {/*                    </Box>*/}
      {/*                  </Box>*/}
      {/*                  /!*<Box p={2}>Possible description</Box>*!/*/}
      {/*                  /!*<Divider />*!/*/}
      {/*                  <Stack p={2} direction="row" flexWrap="wrap" gap={1}>*/}
      {/*                    <Badge*/}
      {/*                      anchorOrigin={{*/}
      {/*                        vertical: "top",*/}
      {/*                        horizontal: "right",*/}
      {/*                      }}*/}
      {/*                      badgeContent={2}*/}
      {/*                      color="success"*/}
      {/*                    >*/}
      {/*                      <Box*/}
      {/*                        display="inline-flex"*/}
      {/*                        py={1}*/}
      {/*                        px={2}*/}
      {/*                        bgcolor="black"*/}
      {/*                        color="white"*/}
      {/*                        borderRadius={2}*/}
      {/*                      >*/}
      {/*                        <Glyph code="typewriter" size={22} />*/}
      {/*                        <Typography pl={1}>New word</Typography>*/}
      {/*                      </Box>*/}
      {/*                    </Badge>*/}
      {/*                    <Badge*/}
      {/*                      anchorOrigin={{*/}
      {/*                        vertical: "top",*/}
      {/*                        horizontal: "right",*/}
      {/*                      }}*/}
      {/*                      badgeContent={2}*/}
      {/*                      color="success"*/}
      {/*                    >*/}
      {/*                      <Box*/}
      {/*                        display="inline-flex"*/}
      {/*                        py={1}*/}
      {/*                        px={2}*/}
      {/*                        bgcolor="turquoise"*/}
      {/*                        color="white"*/}
      {/*                        borderRadius={2}*/}
      {/*                      >*/}
      {/*                        <Glyph*/}
      {/*                          code="face-melting"*/}
      {/*                          iconType="solid"*/}
      {/*                          size={22}*/}
      {/*                        />*/}
      {/*                        <Typography pl={1}>So f*king work!</Typography>*/}
      {/*                      </Box>*/}
      {/*                    </Badge>*/}
      {/*                  </Stack>*/}
      {/*                </Box>*/}
      {/*              </Card>*/}
      {/*            </Box>*/}
      {/*          </Box>*/}
      {/*        )}*/}
      {/*      </Sticky>*/}
      {/*    </StickyContainer>*/}
      {/*  </Grid>*/}
      {/*</Grid>*/}
      {/*<Grid container spacing={3}>*/}
      {/*  <Grid xs={12}>*/}
      {/*    <Divider sx={{ width: "100%", pl: 5 }} flexItem variant="fullWidth">*/}
      {/*      <Typography fontSize={35}>17 Nov</Typography>*/}
      {/*    </Divider>*/}
      {/*  </Grid>*/}
      {/*  <Grid xs={7}>*/}
      {/*    <Timeline sx={{ mt: 0 }}>*/}
      {/*      <TimeLineItem*/}
      {/*        chainColor="#eee"*/}
      {/*        titleColor="#bbb"*/}
      {/*        title="17:00"*/}
      {/*        actions={<Glyph code="plus" size={30} iconType="light" />}*/}
      {/*      >*/}
      {/*        <Grid container spacing={3}>*/}
      {/*          <MomentItem*/}
      {/*            title="Vitamins"*/}
      {/*            glyphCode="pills"*/}
      {/*            createdAt="22:54"*/}
      {/*            color="darkseagreen"*/}
      {/*            description="Magnesium, Calcium, Multivitamin"*/}
      {/*          />*/}
      {/*          <MomentItem*/}
      {/*            title="Coffee"*/}
      {/*            glyphCode="cup-togo"*/}
      {/*            createdAt="22:54"*/}
      {/*            color="burlywood"*/}
      {/*            description="Lol kek pidarok!"*/}
      {/*          />*/}
      {/*        </Grid>*/}
      {/*      </TimeLineItem>*/}

      {/*      <TimeLineItem*/}
      {/*        chainColor="#eee"*/}
      {/*        titleColor="#bbb"*/}
      {/*        title="15:00"*/}
      {/*        actions={<Glyph code="plus" size={30} iconType="light" />}*/}
      {/*      >*/}
      {/*        <Grid container spacing={3}>*/}
      {/*          <MomentItem*/}
      {/*            title="Shopping"*/}
      {/*            glyphCode="cart-shopping-fast"*/}
      {/*            createdAt="15:23"*/}
      {/*            color="cadetblue"*/}
      {/*            description="Water, food"*/}
      {/*          />*/}
      {/*        </Grid>*/}
      {/*      </TimeLineItem>*/}

      {/*      <TimeLineItem*/}
      {/*        chainColor="#eee"*/}
      {/*        titleColor="#bbb"*/}
      {/*        title="12:00"*/}
      {/*        actions={<Glyph code="plus" size={30} iconType="light" />}*/}
      {/*      >*/}
      {/*        <Grid container spacing={3}>*/}
      {/*          <MomentItem*/}
      {/*            title="Wake up"*/}
      {/*            glyphCode="alarm-clock"*/}
      {/*            createdAt="12:34"*/}
      {/*            //description="8 hours of sleep"*/}
      {/*          />*/}
      {/*        </Grid>*/}
      {/*      </TimeLineItem>*/}
      {/*    </Timeline>*/}
      {/*  </Grid>*/}
      {/*  <Grid xs={5}>*/}
      {/*    <StickyContainer style={{ height: "100%" }}>*/}
      {/*      <Sticky style={{ height: "100%" }} disableCompensation>*/}
      {/*        {({ style }) => (*/}
      {/*          <Box style={style}>*/}
      {/*            <Box pt={3} pb={4}>*/}
      {/*              <Card>*/}
      {/*                <Box p={3}>Pidoraska</Box>*/}
      {/*              </Card>*/}
      {/*            </Box>*/}
      {/*          </Box>*/}
      {/*        )}*/}
      {/*      </Sticky>*/}
      {/*    </StickyContainer>*/}
      {/*  </Grid>*/}
      {/*</Grid>*/}
    </Grid>
  );
};

export default MomentGroup;
