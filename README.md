# BSMS
BSMS is a all-in-one class to build Bulk SMS query and send through any Bulk SMS web API online. 

**Advantages**
* Works on both Backend and Frontend
* Lightweight (under 2 kb)
* Promise based (axios)


# Install

```bash
npm i bsms
# or
yarn add bsms
```

# Usages

### Instance
Login/Register to your BulkSMS provider, collect API information to get started.

**Server Side**

```js
const BSMS = require("bsms");
 
// Calling an intance of BSMS 
const options = {
  api: "API_URL", // Web API URL
  username: "YOUR_USERNAME", // Username
  password: "YOUR_PASSWORD" // Password,
  apiKey: "API_KEY" // alternative of user and password
}
const SMS = new BSMS(options);
```
**ES6 Module**
```js
import BSMS from "bsms";

// options
const options = {
  api: "API_URL",
  username: "YOUR_USERNAME", 
  password: "YOUR_PASSWORD"  
}

const SMS = new BSMS(options);
```

### Sending SMS

```js
// assign number
SMS.number("RECIPIENT_NUMBER") 

// assign message
SMS.message("Hello world") 

// Send SMS
SMS.send() 
.then((sent) => {
  // sent 
})
.catch((err) => {
  // error  
})
```
## Configuration 

Configuration structure
```js
const options = {
  api: "", // Web API Endpoint
  username: "", // username
  password: "", // password
  apiKey: "", 
  // using apiKey will ignore username nd password
  params: { // query parameters for server
   username: "username", 
   // username will send as username
   password: "password",
   apiKey: "apiKey",
   message: "message",
  ,
  bulk: true // false will ignore bulk recipients
}
```

### Advanced usages
**Notes**

* Supports nested methods
* Supports dynamic arguments as numbers
* Supports array as numbers
  
```js 
SMS
.number("number1", "number2", ...numbers) // dynamic arg
// .number(["number1", "number2", ...numbers]) // as array
.message("Hello world") 
.send() // auto assign POST method if numbers are more than 20, default: GET
// .get() // GET method
// .post()  // POST method
.then((sent) => {
  // sent 
})
.catch((err) => {
  // error  
}).finally(() => {
  // always executes
})
```

# License
This project is open-source, free-forever with **MIT** license. 

# Contrubutions
Pull requests are welcome, but you are requested to open a ticket first to discuss in which part you want to contribute. 
You will find [Github repository](https://github.com/imjafran/BSMS.git) here. 

Core development [Jafran Hasan](https://fb.com/IamJafran) 

Send bug reports to jafraaan@gmail.com