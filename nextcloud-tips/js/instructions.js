// initilize functions and settings on browser load
window.addEventListener('load', function(){
  console.log(navigator.userAgentData)
  let userData = navigator.userAgentData;
  const navbar = document.querySelector('#nav')
  // test for mobile device
  // if so change formatting and change navbar type
  if( userData.mobile ) {
    // these are the changes to be made to the columns if it's a phone browser
    const columnL = document.querySelector('#side-column-left')
    const columnM = document.querySelector('#main-column')
    const columnR = document.querySelector('#side-column-right')
    columnL.classList = "col-"
    columnM.classList = "col"
    columnR.classList = "col-"
  }

  const embed_video = document.getElementsByClassName('embed-video')
  if(embed_video){
    if (window.innerWidth > 720){
      for (var i = 0; i < embed_video.length; i++) {
        embed_video[i].style.width='640px';
        embed_video[i].style.height='360px';
      }
    }else{
      for (var i = 0; i < embed_video.length; i++) {
        embed_video[i].style.width=window.innerWidth;
        embed_video[i].style.height=(window.innerWidth / (16/9))
      }
    }
  }
});
