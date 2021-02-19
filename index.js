/**
 * Implicit binding
 */
function implicitBinding() {
  function ask(question) {
    console.log(this.teacher, question)
  }
  
  const context1 = {
    teacher: 'Kyle',
    ask,
  }
  
  const context2 = {
    teacher: 'Bruno',
    ask,
  }
  
  context1.ask('Why?')
  context2.ask('Why?')
}
// uncomment to run
// implicitBinding()


/**
 * Explicity binding
 */
function explicityBinding() {
  function ask(question) {
    console.log(this.teacher, question)
  }
  
  const context1 = {
    teacher: 'Kyle',
    ask,
  }
  
  const context2 = {
    teacher: 'Bruno',
    ask,
  }
  ask.call(context1, 'Why?')
  ask.call(context2, 'Why?')
}
// uncomment to run
// explicityBinding()


/**
 * new keyword
 */
function newKeyword() {
  function ask(question) {
    console.log(this.teacher, question)
  }
  
  // Invokes a function and points `this` to a brand new empty object.
  const newEmptyObject = new ask('How does new work?')
}


/**
 * Class
 */
function classInheritance() {
  class Workshop {
    constructor(teacher) {
      this.teacher = teacher;
    }
  
    ask(question) {
      console.log(this.teacher, question)
    }
  }
  
  class AnotherWorkshop extends Workshop {
    // speakUp(msg) {
    //   this.ask(msg)
    // }
    ask(msg) {
      // Relative polymorphism
      super.ask(msg.toUpperCase())
    }
  }
  
  const prof1 = new Workshop('Bruno')
  const prof2 = new Workshop('Suzy')
  
  prof1.ask('why the sky is blue?')
  prof2.ask('whats the meaning of life?')
  
  const prof3 = new AnotherWorkshop('Kyle')
  // prof3.speakUp('Why am I so tall?')
  prof3.ask('Why am I so tall?')
}
// uncomment to run
// classInheritance()


/**
 * Prototype Chain
 */
function prototypeChain() {
  function Workshop(teacher) {
    this.teacher = teacher
  }
  
  Workshop.prototype.ask = function ask(question) {
    console.log(this.teacher, question)
  }
  
  const deepJS = new Workshop('Bruno')
  const react = new Workshop('Kyle')
  
  deepJS.ask('why the sky is blue')
  react.ask('whats the meaning of life?')
  console.log(deepJS.teacher)
}
// uncomment to run
// prototypeChain()

/**
 * Prototype Inheritance
 */
function prototypeInheritance() {
  function Workshop(teacher) {
    this.teacher = teacher
  }
  
  Workshop.prototype.ask = function ask(question) {
    console.log(this.teacher, question)
  }
  
  function AnotherWorkshop(teacher) {
    Workshop.call(this, teacher)
  }
  
  AnotherWorkshop.prototype = Object.create(Workshop.prototype)
  
  AnotherWorkshop.prototype.speakUp = function(msg) {
    this.ask(msg.toUpperCase())
  }
  
  const JSRecentParts = new AnotherWorkshop('Bruno')
  JSRecentParts.speakUp('is this inherirance?')
}
// uncomment to run
// prototypeInheritance()


/**
 * OLOO - Objects Linked to Other Objects (DELEGATION)
 */
function oloo() {
  const Workshop = {
    setTeacher(teacher) {
      this.teacher = teacher
    },
    ask(question) {
      console.log(this.teacher, question)
    }
  }
  
  const AnotherWorkshop = Object.assign(
    Object.create(Workshop),
    {
      speakUp(msg) {
        this.ask(msg.toUpperCase())
      }
    }
  )
  
  const JSRecentParts = Object.create(AnotherWorkshop)
  JSRecentParts.setTeacher('Bruno')
  JSRecentParts.speakUp('much cleaner, right?')
}
// uncomment to run
// oloo()


/**
 * Polyfill of Object.create (How it does all the work in the background)
 *
 */
if (!Object.create) {
  Object.create = function(o) {
    // 1. Makes an empty function
    function F() {}
    // 2. Sets the prototype to the passed object
    F.prototype = o
    // 3. Calls `new` on the newly created function
    return new F()
  }
}