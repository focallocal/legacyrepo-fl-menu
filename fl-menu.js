(function() {

    // set the entries { title: url }
    var entries = {
      //"Shop": "http://focallocal.org",
      "About Focallocal": "http://focallocal.org/about-us/",
      "Community News": "http://focallocal.org",
      "Focallocal Events": "http://focallocal.meteor.com/events/map",
      "Activities": "http://focallocal.org/what-we-do-what-you-can-do/",
    }

  var loadCss = function(cssPath) {
    link = document.createElement( "link" );
    link.href = cssPath;
    link.type = "text/css";
    link.rel = "stylesheet";
    link.media = "screen,print";
    document.getElementsByTagName( "head" )[0].appendChild( link );
  }

   /*
   <nav class="nav-collapse">
    <ul>
      <li><a href="#">Home</a></li>
      <li><a href="#">About</a></li>
      <li><a href="#">Projects</a></li>
      <li><a href="#">Contact</a></li>
    </ul>
  </nav>
  */
  var createEntry = function(title, href) {
    var listElement = document.createElement("li");
    var link = document.createElement("a");
    link.href = href;
    link.innerHTML = title;
    listElement.appendChild(link);
    return listElement;
  }

  var wrapper = document.createElement("div");
  var menu = document.createElement("nav");
  var container = document.createElement("ul");
  var logo = document.createElement("a");

  wrapper.id = "fl-menu";
  logo.className = "menu-logo";
  logo.innerHTML = "Focallocal Menu";
  menu.className = "nav-collapse";

  wrapper.appendChild(logo);
  document.body.insertBefore(wrapper, document.body.firstChild); // add the fl-menu to the body as first child
  menu.appendChild(container);
  wrapper.appendChild(menu);

  // add entries to container
  for(var title in entries) {
    if(entries.hasOwnProperty(title)) {
      var url = entries[title];
      var entry = createEntry(title, url);
      entry.className = "";
      container.appendChild(entry);
    }
  }

  // las entry gets special css treament
  container.lastChild.className += " last-child";

  // settings for responsiveNav
  var responsiveNavSetting = {
  }

  // make navigation responsive
  var nav = responsiveNav(".nav-collapse", responsiveNavSetting);

  /* LOAD CSS */
  // get URL to folder, from which this script was loaded and include fl-menu.css
  var scriptEls = document.getElementsByTagName( 'script' );
  var thisScriptEl = scriptEls[scriptEls.length - 1];
  var scriptPath = thisScriptEl.src;
  var scriptFolder = scriptPath.substr(0, scriptPath.lastIndexOf( '/' )+1 );
  loadCss(scriptFolder + "fl-menu.all.css");

  /* Scrolling functionality
   * hide when scrolling down
   * show when scrolling up again (like top bar on google plus)
   *
   * @todo optimize function calls
   */
  var oldScrollPosition = document.body.scrollTop;
  document.onscroll = function() {
    // scrollind down
    if(document.body.scrollTop > oldScrollPosition) {
      wrapper.style.display = 'none';
    } else {
      wrapper.style.display = '';
    }
    // set
    oldScrollPosition = document.body.scrollTop;
  }


})();
