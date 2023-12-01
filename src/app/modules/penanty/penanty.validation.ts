import { z } from 'zod';

const create = z.object({
  body: z.object({
    penantyDate: z.string({
        required_error:"penanty Date Name is required"
    }),
    userName: z.string({
        required_error:"user Name is required"
    }),
    amount: z.string({
        required_error:"amount is required"
    }),
  }),
});


export const PenantyValidation = {
    create,
};
