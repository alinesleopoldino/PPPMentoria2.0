import { app } from './app';
import { env } from './config/env';

app.listen(env.port, () => {
  console.log(`Smart Invest Planner API running on port ${env.port}`);
});
