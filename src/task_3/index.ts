/** Задача 3
 * Описать каким должен быть объект X, чтобы метод работал корректно
 */

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
        return obj[key];
}

const x = {m: "Для разума нет никаких препятствий, кроме тех, которые мы признаем --и дженерик типов--",
         m1: 125,
        m2: [1, 2, 5],
    m3: "загадка - Какое растение все знает?",
    m4: "отгадка - хрен)"
}
console.log(getProperty(x, "m")); 
//console.log(getProperty(x, "noWay")) // тк нет такого ключа