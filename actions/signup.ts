"use server";
import * as z from 'zod';
import bcrypt from 'bcrypt'

import { db } from '@/lib/db';
import { SignupSchema } from '@/schemas';
import { getUserByEmail } from '@/data/user';


export const signup = async (values : z.infer<typeof SignupSchema>) => {
  const validatedFields = SignupSchema.safeParse(values);

  if(!validatedFields.success){
    return { error: "Invalid Fields!"};
  }

  const { email, password, name } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  //check existing user here
  const existingUser = await getUserByEmail(email);

  if(existingUser){
    return { error : "Email Already In Use"};
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  //Send Verification Token Email
  return { success : "User Created!"}
}