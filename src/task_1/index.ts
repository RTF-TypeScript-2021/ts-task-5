/** Задача 1
 * Реализовать декоратор, используя встроенную поддержку декораторов в TypeScript,
 * который будет реагировать на присвоение в поле email значения.
 * Когда присваивается корректный e-mail в консоль выводится сообщение email valid.
 * Когда присваивается некорректный e-mail возбуждается ошибка.
 */

function validateEmail(target: object, propertyKey: string | symbol): void {
    let email: string;
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\)|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    Object.defineProperty(target, propertyKey, {
        get: () => email,
        set: (value: string) => {
            if (re.test(value)) {
                email = value;
                console.log("Email valid");
            } else {
                throw new Error("Incorrect email.");
            }
        }
    })
}


class Example {
    @validateEmail
    public email: string;
}

const exampleInstance = new Example();
exampleInstance.email = "fkkldfjg"; // генерирует эксепшен
exampleInstance.email = "misha@mail.ru"; // выводит в консоль e-mail valid