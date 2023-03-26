import { isValidObjectId } from 'mongoose';
import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotocycleODM';

export default class MotorcycleService {
  private createMotorcycleDomain(motorcycle: IMotorcycle) {
    if (motorcycle) return new Motorcycle(motorcycle);
    return null;
  }

  async insertMotocycle(motorcycle: IMotorcycle) {
    const motorcycleODM = new MotorcycleODM();
    const createdMotorcycle = await motorcycleODM.create(motorcycle);
    return this.createMotorcycleDomain(createdMotorcycle);
  }

  async getAll() {
    const motorcycleODM = new MotorcycleODM();
    const motorcycles = await motorcycleODM.findAll();
    return motorcycles.map((motorcycle) => this.createMotorcycleDomain(motorcycle));
  }

  async getOne(id: string) {
    if (!isValidObjectId(id)) throw new Error('Invalid mongo id');
    const motorcycleODM = new MotorcycleODM();
    const motorcycle = await motorcycleODM.findById(id);
    if (!motorcycle) throw new Error('Motorcycle not found');
    return this.createMotorcycleDomain(motorcycle);
  }
}