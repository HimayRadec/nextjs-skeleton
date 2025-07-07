'use client';

import { Form } from '@/components/ui/form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import LoadingButton from "@/components/loading-button";
import { UseFormReturn } from 'react-hook-form';
import { usernameChangeSchema } from "@/lib/zod";
import { z } from "zod";

interface SetUsernameFormProps {
   form: UseFormReturn<z.infer<typeof usernameChangeSchema>>;
   onSubmit: (values: z.infer<typeof usernameChangeSchema>) => void;
}

export default function SetUsernameForm({
   form,
   onSubmit,
}: SetUsernameFormProps) {
   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
               control={form.control}
               name="username"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Username</FormLabel>
                     <FormControl>
                        <Input
                           type="text"
                           placeholder="Enter your username"
                           autoComplete="off"
                           {...field}
                        />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />

            <LoadingButton pending={form.formState.isSubmitting}>
               Update Username
            </LoadingButton>
         </form>
      </Form>
   );
}