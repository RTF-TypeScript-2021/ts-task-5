abstract class Control<T> {
    public name: string;
    protected value: T;

    public abstract getValue(): T;

    public abstract setValue(val: T): void;
}

class TextBox extends Control<string> {
    public getValue(): string {
        return this.value;
    }

    public setValue(val: string): void {
        if (typeof val !== 'string') {
            throw new Error('Invalid argument');
        }
        this.value = val;
    }
}

class SelectItem {
    public value: string;
    public id: number;
}

class SelectBox extends Control<SelectItem> {
    public getValue(): SelectItem {
        return this.value;
    }
    
    public setValue(val: SelectItem): void {
        if (!(val instanceof SelectItem) || !val) {
            throw new Error('Invalid argument');
        }
        this.value = val;
    }
}

class Container {
    public instance: Control<any>;
    public type: string;

    constructor (instance: Control<any>, type: string) {
        this.instance = instance;
        this.type = type;
    }
}

class FactoryControl {
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
        }
        throw new Error(`There is no such instance of ${type.name}`);
    }

    private existType(type: string) {
        return this._collection.filter(g => g.type === type).length > 0;
    }
}

const factory = new FactoryControl();
factory.register(SelectBox);

const selectBoxInstance = factory.getInstance(SelectBox);

selectBoxInstance.setValue("sdfsdf"); // компилятор TS не пропускает
selectBoxInstance.setValue(new SelectItem()); // компилятор TS пропускает