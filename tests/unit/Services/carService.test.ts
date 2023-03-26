import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';

import ICar from '../../../src/Interfaces/ICar';
import CarService from '../../../src/Services/CarService';
import Car from '../../../src/Domains/Car';

describe('Unit Test to cars', function () {
  describe('Insert a car', function () {
    it('Should insert a new car in DB with sucess', async function () {
      // Arrange
      const carInput: ICar = {
        model: 'Marea',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 15.990,
        doorsQty: 4,
        seatsQty: 5,
      };
      const carOutput: Car = new Car({
        id: '634852326b35b59438fbea2f',
        model: 'Marea',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 15.99,
        doorsQty: 4,
        seatsQty: 5,
      });
      sinon.stub(Model, 'create').resolves(carOutput);
      // Assert
      const service = new CarService();
      const result = await service.insertCar(carInput);
      // Act
      expect(result).to.be.deep.equal(carOutput);
    });
  });
  describe('Get cars', function () {
    it('Should get all cars in DB with sucess', async function () {
      // Arrange
      const carOutput: ICar[] = [
        {
          id: '641c8dc67bd902871e2386df',
          model: 'Marea',
          year: 2002,
          color: 'Black',
          status: true,
          buyValue: 15.99,
          doorsQty: 4,
          seatsQty: 5,
        },
        {
          id: '654dsads5d8d1dsadsa8w',
          model: 'Uno',
          year: 2004,
          color: 'White',
          status: false,
          buyValue: 20.879,
          doorsQty: 2,
          seatsQty: 5,
        },
      ];
      sinon.stub(Model, 'find').resolves(carOutput);
      // Assert
      const service = new CarService();
      const result = await service.getAll();
      // Act
      expect(result).to.be.deep.equal(carOutput);
    });
    it('Should get a car with ID in DB with sucess', async function () {
      // Arrange
      const carOutput: ICar = {
        id: '641c8dc67bd902871e2386df',
        model: 'Marea',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 15.99,
        doorsQty: 4,
        seatsQty: 5,
      };
      sinon.stub(Model, 'findById').resolves(carOutput);
      // Assert
      const service = new CarService();
      const result = await service.getOne('641c8dc67bd902871e2386df');
      // Act
      expect(result).to.be.deep.equal(carOutput);
    });
    it('Should return an error if given an invalid mondo ID', async function () {
      sinon.stub(Model, 'findById').resolves({});
      try {
        const service = new CarService();
        await service.getOne('641c8dc67bd902871e2386df');
      } catch (error) {
        expect((error as Error).message).to.be.equal('Car not found');
      }
    });
    it('Should return an error if given an unexistind ID', async function () {
      try {
        const service = new CarService();
        await service.getOne('1');
      } catch (error) {
        expect((error as Error).message).to.be.equal('Invalid mongo id');
      }
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});