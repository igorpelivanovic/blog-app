import { z } from "zod";

const SearchFormSchema = z.object({
    search: z.string().trim().min(4)
})

export { SearchFormSchema }