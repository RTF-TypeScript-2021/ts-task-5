/** Задача 1
 * Реализовать декоратор, используя встроенную поддержку декораторов в TypeScript,
 * который будет реагировать на присвоение в поле email значения.
 * Когда присваивается корректный e-mail в консоль выводится сообщение email valid.
 * Когда присваивается некорректный e-mail возбуждается ошибка.
 */

function checkEmail(){
    return function(target : Object, propertyKey:string | symbol){
        let value : string;
        const getter = function(){
            return value;
        };
        const setter = function(newEmail: string){
            const regexp = /^([a-z\d-\.]{3,20})@([a-z\d-]{3,10})\.([a-z]{2,8})$/;
            if(!regexp.test(newEmail)) {
                throw new Error("e-mail invalid");
            } else {
                value = newEmail;
                console.log("e-mail valid");
            }
        };
        Object.defineProperty(target, propertyKey,{
            get: getter,
            set: setter
        })
    }
} 

class Example {

    @checkEmail()
    public email: string;

}
const exampleInstance = new Example();
//exampleInstance.email = "fkkldfjg"; // генерирует эксепшен
exampleInstance.email = "misha@mail.ru"; // выводит в консоль e-mail valid
console.log(exampleInstance.email);
