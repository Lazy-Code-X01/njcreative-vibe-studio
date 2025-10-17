import { z } from 'zod';

export const contactFormSchema = z.object({
  firstName: z.string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'First name can only contain letters, spaces, hyphens, and apostrophes'),
  
  lastName: z.string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Last name can only contain letters, spaces, hyphens, and apostrophes'),
  
  email: z.string()
    .email('Please enter a valid email address')
    .max(255, 'Email must be less than 255 characters'),
  
  phone: z.string()
    .min(5, 'Please enter a valid phone number')
    .max(20, 'Phone number must be less than 20 characters')
    .regex(/^[+\d\s()-]+$/, 'Please enter a valid phone number'),
  
  address: z.string()
    .max(200, 'Address must be less than 200 characters')
    .optional(),
  
  companyName: z.string()
    .min(2, 'Company name must be at least 2 characters')
    .max(100, 'Company name must be less than 100 characters'),
  
  helpMessage: z.string()
    .min(10, 'Please provide at least 10 characters describing your needs')
    .max(2000, 'Message must be less than 2000 characters'),
  
  selectedServices: z.array(z.string())
    .min(1, 'Please select at least one service'),
  
  dateTime: z.string().optional(),
  
  signature: z.string()
    .max(100, 'Signature must be less than 100 characters')
    .optional(),
  
  companyLogo: z.instanceof(File)
    .refine((file) => file.size <= 5 * 1024 * 1024, 'File size must be less than 5MB')
    .refine(
      (file) => ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'].includes(file.type),
      'File must be a valid image (JPEG, PNG, WebP, or SVG)'
    )
    .optional()
    .nullable(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
