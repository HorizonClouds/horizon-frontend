import * as z from 'zod';

export const commentSchema = z.object({
  title: z.string()
    .min(1, "Title is required")
    .max(50, "Title must not exceed 50 characters")
    .refine(
      (value) => value.trim().split(/\s+/).length <= 10,
      "Title must not exceed 10 words"
    ),
  message: z.string()
    .min(3, "Message must be at least 3 characters long")
    .max(280, "Message must not exceed 280 characters"),
});

export const reviewSchema = z.object({
  score: z.number()
    .int()
    .min(1, "Score must be at least 1")
    .max(10, "Score must not exceed 10"),
  title: z.string()
    .min(1, "Title is required")
    .max(50, "Title must not exceed 50 characters"),
  message: z.string()
    .min(3, "Message must be at least 3 characters long")
    .max(280, "Message must not exceed 280 characters"),
});

export const itinerarySchema = z.object({
  name: z.string()
    .min(3, "Name must be at least 3 characters long")
    .max(50, "Name must not exceed 50 characters"),
  description: z.string()
    .min(1, "Description is required"),
  startDate: z.string()
    .refine((date) => !isNaN(Date.parse(date)), "Start date must be a valid date"),
  endDate: z.string()
    .refine((date) => !isNaN(Date.parse(date)), "End date must be a valid date"),
  category: z.string().optional(),
}).refine((data) => new Date(data.startDate) <= new Date(data.endDate), {
  message: "Start date must be before or equal to end date",
  path: ["startDate"],
});

export const activitySchema = z.object({
  name: z.string()
    .min(3, "Name must be at least 3 characters long")
    .max(50, "Name must not exceed 50 characters"),
  description: z.string().optional(),
  startDate: z.string()
    .refine((date) => !isNaN(Date.parse(date)), "Start date must be a valid date"),
  endDate: z.string()
    .refine((date) => !isNaN(Date.parse(date)), "End date must be a valid date"),
  location: z.object({
    latitude: z.number(),
    longitude: z.number(),
    address: z.string(),
  }).optional(),
}).refine((data) => new Date(data.startDate) <= new Date(data.endDate), {
  message: "Start date must be before or equal to end date",
  path: ["startDate"],
});

