export function capitalize(text: string) {
  return text.slice(0, 1).toUpperCase() + text.slice(1);
}
export type UnionTuple<U extends string, R extends string[] = []> = {
  [S in U]: Exclude<U, S> extends never
    ? [...R, S]
    : UnionTuple<Exclude<U, S>, [...R, S]>;
}[U] &
  string[];

