export const clsx = <T extends unknown>(...args: T[]) => args.reduce((p,c) => !c ? p : p ? p+=` ${c}` : c+'', '')

const assertErrorPrefix = 'Assertion failed';
/**
 * Hard assertion for validating values and conditions.
 */
export function assert(
  condition: unknown,
  message?: string | (() => string),
): asserts condition {
  if (condition) return;
  message = typeof message === 'function' ? message() : message;
  throw new Error(`${assertErrorPrefix}${message ? `: ${message}` : ''}`);
}

type AllKeys<T> = T extends any ? keyof T : never;

type PickType<T, K extends AllKeys<T>> = T extends { [k in K]?: any }
  ? T[K]
  : undefined;

type Merge<T extends object> = {
  [k in AllKeys<T>]: PickType<T, k>;
};

export const merge = async <T extends Promise<object>>(data: T[]) =>
	mergeSync(await Promise.all(data))

export const mergeSync = <T extends object, U extends object = Merge<T>>(data: T[]) =>
	data.reduce<U>((pack, res) => ({ ...pack, ...res }), {} as U)


export const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

String.prototype.toCapitalize = function (this: string) {
	return capitalize(this);
};
