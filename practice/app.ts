function Log(target: any, name?: string, descriptor?: PropertyDescriptor) {
  console.log(target, name, descriptor);
}

class DataStorage<T> {
  @Log
  static readonly STR: string = '';
  private readonly _data: Array<T> = [];

  addItem(item: T) {
    this.data.push(item);
  }

  @Log
  get data(): Array<T> {
    return this._data;
  }

  @Log
  removeItem(item: T) {
    this.data.splice(this.data.indexOf(item), 1);
  }

  getItems() {
    return [...this.data];
  }
}

const textStorage = new DataStorage<string>();
textStorage.addItem("Sai");
//textStorage.removeItem(5);

interface Person {
  name: string;
}

type MessageType = "warn" | "info" | "error";

interface LogMessage {
  message: string;
  type: MessageType;
}

const person: Readonly<Person> = { name: "Sai" };
//person = {name : "Malik"};

function Logger(target: Function) {
  console.log("Logging...");
  console.log(target);
}

function Logger2(target: Function) {
  console.log("Logging2...");
  console.log(target);
}

function Consoler<T extends LogMessage>(option: T) {
  console.log("LogMessage...")
  return function (target: Function) {
    console.log(`${option.type} : ${option.message}`);
    console.log(target);
  };
}

function Consoler2<T extends LogMessage>(option: T) {
  console.log("LogMessage2...")
  return function (target: Function) {
    console.log(`${option.type} : ${option.message}`);
    console.log(target);
  };
}

const LogOption: LogMessage = {
  message: "Class Logging",
  type: "info",
};

const LogOption2: LogMessage = {
  message: "Class Logging",
  type: "warn",
};

@Logger2
@Logger
@Consoler(LogOption)
@Consoler2(LogOption2)
class Person {
  name = "Max";
  constructor() {
    console.log("Creating person object...");
  }
}

const pers = new Person();
console.log(pers);
