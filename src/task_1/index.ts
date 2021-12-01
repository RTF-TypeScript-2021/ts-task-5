/** Задача 1
 * Реализовать декоратор, используя встроенную поддержку декораторов в TypeScript,
 * который будет реагировать на присвоение в поле email значения.
 * Когда присваивается корректный e-mail в консоль выводится сообщение email valid.
 * Когда присваивается некорректный e-mail возбуждается ошибка.
 */
import * as Console from "console";

class Example {
    @EmailChecker
    email: string;
}

function EmailChecker(target: Example, propertyKey: string) {
    let property: string;
    Object.defineProperty(target, propertyKey, {
        get: function (): string {
            return property;
        },
        set: function (newVal: string) {
            if(newVal.match(/^\w+@\w+\.\w+$/)){
                property = newVal;
                Console.log("e-mail valid")
            } else{
                throw "Invalid email";
            }
        }
    });
}


const exampleInstance = new Example();
exampleInstance.email = "fkkldfjg"; // генерирует эксепшен
exampleInstance.email = "misha@mail.ru"; // выводит в консоль e-mail valid

