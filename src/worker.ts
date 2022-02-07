
import { expose } from 'comlink';
import { parse , preprocess } from 'svelte/compiler';
import sveltePreprocess from 'svelte-preprocess';

import {
  typescript,
  scss,
  globalStyle,
} from 'svelte-preprocess';


declare var self : any;

declare var ts : any;

async function parseSvelte(source : string) {
  

  const preprocessedResult = await preprocess( source, [
    typescript({ 
      "compilerOptions": {
        "moduleResolution": "node",
        "target": "es2017",
        /**
          Svelte Preprocess cannot figure out whether you have a value or a type, so tell TypeScript
          to enforce using `import type` instead of `import` for Types.
        */
        "importsNotUsedAsValues": "error",
        /**
          TypeScript doesn't know about import usages in the template because it only sees the
          script of a Svelte file. Therefore preserve all value imports. Requires TS 4.5 or higher.
        */
        "preserveValueImports": true,
        "isolatedModules": true,
        /**
          To have warnings/errors of the Svelte compiler at the correct position,
          enable source maps by default.
        */
        "sourceMap": true,

        "strict": false,
        "esModuleInterop": true,
        "skipLibCheck": true,
        "forceConsistentCasingInFileNames": true
      }
     }),
    scss(),
    globalStyle(),
  ]);
  console.log(preprocessedResult);

  try {
  const ast = parse(preprocessedResult.code);
  console.log(ast);
  }
  catch(e) { console.log(e.toString() )}
}


expose({
  parse : parseSvelte
});


