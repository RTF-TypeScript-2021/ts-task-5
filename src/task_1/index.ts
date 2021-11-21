/** Задача 1
 * Реализовать декоратор, используя встроенную поддержку декораторов в TypeScript,
 * который будет реагировать на присвоение в поле email значения.
 * Когда присваивается корректный e-mail в консоль выводится сообщение email valid.
 * Когда присваивается некорректный e-mail возбуждается ошибка.
 */


function CheckMail():any{
    return function(target: Object, propertyKey: string|symbol){
        let mail: string;
        Object.defineProperty(target, propertyKey,{
            get: () => mail,
            set: (newMail: string)=> {
                const regEx = /(\w+|\w+\W\w+)@\w+\.(ru|com)/;
                if(regEx.test(newMail)){
                    mail = newMail;
                    console.log("email valid");
                } else {
                    console.log("email invalid")
                    throw new Error();
                }
            }
        })
    }

}

class Example {
    @CheckMail()
    public email: string;
    
}

let exampleInstance = new Example();
exampleInstance.email = "fkkldfjg"; // генерирует эксепшен
exampleInstance.email = "misha@mail.ru"; // выводит в консоль e-mail valid