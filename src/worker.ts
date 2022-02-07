
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
        "allowSyntheticDefaultImports": true,
        "noImplicitAny": true,
        "module": "esnext",
        "target": "es5",
        "allowJs": true
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


