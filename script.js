(() => {
  const status = document.getElementById('officeStatus');
  const panel = document.getElementById('settingsPanel');
  const settingsButton = document.getElementById('settingsButton');
  const welcomeOverlay = document.getElementById('welcomeOverlay');
  let mode = localStorage.getItem('mahakal-office-mode') || 'auto';

  function isOfficeHours() {
    const now = new Date();
    const day = now.getDay(); // 0 = Sunday
    const minutes = now.getHours() * 60 + now.getMinutes();
    return day !== 0 && minutes >= 9 * 60 && minutes < 19 * 60;
  }

  function renderStatus() {
    const open = mode === 'open' ? true : mode === 'closed' ? false : isOfficeHours();
    status.textContent = open ? '🟢 અત્યારે Office ચાલુ છે' : '🚪 અત્યારે Office બંધ છે';
    status.classList.toggle('open', open);
    status.classList.toggle('closed', !open);
  }

  document.querySelectorAll('[data-mode]').forEach(button => {
    button.addEventListener('click', () => {
      mode = button.dataset.mode;
      localStorage.setItem('mahakal-office-mode', mode);
      renderStatus();
    });
  });

  settingsButton.addEventListener('click', () => {
    panel.hidden = !panel.hidden;
  });
  document.getElementById('closeSettings').addEventListener('click', () => {
    panel.hidden = true;
  });

  const themes = {
    blue: ['#173b72', '#28549b'],
    purple: ['#30266f', '#68418a'],
    green: ['#124d43', '#26785c']
  };
  document.querySelectorAll('[data-theme]').forEach(button => {
    button.addEventListener('click', () => {
      const theme = button.dataset.theme;
      if (theme === 'reset') {
        document.body.style.background = '';
      } else {
        const colors = themes[theme];
        document.body.style.background = `radial-gradient(circle at 12% 20%,${colors[1]} 0,transparent 34%),radial-gradient(circle at 85% 70%,${colors[0]} 0,transparent 35%),linear-gradient(135deg,${colors[0]},${colors[1]})`;
      }
    });
  });

  document.getElementById('welcomeOk').addEventListener('click', () => {
    welcomeOverlay.hidden = true;
    sessionStorage.setItem('mahakal-welcome-seen', 'yes');
  });
  if (sessionStorage.getItem('mahakal-welcome-seen') === 'yes') welcomeOverlay.hidden = true;

  renderStatus();
  setInterval(renderStatus, 30000);
})();