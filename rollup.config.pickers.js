import typescript from 'rollup-plugin-typescript2'
import commonjs from 'rollup-plugin-commonjs'
// import external from 'rollup-plugin-peer-deps-external'
// import postcss from 'rollup-plugin-postcss-modules'
import postcss from 'rollup-plugin-postcss'
import resolve from 'rollup-plugin-node-resolve'
import url from 'rollup-plugin-url'
import svgr from '@svgr/rollup'

import * as propTypes from 'prop-types'

export default {
  input: 'src/pickers.tsx',
  output: [
    {
      file: "dist/pickers.js",
      format: 'cjs',
      exports: 'named',
      sourcemap: true
    },
    {
      file: "dist/pickers.es.js",
      format: 'es',
      exports: 'named',
      sourcemap: true
    }
  ],
  external: id => /react|material-ui|zecos\/inputs|pickers/.test(id),
  plugins: [
    postcss({
      modules: true
    }),
    url(),
    svgr(),
    resolve(),
    typescript({
      rollupCommonJSResolveHack: true,
      clean: true
    }),
    commonjs({
      namedExports: Object.keys(propTypes)
    }),
  ]
}

export function getModuleExports(moduleId) {
    const id = require.resolve(moduleId)
    const moduleOut = nodeEval(fs.readFileSync(id).toString(), id)
    let result = []
    const excludeExports = /^(default|__)/
    if (moduleOut && typeof moduleOut === 'object') {
        result = Object.keys(moduleOut)
            .filter(name => !excludeExports.test(name))
    }

    return result
}

export function getNamedExports(moduleIds) {
    const result = {}
    moduleIds.forEach( id => {
        result[id] = getModuleExports(id)
    })
    return result
}