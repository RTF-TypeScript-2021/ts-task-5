/** Задача 2
 * Ниже представлен код в котором, пропущены участки кода.
 * Требуется дописать участки кода так, чтобы программа компилировалась.
 * Использование типа any допустимо только в Control<any>.
 * Переопределенные методы getValue и setValue в классах TextBox и SelectBox должны
 * принимать и возвращать только свой результирующий тип (string и SelectItem)
 * Методы register и getInstance класса FactoryControl. Должны принимать и возвращать только те типы,
 * которые унаследованы от класса Control<T>.
 */

/**Базовый класс для контролов */
abstract class Control<T> {
    public name: string = "";

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
}

/**Класс описывает SelectBox контрол */
class SelectBox extends Control<SelectItem> {
    public getValue(): SelectItem {
        return this.value;
    }

    public setValue(val: SelectItem): void {
        this.value = val;
    }
}

class Container {
    public type: string;
    public instance: Control<any>;

    constructor (type: string, instance: Control<any>) {
        this.type = type;
        this.instance = instance;
    }
}

/**Фабрика которая отвечает за создание экземпляров контролов */
class FactoryControl {
    /**Список соотношений тип - инстанс типа */
    private _collection: Array<Container>;

    constructor() {
        this._collection = [];
    }

    public register<T extends Control<any>>(type: new() => T) {
        const instance = new type();
        this._collection.push(new Container(typeof instance, instance));
    }

    public getInstance<T extends Control<any>>(type: new() => T): T {
        if (this.existType(typeof type)) {
            return this._collection.find(c => c.type === typeof type).instance.getValue();
        }
        throw new Error(`There is no such instance of class: ${type}`);
    }

    private existType<T extends Control<any>>(type: string) {
        return this._collection.filter(g => g.type === type).length > 0;
    }
}

const factory = new FactoryControl();
factory.register(SelectBox);
console.log(factory);
const selectBoxInstance = factory.getInstance(SelectBox);

//selectBoxInstance.setValue("sdfsdf") // компилятор TS не пропускает
selectBoxInstance.setValue(new SelectItem()) // компилятор TS пропускает