import { z } from "zod";
import { BaseRegisterFormSchema } from "./authForm";
import { ImageSchema } from "./field";


const EditUserFormSchema = BaseRegisterFormSchema.merge(ImageSchema).extend({
                                isUpdatePassword: z.boolean()
                            }).omit({email: true}).refine((fields)=>{
                                if(fields.isUpdatePassword) return fields.password === fields.repeatPassword
                                return true
                            }, {
                                message: 'passwords do not match',
                                path: ['repeatPassword']
                            })

export { EditUserFormSchema }

