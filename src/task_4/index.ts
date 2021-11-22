/** Задача 4
 * Реализовать декоратор с шаблонным типом, который добавляется к полю класса.
 * Декоратор должен выполнять 2 функции:
 * 		1) Проверять соответствие устанавливаемого значения типу, который передан в декоратор.
 * 		   Если тип не верный, то генерируется эксепшен.
 * 		2) Проверять у передаваемого объекта наличие заполненного поля.
 * 		   Если поле не заполнено, то генерируется эксепшен.
 */

class ValueExample1 {
    public value: string;
    public id: number;
    public constructor(value?: string, id?: number) {
        this.value = value;
        this.id = id;
    }
}

class ValueExample2 {
    public undefinedProp: undefined;
    public booleanProp: boolean;
    public constructor(undefinedProp?: undefined, booleanProp?: boolean) {
        this.undefinedProp = undefinedProp;
        this.booleanProp = booleanProp;
    }
}

function validate<T extends new () => { [key: string]: any }>(target: T, propertyKey: string) {
    let value: unknown = undefined;
    const targ = new target();

    const getter = function () {
        return value;
    };

    const setter = function (newValue: unknown) {
        if (propertyKey in targ) {
            if (!targ[propertyKey] || typeof targ[propertyKey] !== typeof newValue) {
                throw new Error("");
            } else {
                value = targ[propertyKey]
            }
        }
    };

    return (target: object, key: string) => {
        Object.defineProperty(target, key, {
            get: getter,
            set: setter
        });
    };
}

class ValidationExample {
    @validate(ValueExample1, "id")
    public propValueExample1: any;

    @validate(ValueExample2, "booleanProp")
    public propValueExample2: any;
}