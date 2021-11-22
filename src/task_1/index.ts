/** Задача 1
 * Реализовать декоратор, используя встроенную поддержку декораторов в TypeScript,
 * который будет реагировать на присвоение в поле email значения.
 * Когда присваивается корректный e-mail в консоль выводится сообщение email valid.
 * Когда присваивается некорректный e-mail возбуждается ошибка.
 */

function validationEmail(target: object, key: string) {
    let emailValue : string;
    Object.defineProperty(target,key, {
        get: () => emailValue,
        set: (newEmailValue: string) =>{
            const pattern = /^([A-Za-z0-9_-]+\.)*[A-Za-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
            if (!pattern.test(key)) {
                throw new Error("Email invalid");
            }
            emailValue = newEmailValue;
            console.log("Email valid");
        }
    })
}

class Example {
    @validationEmail
    public email: string = "";
}

let exampleInstance = new Example();
exampleInstance.email = "fkkldfjg"; // генерирует эксепшен
exampleInstance.email = "misha@mail.ru"; // выводит в консоль e-mail valid