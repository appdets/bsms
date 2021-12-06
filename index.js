const axios = require("axios");

class BSMS {
  config = {
    api: "",
    username: "",
    password: "",
    apiKey: "",
    method: "",
    bulk: true,
    params: {
      number: "number",
      message: "message",
      username: "username",
      password: "password",
      apiKey: "apiKey",
    },
  };

  method = "GET"
  numbers = [];
  msg = "";

  constructor(config = {}) {
    config.params = Object.assign(this.config.params, config.params);
    this.config = Object.assign(this.config, config);

    return this;
  }

  /**
   *
   * @param {String} method
   * @returns
   */
  method(method) {
    this.method = method;
    return this;
  }

  async get() {
    this.method = "GET";
    return this.send();
  }

  async post() {
    this.method = "POST";
    return this.send();
  }

  /**
   *
   * @param {Dynamic args | String | Array} number
   * @returns
   */
  number(number) {
    if (Array.isArray(number)) {
      this.numbers = this.numbers.concat(number);
    } else {
      this.numbers = Object.values(arguments);
    }
    return this;
  }

  /**
   *
   * @param {String} msg
   * @returns
   */
  message(msg) {
    this.msg = msg;
    return this;
  }

  /**
   *
   * @param {String} num
   * @returns
   */
  isNumber(num) {
    return num.length == 11;
  }

  getNumbers() {
    let numbers = this.numbers.map((num) => {
      num = num
        .toString()
        .replace(/[^0-9]/g, "")
        .trim();
      if (num.startsWith("88")) num = num.substring(2);
      return num;
    });

    numbers = numbers.filter((value, index, self) => {
      return self.indexOf(value) === index && this.isNumber(value);
    });

    if (numbers.length > 20) this.method == "POST";

    return this.bulk === true ? numbers : numbers.slice(0, 1);
  }

  isValid() {
    if (!this.config.api) return "Invailid API URL";
    if (!this.config.username && !this.config.apiKey)
      return "Invailid Username";
    if (!this.config.password && !this.config.apiKey)
      return "Invailid Password";
    if (!this.config.password && !this.config.username && !this.config.apiKey)
      return "Invailid API Key";
    if (!this.msg) return "Invailid Message";
    if (this.getNumbers().length == 0) return "Invailid Numbers";

    return true;
  }

  /**
   *
   * @param {String} code
   * @returns
   */
  responseMessage(code) {
    let codes = {
      1000: "Invalid user or password",
      1002: "Empty number",
      1003: "Invalid message",
      1004: "Invalid number",
      1005: "Invalid numbers",
      1006: "insufficient balance ",
      1009: "Inactive account",
      1010: "Max number limit exceeded",
    };
    return code in codes
      ? { code, message: codes[code] }
      : { code: 0, messahe: "Unknown error" };
  }

  async send() {
    if (true !== this.isValid()) return Promise.reject(this.isValid());

    const payload = {};

    // dynamic params in payload

    if (this.config.apiKey && this.config.apiKey.length > 0) {
      payload[this.config.params["apiKey"]] = this.config.apiKey;
    } else {
      payload[this.config.params["username"]] = this.config.username;
      payload[this.config.params["password"]] = this.config.password;
    }

    payload[this.config.params["message"]] = this.msg;
    payload[this.config.params["number"]] = this.getNumbers().join(",");

    const axiosObj = {
      method: this.method,
      url: this.config.api + "?" + new URLSearchParams(payload).toString(),
    };

    try {
      let response = await axios(axiosObj);

      response = response.data.toString();

      if (response && response.startsWith(1101)) {
        let messageId = Number(response.split("|")[1]) || null,
          delivered = Boolean(response.split("|")[2]) || null;
        return Promise.resolve({
          messageId,
          delivered,
          numbers: this.getNumbers(),
          audience: this.getNumbers().length,
          message: this.msg,
          method: this.method,
        });
      } else {
        return Promise.reject(this.responseMessage(response));
      }
    } catch (e) {
      return Promise.reject(e);
    }
  }
}

module.exports = BSMS;
