/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import { ExpenseModel, IExpense } from './expense.interface';


// expenseDate: Date;
// description: string;
// quantity?: string;
// unit?: string;
// unitPrice?: string;
// totalPrice: string;
// expenseBy:string
// status:string;
const ExpenseSchema = new Schema<IExpense, ExpenseModel>(
  {
    expenseDate: {
      type: Date,
      required: true,
    },
    description:{
        type:String,
       required:true
    },
    quantity:{
        type:String,
    },
    unit: {
      type: String,
    },
    unitPrice:{
      type:String,
  },
  totalPrice:{
    type:String,
    required:true
},
expenseBy:{
    type:String,
    required:true
},
remarks:{
  type:String,
},
status:{
    type:String,
},

  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);
export const Expense = model<IExpense, ExpenseModel>('Expense', ExpenseSchema);
// UserSchema.statics.isUserExist = async function (
//   id: string
// ): Promise<IUser | null> {
//   return await User.findOne(
//     { id },
//     { id: 1, password: 1, role: 1, needsPasswordChange: 1 }
//   );
// };

// UserSchema.statics.isPasswordMatched = async function (
//   givenPassword: string,
//   savedPassword: string
// ): Promise<boolean> {
//   return await bcrypt.compare(givenPassword, savedPassword);
// };

// UserSchema.methods.changedPasswordAfterJwtIssued = function (
//   jwtTimestamp: number
// ) {
//   console.log({ jwtTimestamp }, 'hi');
// };

// User.create() / user.save()
// UserSchema.pre('save', async function (next) {
//   // hashing user password
//   const user = this;
//   user.password = await bcrypt.hash(
//     user.password,
//     Number(config.bycrypt_salt_rounds)
//   );

//   if (!user.needsPasswordChange) {
//     user.passwordChangedAt = new Date();
//   }

//   next();
// });



// UserSchema.methods.isUserExist = async function (
//   id: string
// ): Promise<Partial<IUser> | null> {
//   return await User.findOne(
//     { id },
//     { id: 1, password: 1, needsPasswordChange: 1 }
//   );
// };

// UserSchema.methods.isPasswordMatched = async function (
//   givenPassword: string,
//   savedPassword: string
// ): Promise<boolean> {
//   return await bcrypt.compare(givenPassword, savedPassword);
// };
