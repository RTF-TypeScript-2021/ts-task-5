/** Задача 1
 * Реализовать декоратор, используя встроенную поддержку декораторов в TypeScript,
 * который будет реагировать на присвоение в поле email значения.
 * Когда присваивается корректный e-mail в консоль выводится сообщение email valid.
 * Когда присваивается некорректный e-mail возбуждается ошибка.
 */

function decorators(target: Object, propertyKey: string): void{
    let giveValue: string;
    const reForEmail = /[a-zA-Z0-9]+@[a-zA-Z0-9]+.[a-zA-Z0-9]+/;

    Object.defineProperty(target, propertyKey, {
        get: function(){
            return giveValue
        },
        set: function(value: string) {
        if(value.search(reForEmail) === -1){
            throw Error("Ваш не Email");
        } else{
            console.log('e-mail valid');
            giveValue = value;
        }
    }
})
}

class Example {
    @decorators
    public email: string;
}

let exampleInstance = new Example();
exampleInstance.email = "fkkldfjg"; // генерирует эксепшен
exampleInstance.email = "misha@mail.ru"; // выводит в консоль e-mail valid
