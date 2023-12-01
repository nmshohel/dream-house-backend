import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ExpenseController } from './expense.controller';
import { ExpenseValidation } from './expense.validation';



const router = express.Router();

router.post(
  '/create-expense',
  validateRequest(ExpenseValidation.create),
  ExpenseController.createExpense
);

router.get(
    '/',ExpenseController.getAllFromDB
  );

  router.get(
    '/:id',ExpenseController.getById
  );


  router.patch(
    '/:id',ExpenseController.updateIntoDB
  );
  router.delete(
    '/:id',ExpenseController.deleteFromDB
  );



export const ExpenseRoutes = router;
