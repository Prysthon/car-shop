import { model, Model, models, Schema } from 'mongoose';
import ICar from '../Interfaces/ICar';

class CarODM {
  private model: Model<ICar>;
  private schema: Schema;
  constructor() {
    this.schema = new Schema<ICar>({
      model: { type: String, required: true },
      year: { type: Number, required: true },
      color: { type: String, required: true },
      status: { type: Boolean },
      buyValue: { type: Number, required: true },
      doorsQty: { type: Number, required: true },
      seatsQty: { type: Number, required: true },
    });

    this.model = models.Car || model('Car', this.schema);
  }

  async insertCar(car: ICar): Promise<ICar> {
    const insertedCar = await this.model.create({ ...car });
    return insertedCar;
  }

  async getAll(): Promise<ICar[]> {
    const cars = await this.model.find({});
    return cars;
  }

  async getOne(id: string): Promise<ICar | null> {
    const car = await this.model.findById(id);
    return car;
  }
}

export default CarODM;