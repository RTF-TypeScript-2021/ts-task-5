/** Задача 1
 * Реализовать декоратор, используя встроенную поддержку декораторов в TypeScript,
 * который будет реагировать на присвоение в поле email значения.
 * Когда присваивается корректный e-mail в консоль выводится сообщение email valid.
 * Когда присваивается некорректный e-mail возбуждается ошибка.
 */

 function checkValid(target: object, key: string) {
    let emailValue: string;
    Object.defineProperty(target,key, {
        get: () => emailValue,
        set: (newEmailValue: string) => {
            const regExp = /(\w+|\w+\W\w+)@\w+\.(ru|com|net)/;
            if (!regExp.test(key)) {
                throw new Error("Email is invalid");
            }
            emailValue = newEmailValue;
            console.log("Email is valid");
        }
    })
}

class Example {
    @checkValid
    public email: string = "";
}

let exampleInstance = new Example();
exampleInstance.email = "fkkldfjg"; // генерирует эксепшен
exampleInstance.email = "misha@mail.ru"; // выводит в консоль e-mail valid