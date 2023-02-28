//------------------------------------------------------------------------
//  Method 1: Object
//------------------------------------------------------------------------
// import Helper from './utils/module-object'
// const message = Helper.message1()

// ------------------------------------------------------------------------
//  Method 2: Closure
//------------------------------------------------------------------------
// import Helper from './utils/module-closure'
// const message: string = Helper.message1()

// ------------------------------------------------------------------------
//  Method 3: Class
//------------------------------------------------------------------------
import { MyClass as Helper } from './utils/module-class'
const message: string = new Helper().message1()

//------------------------------------------------------------------------
//  Method 4a: Functions -- Named Imports
//------------------------------------------------------------------------
// import { message1 } from './utils/module-functions'
// const message: string = message1()

//------------------------------------------------------------------------
//  Method 4b: Functions -- Import All
//------------------------------------------------------------------------
// import * as Helper from './utils/module-functions'
// const message: string = Helper.message1()

const app = document.querySelector<HTMLDivElement>('#app')!

app.innerHTML = `
  <h1>${message}</h1>
`
