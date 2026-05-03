import { z } from "zod";

export const StreamKeySchema = z.object({
  streamKey: z.string(),
});

export type StreamKeySchemaType = z.infer<typeof StreamKeySchema>;
