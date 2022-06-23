function loadNav(){
  let response = getNavData();
  const navL = document.querySelector('#left-nav')

  var nav = response.nctips;
  let navString = "";
  for (var i of nav){
      let name = i.name;
      let href = i.href;
      navString += `<button class="inner-nav-btn" onclick="window.location.href='${href}';">${name}</button><br>`;
  }
  navL.innerHTML += navString;
}

let interval_id = 0;
function checkReady(){
  if(interval_id <= 0){
      interval_id = setInterval(checkReady, 50)
  }
  var ready = getDone();
  if(ready){
      loadNav();
      clearInterval(interval_id);
  }
}


// initilize functions and settings on browser load
window.addEventListener('load', function(){
  checkReady();

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
