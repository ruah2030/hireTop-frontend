export const getUserMeta = (data, key) => {
  return data?.find((el) => el.meta_key === key)?.meta_value || null;
};
