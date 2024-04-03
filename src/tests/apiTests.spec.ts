import {test, expect} from "playwright/test";

let randomId='';
test.describe('Rest API testing learnings', () =>{
    test('First API test using GET Method', async({request}) =>{
        const res = await request.get('https://api.publicapis.org/entries')
        expect(await res.ok()).toBeTruthy();
        //expect(res.status).toEqual(200);

        console.log(await res.json())
    })

    test('Second API test using GET Method', async({request}) =>{
        const res = await request.get('https://catfact.ninja/fact')
        expect(await res.ok()).toBeTruthy();
        expect(await res.status()).toEqual(200);
        const responseVal = await res.json()
        
        console.log("Actual Response value is ", responseVal)
        var keys = Object.keys(responseVal)

        keys.forEach(element => {
            console.log(`'${element}' field has value of ${responseVal[element]}`)
        });        
    })

    test('1 Testing POST request', async({request}) =>{
        
        const res = await request.post('https://api.restful-api.dev/objects', {
            data: {
                "name": "Srini Testing Object1", 
                "data": {
                    "year": 2019,
                    "price": 1849.99,
                    "CPU model": "Intel Core i9",
                    "Hard Disk Size": "1 TB"
                }
            }
        })

        expect(await res.ok()).toBeTruthy();

        expect(await res.status()).toEqual(200)
        expect(await res.statusText().toString()).toEqual('OK')
        const resObj = await res.json()

        console.log(resObj)
        console.log(await res.headers())
        let keys = Object.keys(resObj)
        expect(keys.length).toEqual(4)
        expect(keys).toContain('createdAt')
        randomId = resObj['id'];
        console.log('random id is : ', randomId)
    })

    test('2 Get Single Object values', async({request}) =>{
        const objectVal = 7
        const res = await request.get(`https://api.restful-api.dev/objects/${objectVal}`)

        expect(await res.ok()).toBeTruthy();
        console.log(await res.json())
    })

    test('3 Testing PUT method', async({request})=>{
        const res = await request.put(`https://api.restful-api.dev/objects/${randomId}`, {
            data: {
                "name": "Srini Testing Object1", 
                "data": {
                    "year": 2019,
                    "price": 1849.99,
                    "CPU model": "Intel Core i9",
                    "Hard Disk Size": "1 TB",
                    "color": "Silver"
                }
            }
        })

        expect(await res.ok()).toBeTruthy();

        expect(await res.status()).toEqual(200)
        expect(await res.statusText().toString()).toEqual('OK')
        const resObj = await res.json()

        console.log(resObj)
        console.log(await res.headers())
        let keys = Object.keys(resObj)
        expect(keys.length).toEqual(4)
        expect(keys).toContain('updatedAt')
    })

    test('4 Testing Patch method', async({request}) =>{
        const res = await request.patch(`https://api.restful-api.dev/objects/${randomId}`, {
            data: {
                "name": "Srini Testing Object1 Updated Name"
            }
        })

        expect(await res.ok()).toBeTruthy();

        expect(await res.status()).toEqual(200)
        expect(await res.statusText().toString()).toEqual('OK')
        const resObj = await res.json()

        console.log(resObj)
        console.log(await res.headers())
        let keys = Object.keys(resObj)
        expect(keys.length).toEqual(4)
        expect(keys).toContain('updatedAt')  
        
    })

    test('5 Delete an existing resource', async({request}) =>{
        const res = await request.delete(`https://api.restful-api.dev/objects/${randomId}`)
        console.log((await res.body()).toString())
        console.log(await res.status())
    })
})