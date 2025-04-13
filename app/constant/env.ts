const env = {
    MONGODB_URI: process.env.MONGODB_URI || "",
    JWT_SECRET: process.env.JWT_SECRET || "",
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "1d",
    NODE_ENV: process.env.NODE_ENV || "development",
    PORT: process.env.PORT || 3000,
} as const

export default env