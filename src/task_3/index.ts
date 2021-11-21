/** Задача 3
 * Описать каким должен быть объект X, чтобы метод работал корректно
 */

export function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

const x: {m: number, numpy: string} = {
    m: 15,
    numpy: 'hello'
};

console.log(getProperty(x, "m")); 
console.log(getProperty(x, 'numpy'));