import * as url from "url";
import bcrypt from "bcrypt";

// Es un simple archivo "helper" en el que exportamos un par de constantes útiles.
// Estas constantes están disponibles en CommonJS, pero no al usar la sintaxis de módulos
// (type module en package.json), por lo tanto las volvemos a generar.
export const __filename = url.fileURLToPath(import.meta.url);
export const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);

