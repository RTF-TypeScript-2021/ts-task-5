/** Задача 1
 * Реализовать декоратор, используя встроенную поддержку декораторов в TypeScript,
 * который будет реагировать на присвоение в поле email значения.
 * Когда присваивается корректный e-mail в консоль выводится сообщение email valid.
 * Когда присваивается некорректный e-mail возбуждается ошибка.
 */

function validEmailCheck() {
    const check = function (target: Object, propertyKey: string | symbol) {
        let newMail: string;
        const reg =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        Object.defineProperty(target, propertyKey, {
            get: function() {
                return newMail;
            },
            set: function (value: string) {
                if (reg.test(value) === true) {
                    console.log("email valid")
                } else {
                    throw new Error("Invalid email")
                }

            }
        })
    }

    return check;
}



class Example {
    @validEmailCheck()
    public email: string;
}

let exampleInstance = new Example();
exampleInstance.email = "fkkldfjg"; // генерирует эксепшен
exampleInstance.email = "Roma@mail.ru"; // выводит в консоль e-mail valid