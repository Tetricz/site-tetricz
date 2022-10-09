/**
 * Utils
 */

// Throttle
//
throttle = (callback, limit) => {
  timeoutHandler = null;
  return () => {
    if (timeoutHandler == null) {
      timeoutHandler = setTimeout(() => {
        callback();
        timeoutHandler = null;
      }, limit);
    }
  };
};

// addEventListener Helper
//
listen = (ele, e, callback) => {
  if (document.querySelector(ele) !== null) {
    document.querySelector(ele).addEventListener(e, callback);
  }
};

/**
 * Functions
 */

// Auto Hide Header
//
header = document.getElementById('site-header');
lastScrollPosition = window.pageYOffset;

autoHideHeader = () => {
  currentScrollPosition = window.pageYOffset;
  if (currentScrollPosition > lastScrollPosition) {
    header.classList.remove('slideInUp');
    header.classList.add('slideOutDown');
  } else {
    header.classList.remove('slideOutDown');
    header.classList.add('slideInUp');
  }
  lastScrollPosition = currentScrollPosition;
};

// Mobile Menu Toggle
//
mobileMenuVisible = false;

toggleMobileMenu = () => {
  mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenuVisible == false) {
    mobileMenu.style.animationName = 'bounceInRight';
    mobileMenu.style.webkitAnimationName = 'bounceInRight';
    mobileMenu.style.display = 'block';
    mobileMenuVisible = true;
  } else {
    mobileMenu.style.animationName = 'bounceOutRight';
    mobileMenu.style.webkitAnimationName = 'bounceOutRight';
    mobileMenuVisible = false;
  }
};

// Featured Image Toggle
//
showImg = () => {
  document.querySelector('.bg-img').classList.add('show-bg-img');
};

hideImg = () => {
  document.querySelector('.bg-img').classList.remove('show-bg-img');
};

// ToC Toggle
//
toggleToc = () => {
  document.getElementById('toc').classList.toggle('show-toc');
};

if (header !== null) {
  listen('#menu-btn', 'click', toggleMobileMenu);
  listen('#toc-btn', 'click', toggleToc);
  listen('#img-btn', 'click', showImg);
  listen('.bg-img', 'click', hideImg);

  window.addEventListener(
    'scroll',
    throttle(() => {
      autoHideHeader();

      if (mobileMenuVisible == true) {
        toggleMobileMenu();
      }
    }, 250)
  );
}
