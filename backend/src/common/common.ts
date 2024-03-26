import {
  ClassConstructor,
  ClassTransformOptions,
  plainToInstance,
} from 'class-transformer';

/**
 * クライアント用DTOに変換する。<br>
 * DTOに存在しないプロパティは除外する。

 * @returns
 */
export function toDto<T, V>(
  cls: ClassConstructor<T>,
  plain: V,
  options?: ClassTransformOptions,
): T {
  return plainToInstance(cls, plain, {
    ...options,
    excludeExtraneousValues: true,
  });
}
