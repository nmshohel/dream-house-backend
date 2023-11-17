import { z } from 'zod';

const create = z.object({
  body: z.object({
    userName: z.string({
        required_error:"User Name is required"
    }),
    amount: z.string({
        required_error:"amount is required"
    }),


  }),
});


export const InstallmentValidation = {
    create,
};
