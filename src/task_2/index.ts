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
    public abstract setValue(value: T): void;
}
/**Класс описывает TextBox контрол */
class TextBox extends Control<string> {
    public getValue(): string {
        return this.value;
    }

    public setValue(value: string): void {
        if (typeof value !== "string") {
            throw new Error("Non correct value");
        }
        this.value = value;
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
    
      public setValue(value: SelectItem): void {
        if (!("value" in value && "id" in value ) 
        || !(value instanceof SelectItem)) {
          throw new Error("Non correct value");
        }
        this.value = value;
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
        this._collection.push({instance: new type(), type: type.name });
    }

    public getInstance<T extends new () => Control<any>>(type: T): Control<any> {
        const instanceControl: Control<any> | undefined = this._collection.find((value) => value.type === type.name)?.instance;
        if (instanceControl === undefined) {
            throw new Error(`Нельзя найти инстанс ${type.name}`)
        }
        return instanceControl;
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