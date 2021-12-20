/** Задача 1
 * Реализовать декоратор, используя встроенную поддержку декораторов в TypeScript,
 * который будет реагировать на присвоение в поле email значения.
 * Когда присваивается корректный e-mail в консоль выводится сообщение email valid.
 * Когда присваивается некорректный e-mail возбуждается ошибка.
 */
 function checkValid(target: object, key: string) {
    let email: string = this[key];

    Object.defineProperty(target, key, {
        get: () => email,
        set: (newEmailValue: string) => {
            const emailMatch = newEmailValue.match("/[0-9a-z_.-]+@[0-9a-z_.-]+.[emailMatch-z]{2,4}/i");
            if (!newEmailValue || emailMatch.length === 0) {
                throw new Error("Email invalid");
            }
            email = newEmailValue;
            console.log("Email valid");
        }
    });
}

class Example {
    @checkValid
    public email: string = "";
}

const exampleInstance = new Example();
exampleInstance.email = "fkkldfjg"; // генерирует эксепшен
exampleInstance.email = "misha@mail.ru"; // выводит в консоль e-mail valid