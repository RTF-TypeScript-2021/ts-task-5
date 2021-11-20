/** Задача 1
 * Реализовать декоратор, используя встроенную поддержку декораторов в TypeScript,
 * который будет реагировать на присвоение в поле email значения.
 * Когда присваивается корректный e-mail в консоль выводится сообщение email valid.
 * Когда присваивается некорректный e-mail возбуждается ошибка.
 */
function checkValid(target: { [key: string]: any}, key: string) {

    let propValue: string;

    Object.defineProperty(target, key, {
        get: () => propValue,
        set: (value: string) => {
            const regExp = /(\w+|\w+\W\w+)@\w+\.(ru|com)/;
            if (regExp.test(value)) {
                console.log("email valid");
                propValue = value;
            } else {
                throw new Error("email not valid");
            }
        }
    });
}

class Example {
    @checkValid
    public email: string;
}

const exampleInstance = new Example();
exampleInstance.email = "fkkldfjg"; // генерирует эксепшен
exampleInstance.email = "misha@mail.ru"; // выводит в консоль e-mail valid