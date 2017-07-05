/*eslint-disable node-console*/
import webpack from 'webpack';
import webpackConfig from '../webpack.config.prod';
import color from 'colors';

process.env.NODE_ENV ='production';

console.log('Generateing Minified bundle for production'.blue);

webpack(webpackConfig).run((err, stats) =>{
  if(err){
    console.log(err.bold.red);
    return 1;
  }

  const jsonStates = stats.toJson();

  if(jsonStates.hasErrors){
    return jsonStates.errors.map(error => console.log(error.red));
  }

  if(jsonStates.hasWarnings){
    console.log('Webpack generated following waring'.yellow);
    jsonStates.warnings.map(warning => console.log(warning.yellow));
  }

  console.log(`webpack states ${stats}`);

  console.log(`your app is comipled and written to /dist and its ready to use in production`);

  return 0;

})

