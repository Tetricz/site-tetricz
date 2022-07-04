//smoothly drops nav down by increasing the maxHeight
function dropnav(){
    const nav = document.getElementById("nav-block");
    const navbtn = document.getElementById("nav-button");
    if (nav.style.maxHeight){
      navbtn.classList = "navbtn"
      nav.style.maxHeight = null;
    } else {
      navbtn.classList = "navbtn-active"
      nav.style.maxHeight = nav.scrollHeight + "px";
    }
}

var isDone = false;
function getDone(){
  return isDone;
}

var navData;
function getNavData(){
  return navData
}

// initilize functions and settings on browser load
window.addEventListener('load', function(){
  console.log(navigator.userAgentData)
  let userData = navigator.userAgentData;
  const navbar = document.querySelector('#nav')

  //xhr setup
  xhr = new XMLHttpRequest();
  xhr.open("GET", "https://www.tetricz.com/archive/v2/info.json", true);
  xhr.responseType = 'json';

  // test for mobile device
  // set nav for mobile
  if( userData.mobile ) {
    xhr.onload = () => {
      if (xhr.status === 200) {
        var nav = xhr.response.nav;
        navData = xhr.response;
        let navString = `<button id="nav-button" onclick="dropnav()" class="navbtn"></button>
                            <ul id="nav-block">`;
        for (var i of nav) {
          let name = i.name;
          let href = i.href;
          navString += `<a class="nav-link-mobile" href="${href}"><li>${name}</li></a>`;
        }
        navString += `</ul>`;
        navbar.innerHTML = navString;
        isDone = true;
      }
      else {
        alert('Request failed. Returned status of ' + xhr.status);
      }
    }
    xhr.send()
  }else{  // not on mobile, set nav and columns for desktop use
    xhr.onload = () => {
      if (xhr.status === 200) {
        const columnL = document.querySelector('#side-column-left')
        const columnM = document.querySelector('#main-column')
        const columnR = document.querySelector('#side-column-right')
        columnL.classList = "col-2"
        columnM.classList = "col"
        columnR.classList = "col-1"
        columnL.innerHTML = `<div class="index-nav"><div id="left-nav" class="inner-nav"><button class="inner-nav-btn" style="font-size:1.3rem;text-align:center" onclick="window.location.href='#';">Top</button></div></div>`;
        var nav = xhr.response.nav;
        navData = xhr.response;
        let navString = `<div class="top-nav">`;
        for (var i of nav) {
          let name = i.name;
          let href = i.href;
          navString += `<a class="nav-link" href="${href}">${name}</a>`;
        }
        navString += `</div>`;
        navbar.innerHTML = navString;
        isDone = true;
      }
      else {
        alert('Request failed. Returned status of ' + xhr.status);
      }
    }
    xhr.send()
  }
});
