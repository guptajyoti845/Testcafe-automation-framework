const testCafe = require('testcafe');
const fs = require('fs');
const args = require('yargs').argv;
function runTest(tcOptions) {
  let tc1;
  if (args.browser < 1) {
    console.log('Using browser as default : chrome:headless');
    args.browser = 'chrome:headless';
  }
  if (args.concurrency < 1) {
    console.log('Using concurrency as default : 4');
    args.concurrency = 4;
  }
  testCafe()
    .then(function(tc) {
      console.log('Desktop Tests Started ....');
      tc1 = tc;
      let runner = tc.createRunner();

      return runner
        .src(['./tests/**/*.test.js'])
        .browsers([args.browser])
        .concurrency(args.concurrency)
        .filter((testName, fixtureName, fixturePath, testMeta, fixtureMeta) => {
          return filterFunction(testName, fixtureName, fixturePath, testMeta, fixtureMeta);
        })
        .run(tcOptions)
        .catch(function(error) {
          console.error(error);
          process.exit(-1);
        });
    })
    .then(failedCount => {
      if (failedCount > 0) {
        console.log('Error Desktop Tests failed: ' + failedCount);
        tc1.close();
        process.exit(-1);
      } else {
        tc1.close();
        process.exit(0);
      }
    })
    .catch(function(error) {
      console.error('Exception  -> ' + error);
      process.exit(-1);
    });
}

filterFunction = function(testName, fixtureName, fixturePath, testMeta, fixtureMeta) {
  if (args.fixturegrep != null)
    return fixtureName
      .toString()
      .toLowerCase()
      .includes(args.fixturegrep.toLowerCase());
  else return true;
};

const tcOptions = {
  debugMode: false,
  quarantineMode: true,
  skipJsErrors: true,
  skipUncaughtErrors: false
};

runTest(tcOptions);
