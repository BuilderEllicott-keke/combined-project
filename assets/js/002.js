// c.js
let appInd;
const g = window.location.pathname === "/games.html";
const a = window.location.pathname === "/apps.html";
const c = window.location.pathname === "/gt";

let t;

try {
  t = window.top.location.pathname === "/d";
} catch {
  try {
    t = window.parent.location.pathname === "/d";
  } catch {
    t = false;
  }
}

function Span(name) {
  return name.split("").map(char => {
    const span = document.createElement("span");
    span.textContent = char;
    return span;
  });
}

function saveToLocal(path) {
  sessionStorage.setItem("GoUrl", path);
}

function handleClick(app) {
  if (typeof app.say !== "undefined") {
    alert(app.say);
  }

  let Selected = app.link;
  if (app.links && app.links.length > 1) {
    Selected = getSelected(app.links);
    if (!Selected) {
      return false;
    }
  }

  if (app.local) {
    saveToLocal(Selected);
    window.location.href = "rx";
    if (t) {
      window.location.href = Selected;
    }
  } else if (app.local2) {
    saveToLocal(Selected);
    window.location.href = Selected;
  } else if (app.blank) {
    blank(Selected);
  } else if (app.now) {
    now(Selected);
    if (t) {
      window.location.href = Selected;
    }
  } else if (app.custom) {
    Custom(app);
  } else if (app.dy) {
    dy(Selected);
  } else if (app.cloak) {
    // Enhanced cloaking with about:blank
    openCloakedGame(Selected, app.name);
  } else {
    // For regular games, use enhanced cloaking by default
    if (Selected && Selected.startsWith('http')) {
      // External game - open with cloaking
      openCloakedGame(Selected, app.name);
    } else if (Selected) {
      // Local game or relative path
      window.location.href = Selected;
    }
  }
  return false;
}

function getSelected(links) {
  const options = links
    .map((link, index) => `${index + 1}: ${link.name}`)
    .join("\n");
  const choice = prompt(
    `Select a link by entering the corresponding number:\n${options}`,
  );
  const selectedIndex = Number.parseInt(choice, 10) - 1;

  if (
    Number.isNaN(selectedIndex) ||
    selectedIndex < 0 ||
    selectedIndex >= links.length
  ) {
    alert("Invalid selection. Please try again.");
    return null;
  }

  return links[selectedIndex].url;
}

function CustomApp(customApp) {
  let apps;
  if (g) {
    apps = localStorage.getItem("Gcustom");
  } else if (c) {
    apps = localStorage.getItem("Tcustom");
  } else if (a) {
    apps = localStorage.getItem("Acustom");
  }

  if (apps === null) {
    apps = {};
  } else {
    apps = JSON.parse(apps);
  }

  const key = `custom${Object.keys(apps).length + 1}`;

  apps[key] = customApp;

  if (g) {
    localStorage.setItem("Gcustom", JSON.stringify(apps));
  } else if (c) {
    localStorage.setItem("Tcustom", JSON.stringify(apps));
  } else if (a) {
    localStorage.setItem("Acustom", JSON.stringify(apps));
  }
}

function setPin(index) {
  let pins;
  if (g) {
    pins = localStorage.getItem("Gpinned");
  } else if (c) {
    pins = localStorage.getItem("Tpinned");
  } else if (a) {
    pins = localStorage.getItem("Apinned");
  }

  if (pins === null || pins === "") {
    pins = [];
  } else {
    pins = pins.split(",").map(Number);
  }
  if (pinContains(index, pins)) {
    const remove = pins.indexOf(index);
    pins.splice(remove, 1);
  } else {
    pins.push(index);
  }
  if (g) {
    localStorage.setItem("Gpinned", pins);
  } else if (c) {
    localStorage.setItem("Tpinned", pins);
  } else if (a) {
    localStorage.setItem("Apinned", pins);
  }
  location.reload();
}

function pinContains(i, p) {
  if (p === "") {
    return false;
  }
  for (const x of p) {
    if (x === i) {
      return true;
    }
  }
  return false;
}

function Custom(app) {
  const title = prompt("Enter title for the app:");
  const link = prompt("Enter link for the app:");
  if (title && link) {
    const customApp = {
      name: `[Custom] ${title}`,
      link: link,
      image: "/assets/media/icons/custom.webp",
      custom: false,
    };

    CustomApp(customApp);
    CreateCustomApp(customApp);
  }
}

function CreateCustomApp(customApp) {
  const columnDiv = document.createElement("div");
  columnDiv.classList.add("column");
  columnDiv.setAttribute("data-category", "all");

  const pinIcon = document.createElement("i");
  pinIcon.classList.add("fa", "fa-map-pin");
  pinIcon.ariaHidden = true;

  const btn = document.createElement("button");
  btn.appendChild(pinIcon);
  btn.style.float = "right";
  btn.style.cursor = "pointer";
  btn.style.backgroundColor = "rgb(45,45,45)";
  btn.style.borderRadius = "50%";
  btn.style.borderColor = "transparent";
  btn.style.color = "white";
  btn.style.top = "-200px";
  btn.style.position = "relative";
  btn.onclick = () => {
    setPin(appInd);
  };
  btn.title = "Pin";

  const linkElem = document.createElement("a");
  linkElem.onclick = () => {
    handleClick(customApp);
  };

  const image = document.createElement("img");
  image.width = 145;
  image.height = 145;
  image.src = customApp.image;
  image.loading = "lazy";

  const paragraph = document.createElement("p");

  for (const span of Span(customApp.name)) {
    paragraph.appendChild(span);
  }

  linkElem.appendChild(image);
  linkElem.appendChild(paragraph);
  columnDiv.appendChild(linkElem);
  columnDiv.appendChild(btn);

  const nonPinnedApps = document.querySelector(".apps");
  nonPinnedApps.insertBefore(columnDiv, nonPinnedApps.firstChild);
}

document.addEventListener("DOMContentLoaded", () => {
  let storedApps;
  if (g) {
    storedApps = JSON.parse(localStorage.getItem("Gcustom"));
  } else if (c) {
    storedApps = JSON.parse(localStorage.getItem("Tcustom"));
  } else if (a) {
    storedApps = JSON.parse(localStorage.getItem("Acustom"));
  }
  if (storedApps) {
    for (const app of Object.values(storedApps)) {
      CreateCustomApp(app);
    }
  }
});

let path = "/assets/json/combined-games.json";
if (g) {
  path = "/assets/json/combined-games.json";
} else if (c) {
  path = "/assets/json/t.min.json";
} else if (a) {
  path = "/assets/json/a.min.json";
}
fetch(path)
  .then(response => {
    return response.json();
  })
  .then(appsList => {
    appsList.sort((a, b) => {
      if (a.name.startsWith("[Custom]")) {
        return -1;
      }
      if (b.name.startsWith("[Custom]")) {
        return 1;
      }
      return a.name.localeCompare(b.name);
    });
    const nonPinnedApps = document.querySelector(".apps");
    const pinnedApps = document.querySelector(".pinned");
    let pinList;
    if (g) {
      pinList = localStorage.getItem("Gpinned") || "";
    } else if (a) {
      pinList = localStorage.getItem("Apinned") || "";
    } else if (c) {
      pinList = localStorage.getItem("Tpinned") || "";
    }
    pinList = pinList ? pinList.split(",").map(Number) : [];
    appInd = 0;

    for (const app of appsList) {
      if (app.categories?.includes("local")) {
        app.local = true;
      } else if (
        app.link &&
        (app.link.includes("now.gg") || app.link.includes("nowgg.me"))
      ) {
        if (app.partial === null || app.partial === undefined) {
          app.partial = true;
          app.say = "Now.gg is currently not working for some users.";
        }
      } else if (app.link?.includes("nowgg.nl")) {
        if (app.error === null || app.error === undefined) {
          app.error = true;
          app.say = "NowGG.nl is currently down.";
        }
      }

      const pinNum = appInd;

      const columnDiv = document.createElement("div");
      columnDiv.classList.add("column");
      columnDiv.setAttribute("data-category", app.categories.join(" "));

      const pinIcon = document.createElement("i");
      pinIcon.classList.add("fa", "fa-map-pin");
      pinIcon.ariaHidden = true;

      const btn = document.createElement("button");
      btn.appendChild(pinIcon);
      btn.style.float = "right";
      btn.style.backgroundColor = "rgb(45,45,45)";
      btn.style.borderRadius = "50%";
      btn.style.borderColor = "transparent";
      btn.style.color = "white";
      btn.style.top = "-200px";
      btn.style.position = "relative";
      btn.onclick = () => {
        setPin(pinNum);
      };
      btn.title = "Pin";

      const link = document.createElement("a");

      link.onclick = () => {
        handleClick(app);
      };

      const image = document.createElement("img");
      image.width = 145;
      image.height = 145;
      image.loading = "lazy";

      if (app.image) {
        image.src = app.image;
      } else {
        image.style.display = "none";
      }

      const paragraph = document.createElement("p");

      for (const span of Span(app.name)) {
        paragraph.appendChild(span);
      }

      if (app.error) {
        paragraph.style.color = "red";
        if (!app.say) {
          app.say = "This app is currently not working.";
        }
      } else if (app.load) {
        paragraph.style.color = "yellow";
        if (!app.say) {
          app.say = "This app may experience excessive loading times.";
        }
      } else if (app.partial) {
        paragraph.style.color = "yellow";
        if (!app.say) {
          app.say =
            "This app is currently experiencing some issues, it may not work for you. (Dynamic doesn't work in about:blank)";
        }
      }

      link.appendChild(image);
      link.appendChild(paragraph);
      columnDiv.appendChild(link);

      if (appInd !== 0) {
        columnDiv.appendChild(btn);
      }

      if (pinList != null && appInd !== 0) {
        if (pinContains(appInd, pinList)) {
          pinnedApps.appendChild(columnDiv);
        } else {
          nonPinnedApps.appendChild(columnDiv);
        }
      } else {
        nonPinnedApps.appendChild(columnDiv);
      }
      appInd += 1;
    }

    const appsContainer = document.getElementById("apps-container");
    if (appsContainer) {
      appsContainer.appendChild(pinnedApps);
      appsContainer.appendChild(nonPinnedApps);
    }
  })
  .catch(error => {
    console.error("Error fetching JSON data:", error);
    // Show user-friendly error message
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = 'background: #ff4444; color: white; padding: 20px; margin: 20px; border-radius: 8px; text-align: center;';
    errorDiv.innerHTML = `
      <h3>Failed to load games</h3>
      <p>There was an error loading the game library. Please refresh the page.</p>
      <button onclick="location.reload()" style="background: white; color: #ff4444; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer;">Refresh Page</button>
    `;
    document.body.appendChild(errorDiv);
  });

function category() {
  const selectedCategories = Array.from(
    document.querySelectorAll("#category option:checked"),
  ).map(option => option.value);
  const g = document.getElementsByClassName("column");

  for (const game of g) {
    const categories = game.getAttribute("data-category").split(" ");

    if (
      selectedCategories.length === 0 ||
      selectedCategories.some(category => categories.includes(category))
    ) {
      game.style.display = "block";
    } else {
      game.style.display = "none";
    }
  }
}

function bar() {
  const input = document.getElementById("search");
  const filter = input.value.toLowerCase();
  const g = document.getElementsByClassName("column");

  for (const game of g) {
    const name = game.getElementsByTagName("p")[0].textContent.toLowerCase();

    if (name.includes(filter)) {
      game.style.display = "block";
    } else {
      game.style.display = "none";
    }
  }
}

// Enhanced cloaking function using about:blank technique
function openCloakedGame(url, gameName) {
  try {
    // Open new window with about:blank
    const cloakedWindow = window.open('about:blank', '_blank', 'width=1200,height=800,scrollbars=yes,resizable=yes');
    
    if (!cloakedWindow) {
      // Fallback if popup blocked
      alert('Popup blocked! Please allow popups for this site.');
      return;
    }

    // Create the cloaked HTML content
    const cloakedHTML = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Tab</title>
        <style>
          body {
            margin: 0;
            padding: 0;
            background: #000;
            color: #fff;
            font-family: Arial, sans-serif;
            overflow: hidden;
          }
          .stealth-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #000;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            transition: opacity 0.5s ease;
          }
          .stealth-overlay.hidden {
            opacity: 0;
            pointer-events: none;
          }
          .stealth-text {
            font-size: 14px;
            color: #333;
            text-align: center;
          }
          .game-container {
            width: 100%;
            height: 100vh;
            position: relative;
          }
          .game-iframe {
            width: 100%;
            height: 100%;
            border: none;
            display: none;
          }
          .game-iframe.visible {
            display: block;
          }
          .reveal-hint {
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0,0,0,0.7);
            padding: 10px 20px;
            border-radius: 20px;
            font-size: 12px;
            color: #888;
            opacity: 0;
            transition: opacity 0.3s ease;
          }
          .reveal-hint.show {
            opacity: 1;
          }
        </style>
      </head>
      <body>
        <!-- Stealth overlay -->
        <div class="stealth-overlay" id="stealthOverlay">
          <div class="stealth-text">about:blank</div>
        </div>
        
        <!-- Game container -->
        <div class="game-container">
          <iframe class="game-iframe" id="gameFrame" src="${url}"></iframe>
          <div class="reveal-hint" id="revealHint">Click anywhere to reveal game</div>
        </div>

        <script>
          let stealthMode = true;
          let inactivityTimer;
          
          function revealGame() {
            stealthMode = false;
            document.getElementById('stealthOverlay').classList.add('hidden');
            document.getElementById('gameFrame').classList.add('visible');
            document.getElementById('revealHint').classList.add('show');
            document.title = '${gameName || 'Game'} - Intersellar';
            
            // Hide hint after 3 seconds
            setTimeout(() => {
              document.getElementById('revealHint').classList.remove('show');
            }, 3000);
          }
          
          function hideGame() {
            stealthMode = true;
            document.getElementById('stealthOverlay').classList.remove('hidden');
            document.getElementById('gameFrame').classList.remove('visible');
            document.getElementById('revealHint').classList.remove('show');
            document.title = 'New Tab';
          }
          
          // Show game on any interaction
          document.addEventListener('click', function() {
            if (stealthMode) {
              revealGame();
            }
          });
          
          document.addEventListener('keydown', function() {
            if (stealthMode) {
              revealGame();
            }
          });
          
          document.addEventListener('mousemove', function() {
            if (stealthMode) {
              clearTimeout(inactivityTimer);
              inactivityTimer = setTimeout(revealGame, 2000);
            }
          });
          
          // Auto-hide after 30 seconds of inactivity
          function resetInactivityTimer() {
            clearTimeout(inactivityTimer);
            inactivityTimer = setTimeout(() => {
              if (!stealthMode) {
                hideGame();
              }
            }, 30000);
          }
          
          document.addEventListener('mousemove', resetInactivityTimer);
          document.addEventListener('keydown', resetInactivityTimer);
          document.addEventListener('click', resetInactivityTimer);
          
          // Initialize
          resetInactivityTimer();
          
          // Show hint after 2 seconds
          setTimeout(() => {
            if (stealthMode) {
              document.getElementById('revealHint').classList.add('show');
            }
          }, 2000);
        </script>
      </body>
      </html>
    `;
    
    // Write the cloaked content to the new window
    cloakedWindow.document.write(cloakedHTML);
    cloakedWindow.document.close();
    
    // Focus the new window
    cloakedWindow.focus();
    
  } catch (error) {
    console.error('Error opening cloaked game:', error);
    // Fallback to regular window.open
    window.open(url, '_blank');
  }
}