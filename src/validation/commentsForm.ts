import { z } from "zod";

const CommentsFormSchame = z.object({
    body: z.string().trim().min(1)
})

export { CommentsFormSchame }