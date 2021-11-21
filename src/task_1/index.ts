/** Задача 1
 * Реализовать декоратор, используя встроенную поддержку декораторов в TypeScript,
 * который будет реагировать на присвоение в поле email значения.
 * Когда присваивается корректный e-mail в консоль выводится сообщение email valid.
 * Когда присваивается некорректный e-mail возбуждается ошибка.
 */
function EmailChecker(target: object, key: string) {
    let email: string;
    Object.defineProperty(target, key, {
        get: () => email,
        set(newEmail: string) {
            if (new RegExp("^[-\\w.]+@([A-z0-9][-A-z0-9]+\\.)+[A-z]{2,4}$").test(newEmail)) {
                email = newEmail;
                console.log("e-mail valid");
            } else {
                throw new Error("invalid e-mail");
            }
        }
    });
}

export class Example {
    @EmailChecker
    public email: string;
}

let exampleInstance = new Example();
exampleInstance.email = "misha@mail.ru"; // выводит в консоль e-mail valid
exampleInstance.email = "fkkldfjg"; // генерирует эксепшен
