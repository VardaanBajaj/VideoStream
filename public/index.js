document.addEventListener('DOMContentLoaded', init, false);

var init=()=>{
  const VP=document.getElementById('videoPlayer');
  const VPToggle=document.getElementById('toggleButton');

  VPToggle.addEventListener('click', ()=>{
    if(VP.paused())
      VP.play();
    else {
      VP.pause();
    }
  });
};
