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
    public name= "";

    protected value: T;
    /**взять значение из контрола */
    public abstract getValue(): T;
    /**установить значение в контрол */
    public abstract setValue(val: T): void;
}
/**Класс описывает TextBox контрол */
class TextBox extends Control<string>{
    constructor(){
        super();
    }
    public getValue():string {
        if (this.value === undefined){
            throw new Error("TextBox: value is empty")
        } else {
            return this.value;
        }

    }
    public setValue(newValue: string){
        if (typeof newValue === "string"){
            this.value = newValue;
        } else {
            throw Error ("TextBox: invalid value for value property")
        }
    }

}
/**value контрола selectBox */
class SelectItem {
    public value: string;
    public id: number;
}

/**Класс описывает SelectBox контрол */
class SelectBox extends Control<SelectItem> {
    constructor(){
        super();
    }
    public getValue():SelectItem {
        if(this.value === undefined){
            throw new Error("SelectBox: value is empty")
        } else {

            return this.value;
        }
    }
    public setValue(newValue: SelectItem){
        if(newValue instanceof SelectItem){
            this.value = newValue;
        } else {
            throw new Error ("SelectBox: invalid new value for value property")
        }
        
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

    public register<T extends Control<any>>(type: new ()=>T) {
        this._collection.push({
            instance: new type(),
            type: type.name
        });
}

    public getInstance<T extends Control<any>>(type: new ()=>T): T {
        const controlInstance: Control<any> | undefined = this._collection.find(
            (item:Container) => item.type === type.name
            )?.instance;
        if(controlInstance !== undefined){
            return <T>controlInstance;
        } else {
            throw new Error (`Can't find ${type.name} instance`);
        }
        
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