import { z } from "zod";
import {
  changepassword,
  forgetpassword,
  loginUser,
  verifyotp,
} from "../../Authentication/authApi";
import { registerUser } from "../../Authentication/authApi";

const loginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 8 characters" }),
});

export const loginService = async (FormData: any) => {
  const parsed = loginSchema.safeParse(FormData);
  if (!parsed.success) {
    throw new Error(
      "Validation Failed: " + JSON.stringify(parsed.error.errors)
    );
  }
  try {
    const response = await loginUser(parsed.data);
    return response.data;
  } catch (error) {
    console.error("Login Service Error:", error);
    throw error;
  }
};

const signupSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: "Name should have atleast one character long" }),
    email: z.string().email(),
    password: z
      .string()
      .min(8, { message: "password must be atleast 8 characters" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Confirm Password must be atleast 8 character long" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const registerService = async (FormData: any) => {
  const parsed = signupSchema.safeParse(FormData);
  if (!parsed.success) {
    throw new Error("Validation Failed:" + JSON.stringify(parsed.error.errors));
  }
  try {
    const response = await registerUser(parsed.data);
    return response.data;
  } catch (error) {
    console.error("Register Service Error", error);
    throw error;
  }
};

const forgotPasswordschema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});

export const forgotPasswordService = async (FormData: any) => {
  const parsed = forgotPasswordschema.safeParse(FormData);
  if (!parsed.success) {
    throw new Error("Validation failed:" + JSON.stringify(parsed.error.errors));
  }
  try {
    const response = await forgetpassword(parsed.data);
    return response.data;
  } catch (error) {
    console.error("Forget Password Service Error:", error.message);
    throw error;
  }
};

const verifyOtpSchema = z.object({
  // email: z.string().email({ message: "Please enter a valid email address." }),
  otp: z
    .string()
    .length(6, { message: "OTP must be exactly 6 digits" })
    .regex(/^\d+$/, { message: "OTP must contain only numeric digits." }),
});

export const verifyOtpService = async (FormData: any) => {
  const parsed = verifyOtpSchema.safeParse(FormData);
  if (!parsed.success) {
    throw new Error("Validation Failed:" + JSON.stringify(parsed.error.errors));
  }
  try {
    const response = await verifyotp(parsed.data);
    return response.data;
  } catch (error) {
    console.log("Verify OTP Service Error", error.message);
    throw error;
  }
};

const changePasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, { message: "New password must be at least 8 characters long." }),
    confirmNewPassword: z
      .string()
      .min(8, {
        message: "Confirm password must be at least 8 characters long.",
      }),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "New passwords do not match.",
    path: ["confirmNewPassword"],
  });

export const changePasswordService = async (FormData: any) => {
  const parsed = changePasswordSchema.safeParse(FormData);
  if (!parsed.success) {
    throw new Error("Validation Failed:" + JSON.stringify(parsed.error.errors));
  }
  try {
    const response = await changepassword(parsed.data);
    return response.data;
  } catch (error) {
    console.error("Change Password");
    throw error;
  }
};
