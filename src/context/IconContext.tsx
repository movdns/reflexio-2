import { createContext, useContext, FC, ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { getGlyphsGroupsAPICall } from "../api";
import { TGlyph, TGlyphGroup } from "../types";

type IconsContextProps = {
  glyphs: TGlyphGroup[] | null;
  getIconByScore?: (score: number, group: string) => TGlyph | null;
  getSelectedIconsByGroup?: (
    selected: string[],
    group: string
  ) => TGlyph[] | null;
};

type IconsProviderProps = {
  children?: ReactNode;
};

export const IconsProvider: FC<IconsProviderProps> = ({ children }) => {
  /**
   * Fetch all glyphs groups from endpoint
   */
  const { data: glyphsGroupsData } = useQuery(["glyphs"], async () => {
    const response = await getGlyphsGroupsAPICall();
    // @todo error handler
    response.error &&
      console.log("getGlyphsGroupsAPICall error: ", response.message);

    return response.data || null;
  });

  /**
   * Get Glyph object from Glyphs Groups Arr with matched 'score' property
   * @param {number} score
   * @param {string} group
   * @return TGlyph | null
   */
  function getIconByScore(score: number, group: string): TGlyph | null {
    if (glyphsGroupsData) {
      const iconGroup = glyphsGroupsData.find((g: any) => g.code === group);
      return iconGroup?.icons.find((i: any) => i?.score === score) || null;
    }
    return null;
  }

  function getSelectedIconsByGroup(
    selected: string[],
    group: string
  ): TGlyph[] | null {
    if (glyphsGroupsData) {
      const iconGroup = glyphsGroupsData.find((g: any) => g.code === group);
      return iconGroup?.icons.filter((i: any) => selected?.includes(i.code));
    }
    return null;
  }

  return (
    <IconsContext.Provider
      value={{
        glyphs: glyphsGroupsData,
        getIconByScore,
        getSelectedIconsByGroup,
      }}
    >
      {children}
    </IconsContext.Provider>
  );
};

const IconsContext = createContext<IconsContextProps>({
  glyphs: null,
});

export const useIconsContext = () => useContext(IconsContext);
