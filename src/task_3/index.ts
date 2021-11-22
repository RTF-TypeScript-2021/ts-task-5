/** Задача 3
 * Описать каким должен быть объект X, чтобы метод работал корректно
 */

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

const x = {m : "Life is a very difficult process to describe in words. People use this concept to describe the activities of all creatures on earth. Life is an invaluable gift given to us by nature itself. It is very difficult to understand what it is. Why exactly people are gifted with a soul, and no one else? Why exactly can we feel, think, have fun and be sad?"};


console.log(getProperty(x, "m")); 