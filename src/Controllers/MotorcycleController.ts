import { Response, Request, NextFunction } from 'express';
import MotorcycleService from '../Services/MotocycleService';

class MotorcycleController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private motorcycleService: MotorcycleService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.motorcycleService = new MotorcycleService();
  }

  async insertMotorcycle() {
    const newMotorcycle = await this.motorcycleService.insertMotocycle(this.req.body);
    return this.res.status(201).json(newMotorcycle);
  }
}

export default MotorcycleController;