import React from 'react';

import './App.css';
import { ZoomMtg } from '@zoomus/websdk';

ZoomMtg.setZoomJSLib('https://source.zoom.us/2.8.0/lib', '/av');

ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();
// loads language files, also passes any error messages to the ui
ZoomMtg.i18n.load('es-ES');
ZoomMtg.i18n.reload('es-ES');

function App() {
  // setup your signature endpoint here: https://github.com/zoom/meetingsdk-sample-signature-node.js
  var signatureEndpoint = 'https://signature-coiner-production.up.railway.app/';
  // This Sample App has been updated to use SDK App type credentials https://marketplace.zoom.us/docs/guides/build/sdk-app
  var sdkKey = 'HXw26mDaKLVcZEYs0kmaZNztcx2wR0IHo2g9';
  var meetingNumber = '88488043213';
  var role = 0;
  var leaveUrl = 'https://congreso.coiner.org/';
  var userName = 'Host';
  var userEmail = 'gopharmamex@gmail.com';
  var passWord = 'GOpharma2021*';
  // pass in the registrant's token if your meeting or webinar requires registration. More info here:
  // Meetings: https://marketplace.zoom.us/docs/sdk/native-sdks/web/client-view/meetings#join-registered
  // Webinars: https://marketplace.zoom.us/docs/sdk/native-sdks/web/client-view/webinars#join-registered
  var registrantToken = '';

  function getSignature(e) {
    e.preventDefault();

    fetch(signatureEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        meetingNumber: meetingNumber,
        role: role,
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        startMeeting(response.signature);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function startMeeting(signature) {
    document.getElementById('zmmtg-root').style.display = 'block';

    ZoomMtg.init({
      leaveUrl: leaveUrl,
      success: (success) => {
        console.log(success);

        ZoomMtg.join({
          signature: signature,
          meetingNumber: meetingNumber,
          userName: userName,
          sdkKey: sdkKey,
          userEmail: userEmail,
          passWord: passWord,
          tk: registrantToken,
          success: (success) => {
            console.log(success);
          },
          error: (error) => {
            console.log(error);
          },
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  return (
    <div className='App'>
      <main>
        <h1>Bienvenido</h1>

        <button onClick={getSignature}>Iniciar congreso</button>
      </main>
    </div>
  );
}

export default App;
