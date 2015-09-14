(function() {

    // set the entries { title: url }
    var entries = {
      "Positive Social Action Hero Missions": "http://focallocal.org",
      "Community News": "http://focallocal.org",
      "What is the Focallocal Movement?": "http://focallocal.org",
      "Events": "http://focallocal.org",
      "Shop": "http://focallocal.org",
    }

  var loadCss = function(cssPath) {
    link = document.createElement( "link" );
    link.href = cssPath;
    link.type = "text/css";
    link.rel = "stylesheet";
    link.media = "screen,print";
    document.getElementsByTagName( "head" )[0].appendChild( link );
  }

  var createEntry = function(title, href) {
    var div = document.createElement("div");
    var a = document.createElement("a");
    a.href = href;
    a.innerHTML = title;
    div.appendChild(a);
    return div;
  }

  // add the fl-menu to the body as first child
  var menu = document.createElement("div");
  menu.id = "fl-menu";
  document.body.insertBefore(menu, document.body.firstChild);

  // add container for links to the menu
  var container = document.createElement("div");
  container.className = "menu-container row";
  menu.appendChild(container);

  // add the logo
  var logo = createEntry("Focallocal", "http://focallocal.org");
  logo.className = "menu-logo col s1";
  container.appendChild(logo);

  // add entries to container
  for(var title in entries) {
    if(entries.hasOwnProperty(title)) {
      var url = entries[title];
      var entry = createEntry(title, url);
      entry.className = "menu-item col s2";
      container.appendChild(entry);
    }
  }

  // las entry gets special css treament
  container.lastChild.className += " last-child";

  /* LOAD CSS */
  // materialize grid stuff
  loadCss("https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.1/css/materialize.min.css");

  // get URL to folder, from which this script was loaded and include fl-menu.css
  var scriptEls = document.getElementsByTagName( 'script' );
  var thisScriptEl = scriptEls[scriptEls.length - 1];
  var scriptPath = thisScriptEl.src;
  var scriptFolder = scriptPath.substr(0, scriptPath.lastIndexOf( '/' )+1 );
  loadCss(scriptFolder + "fl-menu.css");

})();
