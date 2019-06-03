import { Prisma } from "./generated/prisma-client";

export const prisma = process.env.NODE_ENV === 'production' 
    ? new Prisma({ endpoint: 'http://prisma:4466/pdsuoj' }) 
    : new Prisma({ endpoint: 'http://localhost:4466/pdsuoj' }) 