const rewire = require("rewire")
const context = rewire("./context")
const delegateSet = context.__get__("delegateSet")
const delegateGet = context.__get__("delegateGet")
// @ponicode
describe("delegateSet", () => {
    test("0", () => {
        let callFunction = () => {
            delegateSet("Anas", "Pierre Edouard")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            delegateSet("Jean-Philippe", "Michael")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            delegateSet("Edmond", "George")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            delegateSet("Michael", "George")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            delegateSet("Edmond", "Edmond")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            delegateSet(undefined, undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("delegateGet", () => {
    test("0", () => {
        let callFunction = () => {
            delegateGet("Michael", "Anas")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            delegateGet("Pierre Edouard", "Jean-Philippe")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            delegateGet("Jean-Philippe", "Pierre Edouard")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            delegateGet("Anas", "Pierre Edouard")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            delegateGet("George", "Michael")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            delegateGet(undefined, undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
