// Returns icon category object
function getGroupByIconCode(icon: any, data: any) {
  return (
    data &&
    data.find((group: any) =>
      group.icons.find((i: any) => i.code === icon?.code)
    )
  );
}

export default getGroupByIconCode;
