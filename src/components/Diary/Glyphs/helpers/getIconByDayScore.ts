// Returns icon category object
function getIconByScore(score: number, iconsArr: any) {
  return (
    iconsArr &&
    iconsArr.find((group: any) =>
      group.icons.find((i: any) => i?.score === score)
    )
  );
}

export default getIconByScore;
