import { TTUserSettingsPaletteData } from "root/types/userSettings";
import { IconButton, SxProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { FC, ReactNode } from "react";
import { alpha, darken } from "@mui/material";
import Glyph from "../index";

export type GlyphButtonProps = {
  children?: ReactNode;
  sx?: SxProps;

  code?: string;
  size?: number;
  color?: string;
  colors?: TTUserSettingsPaletteData;
  rounded?: boolean;
  crossOut?: boolean;
  fullWidth?: boolean;
  lifted?: boolean;

  iconType?: "duotone" | "solid" | "thin" | "light" | "regular" | undefined;
  variant?: "transparent" | "filled" | "outlined" | "default";
  selectedVariant?: "transparent" | "filled" | "outlined" | "default";

  disabled?: boolean;
  selected?: boolean;

  p?: number | string;
  m?: number | string;

  onClick?: () => void;
};

const GlyphButton: FC<GlyphButtonProps> = ({
  children,
  code,
  size,
  color,
  variant,
  fullWidth,
  selectedVariant,
  iconType,
  ...props
}) => {
  return (
    <GlyphIconButton
      variant={variant || "default"}
      selectedVariant={selectedVariant || "filled"}
      colour={color}
      {...props}
    >
      {children ? (
        <>{children}</>
      ) : (
        <Glyph
          code={code || "ghost"}
          size={size || 32}
          // color={color || "inherit"}
          iconType={iconType || "duotone"}
          fullWidth={fullWidth || true}
        />
      )}
    </GlyphIconButton>
  );
};

const GlyphIconButton = styled(IconButton, {
  shouldForwardProp: (prop) =>
    prop !== "crossOut" &&
    prop !== "colour" &&
    prop !== "colors" &&
    prop !== "rounded" &&
    prop !== "lifted" &&
    prop !== "variant" &&
    prop !== "selectedVariant" &&
    prop !== "selected" &&
    prop !== "p" &&
    prop !== "m",
})<GlyphButtonProps & { colour: string | undefined }>(
  ({
    crossOut,
    colour,
    colors,
    rounded,
    lifted,
    variant,
    selectedVariant,
    selected,
    disabled,

    p,
    m,
  }) => {
    const { main, contrastText } = colors || {};

    const primaryColor = colour || main || "#ddd";
    const secondaryColor = colour ? `${colour}10` : `${primaryColor}10`;

    const contrastColor = contrastText || "white";

    const getBackground = () => {
      if (
        variant === "default" ||
        (selected && selectedVariant === "default")
      ) {
        return secondaryColor;
      }
      if (variant === "filled" || (selected && selectedVariant === "filled")) {
        return primaryColor;
      }
      if (variant === "transparent") {
      }
      if (variant === "outlined") {
        //return primaryColor;
      }
    };

    const getHoverBackground = () => {
      if (variant === "default") {
        return `${colors?.main || colour}50`;
      }
      if (variant === "filled" || (selected && selectedVariant === "filled")) {
        // return `${primaryColor}80`;
        return alpha(primaryColor, 0.7);
      }
      if (variant === "transparent") {
      }
      if (
        variant === "outlined" ||
        (selected && selectedVariant === "outlined")
      ) {
        return `${primaryColor}60`;
      }
    };

    const getColor = () => {
      if (variant === "default") {
        return primaryColor;
      }
      if (variant === "filled" || (selected && selectedVariant === "filled")) {
        return contrastColor;
      }
      if (variant === "transparent") {
        return primaryColor;
      }
      if (variant === "outlined") {
        if (selected) {
          return contrastColor;
        }
        return primaryColor;
      }
    };

    // const getOutline = () => {
    //   if (variant === "default") {
    //   }
    //   if (variant === "filled") {
    //   }
    //   if (variant === "transparent") {
    //   }
    //   if (variant === "outlined") {
    //     return "1px solid";
    //   }
    //
    //   if (selected && selectedVariant === "outlined") {
    //     return "1px solid";
    //   }
    // };

    return {
      display: "flex",
      alignItems: "center",
      borderRadius: rounded ? 10 : "50%",
      color: getColor(),
      background: getBackground(),
      opacity: disabled && !selected ? 0.3 : 1,
      padding: p || 2,
      margin: m || 0,
      // border: getOutline(),
      boxShadow: lifted
        ? `0 3px 0px 0px ${darken(
            primaryColor,
            0.2
          )}, 0px 0px 10px 0px rgba(120, 120, 120, 0.4)`
        : variant === "outlined" || (selected && selectedVariant === "outlined")
        ? "0 0 0 1px"
        : "none",
      "&:disabled": {
        color: colors ? colors?.main : "white",
        background: "inherit",
      },
      "& .MuiTouchRipple-root .MuiTouchRipple-child": {
        borderRadius: rounded && 10,
      },
      "&:hover": {
        background: getHoverBackground(),
      },
      "&:after": crossOut && {
        position: "absolute",
        content: "''",
        top: "50%",
        right: 0,
        width: "100%",
        borderTop: "1px solid",
        transform: "rotate(45deg)",
      },
      "&:active": {
        top: lifted ? 2 : 0,
        boxShadow: lifted
          ? `0 2px 0px 0px ${darken(primaryColor, 0.2)}`
          : "none",
      },

      aspectRatio: "1 / 1",
      // transition: "all 0.16s",
    };
  }
);

export const GlyphButtonSkeleton = () => (
  <GlyphIconButton
    rounded
    variant="outlined"
    p={7}
    colour="#bbb"
    sx={{
      // @TODO refactor
      "@keyframes pulse": {
        "0%": {
          opacity: 0.8,
        },
        "50%": {
          opacity: 0.2,
        },
        "100%": {
          opacity: 0.8,
        },
      },
      "@keyframes pulseOpacity": {
        "0%": {
          transform: "translateX(-75)",
        },
        "50%": {
          transform: "translateX(50%)",
        },
        "100%": {
          transform: "translateX(175%)",
        },
      },
      animationName: "pulse",
      animationTimingFunction: "ease-in-out",
      animationDuration: "1.25s",
      animationIterationCount: "infinite",
    }}
  >
    <Glyph code="ghost" iconType="thin" fullWidth />
  </GlyphIconButton>
);

export default GlyphButton;
