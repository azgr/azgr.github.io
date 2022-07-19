ZoomMtg.preLoadWasm()
ZoomMtg.prepareWebSDK()
// loads language files, also passes any error messages to the ui
ZoomMtg.i18n.load('en-US')
ZoomMtg.i18n.reload('en-US')

ZoomMtg.setZoomJSLib('https://source.zoom.us/2.5.0/lib', '/av')

// setup your signature endpoint here: https://github.com/zoom/meetingsdk-sample-signature-node.js
var signatureEndpoint = 'https://signature-developing-applic.herokuapp.com/'
var sdkKey = 'ZWsGLbevwzZA2hgVk6ljRBPaXim5Pa4cpgsd'
var meetingNumber = '2796149035'
var role = 1
var leaveUrl = 'https://azgr.github.io/'
var userName = 'DKR'
var userEmail = ''
var passWord = 'agr'
// pass in the registrant's token if your meeting or webinar requires registration. More info here:
// Meetings: https://marketplace.zoom.us/docs/sdk/native-sdks/web/client-view/meetings#join-meeting-with-registration-required
// Webinars: https://marketplace.zoom.us/docs/sdk/native-sdks/web/client-view/webinars#join-webinar-with-registration-required
var registrantToken = ''

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

  document.getElementById('zmmtg-root').style.display = 'block'

  ZoomMtg.init({
    leaveUrl: leaveUrl,
    success: (success) => {
      console.log(success)
      ZoomMtg.join({
        signature: signature,
        sdkKey: sdkKey,
        meetingNumber: meetingNumber,
        userName: userName,
        userEmail: userEmail,
        passWord: passWord,
        tk: registrantToken,
        success: (success) => {
          console.log(success)
        },
        error: (error) => {
          console.log(error)
        },
      })
    },
    error: (error) => {
      console.log(error)
    }
  })
}

public void showMeetingWindow(final Context context) {

ZoomSDK.getInstance().getInMeetingService().getInMeetingShareController().addListener(this);

List<Long> userList = ZoomSDK.getInstance().getInMeetingService().getInMeetingUserList();
if (null == userList || userList.size() < 2) {
    //only me
    return;
}


refContext = new SoftReference<>(context);
if (mbAddedView) {
    windowView.setVisibility(View.VISIBLE);
    addVideoUnit();
    return;
}

if (null == mWindowManager) {
    mWindowManager = (WindowManager) context.getSystemService(Context.WINDOW_SERVICE);
}

if (null == windowView) {
    windowView = LayoutInflater.from(context).inflate(R.layout.layout_meeting_window, null);
    mobileRTCVideoView = (MobileRTCVideoView) windowView.findViewById(R.id.active_video_view);
    renderInfo = new MobileRTCVideoUnitRenderInfo(0, 0, 100, 100);
    renderInfo.is_border_visible = true;
    gestureDetector = new GestureDetector(context, new SingleTapConfirm());
    windowView.setOnTouchListener(onTouchListener);
}

mWindowManager.addView(windowView, getLayoutParams(context));
mbAddedView = true;
addVideoUnit();
}