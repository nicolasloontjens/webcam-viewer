navigator.mediaDevices
  .enumerateDevices()
  .then((devices) =>
    devices.filter((device) => device.kind === "videoinput")
  )
  .then((devices) =>
    devices
      .map((device) => {
        return {
          kind: device.kind,
          label: device.label,
          deviceId: device.deviceId
        }
      })
  )
  .then((devices)=>{
    startVideo(devices);
  });

function startVideo(devices) {
  const constraints = {
    video: { width: 1920, height: 1080 },
    audio: false,
  };

  let videoDeviceId = devices.filter((device) => device.kind === "videoinput")[0].deviceId;

  if (videoDeviceId) {
    constraints.video.deviceId = { exact: videoDeviceId };
  }
  
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then((stream) => {
      document.querySelector("video").srcObject = stream;
    });
}

function enterFullscreen() {
  const element = document.documentElement;

  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  }
}