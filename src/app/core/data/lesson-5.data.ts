import { Lesson } from '../models/lesson.model';

export const LESSON_5: Lesson = {
    id: 'l5',
    title: 'Lección 5 – Programación Orientada a Objetos (POO)',
    practices: [
        {
            id: 'p41',
            title: 'Constructor Shorthand',
            theory: 'TypeScript ofrece una forma compacta de declarar propiedades y asignarlas desde el constructor: usando modificadores de acceso (`public`, `private`, `protected`) directamente en los parámetros del constructor. Esto elimina la necesidad de declarar las propiedades por separado y luego asignarlas con `this.prop = prop`. Es el patrón más usado en Angular y frameworks modernos.',
            goal: 'Dominar el shorthand del constructor para escribir clases limpias y concisas.',
            syntax: [
                'class Persona {\n  constructor(\n    public nombre: string,\n    private edad: number\n  ) {}\n}',
                '// Equivale a:\nclass Persona {\n  public nombre: string;\n  private edad: number;\n  constructor(nombre: string, edad: number) {\n    this.nombre = nombre;\n    this.edad = edad;\n  }\n}'
            ],
            description: 'Refactoriza la clase `Product` para usar el constructor shorthand. En vez de declarar las propiedades por separado y asignarlas manualmente, usa los modificadores de acceso directamente en los parámetros del constructor. `name` y `price` deben ser `public`, mientras que `sku` debe ser `private`.',
            initialCode: '// Refactoriza usando constructor shorthand\nclass Product {\n  public name: string;\n  public price: number;\n  private sku: string;\n\n  constructor(name: string, price: number, sku: string) {\n    this.name = name;\n    this.price = price;\n    this.sku = sku;\n  }\n\n  getInfo(): string {\n    return `${this.name} - $${this.price}`;\n  }\n}\n\nconst p = new Product("Laptop", 999, "LAP-001");\nconsole.log(p.getInfo());',
            solutionCode: '// Refactoriza usando constructor shorthand\nclass Product {\n  constructor(\n    public name: string,\n    public price: number,\n    private sku: string\n  ) {}\n\n  getInfo(): string {\n    return `${this.name} - $${this.price}`;\n  }\n}\n\nconst p = new Product("Laptop", 999, "LAP-001");\nconsole.log(p.getInfo());',
            validations: [
                {
                    pattern: 'constructor\\s*\\(\\s*(public|private|protected)\\s+name\\s*:\\s*string',
                    message: 'Debes usar el shorthand del constructor declarando `name` con un modificador de acceso directamente en los parámetros.'
                },
                {
                    pattern: 'public\\s+price\\s*:\\s*number',
                    message: 'Debes declarar `price` como `public` en los parámetros del constructor.'
                },
                {
                    pattern: 'private\\s+sku\\s*:\\s*string',
                    message: 'Debes declarar `sku` como `private` en los parámetros del constructor.'
                },
                {
                    pattern: 'this\\.name\\s*=\\s*name',
                    negate: true,
                    message: 'Elimina la asignación manual `this.name = name`. El shorthand lo hace automáticamente.'
                },
                {
                    pattern: 'this\\.price\\s*=\\s*price',
                    negate: true,
                    message: 'Elimina la asignación manual `this.price = price`. El shorthand lo hace automáticamente.'
                }
            ]
        },
        {
            id: 'p42',
            title: 'Getters y Setters',
            theory: 'Los accessors `get` y `set` permiten definir propiedades computadas que se comportan como propiedades normales pero ejecutan lógica interna. Un `getter` calcula un valor al acceder a la propiedad (sin paréntesis). Un `setter` valida o transforma el dato antes de asignarlo. Son fundamentales para encapsulación: expones una interfaz limpia mientras controlas internamente cómo se leen y escriben los datos.',
            goal: 'Usar getters y setters para crear propiedades computadas con validación y encapsulación.',
            syntax: [
                'class Circulo {\n  constructor(private _radio: number) {}\n\n  get area(): number {\n    return Math.PI * this._radio ** 2;\n  }\n\n  set radio(value: number) {\n    if (value > 0) this._radio = value;\n  }\n}'
            ],
            description: 'Completa la clase `Temperature` con un getter `fahrenheit` que convierta de Celsius a Fahrenheit (fórmula: `C * 9/5 + 32`). Agrega un setter `fahrenheit` que convierta de Fahrenheit a Celsius y lo almacene en `_celsius`. Agrega validación en el setter de `celsius` para no aceptar valores bajo -273.15 (cero absoluto).',
            initialCode: 'class Temperature {\n  constructor(private _celsius: number) {}\n\n  // Getter para celsius\n  get celsius(): number {\n    return this._celsius;\n  }\n\n  // Setter para celsius con validación (no menor a -273.15)\n  set celsius(value) {\n    // Agrega la validación y asignación\n  }\n\n  // Getter para fahrenheit (convierte de C a F)\n  // Fórmula: C * 9/5 + 32\n\n  // Setter para fahrenheit (convierte de F a C y almacena)\n  // Fórmula inversa: (F - 32) * 5/9\n\n}\n\nconst temp = new Temperature(100);\nconsole.log(temp.fahrenheit);\ntemp.fahrenheit = 32;\nconsole.log(temp.celsius);\ntemp.celsius = -300; // No debería cambiar\nconsole.log(temp.celsius);',
            solutionCode: 'class Temperature {\n  constructor(private _celsius: number) {}\n\n  // Getter para celsius\n  get celsius(): number {\n    return this._celsius;\n  }\n\n  // Setter para celsius con validación (no menor a -273.15)\n  set celsius(value: number) {\n    if (value >= -273.15) {\n      this._celsius = value;\n    }\n  }\n\n  // Getter para fahrenheit (convierte de C a F)\n  get fahrenheit(): number {\n    return this._celsius * 9 / 5 + 32;\n  }\n\n  // Setter para fahrenheit (convierte de F a C y almacena)\n  set fahrenheit(value: number) {\n    this._celsius = (value - 32) * 5 / 9;\n  }\n}\n\nconst temp = new Temperature(100);\nconsole.log(temp.fahrenheit);\ntemp.fahrenheit = 32;\nconsole.log(temp.celsius);\ntemp.celsius = -300; // No debería cambiar\nconsole.log(temp.celsius);',
            validations: [
                {
                    pattern: 'get\\s+fahrenheit\\s*\\(\\s*\\)\\s*:\\s*number',
                    message: 'Debes crear un `get fahrenheit()` que retorne `number`.'
                },
                {
                    pattern: 'set\\s+fahrenheit\\s*\\(\\s*value\\s*:\\s*number\\s*\\)',
                    message: 'Debes crear un `set fahrenheit(value: number)` para convertir de F a C.'
                },
                {
                    pattern: 'set\\s+celsius\\s*\\(\\s*value\\s*:\\s*number\\s*\\)',
                    message: 'El setter `celsius` debe tener el parámetro tipado como `number`.'
                },
                {
                    pattern: '-273\\.15',
                    message: 'Debes validar que el valor no sea menor a -273.15 (cero absoluto) en el setter de `celsius`.'
                },
                {
                    pattern: '9\\s*/\\s*5|1\\.8',
                    message: 'El getter `fahrenheit` debe usar la fórmula de conversión: `C * 9/5 + 32`.'
                }
            ]
        },
        {
            id: 'p43',
            title: 'Clases Abstractas',
            theory: 'Una clase abstracta (`abstract class`) es una clase que NO puede ser instanciada directamente. Sirve como plantilla o \"contrato parcial\" para las subclases que la extiendan. Puede tener métodos implementados (compartidos por todas las subclases) y métodos abstractos (que cada subclase DEBE implementar a su manera). A diferencia de las interfaces, las clases abstractas pueden tener lógica real.',
            goal: 'Crear clases abstractas que definan una estructura común obligatoria para todas las subclases.',
            syntax: [
                'abstract class Figura {\n  abstract area(): number;\n\n  describe(): string {\n    return `Área: ${this.area()}`;\n  }\n}',
                'class Cuadrado extends Figura {\n  constructor(private lado: number) { super(); }\n  area(): number { return this.lado ** 2; }\n}'
            ],
            description: 'Crea la clase abstracta `Shape` con el método abstracto `area(): number` y el método concreto `describe(): string` que retorne `"Forma: {nombre} | Área: {area}"`. Luego implementa las clases `Circle` y `Triangle` que extiendan `Shape`.',
            initialCode: '// Crea la clase abstracta Shape\n\n\n// Implementa Circle (extiende Shape)\nclass Circle {\n  constructor(private radius: number) {}\n\n  // Implementa area(): PI * radius^2\n\n}\n\n// Implementa Triangle (extiende Shape)\nclass Triangle {\n  constructor(\n    private base: number,\n    private height: number\n  ) {}\n\n  // Implementa area(): (base * height) / 2\n\n}\n\n// const s = new Shape("test"); // ❌ No se puede instanciar una clase abstracta\nconst c = new Circle(5);\nconst t = new Triangle(10, 6);\nconsole.log(c.describe());\nconsole.log(t.describe());',
            solutionCode: '// Crea la clase abstracta Shape\nabstract class Shape {\n  constructor(public name: string) {}\n\n  abstract area(): number;\n\n  describe(): string {\n    return `Forma: ${this.name} | Área: ${this.area()}`;\n  }\n}\n\n// Implementa Circle (extiende Shape)\nclass Circle extends Shape {\n  constructor(private radius: number) {\n    super("Círculo");\n  }\n\n  area(): number {\n    return Math.PI * this.radius ** 2;\n  }\n}\n\n// Implementa Triangle (extiende Shape)\nclass Triangle extends Shape {\n  constructor(\n    private base: number,\n    private height: number\n  ) {\n    super("Triángulo");\n  }\n\n  area(): number {\n    return (this.base * this.height) / 2;\n  }\n}\n\n// const s = new Shape("test"); // ❌ No se puede instanciar una clase abstracta\nconst c = new Circle(5);\nconst t = new Triangle(10, 6);\nconsole.log(c.describe());\nconsole.log(t.describe());',
            validations: [
                {
                    pattern: 'abstract\\s+class\\s+Shape',
                    message: 'Debes crear `Shape` como una clase abstracta usando `abstract class Shape`.'
                },
                {
                    pattern: 'abstract\\s+area\\s*\\(\\s*\\)\\s*:\\s*number',
                    message: 'Debes declarar `area()` como método abstracto con retorno `number`.'
                },
                {
                    pattern: 'class\\s+Circle\\s+extends\\s+Shape',
                    message: 'La clase `Circle` debe extender `Shape`.'
                },
                {
                    pattern: 'class\\s+Triangle\\s+extends\\s+Shape',
                    message: 'La clase `Triangle` debe extender `Shape`.'
                },
                {
                    pattern: 'super\\s*\\(',
                    message: 'Debes llamar a `super()` en el constructor de las subclases para invocar al constructor de `Shape`.'
                },
                {
                    pattern: 'describe\\s*\\(\\s*\\)\\s*:\\s*string',
                    message: 'El método `describe()` debe retornar `string`.'
                }
            ]
        },
        {
            id: 'p44',
            title: 'Propiedades y Métodos Estáticos',
            theory: 'Los miembros `static` pertenecen a la clase misma, NO a las instancias. Se acceden con `NombreClase.miembro` en lugar de `instancia.miembro`. Son ideales para: contadores de instancias, factory methods, constantes de clase, y funciones utilitarias que no necesitan datos de instancia. Es el equivalente TypeScript a las funciones \"de fábrica\" en otros lenguajes.',
            goal: 'Usar propiedades y métodos estáticos para implementar lógica a nivel de clase que no dependa de instancias.',
            syntax: [
                'class MathUtils {\n  static PI: number = 3.14159;\n  static circunferencia(r: number): number {\n    return 2 * MathUtils.PI * r;\n  }\n}',
                'console.log(MathUtils.PI); // 3.14159'
            ],
            description: 'Completa la clase `UserTracker` con una propiedad estática `count` que cuente cuántas instancias se han creado. Agrega un método estático `getCount()` que retorne el total. Cada vez que se crea una instancia, `count` debe incrementarse en el constructor. También agrega un factory method estático `createGuest()` que cree un usuario invitado.',
            initialCode: 'class UserTracker {\n  // Declara la propiedad estática count (inicializada en 0)\n\n  public name: string;\n  public role: string;\n\n  constructor(name: string, role: string) {\n    this.name = name;\n    this.role = role;\n    // Incrementa el contador estático\n  }\n\n  // Método estático getCount(): retorna el total de instancias\n\n\n  // Factory method estático: crea un usuario invitado\n  // static createGuest(): UserTracker\n\n}\n\nconst u1 = new UserTracker("Ana", "admin");\nconst u2 = new UserTracker("Luis", "editor");\nconst guest = UserTracker.createGuest();\n\nconsole.log(UserTracker.getCount());\nconsole.log(guest.name, guest.role);',
            solutionCode: 'class UserTracker {\n  // Declara la propiedad estática count (inicializada en 0)\n  static count: number = 0;\n\n  public name: string;\n  public role: string;\n\n  constructor(name: string, role: string) {\n    this.name = name;\n    this.role = role;\n    UserTracker.count++;\n  }\n\n  // Método estático getCount(): retorna el total de instancias\n  static getCount(): number {\n    return UserTracker.count;\n  }\n\n  // Factory method estático: crea un usuario invitado\n  static createGuest(): UserTracker {\n    return new UserTracker("Invitado", "guest");\n  }\n}\n\nconst u1 = new UserTracker("Ana", "admin");\nconst u2 = new UserTracker("Luis", "editor");\nconst guest = UserTracker.createGuest();\n\nconsole.log(UserTracker.getCount());\nconsole.log(guest.name, guest.role);',
            validations: [
                {
                    pattern: 'static\\s+count\\s*:\\s*number\\s*=\\s*0',
                    message: 'Debes declarar `static count: number = 0` como propiedad estática.'
                },
                {
                    pattern: 'UserTracker\\.count\\s*\\+\\+|UserTracker\\.count\\s*\\+=\\s*1|UserTracker\\.count\\s*=\\s*UserTracker\\.count\\s*\\+\\s*1',
                    message: 'Debes incrementar `UserTracker.count` en el constructor.'
                },
                {
                    pattern: 'static\\s+getCount\\s*\\(\\s*\\)\\s*:\\s*number',
                    message: 'Debes crear el método `static getCount(): number`.'
                },
                {
                    pattern: 'static\\s+createGuest\\s*\\(\\s*\\)\\s*:\\s*UserTracker',
                    message: 'Debes crear el factory method `static createGuest(): UserTracker`.'
                },
                {
                    pattern: 'new\\s+UserTracker\\s*\\(',
                    message: 'El factory method `createGuest` debe retornar una nueva instancia de `UserTracker`.'
                }
            ]
        },
        {
            id: 'p45',
            title: 'Patrón Singleton',
            theory: 'El Singleton es un patrón de diseño que garantiza que una clase tenga UNA SOLA instancia en toda la aplicación. Se implementa haciendo el constructor `private` (nadie puede usar `new` desde fuera) y exponiendo un método estático `getInstance()` que crea la instancia solo la primera vez y luego siempre retorna la misma. Es usado para: conexiones a BD, loggers, gestores de configuración, etc.',
            goal: 'Implementar el patrón Singleton completo con constructor privado y método de acceso estático.',
            syntax: [
                'class Database {\n  private static instance: Database;\n  private constructor() {}\n  static getInstance(): Database {\n    if (!Database.instance) {\n      Database.instance = new Database();\n    }\n    return Database.instance;\n  }\n}'
            ],
            description: 'Implementa el patrón Singleton en la clase `AppConfig`. El constructor debe ser privado, debe tener una propiedad estática privada `instance` para almacenar la única instancia, y un método estático `getInstance()` que retorne siempre la misma instancia. Agrega métodos `get` y `set` para manejar configuraciones en un diccionario interno.',
            initialCode: 'class AppConfig {\n  // Propiedad estática privada para almacenar la instancia\n\n  private settings: Record<string, string> = {};\n\n  // Haz el constructor privado\n  constructor() {}\n\n  // Método estático getInstance()\n\n\n  // Método set(key, value) para guardar configuraciones\n  set(key: string, value: string): void {\n    this.settings[key] = value;\n  }\n\n  // Método get(key) para obtener una configuración\n  get(key: string): string | undefined {\n    return this.settings[key];\n  }\n}\n\nconst config1 = AppConfig.getInstance();\nconfig1.set("theme", "dark");\n\nconst config2 = AppConfig.getInstance();\nconsole.log(config2.get("theme"));\nconsole.log(config1 === config2);',
            solutionCode: 'class AppConfig {\n  // Propiedad estática privada para almacenar la instancia\n  private static instance: AppConfig;\n  private settings: Record<string, string> = {};\n\n  // Haz el constructor privado\n  private constructor() {}\n\n  // Método estático getInstance()\n  static getInstance(): AppConfig {\n    if (!AppConfig.instance) {\n      AppConfig.instance = new AppConfig();\n    }\n    return AppConfig.instance;\n  }\n\n  // Método set(key, value) para guardar configuraciones\n  set(key: string, value: string): void {\n    this.settings[key] = value;\n  }\n\n  // Método get(key) para obtener una configuración\n  get(key: string): string | undefined {\n    return this.settings[key];\n  }\n}\n\nconst config1 = AppConfig.getInstance();\nconfig1.set("theme", "dark");\n\nconst config2 = AppConfig.getInstance();\nconsole.log(config2.get("theme"));\nconsole.log(config1 === config2);',
            validations: [
                {
                    pattern: 'private\\s+static\\s+instance\\s*:\\s*AppConfig',
                    message: 'Debes declarar `private static instance: AppConfig` para almacenar la instancia única.'
                },
                {
                    pattern: 'private\\s+constructor\\s*\\(',
                    message: 'El constructor debe ser `private` para impedir instancias externas.'
                },
                {
                    pattern: 'static\\s+getInstance\\s*\\(\\s*\\)\\s*:\\s*AppConfig',
                    message: 'Debes crear `static getInstance(): AppConfig` como punto de acceso.'
                },
                {
                    pattern: '!AppConfig\\.instance|AppConfig\\.instance\\s*===\\s*(null|undefined)',
                    message: 'Dentro de `getInstance`, verifica si la instancia ya existe antes de crearla.'
                },
                {
                    pattern: 'AppConfig\\.instance\\s*=\\s*new\\s+AppConfig',
                    message: 'Debes crear la instancia con `AppConfig.instance = new AppConfig()` solo si no existe.'
                }
            ]
        },
        {
            id: 'p46',
            title: 'Polimorfismo',
            theory: 'El polimorfismo permite que objetos de diferentes clases respondan al mismo método de formas distintas. Si una clase padre define un método, las subclases pueden \"sobreescribirlo\" (override) con su propia implementación. Esto permite escribir código genérico que trabaje con el tipo base y automáticamente ejecute la versión correcta del método según el tipo real del objeto en ejecución.',
            goal: 'Implementar polimorfismo mediante la sobreescritura de métodos en una jerarquía de clases.',
            syntax: [
                'class Animal {\n  hablar(): string { return "..."; }\n}\nclass Perro extends Animal {\n  hablar(): string { return "¡Guau!"; }\n}\nclass Gato extends Animal {\n  hablar(): string { return "¡Miau!"; }\n}',
                '// Polimorfismo en acción:\nconst animales: Animal[] = [new Perro(), new Gato()];\nanimales.forEach(a => console.log(a.hablar()));'
            ],
            description: 'Crea la clase base `Notification` con el método `send(): string`. Luego crea las subclases `EmailNotification`, `SmsNotification` y `PushNotification`, cada una sobreescribiendo `send()` con su propia implementación. Finalmente, crea un array tipado como `Notification[]` con instancias de cada tipo y recórrelo.',
            initialCode: '// Clase base Notification\nclass Notification {\n  constructor(public message: string) {}\n\n  // Método que será sobreescrito\n  send(): string {\n    return `Notificación genérica: ${this.message}`;\n  }\n}\n\n// Crea EmailNotification que extienda Notification\n// send() debe retornar: "📧 Email enviado: {message}"\n\n\n// Crea SmsNotification que extienda Notification\n// send() debe retornar: "📱 SMS enviado: {message}"\n\n\n// Crea PushNotification que extienda Notification\n// send() debe retornar: "🔔 Push enviado: {message}"\n\n\n// Crea un array de Notification[] con los 3 tipos\n// y recórrelo llamando a send()\nconst notifications = [];\n\nnotifications.forEach(n => console.log(n.send()));',
            solutionCode: '// Clase base Notification\nclass Notification {\n  constructor(public message: string) {}\n\n  // Método que será sobreescrito\n  send(): string {\n    return `Notificación genérica: ${this.message}`;\n  }\n}\n\n// Crea EmailNotification que extienda Notification\nclass EmailNotification extends Notification {\n  send(): string {\n    return `📧 Email enviado: ${this.message}`;\n  }\n}\n\n// Crea SmsNotification que extienda Notification\nclass SmsNotification extends Notification {\n  send(): string {\n    return `📱 SMS enviado: ${this.message}`;\n  }\n}\n\n// Crea PushNotification que extienda Notification\nclass PushNotification extends Notification {\n  send(): string {\n    return `🔔 Push enviado: ${this.message}`;\n  }\n}\n\n// Crea un array de Notification[] con los 3 tipos\nconst notifications: Notification[] = [\n  new EmailNotification("Bienvenido"),\n  new SmsNotification("Código: 1234"),\n  new PushNotification("¡Nueva oferta!")\n];\n\nnotifications.forEach(n => console.log(n.send()));',
            validations: [
                {
                    pattern: 'class\\s+EmailNotification\\s+extends\\s+Notification',
                    message: 'Debes crear `EmailNotification` extendiendo `Notification`.'
                },
                {
                    pattern: 'class\\s+SmsNotification\\s+extends\\s+Notification',
                    message: 'Debes crear `SmsNotification` extendiendo `Notification`.'
                },
                {
                    pattern: 'class\\s+PushNotification\\s+extends\\s+Notification',
                    message: 'Debes crear `PushNotification` extendiendo `Notification`.'
                },
                {
                    pattern: 'const\\s+notifications\\s*:\\s*Notification\\s*\\[\\s*\\]',
                    message: 'Debes tipar el array `notifications` como `Notification[]`.'
                },
                {
                    pattern: 'new\\s+EmailNotification\\s*\\(',
                    message: 'Debes crear una instancia de `EmailNotification` en el array.'
                },
                {
                    pattern: 'new\\s+SmsNotification\\s*\\(',
                    message: 'Debes crear una instancia de `SmsNotification` en el array.'
                }
            ]
        },
        {
            id: 'p47',
            title: 'Composición vs Herencia',
            theory: 'En OOP clásica, se tiende a usar herencia para reutilizar código. Pero la composición ("tiene un" en vez de "es un") suele ser más flexible. Con composición, una clase contiene instancias de otras clases como propiedades en lugar de heredar de ellas. Esto evita jerarquías profundas y permite combinar comportamientos de forma modular. El principio es: "Prefiere composición sobre herencia".',
            goal: 'Aplicar composición para construir clases flexibles que combinen comportamientos mediante inyección de dependencias.',
            syntax: [
                '// Composición: "tiene un"\nclass Motor { encender(): string { return "Vruum"; } }\nclass Auto {\n  constructor(private motor: Motor) {}\n  arrancar(): string { return this.motor.encender(); }\n}'
            ],
            description: 'En vez de crear una jerarquía de herencia compleja, usa composición. Crea la clase `Engine` con `start(): string` y la clase `GPS` con `navigate(to: string): string`. Luego crea la clase `Car` que reciba ambas como dependencias en el constructor y las utilice en sus métodos `drive()` y `goTo(destination)`.',
            initialCode: '// Crea la clase Engine con método start(): string\nclass Engine {\n\n}\n\n// Crea la clase GPS con método navigate(to: string): string\nclass GPS {\n\n}\n\n// Crea Car usando composición (recibe Engine y GPS en el constructor)\nclass Car {\n  constructor(\n    // Inyecta las dependencias\n  ) {}\n\n  // drive() usa engine.start() y retorna un string\n  drive(): string {\n    return "";\n  }\n\n  // goTo(destination) usa gps.navigate() y retorna un string\n  goTo(destination: string): string {\n    return "";\n  }\n}\n\nconst engine = new Engine();\nconst gps = new GPS();\nconst car = new Car(engine, gps);\n\nconsole.log(car.drive());\nconsole.log(car.goTo("Centro Comercial"));',
            solutionCode: '// Crea la clase Engine con método start(): string\nclass Engine {\n  start(): string {\n    return "🔧 Motor encendido";\n  }\n}\n\n// Crea la clase GPS con método navigate(to: string): string\nclass GPS {\n  navigate(to: string): string {\n    return `📍 Navegando hacia: ${to}`;\n  }\n}\n\n// Crea Car usando composición (recibe Engine y GPS en el constructor)\nclass Car {\n  constructor(\n    private engine: Engine,\n    private gps: GPS\n  ) {}\n\n  // drive() usa engine.start() y retorna un string\n  drive(): string {\n    return this.engine.start();\n  }\n\n  // goTo(destination) usa gps.navigate() y retorna un string\n  goTo(destination: string): string {\n    return this.gps.navigate(destination);\n  }\n}\n\nconst engine = new Engine();\nconst gps = new GPS();\nconst car = new Car(engine, gps);\n\nconsole.log(car.drive());\nconsole.log(car.goTo("Centro Comercial"));',
            validations: [
                {
                    pattern: 'start\\s*\\(\\s*\\)\\s*:\\s*string',
                    message: 'La clase `Engine` debe tener el método `start(): string`.'
                },
                {
                    pattern: 'navigate\\s*\\(\\s*to\\s*:\\s*string\\s*\\)\\s*:\\s*string',
                    message: 'La clase `GPS` debe tener el método `navigate(to: string): string`.'
                },
                {
                    pattern: 'private\\s+engine\\s*:\\s*Engine',
                    message: 'Debes inyectar `Engine` como dependencia privada en el constructor de `Car`.'
                },
                {
                    pattern: 'private\\s+gps\\s*:\\s*GPS',
                    message: 'Debes inyectar `GPS` como dependencia privada en el constructor de `Car`.'
                },
                {
                    pattern: 'this\\.engine\\.start\\(\\)',
                    message: 'El método `drive()` debe usar `this.engine.start()` internamente.'
                },
                {
                    pattern: 'this\\.gps\\.navigate\\(',
                    message: 'El método `goTo()` debe usar `this.gps.navigate()` internamente.'
                }
            ]
        },
        {
            id: 'p48',
            title: 'Interfaces implementadas en Clases',
            theory: 'Cuando una clase usa `implements`, se compromete a cumplir con el contrato de la interface. A diferencia de `extends` (que hereda implementación), `implements` solo obliga a tener la forma correcta sin recibir código. Una clase puede implementar múltiples interfaces (`class A implements B, C { ... }`). Este patrón desacopla la definición del comportamiento de su implementación, permitiendo intercambiar implementaciones fácilmente.',
            goal: 'Usar `implements` para crear clases que cumplan contratos definidos por interfaces, permitiendo polimorfismo basado en interfaces.',
            syntax: [
                'interface Serializable {\n  serialize(): string;\n}\ninterface Loggable {\n  log(): void;\n}',
                'class User implements Serializable, Loggable {\n  serialize(): string { return JSON.stringify(this); }\n  log(): void { console.log(this); }\n}'
            ],
            description: 'Crea las interfaces `Storable` (con `save(): string` y `delete(): boolean`) y `Searchable` (con `search(query: string): string[]`). Luego crea la clase `ProductStore` que implemente ambas interfaces. Cada método debe tener una implementación funcional simple.',
            initialCode: '// Crea la interface Storable\n\n\n// Crea la interface Searchable\n\n\n// Crea ProductStore que implemente ambas interfaces\nclass ProductStore {\n  private products: string[] = ["Laptop", "Mouse", "Teclado", "Monitor"];\n\n  // Implementa save(): guarda un producto y retorna confirmación\n\n  // Implementa delete(): elimina el último producto\n\n  // Implementa search(): filtra productos que incluyan el query\n\n}\n\nconst store = new ProductStore();\nconsole.log(store.save());\nconsole.log(store.search("Mo"));\nconsole.log(store.delete());',
            solutionCode: '// Crea la interface Storable\ninterface Storable {\n  save(): string;\n  delete(): boolean;\n}\n\n// Crea la interface Searchable\ninterface Searchable {\n  search(query: string): string[];\n}\n\n// Crea ProductStore que implemente ambas interfaces\nclass ProductStore implements Storable, Searchable {\n  private products: string[] = ["Laptop", "Mouse", "Teclado", "Monitor"];\n\n  save(): string {\n    return `✅ ${this.products.length} productos guardados`;\n  }\n\n  delete(): boolean {\n    return this.products.pop() !== undefined;\n  }\n\n  search(query: string): string[] {\n    return this.products.filter(p => p.includes(query));\n  }\n}\n\nconst store = new ProductStore();\nconsole.log(store.save());\nconsole.log(store.search("Mo"));\nconsole.log(store.delete());',
            validations: [
                {
                    pattern: 'interface\\s+Storable\\s*\\{',
                    message: 'Debes crear la interface `Storable`.'
                },
                {
                    pattern: 'save\\s*\\(\\s*\\)\\s*:\\s*string',
                    message: 'La interface `Storable` debe tener el método `save(): string`.'
                },
                {
                    pattern: 'delete\\s*\\(\\s*\\)\\s*:\\s*boolean',
                    message: 'La interface `Storable` debe tener el método `delete(): boolean`.'
                },
                {
                    pattern: 'interface\\s+Searchable\\s*\\{',
                    message: 'Debes crear la interface `Searchable`.'
                },
                {
                    pattern: 'search\\s*\\(\\s*query\\s*:\\s*string\\s*\\)\\s*:\\s*string\\s*\\[\\s*\\]',
                    message: 'La interface `Searchable` debe tener `search(query: string): string[]`.'
                },
                {
                    pattern: 'class\\s+ProductStore\\s+implements\\s+Storable\\s*,\\s*Searchable',
                    message: 'La clase `ProductStore` debe implementar ambas interfaces: `implements Storable, Searchable`.'
                }
            ]
        },
        {
            id: 'p49',
            title: 'Clases Genéricas',
            theory: 'Las clases genéricas permiten crear estructuras de datos reutilizables que funcionan con cualquier tipo. Al usar `class MiClase<T>`, el tipo `T` actúa como un placeholder que se define al instanciar: `new MiClase<number>()`. Esto es la base de colecciones tipadas como `Array<T>`, `Map<K,V>`, `Set<T>`. Puedes combinar genéricos con restricciones (`extends`) para garantizar propiedades mínimas.',
            goal: 'Crear clases genéricas que funcionen con múltiples tipos manteniendo la seguridad de tipos completa.',
            syntax: [
                'class Caja<T> {\n  private contenido: T;\n  constructor(valor: T) { this.contenido = valor; }\n  obtener(): T { return this.contenido; }\n}',
                'const cajaNum = new Caja<number>(42);\nconst cajaStr = new Caja<string>("hola");'
            ],
            description: 'Crea la clase genérica `Stack<T>` que implemente una pila (LIFO: Last In, First Out). Debe tener: un array privado `items`, método `push(item: T)`, método `pop(): T | undefined`, método `peek(): T | undefined` (ver el tope sin sacarlo) y un getter `size` que retorne la cantidad de elementos.',
            initialCode: '// Crea la clase genérica Stack<T>\n\n\n\n\n\n\n\n\n// Prueba con números\nconst numberStack = new Stack<number>();\nnumberStack.push(10);\nnumberStack.push(20);\nnumberStack.push(30);\nconsole.log(numberStack.peek());\nconsole.log(numberStack.pop());\nconsole.log(numberStack.size);\n\n// Prueba con strings\nconst stringStack = new Stack<string>();\nstringStack.push("a");\nstringStack.push("b");\nconsole.log(stringStack.pop());\nconsole.log(stringStack.size);',
            solutionCode: '// Crea la clase genérica Stack<T>\nclass Stack<T> {\n  private items: T[] = [];\n\n  push(item: T): void {\n    this.items.push(item);\n  }\n\n  pop(): T | undefined {\n    return this.items.pop();\n  }\n\n  peek(): T | undefined {\n    return this.items[this.items.length - 1];\n  }\n\n  get size(): number {\n    return this.items.length;\n  }\n}\n\n// Prueba con números\nconst numberStack = new Stack<number>();\nnumberStack.push(10);\nnumberStack.push(20);\nnumberStack.push(30);\nconsole.log(numberStack.peek());\nconsole.log(numberStack.pop());\nconsole.log(numberStack.size);\n\n// Prueba con strings\nconst stringStack = new Stack<string>();\nstringStack.push("a");\nstringStack.push("b");\nconsole.log(stringStack.pop());\nconsole.log(stringStack.size);',
            validations: [
                {
                    pattern: 'class\\s+Stack\\s*<\\s*T\\s*>',
                    message: 'Debes crear la clase genérica `Stack<T>`.'
                },
                {
                    pattern: 'private\\s+items\\s*:\\s*T\\s*\\[\\s*\\]',
                    message: 'Debes declarar `private items: T[]` como almacenamiento interno.'
                },
                {
                    pattern: 'push\\s*\\(\\s*item\\s*:\\s*T\\s*\\)\\s*:\\s*void',
                    message: 'El método `push` debe recibir `item: T` y retornar `void`.'
                },
                {
                    pattern: 'pop\\s*\\(\\s*\\)\\s*:\\s*T\\s*\\|\\s*undefined',
                    message: 'El método `pop` debe retornar `T | undefined`.'
                },
                {
                    pattern: 'peek\\s*\\(\\s*\\)\\s*:\\s*T\\s*\\|\\s*undefined',
                    message: 'El método `peek` debe retornar `T | undefined`.'
                },
                {
                    pattern: 'get\\s+size\\s*\\(\\s*\\)\\s*:\\s*number',
                    message: 'Debes crear un getter `get size(): number`.'
                }
            ]
        },
        {
            id: 'p50',
            title: 'Proyecto Integrador: Sistema de Empleados',
            theory: 'En un proyecto real, combinas todos los conceptos de POO: clases abstractas para definir contratos base, herencia para especializar comportamientos, interfaces para definir capacidades, composición para inyectar dependencias, genéricos para crear código reutilizable, y encapsulación con modificadores de acceso. Este ejercicio integra todo en un mini-sistema de empleados.',
            goal: 'Integrar todos los conceptos de POO aprendidos en un sistema cohesivo que demuestre su uso práctico combinado.',
            syntax: [
                '// La clave es combinar:\n// ✅ abstract class (contrato base)\n// ✅ extends (herencia)\n// ✅ implements (interfaces)\n// ✅ public/private/protected (encapsulación)\n// ✅ static (lógica de clase)\n// ✅ getters (propiedades computadas)'
            ],
            description: 'Crea la clase abstracta `Employee` con propiedades `name` y `baseSalary`. Agrega un método abstracto `calculateBonus(): number` y un getter `totalCompensation` que sume salario + bonus. Crea la interface `Reportable` con `generateReport(): string`. Implementa `Developer` y `Manager` que extiendan `Employee` e implementen `Reportable`. Developer tiene bonus del 10% y Manager del 20%. Agrega un contador estático de empleados.',
            initialCode: '// Interface Reportable\n\n\n// Clase abstracta Employee\n\n\n// Clase Developer (extends Employee, implements Reportable)\n// Bonus: 10% del salario base\nclass Developer {\n\n}\n\n// Clase Manager (extends Employee, implements Reportable)\n// Bonus: 20% del salario base\nclass Manager {\n\n}\n\n// Prueba el sistema\nconst dev = new Developer("Ana", 70000, "TypeScript");\nconst mgr = new Manager("Carlos", 90000, "Engineering");\n\nconsole.log(dev.generateReport());\nconsole.log(mgr.generateReport());\nconsole.log(`Total: $${dev.totalCompensation}`);\nconsole.log(`Total: $${mgr.totalCompensation}`);\nconsole.log(`Empleados: ${Employee.count}`);',
            solutionCode: '// Interface Reportable\ninterface Reportable {\n  generateReport(): string;\n}\n\n// Clase abstracta Employee\nabstract class Employee {\n  static count: number = 0;\n\n  constructor(\n    public name: string,\n    protected baseSalary: number\n  ) {\n    Employee.count++;\n  }\n\n  abstract calculateBonus(): number;\n\n  get totalCompensation(): number {\n    return this.baseSalary + this.calculateBonus();\n  }\n}\n\n// Clase Developer (extends Employee, implements Reportable)\nclass Developer extends Employee implements Reportable {\n  constructor(name: string, baseSalary: number, private language: string) {\n    super(name, baseSalary);\n  }\n\n  calculateBonus(): number {\n    return this.baseSalary * 0.10;\n  }\n\n  generateReport(): string {\n    return `👨‍💻 ${this.name} | Dev ${this.language} | Salario: $${this.totalCompensation}`;\n  }\n}\n\n// Clase Manager (extends Employee, implements Reportable)\nclass Manager extends Employee implements Reportable {\n  constructor(name: string, baseSalary: number, private department: string) {\n    super(name, baseSalary);\n  }\n\n  calculateBonus(): number {\n    return this.baseSalary * 0.20;\n  }\n\n  generateReport(): string {\n    return `👔 ${this.name} | Mgr ${this.department} | Salario: $${this.totalCompensation}`;\n  }\n}\n\n// Prueba el sistema\nconst dev = new Developer("Ana", 70000, "TypeScript");\nconst mgr = new Manager("Carlos", 90000, "Engineering");\n\nconsole.log(dev.generateReport());\nconsole.log(mgr.generateReport());\nconsole.log(`Total: $${dev.totalCompensation}`);\nconsole.log(`Total: $${mgr.totalCompensation}`);\nconsole.log(`Empleados: ${Employee.count}`);',
            validations: [
                {
                    pattern: 'interface\\s+Reportable\\s*\\{',
                    message: 'Debes crear la interface `Reportable`.'
                },
                {
                    pattern: 'generateReport\\s*\\(\\s*\\)\\s*:\\s*string',
                    message: 'La interface `Reportable` debe tener `generateReport(): string`.'
                },
                {
                    pattern: 'abstract\\s+class\\s+Employee',
                    message: 'Debes crear `Employee` como clase abstracta.'
                },
                {
                    pattern: 'abstract\\s+calculateBonus\\s*\\(\\s*\\)\\s*:\\s*number',
                    message: 'Debes declarar `calculateBonus()` como método abstracto en `Employee`.'
                },
                {
                    pattern: 'get\\s+totalCompensation\\s*\\(\\s*\\)\\s*:\\s*number',
                    message: 'Debes crear el getter `totalCompensation` en `Employee`.'
                },
                {
                    pattern: 'class\\s+Developer\\s+extends\\s+Employee\\s+implements\\s+Reportable',
                    message: '`Developer` debe extender `Employee` e implementar `Reportable`.'
                },
                {
                    pattern: 'class\\s+Manager\\s+extends\\s+Employee\\s+implements\\s+Reportable',
                    message: '`Manager` debe extender `Employee` e implementar `Reportable`.'
                },
                {
                    pattern: 'static\\s+count\\s*:\\s*number',
                    message: 'Debes declarar `static count: number` en `Employee` para contar instancias.'
                }
            ]
        }
    ]
};
