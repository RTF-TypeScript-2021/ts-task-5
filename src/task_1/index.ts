/** Задача 1
 * Реализовать декоратор, используя встроенную поддержку декораторов в TypeScript,
 * который будет реагировать на присвоение в поле email значения.
 * Когда присваивается корректный e-mail в консоль выводится сообщение email valid.
 * Когда присваивается некорректный e-mail возбуждается ошибка.
 */

function EmailValidator() {
  return function (target: Object, propertyName: string) {
    let value: string;
    Object.defineProperty(target, propertyName, {
      get: () => value,
      set: (newValue: string) => {
        const re =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(newValue)) {
          throw new Error("email invalid");
        }
        value = newValue;
        console.log("email valid");
      },
    });
  };
}
class Example {
  @EmailValidator()
  public email!: string;
}

let exampleInstance = new Example();
exampleInstance.email = "misha@mail.ru"; // выводит в консоль e-mail valid
exampleInstance.email = "fkkldfjg"; // генерирует эксепшен
