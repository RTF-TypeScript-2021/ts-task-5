/** Задача 2
 * Ниже представлен код в котором, пропущены участки кода.
 * Требуется дописать участки кода так, чтобы программа компилировалась.
 * Использование типа any допустимо только в Control<any>.
 * Переопределенные методы getValue и setValue в классах TextBox и SelectBox должны
 * принимать и возвращать только свой результирующий тип (string и SelectItem)
 * Методы register и getInstance класса FactoryControl. Должны принимать и возвращать только те типы,
 * которые унаследованы от класса Control<T>.
 */

 abstract class Control<T> {
    public name = "";

    protected value: T;
    /**взять значение из контрола */
    public abstract getValue(): T;
    /**установить значение в контрол */
    public abstract setValue(val: T): void;
}
/**Класс описывает TextBox контрол */
class TextBox extends Control<string> {
    public getValue(): string {
        return this.value;
    }
    public setValue(val: string): void {
        this.value = val;
    }
}
/**value контрола selectBox */
class SelectItem {
    public value: string;
    public id: number;

    constructor(id: number, value: string) {
        this.value = value;
        this.id = id;
    }
}

/**Класс описывает SelectBox контрол */
class SelectBox extends Control<SelectItem> {
    public getValue(): SelectItem {
        return this.value;
    }
    public setValue(val: SelectItem): void {
        this.value.value = val.value;
        this.value.id = val.id;
    }
}

class Container {
    public instance: Control<any>;
    public type: string;

    constructor(instanse: Control<any>, type: string) {
        this.instance = instanse;
        this.type = type;
    }
}

/**Фабрика которая отвечает за создание экземпляров контролов */
class FactoryControl {
    /**Список соотношений тип - инстанс типа */
    private _collection: Array<Container>;
    constructor() {
        this._collection = [];
    }

    public register<T extends Control<any>>(type: new () => T) {
        this._collection.push(new Container(new type(), type.name));
    }

    public getInstance<T extends Control<any>>(type: new () => T): T {
        if (this.existType(type.name)) {
            return this._collection.find(x => x.type === type.name).instance as T;
        } else {
            throw Error(`Вы ещё не зарегистрировали тип ${type.name}`);
        }
    }

    private existType(type: string) {
        return this._collection.filter(g => g.type === type).length > 0;
    }
}

const factory = new FactoryControl();
factory.register(SelectBox);

const selectBoxInstance = factory.getInstance(SelectBox);

//selectBoxInstance.setValue("sdfsdf") // компилятор TS не пропускает
selectBoxInstance.setValue(new SelectItem(1, "бубубу")) // компилятор TS пропускает

factory.register(TextBox);

const textBoxInstance = factory.getInstance(TextBox);


textBoxInstance.setValue("sdfsdf") // компилятор TS пропускает
//textBoxInstance.setValue(new SelectItem(1, "бубубу")) // компилятор TS не пропускает