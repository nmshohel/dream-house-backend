/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import { status } from './penanty.constrant';
import { IPenanty, PenantyModel } from './penanty.interface';


const PenantySchema = new Schema<IPenanty, PenantyModel>(
  {
    penantyDate: {
      type: Date,
      required: true,
    },
    userName:{
        type:String,
       
    },
    amount:{
        type:String,
    },
    status: {
      type: String,
      enum:status
    },

  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);
export const Penanty = model<IPenanty, PenantyModel>('Penanty', PenantySchema);
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
