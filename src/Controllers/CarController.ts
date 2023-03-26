import { Response, Request, NextFunction } from 'express';
import CarService from '../Services/CarService';

class CarController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private carService: CarService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.carService = new CarService();
  }

  async insertCar() {
    const newCar = await this.carService.insertCar(this.req.body);
    return this.res.status(201).json(newCar);
  }

  async getAll() {
    const cars = await this.carService.getAll();
    return this.res.status(200).json(cars);
  }

  async getOne() {
    const { id } = this.req.params;
    try {
      const car = await this.carService.getOne(id);
      return this.res.status(200).json(car);
    } catch (error) {
      this.next(error);
    }
  }

  async updateOne() {
    const { id } = this.req.params;
    try {
      const updatedCar = await this.carService.updateOne(id, this.req.body);
      return this.res.status(200).json(updatedCar);
    } catch (error) {
      this.next(error);
    }
  }
}

export default CarController;