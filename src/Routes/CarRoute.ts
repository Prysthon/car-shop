import { Router } from 'express';
import CarController from '../Controllers/Car';

const carRoutes = Router();

carRoutes.post(
  '/cars',
  (req, res, next) => new CarController(req, res, next).insertCar(),
);

export default carRoutes;