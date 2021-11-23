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
    public setValue(val: Required<string>): void {
            this.value=val;
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
    public setValue(val: Required<SelectItem>): void {
        this.value=val;
    }


}

class ErrorBox extends Control<Error>{
    public getValue(): Error {
        throw new Error("Error of typesation");
    }
    public setValue(val: Error): void {
        throw new Error("Error of typesation");
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

    public register<T extends new ()=>Control<any>>(type: T):void {
        const cont = new Container();
        cont.instance = new type();
        cont.type=type.name;
        this._collection.push(cont);

}

public getInstance<T extends new() =>  Control<any>>(type: T): Control<any> {
    
    return this.existType(type.name) ? this._collection.find(x=>x.type===type.name)?.instance: new ErrorBox;
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