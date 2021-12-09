/** Задача 1
 * Реализовать декоратор, используя встроенную поддержку декораторов в TypeScript,
 * который будет реагировать на присвоение в поле email значения.
 * Когда присваивается корректный e-mail в консоль выводится сообщение email valid.
 * Когда присваивается некорректный e-mail возбуждается ошибка.
 */

 function CheckEmail(target: object, propertyName: string) {
    let emailValue : string;
    Object.defineProperty(target, propertyName, {
        get: () => emailValue,
        set: (newEmailValue: string) =>{
            const reg = /(\w+|\w+\W\w+)@\w+\.(ru|com|net|lv|ua|cc|am|ws)/;
            if (!reg.test(propertyName)) {
                throw new Error("email invalid");
            }
            emailValue = newEmailValue;
            console.log("email valid");
        }
    })
}

class Example {
    @CheckEmail
    public email: string;
}

const exampleInstance = new Example();
exampleInstance.email = "fkkldfjg"; // генерирует эксепшен
exampleInstance.email = "misha@mail.ru"; // выводит в консоль e-mail valid