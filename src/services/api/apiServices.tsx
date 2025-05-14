import { z } from "zod";
import {
  forgetpassword,
  loginUser,
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
    console.log(response, "fdgvfdvfdv");
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

export const changePasswordService = (FormData: any) => {
  return axiosInstance.post(ENDPOINTS.CHANGE_PASSWORD, FormData);
};

export const updateUserdata = async (userId: any, FormData: any) => {
  try {
    // console.log("dsivdfgg", userId);
    // console.log("FormData being sent:", FormData);
    const response = await axiosInstance.patch(
      ENDPOINTS.UPDATE(userId),
      FormData
    );
    // console.log("fdknvrrg", response);
    const updatedUser = response.data;

    useAuthStore.getState().setUser(updatedUser);
    return updatedUser;
  } catch (error: any) {
    console.error(
      "Update User Data Error:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || "Failed to update user data"
    );
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
