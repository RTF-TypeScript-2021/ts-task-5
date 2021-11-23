/** Задача 1
 * Реализовать декоратор, используя встроенную поддержку декораторов в TypeScript,
 * который будет реагировать на присвоение в поле email значения.
 * Когда присваивается корректный e-mail в консоль выводится сообщение email valid.
 * Когда присваивается некорректный e-mail возбуждается ошибка.
 */

function emailDecorator(target:Object,key:string){
    let email:string;
    Object.defineProperty(target,key,{
        set(newEmail:string){
            if(newEmail.match(`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`)){
                email=newEmail
                console.log("email valid")
            }
            else{
                throw new Error(`${newEmail} is not valid email`)
            }
        }
    })
}

class Example {
    @emailDecorator
    public email: string = "";
}

let exampleInstance = new Example();
exampleInstance.email = "fkkldfjg"; // генерирует эксепшен
exampleInstance.email = "misha@mail.ru"; // выводит в консоль e-mail valid