import { TWELVEDATA_API_KEY, TWELVEDATA_URL } from "../constants";

export const getStockDetails = async symbol => {
  try {
    const res = await fetch(
      `${TWELVEDATA_URL}/quote?symbol=${symbol}&apikey=${TWELVEDATA_API_KEY}`
    );
    const data = await res.json();
    console.log(data);
    return data;
  } catch {
    return {
      error: true
    };
  }
};
