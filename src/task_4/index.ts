/** Задача 4
 * Реализовать декоратор с шаблонным типом, который добавляется к полю класса.
 * Декоратор должен выполнять 2 функции:
 * 		1) Проверять соответствие устанавливаемого значения типу, который передан в декоратор.
 * 		   Если тип не верный, то генерируется эксепшен.
 * 		2) Проверять у передаваемого объекта наличие заполненного поля.
 * 		   Если поле не заполнено, то генерируется эксепшен.
 */

 function validate<T>(type: new (...args: any[]) => T, propertyName: keyof T) {
    /*Пометочка, type - конструктор, который возвращает экземпляр 
    T - собственно какой-то экземпляр
    PropertyName - свойство, может быть равно свойствам экземпляра T
    */
    return function<K>(target: K, propName: keyof K) {
        /*Тут получается все для того, чтобы propName было равно свойству из target
        а target = new ValidationExample(), тогда propName: propValueExample1 | propValueExample2
        */
       //Сохраним начальное значение
        let value:unknown = target[propName];

        Object.defineProperty(target, propName, {
            get: ()=>{
                return value;
            },
            set: (newValue: T) => {
                if (!(newValue instanceof type)) {
                    console.log(value);
                    throw new Error(
                        `unexpected type for ${propName.toString()}
                         expect instance of ${type.name}`
                        );
                }
                if(newValue[propertyName] === undefined) {
                    throw new Error(`property ${propertyName.toString()} is undefined`)
                }
                value = newValue;
            },
        });
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

const ve = new ValidationExample();
const ve1 = new ValueExample1("asdf", 123);
ve.propValueExample1 = ve1;
try {
    ve.propValueExample2 = ve1;
} catch (e){
    console.log("Ошибка")
    console.log(e)
}

try {
    ve.propValueExample1 = new ValueExample1("12qe");
} catch (e){
    console.log("Ошибка")
    console.log(e) 
}

try {
    ve.propValueExample2 = new ValueExample2(undefined);
} catch (e){
    console.log("Ошибка")
    console.log(e) 
}


