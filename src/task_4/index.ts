/** Задача 4
 * Реализовать декоратор с шаблонным типом, который добавляется к полю класса.
 * Декоратор должен выполнять 2 функции:
 *        1) Проверять соответствие устанавливаемого значения типу, который передан в декоратор.
 *           Если тип не верный, то генерируется эксепшен.
 *        2) Проверять у передаваемого объекта наличие заполненного поля.
 *           Если поле не заполнено, то генерируется эксепшен.
 */

export class ValueExample1 {
    public value: string;
    public id: number;

    public constructor(value?: string, id?: number) {
        this.value = value;
        this.id = id;
    }
}

export class ValueExample2 {
    public undefinedProp: undefined;
    public booleanProp: boolean;

    public constructor(undefinedProp?: undefined, booleanProp?: boolean) {
        this.undefinedProp = undefinedProp;
        this.booleanProp = booleanProp;
    }
}

function validate<T extends new () => { [key: string]: any }>(object: T, objectKey: string) {
    return (target: object, targetKey: string) => {
        let value: object = new object();

        Object.defineProperty(target, targetKey, {
            get: () => value,
            set: (newValue: object) => {
                if (typeof newValue === typeof value
                    && Object.entries(newValue).some(([key, value]) => key === objectKey && value)) {
                    value = newValue;
                } else {
                    throw new Error(`Поле не заполнено`);
                }
            }
        });
    }
}

export class ValidationExample {
    @validate(ValueExample1, "id")
    public propValueExample1: any;

    @validate(ValueExample2, "booleanProp")
    public propValueExample2: any;
}

