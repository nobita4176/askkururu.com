export default {
  'root': '.',
  'publicDir': './public',
  'build': {
    'outDir': './docs',
    'rollupOptions': {
      'input': {
        'index': './index.html',
        'index2': './index2.html',
      },
      'output': {
        'entryFileNames': 'assets/[name].js',
        'chunkFileNames': 'assets/[name].js',
        'assetFileNames': 'assets/[name].[ext]',
      },
    },
  },
};
