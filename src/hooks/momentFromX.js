import moment from "moment";

export const momentFromX = (date) => moment().from(date, true) + " ago";

export const shortMomentFromX = (date) => {
  const momentFromXS = moment().from(date, true);
  const onlyLatterMomentFromX = momentFromXS.split(" ").at(-1)[0];
  let shortMomentFromX;

  if (momentFromXS.split(" ")[0] != "a" && momentFromXS.split(" ")[0] != "an") {
    shortMomentFromX = momentFromXS.split(" ")[0] + onlyLatterMomentFromX;
  } else if (momentFromXS == "a few seconds") {
    shortMomentFromX = momentFromXS;
  } else if (
    momentFromXS.split(" ")[0] == "a" ||
    momentFromXS.split(" ")[0] == "an"
  ) {
    shortMomentFromX = 1 + onlyLatterMomentFromX;
  } else {
    shortMomentFromX = onlyLatterMomentFromX;
  }
  return shortMomentFromX;
};
