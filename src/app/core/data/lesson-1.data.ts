import { Lesson } from '../models/lesson.model';

export const LESSON_1: Lesson = {
    id: 'l1',
    title: 'Lección 1 – Fundamentos de TypeScript',
    practices: [
        {
            id: 'p1',
            title: 'Tipos Primitivos Básicos',
            theory: 'En TypeScript, los "tipos primitivos" son los bloques de construcción más básicos para los datos, heredados de JavaScript: string (texto), number (números), y boolean (verdadero/falso). Declarar explícitamente de qué tipo es una variable evita que cometas errores mezclando texto donde debería ir un número.',
            goal: 'Comprender la diferencia entre los tipos más básicos e introducirlos en la declaración de variables.',
            syntax: [
                'let nombre: string = "Juan";',
                'let edad: number = 25;',
                'let esEstudiante: boolean = true;'
            ],
            description: 'Define explícitamente los tipos de las variables `productName`, `price` y `isAvailable` para que TypeScript valide su contenido. Luego asigna un nuevo valor válido a cada variable respetando su tipo primitivo.',
            initialCode: '// Añade los tipos explícitos (: string, : number, : boolean)\nlet productName = "Laptop Pro";\nlet price = 1299.99;\nlet isAvailable = true;\n\n// Reasigna valores a las variables validando que no fallen en el tipo\nproductName = \nprice = \nisAvailable = \n',
            solutionCode: '// Añade los tipos explícitos (: string, : number, : boolean)\nlet productName: string = "Laptop Pro";\nlet price: number = 1299.99;\nlet isAvailable: boolean = true;\n\n// Reasigna valores a las variables validando que no fallen en el tipo\nproductName = "MacBook Air"\nprice = 999\nisAvailable = false\n',
            validations: [
                {
                    pattern: 'let\\s+productName\\s*:\\s*string\\s*=',
                    message: 'Debes definir explícitamente a `productName` como string.'
                },
                {
                    pattern: 'let\\s+price\\s*:\\s*number\\s*=',
                    message: 'Debes definir explícitamente a `price` como number.'
                },
                {
                    pattern: 'let\\s+isAvailable\\s*:\\s*boolean\\s*=',
                    message: 'Debes definir explícitamente a `isAvailable` como boolean.'
                },
                {
                    pattern: 'productName\\s*=\\s*["\'](.*)[\"\']',
                    message: 'Asegúrate de haber reasignado un nuevo string a `productName` usando comillas.'
                },
                {
                    pattern: 'price\\s*=\\s*\\d+',
                    message: 'Asegúrate de haber reasignado un nuevo number a `price`.'
                },
                {
                    pattern: 'isAvailable\\s*=\\s*(true|false)',
                    message: 'Asegúrate de haber reasignado true o false a `isAvailable`.'
                }
            ]
        },
        {
            id: 'p2',
            title: 'Funciones y Parámetros',
            theory: 'Las funciones son esenciales. En TypeScript, es vital tipar qué recibe tu función (los parámetros) y qué devuelve. Así, si pasas un parámetro incorrecto o si alguien espera recibir un string de tu función numéerica, el compilador alertará antes de ejecutar el programa.',
            goal: 'Asegurar la entrada y salida de datos estructurados al invocar funciones comunes.',
            syntax: [
                'function sumar(a: number, b: number): number { ... }'
            ],
            description: 'La función `calculateTotal` debe recibir dos parámetros numéricos (`price` y `taxRate`) y devolver un valor número explícito. Agrega los tipos a los parámetros y al valor de retorno de acuerdo con la sintaxis.',
            initialCode: '// Agrega los tipos correspondientes\nfunction calculateTotal(price, taxRate) {\n  return price + (price * taxRate);\n}\n\n// Llama a la función e imprime el resultado\nconst total = calculateTotal(100, 0.21);\nconsole.log(total);',
            solutionCode: '// Agrega los tipos correspondientes\nfunction calculateTotal(price: number, taxRate: number): number {\n  return price + (price * taxRate);\n}\n\n// Llama a la función e imprime el resultado\nconst total = calculateTotal(100, 0.21);\nconsole.log(total);',
            validations: [
                {
                    pattern: 'function\\s+calculateTotal\\s*\\(\\s*price\\s*:\\s*number\\s*,\\s*taxRate\\s*:\\s*number\\s*\\)',
                    message: 'Debes definir los parámetros `price` y `taxRate` como number.'
                },
                {
                    pattern: 'function\\s+calculateTotal(.*):\\s*number\\s*\\{',
                    message: 'Debes definir el tipo de retorno explícito de la función como number, antes de la llave de apertura {.'
                }
            ]
        },
        {
            id: 'p3',
            title: 'Inferencia de Tipos',
            theory: 'TypeScript es inteligente. Si asignas un valor directamente al declarar una variable (`let count = 10`), el lenguaje "infiere" que debes usar `number`, por lo tanto no es siempre obligatorio escribir el tipo explícito de forma manual. Sin embargo, no te permitirá mutarlo a otro tipo en el futuro.',
            goal: 'Entender cómo el compilador asume un tipo según su primer valor.',
            syntax: [
                'let x = 3; // inferido como number',
                'x = "tres"; // ❌ Error automático'
            ],
            description: 'Identifica el error en el siguiente código. La variable `count` es inicializada como número (inferencia), pero se le intenta asignar un string, rompiendo el tipado implícito de la variable. Corrige la segunda línea cambiando "diez" a un dato admisible.',
            initialCode: 'let count = 10; // TypeScript infiere que es de tipo number\n\n// ❌ Esto causará un error de tipo\ncount = "diez"; \n\n// ✅ Corrige la asignación usando un número valido.\n',
            solutionCode: 'let count = 10; // TypeScript infiere que es de tipo number\n\n// ✅ Corregido: asignamos un número válido\ncount = 20; \n\n// ✅ La asignación ahora respeta el tipo inferido.\n',
            validations: [
                {
                    pattern: 'count\\s*=\\s*\\d+',
                    message: 'Debes asignar un número válido a la variable count, por ejemplo: count = 10;'
                },
                {
                    pattern: 'count\\s*=\\s*["\']',
                    negate: true,
                    message: 'Debes eliminar o corregir la asignación que usa un texto (string). Cambia el string por un número.'
                }
            ]
        },
        {
            id: 'p4',
            title: 'El tipo "any" y sus peligros',
            theory: 'Cuando desconocemos el origen de un dato temporalmente, a veces tendemos a usar `any`. ¡Pero cuidado! `any` apaga la protección de TypeScript forzándolo a no verificar los tipos en absoluto. Evitar el `any` lo más posible evita futuros bugs de enrutamiento y acceso incorrecto de propiedades.',
            goal: 'Observar cómo usar ANY es perjudicial y anula la protección garantizada.',
            syntax: [
                'let peligroso: any = 4;',
                'peligroso.ejecutarInvento(); // ❌ Falla silenciosamente en ejecución, no al compilar'
            ],
            description: 'El tipo genérico `any` desactivó la validación. Cambia el tipo explícito de la variable `userData` por el tipo exacto y natural para que TypeScript te ayude a ver que un número no tiene método `.toUpperCase()` antes de que ocurra en el navegador.',
            initialCode: '// Reemplaza `any` con un valor primitivo seguro para la validación.\nlet userData: any = 42;\n\n// El método string al invocar fallará porque "42" es un número en ejecución.\n// Corrige esto logrando que typescript logre detectar el .toUpperCase() como error\nuserData.toUpperCase();',
            solutionCode: '// Reemplaza `any` con un valor primitivo seguro para la validación.\nlet userData: number = 42;\n\n// El método string al invocar fallará porque "42" es un número en ejecución.\n// ✅ Eliminamos la llamada a .toUpperCase() ya que number no tiene ese método.\n// userData.toUpperCase(); // ❌ Error detectado por TypeScript\n',
            validations: [
                {
                    pattern: 'let\\s+userData\\s*:\\s*number\\s*=',
                    message: 'Debes cambiar el tipo `any` de `userData` a `number`.'
                },
                {
                    pattern: '^(?!\\s*//).*userData\\.toUpperCase',
                    flags: 'gm',
                    negate: true,
                    message: 'Debes eliminar o comentar la llamada a `userData.toUpperCase()` que provoca el error.'
                }
            ]
        },
        {
            id: 'p5',
            title: 'Parámetros Opcionales y Por Defecto',
            theory: 'En ocasiones es cómodo invocar funciones sin pasarles todos los parámetros. Un parámetro puede tener un valor "por defecto" si no se le pasa nada en la función. Esto ayuda a la estructura modular y facilita el crecimiento de la app.',
            goal: 'Desacoplar la obligación estricta de enviar argumentos para funciones muy usadas y proveer valores estándar autocompletables.',
            syntax: [
                'function saludar(nombre: string, sufijo: string = "Sr."): string { ... }'
            ],
            description: 'A la función `greet` agrégale el valor por defecto: "Hola" para la variable `greeting`, logrando que la llamada con solo "Ana" trabaje y devuelva "Hola Ana". Configura el tipado adecuado de todo.',
            initialCode: '// Modifica los parámetros con un valor default "=" e indica que el retorno es una subcadena.\nfunction greet(name, greeting) {\n  return greeting + ", " + name + "!";\n}\n\nconsole.log(greet("Ana")); \nconsole.log(greet("Carlos", "Bienvenido"));',
            solutionCode: '// Modifica los parámetros con un valor default "=" e indica que el retorno es una subcadena.\nfunction greet(name: string, greeting: string = "Hola"): string {\n  return greeting + ", " + name + "!";\n}\n\nconsole.log(greet("Ana")); \nconsole.log(greet("Carlos", "Bienvenido"));',
            validations: [
                {
                    pattern: 'function\\s+greet\\s*\\(\\s*name\\s*:\\s*string\\s*,\\s*greeting\\s*:\\s*string\\s*=\\s*["\']Hola["\']\\s*\\)',
                    message: 'Asegúrate de tipar ambos parámetros como string y asignar un valor por defecto al greeting: greeting: string = "Hola"'
                },
                {
                    pattern: 'function\\s+greet(.*):\\s*string\\s*\\{',
                    message: 'Debes definir el tipo de retorno explícito de la función como string, antes de la llave de apertura {.'
                }
            ]
        },
        {
            id: 'p11',
            title: 'Constantes con const',
            theory: 'En TypeScript, `const` declara variables que no pueden ser reasignadas después de su inicialización. A diferencia de `let`, que permite reasignar, `const` garantiza inmutabilidad en la referencia. Esto es fundamental en código profesional porque previene modificaciones accidentales a valores que deben permanecer fijos, como configuraciones, claves API, o constantes matemáticas.',
            goal: 'Entender la diferencia entre `let` y `const` y cuándo usar cada una para proteger valores que no deben cambiar.',
            syntax: [
                'const PI: number = 3.14159;',
                'const APP_NAME: string = "MiApp";',
                '// PI = 3; ❌ Error: no se puede reasignar'
            ],
            description: 'Las variables `maxRetries` y `apiUrl` no deberían ser modificadas una vez configuradas. Cámbialas de `let` a `const` y asegúrate de tiparlas correctamente. Luego comenta o elimina las líneas donde se intenta reasignarles un valor.',
            initialCode: '// Cambia let por const donde la variable no debería cambiar\nlet maxRetries: number = 3;\nlet apiUrl: string = "https://api.example.com";\nlet currentAttempt: number = 0;\n\n// ❌ Estas reasignaciones deberían fallar con const\nmaxRetries = 10;\napiUrl = "https://hacked.com";\n\n// ✅ Esta variable sí necesita cambiar\ncurrentAttempt = 1;',
            solutionCode: '// Cambia let por const donde la variable no debería cambiar\nconst maxRetries: number = 3;\nconst apiUrl: string = "https://api.example.com";\nlet currentAttempt: number = 0;\n\n// ✅ Eliminamos las reasignaciones ilegales\n// maxRetries = 10; // ❌ Error: no se puede reasignar\n// apiUrl = "https://hacked.com"; // ❌ Error: no se puede reasignar\n\n// ✅ Esta variable sí necesita cambiar\ncurrentAttempt = 1;',
            validations: [
                {
                    pattern: 'const\\s+maxRetries\\s*:\\s*number\\s*=',
                    message: 'Debes cambiar `let` por `const` en `maxRetries` ya que su valor no debe cambiar.'
                },
                {
                    pattern: 'const\\s+apiUrl\\s*:\\s*string\\s*=',
                    message: 'Debes cambiar `let` por `const` en `apiUrl` ya que su valor no debe cambiar.'
                },
                {
                    pattern: 'let\\s+currentAttempt\\s*:\\s*number\\s*=',
                    message: '`currentAttempt` debe seguir usando `let` porque su valor necesita cambiar.'
                },
                {
                    pattern: '^maxRetries\\s*=\\s*10',
                    negate: true,
                    message: 'Debes eliminar o comentar la reasignación de `maxRetries = 10` ya que ahora es una constante.'
                },
                {
                    pattern: '^apiUrl\\s*=',
                    negate: true,
                    message: 'Debes eliminar o comentar la reasignación de `apiUrl` ya que ahora es una constante.'
                }
            ]
        },
        {
            id: 'p12',
            title: 'Template Literals Tipados',
            theory: 'Los Template Literals (plantillas de cadena) usan comillas invertidas (`) y permiten incrustar expresiones directamente dentro de un string usando `${expresion}`. En TypeScript, el compilador verifica que las variables interpoladas sean compatibles, evitando concatenaciones con tipos incorrectos. Esto da legibilidad al código y evita errores de conversión.',
            goal: 'Usar template literals con interpolación tipada para construir strings dinámicos de forma segura y legible.',
            syntax: [
                'const nombre: string = "Ana";',
                'const saludo: string = `Hola, ${nombre}!`;',
                'const info: string = `Edad: ${edad} años`;'
            ],
            description: 'Reescribe la función `buildUserProfile` para que use template literals (comillas invertidas `) en vez de concatenación con `+`. Tipa correctamente los parámetros y el retorno de la función.',
            initialCode: '// Reescribe usando template literals (`) y tipa los parámetros y el retorno\nfunction buildUserProfile(username, age, role) {\n  return "Usuario: " + username + " | Edad: " + age + " | Rol: " + role;\n}\n\nconst profile = buildUserProfile("María", 28, "admin");\nconsole.log(profile);',
            solutionCode: '// Reescribe usando template literals (`) y tipa los parámetros y el retorno\nfunction buildUserProfile(username: string, age: number, role: string): string {\n  return `Usuario: ${username} | Edad: ${age} | Rol: ${role}`;\n}\n\nconst profile = buildUserProfile("María", 28, "admin");\nconsole.log(profile);',
            validations: [
                {
                    pattern: 'function\\s+buildUserProfile\\s*\\(\\s*username\\s*:\\s*string\\s*,\\s*age\\s*:\\s*number\\s*,\\s*role\\s*:\\s*string\\s*\\)',
                    message: 'Debes tipar los parámetros: `username: string`, `age: number`, `role: string`.'
                },
                {
                    pattern: 'function\\s+buildUserProfile(.*):\\s*string\\s*\\{',
                    message: 'Debes definir el tipo de retorno explícito de la función como `string`.'
                },
                {
                    pattern: '`.*\\$\\{username\\}.*\\$\\{age\\}.*\\$\\{role\\}.*`',
                    message: 'Debes usar template literals con interpolación: `...${username}...${age}...${role}...`'
                }
            ]
        },
        {
            id: 'p13',
            title: 'Funciones Flecha Tipadas',
            theory: 'Las funciones flecha (`=>`) son una forma más compacta de escribir funciones en JavaScript/TypeScript. Son especialmente útiles para callbacks, métodos de arrays (`.map`, `.filter`) y para preservar el contexto `this`. En TypeScript, puedes tipar los parámetros y el retorno exactamente igual que con `function`, incluyendo el tipo después de los paréntesis.',
            goal: 'Dominar la sintaxis de arrow functions con tipado completo para escribir código moderno y conciso.',
            syntax: [
                'const sumar = (a: number, b: number): number => a + b;',
                'const saludar = (nombre: string): string => {\n  return `Hola ${nombre}`;\n};'
            ],
            description: 'Convierte las funciones tradicionales `multiply` y `isEven` a funciones flecha (`=>`). Mantén el tipado de los parámetros y del valor de retorno. `multiply` debe retornar el producto de dos números, y `isEven` debe retornar si un número es par.',
            initialCode: '// Convierte estas funciones a arrow functions tipadas\nfunction multiply(a, b) {\n  return a * b;\n}\n\nfunction isEven(num) {\n  return num % 2 === 0;\n}\n\nconsole.log(multiply(4, 5));\nconsole.log(isEven(10));',
            solutionCode: '// Convierte estas funciones a arrow functions tipadas\nconst multiply = (a: number, b: number): number => a * b;\n\nconst isEven = (num: number): boolean => num % 2 === 0;\n\nconsole.log(multiply(4, 5));\nconsole.log(isEven(10));',
            validations: [
                {
                    pattern: 'const\\s+multiply\\s*=\\s*\\(',
                    message: 'Debes convertir `multiply` en una función flecha usando `const multiply = (...) => ...`'
                },
                {
                    pattern: 'multiply\\s*=\\s*\\(\\s*a\\s*:\\s*number\\s*,\\s*b\\s*:\\s*number\\s*\\)\\s*:\\s*number\\s*=>',
                    message: 'Debes tipar los parámetros como `number` y el retorno como `number` en `multiply`.'
                },
                {
                    pattern: 'const\\s+isEven\\s*=\\s*\\(',
                    message: 'Debes convertir `isEven` en una función flecha usando `const isEven = (...) => ...`'
                },
                {
                    pattern: 'isEven\\s*=\\s*\\(\\s*num\\s*:\\s*number\\s*\\)\\s*:\\s*boolean\\s*=>',
                    message: 'Debes tipar el parámetro como `number` y el retorno como `boolean` en `isEven`.'
                }
            ]
        },
        {
            id: 'p33',
            title: 'Tipos void y never',
            theory: 'El tipo `void` indica que una función no retorna ningún valor útil (como `console.log()`). El tipo `never` es más estricto: representa funciones que NUNCA terminan (lanzan excepciones o tienen bucles infinitos). Mientras `void` significa "no retorno nada", `never` significa "no se llega al final de esta función". Entender esta diferencia es clave para tipar correctamente funciones de manejo de errores y funciones auxiliares.',
            goal: 'Distinguir cuándo una función debe retornar `void` (no devuelve nada) y cuándo `never` (nunca termina su ejecución).',
            syntax: [
                'function log(msg: string): void { console.log(msg); }',
                'function error(msg: string): never { throw new Error(msg); }',
                'function infinito(): never { while(true) {} }'
            ],
            description: 'Tipa correctamente las funciones: `logMessage` debe retornar `void` porque solo imprime sin devolver valor. `throwError` debe retornar `never` porque siempre lanza una excepción. `processInput` debe retornar `string` y usar `throwError` como caso por defecto.',
            initialCode: '// Tipa el retorno como void\nfunction logMessage(message) {\n  console.log(`[LOG]: ${message}`);\n}\n\n// Tipa el retorno como never (siempre lanza error)\nfunction throwError(message) {\n  throw new Error(message);\n}\n\n// Tipa parámetro y retorno. Usa throwError para el default.\nfunction processInput(input) {\n  if (input === "hello") {\n    return "Hola!";\n  } else if (input === "bye") {\n    return "Adiós!";\n  }\n  throwError(`Input no reconocido: ${input}`);\n}\n\nlogMessage("Iniciando app...");\nconsole.log(processInput("hello"));',
            solutionCode: '// Tipa el retorno como void\nfunction logMessage(message: string): void {\n  console.log(`[LOG]: ${message}`);\n}\n\n// Tipa el retorno como never (siempre lanza error)\nfunction throwError(message: string): never {\n  throw new Error(message);\n}\n\n// Tipa parámetro y retorno. Usa throwError para el default.\nfunction processInput(input: string): string {\n  if (input === "hello") {\n    return "Hola!";\n  } else if (input === "bye") {\n    return "Adiós!";\n  }\n  throwError(`Input no reconocido: ${input}`);\n}\n\nlogMessage("Iniciando app...");\nconsole.log(processInput("hello"));',
            validations: [
                {
                    pattern: 'function\\s+logMessage\\s*\\(\\s*message\\s*:\\s*string\\s*\\)\\s*:\\s*void',
                    message: 'Debes tipar `logMessage` con parámetro `string` y retorno `void`.'
                },
                {
                    pattern: 'function\\s+throwError\\s*\\(\\s*message\\s*:\\s*string\\s*\\)\\s*:\\s*never',
                    message: 'Debes tipar `throwError` con parámetro `string` y retorno `never`.'
                },
                {
                    pattern: 'function\\s+processInput\\s*\\(\\s*input\\s*:\\s*string\\s*\\)\\s*:\\s*string',
                    message: 'Debes tipar `processInput` con parámetro `string` y retorno `string`.'
                }
            ]
        },
        {
            id: 'p34',
            title: 'Type Aliases Básicos',
            theory: 'Un Type Alias (`type`) te permite darle un nombre a cualquier tipo, desde un simple primitivo hasta combinaciones complejas. A diferencia de las interfaces (que solo definen objetos), los `type` pueden nombrar primitivos, uniones, tuplas, funciones, etc. Crear aliases para tipos frecuentes hace tu código más legible y fácil de mantener: si el tipo cambia, solo lo modificas en un lugar.',
            goal: 'Crear aliases de tipos reutilizables para mejorar la legibilidad y centralizar las definiciones de tipos.',
            syntax: [
                'type ID = string | number;',
                'type Callback = (data: string) => void;',
                'type Pair = [string, number];'
            ],
            description: 'Crea los type aliases: `ID` para `string | number`, `Callback` para una función que recibe un `string` y retorna `void`, y `Coordinates` para una tupla `[number, number]`. Luego tipa las constantes y funciones usando estos aliases.',
            initialCode: '// Crea el type alias ID (string o number)\n\n\n// Crea el type alias Callback (función que recibe string, retorna void)\n\n\n// Crea el type alias Coordinates (tupla de dos numbers)\n\n\n// Tipa usando los aliases creados\nconst userId = 12345;\nconst visitorId = "guest-001";\n\nconst onSuccess = (msg) => {\n  console.log(`✅ ${msg}`);\n};\n\nconst point = [40.7128, -74.0060];\n\nfunction processId(id) {\n  console.log(`Processing: ${id}`);\n}\n\nprocessId(userId);\nprocessId(visitorId);\nonSuccess("Operación completada");',
            solutionCode: '// Crea el type alias ID (string o number)\ntype ID = string | number;\n\n// Crea el type alias Callback (función que recibe string, retorna void)\ntype Callback = (msg: string) => void;\n\n// Crea el type alias Coordinates (tupla de dos numbers)\ntype Coordinates = [number, number];\n\n// Tipa usando los aliases creados\nconst userId: ID = 12345;\nconst visitorId: ID = "guest-001";\n\nconst onSuccess: Callback = (msg) => {\n  console.log(`✅ ${msg}`);\n};\n\nconst point: Coordinates = [40.7128, -74.0060];\n\nfunction processId(id: ID) {\n  console.log(`Processing: ${id}`);\n}\n\nprocessId(userId);\nprocessId(visitorId);\nonSuccess("Operación completada");',
            validations: [
                {
                    pattern: 'type\\s+ID\\s*=\\s*string\\s*\\|\\s*number',
                    message: 'Debes crear el type alias `ID` como `string | number`.'
                },
                {
                    pattern: 'type\\s+Callback\\s*=',
                    message: 'Debes crear el type alias `Callback` para la función.'
                },
                {
                    pattern: 'type\\s+Coordinates\\s*=\\s*\\[\\s*number\\s*,\\s*number\\s*\\]',
                    message: 'Debes crear el type alias `Coordinates` como `[number, number]`.'
                },
                {
                    pattern: 'const\\s+userId\\s*:\\s*ID',
                    message: 'Debes tipar `userId` con el alias `ID`.'
                },
                {
                    pattern: 'const\\s+point\\s*:\\s*Coordinates',
                    message: 'Debes tipar `point` con el alias `Coordinates`.'
                },
                {
                    pattern: 'id\\s*:\\s*ID',
                    message: 'Debes tipar el parámetro de `processId` como `ID`.'
                }
            ]
        }
    ]
};
