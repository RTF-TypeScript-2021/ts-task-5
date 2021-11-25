/** Задача 4
 * Реализовать декоратор с шаблонным типом, который добавляется к полю класса.
 * Декоратор должен выполнять 2 функции:
 *        1) Проверять соответствие устанавливаемого значения типу, который передан в декоратор.
 *           Если тип не верный, то генерируется эксепшен.
 *        2) Проверять у передаваемого объекта наличие заполненного поля.
 *           Если поле не заполнено, то генерируется эксепшен.
 */

function validate<T>(type: new() => T, field: keyof T) {
    let value: T;

    return function (target: object, propertyKey: string | symbol | number): void {
        Object.defineProperty(target, propertyKey, {
            get: () => value,
            set: (v: T) => {
                if (field in v && v instanceof type && !!v[field]) {
                    value = v;
                } else {
                    throw new Error("Incorrect type or field is not filled.");
                }
            }
        })
    }
}

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

class ValidationExample {
    @validate(ValueExample1, "id")
    public propValueExample1: any;

    @validate(ValueExample2, "booleanProp")
    public propValueExample2: any;
}