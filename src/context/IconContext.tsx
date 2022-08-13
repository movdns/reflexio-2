import { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { getIconsAPICall } from "../api";
import getIconByScore from "../components/Diary/Glyphs/helpers/getIconByDayScore";

type IconsContextProps = {
  loadingIcons: boolean;
  glyphs: [] | null;
  getSelectedIconsByGroup?: (selected: string[], group: string) => any;
  getIconByScore?: (score: number) => any;
};

const IconsContext = createContext<IconsContextProps>({
  loadingIcons: true,
  glyphs: null,
});

export const IconsProvider = ({ children }: any) => {
  const { isLoading: loadingIcons, data: glyphsData } = useQuery(
    ["icons"],
    async () => {
      const data = await getIconsAPICall();
      return !data.error ? data.data : data.message;
    }
  );

  function getIconByScore(score: number) {
    if (glyphsData) {
      const aaa = glyphsData.find((group: any) =>
        group.icons.find((i: any) => i?.score === score)
      );
      return aaa?.icons.find((i: any) => i?.score === score);
    }
  }

  function getSelectedIconsByGroup(selected: string[], group: string) {
    if (glyphsData) {
      const iconGroup = glyphsData.find((g: any) => g.code === group);
      return iconGroup?.icons.filter((i: any) => selected?.includes(i.code));
    }
  }

  // function getSelectrdIconsByGroup(group: string, selected: []) {
  //   if (glyphsData) {
  //     const aaa = glyphsData && glyphsData.find((g: any) => group === g);
  //     return aaa?.icons.find((i: any) => i?.score === score);
  //   }
  // }

  // const getMoodIconInDayIcons = (icons: any) => {
  //   const group =
  //     iconsData && iconsData.find((group: any) => group.code === "mood");
  //   return group.icons.find((i: any) =>
  //     icons.find((iDay: any) => i.code === iDay)
  //   );
  // };

  return (
    <IconsContext.Provider
      value={{
        loadingIcons: loadingIcons,
        glyphs: glyphsData,
        getIconByScore,
        getSelectedIconsByGroup,
      }}
    >
      {children}
    </IconsContext.Provider>
  );
};

export const useIconsContext = () => useContext(IconsContext);
