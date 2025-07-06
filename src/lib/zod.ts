
import { object, string } from "zod";
import * as z from "zod/v4";

export const USERNAME_MINIMUM_LENGTH = 3;
export const PASSWORD_MINIMUM_LENGTH = 5;
export const PASSWORD_MAXIMUM_LENGTH = 32;

/**
 * Zod schema for validating user sign-in form data.
 * 
 * Fields:
 * - `email`: Required string, must be a valid email format.
 * - `password`: Required string, minimum 8 characters, maximum 32 characters.
 *
 * Error messages are provided for each validation rule.
 */
export const emailSignInSchema = object({
   email: string({ required_error: "Email is required" })
      .min(1, "Email is required")
      .email("Invalid email"),
   password: string({ required_error: "Password is required" })
      .min(1, "Password is required")
      .min(PASSWORD_MINIMUM_LENGTH, `Password must be more than ${PASSWORD_MINIMUM_LENGTH} characters`)
      .max(PASSWORD_MAXIMUM_LENGTH, `Password must be less than ${PASSWORD_MAXIMUM_LENGTH} characters`),
});

/**
 * Zod schema for validating user sign-in form data using either email or username.
 * 
 * Fields:
 * - `identifier`: Required string, must be a valid email or username format.
 * - `password`: Required string, minimum 5 characters, maximum 32 characters.
 *
 * Additional validation:
 * - Ensures that the `identifier` is either a valid email or a valid username.
 *
 * Error messages are provided for each validation rule.
 */
export const emailOrUsernameSignInSchema = object({
   identifier: string({ required_error: "Email or username is required" })
      .min(1, "Email or username is required")
      .refine((val) => {
         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
         const usernameRegex = new RegExp(`^[a-zA-Z0-9_.]{${USERNAME_MINIMUM_LENGTH},}$`);

         return emailRegex.test(val) || usernameRegex.test(val);
      }, {
         message: "Must be a valid email or username",
      }),

   password: string({ required_error: "Password is required" })
      .min(1, "Password is required")
      .min(PASSWORD_MINIMUM_LENGTH, `Password must be at least ${PASSWORD_MINIMUM_LENGTH} characters`)
      .max(PASSWORD_MAXIMUM_LENGTH, `Password must be less than ${PASSWORD_MAXIMUM_LENGTH} characters`),
})


//TODO: add placeholder values directly in the schema
/**
 * Zod schema for validating user sign-up form data.
 * You can include additional fields like username, phone number, etc. as needed.
 * 
 * Fields:
 * - `name`: Required string, minimum 1 character, maximum 50 characters.
 * - `email`: Required string, must be a valid email format.
 * - `password`: Required string, minimum 5 characters, maximum 32 characters.
 * - `confirmPassword`: Required string, minimum 5 characters, maximum 32 characters.
 *
 * Additional validation:
 * - Ensures that `password` and `confirmPassword` fields match.
 *
 * Error messages are provided for each validation rule.
 */
export const signUpSchema = object({
   name: string({ required_error: "Name is required" })
      .min(1, "Name is required.")
      .max(50, "Name must be less than 50 characters"),
   email: string({ required_error: "Email is required" })
      .min(1, "Email is required.")
      .email("Invalid email"),
   password: string({ required_error: "Password is required" })
      .min(1, "Password is required")
      .min(PASSWORD_MINIMUM_LENGTH, `Password must be at least ${PASSWORD_MINIMUM_LENGTH} characters`)
      .max(PASSWORD_MAXIMUM_LENGTH, `Password must be less than ${PASSWORD_MAXIMUM_LENGTH} characters`),
   confirmPassword: string({ required_error: "Confirm password is required" })
      .min(1, "Confirm password is required")
      .min(PASSWORD_MINIMUM_LENGTH, `Password must be at least ${PASSWORD_MINIMUM_LENGTH} characters`)
      .max(PASSWORD_MAXIMUM_LENGTH, `Password must be less than ${PASSWORD_MAXIMUM_LENGTH} characters`),
})
   .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
   });


