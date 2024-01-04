import z from "zod";
import { extractValidationData } from "./../../common/utils/extract-error-data.js";

const restaurantSchema = z.object({
  name: z.string(),
  address: z.string(),
  rating: z.number().min(1).max(5)
});

export function validateCreateRestaurant(data) {
  const result = restaurantSchema.safeParse(data);

  const {
    hasError,
    errorMessages,
    data: restaurantData,
  } = extractValidationData(result);

  return {
    hasError,
    errorMessages,
    restaurantData,
  };
}