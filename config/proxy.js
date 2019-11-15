export default {
  '/service': {
    target: 'http://16845-yfyb-common-zatech-gaia-devcenter.test.za-tech.net',
    changeOrigin: true,
    pathRewrite: { '^/service': '' },  // '/server/api/'
  },
}
