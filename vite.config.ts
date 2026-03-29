import { defineConfig } from '@matthesketh/utopia-vite-plugin'
import { htmlConfig } from './vite-plugin-html-config'

export default defineConfig({
  plugins: [htmlConfig()],
})
