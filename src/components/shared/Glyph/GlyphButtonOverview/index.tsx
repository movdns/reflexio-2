import React, { FC } from "react";
import DiaryCard from "~/components/shared/Card";
import { Divider, Stack, Typography } from "@mui/material";
import GlyphButton from "~/components/shared/Glyph/GlyphButton";

type GlyphButtonOverviewProps = {};

const GlyphButtonOverview: FC<GlyphButtonOverviewProps> = () => {
  return (
    <DiaryCard sx={{ marginBottom: 4 }}>
      <Stack spacing={2}>
        <Divider orientation="horizontal" flexItem>
          <Typography variant="body2" color="#E0E0E0">
            Transparent variant
          </Typography>
        </Divider>
        <Stack
          spacing={2}
          direction="row"
          display="flex"
          justifyContent="space-between"
        >
          <GlyphButton
            color="#EF8799"
            iconType="duotone"
            variant="transparent"
          />
          <GlyphButton
            color="#E99180"
            iconType="duotone"
            selected
            selectedVariant="default"
            variant="transparent"
          />
          <GlyphButton color="#B5DAE9" iconType="solid" variant="transparent" />
          <GlyphButton
            color="#00C292"
            iconType="duotone"
            selected
            selectedVariant="filled"
            variant="transparent"
          />
          <GlyphButton
            color="#0DCAD6"
            iconType="duotone"
            variant="transparent"
          />
          <GlyphButton
            color="#00616b"
            iconType="solid"
            selected
            selectedVariant="outlined"
            variant="transparent"
          />
          <Divider flexItem orientation="vertical" />
          <GlyphButton
            rounded
            color="#EF8799"
            iconType="thin"
            variant="transparent"
          />
          <GlyphButton
            color="#E99180"
            rounded
            selected
            selectedVariant="default"
            variant="transparent"
            iconType="thin"
          />
          <GlyphButton
            color="#B5DAE9"
            rounded
            variant="transparent"
            iconType="thin"
          />
          <GlyphButton
            color="#00C292"
            rounded
            selected
            variant="transparent"
            selectedVariant="filled"
            iconType="thin"
          />
          <GlyphButton
            color="#0DCAD6"
            rounded
            variant="transparent"
            iconType="thin"
          />
          <GlyphButton
            rounded
            selected
            color="#00616b"
            variant="transparent"
            selectedVariant="default"
            iconType="thin"
          />
        </Stack>

        <Divider orientation="horizontal" flexItem>
          <Typography variant="body2" color="#E0E0E0">
            Default variant
          </Typography>
        </Divider>
        <Stack
          spacing={2}
          direction="row"
          display="flex"
          justifyContent="space-between"
        >
          <GlyphButton
            color="#EF8799"
            iconType="thin"
            selected
            selectedVariant="outlined"
          />
          <GlyphButton color="#E99180" iconType="thin" />
          <GlyphButton
            color="#B5DAE9"
            iconType="thin"
            selected
            selectedVariant="filled"
          />
          <GlyphButton color="#00C292" iconType="thin" />
          <GlyphButton color="#0DCAD6" iconType="thin" />
          <GlyphButton color="#00616b" iconType="thin" />
          <Divider flexItem orientation="vertical" />
          <GlyphButton color="#EF8799" rounded iconType="solid" />
          <GlyphButton color="#E99180" rounded iconType="solid" />
          <GlyphButton color="#B5DAE9" rounded iconType="solid" />
          <GlyphButton color="#00C292" rounded iconType="solid" />
          <GlyphButton color="#0DCAD6" rounded iconType="solid" />
          <GlyphButton color="#00616b" rounded iconType="solid" />
        </Stack>
        <Divider orientation="horizontal" flexItem>
          <Typography variant="body2" color="#E0E0E0">
            Filled variant
          </Typography>
        </Divider>
        <Stack
          spacing={2}
          direction="row"
          display="flex"
          justifyContent="space-between"
        >
          <GlyphButton color="#EF8799" variant="filled" iconType="duotone" />
          <GlyphButton
            color="#E99180"
            variant="filled"
            iconType="solid"
            selected
            selectedVariant="outlined"
          />
          <GlyphButton color="#B5DAE9" variant="filled" iconType="solid" />
          <GlyphButton
            color="#00C292"
            variant="filled"
            iconType="duotone"
            selected
            selectedVariant="transparent"
          />
          <GlyphButton color="#0DCAD6" variant="filled" iconType="duotone" />
          <GlyphButton
            color="#00616b"
            variant="filled"
            iconType="duotone"
            selected
            selectedVariant="default"
          />
          <Divider flexItem orientation="vertical" />
          <GlyphButton
            color="#EF8799"
            rounded
            variant="filled"
            iconType="thin"
          />
          <GlyphButton
            color="#E99180"
            rounded
            variant="filled"
            iconType="thin"
          />
          <GlyphButton
            color="#B5DAE9"
            rounded
            variant="filled"
            iconType="thin"
          />
          <GlyphButton
            color="#00C292"
            rounded
            variant="filled"
            iconType="thin"
          />
          <GlyphButton
            color="#0DCAD6"
            rounded
            variant="filled"
            iconType="thin"
          />
          <GlyphButton
            color="#00616b"
            rounded
            variant="filled"
            iconType="thin"
          />
        </Stack>
        <Divider orientation="horizontal" flexItem>
          <Typography variant="body2" color="#E0E0E0">
            Outlined variant
          </Typography>
        </Divider>
        <Stack
          spacing={2}
          direction="row"
          display="flex"
          justifyContent="space-between"
        >
          <GlyphButton color="#EF8799" variant="outlined" iconType="solid" />
          <GlyphButton
            color="#E99180"
            variant="outlined"
            iconType="solid"
            selected
            selectedVariant="default"
          />
          <GlyphButton color="#B5DAE9" variant="outlined" iconType="solid" />
          <GlyphButton
            color="#00C292"
            variant="outlined"
            iconType="solid"
            selected
          />
          <GlyphButton color="#0DCAD6" variant="outlined" iconType="solid" />
          <GlyphButton
            color="#00616b"
            variant="outlined"
            iconType="solid"
            selected
          />
          <Divider flexItem orientation="vertical" />
          <GlyphButton
            color="#EF8799"
            rounded
            variant="outlined"
            iconType="thin"
            selected
          />
          <GlyphButton
            color="#E99180"
            rounded
            variant="outlined"
            iconType="thin"
          />
          <GlyphButton
            color="#B5DAE9"
            rounded
            variant="outlined"
            iconType="thin"
            selected
          />
          <GlyphButton
            color="#00C292"
            rounded
            variant="outlined"
            iconType="thin"
          />
          <GlyphButton
            color="#0DCAD6"
            rounded
            variant="outlined"
            iconType="thin"
            selected
          />
          <GlyphButton
            color="#00616b"
            rounded
            variant="outlined"
            iconType="thin"
          />
        </Stack>
      </Stack>
    </DiaryCard>
  );
};

export default GlyphButtonOverview;
