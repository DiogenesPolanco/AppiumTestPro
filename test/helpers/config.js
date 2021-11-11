 let path =require(  'path');


const SAUCE_TESTING = process.env.SAUCE_LABS;
const SAUCE_USERNAME = process.env.SAUCE_USERNAME;
const SAUCE_ACCESS_KEY = process.env.SAUCE_ACCESS_KEY;


const sauceCaps = SAUCE_TESTING
  ? {
    name: undefined, // will be added in tests
    build: `JavaScript (wd) Sample Code ${process.env.TRAVIS_BUILD_ID ? process.env.TRAVIS_BUILD_ID : new Date()}`,
    tags: ['e2e', 'appium', 'sample-code'],
  }
  : {};

 
// Leave the Android platformVersion blank and set deviceName to a random string
// (Android deviceName is ignored by Appium but is still required)
// If we're using SauceLabs, set the Android deviceName and platformVersion to
// the latest supported SauceLabs device and version
const DEFAULT_ANDROID_DEVICE_NAME = process.env.SAUCE_LABS ? 'Android GoogleAPI Emulator' : 'Google Nexus 10';
const DEFAULT_ANDROID_PLATFORM_VERSION = process.env.SAUCE_LABS ? '7.1' : '5';

const androidCaps = {
  platformName: 'Android',
  automationName: 'UiAutomator1',
  noSign:true,
  skipServerInstallation: false,
   allowTestPackages: true,
  deviceName: process.env.ANDROID_DEVICE_NAME || DEFAULT_ANDROID_DEVICE_NAME,
  platformVersion: process.env.ANDROID_PLATFORM_VERSION || DEFAULT_ANDROID_PLATFORM_VERSION,
  ...sauceCaps,
};

// figure out where the Appium server should be pointing to
const serverConfig =  {
    host: process.env.APPIUM_HOST || '0.0.0.0',
    port: process.env.APPIUM_PORT || 4723
  };


// figure out the location of the apps under test
const GITHUB_ASSET_BASE = 'https://github.com/DiogenesPolanco/AppiumTestPro/assets';
const LOCAL_ASSET_BASE = path.resolve(__dirname,'..','..','assets');
 
if (SAUCE_TESTING) { 
  androidCaps.app = `${GITHUB_ASSET_BASE}/app-debug.apk`;
} else { 
  androidCaps.app  = path.resolve(LOCAL_ASSET_BASE, 'app-debug.apk');
} 
module.exports =    { 
  androidCaps, sauceCaps,
  serverConfig,
  SAUCE_TESTING, SAUCE_USERNAME, SAUCE_ACCESS_KEY,
};
