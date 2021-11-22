/** Задача 1
 * Реализовать декоратор, используя встроенную поддержку декораторов в TypeScript,
 * который будет реагировать на присвоение в поле email значения.
 * Когда присваивается корректный e-mail в консоль выводится сообщение email valid.
 * Когда присваивается некорректный e-mail возбуждается ошибка.
 */

function IsCorrect(re: RegExp) {
    return function (target: Object, key: string) {
        let field: string;
        Object.defineProperty(target, key, {
            get: () => field,
            set: (value: string) => {
                if (!re.test(value)) {
                    throw new Error(`Incorrect email: ${value}`);
                }
                field = value;
            },
        });
    };
}

const emailValidation: RegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class Example {
    @IsCorrect(emailValidation)
    public email: string;
}

let exampleInstance = new Example();
exampleInstance.email = "fkkldfjg"; // генерирует эксепшен
exampleInstance.email = "misha@mail.ru"; // выводит в консоль e-mail valid
console.log(1);