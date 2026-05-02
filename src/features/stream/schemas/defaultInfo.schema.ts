import { ApiErrorSchema } from "@/schemas/error.schema";
import { createSuccessSchema } from "@/utils";
import { z } from "zod";

export const DefaultStreamInfoSchema = z.object({
  name: z
    .string("Stream name is required")
    .min(3, "Stream name must be at lease 3 characters long"),
  description: z.string().nullable().default(null),
  tags: z.array(z.string()).optional(),
  category: z.string().optional(),
});

export const DefaultStreamInfoSuccessSchema = createSuccessSchema(
  DefaultStreamInfoSchema,
);

export const DefaultStreamInfoResponseSchema = z.discriminatedUnion("success", [
  DefaultStreamInfoSuccessSchema,
  ApiErrorSchema,
]);

export type DefaultStreamInfoSchemaType = z.infer<
  typeof DefaultStreamInfoSchema
>;

export type DefaultStreamInfoResponseSchemaType = z.infer<
  typeof DefaultStreamInfoResponseSchema
>;
