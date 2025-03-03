import { z } from "zod";
import { BaseRegisterFormSchema } from "./authForm";
import { ImageSchema } from "./field";


const EditUserFormSchema = BaseRegisterFormSchema.merge(ImageSchema).extend({
                                isUpdatePassword: z.boolean(),
                                password: z.string().optional(),
                                repeatPassword: z.string().optional()
                            }).omit({email: true})
                            .refine((fields)=>{
                                if(fields.isUpdatePassword) return fields.password != undefined && fields.password?.trim().length > 0
                                return true
                            },{
                                message: 'password is required',
                                path: ["password"]
                            })
                            .refine((fields)=>{
                                if(fields.isUpdatePassword) return fields.password != undefined && fields.password?.trim().length > 7
                                return true
                            },{
                                message: 'password is too short min length 8 characters',
                                path: ["password"]
                            })
                            .refine((fields)=>{
                                if(fields.isUpdatePassword) return fields.password === fields.repeatPassword
                                return true
                            }, {
                                message: 'passwords do not match',
                                path: ['repeatPassword']
                            })

export { EditUserFormSchema }

