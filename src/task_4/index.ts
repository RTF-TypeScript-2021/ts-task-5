/* eslint-disable @typescript-eslint/no-explicit-any */

import { getProperty } from "../task_3";

/** Задача 4
 * Реализовать декоратор с шаблонным типом, который добавляется к полю класса.
 * Декоратор должен выполнять 2 функции:
 * 		1) Проверять соответствие устанавливаемого значения типу, который передан в декоратор.
 * 		   Если тип не верный, то генерируется эксепшен.
 * 		2) Проверять у передаваемого объекта наличие заполненного поля.
 * 		   Если поле не заполнено, то генерируется эксепшен.
 */
 function validate<T>(type: new () => T, propertyName: keyof T) {
    return function<Z> (object: Z, propName: keyof Z) {  
        let val = getProperty(object, propName);              
        const setter = (value: Z[keyof Z] & T) => {           
            if (!(value instanceof type)) {
                throw new Error(`Поле ${propName as string} имеет неверный тип`);
            }
            if(value[propertyName] === undefined || value[propertyName] === null) {
                throw new Error(`Поле ${propertyName as string} поля ${propName as string} является пустым`)
            }
            
            val = value;
        }
        const getter = () => {
            return val;
        }
        
        Object.defineProperty(object, propName, {set: setter, get: getter, configurable: true});
    };
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

const a = new ValidationExample();
a.propValueExample1 = new ValueExample1('ff');
a.propValueExample2 = new ValueExample2(undefined, true);