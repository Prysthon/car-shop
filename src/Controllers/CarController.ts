import { Response, Request, NextFunction } from 'express';
import ICar from '../Interfaces/ICar';
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
    const car: ICar = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status || false,
      buyValue: this.req.body.buyValue,
      doorsQty: this.req.body.doorsQty,
      seatsQty: this.req.body.seatsQty,
    };
    const newCar = await this.carService.insertCar(car);
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
}

export default CarController;