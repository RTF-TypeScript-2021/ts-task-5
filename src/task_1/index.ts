/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/** Задача 1
 * Реализовать декоратор, используя встроенную поддержку декораторов в TypeScript,
 * который будет реагировать на присвоение в поле email значения.
 * Когда присваивается корректный e-mail в консоль выводится сообщение email valid.
 * Когда присваивается некорректный e-mail возбуждается ошибка.
 */

 function accessor(target: Object, propertyKey: string | symbol): void {
    let _val: string = this[propertyKey];
    Object.defineProperty(target, propertyKey, {
        get: function() {
            return _val;
        },
        set: function(value: string) {
            const reg = /[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+/;
            const index = value.search(reg);
            if (index === -1) {
                throw Error('Твой e-mail ИНVALID');
            } else {
                console.log('Твой e-mail valid');
                _val = value;
            }
        }
    })
}

class Example {
    @accessor
    public email: string;
}

const exampleInstance = new Example();
exampleInstance.email = "fkkldfjg"; // генерирует эксепшен
exampleInstance.email = "misha@mail.ru"; // выводит в консоль e-mail valid
console.log(exampleInstance.email);