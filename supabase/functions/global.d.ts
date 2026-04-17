declare const Deno: {
  env: {
    get(key: string): string | undefined;
  };
  serve(handler: unknown): void;
};
