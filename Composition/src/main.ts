import { FunctionComposition } from './function-composition'

FunctionComposition()
import { FunctionPipeComposition } from './piped-functions'

FunctionPipeComposition()
import { MixinClasses } from './mixin-classes'

MixinClasses()

const message = 'Composition explorations!'

const app = document.querySelector<HTMLDivElement>('#app')!
app.innerHTML = `
<h1>${message}</h1>
`
