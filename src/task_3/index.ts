function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

const x = {'m': 'value'};

console.log(getProperty(x, "m")); 