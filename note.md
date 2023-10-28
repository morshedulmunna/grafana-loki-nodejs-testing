```
npm init -y
```

```
npm i -D typescript jest ts-jest @types/jest ts-node
```

create a file for configure for jest
name: jest.config.ts

```
import type {Config} from @jest/types
const config:Config.InitialOptions = {
    present: 'ts-jest'
    testEnvironment: 'node'
    verbose: true
}
export default config
```
