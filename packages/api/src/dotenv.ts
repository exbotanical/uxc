import { config } from 'dotenv'

import { isTestRuntime } from './utils'

const path = `../../${isTestRuntime ? 'example.env' : '.env'}`

config({ path })
