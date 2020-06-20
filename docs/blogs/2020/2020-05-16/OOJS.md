---
title: 浅谈JavaScript面向对象编程
excerpt: 在这篇博客中，我将尝试梳理JS中的对象、构造函数（类）、类的实例化、原型链、原型式继承以及类在ES6中的表现形式.
type: blog
location: Guangzhou
author: Dolly
tags:
    - JavaScript
---
# 浅谈JavaScript面向对象编程

在这篇博客中，我将尝试梳理JS中的对象、构造函数（类）、类的实例化、原型链、原型式继承以及类在ES6中的表现形式.

## 对象基础

### 1. 对象字面量

对象是一个包含了数据（属性）及方法的集合。最直接创造对象的方式是通过对象字面量 - 即手动写出对象中的所有内容。一个简单的例子如下，我将写出“我”这个对象。this 指向了 dolly 这个对象。

```javascript
const dolly = {
  name: {
    last: "Zhang",
    first: "Dolly"
  },
  age: 27,
  interests: ["swimming","scuba-diving","climbing"],
  eat() {
    console.log(`${this.name.first} is eating food.`)
  }
}
```

### 2. 点表示法与括号表示法

可以用点表示法与括号表示法来访问对象中的属性及方法。但相比于括号表示法，点表示法有着一些局限性。点表示法只接受对象字面量的成员名字，而不接受变量。如：

```javascript
const dolly = {
  name: {
    first: "Dolly",
    last: "Zhang"
  }
}
const firstName = "Dolly"
console.log(dolly.name.firstName) // Undefined
console.log(dolly.name[firstName]) // "Dolly"
```

## 构造函数

构造函数是JS中实现“类”的最常用手段。构造函数与普通函数本质上无异。只是我们会通过构造函数来创建类的实例，所以为了区别，取了新的名称，并规定构造函数首字母大写。下面是一个构造函数的例子：

```javascript
function Person(first,last,age,gender) {
  this.name = {
    first, // ES6之后的写法，等价于 "first": first
    last
  }
  this.gender = gender
  this.age = age
  this.greeting = function() {
    console.log(`Hi, my name is ${this.name.first} ${this.name.last}`)
  }
}
```

我们可以通过构造函数来创建类的实例，这个过程称为类的实例化。而这个实例，就是一个对象。

```javascript
const person1 = new Person('Dolly','Zhang',27,'male')
const person2 = new Person('Vera','Guan',27,'female')
```

这遗留了一个问题，每创建一个实例对象，实例对象中的成员（属性及方法）就被新创造了一份（占用一份新的内存空间）。对于属性，我们是乐于看到的，因为每个对象名字、年龄、性别都与这个对象是强相关的。但对于方法，我们希望只创造一份。为了达到此目的，需要我们了解原型链。

## 对象的原型

JS被称为是基于原型的语言，因为每个对象都有其自己的原型对象。对象以其原型对象为模板，从原型对象那里继承属性及方法。原型对象也可能有其自己的原型。这样层层继承，被称为了原型链。

下方这张图完美解释了对象、对象的原型、构造函数的关系。所有被Person实例化后的对象，都将继承于Person的原型对象，因此将方法定义在Person的原型上，这样创造的实例对象都将共用同一份方法。Person构造函数的prototype属性将指向其原型对象，其原型对象上的constructor属性又将指回构造函数。构造函数生成的实例中的[[prototype]]属性（在大多数浏览器中常用\_proto\_属性表示）也将指向原型对象。

![原型链](./1.png)

下面，可以用代码来梳理一下这张图：

```javascript
function Person(name,age,job) {
  this.name = name
  this.age = age
  this.job = job
}
Person.prototype.sayName = function(){
  console.log(`My name is ${this.name}`) //这里的this仍指向Person
}
const person1 = new Person('Dolly',27,'Engineer')
const person2 = new Person('Vera',27,'Audit')

console.log(person1._proto_ === person2._proto_) //true
console.log(person1.sayName === person2.sayName) //true
console.log(person1._proto_ === Person.prototype) //true
console.log(person1._proto_.constructor === Person) //true
```

原型链上溯的最顶端是Object构造函数的原型对象即Object.prototype。访问某个对象的成员，会在该对象中查找，然后沿着原型链向上查找，如果Object.prototype仍没有这个成员则返回undefined。

## 原型式的继承

### 1. 父类

```javascript
function Person(name,age,job) {
  this.name = name
  this.age = age
  this.job = job
}
Person.prototype.sayName = function(){
  console.log(`My name is ${this.name}`)
}
```

### 2. 子类

继承父类中的属性成员

```javascript
function Teacher(name,age,job){
  Person.call(this,name,age,job) // this指向了Teacher
  this.subject = ['Math','Chinese'] // 定义了新的属性
}
```

定义了Teacher这个构造函数后，这个构造器默认有一个空的原型对象。为了从父类中的原型对象中继承方法，我们需要让Teacher构造器的原型对象继承Person构造器的原型对象：

```javascript
Teacher.prototype = Object.create(Person.prototype)
```

但由于Teacher的生成方式（还是说Teacher.prototype的生成方式），导致了Teacher.prototype.constructor会指向Person而非Teacher，这会产生一些问题。因此还需要：

```javascript
Teacher.prototype.constructor = Teacher
```

### 3. 调用方法

```javascript
const teacher = new Teacher('dolly',27,'engineer')
teacher.greeting()
```

当调用teacher.greeting()时，浏览器会先在teacher下寻找，没发现，在teacher.\_proto\_上寻找，仍未发现，再去teacher.\_proto\_.\_proto\_上寻找（即Person.prototype上寻找），找到了，执行`console.log(`My name is ${this.name}`)`这里的this又指回当前的teacher对象。

若在teacher的原型上重新定义greeting方法，将“覆盖”原有的，其实并不是覆盖，而是新定义的方法比原来的在原型链上更靠前，会被先找到。

## ES6 中的语法糖

ES6中通过class来写类，通过extends来写子类，其实只是原型式继承的语法糖。

### 1. 类的写法

**通过类的声明**

```javascript
class Person {
  constructor(name,age,gender){
    this.name = name
    this.age = age
    this.gender = gender
  }
  greeting() {
    console.log(`Hi, My name is ${this.name}`)
  }
}
```

注意函数的声明可以发生提升（hoisted），而类的声明不行，因此类的声明要放在类的实例化之前。

**通过类的表达式**

```javascript
let Rectangle = class Rectangle2 {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
} // Rectangle2也可以省略，并未一个匿名类
```

类的主体中，默认的都是执行的严格模式，且在类中，只能拥有一个constructor。

### 2. 静态方法和字段声明

**静态方法**

```javascript
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    static distance(a, b) {
        const dx = a.x - b.x;
        const dy = a.y - b.y;

        return Math.hypot(dx, dy);
    }
}

const p1 = new Point(5, 5);
const p2 = new Point(10, 10);

console.log(Point.distance(p1, p2));
```

**字段声明**

又分为私有字段和公有字段，他们不需要通过constructor来初始化，而是直接定义。

```javascript
class Rectangle1 {
  height = 0;
  width;
  constructor(height, width) {    
    this.height = height;
    this.width = width;
  }
}

class Rectangle2 {
  #height = 0;
  #width;
  constructor(height, width) {    
    this.#height = height;
    this.#width = width;
  }
}

const rect1 = new Rectangle1()
rect1.height === 0 // true
// 而#height无法在外部进行访问。
```

### 3. 类的继承

```javascript
class Person {
  constructor(name,age,gender){
    this.name = name
    this.age = age
    this.gender = gender
  }
  greeting() {
    console.log(`Hi, My name is ${this.name}`)
  }
}

class Teacher extends Person {
  greeting() {
    super.greeting() //Hi, My name is ${this.name}
    console.log(`Hello, My name is ${this.name}`)
  }
}
```

EOF

