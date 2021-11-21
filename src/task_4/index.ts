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

class ValidationExample {
    @validate(ValueExample1, "id")
    public propValueExample1: any;

    @validate(ValueExample2, "booleanProp")
    public propValueExample2: any;
}

function validate<T extends new () => { [name: string]: any }>(object: T, objKey: string) {
    const obj = new object();

    return (target: object, key: string) => {
        let value: unknown = undefined;
        Object.defineProperty(target, key, {
            get: () => value,
            set: (newValue) => {
                if (objKey in obj) {
                    if (typeof obj[objKey] !== typeof newValue) {
                        throw new Error();
                    }
                    if (!obj[objKey]) {
                        throw new Error();
                    }
                    value = obj[objKey]

                }
            }
        })
    }
}