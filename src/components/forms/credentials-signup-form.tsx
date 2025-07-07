'use client';

import { Form } from '@/components/ui/form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import LoadingButton from '@/components/loading-button'; // Adjust if needed
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { signUpSchema } from '@/lib/zod'; // Replace with actual import

type CredentialsSignUpFormProps = {
   form: UseFormReturn<z.infer<typeof signUpSchema>>;
   onSubmit: (values: z.infer<typeof signUpSchema>) => void;
};

const FIELDS = [
   {
      name: 'name',
      placeholder: 'Enter your name',
   },
   {
      name: 'email',
      placeholder: 'Enter your email address',
   },
   {
      name: 'password',
      placeholder: 'Create a strong password',
   },
   {
      name: 'confirmPassword',
      placeholder: 'Confirm your password',
   },
];


export default function CredentialsSignUpForm({ form, onSubmit }: CredentialsSignUpFormProps) {
   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {FIELDS.map(({ name, placeholder }) => (
               <FormField
                  key={name}
                  control={form.control}
                  name={name as keyof z.infer<typeof signUpSchema>}
                  render={({ field: fieldProps }) => (
                     <FormItem>
                        <FormLabel>
                           {name
                              .replace(/([A-Z])/g, ' $1')
                              .replace(/^./, (str) => str.toUpperCase())}
                        </FormLabel>
                        <FormControl>
                           <Input
                              type={
                                 name.toLowerCase().includes('password')
                                    ? 'password'
                                    : name === 'email'
                                       ? 'email'
                                       : 'text'
                              }
                              placeholder={placeholder}
                              autoComplete="off"
                              {...fieldProps}
                           />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
            ))}

            <LoadingButton pending={form.formState.isSubmitting}>
               Sign Up
            </LoadingButton>
         </form>
      </Form>
   );
}
