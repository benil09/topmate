import { Request, Response, NextFunction } from "express";
import { unauthorized } from "../utils/api-error.js";
import { getUserById } from "../repositories/user.repository.js";

// Extend Express Request type globally to include userId and user properties
declare global {
  namespace Express {
    interface Request {
      userId?: number;
      user?: any;
    }
  }
}

export async function authenticate(req: Request, _res: Response, next: NextFunction) {
  const userIdHeader = req.headers["x-user-id"];

  if (!userIdHeader || Array.isArray(userIdHeader) || typeof userIdHeader !== "string") {
    throw unauthorized("Authentication required. Please provide x-user-id header.");
  }

  const userId = Number(userIdHeader);
  if (isNaN(userId)) {
    throw unauthorized("Invalid User ID format.");
  }

  // check if the user is valid or not
  const user = await getUserById(userId);
  if (!user) {
    throw unauthorized("User not found.");
  }

  // Attach authenticated details to request so that we can use it in the controllers and dont need to check everytime
  req.userId = user.id;
  req.user = user;

  next();
}
