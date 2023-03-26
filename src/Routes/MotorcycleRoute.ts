import { Router } from 'express';
import MotorcycleController from '../Controllers/MotorcycleController';

const motorcycleRoutes = Router();

motorcycleRoutes.post(
  '/motorcycles',
  (req, res, next) => new MotorcycleController(req, res, next).insertMotorcycle(),
);

motorcycleRoutes.get(
  '/motorcycles',
  (req, res, next) => new MotorcycleController(req, res, next).getAll(),
);

motorcycleRoutes.get(
  '/motorcycles/:id',
  (req, res, next) => new MotorcycleController(req, res, next).getOne(),
);

export default motorcycleRoutes;