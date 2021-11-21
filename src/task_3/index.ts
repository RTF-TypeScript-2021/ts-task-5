/** Задача 3
 * Описать каким должен быть объект X, чтобы метод работал корректно
 */

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

const x = { m: "Nikotin" };

console.log(getProperty(x, "m")); 