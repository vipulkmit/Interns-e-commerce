import { z } from "zod";
import {
  changepassword,
  forgetpassword,
  loginUser,
  userUpdate,
  verifyotp,
} from "../../authentication/AuthApi";
import { registerUser } from "../../authentication/AuthApi";
import axiosInstance from "./axiosInstance";
import ENDPOINTS from "../../utils/endpoints";
import useAuthStore from "../../stores/useAuthStore";

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
    // console.log(response, "fdgvfdvfdv");
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
  // const parsed = verifyOtpSchema.safeParse(FormData);
  // if (!parsed.success) {
  //   throw new Error("Validation Failed:" + JSON.stringify(parsed.error.errors));
  // }
  try {
    const response = await verifyotp(FormData);
    return response.data;
  } catch (error) {
    console.log("Verify OTP Service Error", error.message);
    throw error;
  }
};

// const changePasswordSchema = z
//   .object({
//     newPassword: z
//       .string()
//       .min(8, { message: "New password must be at least 8 characters long." }),
//     confirmNewPassword: z.string().min(8, {
//       message: "Confirm password must be at least 8 characters long.",
//     }),
//   })
//   .refine((data) => data.newPassword === data.confirmNewPassword, {
//     message: "New passwords do not match.",
//     path: ["confirmNewPassword"],
//   });

// export const changePasswordService = async (FormData: any) => {
//   // const parsed = changePasswordSchema.safeParse(FormData);
//   // if (!parsed.success) {
//   //   throw new Error("Validation Failed:" + JSON.stringify(parsed.error.errors));
//   // }
//   try {
//     const response = await changepassword(FormData);
//     return response.data;
//   } catch (error) {
//     console.error("Change Password");
//     throw error;
//   }
// };

// import axiosInstance from '../utils/axiosInstance'; // or wherever it's defined
// import { ENDPOINTS } from '../utils/constants'; // Make sure this includes CHANGE_PASSWORD

export const changePasswordService = (FormData: any) => {
  return axiosInstance.post(ENDPOINTS.CHANGE_PASSWORD, FormData);
};

export const updateUserdata = async (FormData: any, userId: any) => {
  try {
    const response = await userUpdate(userId, FormData);
    const updatedUser = response.data;
    useAuthStore.getState().setUser(updatedUser);
    return updatedUser;
  } catch (error) {
    console.error("Update User Data Error:", error);
    throw error;
  }
};

export const promocode = () => axiosInstance.get(ENDPOINTS.PROMOCODE);
export const Categories = () => axiosInstance.get(ENDPOINTS.CATEGORY);
export const Collection = () => axiosInstance.get(ENDPOINTS.COLLECTION);

export const SubCategories = (name) => {
  return axiosInstance.get(`${ENDPOINTS.SUBCATEGORY}${name}`);
};

export const Products = (name, category) => {
  return axiosInstance.get(`${ENDPOINTS.PRODUCTS}${name}/${category}`);
};

export const CarousalData = () => axiosInstance.get(ENDPOINTS.CAROUSAL);

export const AddToWishlist = (id: string) => {
  // console.log(id,"dfhuifgkerghr")
  return axiosInstance.post(ENDPOINTS.WISHLISTPOST, { productId: id });
};

export const WishlistData = () => {
  return axiosInstance.get(ENDPOINTS.WISHLISTGET);
};

export const WishlistDelete = (productId: string) => {
  return axiosInstance.delete(ENDPOINTS.WISHLIST, {
    data: {
      productId,
    },
  });
  // console.log(a,"aaaaaaaaaaaaaaaaaaaaa")
};

export const WishlistDeleteAll = () =>
  axiosInstance.delete(ENDPOINTS.WISHLISTDELETE);
