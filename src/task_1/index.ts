import { getProperty } from "../task_3";

/** Задача 1
 * Реализовать декоратор, используя встроенную поддержку декораторов в TypeScript,
 * который будет реагировать на присвоение в поле email значения.
 * Когда присваивается корректный e-mail в консоль выводится сообщение email valid.
 * Когда присваивается некорректный e-mail возбуждается ошибка.
 */
function checkString(regular: RegExp) {
    return function (object: Example, propertyName: keyof Example) : void{
        let val = getProperty(object, propertyName);
        const setter = (value: string) => {
            if(regular.test(value)) {
                console.log('email valid');
                val = value;
            } else {
                throw new Error('email invalid');
            }
        }
        const getter = () => {
            return val;
        }
        
        Object.defineProperty(object, propertyName, {set: setter, get: getter, configurable: true});
    };
}

class Example {
    // eslint-disable-next-line @typescript-eslint/no-inferrable-types
    @checkString(/^\S+@\S+.\S+$/)
    public email: string = '';
}
const exampleInstance = new Example();
exampleInstance.email = "fkkldfjg"; // генерирует эксепшен
exampleInstance.email = "misha@mail.ru"; // выводит в консоль e-mail valid