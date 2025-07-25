import z from "zod";

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
    })

export const registerSchema = z.object({
    email: z.string().email(),
    password: z.string(),
    username: z
        .string()
        .min(3,"Username must be at least 3 characters")
        .max(63,"User name must be less than 63 characters")
        .regex(
            /^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
            "Usernamecan only contain lowecase letters, numbers and hyphens. It must start and end with a letter or number "
            )
        .refine(
            (val) => !val.includes("--"),
            "Username cannot contain consecutive hyphens"
            )
        .transform((val) => val.toLowerCase()),
});
