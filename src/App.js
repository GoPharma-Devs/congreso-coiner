import React from 'react';

import './App.css';
import { ZoomMtg } from '@zoomus/websdk';

ZoomMtg.setZoomJSLib('https://source.zoom.us/2.9.0/lib', '/av');

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
  var meetingNumber = '81297002561';
  var role = 0;
  var leaveUrl = 'https://congreso.coiner.org/';
  var userName = 'COINER-asistente';
  var userEmail = 'carlos.boor@gmail.com';
  var passWord = 'GOpharma2021*';

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
          sdkKey: sdkKey,
          signature: signature, // role in SDK signature needs to be 0
          meetingNumber: meetingNumber,
          passWord: passWord,
          userName: userName,
          userEmail: userEmail, // userEmail property required
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
        <img src='/logo-coiner.svg' className='coiner' alt='' />
        <img src='/logo.png' className='logo' alt='Coiner' />

        <button className='my-4' onClick={getSignature}>
          Iniciar congreso
        </button>

        <section id='sponsors' aria-label='Sponsors' className='py-1 '>
          <div className='mx-auto max-w-7xl '>
            <p>Gracias a nuestros patrocinadores y aliados</p>
            <div className='sponsors mx-auto mt-20 mb-20 flex max-w-max place-content-center gap-y-12  sm:grid-cols-3 md:gap-x-5 '>
              <div className='flex items-center justify-center'>
                <img
                  alt='Biomarin'
                  src='https://firebasestorage.googleapis.com/v0/b/comite-coiner.appspot.com/o/Patrocinadores%2F2.png?alt=media&token=63f7d91b-47f4-4c1b-b397-9bd97b515a31'
                  width={158}
                  height={48}
                  decoding='async'
                  data-nimg='future'
                  loading='lazy'
                  style={{ color: 'transparent' }}
                />
              </div>
              <div className='flex items-center justify-center'>
                <img
                  alt='Go Pharma'
                  src='https://firebasestorage.googleapis.com/v0/b/go-pharma-website.appspot.com/o/gopharma-logo.png?alt=media&token=396b8608-07b1-48c9-91d2-619ad1b2cd90'
                  width={105}
                  height={48}
                  decoding='async'
                  data-nimg='future'
                  loading='lazy'
                  style={{ color: 'transparent' }}
                />
              </div>
              <div className='flex items-center justify-center'>
                <img
                  alt='Novartis'
                  src='https://firebasestorage.googleapis.com/v0/b/comite-coiner.appspot.com/o/Patrocinadores%2F7.png?alt=media&token=87574aca-14ed-4d7a-9220-8e39337f3694'
                  width={127}
                  height={48}
                  decoding='async'
                  data-nimg='future'
                  loading='lazy'
                  style={{ color: 'transparent' }}
                />
              </div>
              <div className='flex items-center justify-center'>
                <img
                  alt='PTC LABORATORIES'
                  src='https://firebasestorage.googleapis.com/v0/b/assets-coiner2022.appspot.com/o/PTC.png?alt=media&token=5903841c-e569-417a-8141-7af611c2b693'
                  width={127}
                  height={48}
                  decoding='async'
                  data-nimg='future'
                  loading='lazy'
                  style={{ color: 'transparent' }}
                />
              </div>

              <div className='flex items-center justify-center'>
                <img
                  alt='Recordatti'
                  src='https://firebasestorage.googleapis.com/v0/b/comite-coiner.appspot.com/o/Patrocinadores%2Frecordati.png?alt=media&token=d133cc82-2957-4188-a49f-3c1b21554265'
                  width={138}
                  height={48}
                  decoding='async'
                  data-nimg='future'
                  loading='lazy'
                  style={{ color: 'transparent' }}
                />
              </div>

              <div className='flex items-center justify-center'>
                <img
                  alt='Takeda'
                  src='https://firebasestorage.googleapis.com/v0/b/coiner-2022.appspot.com/o/Takeda.png?alt=media&token=bfe70710-d7f2-40d1-8125-b2793583c2f9'
                  width={138}
                  height={48}
                  decoding='async'
                  data-nimg='future'
                  loading='lazy'
                  style={{ color: 'transparent' }}
                />
              </div>
              <div className='flex items-center justify-center'>
                <img
                  alt='Ultragenyx'
                  src='https://firebasestorage.googleapis.com/v0/b/comite-coiner.appspot.com/o/Patrocinadores%2F8.png?alt=media&token=9888717c-8c0c-4eb0-a1fb-51d69266ea62'
                  width={136}
                  height={48}
                  decoding='async'
                  data-nimg='future'
                  loading='lazy'
                  style={{ color: 'transparent' }}
                />
              </div>
              <div className='flex items-center justify-center'>
                <img
                  alt='Omer'
                  src='https://firebasestorage.googleapis.com/v0/b/comite-coiner.appspot.com/o/Patrocinadores%2FOMER_LOGO%402x.png?alt=media&token=8b20c418-05cd-421f-b398-6626ec6b63bf'
                  width={158}
                  height={48}
                  decoding='async'
                  data-nimg='future'
                  loading='lazy'
                  style={{ color: 'transparent' }}
                />
              </div>
              <div className='flex items-center justify-center'>
                <img
                  alt='JAJAX'
                  src='https://firebasestorage.googleapis.com/v0/b/comite-coiner.appspot.com/o/Patrocinadores%2FMPS_JAJAX_LOGO.png?alt=media&token=65eaa1c6-cef8-43d2-a557-de2c35c79589'
                  width={105}
                  height={48}
                  decoding='async'
                  data-nimg='future'
                  loading='lazy'
                  style={{ color: 'transparent' }}
                />
              </div>
              <div className='flex items-center justify-center'>
                <img
                  alt='Nadie es menos'
                  src='https://firebasestorage.googleapis.com/v0/b/comite-coiner.appspot.com/o/Patrocinadores%2FLogo_NEM.png?alt=media&token=ea434608-8e0b-47eb-a046-8f08eac13841'
                  width={127}
                  height={48}
                  decoding='async'
                  data-nimg='future'
                  loading='lazy'
                  style={{ color: 'transparent' }}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
