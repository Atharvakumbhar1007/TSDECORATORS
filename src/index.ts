function Logger(constructor: Function) {
    console.log("Class Created:", constructor.name);

    // Add a new method dynamically
    (constructor as any).prototype.raisedTo = function (a: number, b: number) {
        return a ** b;
    };
}

function Log(
    target: any,
    key: string,
    descriptor: PropertyDescriptor
) {
    const original = descriptor.value;

    descriptor.value = function (...args: any[]) {
        const result = original.apply(this, args);

        console.log(`${key}(${args.join(", ")}) = ${result}`);

        return result;
    };

    return descriptor;
}

@Logger
class User {

    @Log
    add(a: number, b: number) {
        return a + b;
    }

    @Log
    power(a: number, b: number) {
        return a ** b;
    }
}

// Create object
const u: any = new User();

console.log(u.add(10, 15));      // 25
console.log(u.raisedTo(2, 5));   // 32