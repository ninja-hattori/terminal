let before = document.getElementById('before');
let liner = document.getElementById('liner');
let command = document.getElementById('typer');
let textarea = document.getElementById('texter');
let terminal = document.getElementById('terminal');

let commands = [];
let git = 0;

loadTheme();


setTimeout(function () {
  loopLines(banner, '', 80);
  textarea.focus();
}, 100);

window.addEventListener('keyup', enterKey);
window.addEventListener('keydown', keyDown);

textarea.value = '';
command.innerHTML = textarea.value;

function keyDown(e) {
  if (e.ctrlKey && e.key == 'l') {
    e.preventDefault();
    cls();
  }
  if (e.ctrlKey && e.key == 'p') {
    e.preventDefault();
    previousCMD();
  }
  if (e.ctrlKey && e.key == 'u') {
    e.preventDefault();
    deleteCMD();
  }
  if (e.key === 'Tab') {
    e.preventDefault();
    autoComplete();
  }
}


function enterKey(e) {
  if (e.keyCode == 13) {
    commands.push(command.innerHTML);
    git = commands.length;
    // console.log(command.innerHTML);
    if(existCommands.includes(command.innerHTML.toLowerCase())){
      addLine(
        '<span style="margin-bottom: -50px !important;"><span style="letter-spacing: -0.299em; margin-left: -0.05em;">&nbsp--------</span><span style="letter-spacing: -0.2em;">&nbsp</span><span style="font-weight:bold;">(<span style="color: #246dda;">visitor@ninja-hattori.com</span>)-[<span style="color: #d6dce2;">~</span></span>]</span></span><span><br style=\'content: "A" !important;display: block !important;margin-bottom: -0.6em !important;\'>|<br><br style=\'content: "A" !important;display: block !important;margin-bottom: -0.19em !important;\'>|<br style=\'content: "A" !important;display: block !important;margin-top: -0.7em !important;\'><span style="letter-spacing: -0.299em; margin-left: -0.05em;">&nbsp---</span><span style="letter-spacing: -0.2em;">&nbsp</span><span style="color: #d6dce2; font-weight: bold;">$</span></span><span style="margin-top: 0px !important;"></span> <span style="color:green; font-weight:bold;">' +
        command.innerHTML +
        '</span>',
        'liner no-animation',
        0
        );
      }
      else{
        addLine(
          '<span style="margin-bottom: -50px !important;"><span style="letter-spacing: -0.299em; margin-left: -0.05em;">&nbsp--------</span><span style="letter-spacing: -0.2em;">&nbsp</span><span style="font-weight:bold;">(<span style="color: #246dda;">visitor@ninja-hattori.com</span>)-[<span style="color: #d6dce2;">~</span></span>]</span></span><span><br style=\'content: "A" !important;display: block !important;margin-bottom: -0.6em !important;\'>|<br><br style=\'content: "A" !important;display: block !important;margin-bottom: -0.19em !important;\'>|<br style=\'content: "A" !important;display: block !important;margin-top: -0.7em !important;\'><span style="letter-spacing: -0.299em; margin-left: -0.05em;">&nbsp---</span><span style="letter-spacing: -0.2em;">&nbsp</span><span style="color: #d6dce2; font-weight: bold;">$</span></span><span style="margin-top: 0px !important;"></span> <span style="color:red;font-weight:bold;">' +
          command.innerHTML +
          '</span>',
          'liner no-animation',
          0
          );
      }
    commander(command.innerHTML.toLowerCase());
    command.innerHTML = '';
    textarea.value = '';
  }
  if (e.keyCode == 38 && git != 0) {
    previousCMD();
  }
  if (e.keyCode == 40 && git != commands.length) {
    git += 1;
    if (commands[git] === undefined) {
      textarea.value = '';
    } else {
      textarea.value = commands[git];
    }
    command.innerHTML = textarea.value;
  }
}

function commander(cmd) {
  switch (cmd) {
    case 'about':
      loopLines(about, 'color margin', 80);
      break;
    case 'achievements':
      loopLines(achievements, 'color margin', 80);
      break;
    case 'banner':
      loopLines(banner, '', 80);
      break;
    case 'certificates':
      loopLines(certificates, 'color margin', 80);
      break;
    case 'clear':
      cls();
      break;
    case 'cls':
      cls();
      break;
    case 'date':
      getDate();
      break;
    case 'education':
      loopLines(education, 'color margin', 80);
      break;
    case 'email':
      addLine(
        'Opening mailto:<a href="mailto:shabdik.dns@gmail.com">shabdik.dns@gmail.com</a>...',
        'color2',
        80
      );
      newTab(email);
      break;
    case 'github':
      addLine('Opening Github...', 'color2', 0);
      newTab(github);
      break;
    case 'help':
      loopLines(help, 'color margin', 80);
      break;
    case 'history':
      addLine('<br>', '', 0);
      loopLines(commands, 'color2', 80);
      addLine('<br>', 'command', 80 * commands.length + 50);
      break;
    case 'linkedin':
      addLine('Opening LinkedIn...', 'color2', 0);
      newTab(linkedin);
      break;
    case 'projects':
      loopLines(projects, 'color margin', 80);
      break;
    case 'repo':
      addLine('Opening the source code...', 'color2', 80);
      newTab(repo);
      break;
    case 'social':
      loopLines(social, 'color margin', 80);
      break;
    case 'whoami':
      addLine('visitor','',0);
      break;
    default:
      addLine(
        '<span>Command not found. For a list of commands, type <span class="command">\'help\'</span>.</span>',
        'error',
        100
      );
      break;
  }
}

function newTab(link) {
  setTimeout(function () {
    window.open(link, '_blank');
  }, 500);
}

function addLine(text, style, time) {
  let t = '';
  for (let i = 0; i < text.length; i++) {
    if (text.charAt(i) == ' ' && text.charAt(i + 1) == ' ') {
      t += '&nbsp;&nbsp;';
      i++;
    } else {
      t += text.charAt(i);
    }
  }
  
  setTimeout(function () {
    let next = document.createElement('p');
    next.innerHTML = t;
    next.className = style;

    before.parentNode.insertBefore(next, before);

    window.scrollTo(0, document.body.offsetHeight);
  }, time);
}

function loopLines(name, style, timeout) {
  name = [...name, '<br>'];
  name.forEach((item, index) => {
    addLine(item, style, index * timeout);
  });
}


function cls() {
  setTimeout(function () {
    terminal.innerHTML = '<a id="before"></a>';
    before = document.getElementById('before');
  }, 1);
}

function previousCMD() {
  if (git != 0) {
    git -= 1;
    textarea.value = commands[git];
    command.innerHTML = textarea.value;
  }
}

function deleteCMD() {
  command.value = '';
  textarea.value = '';
}

function getDate() {
  loopLines([new Date().toString()], 'color margin', 80);
}

function autoComplete() {
  let arr = existCommands.filter((item) => item.startsWith(command.innerHTML));
  if (arr.length === 1) {
    textarea.value = arr[0];
    command.innerHTML = arr[0];
  }
}

function switchTheme(cmd) {
  themeTxt = cmd.slice(10);
  console.log(themeTxt);
  if (themes.includes(themeTxt)) {
    setTheme(themeTxt);
    return;
  }
  loopLines(
    [
      `Theme '${themeTxt}' not found. Try 'theme ls' to see the list of available themes.`,
    ],
    'color margin',
    80
  );
}

function setTheme(theme) {
  document.body.dataset.theme = theme;
  localStorage.setItem('theme', theme);
}

function loadTheme() {
  const currentTheme = localStorage.getItem('theme') || 'dark';
  document.body.dataset.theme = currentTheme;
}
