import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { PenantyController } from './penanty.controller';
import { PenantyValidation } from './penanty.validation';


const router = express.Router();

router.post(
  '/create-penanty',
  validateRequest(PenantyValidation.create),
  PenantyController.createPenanty
);

router.get(
    '/',PenantyController.getAllFromDB
  );

  router.get(
    '/:id',PenantyController.getById
  );


  router.patch(
    '/:id',PenantyController.updateIntoDB
  );
  router.delete(
    '/:id',PenantyController.deleteFromDB
  );



export const PenantyRoutes = router;
