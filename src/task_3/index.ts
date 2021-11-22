/** Задача 3
 * Описать каким должен быть объект X, чтобы метод работал корректно
 */

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

// Это интерфейс Гири
interface IKettlebell {
    mass: number;
    massMeasurement: string;
    haveAnyoneLifted?: boolean;
}

// X - это какой-то объект, который содержит определенные поля
// Допустим он реализует интерфейс Гири таким образом:
const x: IKettlebell = {
    mass: 100,
    massMeasurement: "kg"
};

// А этим методом мы проверяем есть ли в объете X поле с каким-то именем
console.log(getProperty(x, "haveAnyoneLifted")); // --> Вернет undefined потому что у объекта Х нет этого поля
console.log(getProperty(x, "mass")); // --> Вернет 100 потому что у объекта Х есть такое поле