import { z } from 'zod';

const create = z.object({
  body: z.object({
    amount: z.string({
        required_error:"amount Name is required"
    }),
    month: z.string({
        required_error:"month is required"
    }),
    year: z.string({
        required_error:"year is required"
    }),


  }),
});


export const InterestValidation = {
    create,
};
