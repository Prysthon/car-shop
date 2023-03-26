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

  public async insertCar(car: ICar) {
    const carODM = new CarODM();
    const newCar = await carODM.insertCar(car);
    return this.createCarDomain(newCar);
  }
}

export default CarService;