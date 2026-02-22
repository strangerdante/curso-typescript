import { Lesson } from '../models/lesson.model';

export const LESSON_2: Lesson = {
    id: 'l2',
    title: 'Lección 2 – Objetos, Arrays y Tipos Personalizados',
    practices: [
        {
            id: 'p6',
            title: 'Interfaces Básicas',
            theory: 'En la vida real, raramente usaremos simples variables o números. Usaremos objetos complejos (Usuarios, Productos). Las `interfaces` en TypeScript funcionan como un "contrato". Si tu variable está obligada a usar ese contrato, DEBE tener obligatoriamente todas las características definidas allí.',
            goal: 'Crear estructuras complejas para validar objetos y crear consistencia entre múltiples variables.',
            syntax: [
                'interface Persona { nombre: string; edad: number; }',
                'const yo: Persona = { nombre: "Bob", edad: 20 };'
            ],
            description: 'Crea una interface `Product` que asegure que todos los productos que creemos tienen un `id` numérico, `name` de tipo string y un `price` numérico. Luego utilízala para estructurar tu constante de laptop.',
            initialCode: '// Define la interface Product\n\nconst laptop = {\n  id: 1,\n  name: "MacBook Air",\n  price: 999\n};',
            solutionCode: '// Define la interface Product\ninterface Product {\n  id: number;\n  name: string;\n  price: number;\n}\n\nconst laptop: Product = {\n  id: 1,\n  name: "MacBook Air",\n  price: 999\n};',
            validations: [
                {
                    pattern: 'interface\\s+Product\\s*\\{',
                    message: 'Debes definir la interface `Product`.'
                },
                {
                    pattern: 'id\\s*:\\s*number',
                    message: 'La interface debe tener `id: number`.'
                },
                {
                    pattern: 'name\\s*:\\s*string',
                    message: 'La interface debe tener `name: string`.'
                },
                {
                    pattern: 'price\\s*:\\s*number',
                    message: 'La interface debe tener `price: number`.'
                },
                {
                    pattern: 'const\\s+laptop\\s*:\\s*Product\\s*=',
                    message: 'Debes tipar explícitamente la constante `laptop` como `Product`.'
                }
            ]
        },
        {
            id: 'p7',
            title: 'Propiedades Opcionales',
            theory: '¿Qué pasa si un objeto Product no tiene descuento en ese momento? ¿Cómo evitar un error si no se pasa el descuento? Si usas el signo de interrogación `?` tras la propiedad, TypeScript la interpretará como opcional (puede existir, o puede ser no definida / null).',
            goal: 'Saber modelar características y respuestas vacías que ocurren naturalmente en las bases de datos externas cuando no disponen de la información de forma forzosa.',
            syntax: [
                'interface Producto { precioFinal?: number; } // opcional'
            ],
            description: 'Añade una propiedad opcional `discount` (number) a la interface. Completa el segundo objeto `smartphone` incluyendo un descuento numérico usando nuevamente la interfaz `Product`.',
            initialCode: 'interface Product {\n  id: number;\n  name: string;\n  price: number;\n  // Añade un descuento opcional aquí (?)\n}\n\n// Usa el Product obligatoriamente para modelarlo\nconst smartphone1: Product = { \n  id: 2, \n  name: "iPhone", \n  price: 799 \n};\n\nconst smartphone2: Product = { \n  // Completa este objeto según la estructura general para un precio descontado.\n};',
            solutionCode: 'interface Product {\n  id: number;\n  name: string;\n  price: number;\n  discount?: number;\n}\n\n// Usa el Product obligatoriamente para modelarlo\nconst smartphone1: Product = { \n  id: 2, \n  name: "iPhone", \n  price: 799 \n};\n\nconst smartphone2: Product = { \n  id: 3,\n  name: "Samsung Galaxy",\n  price: 699,\n  discount: 50\n};',
            validations: [
                {
                    pattern: 'discount\\s*\\?\\s*:\\s*number',
                    message: 'Asegúrate de agregar la propiedad opcional `discount?: number` a la interface `Product`.'
                },
                {
                    pattern: 'const\\s+smartphone2\\s*:\\s*Product',
                    message: 'Debes mantener el tipado `Product` en la constante `smartphone2`.'
                },
                {
                    pattern: 'discount\\s*:\\s*\\d+',
                    message: 'Debes agregar y asignar un número a la propiedad `discount` en `smartphone2`.'
                }
            ]
        },
        {
            id: 'p8',
            title: 'Tipado de Arrays',
            theory: 'Agrupar múltiples elementos dentro de un Array es común mediante iteraciones `.map()` y `.reduce()`. El uso común en la sintaxis tipada es estructurar primero qué va adentro `interface Item` y de allí declarar un arreglo añadiendo `[]` al estilo del tipo o usando `Array<type>`.',
            goal: 'Declarar agrupaciones complejas de un solo tipo de elementos, protegiendo todo un grupo en vez de valor por valor de forma individual.',
            syntax: [
                'let puntuaciones: number[] = [10, 5, 20];',
                'let alumnos: Persona[] = [{..}, {..}];'
            ],
            description: 'Crea un array de `Product` y tipa correctamente la variable `inventory` añadiendo `Product[]`. Luego en la función `getTotalInventoryValue` especifica que los items que recibirás no son datos vacíos, sino de tu array tipado.',
            initialCode: 'interface Product {\n  name: string;\n  price: number;\n}\n\n// 1. Tipar como un array de elementos Product\nconst inventory = [\n  { name: "Mouse", price: 20 },\n  { name: "Teclado", price: 50 }\n];\n\n// 2. Tipar la estructura Array<Product> del parámetro "items"\nfunction getTotalInventoryValue(items) {\n  return items.reduce((total, item) => total + item.price, 0);\n}\n\nconsole.log(getTotalInventoryValue(inventory));',
            solutionCode: 'interface Product {\n  name: string;\n  price: number;\n}\n\n// 1. Tipar como un array de elementos Product\nconst inventory: Product[] = [\n  { name: "Mouse", price: 20 },\n  { name: "Teclado", price: 50 }\n];\n\n// 2. Tipar la estructura Array<Product> del parámetro "items"\nfunction getTotalInventoryValue(items: Product[]) {\n  return items.reduce((total, item) => total + item.price, 0);\n}\n\nconsole.log(getTotalInventoryValue(inventory));',
            validations: [
                {
                    pattern: 'const\\s+inventory\\s*:\\s*Product\\[\\]\\s*=',
                    message: 'Debes declarar el array tipándolo como `Product[]`.'
                },
                {
                    pattern: 'function\\s+getTotalInventoryValue\\s*\\(\\s*items\\s*:\\s*Product\\[\\]\\s*\\)',
                    message: 'Específica que el parámetro `items` es un array de productos (`Product[]`).'
                }
            ]
        },
        {
            id: 'p9',
            title: 'Unión de Tipos (Union Types)',
            theory: 'La sintaxis Union `|` nos permite que una variable albergue varios posibles "tipos" simultáneos (e.g., number o null). Aún más fuerte, podemos usarlo para validar los Literals (Textos exactos directos) para que un valor jamás asuma otra cadena de caracteres salvo las estipuladas. Esto evitará que escribas mal por accidente, o previene de falsos positivos introducidos por tus compañeros.',
            goal: 'Proteger un string de múltiples combinaciones erróneas o posibles valores genéricos que corrompan el flujo de la app.',
            syntax: [
                'type Tamanio = "pequeño" | "mediano" | "grande";'
            ],
            description: 'Define un tipo `Status` que solo pueda ser "pending", "shipped" o "delivered". Luego reemplaza a `paramStatus` de la función con este Union, para evitar que el compilador trague estados erróneos.',
            initialCode: '// Define el type Status con la sintaxis de unión\n\n\n// Cambia su tipo para evitar error en el cancelled inferior\nfunction updateOrderStatus(orderId: number, paramStatus) {\n  console.log(`Orden ${orderId} con estado: ${paramStatus}`);\n}\n\nupdateOrderStatus(123, "shipped");\nupdateOrderStatus(123, "cancelled");',
            solutionCode: '// Define el type Status con la sintaxis de unión\ntype Status = "pending" | "shipped" | "delivered";\n\n// Cambia su tipo para evitar error en el cancelled inferior\nfunction updateOrderStatus(orderId: number, paramStatus: Status) {\n  console.log(`Orden ${orderId} con estado: ${paramStatus}`);\n}\n\nupdateOrderStatus(123, "shipped");\n// updateOrderStatus(123, "cancelled"); // ❌ Error: "cancelled" no es un Status válido\n',
            validations: [
                {
                    pattern: 'type\\s+Status\\s*=\\s*["\']pending["\']\\s*\\|\\s*["\']shipped["\']\\s*\\|\\s*["\']delivered["\']',
                    message: 'Debes definir el tipo Status uniendo los literales "pending", "shipped" y "delivered".'
                },
                {
                    pattern: 'paramStatus\\s*:\\s*Status',
                    message: 'Debes tipar explícitamente a `paramStatus` como `Status`.'
                },
                {
                    pattern: 'cancelled',
                    negate: true,
                    message: 'Debes comentar o eliminar la orden de cambiar a "cancelled" porque esto no está permitido en tu tipo Status.'
                }
            ]
        },
        {
            id: 'p10',
            title: 'Type vs Interface: Intersecciones',
            theory: 'A diferencia de las interfases donde usas el comando `interface`, y se declaran bloques independientes... un `type` es una directriz libre sobre cualquier cosa que el compilador necesite retener. Mediante el uso de Uniones de Intersecciones (&) podemos fusionar dos tipos separados en un Super Tipo derivado conteniendo todos las variables en común y combinadas. Ideal para manejar combinatorias de permisos, variables compuestas, o DTOs.',
            goal: 'Fusionar diferentes contratos complejos de manera temporal en uno unificado y más potente para escenarios aislados.',
            syntax: [
                'type SuperHeroe = Humano & Mutante;'
            ],
            description: 'Combina el tipo `User` local y el `AdminPermissions` construyendo en una nueva instancia del concepto interseccionado mediante el comando (`&`). Finalmente crea un objeto que disponga lógicamente toda esa misma estructura alfanumérica.',
            initialCode: 'type User = {\n  id: number;\n  name: string;\n};\n\ntype AdminPermissions = {\n  canDeleteUsers: boolean;\n  canManageRoles: boolean;\n};\n\n// Escribe la nueva instancia a fusionar con &. Adm == User + AdminPerm...\n\n\n// Reemplázala en este objeto forzosamente\nconst admin1 = {\n  \n};',
            solutionCode: 'type User = {\n  id: number;\n  name: string;\n};\n\ntype AdminPermissions = {\n  canDeleteUsers: boolean;\n  canManageRoles: boolean;\n};\n\n// Escribe la nueva instancia a fusionar con &. Adm == User + AdminPerm...\ntype Admin = User & AdminPermissions;\n\n// Reemplázala en este objeto forzosamente\nconst admin1: Admin = {\n  id: 1,\n  name: "Carlos",\n  canDeleteUsers: true,\n  canManageRoles: false\n};',
            validations: [
                {
                    pattern: 'type\\s+Admin\\s*=\\s*User\\s*&\\s*AdminPermissions',
                    message: 'Debes crear el tipo `Admin` como la intersección de `User` y `AdminPermissions`.'
                },
                {
                    pattern: 'const\\s+admin1\\s*:\\s*Admin\\s*=',
                    message: 'Debes tipar const `admin1` como un objeto tipo `Admin`.'
                }
            ]
        },
        {
            id: 'p14',
            title: 'Propiedades Readonly',
            theory: 'El modificador `readonly` en TypeScript impide que una propiedad de un objeto sea modificada después de su creación. Esto es clave para proteger datos sensibles como IDs, fechas de creación, o configuraciones que no deben alterarse. A diferencia de `const` (que protege la variable), `readonly` protege la propiedad individual dentro de un objeto.',
            goal: 'Proteger propiedades críticas de objetos contra modificaciones accidentales usando `readonly`.',
            syntax: [
                'interface Config {\n  readonly apiKey: string;\n  timeout: number;\n}',
                '// config.apiKey = "otra"; ❌ Error'
            ],
            description: 'Modifica la interface `DatabaseConfig` para que las propiedades `host` y `port` sean de solo lectura (`readonly`), ya que no deben cambiar en tiempo de ejecución. La propiedad `maxConnections` sí puede cambiar. Luego comenta o elimina las líneas que intentan reasignar las propiedades protegidas.',
            initialCode: 'interface DatabaseConfig {\n  host: string;\n  port: number;\n  maxConnections: number;\n}\n\nconst dbConfig: DatabaseConfig = {\n  host: "localhost",\n  port: 5432,\n  maxConnections: 10\n};\n\n// ❌ Estas reasignaciones no deberían ser posibles\ndbConfig.host = "production-server";\ndbConfig.port = 3306;\n\n// ✅ Esta sí puede cambiar\ndbConfig.maxConnections = 20;',
            solutionCode: 'interface DatabaseConfig {\n  readonly host: string;\n  readonly port: number;\n  maxConnections: number;\n}\n\nconst dbConfig: DatabaseConfig = {\n  host: "localhost",\n  port: 5432,\n  maxConnections: 10\n};\n\n// ✅ Reasignaciones protegidas eliminadas\n// dbConfig.host = "production-server"; // ❌ Error: readonly\n// dbConfig.port = 3306; // ❌ Error: readonly\n\n// ✅ Esta sí puede cambiar\ndbConfig.maxConnections = 20;',
            validations: [
                {
                    pattern: 'readonly\\s+host\\s*:\\s*string',
                    message: 'Debes marcar `host` como `readonly` en la interface.'
                },
                {
                    pattern: 'readonly\\s+port\\s*:\\s*number',
                    message: 'Debes marcar `port` como `readonly` en la interface.'
                },
                {
                    pattern: 'dbConfig\\.host\\s*=',
                    negate: true,
                    message: 'Debes eliminar o comentar la reasignación de `dbConfig.host` ya que ahora es readonly.'
                },
                {
                    pattern: 'dbConfig\\.port\\s*=',
                    negate: true,
                    message: 'Debes eliminar o comentar la reasignación de `dbConfig.port` ya que ahora es readonly.'
                }
            ]
        },
        {
            id: 'p15',
            title: 'Tuplas Tipadas',
            theory: 'Las tuplas en TypeScript son arrays con un número fijo de elementos donde cada posición tiene un tipo específico. A diferencia de un array normal (`string[]`) donde todos los elementos comparten el mismo tipo, una tupla `[string, number]` obliga a que el primer elemento sea string y el segundo number. Son ideales para coordenadas, pares clave-valor, o respuestas con múltiples valores.',
            goal: 'Usar tuplas para representar colecciones ordenadas con tipos mixtos y posiciones fijas.',
            syntax: [
                'let coordenada: [number, number] = [10, 20];',
                'let usuario: [string, number, boolean] = ["Ana", 25, true];'
            ],
            description: 'Tipa correctamente las variables `coordinate`, `userRecord` y la función `getNameAndAge` como tuplas. `coordinate` debe ser un par de números, `userRecord` debe tener un string, un número y un boolean, y la función debe retornar una tupla `[string, number]`.',
            initialCode: '// Tipa estas variables como tuplas\nconst coordinate = [40.7128, -74.0060];\n\nconst userRecord = ["Laura", 30, true];\n\n// Tipa el retorno como tupla [string, number]\nfunction getNameAndAge(fullName, age) {\n  return [fullName, age];\n}\n\nconst result = getNameAndAge("Pedro", 22);\nconsole.log(result);',
            solutionCode: '// Tipa estas variables como tuplas\nconst coordinate: [number, number] = [40.7128, -74.0060];\n\nconst userRecord: [string, number, boolean] = ["Laura", 30, true];\n\n// Tipa el retorno como tupla [string, number]\nfunction getNameAndAge(fullName: string, age: number): [string, number] {\n  return [fullName, age];\n}\n\nconst result = getNameAndAge("Pedro", 22);\nconsole.log(result);',
            validations: [
                {
                    pattern: 'const\\s+coordinate\\s*:\\s*\\[\\s*number\\s*,\\s*number\\s*\\]\\s*=',
                    message: 'Debes tipar `coordinate` como una tupla `[number, number]`.'
                },
                {
                    pattern: 'const\\s+userRecord\\s*:\\s*\\[\\s*string\\s*,\\s*number\\s*,\\s*boolean\\s*\\]\\s*=',
                    message: 'Debes tipar `userRecord` como una tupla `[string, number, boolean]`.'
                },
                {
                    pattern: 'function\\s+getNameAndAge\\s*\\(\\s*fullName\\s*:\\s*string\\s*,\\s*age\\s*:\\s*number\\s*\\)',
                    message: 'Debes tipar los parámetros: `fullName: string` y `age: number`.'
                },
                {
                    pattern: 'function\\s+getNameAndAge(.*):\\s*\\[\\s*string\\s*,\\s*number\\s*\\]\\s*\\{',
                    message: 'Debes definir el tipo de retorno como tupla `[string, number]`.'
                }
            ]
        },
        {
            id: 'p16',
            title: 'Enumeraciones (Enums)',
            theory: 'Los `enum` en TypeScript permiten definir un conjunto de constantes con nombre. En lugar de usar números mágicos (`0, 1, 2`) o strings sueltos (`"admin"`, `"user"`), los enums agrupan valores relacionados bajo una estructura clara. Por defecto, los valores numéricos empiezan en 0, pero puedes asignar valores personalizados (numéricos o de texto).',
            goal: 'Usar enums para reemplazar valores mágicos y crear código más legible y mantenible.',
            syntax: [
                'enum Color { Rojo, Verde, Azul }',
                'enum Direction { Up = "UP", Down = "DOWN" }',
                'let miColor: Color = Color.Rojo;'
            ],
            description: 'Crea un `enum` llamado `HttpStatus` con los valores `Ok = 200`, `NotFound = 404` y `ServerError = 500`. Luego tipa la función `handleResponse` para que reciba un parámetro de tipo `HttpStatus` y reemplaza los números mágicos en las llamadas por los valores del enum.',
            initialCode: '// Crea el enum HttpStatus con los códigos HTTP\n\n\n// Tipa el parámetro "status" con tu enum\nfunction handleResponse(status) {\n  if (status === 200) {\n    console.log("Éxito");\n  } else if (status === 404) {\n    console.log("No encontrado");\n  } else if (status === 500) {\n    console.log("Error del servidor");\n  }\n}\n\n// Reemplaza los números por valores del enum\nhandleResponse(200);\nhandleResponse(404);',
            solutionCode: '// Crea el enum HttpStatus con los códigos HTTP\nenum HttpStatus {\n  Ok = 200,\n  NotFound = 404,\n  ServerError = 500\n}\n\n// Tipa el parámetro "status" con tu enum\nfunction handleResponse(status: HttpStatus) {\n  if (status === HttpStatus.Ok) {\n    console.log("Éxito");\n  } else if (status === HttpStatus.NotFound) {\n    console.log("No encontrado");\n  } else if (status === HttpStatus.ServerError) {\n    console.log("Error del servidor");\n  }\n}\n\n// Reemplaza los números por valores del enum\nhandleResponse(HttpStatus.Ok);\nhandleResponse(HttpStatus.NotFound);',
            validations: [
                {
                    pattern: 'enum\\s+HttpStatus\\s*\\{',
                    message: 'Debes crear el enum `HttpStatus`.'
                },
                {
                    pattern: 'Ok\\s*=\\s*200',
                    message: 'El enum debe tener `Ok = 200`.'
                },
                {
                    pattern: 'NotFound\\s*=\\s*404',
                    message: 'El enum debe tener `NotFound = 404`.'
                },
                {
                    pattern: 'ServerError\\s*=\\s*500',
                    message: 'El enum debe tener `ServerError = 500`.'
                },
                {
                    pattern: 'status\\s*:\\s*HttpStatus',
                    message: 'Debes tipar el parámetro `status` como `HttpStatus`.'
                },
                {
                    pattern: 'HttpStatus\\.Ok',
                    message: 'Debes usar `HttpStatus.Ok` en vez del número mágico 200.'
                },
                {
                    pattern: 'HttpStatus\\.NotFound',
                    message: 'Debes usar `HttpStatus.NotFound` en vez del número mágico 404.'
                }
            ]
        },
        {
            id: 'p35',
            title: 'Index Signatures',
            theory: 'Las Index Signatures permiten definir la forma de objetos con claves dinámicas cuyo nombre no conoces de antemano. La sintaxis `[key: string]: Type` indica que cualquier propiedad string tendrá un valor del tipo especificado. Son esenciales para diccionarios, traducciones, cachés, y cualquier objeto donde las claves se generan dinámicamente. Puedes combinarlas con propiedades fijas conocidas.',
            goal: 'Tipar objetos con propiedades dinámicas usando index signatures para mantener flexibilidad sin perder la seguridad de tipos.',
            syntax: [
                'interface Dict {\n  [key: string]: number;\n}',
                'interface FlexObj {\n  id: number; // propiedad fija\n  [key: string]: number; // dinámicas\n}'
            ],
            description: 'Crea la interface `TranslationDictionary` con una index signature que permita claves `string` con valores `string`. Luego crea `StudentGrades` que tenga una propiedad fija `studentName: string` y una index signature `[subject: string]: string | number` para las materias y calificaciones dinámicas. Tipa las constantes.',
            initialCode: '// Crea TranslationDictionary con index signature [key: string]: string\n\n\n// Tipa con TranslationDictionary\nconst translations = {\n  hello: "hola",\n  goodbye: "adiós",\n  thanks: "gracias",\n  please: "por favor"\n};\n\n// Crea StudentGrades con propiedad fija y index signature\n\n\n// Tipa con StudentGrades\nconst student1 = {\n  studentName: "Carlos",\n  math: 95,\n  science: 88,\n  history: 92\n};\n\nconsole.log(translations["hello"]);\nconsole.log(student1.studentName, student1["math"]);',
            solutionCode: '// Crea TranslationDictionary con index signature [key: string]: string\ninterface TranslationDictionary {\n  [key: string]: string;\n}\n\n// Tipa con TranslationDictionary\nconst translations: TranslationDictionary = {\n  hello: "hola",\n  goodbye: "adiós",\n  thanks: "gracias",\n  please: "por favor"\n};\n\n// Crea StudentGrades con propiedad fija y index signature\ninterface StudentGrades {\n  studentName: string;\n  [subject: string]: string | number;\n}\n\n// Tipa con StudentGrades\nconst student1: StudentGrades = {\n  studentName: "Carlos",\n  math: 95,\n  science: 88,\n  history: 92\n};\n\nconsole.log(translations["hello"]);\nconsole.log(student1.studentName, student1["math"]);',
            validations: [
                {
                    pattern: 'interface\\s+TranslationDictionary\\s*\\{',
                    message: 'Debes crear la interface `TranslationDictionary`.'
                },
                {
                    pattern: '\\[\\s*key\\s*:\\s*string\\s*\\]\\s*:\\s*string',
                    message: 'Debes agregar la index signature `[key: string]: string` dentro de `TranslationDictionary`.'
                },
                {
                    pattern: 'const\\s+translations\\s*:\\s*TranslationDictionary',
                    message: 'Debes tipar `translations` como `TranslationDictionary`.'
                },
                {
                    pattern: 'interface\\s+StudentGrades\\s*\\{',
                    message: 'Debes crear la interface `StudentGrades`.'
                },
                {
                    pattern: 'studentName\\s*:\\s*string',
                    message: 'Debes declarar la propiedad fija `studentName: string` en `StudentGrades`.'
                },
                {
                    pattern: 'const\\s+student1\\s*:\\s*StudentGrades',
                    message: 'Debes tipar `student1` como `StudentGrades`.'
                }
            ]
        },
        {
            id: 'p36',
            title: 'Extender Interfaces',
            theory: 'Las interfaces en TypeScript pueden extender otras usando `extends`, igual que la herencia en clases. La interface hija hereda todas las propiedades de la interface padre y puede agregar nuevas. Esto permite construir jerarquías de tipos reutilizables sin duplicar definiciones. Puedes extender múltiples interfaces a la vez separándolas con coma: `interface C extends A, B { ... }`.',
            goal: 'Usar `extends` para construir interfaces jerárquicas que reutilicen definiciones de tipos existentes.',
            syntax: [
                'interface Animal {\n  nombre: string;\n}',
                'interface Perro extends Animal {\n  raza: string;\n}',
                'interface Mascota extends Animal, Identificable {\n  dueño: string;\n}'
            ],
            description: 'Crea la interface `Employee` extendiendo `Person` para agregar `department` y `salary`. Luego crea `Manager` extendiendo `Employee` para agregar `teamSize` y un array `directReports`. Tipa las constantes con las interfaces correspondientes.',
            initialCode: 'interface Person {\n  name: string;\n  age: number;\n  email: string;\n}\n\n// Crea Employee extendiendo Person (agrega department y salary)\n\n\n// Crea Manager extendiendo Employee (agrega teamSize y directReports)\n\n\n// Tipa con Employee\nconst dev = {\n  name: "Laura",\n  age: 28,\n  email: "laura@company.com",\n  department: "Engineering",\n  salary: 75000\n};\n\n// Tipa con Manager\nconst mgr = {\n  name: "Roberto",\n  age: 35,\n  email: "roberto@company.com",\n  department: "Engineering",\n  salary: 95000,\n  teamSize: 8,\n  directReports: ["Laura", "Pedro", "Ana"]\n};\n\nconsole.log(`${mgr.name} manages ${mgr.teamSize} people`);',
            solutionCode: 'interface Person {\n  name: string;\n  age: number;\n  email: string;\n}\n\n// Crea Employee extendiendo Person (agrega department y salary)\ninterface Employee extends Person {\n  department: string;\n  salary: number;\n}\n\n// Crea Manager extendiendo Employee (agrega teamSize y directReports)\ninterface Manager extends Employee {\n  teamSize: number;\n  directReports: string[];\n}\n\n// Tipa con Employee\nconst dev: Employee = {\n  name: "Laura",\n  age: 28,\n  email: "laura@company.com",\n  department: "Engineering",\n  salary: 75000\n};\n\n// Tipa con Manager\nconst mgr: Manager = {\n  name: "Roberto",\n  age: 35,\n  email: "roberto@company.com",\n  department: "Engineering",\n  salary: 95000,\n  teamSize: 8,\n  directReports: ["Laura", "Pedro", "Ana"]\n};\n\nconsole.log(`${mgr.name} manages ${mgr.teamSize} people`);',
            validations: [
                {
                    pattern: 'interface\\s+Employee\\s+extends\\s+Person\\s*\\{',
                    message: 'Debes crear `Employee` extendiendo `Person` con `interface Employee extends Person`.'
                },
                {
                    pattern: 'department\\s*:\\s*string',
                    message: 'La interface `Employee` debe tener la propiedad `department: string`.'
                },
                {
                    pattern: 'salary\\s*:\\s*number',
                    message: 'La interface `Employee` debe tener la propiedad `salary: number`.'
                },
                {
                    pattern: 'interface\\s+Manager\\s+extends\\s+Employee\\s*\\{',
                    message: 'Debes crear `Manager` extendiendo `Employee` con `interface Manager extends Employee`.'
                },
                {
                    pattern: 'teamSize\\s*:\\s*number',
                    message: 'La interface `Manager` debe tener la propiedad `teamSize: number`.'
                },
                {
                    pattern: 'directReports\\s*:\\s*string\\s*\\[\\s*\\]',
                    message: 'La interface `Manager` debe tener `directReports: string[]`.'
                },
                {
                    pattern: 'const\\s+dev\\s*:\\s*Employee',
                    message: 'Debes tipar `dev` como `Employee`.'
                },
                {
                    pattern: 'const\\s+mgr\\s*:\\s*Manager',
                    message: 'Debes tipar `mgr` como `Manager`.'
                }
            ]
        }
    ]
};
