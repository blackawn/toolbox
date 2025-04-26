declare type CP<T, N extends number> =
  NonNullable<T> extends (...args: infer P) => any ? P[N] : never
