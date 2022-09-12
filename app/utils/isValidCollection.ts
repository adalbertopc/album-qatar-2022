import { plainData } from "./plainData";

export const isValidCollection = (slug: string) => {
  return plainData.includes(slug);
};
