/** Задача 1
 * Реализовать декоратор, используя встроенную поддержку декораторов в TypeScript,
 * который будет реагировать на присвоение в поле email значения.
 * Когда присваивается корректный e-mail в консоль выводится сообщение email valid.
 * Когда присваивается некорректный e-mail возбуждается ошибка.
 */

class Example {
    @ValidEmail
    public email: string = "";
}

function ValidEmail(target: object, property: string) {
    let email : string;
    Object.defineProperty(target, property, {
        get: () => email,
        set: (newEmail: string) =>{
            const regular = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
            if (!regular.test(property)) {
                throw new Error("email invalid");
            }
            email = newEmail;
            console.log("email valid");
        }
    })
}

let exampleInstance = new Example();
exampleInstance.email = "fkkldfjg"; // генерирует эксепшен
exampleInstance.email = "misha@mail.ru"; // выводит в консоль e-mail valid