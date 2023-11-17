import { z } from 'zod';

const create = z.object({
  body: z.object({
    email: z.string({
        required_error:"email is required"
    }),
    amount: z.string({
        required_error:"amount is required"
    }),


  }),
});


export const InstallmentValidation = {
    create,
};
