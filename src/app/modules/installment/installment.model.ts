/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import { IInstallment, InstallmentModel } from './installment.interface';

const InstallmentSchema = new Schema<IInstallment, InstallmentModel>(
  {
    email: {
      type: String,
      required: true,
    },
    month:{
        type:String,
        required:true,
    },
    year:{
        type:String,
        required:true
    },
    amount: {
      type: String,
      required: true,
    },

  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);
export const Installment = model<IInstallment, InstallmentModel>('Installment', InstallmentSchema);
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
