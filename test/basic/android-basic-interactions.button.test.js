let wd =require( 'wd');
let chai =require(  'chai');
let {
  androidCaps, serverConfig 
} =require(  '../helpers/config');
const {assert} = chai;
  
describe('Basic Android interactions', function () {
  let driver;  

  before(async function () {
    // Connect to Appium server
    driver = await wd.promiseChainRemote(serverConfig);
 
    // Start the session, merging all the caps
    await driver.init(androidCaps);
  });
   
  it('should find button by ID', async function () { 
    let el1 = await driver.elementById("com.example.myapplication:id/button_first");
    await el1.click();
 
    await driver
        .waitForElementById("com.example.myapplication:id/button_second")
        .text()
        .then(function(text){ 
          assert.equal(text, "Previous");
      }) 
  });
});
