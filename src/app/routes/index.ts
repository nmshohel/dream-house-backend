import express from 'express';
import { InstallmentRoutes } from '../modules/installment/installment.route';
import { InterestRoutes } from '../modules/interest/interest.route';
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
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;