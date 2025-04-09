declare type All<T extends (...args: any) => any> = Parameters<T>;

declare type At<T, N extends number> = T extends (...args: infer P) => any
  ? N extends keyof P
    ? P[N]
    : never
  : never;
