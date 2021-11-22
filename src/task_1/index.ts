
/** Задача 1
 * Реализовать декоратор, используя встроенную поддержку декораторов в TypeScript,
 * который будет реагировать на присвоение в поле email значения.
 * Когда присваивается корректный e-mail в консоль выводится сообщение email valid.
 * Когда присваивается некорректный e-mail возбуждается ошибка.
 */
 function EmailChecker(target: object, key: string) {
    let ourString : string;
    Object.defineProperty(target,key, {
        get: () => ourString,
        set: (newEmailValue: string) =>{
            const regularEmail = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
            if (!regularEmail.test(key)) {
                throw new Error("e-mail invalid");
            }
            ourString = newEmailValue;
            console.log("e-mail valid");
        }
    })
}

class Example {
    @EmailChecker
    public email: string;
}

let exampleInstance = new Example();
exampleInstance.email = "fkkldfjg";// генерирует эксепшен
exampleInstance.email = "misha@mail.ru"; // выводит в консоль e-mail valid