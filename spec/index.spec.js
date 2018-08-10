const Request = require('request');

describe("Server",()=>{
    let Server ;
    beforeAll(()=>{
        Server = require('../dist/index')
    });
    afterAll(()=>{
        Server.close();
    })
    describe("GET /book/allbooks",()=>{
        let data = {};
        beforeAll((done)=>{
            Request.get("http://localhost:5000/book/allbooks",(error,res,body)=>{
                data.status =  res.statusCode
                data.body = body
                done();
            })
        });
        it("Status 200",()=>{
            expect(data.status).toBe(200);
        })
    })
    describe("GET /test",()=>{
        let data = {};
        beforeAll((done)=>{
            Request.get("http://localhost:5000/test",(error,res,body)=>{
                data.status =  res.statusCode
                data.body = body
                done();
            })
        });
        it("Status 200",()=>{
            expect(data.status).toBe(404);
        })
    })
})