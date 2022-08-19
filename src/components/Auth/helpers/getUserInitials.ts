const getUserInitials = (fullName?: string | null): string => {
  if (fullName) {
    return fullName
      .trim()
      .split(" ")
      .map((e) => e.charAt(0).toUpperCase())
      .join("");
  }

  return "^.^";
};

export default getUserInitials;
