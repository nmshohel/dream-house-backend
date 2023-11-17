import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { InstallmentController } from './installment.controller';
import { InstallmentValidation } from './installment.validation';
const router = express.Router();

router.post(
  '/create-installment',
  validateRequest(InstallmentValidation.create),
  InstallmentController.createInstallment
);
router.get(
    '/',InstallmentController.getAllFromDB
  );

  router.get(
    '/:id',InstallmentController.getById
  );
  router.patch(
    '/:id',InstallmentController.updateIntoDB
  );
  router.delete(
    '/:id',InstallmentController.deleteFromDB
  );



export const InstallmentRoutes = router;
