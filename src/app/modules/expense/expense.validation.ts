import { z } from 'zod';
// expenseDate: Date;
// description: string;
// quantity?: string;
// unit?: string;
// unitPrice?: string;
// totalPrice: string;
// expenseBy:string
// status:string;
const create = z.object({
  body: z.object({
    expenseDate: z.string({
        required_error:"expenseDate Name is required"
    }),
    description: z.string({
        required_error:"description is required"
    }),
    totalPrice: z.string({
        required_error:"totalPrice is required"
    }),
    expenseBy: z.string({
        required_error:"expenseBy is required"
    }),
  }),
});


export const ExpenseValidation = {
    create,
};
