import { brandRequest } from "../utils/request";

export const getAllBrands = async () => {
  const res = await brandRequest.get();
  return res.data;
};
