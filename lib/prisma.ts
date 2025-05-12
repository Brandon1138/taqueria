import { PrismaClient } from '@prisma/client';

// Declare global variable for PrismaClient to prevent multiple instances during hot reloading
declare global {
	var prisma: PrismaClient | undefined;
}

// Use existing Prisma instance if available in global scope, or create a new one
export const prisma = global.prisma || new PrismaClient();

// In development, attach PrismaClient to the global object to prevent multiple instances
if (process.env.NODE_ENV !== 'production') {
	global.prisma = prisma;
}
