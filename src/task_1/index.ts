/** Задача 1
 * Реализовать декоратор, используя встроенную поддержку декораторов в TypeScript,
 * который будет реагировать на присвоение в поле email значения.
 * Когда присваивается корректный e-mail в консоль выводится сообщение email valid.
 * Когда присваивается некорректный e-mail возбуждается ошибка.
 */

function emailDecorator(target: object, propertyKey: string) {
    let email: string = this[propertyKey];

    const getter = function () {
        return email;
    };

    const setter = function (newEmail: string) {
        const emailMatch = newEmail.match("/[0-9a-z_.-]+@[0-9a-z_.-]+.[emailMatch-z]{2,4}/i");
        if (!newEmail || emailMatch.length === 0) {
            throw new Error("The input e-mail is incorrect");
        } else {
            email = newEmail;
            console.log("e-mail valid");
        }
    };

    Object.defineProperty(target, propertyKey, {
        get: getter,
        set: setter
    });
}

class Example {
    @emailDecorator
    public email = "";
}

const exampleInstance = new Example();
exampleInstance.email = "fkkldfjg"; // генерирует эксепшен
exampleInstance.email = "misha@mail.ru"; // выводит в консоль e-mail valid