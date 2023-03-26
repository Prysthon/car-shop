import { isValidObjectId } from 'mongoose';
import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';

class CarService {
  private createCarDomain(car: ICar | null) {
    if (car) {
      return new Car(car);
    }
    return null;
  }

  async insertCar(car: ICar) {
    const carODM = new CarODM();
    const newCar = await carODM.insertCar(car);
    return this.createCarDomain(newCar);
  }

  async getAll() {
    const carODM = new CarODM();
    const cars = await carODM.getAll();
    return cars.map((car) => this.createCarDomain(car));
  }

  async getOne(id: string) {
    if (!isValidObjectId(id)) throw new Error('Invalid mongo id');
    const carODM = new CarODM();
    const car = await carODM.getOne(id);
    if (!car) throw new Error('Car not found');
    return this.createCarDomain(car);
  }
}

export default CarService;