import { inngest } from '@/inngest/client';
import { cpuBound, ioBound, workloadRouter } from '@/inngest/functions';
import { serve } from 'inngest/next';

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [

    workloadRouter,
    cpuBound,
    ioBound
  ]
});