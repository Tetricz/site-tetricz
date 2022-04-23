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

// initilize functions and settings on browser load
window.addEventListener('load', function(){
  console.log(navigator.userAgentData)
  let userData = navigator.userAgentData;
  const navbar = document.querySelector('#nav')

  //xhr setup
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "https://www.tetricz.com/info.json", true);
  xhr.responseType = 'json';

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

    xhr.onload = () => {
      if (xhr.status === 200) {
        var nav = xhr.response.nav;
        let navString = `<button id="nav-button" onclick="dropnav()" class="navbtn"></button>
                            <ul id="nav-block">`;
        for (var i of nav) {
          let name = i.name;
          let href = i.href;
          navString += `<a class="nav-link-mobile" href="${href}"><li>${name}</li></a>`;
        }
        navString += `</ul>`;
        navbar.innerHTML = navString;
      }
      else {
        alert('Request failed. Returned status of ' + xhr.status);
      }
    }
    xhr.send()
  }else{
    xhr.onload = () => {
      if (xhr.status === 200) {
        var nav = xhr.response.nav;
        let navString = `<div class="top-nav">`;
        for (var i of nav) {
          let name = i.name;
          let href = i.href;
          navString += `<a class="nav-link" href="${href}">${name}</a>`;
        }
        navString += `</div>`;
        navbar.innerHTML = navString;
      }
      else {
        alert('Request failed. Returned status of ' + xhr.status);
      }
    }
    xhr.send()
  }
});
