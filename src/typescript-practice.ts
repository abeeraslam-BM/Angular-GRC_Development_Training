//Exercise 1: Interface
interface Task {
id: number;
title: string;
completed: boolean;
priority: 'Low'|'Medium'|'High';
}
const t:Task={
    id:1,
    title:'Task 1',
    completed:false,
    priority:'Medium'
}

//Exercise 2: Generic Funciton
function first<T>(items: T[]): T {
return items[0];
}
const firstNumber = first([1, 2, 3]); // firstNumber is of type number
const firstString = first(['a', 'b', 'c']); // firstString is of type string

//Exercise 3: Enum 
enum Status{
    Todo,
    InProgress,
    Done
}
let es:Status = Status.InProgress;
console.log(es);              
console.log(Status.Done);   

//Exercise 4: Class with access modifiers
class Person {
  // name is a private member variable
  public constructor(private name: string) {}

  public getName(): string {
    return this.name;
  }
}

const person = new Person("Jane");
console.log(person.getName());


//Exercise 5: functions
function add(a: number, b: number): number {
  return a + b;
}
console.log(add(2, 3)); 