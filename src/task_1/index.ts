/** Задача 1
 * Реализовать декоратор, используя встроенную поддержку декораторов в TypeScript,
 * который будет реагировать на присвоение в поле email значения.
 * Когда присваивается корректный e-mail в консоль выводится сообщение email valid.
 * Когда присваивается некорректный e-mail возбуждается ошибка.
 */

function decorator() {
    return function (target: Object, propertyKey: string|symbol) {
        let email: string;
        const reg = /(\w+|\w+\W\w+)@\w+\.(ru|com)/;
        Object.defineProperty (target, propertyKey, {
            get: function() {
                return email;
            },
            set: (newEmail: string) => {
                if(reg.test(newEmail)) {
                    email = newEmail;
                    console.log("email valid");
                }
                else {
                    throw new Error("email не valid, а invalid");
                }
            }
        })
    }
}

class Example {
    @decorator()
    public email: string;
}

let exampleInstance = new Example();