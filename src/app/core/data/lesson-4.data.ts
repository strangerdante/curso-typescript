import { Lesson } from '../models/lesson.model';

export const LESSON_4: Lesson = {
    id: 'l4',
    title: 'Lección 4 – Tipos Avanzados y Patrones Modernos',
    practices: [
        {
            id: 'p25',
            title: 'keyof y typeof',
            theory: '`keyof` extrae las claves de un tipo como un Union Type de strings literales. Si tienes `type User = { id: number; name: string }`, entonces `keyof User` produce `"id" | "name"`. Combinado con `typeof`, que obtiene el tipo de una variable existente, puedes crear tipos dinámicos basados en la forma real de tus datos sin duplicar definiciones.',
            goal: 'Usar `keyof` y `typeof` para crear tipos derivados automáticos que se mantengan sincronizados con los datos originales.',
            syntax: [
                'type Keys = keyof User; // "id" | "name"',
                'const config = { theme: "dark", lang: "es" };',
                'type ConfigKeys = keyof typeof config; // "theme" | "lang"'
            ],
            description: 'Crea el tipo `UserKeys` usando `keyof` sobre la interface `User`. Luego crea el tipo `SettingsType` usando `typeof` sobre el objeto `defaultSettings` y `SettingsKeys` combinando `keyof typeof`. Finalmente, tipa la función `getUserProp` para que el parámetro `key` solo acepte claves válidas de `User`.',
            initialCode: 'interface User {\n  id: number;\n  name: string;\n  email: string;\n}\n\nconst defaultSettings = {\n  theme: "dark",\n  language: "es",\n  fontSize: 14\n};\n\n// Crea UserKeys con keyof\n\n\n// Crea SettingsType con typeof defaultSettings\n\n\n// Crea SettingsKeys con keyof typeof\n\n\n// Tipa key para que solo acepte claves válidas de User\nfunction getUserProp(user: User, key) {\n  return user[key];\n}\n\nconst u: User = { id: 1, name: "Ana", email: "ana@mail.com" };\nconsole.log(getUserProp(u, "name"));',
            solutionCode: 'interface User {\n  id: number;\n  name: string;\n  email: string;\n}\n\nconst defaultSettings = {\n  theme: "dark",\n  language: "es",\n  fontSize: 14\n};\n\n// Crea UserKeys con keyof\ntype UserKeys = keyof User;\n\n// Crea SettingsType con typeof defaultSettings\ntype SettingsType = typeof defaultSettings;\n\n// Crea SettingsKeys con keyof typeof\ntype SettingsKeys = keyof typeof defaultSettings;\n\n// Tipa key para que solo acepte claves válidas de User\nfunction getUserProp(user: User, key: keyof User) {\n  return user[key];\n}\n\nconst u: User = { id: 1, name: "Ana", email: "ana@mail.com" };\nconsole.log(getUserProp(u, "name"));',
            validations: [
                {
                    pattern: 'type\\s+UserKeys\\s*=\\s*keyof\\s+User',
                    message: 'Debes crear `UserKeys` usando `keyof User`.'
                },
                {
                    pattern: 'type\\s+SettingsType\\s*=\\s*typeof\\s+defaultSettings',
                    message: 'Debes crear `SettingsType` usando `typeof defaultSettings`.'
                },
                {
                    pattern: 'type\\s+SettingsKeys\\s*=\\s*keyof\\s+typeof\\s+defaultSettings',
                    message: 'Debes crear `SettingsKeys` usando `keyof typeof defaultSettings`.'
                },
                {
                    pattern: 'key\\s*:\\s*keyof\\s+User',
                    message: 'Debes tipar el parámetro `key` como `keyof User` en la función.'
                }
            ]
        },
        {
            id: 'p26',
            title: 'Record Utility Type',
            theory: '`Record<Keys, Type>` construye un tipo de objeto cuyas claves son `Keys` y cuyos valores son `Type`. Es ideal para crear diccionarios o mapas con claves específicas. En vez de definir manualmente cada propiedad, `Record` te permite generar la estructura a partir de un Union Type de claves. Es muy usado para tablas de búsqueda, configuraciones, y traducciones.',
            goal: 'Usar `Record` para crear objetos tipados con claves predefinidas de forma limpia y segura.',
            syntax: [
                'type Roles = "admin" | "user" | "guest";',
                'const permisos: Record<Roles, boolean> = {\n  admin: true,\n  user: true,\n  guest: false\n};'
            ],
            description: 'Crea el tipo `StatusLabels` usando `Record` con las claves del tipo `OrderStatus` y valores `string`. Luego crea `UserScores` usando `Record` con claves `string` y valores `number`. Tipa ambas constantes correctamente.',
            initialCode: 'type OrderStatus = "pending" | "processing" | "shipped" | "delivered";\n\n// Crea StatusLabels con Record<OrderStatus, string>\n\n\n// Tipa con el Record que creaste\nconst statusMessages = {\n  pending: "Tu pedido está en espera",\n  processing: "Estamos preparando tu pedido",\n  shipped: "Tu pedido ha sido enviado",\n  delivered: "Tu pedido ha sido entregado"\n};\n\n// Crea UserScores con Record<string, number>\n\n\n// Tipa con el Record que creaste\nconst scores = {\n  alice: 95,\n  bob: 87,\n  charlie: 92\n};',
            solutionCode: 'type OrderStatus = "pending" | "processing" | "shipped" | "delivered";\n\n// Crea StatusLabels con Record<OrderStatus, string>\ntype StatusLabels = Record<OrderStatus, string>;\n\n// Tipa con el Record que creaste\nconst statusMessages: StatusLabels = {\n  pending: "Tu pedido está en espera",\n  processing: "Estamos preparando tu pedido",\n  shipped: "Tu pedido ha sido enviado",\n  delivered: "Tu pedido ha sido entregado"\n};\n\n// Crea UserScores con Record<string, number>\ntype UserScores = Record<string, number>;\n\n// Tipa con el Record que creaste\nconst scores: UserScores = {\n  alice: 95,\n  bob: 87,\n  charlie: 92\n};',
            validations: [
                {
                    pattern: 'type\\s+StatusLabels\\s*=\\s*Record\\s*<\\s*OrderStatus\\s*,\\s*string\\s*>',
                    message: 'Debes crear `StatusLabels` como `Record<OrderStatus, string>`.'
                },
                {
                    pattern: 'const\\s+statusMessages\\s*:\\s*StatusLabels',
                    message: 'Debes tipar `statusMessages` como `StatusLabels`.'
                },
                {
                    pattern: 'type\\s+UserScores\\s*=\\s*Record\\s*<\\s*string\\s*,\\s*number\\s*>',
                    message: 'Debes crear `UserScores` como `Record<string, number>`.'
                },
                {
                    pattern: 'const\\s+scores\\s*:\\s*UserScores',
                    message: 'Debes tipar `scores` como `UserScores`.'
                }
            ]
        },
        {
            id: 'p27',
            title: 'Mapped Types',
            theory: 'Los Mapped Types permiten crear nuevos tipos transformando cada propiedad de un tipo existente. Usan la sintaxis `[K in keyof T]` para iterar sobre las claves. Puedes agregar modificadores como `readonly` o `?` (opcional) a todas las propiedades a la vez. Los Utility Types como `Partial`, `Readonly`, y `Required` están implementados internamente con Mapped Types.',
            goal: 'Crear tipos personalizados que transformen automáticamente las propiedades de otros tipos.',
            syntax: [
                'type Readonly<T> = { readonly [K in keyof T]: T[K] };',
                'type Optional<T> = { [K in keyof T]?: T[K] };',
                'type Nullable<T> = { [K in keyof T]: T[K] | null };'
            ],
            description: 'Crea el Mapped Type `Nullable<T>` que convierta cada propiedad de un tipo en su tipo original o `null`. Luego crea `ReadonlyPartial<T>` que haga todas las propiedades `readonly` y opcionales al mismo tiempo. Tipa las constantes con los tipos creados.',
            initialCode: 'interface UserProfile {\n  name: string;\n  age: number;\n  email: string;\n}\n\n// Crea Nullable<T>: cada propiedad puede ser su tipo o null\n\n\n// Crea ReadonlyPartial<T>: cada propiedad es readonly y opcional\n\n\n// Tipa con Nullable<UserProfile>\nconst partialUser = {\n  name: "Pedro",\n  age: null,\n  email: null\n};\n\n// Tipa con ReadonlyPartial<UserProfile>\nconst frozenUser = {\n  name: "Laura"\n};',
            solutionCode: 'interface UserProfile {\n  name: string;\n  age: number;\n  email: string;\n}\n\n// Crea Nullable<T>: cada propiedad puede ser su tipo o null\ntype Nullable<T> = { [K in keyof T]: T[K] | null };\n\n// Crea ReadonlyPartial<T>: cada propiedad es readonly y opcional\ntype ReadonlyPartial<T> = { readonly [K in keyof T]?: T[K] };\n\n// Tipa con Nullable<UserProfile>\nconst partialUser: Nullable<UserProfile> = {\n  name: "Pedro",\n  age: null,\n  email: null\n};\n\n// Tipa con ReadonlyPartial<UserProfile>\nconst frozenUser: ReadonlyPartial<UserProfile> = {\n  name: "Laura"\n};',
            validations: [
                {
                    pattern: 'type\\s+Nullable\\s*<\\s*T\\s*>\\s*=\\s*\\{',
                    message: 'Debes crear el Mapped Type `Nullable<T>` con la sintaxis `type Nullable<T> = { ... }`.'
                },
                {
                    pattern: '\\[\\s*K\\s+in\\s+keyof\\s+T\\s*\\]\\s*:\\s*T\\s*\\[\\s*K\\s*\\]\\s*\\|\\s*null',
                    message: 'Dentro de `Nullable`, cada propiedad debe ser `T[K] | null`.'
                },
                {
                    pattern: 'type\\s+ReadonlyPartial\\s*<\\s*T\\s*>\\s*=\\s*\\{',
                    message: 'Debes crear el Mapped Type `ReadonlyPartial<T>`.'
                },
                {
                    pattern: 'readonly\\s+\\[\\s*K\\s+in\\s+keyof\\s+T\\s*\\]\\s*\\?',
                    message: 'Dentro de `ReadonlyPartial`, las propiedades deben ser `readonly` y opcionales (`?`).'
                },
                {
                    pattern: 'const\\s+partialUser\\s*:\\s*Nullable\\s*<\\s*UserProfile\\s*>',
                    message: 'Debes tipar `partialUser` como `Nullable<UserProfile>`.'
                },
                {
                    pattern: 'const\\s+frozenUser\\s*:\\s*ReadonlyPartial\\s*<\\s*UserProfile\\s*>',
                    message: 'Debes tipar `frozenUser` como `ReadonlyPartial<UserProfile>`.'
                }
            ]
        },
        {
            id: 'p28',
            title: 'Conditional Types',
            theory: 'Los Conditional Types permiten elegir un tipo basándose en una condición: `T extends U ? X : Y`. Si `T` es asignable a `U`, el tipo resultante es `X`, sino es `Y`. Es como un operador ternario pero para tipos. Se usa frecuentemente en librerías para adaptar tipos automáticamente según el input. También puedes usarlos con `infer` para extraer tipos de estructuras más complejas.',
            goal: 'Crear tipos condicionales que se adapten automáticamente según el tipo de entrada.',
            syntax: [
                'type IsString<T> = T extends string ? "sí" : "no";',
                'type A = IsString<"hello">; // "sí"',
                'type B = IsString<42>; // "no"'
            ],
            description: 'Crea el tipo condicional `IsArray<T>` que retorne `true` si `T` es un array y `false` si no lo es. Luego crea `Flatten<T>` que extraiga el tipo interno de un array (si es array retorna el tipo de los elementos, si no es array retorna `T` tal cual). Tipa las constantes con los tipos resultantes.',
            initialCode: '// Crea IsArray<T>: retorna true si T es un array, false si no\n\n\n// Crea Flatten<T>: si es array retorna el tipo del elemento, si no retorna T\n\n\n// Estos tipos deberían resolverse correctamente\ntype Test1 = IsArray<string[]>;    // true\ntype Test2 = IsArray<number>;      // false\n\ntype Flat1 = Flatten<number[]>;    // number\ntype Flat2 = Flatten<string>;      // string\n\n// Tipa las constantes según los tipos resueltos\nconst isArr: Test1 = true;\nconst notArr: Test2 = false;\nconst num: Flat1 = 42;\nconst str: Flat2 = "hello";',
            solutionCode: '// Crea IsArray<T>: retorna true si T es un array, false si no\ntype IsArray<T> = T extends any[] ? true : false;\n\n// Crea Flatten<T>: si es array retorna el tipo del elemento, si no retorna T\ntype Flatten<T> = T extends (infer U)[] ? U : T;\n\n// Estos tipos deberían resolverse correctamente\ntype Test1 = IsArray<string[]>;    // true\ntype Test2 = IsArray<number>;      // false\n\ntype Flat1 = Flatten<number[]>;    // number\ntype Flat2 = Flatten<string>;      // string\n\n// Tipa las constantes según los tipos resueltos\nconst isArr: Test1 = true;\nconst notArr: Test2 = false;\nconst num: Flat1 = 42;\nconst str: Flat2 = "hello";',
            validations: [
                {
                    pattern: 'type\\s+IsArray\\s*<\\s*T\\s*>\\s*=\\s*T\\s+extends',
                    message: 'Debes crear `IsArray<T>` usando un Conditional Type con `T extends`.'
                },
                {
                    pattern: 'IsArray\\s*<\\s*T\\s*>\\s*=\\s*T\\s+extends\\s+any\\s*\\[\\s*\\]\\s*\\?\\s*true\\s*:\\s*false',
                    message: '`IsArray<T>` debe verificar si `T extends any[]` y retornar `true` o `false`.'
                },
                {
                    pattern: 'type\\s+Flatten\\s*<\\s*T\\s*>\\s*=\\s*T\\s+extends',
                    message: 'Debes crear `Flatten<T>` usando un Conditional Type con `T extends`.'
                },
                {
                    pattern: 'infer\\s+U',
                    message: 'Debes usar `infer` dentro de `Flatten` para extraer el tipo interno del array.'
                }
            ]
        },
        {
            id: 'p29',
            title: 'Template Literal Types',
            theory: 'Los Template Literal Types permiten construir tipos de strings usando la misma sintaxis de template literals de JavaScript, pero a nivel de tipos. Puedes combinar Union Types con template literals para generar todas las combinaciones posibles automáticamente. Por ejemplo, `type Events = \\`on${\"Click\" | \"Hover\"}\\`` produce `\"onClick\" | \"onHover\"`. Es extremadamente útil para tipar APIs, eventos, y rutas.',
            goal: 'Crear tipos de strings dinámicos usando template literal types para garantizar nombres válidos en tiempo de compilación.',
            syntax: [
                'type Greeting = `Hello ${string}`;',
                'type Color = "red" | "blue";',
                'type Size = "sm" | "lg";',
                'type Classes = `${Color}-${Size}`; // "red-sm" | "red-lg" | "blue-sm" | "blue-lg"'
            ],
            description: 'Crea el tipo `CssProperty` que combine `Side` y `Style` con el formato `"border-{side}-{style}"`. Luego crea `EventHandler` que genere nombres de eventos con el formato `"on{Event}"` donde Event son los valores del Union Type `DomEvent` con la primera letra en mayúscula. Tipa las constantes.',
            initialCode: 'type Side = "top" | "right" | "bottom" | "left";\ntype Style = "solid" | "dashed" | "dotted";\n\n// Crea CssProperty combinando Side y Style: "border-{side}-{style}"\n\n\ntype DomEvent = "Click" | "Hover" | "Focus";\n\n// Crea EventHandler con formato "on{DomEvent}"\n\n\n// Tipa las constantes con los tipos creados\nconst border1: CssProperty = "border-top-solid";\nconst border2: CssProperty = "border-left-dashed";\n\nconst handler1: EventHandler = "onClick";\nconst handler2: EventHandler = "onFocus";',
            solutionCode: 'type Side = "top" | "right" | "bottom" | "left";\ntype Style = "solid" | "dashed" | "dotted";\n\n// Crea CssProperty combinando Side y Style: "border-{side}-{style}"\ntype CssProperty = `border-${Side}-${Style}`;\n\ntype DomEvent = "Click" | "Hover" | "Focus";\n\n// Crea EventHandler con formato "on{DomEvent}"\ntype EventHandler = `on${DomEvent}`;\n\n// Tipa las constantes con los tipos creados\nconst border1: CssProperty = "border-top-solid";\nconst border2: CssProperty = "border-left-dashed";\n\nconst handler1: EventHandler = "onClick";\nconst handler2: EventHandler = "onFocus";',
            validations: [
                {
                    pattern: 'type\\s+CssProperty\\s*=\\s*`border-\\$\\{Side\\}-\\$\\{Style\\}`',
                    message: 'Debes crear `CssProperty` combinando `Side` y `Style` con template literal: `\\`border-${Side}-${Style}\\``.'
                },
                {
                    pattern: 'type\\s+EventHandler\\s*=\\s*`on\\$\\{DomEvent\\}`',
                    message: 'Debes crear `EventHandler` con template literal: `\\`on${DomEvent}\\``.'
                },
                {
                    pattern: 'const\\s+border1\\s*:\\s*CssProperty',
                    message: 'Debes tipar `border1` como `CssProperty`.'
                },
                {
                    pattern: 'const\\s+handler1\\s*:\\s*EventHandler',
                    message: 'Debes tipar `handler1` como `EventHandler`.'
                }
            ]
        },
        {
            id: 'p30',
            title: 'Exclude y Extract',
            theory: '`Exclude<T, U>` elimina del Union Type `T` todos los miembros que sean asignables a `U`. `Extract<T, U>` hace lo opuesto: solo conserva los miembros de `T` que sean asignables a `U`. Son Utility Types muy usados para filtrar tipos en unions grandes. Piénsalos como `.filter()` pero para tipos.',
            goal: 'Usar `Exclude` y `Extract` para filtrar miembros específicos de Union Types y crear subconjuntos tipados.',
            syntax: [
                'type T = "a" | "b" | "c";',
                'type SinA = Exclude<T, "a">; // "b" | "c"',
                'type SoloA = Extract<T, "a">; // "a"'
            ],
            description: 'Dado el tipo `AllEvents`, usa `Exclude` para crear `NonMouseEvents` excluyendo los eventos de ratón (`"click" | "dblclick" | "mouseenter"`). Luego usa `Extract` para crear `MouseEvents` extrayendo solo esos mismos eventos. Tipa las constantes y la función con los tipos filtrados.',
            initialCode: 'type AllEvents = "click" | "dblclick" | "mouseenter" | "keydown" | "keyup" | "scroll" | "resize";\n\n// Crea NonMouseEvents excluyendo "click" | "dblclick" | "mouseenter"\n\n\n// Crea MouseEvents extrayendo solo "click" | "dblclick" | "mouseenter"\n\n\n// Tipa el parámetro con MouseEvents\nfunction handleMouseEvent(event) {\n  console.log(`Mouse event: ${event}`);\n}\n\n// Tipa el parámetro con NonMouseEvents\nfunction handleOtherEvent(event) {\n  console.log(`Other event: ${event}`);\n}\n\nhandleMouseEvent("click");\nhandleOtherEvent("keydown");',
            solutionCode: 'type AllEvents = "click" | "dblclick" | "mouseenter" | "keydown" | "keyup" | "scroll" | "resize";\n\n// Crea NonMouseEvents excluyendo "click" | "dblclick" | "mouseenter"\ntype NonMouseEvents = Exclude<AllEvents, "click" | "dblclick" | "mouseenter">;\n\n// Crea MouseEvents extrayendo solo "click" | "dblclick" | "mouseenter"\ntype MouseEvents = Extract<AllEvents, "click" | "dblclick" | "mouseenter">;\n\n// Tipa el parámetro con MouseEvents\nfunction handleMouseEvent(event: MouseEvents) {\n  console.log(`Mouse event: ${event}`);\n}\n\n// Tipa el parámetro con NonMouseEvents\nfunction handleOtherEvent(event: NonMouseEvents) {\n  console.log(`Other event: ${event}`);\n}\n\nhandleMouseEvent("click");\nhandleOtherEvent("keydown");',
            validations: [
                {
                    pattern: 'type\\s+NonMouseEvents\\s*=\\s*Exclude\\s*<\\s*AllEvents\\s*,',
                    message: 'Debes crear `NonMouseEvents` usando `Exclude<AllEvents, ...>`.'
                },
                {
                    pattern: 'type\\s+MouseEvents\\s*=\\s*Extract\\s*<\\s*AllEvents\\s*,',
                    message: 'Debes crear `MouseEvents` usando `Extract<AllEvents, ...>`.'
                },
                {
                    pattern: 'event\\s*:\\s*MouseEvents',
                    message: 'Debes tipar el parámetro de `handleMouseEvent` como `MouseEvents`.'
                },
                {
                    pattern: 'event\\s*:\\s*NonMouseEvents',
                    message: 'Debes tipar el parámetro de `handleOtherEvent` como `NonMouseEvents`.'
                }
            ]
        },
        {
            id: 'p31',
            title: 'Type Assertions (as)',
            theory: 'Las Type Assertions (`as`) le dicen al compilador: "Confía en mí, sé qué tipo es este valor". Se usan cuando tú sabes más que TypeScript sobre el tipo de un dato, como al obtener elementos del DOM o al procesar datos de una API externa. No cambian el valor en runtime, solo afectan la comprobación de tipos. Úsalas con precaución: una assertion incorrecta puede ocultar bugs reales.',
            goal: 'Usar `as` para informar a TypeScript del tipo correcto cuando el compilador no puede inferirlo automáticamente.',
            syntax: [
                'const input = document.getElementById("name") as HTMLInputElement;',
                'const data = JSON.parse(response) as UserData;',
                'const valor = someValue as unknown as TargetType; // doble assertion'
            ],
            description: 'Usa type assertions (`as`) para tipar correctamente los elementos del DOM y el dato parseado de la API. `inputEl` debe ser `HTMLInputElement`, `canvas` debe ser `HTMLCanvasElement`, y el resultado del `JSON.parse` debe ser de tipo `ApiPayload`.',
            initialCode: 'interface ApiPayload {\n  userId: number;\n  items: string[];\n  total: number;\n}\n\n// Usa \"as\" para afirmar que es un HTMLInputElement\nconst inputEl = document.getElementById("username");\n\n// Usa \"as\" para afirmar que es un HTMLCanvasElement\nconst canvas = document.querySelector("#myCanvas");\n\n// Accede a propiedades específicas del tipo\nconsole.log(inputEl.value);\nconsole.log(canvas.getContext("2d"));\n\n// Usa \"as\" para tipar el resultado del JSON.parse\nconst rawData = \'{"userId": 1, "items": ["a","b"], "total": 100}\';\nconst payload = JSON.parse(rawData);\nconsole.log(payload.userId, payload.items);',
            solutionCode: 'interface ApiPayload {\n  userId: number;\n  items: string[];\n  total: number;\n}\n\n// Usa \"as\" para afirmar que es un HTMLInputElement\nconst inputEl = document.getElementById("username") as HTMLInputElement;\n\n// Usa \"as\" para afirmar que es un HTMLCanvasElement\nconst canvas = document.querySelector("#myCanvas") as HTMLCanvasElement;\n\n// Accede a propiedades específicas del tipo\nconsole.log(inputEl.value);\nconsole.log(canvas.getContext("2d"));\n\n// Usa \"as\" para tipar el resultado del JSON.parse\nconst rawData = \'{"userId": 1, "items": ["a","b"], "total": 100}\';\nconst payload = JSON.parse(rawData) as ApiPayload;\nconsole.log(payload.userId, payload.items);',
            validations: [
                {
                    pattern: 'getElementById\\s*\\(.*\\)\\s+as\\s+HTMLInputElement',
                    message: 'Debes usar `as HTMLInputElement` después de `getElementById`.'
                },
                {
                    pattern: 'querySelector\\s*\\(.*\\)\\s+as\\s+HTMLCanvasElement',
                    message: 'Debes usar `as HTMLCanvasElement` después de `querySelector`.'
                },
                {
                    pattern: 'JSON\\.parse\\s*\\(.*\\)\\s+as\\s+ApiPayload',
                    message: 'Debes usar `as ApiPayload` después de `JSON.parse(rawData)`.'
                }
            ]
        },
        {
            id: 'p32',
            title: 'El Operador satisfies',
            theory: 'El operador `satisfies` (introducido en TypeScript 4.9) permite validar que un valor cumple con un tipo sin cambiar el tipo inferido. A diferencia de `: Type` (que fuerza el tipo) o `as Type` (que lo afirma), `satisfies` verifica compatibilidad pero deja que TypeScript infiera el tipo más específico posible. Esto es ideal cuando quieres validar la estructura pero conservar el autocompletado preciso de los valores literales.',
            goal: 'Usar `satisfies` para validar la forma de un objeto sin perder la inferencia de tipos específicos.',
            syntax: [
                'type Colors = Record<string, string | number[]>;',
                'const palette = {\n  red: "#ff0000",\n  green: [0, 255, 0]\n} satisfies Colors;',
                '// palette.red sigue siendo string (no string | number[])'
            ],
            description: 'Usa `satisfies` en las constantes `theme` y `routes` para validar que cumplen con sus tipos (`ThemeConfig` y `Record<string, string>`) sin perder la inferencia de los valores literales. Luego verifica que el autocompletado funciona accediendo a propiedades específicas.',
            initialCode: 'type ThemeConfig = {\n  primary: string;\n  secondary: string;\n  fontSize: number;\n  darkMode: boolean;\n};\n\n// Usa satisfies ThemeConfig para validar sin perder inferencia\nconst theme = {\n  primary: "#6C63FF",\n  secondary: "#FF6584",\n  fontSize: 16,\n  darkMode: true\n};\n\n// Usa satisfies Record<string, string> para validar\nconst routes = {\n  home: "/",\n  about: "/about",\n  contact: "/contact",\n  blog: "/blog"\n};\n\n// Estas líneas deben funcionar con autocompletado preciso\nconsole.log(theme.primary);\nconsole.log(routes.home);',
            solutionCode: 'type ThemeConfig = {\n  primary: string;\n  secondary: string;\n  fontSize: number;\n  darkMode: boolean;\n};\n\n// Usa satisfies ThemeConfig para validar sin perder inferencia\nconst theme = {\n  primary: "#6C63FF",\n  secondary: "#FF6584",\n  fontSize: 16,\n  darkMode: true\n} satisfies ThemeConfig;\n\n// Usa satisfies Record<string, string> para validar\nconst routes = {\n  home: "/",\n  about: "/about",\n  contact: "/contact",\n  blog: "/blog"\n} satisfies Record<string, string>;\n\n// Estas líneas deben funcionar con autocompletado preciso\nconsole.log(theme.primary);\nconsole.log(routes.home);',
            validations: [
                {
                    pattern: '\\}\\s+satisfies\\s+ThemeConfig',
                    message: 'Debes agregar `satisfies ThemeConfig` después del objeto `theme`.'
                },
                {
                    pattern: '\\}\\s+satisfies\\s+Record\\s*<\\s*string\\s*,\\s*string\\s*>',
                    message: 'Debes agregar `satisfies Record<string, string>` después del objeto `routes`.'
                },
                {
                    pattern: 'const\\s+theme\\s*:\\s*ThemeConfig',
                    negate: true,
                    message: 'No uses `: ThemeConfig` en la declaración. Usa `satisfies` al final del objeto para conservar la inferencia.'
                },
                {
                    pattern: 'const\\s+routes\\s*:',
                    negate: true,
                    message: 'No uses `: Type` en la declaración de `routes`. Usa `satisfies` al final del objeto.'
                }
            ]
        },
        {
            id: 'p39',
            title: 'NonNullable Utility Type',
            theory: '`NonNullable<T>` es un Utility Type que elimina `null` y `undefined` de un Union Type. Si tienes `string | null | undefined`, `NonNullable` lo convierte en solo `string`. Es muy útil cuando recibes datos que pueden ser nulos (como de una API o un formulario) pero necesitas pasarlos a una función que NO acepta null. En lugar de escribir guardias manualmente, `NonNullable` crea el tipo limpio directamente.',
            goal: 'Usar `NonNullable` para crear tipos que excluyan null y undefined, garantizando datos válidos en funciones críticas.',
            syntax: [
                'type MaybeString = string | null | undefined;',
                'type SafeString = NonNullable<MaybeString>; // string',
                'type Input = number | null;\ntype ValidInput = NonNullable<Input>; // number'
            ],
            description: 'Dado el tipo `FormField` que puede ser `string | null | undefined`, crea `ValidField` usando `NonNullable`. Luego crea la función `processField` que solo acepte `ValidField`. Finalmente, tipa `cleanData` como un array de `NonNullable<typeof rawItem>` para filtrar nulos.',
            initialCode: 'type FormField = string | null | undefined;\n\n// Crea ValidField eliminando null y undefined\n\n\n// Tipa el parámetro como ValidField\nfunction processField(value) {\n  return value.trim().toUpperCase();\n}\n\ntype ApiResponse = {\n  name: string | null;\n  email: string | null;\n  age: number | null;\n};\n\n// Crea SafeName usando NonNullable sobre el tipo de name\n\n\n// Tipa safeName como SafeName\nconst rawName: string | null = "  Ana  ";\n\nif (rawName !== null) {\n  const safeName = rawName;\n  console.log(processField(safeName));\n}\n\n// Filtra los nulos y tipa el resultado\nconst rawValues: FormField[] = ["hello", null, "world", undefined, "test"];\nconst cleanValues = rawValues.filter((v): v is NonNullable<FormField> => v != null);\nconsole.log(cleanValues);',
            solutionCode: 'type FormField = string | null | undefined;\n\n// Crea ValidField eliminando null y undefined\ntype ValidField = NonNullable<FormField>;\n\n// Tipa el parámetro como ValidField\nfunction processField(value: ValidField): string {\n  return value.trim().toUpperCase();\n}\n\ntype ApiResponse = {\n  name: string | null;\n  email: string | null;\n  age: number | null;\n};\n\n// Crea SafeName usando NonNullable sobre el tipo de name\ntype SafeName = NonNullable<ApiResponse["name"]>;\n\n// Tipa safeName como SafeName\nconst rawName: string | null = "  Ana  ";\n\nif (rawName !== null) {\n  const safeName: SafeName = rawName;\n  console.log(processField(safeName));\n}\n\n// Filtra los nulos y tipa el resultado\nconst rawValues: FormField[] = ["hello", null, "world", undefined, "test"];\nconst cleanValues = rawValues.filter((v): v is NonNullable<FormField> => v != null);\nconsole.log(cleanValues);',
            validations: [
                {
                    pattern: 'type\\s+ValidField\\s*=\\s*NonNullable\\s*<\\s*FormField\\s*>',
                    message: 'Debes crear `ValidField` usando `NonNullable<FormField>`.'
                },
                {
                    pattern: 'value\\s*:\\s*ValidField',
                    message: 'El parámetro de `processField` debe ser de tipo `ValidField`.'
                },
                {
                    pattern: '\\)\\s*:\\s*string\\s*\\{',
                    message: 'El tipo de retorno de `processField` debe ser `string`.'
                },
                {
                    pattern: 'type\\s+SafeName\\s*=\\s*NonNullable\\s*<',
                    message: 'Debes crear `SafeName` usando `NonNullable`.'
                },
                {
                    pattern: 'const\\s+safeName\\s*:\\s*SafeName',
                    message: 'Debes tipar `safeName` como `SafeName`.'
                }
            ]
        },
        {
            id: 'p40',
            title: 'Readonly y ReadonlyArray',
            theory: 'El Utility Type `Readonly<T>` convierte TODAS las propiedades de un tipo en `readonly`, impidiendo su modificación. `ReadonlyArray<T>` (o `readonly T[]`) crea un array inmutable: no puedes usar `.push()`, `.pop()`, o reasignar índices. Estos patrones son fundamentales para programación funcional e inmutabilidad, evitando mutaciones accidentales que causan bugs difíciles de rastrear.',
            goal: 'Aplicar inmutabilidad completa a objetos y arrays usando `Readonly` y `ReadonlyArray` para prevenir mutaciones no deseadas.',
            syntax: [
                'const user: Readonly<User> = { id: 1, name: "Ana" };',
                '// user.name = "Otro"; ❌ Error',
                'const nums: ReadonlyArray<number> = [1, 2, 3];',
                '// nums.push(4); ❌ Error',
                'const items: readonly string[] = ["a", "b"];'
            ],
            description: 'Tipa `frozenConfig` como `Readonly<AppConfig>` para que no se puedan modificar sus propiedades. Tipa `immutableTags` como `ReadonlyArray<string>` para impedir agregar o eliminar elementos. Luego comenta o elimina las líneas que intentan mutar estos valores.',
            initialCode: 'interface AppConfig {\n  apiUrl: string;\n  timeout: number;\n  retries: number;\n}\n\n// Tipa como Readonly<AppConfig>\nconst frozenConfig = {\n  apiUrl: "https://api.example.com",\n  timeout: 5000,\n  retries: 3\n};\n\n// Tipa como ReadonlyArray<string>\nconst immutableTags = ["typescript", "angular", "frontend"];\n\n// ❌ Estas mutaciones no deberían ser posibles\nfrozenConfig.timeout = 10000;\nfrozenConfig.apiUrl = "https://hacked.com";\nimmutableTags.push("backend");\nimmutableTags[0] = "javascript";\n\n// ✅ Leer es válido\nconsole.log(frozenConfig.apiUrl);\nconsole.log(immutableTags.length);\nconsole.log(immutableTags.map(t => t.toUpperCase()));',
            solutionCode: 'interface AppConfig {\n  apiUrl: string;\n  timeout: number;\n  retries: number;\n}\n\n// Tipa como Readonly<AppConfig>\nconst frozenConfig: Readonly<AppConfig> = {\n  apiUrl: "https://api.example.com",\n  timeout: 5000,\n  retries: 3\n};\n\n// Tipa como ReadonlyArray<string>\nconst immutableTags: ReadonlyArray<string> = ["typescript", "angular", "frontend"];\n\n// ✅ Mutaciones eliminadas\n// frozenConfig.timeout = 10000; // ❌ Error: readonly\n// frozenConfig.apiUrl = "https://hacked.com"; // ❌ Error: readonly\n// immutableTags.push("backend"); // ❌ Error: ReadonlyArray\n// immutableTags[0] = "javascript"; // ❌ Error: ReadonlyArray\n\n// ✅ Leer es válido\nconsole.log(frozenConfig.apiUrl);\nconsole.log(immutableTags.length);\nconsole.log(immutableTags.map(t => t.toUpperCase()));',
            validations: [
                {
                    pattern: 'const\\s+frozenConfig\\s*:\\s*Readonly\\s*<\\s*AppConfig\\s*>',
                    message: 'Debes tipar `frozenConfig` como `Readonly<AppConfig>`.'
                },
                {
                    pattern: 'const\\s+immutableTags\\s*:\\s*(ReadonlyArray\\s*<\\s*string\\s*>|readonly\\s+string\\s*\\[\\s*\\])',
                    message: 'Debes tipar `immutableTags` como `ReadonlyArray<string>` o `readonly string[]`.'
                },
                {
                    pattern: 'frozenConfig\\.timeout\\s*=',
                    negate: true,
                    message: 'Debes eliminar o comentar la mutación de `frozenConfig.timeout` ya que es readonly.'
                },
                {
                    pattern: 'frozenConfig\\.apiUrl\\s*=',
                    negate: true,
                    message: 'Debes eliminar o comentar la mutación de `frozenConfig.apiUrl` ya que es readonly.'
                },
                {
                    pattern: 'immutableTags\\.push',
                    negate: true,
                    message: 'Debes eliminar o comentar `immutableTags.push()` ya que es ReadonlyArray.'
                },
                {
                    pattern: 'immutableTags\\[0\\]\\s*=',
                    negate: true,
                    message: 'Debes eliminar o comentar la reasignación de `immutableTags[0]` ya que es ReadonlyArray.'
                }
            ]
        }
    ]
};
