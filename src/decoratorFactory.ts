// Decorator Factory
// A decorator factory is a function that returns a decorator.

function Log(level: string) {
    return function (
        target: any,
        key: string,
        descriptor: PropertyDescriptor
    ) {
        const original = descriptor.value;

        descriptor.value = function (...args: any[]) {
            console.log("Level:", level);
            return original.apply(this, args);
        };

        return descriptor;
    };
}

class Service {

    @Log("Info") // Passing a parameter to the decorator
    save() {
        console.log("Saving data...");
    }
}

const a = new Service();
a.save();