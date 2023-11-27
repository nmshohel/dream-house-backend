import express from 'express';
import { InterestController } from './interest.controller';

const router = express.Router();

router.post(
  '/create-interest',
  InterestController.createInstallment
);

router.get(
    '/',InterestController.getAllFromDB
  );

  router.get(
    '/:id',InterestController.getById
  );


  router.patch(
    '/:id',InterestController.updateIntoDB
  );
  router.delete(
    '/:id',InterestController.deleteFromDB
  );



export const InterestRoutes = router;
