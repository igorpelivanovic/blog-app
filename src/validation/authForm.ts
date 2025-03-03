import { z } from "zod";


const BaseAuthFormSchema = z.object({
    username: z.string().trim().min(4),
    password: z.string().trim().min(8)
});

const LoginFormSchema = z.object({
    username: z.string().trim().min(1, 'username is required'),
    password: z.string().trim().min(1, 'username is required')
});

const BaseRegisterFormSchema = BaseAuthFormSchema.extend({
    email: z.string().email('email is invalid'),
    repeatPassword: z.string(),
})

const RegisterFormSchema = BaseRegisterFormSchema.refine((fields)=>fields.password === fields.repeatPassword, {message: 'passwords do not match', path: ['repeatPassword']})

export { LoginFormSchema, RegisterFormSchema, BaseRegisterFormSchema }