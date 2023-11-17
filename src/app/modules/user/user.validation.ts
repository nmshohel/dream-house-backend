import { z } from 'zod';

const create = z.object({
  body: z.object({
    role: z.string({
        required_error:"role Name is required"
    }),
    password: z.string({
        required_error:"password is required"
    }),
    name: z.string({
        required_error:"name is required"
    }),
    userName: z.string({
        required_error:"user Name is required"
    }),


  }),
});


export const UserValidation = {
    create,
};

