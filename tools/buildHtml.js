import fs from 'fs';
import cheerio from 'cheerio';
import colors from 'colors';

/*eslint-disable no-console */

// fs.readFile('src/index.html','utf8',(error,markup) =>{
//   if(error){
//     return console.log(error);
//   }
//
//   const $ = cheerio.load(markup);
//
//   $('head').prepend('<link rel="stylesheet" href="styles.css"/>');
//
//   fs.writeFile('dist/index.html', $.html,'utf8', function (error) {
//     if(error){
//       return console.log(error);
//     }
//     console.log('successfully index.html written to /dist'.green);
//   });
//
// });

fs.readFile('src/index.html', 'utf8', (err, markup) => {
  if (err) {
    return console.log(err);
  }

  const $ = cheerio.load(markup);

  // since a separate spreadsheet is only utilized for the production build, need to dynamically add this here.
  $('head').prepend('<link rel="stylesheet" href="styles.css">');

  fs.writeFile('dist/index.html', $.html(), 'utf8', function (err) {
    if (err) {
      return console.log(err);
    }
    console.log('index.html written to /dist'.green);
  });
});
