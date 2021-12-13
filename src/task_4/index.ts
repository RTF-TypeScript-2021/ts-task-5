/** Задача 4
 * Реализовать декоратор с шаблонным типом, который добавляется к полю класса.
 * Декоратор должен выполнять 2 функции:
 * 		1) Проверять соответствие устанавливаемого значения типу, который передан в декоратор.
 * 		   Если тип не верный, то генерируется эксепшен.
 * 		2) Проверять у передаваемого объекта наличие заполненного поля.
 * 		   Если поле не заполнено, то генерируется эксепшен.
 */
function validate(type: new() => any, propertyName: string) {
    return (target: { [key: string] : any }, propertyKey: keyof typeof target): void => {
        let currentVal: unknown
        const descriptor: PropertyDescriptor = {
            get: function() {
                return currentVal;
            },
            set: function(value) {
                if (!(value instanceof type)) {
                    throw new Error(Вы хотите ввести неправильный тип данных! Надо - ${type.name}, а у вас ${typeof value});
                } else if (!value[propertyName]) {
                    throw new Error(У вас не заданао поле ${propertyName});
                } else {
                    currentVal = value;
                }
            }
        }
        Object.defineProperty(target, propertyKey, descriptor);
    }
}

class ValidationExample {
    @validate(ValueExample1, "id")
    public propValueExample1: any;

    @validate(ValueExample2, "booleanProp")
    public propValueExample2: any;
}
