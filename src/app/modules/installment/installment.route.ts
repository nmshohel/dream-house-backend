import express from 'express';
import { InstallmentController } from './installment.controller';
const router = express.Router();

router.post(
  '/create-installment',
  InstallmentController.createInstallment
);
router.get(
  '/user/:userName',InstallmentController.getByUser
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
