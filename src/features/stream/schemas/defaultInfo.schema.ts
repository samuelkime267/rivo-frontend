import { z } from "zod";

export const DefaultStreamInfoSchema = z.object({
  name: z
    .string("Stream name is required")
    .min(3, "Stream name must be at lease 3 characters long"),
  description: z
    .string()
    .min(3, "Stream description must be at least 3 characters long")
    .nullable()
    .default(null),
  tags: z.array(z.string()).optional(),
  category: z
    .string()
    .min(3, "Stream category must be at least 3 characters long")
    .optional(),
});

export type DefaultStreamInfoSchemaType = z.infer<
  typeof DefaultStreamInfoSchema
>;
