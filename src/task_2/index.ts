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
    public name = "";

    protected value: T;
    /**взять значение из контрола */
    public abstract getValue(): T;
    /**установить значение в контрол */
    public abstract setValue(val: T): void;
}
/**Класс описывает TextBox контрол */
class TextBox extends Control<string> {
    getValue(): string {
        if (!this.value) {
            throw new Error("The value is not set")
        }
        
        return this.value;
    }
    
    setValue(val: string): void {
        if (!val) {
            throw Error("Wrong input argument");
        }
        
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
    getValue(): SelectItem {
        if (!this.value) {
            throw new Error("The value is not set")
        }
        
        return this.value;
    }
    
    setValue(val: SelectItem): void {
        if (!val) {
            throw Error("Wrong input argument");
        }
        
        this.value = val;
    }
}

class Container {
    public instance: Control<any>;
    public type: string;
}

/**Фабрика которая отвечает за создание экземпляров контролов */
class FactoryControl {
    /**Список соотношений тип - инстанс типа */
    private _collection: Array<Container>;

    constructor() {
        this._collection = [];
    }

    public register<T extends new () => Control<any>>(type: T) {
        const container: Container = {
            instance: new type,
            type: type.name
        }
        this._collection.push(container);
}

public getInstance<T extends new () => Control<any>>(type: T): Control<any> {
        if (this.existType(typeof type)) {
            return this._collection.find(x => x.type === typeof type).instance;
        } 
        
        throw new Error("Current instance didn't found");
    }

    private existType(type: string) {
    return this._collection.filter(g => g.type === type).length > 0;
}
}

const factory = new FactoryControl();
factory.register(SelectBox);

const selectBoxInstance = factory.getInstance(SelectBox);

selectBoxInstance.setValue("sdfsdf") // компилятор TS не пропускает
selectBoxInstance.setValue(new SelectItem()) // компилятор TS пропускает