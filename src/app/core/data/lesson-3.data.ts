import { Lesson } from '../models/lesson.model';

export const LESSON_3: Lesson = {
    id: 'l3',
    title: 'Lección 3 – Funciones Avanzadas y Genéricos',
    practices: [
        {
            id: 'p17',
            title: 'Genéricos Básicos',
            theory: 'Los Genéricos (`<T>`) permiten crear funciones, clases e interfaces que trabajan con cualquier tipo sin perder la información del tipo. En vez de usar `any` (que elimina la protección), un genérico captura el tipo que el usuario pasa y lo mantiene durante toda la ejecución. Son como "variables de tipo": el tipo real se define al momento de usar la función.',
            goal: 'Crear funciones reutilizables que mantengan la seguridad de tipos sin repetir código para cada tipo específico.',
            syntax: [
                'function identidad<T>(valor: T): T { return valor; }',
                'const num = identidad<number>(42);',
                'const txt = identidad<string>("hola");'
            ],
            description: 'La función `wrapInArray` debe recibir un valor de cualquier tipo y retornar un array con ese valor. Usa un genérico `<T>` para que el tipo del array resultante siempre coincida con el tipo del valor recibido. Luego verifica que las llamadas inferiores funcionen correctamente.',
            initialCode: '// Convierte esta función para que use un genérico <T>\nfunction wrapInArray(value) {\n  return [value];\n}\n\n// Estas llamadas deben funcionar con tipos correctos\nconst numbers = wrapInArray(42);\nconst strings = wrapInArray("hello");\nconst booleans = wrapInArray(true);\n\nconsole.log(numbers, strings, booleans);',
            solutionCode: '// Convierte esta función para que use un genérico <T>\nfunction wrapInArray<T>(value: T): T[] {\n  return [value];\n}\n\n// Estas llamadas deben funcionar con tipos correctos\nconst numbers = wrapInArray(42);\nconst strings = wrapInArray("hello");\nconst booleans = wrapInArray(true);\n\nconsole.log(numbers, strings, booleans);',
            validations: [
                {
                    pattern: 'function\\s+wrapInArray\\s*<\\s*T\\s*>',
                    message: 'Debes declarar el genérico `<T>` en la función `wrapInArray`.'
                },
                {
                    pattern: 'value\\s*:\\s*T',
                    message: 'El parámetro `value` debe estar tipado como `T`.'
                },
                {
                    pattern: '\\)\\s*:\\s*T\\[\\]\\s*\\{',
                    message: 'El tipo de retorno debe ser `T[]` (array del tipo genérico).'
                }
            ]
        },
        {
            id: 'p18',
            title: 'Genéricos con Interfaces',
            theory: 'Los genéricos no solo funcionan con funciones. También puedes aplicarlos a interfaces para crear estructuras de datos flexibles. Un caso de uso muy común es la respuesta de una API: el "envoltorio" siempre tiene la misma estructura (`success`, `data`, `error`), pero el tipo de `data` cambia dependiendo del endpoint.',
            goal: 'Diseñar interfaces reutilizables que se adapten al tipo de datos que contendrán.',
            syntax: [
                'interface Caja<T> { contenido: T; }',
                'const cajaNum: Caja<number> = { contenido: 42 };',
                'const cajaStr: Caja<string> = { contenido: "hola" };'
            ],
            description: 'Crea una interface genérica `ApiResponse<T>` con las propiedades `success` (boolean), `data` (de tipo `T`) y `error` (string opcional). Luego tipa las constantes `userResponse` y `productsResponse` usando la interface con los tipos apropiados.',
            initialCode: '// Crea la interface genérica ApiResponse<T>\n\n\ninterface User {\n  id: number;\n  name: string;\n}\n\ninterface Product {\n  id: number;\n  title: string;\n  price: number;\n}\n\n// Tipa estas constantes con ApiResponse usando el tipo correcto\nconst userResponse = {\n  success: true,\n  data: { id: 1, name: "Carlos" },\n  error: undefined\n};\n\nconst productsResponse = {\n  success: true,\n  data: [{ id: 1, title: "Laptop", price: 999 }],\n  error: undefined\n};',
            solutionCode: '// Crea la interface genérica ApiResponse<T>\ninterface ApiResponse<T> {\n  success: boolean;\n  data: T;\n  error?: string;\n}\n\ninterface User {\n  id: number;\n  name: string;\n}\n\ninterface Product {\n  id: number;\n  title: string;\n  price: number;\n}\n\n// Tipa estas constantes con ApiResponse usando el tipo correcto\nconst userResponse: ApiResponse<User> = {\n  success: true,\n  data: { id: 1, name: "Carlos" },\n  error: undefined\n};\n\nconst productsResponse: ApiResponse<Product[]> = {\n  success: true,\n  data: [{ id: 1, title: "Laptop", price: 999 }],\n  error: undefined\n};',
            validations: [
                {
                    pattern: 'interface\\s+ApiResponse\\s*<\\s*T\\s*>\\s*\\{',
                    message: 'Debes crear la interface genérica `ApiResponse<T>`.'
                },
                {
                    pattern: 'data\\s*:\\s*T',
                    message: 'La propiedad `data` debe ser de tipo `T` dentro de la interface.'
                },
                {
                    pattern: 'success\\s*:\\s*boolean',
                    message: 'La propiedad `success` debe ser de tipo `boolean`.'
                },
                {
                    pattern: 'error\\s*\\?\\s*:\\s*string',
                    message: 'La propiedad `error` debe ser opcional de tipo `string`.'
                },
                {
                    pattern: 'const\\s+userResponse\\s*:\\s*ApiResponse\\s*<\\s*User\\s*>',
                    message: 'Debes tipar `userResponse` como `ApiResponse<User>`.'
                },
                {
                    pattern: 'const\\s+productsResponse\\s*:\\s*ApiResponse\\s*<\\s*Product\\[\\]\\s*>',
                    message: 'Debes tipar `productsResponse` como `ApiResponse<Product[]>`.'
                }
            ]
        },
        {
            id: 'p19',
            title: 'Type Guards con typeof',
            theory: 'Cuando una variable puede ser de varios tipos (Union Type), TypeScript no sabe cuál es su tipo real en tiempo de ejecución. Los Type Guards son comprobaciones en tiempo de ejecución (como `typeof`, `instanceof`, o `in`) que le dicen a TypeScript "dentro de este bloque, el tipo es X". Esto permite acceder a métodos específicos de cada tipo de forma segura.',
            goal: 'Usar `typeof` para reducir (narrowing) los tipos posibles de una variable y acceder a sus propiedades de forma segura.',
            syntax: [
                'function procesar(valor: string | number) {\n  if (typeof valor === "string") {\n    valor.toUpperCase(); // ✅ TypeScript sabe que es string\n  }\n}'
            ],
            description: 'Completa la función `formatValue` que recibe un parámetro de tipo `string | number | boolean`. Usa `typeof` para retornar: el string en mayúsculas si es string, el número multiplicado por 2 si es number, y "sí"/"no" si es boolean.',
            initialCode: '// Tipa el parámetro y el retorno. Usa typeof para cada caso.\nfunction formatValue(value) {\n  // Si es string → retorna en mayúsculas\n\n  // Si es number → retorna el doble\n\n  // Si es boolean → retorna "sí" o "no"\n\n}',
            solutionCode: '// Tipa el parámetro y el retorno. Usa typeof para cada caso.\nfunction formatValue(value: string | number | boolean): string | number {\n  if (typeof value === "string") {\n    return value.toUpperCase();\n  }\n  if (typeof value === "number") {\n    return value * 2;\n  }\n  return value ? "sí" : "no";\n}',
            validations: [
                {
                    pattern: 'value\\s*:\\s*string\\s*\\|\\s*number\\s*\\|\\s*boolean',
                    message: 'El parámetro `value` debe ser de tipo `string | number | boolean`.'
                },
                {
                    pattern: 'typeof\\s+value\\s*===\\s*["\']string["\']',
                    message: 'Debes usar `typeof value === "string"` para verificar si es un string.'
                },
                {
                    pattern: 'typeof\\s+value\\s*===\\s*["\']number["\']',
                    message: 'Debes usar `typeof value === "number"` para verificar si es un número.'
                },
                {
                    pattern: '\\.toUpperCase\\(\\)',
                    message: 'Debes usar `.toUpperCase()` para convertir el string a mayúsculas.'
                }
            ]
        },
        {
            id: 'p20',
            title: 'Narrowing con Propiedad Discriminante',
            theory: 'Cuando trabajas con Union Types de objetos (e.g., `Circulo | Rectangulo`), puedes usar una propiedad común como "discriminante" para que TypeScript identifique qué tipo es. Al comprobar el valor de esa propiedad en un `if` o `switch`, TypeScript automáticamente reduce el tipo dentro del bloque. Esta técnica se llama "Discriminated Unions" y es muy usada en Redux, manejo de eventos, y respuestas de API.',
            goal: 'Utilizar una propiedad discriminante para diferenciar entre tipos de objetos en un Union Type.',
            syntax: [
                'type Perro = { tipo: "perro"; ladra: boolean };\ntype Gato = { tipo: "gato"; ronronea: boolean };\ntype Animal = Perro | Gato;'
            ],
            description: 'Completa la función `calculateArea` usando un `switch` sobre la propiedad `kind` para calcular el área de cada forma geométrica. Para el círculo usa `Math.PI * shape.radius ** 2` y para el rectángulo usa `shape.width * shape.height`.',
            initialCode: 'type Circle = {\n  kind: "circle";\n  radius: number;\n};\n\ntype Rectangle = {\n  kind: "rectangle";\n  width: number;\n  height: number;\n};\n\ntype Shape = Circle | Rectangle;\n\n// Tipa el parámetro y retorno. Usa switch sobre shape.kind\nfunction calculateArea(shape) {\n\n}\n\nconst c: Circle = { kind: "circle", radius: 5 };\nconst r: Rectangle = { kind: "rectangle", width: 4, height: 6 };\nconsole.log(calculateArea(c));\nconsole.log(calculateArea(r));',
            solutionCode: 'type Circle = {\n  kind: "circle";\n  radius: number;\n};\n\ntype Rectangle = {\n  kind: "rectangle";\n  width: number;\n  height: number;\n};\n\ntype Shape = Circle | Rectangle;\n\n// Tipa el parámetro y retorno. Usa switch sobre shape.kind\nfunction calculateArea(shape: Shape): number {\n  switch (shape.kind) {\n    case "circle":\n      return Math.PI * shape.radius ** 2;\n    case "rectangle":\n      return shape.width * shape.height;\n  }\n}\n\nconst c: Circle = { kind: "circle", radius: 5 };\nconst r: Rectangle = { kind: "rectangle", width: 4, height: 6 };\nconsole.log(calculateArea(c));\nconsole.log(calculateArea(r));',
            validations: [
                {
                    pattern: 'shape\\s*:\\s*Shape',
                    message: 'Debes tipar el parámetro `shape` como `Shape`.'
                },
                {
                    pattern: '\\)\\s*:\\s*number',
                    message: 'El tipo de retorno debe ser `number`.'
                },
                {
                    pattern: 'switch\\s*\\(\\s*shape\\.kind\\s*\\)',
                    message: 'Debes usar `switch (shape.kind)` para discriminar entre los tipos.'
                },
                {
                    pattern: 'case\\s*["\']circle["\']',
                    message: 'Debes manejar el caso `"circle"` en el switch.'
                },
                {
                    pattern: 'case\\s*["\']rectangle["\']',
                    message: 'Debes manejar el caso `"rectangle"` en el switch.'
                }
            ]
        },
        {
            id: 'p21',
            title: 'Utility Types: Partial y Required',
            theory: '`Partial<T>` convierte todas las propiedades de un tipo en opcionales. Es perfecto para funciones de actualización donde solo envías los campos que cambiaron. `Required<T>` hace lo opuesto: convierte todas las propiedades (incluso las opcionales) en obligatorias. Ambos son "Utility Types" integrados en TypeScript que transforman tipos existentes sin necesidad de reescribirlos.',
            goal: 'Usar `Partial` y `Required` para crear variantes de tipos existentes según el contexto de uso.',
            syntax: [
                'Partial<User> // Todas las propiedades son opcionales',
                'Required<Config> // Todas las propiedades son obligatorias'
            ],
            description: 'Tipa el parámetro `updates` de la función `updateUser` como `Partial<User>` para permitir actualizaciones parciales. Luego tipa `completeConfig` usando `Required<AppConfig>` para forzar que todas las propiedades estén presentes.',
            initialCode: 'interface User {\n  id: number;\n  name: string;\n  email: string;\n}\n\ninterface AppConfig {\n  theme?: string;\n  language?: string;\n  notifications?: boolean;\n}\n\n// Tipa updates como Partial<User>\nfunction updateUser(user: User, updates): User {\n  return { ...user, ...updates };\n}\n\n// Tipa como Required<AppConfig> para forzar todas las propiedades\nconst completeConfig = {\n  theme: "dark",\n  language: "es",\n  notifications: true\n};\n\nconst user1: User = { id: 1, name: "Ana", email: "ana@mail.com" };\nconst updated = updateUser(user1, { name: "Ana María" });\nconsole.log(updated);',
            solutionCode: 'interface User {\n  id: number;\n  name: string;\n  email: string;\n}\n\ninterface AppConfig {\n  theme?: string;\n  language?: string;\n  notifications?: boolean;\n}\n\n// Tipa updates como Partial<User>\nfunction updateUser(user: User, updates: Partial<User>): User {\n  return { ...user, ...updates };\n}\n\n// Tipa como Required<AppConfig> para forzar todas las propiedades\nconst completeConfig: Required<AppConfig> = {\n  theme: "dark",\n  language: "es",\n  notifications: true\n};\n\nconst user1: User = { id: 1, name: "Ana", email: "ana@mail.com" };\nconst updated = updateUser(user1, { name: "Ana María" });\nconsole.log(updated);',
            validations: [
                {
                    pattern: 'updates\\s*:\\s*Partial\\s*<\\s*User\\s*>',
                    message: 'Debes tipar `updates` como `Partial<User>`.'
                },
                {
                    pattern: 'const\\s+completeConfig\\s*:\\s*Required\\s*<\\s*AppConfig\\s*>',
                    message: 'Debes tipar `completeConfig` como `Required<AppConfig>`.'
                }
            ]
        },
        {
            id: 'p22',
            title: 'Utility Types: Pick y Omit',
            theory: '`Pick<T, Keys>` crea un nuevo tipo seleccionando solo las propiedades especificadas del tipo original. `Omit<T, Keys>` crea un nuevo tipo excluyendo las propiedades especificadas. Son ideales para crear DTOs (Data Transfer Objects), vistas parciales, o formularios donde no necesitas todas las propiedades de una entidad completa.',
            goal: 'Seleccionar o excluir propiedades específicas de un tipo para crear subtipos más enfocados.',
            syntax: [
                'type UserPreview = Pick<User, "id" | "name">;',
                'type UserWithoutPassword = Omit<User, "password">;'
            ],
            description: 'Crea el tipo `ProductCard` usando `Pick` para seleccionar solo `name` y `price` de `Product`. Luego crea `PublicUser` usando `Omit` para excluir `password` y `email` de `FullUser`. Tipa las constantes correspondientes.',
            initialCode: 'interface Product {\n  id: number;\n  name: string;\n  price: number;\n  description: string;\n  stock: number;\n}\n\ninterface FullUser {\n  id: number;\n  name: string;\n  email: string;\n  password: string;\n  role: string;\n}\n\n// Crea ProductCard con Pick (solo name y price)\n\n\n// Crea PublicUser con Omit (sin password ni email)\n\n\nconst card = {\n  name: "Mouse Gamer",\n  price: 45\n};\n\nconst publicUser = {\n  id: 1,\n  name: "Laura",\n  role: "admin"\n};',
            solutionCode: 'interface Product {\n  id: number;\n  name: string;\n  price: number;\n  description: string;\n  stock: number;\n}\n\ninterface FullUser {\n  id: number;\n  name: string;\n  email: string;\n  password: string;\n  role: string;\n}\n\n// Crea ProductCard con Pick (solo name y price)\ntype ProductCard = Pick<Product, "name" | "price">;\n\n// Crea PublicUser con Omit (sin password ni email)\ntype PublicUser = Omit<FullUser, "password" | "email">;\n\nconst card: ProductCard = {\n  name: "Mouse Gamer",\n  price: 45\n};\n\nconst publicUser: PublicUser = {\n  id: 1,\n  name: "Laura",\n  role: "admin"\n};',
            validations: [
                {
                    pattern: 'type\\s+ProductCard\\s*=\\s*Pick\\s*<\\s*Product\\s*,',
                    message: 'Debes crear `ProductCard` usando `Pick<Product, ...>`.'
                },
                {
                    pattern: 'Pick\\s*<\\s*Product\\s*,\\s*["\']name["\']\\s*\\|\\s*["\']price["\']\\s*>',
                    message: 'Debes seleccionar las propiedades `"name"` y `"price"` con Pick.'
                },
                {
                    pattern: 'type\\s+PublicUser\\s*=\\s*Omit\\s*<\\s*FullUser\\s*,',
                    message: 'Debes crear `PublicUser` usando `Omit<FullUser, ...>`.'
                },
                {
                    pattern: 'Omit\\s*<\\s*FullUser\\s*,\\s*["\']password["\']\\s*\\|\\s*["\']email["\']\\s*>',
                    message: 'Debes excluir las propiedades `"password"` y `"email"` con Omit.'
                },
                {
                    pattern: 'const\\s+card\\s*:\\s*ProductCard',
                    message: 'Debes tipar `card` como `ProductCard`.'
                },
                {
                    pattern: 'const\\s+publicUser\\s*:\\s*PublicUser',
                    message: 'Debes tipar `publicUser` como `PublicUser`.'
                }
            ]
        },
        {
            id: 'p23',
            title: 'Clases Tipadas',
            theory: 'Las clases en TypeScript extienden las clases de JavaScript con tipado de propiedades, modificadores de acceso (`public`, `private`, `protected`) y tipado en el constructor. Las propiedades deben ser declaradas con su tipo antes de usarlas. Los modificadores controlan la visibilidad: `public` (accesible desde fuera), `private` (solo dentro de la clase), y `protected` (dentro de la clase y en subclases).',
            goal: 'Crear clases con propiedades tipadas y modificadores de acceso para encapsular la lógica de forma segura.',
            syntax: [
                'class Persona {\n  private nombre: string;\n  constructor(nombre: string) {\n    this.nombre = nombre;\n  }\n}'
            ],
            description: 'Completa la clase `BankAccount` añadiendo los tipos a las propiedades y al constructor. La propiedad `balance` debe ser `private` para que no se pueda modificar directamente desde fuera. Implementa los métodos `deposit` y `getBalance` con sus tipos correctos.',
            initialCode: 'class BankAccount {\n  // Declara las propiedades tipadas (owner public, balance private)\n\n  constructor(owner, initialBalance) {\n    // Asigna los valores\n  }\n\n  // Método para depositar (recibe amount numérico, no retorna nada)\n  deposit(amount) {\n    this.balance += amount;\n  }\n\n  // Método para consultar el balance (retorna number)\n  getBalance() {\n    return this.balance;\n  }\n}\n\nconst account = new BankAccount("Carlos", 1000);\naccount.deposit(500);\nconsole.log(account.getBalance());',
            solutionCode: 'class BankAccount {\n  // Declara las propiedades tipadas (owner public, balance private)\n  public owner: string;\n  private balance: number;\n\n  constructor(owner: string, initialBalance: number) {\n    this.owner = owner;\n    this.balance = initialBalance;\n  }\n\n  // Método para depositar (recibe amount numérico, no retorna nada)\n  deposit(amount: number): void {\n    this.balance += amount;\n  }\n\n  // Método para consultar el balance (retorna number)\n  getBalance(): number {\n    return this.balance;\n  }\n}\n\nconst account = new BankAccount("Carlos", 1000);\naccount.deposit(500);\nconsole.log(account.getBalance());',
            validations: [
                {
                    pattern: 'public\\s+owner\\s*:\\s*string',
                    message: 'Debes declarar `owner` como propiedad `public` de tipo `string`.'
                },
                {
                    pattern: 'private\\s+balance\\s*:\\s*number',
                    message: 'Debes declarar `balance` como propiedad `private` de tipo `number`.'
                },
                {
                    pattern: 'constructor\\s*\\(\\s*owner\\s*:\\s*string\\s*,\\s*initialBalance\\s*:\\s*number\\s*\\)',
                    message: 'Debes tipar los parámetros del constructor: `owner: string` e `initialBalance: number`.'
                },
                {
                    pattern: 'deposit\\s*\\(\\s*amount\\s*:\\s*number\\s*\\)\\s*:\\s*void',
                    message: 'El método `deposit` debe tener parámetro `amount: number` y retorno `void`.'
                },
                {
                    pattern: 'getBalance\\s*\\(\\s*\\)\\s*:\\s*number',
                    message: 'El método `getBalance` debe retornar `number`.'
                }
            ]
        },
        {
            id: 'p24',
            title: 'Clases con Herencia e Interfaces',
            theory: 'TypeScript permite que una clase `extends` otra (herencia) e `implements` una o más interfaces (contrato). Con `extends`, la subclase hereda todas las propiedades y métodos de la clase padre y puede sobrescribirlos. Con `implements`, la clase se compromete a tener todas las propiedades y métodos definidos en la interface. Puedes combinar ambos patrones para crear jerarquías de objetos robustas.',
            goal: 'Combinar herencia de clases con implementación de interfaces para crear arquitecturas orientadas a objetos tipadas.',
            syntax: [
                'interface Volador { volar(): void; }',
                'class Animal { nombre: string; }',
                'class Aguila extends Animal implements Volador {\n  volar() { console.log("volando"); }\n}'
            ],
            description: 'Crea la interface `Printable` con un método `print(): string`. Luego haz que la clase `Invoice` extienda de `Document` e implemente `Printable`. El método `print` debe retornar un string con el título y el monto de la factura usando template literals.',
            initialCode: 'class Document {\n  public title: string;\n  public date: string;\n\n  constructor(title: string, date: string) {\n    this.title = title;\n    this.date = date;\n  }\n}\n\n// Crea la interface Printable con el método print(): string\n\n\n// Haz que Invoice extienda Document e implemente Printable\nclass Invoice {\n  public amount: number;\n\n  constructor(title, date, amount) {\n    // Llama al constructor padre con super()\n    this.amount = amount;\n  }\n\n  // Implementa el método print\n}\n\nconst inv = new Invoice("Factura #001", "2026-02-22", 1500);\nconsole.log(inv.print());',
            solutionCode: 'class Document {\n  public title: string;\n  public date: string;\n\n  constructor(title: string, date: string) {\n    this.title = title;\n    this.date = date;\n  }\n}\n\n// Crea la interface Printable con el método print(): string\ninterface Printable {\n  print(): string;\n}\n\n// Haz que Invoice extienda Document e implemente Printable\nclass Invoice extends Document implements Printable {\n  public amount: number;\n\n  constructor(title: string, date: string, amount: number) {\n    super(title, date);\n    this.amount = amount;\n  }\n\n  // Implementa el método print\n  print(): string {\n    return `${this.title} - Monto: $${this.amount}`;\n  }\n}\n\nconst inv = new Invoice("Factura #001", "2026-02-22", 1500);\nconsole.log(inv.print());',
            validations: [
                {
                    pattern: 'interface\\s+Printable\\s*\\{',
                    message: 'Debes crear la interface `Printable`.'
                },
                {
                    pattern: 'print\\s*\\(\\s*\\)\\s*:\\s*string',
                    message: 'La interface `Printable` debe tener el método `print(): string`.'
                },
                {
                    pattern: 'class\\s+Invoice\\s+extends\\s+Document\\s+implements\\s+Printable',
                    message: 'La clase `Invoice` debe extender `Document` e implementar `Printable`.'
                },
                {
                    pattern: 'super\\s*\\(',
                    message: 'Debes llamar a `super()` en el constructor para invocar al constructor de `Document`.'
                },
                {
                    pattern: 'constructor\\s*\\(\\s*title\\s*:\\s*string\\s*,\\s*date\\s*:\\s*string\\s*,\\s*amount\\s*:\\s*number\\s*\\)',
                    message: 'Debes tipar los parámetros del constructor: `title: string`, `date: string`, `amount: number`.'
                }
            ]
        },
        {
            id: 'p37',
            title: 'Restricciones Genéricas (extends)',
            theory: 'A veces un genérico es demasiado abierto: `<T>` acepta cualquier tipo, pero tu función necesita acceder a una propiedad específica (como `.length`). Con `T extends Constraint` restringes qué tipos puede aceptar el genérico. Solo tipos que cumplan con el constraint serán válidos. Es como decir: "acepto cualquier tipo, SIEMPRE que tenga estas propiedades mínimas".',
            goal: 'Restringir los tipos genéricos para garantizar que tengan las propiedades necesarias usando `extends`.',
            syntax: [
                'function getLength<T extends { length: number }>(item: T): number {\n  return item.length;\n}',
                'interface HasId { id: number; }\nfunction findById<T extends HasId>(items: T[], id: number): T | undefined {\n  return items.find(item => item.id === id);\n}'
            ],
            description: 'Crea la función genérica `getProperty` que reciba un objeto `obj` de tipo `T` y una clave `key` de tipo `K`, donde `K extends keyof T`. La función debe retornar `T[K]`. Luego crea `mergeWithDefaults` con `T extends object` que combine un parcial con los defaults.',
            initialCode: 'interface User {\n  id: number;\n  name: string;\n  email: string;\n}\n\n// Crea getProperty con genéricos: T para el objeto, K extends keyof T para la clave\nfunction getProperty(obj, key) {\n  return obj[key];\n}\n\n// Crea mergeWithDefaults con T extends object\nfunction mergeWithDefaults(defaults, partial) {\n  return { ...defaults, ...partial };\n}\n\nconst user: User = { id: 1, name: "Ana", email: "ana@mail.com" };\n\nconst name = getProperty(user, "name");\nconst id = getProperty(user, "id");\nconsole.log(name, id);\n\nconst config = mergeWithDefaults(\n  { theme: "light", lang: "en", debug: false },\n  { theme: "dark" }\n);\nconsole.log(config);',
            solutionCode: 'interface User {\n  id: number;\n  name: string;\n  email: string;\n}\n\n// Crea getProperty con genéricos: T para el objeto, K extends keyof T para la clave\nfunction getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {\n  return obj[key];\n}\n\n// Crea mergeWithDefaults con T extends object\nfunction mergeWithDefaults<T extends object>(defaults: T, partial: Partial<T>): T {\n  return { ...defaults, ...partial };\n}\n\nconst user: User = { id: 1, name: "Ana", email: "ana@mail.com" };\n\nconst name = getProperty(user, "name");\nconst id = getProperty(user, "id");\nconsole.log(name, id);\n\nconst config = mergeWithDefaults(\n  { theme: "light", lang: "en", debug: false },\n  { theme: "dark" }\n);\nconsole.log(config);',
            validations: [
                {
                    pattern: 'function\\s+getProperty\\s*<\\s*T\\s*,\\s*K\\s+extends\\s+keyof\\s+T\\s*>',
                    message: 'Debes declarar `getProperty` con genéricos `<T, K extends keyof T>`.'
                },
                {
                    pattern: 'obj\\s*:\\s*T\\s*,\\s*key\\s*:\\s*K',
                    message: 'Los parámetros deben ser `obj: T` y `key: K`.'
                },
                {
                    pattern: '\\)\\s*:\\s*T\\s*\\[\\s*K\\s*\\]',
                    message: 'El tipo de retorno de `getProperty` debe ser `T[K]`.'
                },
                {
                    pattern: 'function\\s+mergeWithDefaults\\s*<\\s*T\\s+extends\\s+object\\s*>',
                    message: 'Debes declarar `mergeWithDefaults` con `<T extends object>`.'
                },
                {
                    pattern: 'partial\\s*:\\s*Partial\\s*<\\s*T\\s*>',
                    message: 'El parámetro `partial` debe ser de tipo `Partial<T>`.'
                }
            ]
        },
        {
            id: 'p38',
            title: 'ReturnType y Parameters',
            theory: '`ReturnType<T>` extrae el tipo de retorno de una función. `Parameters<T>` extrae los tipos de los parámetros como una tupla. Ambos son Utility Types que trabajan sobre tipos de funciones, no sobre las funciones en sí. Son muy útiles cuando necesitas derivar tipos de funciones existentes sin duplicar manualmente sus firmas, especialmente al trabajar con librerías externas.',
            goal: 'Usar `ReturnType` y `Parameters` para extraer y reutilizar tipos de funciones existentes.',
            syntax: [
                'function crearUsuario(name: string, age: number) {\n  return { name, age, createdAt: new Date() };\n}',
                'type Usuario = ReturnType<typeof crearUsuario>;',
                'type Params = Parameters<typeof crearUsuario>; // [string, number]'
            ],
            description: 'Usa `ReturnType` para crear el tipo `CreateUserResult` basándote en la función `createUser`. Luego usa `Parameters` para crear `CreateUserParams`. Tipa las constantes y la función wrapper usando estos tipos derivados.',
            initialCode: 'function createUser(name: string, age: number, role: string) {\n  return {\n    id: Math.random(),\n    name,\n    age,\n    role,\n    createdAt: new Date()\n  };\n}\n\n// Crea CreateUserResult con ReturnType\n\n\n// Crea CreateUserParams con Parameters\n\n\n// Tipa con CreateUserResult\nconst user1 = createUser("Ana", 28, "admin");\n\n// Tipa con CreateUserParams\nconst params = ["Carlos", 32, "user"];\n\n// Tipa los parámetros y retorno de esta función wrapper\nfunction createAndLog(...args) {\n  const user = createUser(...args);\n  console.log(`Created: ${user.name}`);\n  return user;\n}\n\nconst user2 = createAndLog("María", 25, "editor");\nconsole.log(user2.createdAt);',
            solutionCode: 'function createUser(name: string, age: number, role: string) {\n  return {\n    id: Math.random(),\n    name,\n    age,\n    role,\n    createdAt: new Date()\n  };\n}\n\n// Crea CreateUserResult con ReturnType\ntype CreateUserResult = ReturnType<typeof createUser>;\n\n// Crea CreateUserParams con Parameters\ntype CreateUserParams = Parameters<typeof createUser>;\n\n// Tipa con CreateUserResult\nconst user1: CreateUserResult = createUser("Ana", 28, "admin");\n\n// Tipa con CreateUserParams\nconst params: CreateUserParams = ["Carlos", 32, "user"];\n\n// Tipa los parámetros y retorno de esta función wrapper\nfunction createAndLog(...args: CreateUserParams): CreateUserResult {\n  const user = createUser(...args);\n  console.log(`Created: ${user.name}`);\n  return user;\n}\n\nconst user2 = createAndLog("María", 25, "editor");\nconsole.log(user2.createdAt);',
            validations: [
                {
                    pattern: 'type\\s+CreateUserResult\\s*=\\s*ReturnType\\s*<\\s*typeof\\s+createUser\\s*>',
                    message: 'Debes crear `CreateUserResult` usando `ReturnType<typeof createUser>`.'
                },
                {
                    pattern: 'type\\s+CreateUserParams\\s*=\\s*Parameters\\s*<\\s*typeof\\s+createUser\\s*>',
                    message: 'Debes crear `CreateUserParams` usando `Parameters<typeof createUser>`.'
                },
                {
                    pattern: 'const\\s+user1\\s*:\\s*CreateUserResult',
                    message: 'Debes tipar `user1` como `CreateUserResult`.'
                },
                {
                    pattern: 'const\\s+params\\s*:\\s*CreateUserParams',
                    message: 'Debes tipar `params` como `CreateUserParams`.'
                },
                {
                    pattern: 'args\\s*:\\s*CreateUserParams',
                    message: 'Debes tipar los parámetros rest de `createAndLog` como `CreateUserParams`.'
                },
                {
                    pattern: '\\)\\s*:\\s*CreateUserResult\\s*\\{',
                    message: 'El tipo de retorno de `createAndLog` debe ser `CreateUserResult`.'
                }
            ]
        }
    ]
};
