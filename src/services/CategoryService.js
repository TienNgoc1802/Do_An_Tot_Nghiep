import { categroyRequest } from "../utils/request";

export const getAllCategory = async () => {
    const res = await categroyRequest.get();
    return res.data;
}