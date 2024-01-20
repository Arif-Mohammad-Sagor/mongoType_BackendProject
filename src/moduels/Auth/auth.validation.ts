import { z } from 'zod';

export const loginValidationSchema = z.object({
 body:z.object({
   id: z.string(),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
 })
});
