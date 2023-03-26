import { NextFunction, Request, Response } from 'express';

class ErrorHandler {
  public static handle(
    error: Error,
    _req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const MESSAGES_ERRORS = ['Car not found', 'Motorcycle not found'];
    if (error.message === 'Invalid mongo id') res.status(422).json({ message: error.message });
    else if (MESSAGES_ERRORS.some((message) => message === error.message)) {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
    next();
  }
}

export default ErrorHandler;