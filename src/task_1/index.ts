function checkMail(target: object, propertyKey: string | symbol): any {
    let value: string;
    const descriptor: PropertyDescriptor = {
        set: (input: string) => {
            const regexp = (/(.+)@(.+)\.[ru,com]/);
            if (!regexp.test(input)) {
                throw new Error('Invalid email format');
            }
            console.log(`e-mail valid`);
            value = input;
        },
        get: () => value
    };

    return descriptor;
}

class Example {
    @checkMail
    public email: string;
}

const exampleInstance = new Example();
exampleInstance.email = "fkkldfjg"; // генерирует эксепшен
exampleInstance.email = "misha@mail.ru"; // выводит в консоль e-mail valid
