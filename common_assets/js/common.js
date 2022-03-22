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

    navbar.innerHTML = `<button id="nav-button" onclick="dropnav()" class="navbtn"></button>
                        <ul id="nav-block">
                            <a class="nav-link-mobile" href="https://www.tetricz.com/"><li>About</li></a>
                        </ul>`
  }else{
    navbar.innerHTML = `<div class="top-nav">
                          <a class="nav-link" href="https://www.tetricz.com/">About</a>
                        </div>`
  }
});
