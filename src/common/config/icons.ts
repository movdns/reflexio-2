// Will be used if no icon props provided
const iconsDefaultConfig = {
  type: "duotone",
  fontSize: 32,
  color: "inherit", // this rule overrides by GlyphIconButton "button" prop
  defaultColor: "red",
};

export const needsToBeResized = ["smoking"]; // this rule override "advancedData" "size" prop
export const resizeValue = 0;

export default iconsDefaultConfig;
