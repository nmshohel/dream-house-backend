import express from 'express';
import { ExpenseRoutes } from '../modules/expense/expense.route';
import { InstallmentRoutes } from '../modules/installment/installment.route';
import { InterestRoutes } from '../modules/interest/interest.route';
import { PenantyRoutes } from '../modules/penanty/penanty.route';
import { UserRoutes } from '../modules/user/user.route';




const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/installments',
    route: InstallmentRoutes,
  },
  {
    path: '/interest',
    route: InterestRoutes,
  },
  {
    path: '/penanty',
    route: PenantyRoutes,
  },
  {
    path: '/expense',
    route: ExpenseRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;