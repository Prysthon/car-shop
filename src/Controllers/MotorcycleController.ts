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

  async getAll() {
    const cars = await this.motorcycleService.getAll();
    return this.res.status(200).json(cars);
  }

  async getOne() {
    const { id } = this.req.params;
    try {
      const car = await this.motorcycleService.getOne(id);
      return this.res.status(200).json(car);
    } catch (error) {
      this.next(error);
    }
  }
}

export default MotorcycleController;