import { defineConfig } from "playwright/test";

export default defineConfig({
    use:{
        extraHTTPHeaders: {
            'Content-Type' : 'application/json',
            'Accept' : 'application/json'
        }
    },
    reporter: [
        ['html'],
        ['list', {printSteps: true}]
    ],
    outputDir: 'test-results',
    timeout: 30000,
    expect: {
        timeout: 30000
    }, 
    fullyParallel: false
})