/** Задача 1
 * Реализовать декоратор, используя встроенную поддержку декораторов в TypeScript,
 * который будет реагировать на присвоение в поле email значения.
 * Когда присваивается корректный e-mail в консоль выводится сообщение email valid.
 * Когда присваивается некорректный e-mail возбуждается ошибка.
 */
function checkValidity(target: object, key: string) {
    let value: string;
    
    Object.defineProperty(target, key, {
        get: () => value,
        set: (newValue: string) => {
            const reg = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
            if (!reg.test(key)) {
                throw new Error("email invalid");
            }
            
            value = newValue;
            console.log("email valid")
        }
    });
}

class Example {
    @checkValidity
    public email = "";
}

const exampleInstance = new Example();
exampleInstance.email = "fkkldfjg"; // генерирует эксепшен
exampleInstance.email = "misha@mail.ru"; // выводит в консоль e-mail valid