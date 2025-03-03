import { z } from "zod"

const ACCEPTED_IMAGE_TYPES: string[] = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp',]
const MAX_FILE_SIZE: number = 5000000

const ImageSchema = z.object({
    image: z.instanceof(FileList).refine(file=>file?.length > 0 ? ACCEPTED_IMAGE_TYPES.includes(file[0].type) : true, {message: 'type of image is invalid'})
    .refine(file=>file?.length ? file[0].size <= MAX_FILE_SIZE : true, {message: 'file size is too large (max: 5MB)'}).optional()
})


export { ImageSchema }