/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/** Задача 1
 * Реализовать декоратор, используя встроенную поддержку декораторов в TypeScript,
 * который будет реагировать на присвоение в поле email значения.
 * Когда присваивается корректный e-mail в консоль выводится сообщение email valid.
 * Когда присваивается некорректный e-mail возбуждается ошибка.
 */

function decorator(target: object, propertyKey: string): void{
    let giveValue: string  = this[propertyKey];

    const reForEmail = /[a-zA-Z0-9]+@[a-zA-Z0-9]+.[a-zA-Z0-9]+/;

    Object.defineProperty(target, propertyKey, {
        get: function(){
            return giveValue
        },
        set: function(value: string) {
        if(value.search(reForEmail) === -1){
            throw Error("Ваш Email не Email");
        } else{
            console.log('e-mail valid');
            giveValue = value;
        }
    }
})
}

class Example {
    @decorator
    public email: string;
}

const exampleInstance = new Example();
exampleInstance.email = "fkkldfjg"; // генерирует эксепшен
exampleInstance.email = "misha@mail.ru"; // выводит в консоль e-mail valid