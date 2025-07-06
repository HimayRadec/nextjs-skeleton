'use client';

import { Form } from '@/components/ui/form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import LoadingButton from "@/components/loading-button";
import { UseFormReturn } from 'react-hook-form';
import { emailSignInSchema } from "@/lib/zod";
import { z } from "zod";


interface CredentialsSignInFormProps {
   form: UseFormReturn<z.infer<typeof emailSignInSchema>>;
   onSubmit: (values: z.infer<typeof emailSignInSchema>) => void;
}

export default function CredentialsSignInForm({
   form,
   onSubmit,
}: CredentialsSignInFormProps) {
   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
               control={form.control}
               name="email"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Email</FormLabel>
                     <FormControl>
                        <Input
                           type="email"
                           placeholder="Enter your email address"
                           autoComplete="off"
                           {...field}
                        />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />

            <FormField
               control={form.control}
               name="password"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Password</FormLabel>
                     <FormControl>
                        <Input type="password" placeholder="Enter password" {...field} />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />

            <LoadingButton pending={form.formState.isSubmitting}>
               Sign in With Email
            </LoadingButton>
         </form>
      </Form>
   );
}
