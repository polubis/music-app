export const error = (type: string, reason: string): Error => {
  return new Error(`[${type.toLocaleUpperCase()}]: ${reason}`);
};
