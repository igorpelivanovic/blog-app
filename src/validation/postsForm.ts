import { z } from "zod";
import { ImageSchema } from "./field";

const MenagePostFormSchema = ImageSchema.extend({
    title: z.string().trim().min(4),
    body: z.string().trim().min(10),
    tags: z.array(z.string()).refine(arr=>arr.length > 0)
})

export { MenagePostFormSchema }