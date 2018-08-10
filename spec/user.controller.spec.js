const user = require('../dist/src/controller/user.controller')
const http = require('http');
const assert = require('assert')
describe("User Login Function",()=>{
    it("Get request for Login",()=>{
        http
        .get('http://localhost:8086', (res) => {
          assert.equal(200, res.statusCode);
        });
    })
});