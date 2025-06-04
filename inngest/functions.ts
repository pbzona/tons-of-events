import { inngest } from '@/inngest/client';

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}` };
  }
);

export const workloadRouter = inngest.createFunction(
  { id: "workload-router" },
  { event: "example/fluid-test" },
  async ({ step }) => {
    // Set proliferation here
    const invocations = 20;

    for (let i = 0; i < invocations; i++) {
      await step.sendEvent("fan-out-llm-work", {
        name: "example/io",
        data: {}
      });
      await new Promise(r => setTimeout(r, 25));
    }
  }
);

export const cpuBound = inngest.createFunction(
  { id: "cpu-bound" },
  { event: "example/cpu" },
  async () => {
    const a = [];
    for (let i = 0; i < 1_000_000; i++) {
      const n = Math.pow(i, Math.floor(Math.random() * 5));
      a.push(Math.sqrt(n));
    }
    return { status: 'ok', from: 'cpu-bound' };
  }
);

export const ioBound = inngest.createFunction(
  { id: "io-bound" },
  { event: "example/io" },
  async () => {
    await new Promise(r => setTimeout(r, Math.floor(Math.random() * 5000 + 5000)));

    return { status: 'ok', from: 'io-bound' };
  }
);