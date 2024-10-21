import { z } from "zod";
import { ImageSchema } from "./field";

const MenagePostFormSchema = ImageSchema.extend({
    title: z.string().trim().min(5),
    body: z.string().trim().min(10),
    tags: z.array(z.object({
        tag: z.string()
    }))
})

export { MenagePostFormSchema }