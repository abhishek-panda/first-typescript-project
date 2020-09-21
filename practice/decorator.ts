function bind(target: any, propertyName: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    const originalMethod = descriptor.value;
    const modifiedDescriptor : PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get(){
            return originalMethod.bind(this)
        }
    }
    return modifiedDescriptor;
}

function Singleton<T extends {new(...args: any[]): {}}>(target: T) {
    const OriginalClass = target
    return class extends OriginalClass {
        
        constructor(...args: any[]) {
            console.log("Creating")
            super();
        }
    }
}

class Printer {
    message = "This works!";

    @bind
    showMessage(msg?: string) {
        console.log(this.message, msg);
    }
}

const p = new Printer();
const p2 = new Printer();
p.showMessage("Sai")

const cb = p.showMessage

setTimeout(function() {
    cb("Sairam")
}, 1000);