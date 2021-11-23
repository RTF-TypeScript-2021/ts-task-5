/** Задача 4
 * Реализовать декоратор с шаблонным типом, который добавляется к полю класса.
 * Декоратор должен выполнять 2 функции:
 * 		1) Проверять соответствие устанавливаемого значения типу, который передан в декоратор.
 * 		   Если тип не верный, то генерируется эксепшен.
 * 		2) Проверять у передаваемого объекта наличие заполненного поля.
 * 		   Если поле не заполнено, то генерируется эксепшен.
 */

interface IValueExample { }

class ValueExample1 implements IValueExample {
    public value: string;
    public id: number;
    public constructor(value?: string, id?: number) {
        this.value = value;
        this.id = id;
    }
}

class ValueExample2 implements IValueExample {
    public undefinedProp: undefined;
    public booleanProp: boolean;
    public constructor(undefinedProp?: undefined, booleanProp?: boolean) {
        this.undefinedProp = undefinedProp;
        this.booleanProp = booleanProp;
    }
}

function validate<T extends new () => { [key: string]: any }>(target: T,key: string)
: (_: object, keyobj: string) => void {
    return (_: object, keyobj: string): void => {
        let value = new target();
        const isInstanceofValueExample = function (object: any): object is IValueExample {
            return object;
        };
        Object.defineProperty(target, key, {
            set: (newValue: object) => {
                if (
                    isInstanceofValueExample(newValue) &&
                    Object.entries(newValue).find(([_, value]) => value)
                ) {
                    value = newValue;
                } else {
                    throw new Error(`${newValue} is not valid`);
                }
            },
        });
    };
}

class ValidationExample {
    @validate(ValueExample1, "id")
    public propValueExample1: any;

    @validate(ValueExample2, "booleanProp")
    public propValueExample2: any;
}
