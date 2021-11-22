/** Задача 1
 * Реализовать декоратор, используя встроенную поддержку декораторов в TypeScript,
 * который будет реагировать на присвоение в поле email значения.
 * Когда присваивается корректный e-mail в консоль выводится сообщение email valid.
 * Когда присваивается некорректный e-mail возбуждается ошибка.
 */

class Example {
    @EmailChecker
    email: string;
}

function EmailChecker(target: object, propertyKey: string) {
    let _val: string = this[propertyKey];
    const getter = function (): string {
        return _val;
    };

    const setter = function (newVal: string) {
        if(newVal.match(/^\w+@\w+\.\w+$/)){
            _val = newVal;
        } else{
            throw "Invalid email";
        }
    };

    if (delete this[propertyKey]) {
        Object.defineProperty(target, propertyKey, {
            get: getter,
            set: setter
        });
    }
}


const exampleInstance = new Example();
exampleInstance.email = "fkkldfjg"; // генерирует эксепшен
exampleInstance.email = "misha@mail.ru"; // выводит в консоль e-mail valid

