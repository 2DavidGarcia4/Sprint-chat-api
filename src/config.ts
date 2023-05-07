import { config } from "dotenv";
config()

export const port = process.env.PORT || 2004
export const databaseUrl = process.env.DATABASE_URL
export const nodeEnv = process.env.NODE_ENV || 'development' 
export const jwtSecret = process.env.JWT_SECRET || 'secret'