import "reflect-metadata";

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
    @validateClassProperty(ValueExample1, "id")
    public propValueExample1: ValueExample1 = new ValueExample1('2', 3); // fine on compile and on instance creating

    @validateClassProperty(ValueExample1, "id")
    public propValueExample2: ValueExample1 = new ValueExample1('2'); // throw on instance creating

    @validateClassProperty(ValueExample2, "booleanProp")
    public propValueExample3: ValueExample1; // throw on compile

    @validateClassProperty(ValueExample2, "booleanProp")
    public propValueExample4: any; // throw on compile
}

function validateClassProperty<T>(expectedType: new () => T, expectedToDefineKey: string): any {
    return function(parent: object, propertyKey: string): any {
        const propType = Reflect.getOwnMetadata('design:type', parent, propertyKey) as new () => T;
        /* брухич
            Немного запутался: почему я не могу получить тип переменных другого класса через рефлексию? Пробовал также передавать
            прототип класса и использовать другой метод Reflect.getMetadata(...), но всё так же. У меня есть только единственная догадка, 
            из-за чего это не получается: по причине того, что декоратор находится за пределами нужного класса. При попытке вызвать метод
            вне классов также не дало результатов. Пытался найти документацию, но никаких примеров с рефлексией класса за пределами
            декоратора не нашёл. Можете объяснить, пожалуйста?
            let otherPropType = Reflect.get(Own)Metadata('design:type', expectedType(.prototype), expectedToDefineKey); - undefined
        */
        if (propType !== expectedType) {
            throw new Error(`Invalid type of property '${propertyKey}' in '${parent.constructor.name}' class: '${propType.name}' \
            \nExpected: '${expectedType.name}'`);
        }

        let value: T;
        const descriptor: PropertyDescriptor = {
            set: (input: T) => {
                if (!Object.fromEntries(Object.entries(input))[expectedToDefineKey]) {
                    throw new Error(`Property '${expectedToDefineKey}' of '${propertyKey}' is undefined/null`);
                }
                if (!(input instanceof expectedType)) {
                    throw new Error(`Invalid set type, expected: ${expectedType.name}`);
                }
                value = input;
            },
            get: () => value
        };
        
        return descriptor;
    };
}

// throw in raw JS
// var exm = new ValidationExample();
// exm.propValueExample1 = "";
// exm.propValueExample1 = {id: 1};
// exm.propValueExample1 = ValueExample2(1, 1);
