---
title: JavaScript类型一把梭
excerpt: JavaScript中有5种基本类型，和N种由Object继承而来的引用类型；在引用类型中又存在着跟基本类型关系密切的基本包装类型。今天就来梳理一下JavaScript中的常见类型，更全面更详细的资料还是要翻看MDN或高级程序设计哦。
type: blog
location: Zhuzhou
author: Dolly
tags:
    - JavaScript
---
# 小记JavaScript中的引用类型

JavaScript中有5种基本类型，和N种由Object继承而来的引用类型（如Array，Date及RegExp等）；在引用类型中又存在着跟基本类型关系密切的基本包装类型。今天就来梳理一下JavaScript中的常见类型，更全面更详细的资料还是要翻看MDN或JavaScript高级程序设计哦。

## 基本类型

5种基本类型是指: String, Number, Boolean, Undefined and Null. 尝试`false instanceof Object === false`会发现它们并不是对象，因此不具备对象的特性：属性和方法。但是经常会看到`'helloworld'.length`的写法，没有属性，length是如何被调用的呢？这又跟基本包装类型相关。

### 创建

原则上是不推荐用构造函数显示创建，如`let a = new String('helloworld')`。因为这里的a并不是基本类型String，而是一个基本包装类型String的实例。正确的创造方式是：

```javascript
const a = 'helloworld' // do not a = new String('helloworld')
const b = 123 // do not b = new Number('123')
const c = false // do not c = new Boolean('false')
const d = null
const e = undefined
```

null和undefined的区别在于，null类似一个占位的空对象；而undefined更趋向于它的字面意思未定义。常见的应用场景为null用于初始化，而undefined作为未进行赋值时的默认值。

```javascript
let a = null // a在后期才会被赋值，因此先赋予一个空对象进行初始化
const b = Object.create(null) // {}
function test(a) {
  console.log(a)
}
test() // undefined
console.log(newValue) // undefined
```

### 基本包装类型

String、Number、Boolean三个基本类型有对应的基本包装类型。基本包装类型属于引用类型，继承于Object，可以定义属性和方法。基本包装类型很少会显示地创建：`let a = new String('hello')`。它一般用于在String、Number、Boolean三个基本类型调用方法时隐式地创建，进行数值计算或者实现某些功能后马上销毁：

```javascript
let a = 'hello'
let b = a.length

// 在后台发生了
let a = new String('hello')
let b = a.length
a = null
```

在a.length执行的瞬间，一个基本包装类型的实例在后台被创建，并调用该实例的length属性，使用完后又立即被销毁。

### 判断

判断基本类型用typeof，除了null，返回值皆为小写的类型值。该规则也适用于Object类型的实例。

```javascript
typeof false // 'boolean'
typeof 'hello' // 'string'
typeof 123 // 'number'
typeof undefined // 'undefined'
typeof {} // 'object'
typeof null // 'object'
```

基本类型的判断比较简单，除了null外，返回唯一字符串。但引用类型不能如此判断，因为它们都返回相同字符串，需要另外寻找判断方式。

```javascript
typeof [a] // 'object'
typeof {} // 'object'
typeof new Date() // 'object'
```



## 引用类型

常用的引用类型有：Object, Array, Date, RegExp, Function, String(基本包装类型), Number(基本包装类型), Boolean(基本包装类型), Window, Math等。

### Object

Object是所有引用类型的母体。创建的实例是最基础的对象。

#### 1. 构造

```javascript
// 构造函数
const a = new Object()
a.name = 'Hank'

// 字面量
const b = {
  name: 'Hank'
}
```

#### 2. 判读

常需要判断一个对象是否为一个plainObject：

```javascript
function isPlainObject(value) {
  return Object.prototype.toString.call(value) === '[object Object]'
}
```

### Array

JavaScript中的Array可以储存任意多种类型的变量，且长度也可自由调整。

#### 1. 构造

通过构造函数：

```javascript
const a = new Array()
const b = new Array(14) 
const c = new Array('啊','哦') 
```

通过字面量：

```javascript
const a = ['a','b','c']
```

#### 2. 判断

判断是不是数组

```javascript
Array.isArray(a)
```

用于判断语句，任何空对象（Array的实例也是对象）在条件判断时都显示出truthy。但空的字符串''，数字0仍会表现出falthy。

```javascript
const a = []
if (a) // truthy
if (a.length) // falthy
```

#### 3. 栈 - LIFO & 队列 - FIFO

push: 从后入		pop: 从后取

unshift: 从前入		shift: 从前取

循环push添加任务，执行任务时一个个pop实现执行栈；

循环push添加任务，执行任务时一个个unshift实现任务队列。

#### 4. 排序

`reverse()` ` sort()`无副作用，在原Array上做出改变。`sort()`的排序最好自定义排序函数，返回负值: 传入参数在数组中的位置不变；

返回正值: 传入参数在数组中的位置交换。

```javascript
Case 1:
let a = [3,2,1,4,6]

// 升序
a.sort((val1, val2) => {
  return val1 - val2
})

// 降序
a.sort((val1, val2) => {
  return val2 - val1
})

Case2: 
class Person {
  constructor(age, height, weight) {
    this.age = age
    this.height = height
    this.weight = weight
  }
}

const person1 = new Person(22, 172, 70)
const person2 = new Person(17, 169, 62)
const person3 = new Person(28, 177, 80)
let array = new Array(person1, person2, person3)

function helper(property, ascending) {
  return (val1, val2) => {
    if (ascending) {
      return val1[property] - val2[property]
    } else {
      return val2[property] - val1[property]
    }
  }
}
// 按年龄降序排
array.sort(helper(age, false))
// 按身法哦升序排
array.sort(helper(height, true))
```

#### 5. slice & splice

`slice`方法用于取子集，`splice`方法用于任意位置的删除或添加：

```javascript
//slice
let colors = [1,2,3,4,5];
alter(colors.slice(1)); //[2,3,4,5]
alter(colors.slice(1,3)); //[2,3]

//splice
let colors  = ["red","green","blue"];
let removed = colors.splice(0,1); // removed = ["red"], colors = ["green","blue"]

removed = colors.splice(1,0,"yellow","orange");
// removed = [], colors = ["green", "yellow","orange","blue"] yellow要变为序列1而不是在序列1后添加

removed = colors.splice(1,1,"red","purple");
//removde = ["yellow"], colors  = ["green","red","purple","orange","blue"]
```

#### 6. other methods

`indexOf()` & `lastIndexOf()` 

```javascript
/* 第二项表示开始查找的位置*/
let numbers = [1,3,4,6,3,2,1,4];
alert(numbers.indexOf(4)); // 2  
alert(numbers.indexOf(4,3)); // 7 means finding index of 4 starting from index 3 
alert(numbers.lastIndexOf(4)); //7
alert(numbers.lastIndexOf(4,1)); //2

// 没有查找到，返回-1
```

`every` 对数组中的每一项运行给定函数，如果该函数对每一项都返回 true，则返回 true，遇到false会提前终止，返回false。

`some` 对数组中的每一项运行给定函数，如果该函数对任一项返回 true，则返回 true。

### Date

#### 1. 创建

```javascript
const a = new Date() // 不传入参数直接创建现在的时间对象

// Date.parse()
const b = new Date('May 9, 1993') //等价于
const b = new Date(Date.parse('May 9, 1993')) //等价于
const b = new Date(Date.parse('5/9/1993'))

// Date.UTC() 顺序接收年月日，但月份从0开始
const c = new Date(1993,4,9) // 1993年5月9日, 等价于
const c = new Date(Date.UTC(1993,4,9))
```

#### 2. 判断

```javascript
const toString = Object.prototype.toString
function isPlainObject(value) {
  return toString.call(value) === '[object Date]'
}
```

#### 3. 时间戳

```javascript
// 静态方法
const a = Date.now()

// 实例方法
const b = new Date(1993, 4, 9)
const c = b.getTime()

// 实例方法优化
const d = +new Date()
```

### RegExp

#### 1. 创建

支持3个标志：

i - 大小写不敏感

g - 全局匹配

m - 多行匹配，到达末尾自动匹配下一行

字面量创建

```javascript
let a = /[\.\,\\]/gi
```

构造函数创建，传入字符串与标志，字符串中的特殊字符需要双重转义

```javascript
let a = new RegExp('[\\.\\,\\\]','gi')
```

#### 2. 实例方法

exec: 类似包装类型String的match方法，返回数组，数组第一项对应完整匹配项，数组后面索引分别对应不同的匹配组。

test: 返回Boolean基本类型。

### Function

#### 1. 函数声明 & 函数表达式

```javascript
/*函数声明*/
alert(dolly(1,2))
function dolly(value1,value2){
  return (value1+value2);
}

/*函数表达式*/
alert(dolly(1,2))
let dolly = function(value1,value2){ return (value1+value2);};
```

函数声明会自动进行提升(hoisting)，而函数表达式则不会。

每个函数都是Function类型的实例，而函数名是指向该对象的指针。理解起来与普通Object对象和Array对象没有什么不同，因此函数对象也可以具有属性和方法。

JavaScript较大的特色就是可以将函数名这个引用像其他变量一样传入其他的函数。

### 2. 函数的内部属性

函数的内部属性有`arguments`，`this`和`callee`，`callee`有助于消除紧密的耦合关系，将强耦合变为弱耦合，看一用递归写的阶乘的例子

```javascript
function Factorial(number){
  if (number <= 1) return 1;
  else return (number * Factorial(number-1));
}

let anotherFactorial = Factorial;
Factorial = function(){
  return 0;
};
```

这样会使得副本`anotherFactorial`也变得不可用，因为耦合关系过强，使用`callee`指向`arguments`对象的函数：

```javascript
function Factorial(number){
  if (number <= 1) return 1;
  else return (number * arguments.callee(number-1));
}

let anotherFactorial = Factorial;
Factorial = function(){
  return 0;
};
```

## 五、 基本包装类型

基本包装类型有`String  Boolean Number`三种

```javascript
let n1 = 24; //基本类型
let n2 = new Number(24); //基本包装类型 Object的继承类型
let n3 = Number("24"); //这里Number是转型函数,也是基本类型

alert(typeof n1); "number"
alert(typeof n2); "object"
alert(typeof n3); "number"
```

一般不用基本包装类型，因为容易产生误会：

```javascript
a = new Boolean(false);
b = true;
alert(a&&b) // true
```

**EOF.**

