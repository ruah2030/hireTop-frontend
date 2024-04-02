export const getUserMeta = (data, key) => {
  return data?.find((el) => el.meta_key === key)?.meta_value || null;
};

export const truncateWithEllipsis = (str, maxLength = 100) => {
  if (str.length <= maxLength) {
    return str;
  } else {
    return str.substring(0, maxLength) + "...";
  }
};

export const capitalizeFirstLetter = ([first, ...rest]) => {
  return first.toUpperCase() + rest.join("");
};
