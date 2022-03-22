// initilize functions and settings on browser load
window.addEventListener('load', function(){
  //This resizes the Youtube video based on height to width
  const embed_video = document.querySelector('#embed-video')
  if(embed_video){
    if (window.innerWidth > 720){
      embed_video.width=720
      embed_video.height=405
      embed_video.src="https://www.youtube-nocookie.com/embed/j1mlcT1jliQ"
    }else{
      embed_video.width=window.innerWidth
      embed_video.height=(window.innerWidth / (16/9))
      embed_video.src="https://www.youtube-nocookie.com/embed/j1mlcT1jliQ"
    }
  }
});

// used to change things on resize based on height to width ratio
window.addEventListener('resize', function(){
  const embed_video = document.querySelector('#embed-video')
  if (window.innerWidth > 720){
    embed_video.width=720
    embed_video.height=405
  }else{
    embed_video.width=window.innerWidth
    embed_video.height=(window.innerWidth / (16/9))
  }
});
