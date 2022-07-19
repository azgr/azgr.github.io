const client = ZoomMtgEmbedded.createClient()

let meetingSDKElement = document.getElementById('meetingSDKElement')

// setup your signature endpoint here: https://github.com/zoom/meetingsdk-sample-signature-node.js
var signatureEndpoint = 'https://signature-developing-applic.herokuapp.com/'
var sdkKey = 'ZWsGLbevwzZA2hgVk6ljRBPaXim5Pa4cpgsd'
var meetingNumber = '2796149035'
var role = 1
var userName = 'AGR'
var userEmail = ''
var passWord = 'agr'
// pass in the registrant's token if your meeting or webinar requires registration. More info here:
// Meetings: https://marketplace.zoom.us/docs/sdk/native-sdks/web/component-view/meetings#join-meeting-with-registration-required
// Webinars: https://marketplace.zoom.us/docs/sdk/native-sdks/web/component-view/webinars#join-webinar-with-registration-required
var registrantToken = ''

client.init({
  zoomAppRoot: meetingSDKElement,
  language: 'en-US',
})

function getSignature() {
  fetch(signatureEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      meetingNumber: meetingNumber,
      role: role
    })
  }).then((response) => {
    return response.json()
  }).then((data) => {
    console.log(data)
    startMeeting(data.signature)
  }).catch((error) => {
  	console.log(error)
  })
}

function startMeeting(signature) {
  client.join({
    sdkKey: sdkKey,
    signature: signature,
    meetingNumber: meetingNumber,
    password: passWord,
    userName: userName,
    userEmail: userEmail,
    tk: registrantToken
  })
}
