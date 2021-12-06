const BSMS = require("./index");

/**
 * Calling an intance of BulkSMSBD
 * Get Username and password from www.bulksmsbd.com
 */
const SMS = new BSMS({
  api: 'API_URL',
  username: "USER_NAME", // Phone number as Username
  password: "PASSWORD", // Password 
});

/**
 * Sending message
 */
SMS.number("RECIPIENT_NUMBER") /** assigning numbers, supports Array like @number ([number1, number2, number3]) or Dynamic arguments like @number (number1, number2, number3) */
  .message("Hello world") // assign message
  .get() // send method as method request get() or post() or send() for automatic assigning request method
  .then((sent) => {
    // successfully sent
    console.log(sent);
  })
  .catch((err) => {
    // error, not sent
    console.log("Error:", err);
  });
