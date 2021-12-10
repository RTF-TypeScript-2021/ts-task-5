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
    return (target: object, key: string) => {
        let value: unknown = undefined;
        Object.defineProperty(target, key, {
            get: () => value,
            set: (newValue) => {
                if (objKey in newValue) {
                    if (!(newValue instanceof object)) {
                        throw new Error();
                    }
                    if (newValue[objKey] === undefined) {
                        throw new Error();
                    }
                    value = newValue[objKey]

                }
            }
        })
    }
}

const test = new ValidationExample();
//const val1 = new ValueExample1();
//test.propValueExample1=val1;

const val2 = new ValueExample2();
val2.booleanProp=false;
//test.propValueExample1 = val2;
test.propValueExample2=val2;
