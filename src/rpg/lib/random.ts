/**
 * 随机数工具函数
 */

/** 生成 [min, max] 范围内的随机整数 */
export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/** 生成 [min, max) 范围内的随机浮点数 */
export function randomFloat(min: number, max: number): number {
  return Math.random() * (max - min) + min
}

/** 按概率（0-1）判定是否触发 */
export function rollChance(chance: number): boolean {
  return Math.random() < chance
}

/** 从数组中随机选取一个元素 */
export function randomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}
