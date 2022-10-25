const path = require('path');
const bootstrapSassAbstractsImports = require('vue-cli-plugin-bootstrap-vue/sassAbstractsImports.js')
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
		loaderOptions: {
			sass: {
				additionalData: bootstrapSassAbstractsImports.join('\n')
			},
			scss: {
				additionalData: [...bootstrapSassAbstractsImports, ''].join(';\n')
			}
		}
	},
	devServer: {
		proxy: {
			'/api':{
				target: 'http://localhost:8000/api',
				pathRewrite: {'^/api': ''}
			}
		}
	},
	publicPath: process.env.PUBLIC_URL || '/',
	outputDir: path.resolve(__dirname, '../public')
})
	
