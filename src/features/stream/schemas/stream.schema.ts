import { ObjectIdSchema } from "@/schemas/objectId.schema";
import { z } from "zod";

export const StreamSchema = z.object({
  name: z.string().min(1),

  description: z.string().nullable().optional(),

  isLive: z.boolean().optional(),

  startedAt: z.coerce.date().nullable().optional(),
  endedAt: z.coerce.date().nullable().optional(),
  scheduledFor: z.coerce.date().nullable().optional(),

  vodUrl: z.url().optional(),
  streamUrl: z.url().optional(),

  category: z.string().optional(),
  tags: z.array(z.string()).optional(),

  user: ObjectIdSchema,

  viewers: z.number().optional(),
});

export type StreamSchemaType = z.infer<typeof StreamSchema>;
