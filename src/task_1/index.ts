/** Задача 1
 * Реализовать декоратор, используя встроенную поддержку декораторов в TypeScript,
 * который будет реагировать на присвоение в поле email значения.
 * Когда присваивается корректный e-mail в консоль выводится сообщение email valid.
 * Когда присваивается некорректный e-mail возбуждается ошибка.
 */

function emailValidateDecor(target: object, propKey: string | symbol): any{
    let _value = "";
    const pd: PropertyDescriptor = {
        get: function():string {
            return _value;
        },
        set: function(value: string) {
            const regexLiteral = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (regexLiteral.test(value)) {
                _value = value;
                console.log("e-mail valid");
            } else {
                throw new Error(`${value} isn't email`);
            }

        }
    }

    return pd;
}

class Example {
    @emailValidateDecor
    public email: string;
}


const exampleInstance = new Example();
try{
exampleInstance.email = "fkkldfjg"; // генерирует эксепшен
} catch(e){
    console.log(e);
}
exampleInstance.email = "misha@mail.ru"; // выводит в консоль e-mail valid
console.log(exampleInstance.email);