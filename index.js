 //==AppDynamics Code Intizial===

require("appdynamics").profile({
  controllerHostName: 'XXXX.saas.appdynamics.com',
  controllerPort: 443, 
  controllerSslEnabled: true,  // Set to true if controllerPort is SSL
  accountName: 'XXXX',
  accountAccessKey: 'XXXX', //required
  applicationName: 'Mithun_Node_Application.js',
  tierName: 'tiername',
  nodeName: 'nodename',
  reuseNode: true,
  reuseNodePrefix: 'nodenameprefix',
  logging: {
      logfiles: [
           {'filename': 'nodejs_agent_%N.log', 'level': 'TRACE'},
           {'filename': 'nodejs_agent_%N.protolog', 'level': 'TRACE', 'channel': 'protobuf'}
       ]
   } 
 });

 //==LaunchDarkly Code===

var LaunchDarkly = require('launchdarkly-node-server-sdk');

// Set sdkKey to your LaunchDarkly SDK key.
const sdkKey = "XXXX";

// Set featureFlagKey to the feature flag key you want to evaluate.
const featureFlagKey = "XXXX";


function showMessage(s) {
  console.log("*** " + s);
  console.log("");
}

if (sdkKey == "") {
  showMessage("Please edit index.js to set sdkKey to your LaunchDarkly SDK key first");
  process.exit(1);
}

let client;
async function boo() {
  if (!client) {
    client = LaunchDarkly.init(sdkKey);
    await client.waitForInitialization();
  }
// Set up the context properties. This context should appear on your LaunchDarkly contexts dashboard
// soon after you run the demo.
const context = {
  kind: "user",
  key: "example-context-key",
  name: "Sandy"
};

  const allFlagsState = await client.allFlagsState(context);
  const flags = allFlagsState.allValues();
  return flags;
}



//==Application Code===

const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || '3000';

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));
var testvalue=3;

app.get("/", async (req, res) => {
  const flags = await boo();
  res.send(
    `<pre>
flags
${new Date().toISOString()}

${JSON.stringify(flags, null, 2)}
</pre>`
  );
});


app.listen(port, () => {
  console.log(`App is running inside the container at port http://localhost:${port}`);
});



