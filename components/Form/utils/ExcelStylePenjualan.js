const borderStyle = {
  leftBorderStyle: "thin",
  leftBorderColor: "#000000",
  rightBorderStyle: "thin",
  rightBorderColor: "#000000",
  topBorderStyle: "thin",
  topBorderColor: "#000000",
  bottomBorderStyle: "thin",
  bottomBorderColor: "#000000",
};

const headerStyles = {
  fontWeight: "bold",
  fontSize: 11,
  backgroundColor: "#036B82",
  color: "#fffff",
  align: "center",
  alignVertical: "center",
  ...borderStyle,
};

const detailStyles = {
  fontWeight: "bold",
  fontSize: 11,
  backgroundColor: "#F4B042",
  color: "#000000",
  align: "center",
  alignVertical: "center",
  ...borderStyle,
};

export const createHeader = (value) => {
  return {
    value,
    ...headerStyles,
  };
};

export const createDetailHeader = (value) => {
  return {
    value,
    ...detailStyles,
  };
};
