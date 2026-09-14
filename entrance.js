(() => {
  const button = document.querySelector('#enter');
  const world = document.querySelector('#viewport');
  const isEntry = () => !document.body.classList.contains('entered') && ['', '#world'].includes(location.hash);
  const line = document.querySelector('.film-line');
  const heroElement = document.querySelector('.hero');
  const statements = ['Welcome to', 'The World of Pri', 'AI Scientist', 'Creator', 'Speaker'];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let filmTimer;
  let filmStep = 0;
  let manual = false;
  let lastAdvance = 0;
  const enterWorld = button.onclick;
  function showFrame() {
    composeFrame();
    line.className = filmStep >= 2 ? 'film-line role-beat' : 'film-line';
  }
  function composeFrame() {
    heroElement.dataset.frame = String(filmStep);
    line.replaceChildren();
    if (filmStep === 1) {
      const small = document.createElement('span');
      small.className = 'world-prefix';
      small.textContent = 'The World of';
      const name = document.createElement('span');
      name.className = 'world-name';
      name.textContent = 'Pri';
      line.append(small, name);
    } else line.textContent = statements[filmStep];
  }
  function playFilm() {
    clearTimeout(filmTimer);
    if (!isEntry()) return;
    manual = false;
    lastAdvance = 0;
    filmStep = 0;
    composeFrame();
    line.className = 'film-line';
    if (reduced.matches) {
      filmStep = 1;
      composeFrame();
      return;
    }
    if (document.hidden) return;
    function next() {
      if (!isEntry() || document.hidden) return;
      line.classList.add('leaving');
      filmTimer = setTimeout(() => {
        filmStep = filmStep === statements.length - 1 ? 2 : filmStep + 1;
        composeFrame();
        line.className = filmStep >= 2 ? 'film-line role-beat' : 'film-line';
        filmTimer = setTimeout(next, filmStep >= 2 ? 1500 : 3300);
      }, filmStep >= 2 ? 250 : 600);
    }
    filmTimer = setTimeout(next, 1800);
  }
  reduced.addEventListener('change', playFilm);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) clearTimeout(filmTimer);
    else if (!manual) playFilm();
  });
  let distance = 0;
  let touchY = null;
  function syncEntry() {
    world.inert = isEntry() || !['', '#world'].includes(location.hash);
    if (isEntry()) distance = 0;
    playFilm();
  }
  function advance(delta, deliberate = false) {
    if (!isEntry() || document.querySelector('dialog[open]') || !delta) return;
    // Manual input takes over at the frame currently on screen.
    clearTimeout(filmTimer);
    manual = true;
    line.classList.remove('leaving');
    const now = performance.now();
    if (!deliberate && now - lastAdvance < 850) return;
    distance += delta;
    if (!deliberate && Math.abs(distance) < 100) return;
    const direction = Math.sign(distance);
    distance = 0;
    lastAdvance = now;
    if (direction > 0 && filmStep === statements.length - 1) {
      enterWorld();
      world.inert = false;
      return;
    }
    filmStep = Math.max(0, Math.min(statements.length - 1, filmStep + direction));
    showFrame();
  }
  button.onclick = () => advance(120, true);
  addEventListener('keydown', event => {
    if (!isEntry() || event.target.closest('button,a,input,textarea,select,[contenteditable]') || event.altKey || event.ctrlKey || event.metaKey) return;
    if (['ArrowDown', 'PageDown', ' ', 'ArrowUp', 'PageUp'].includes(event.key)) {
      event.preventDefault();
      if (!event.repeat) advance(['ArrowUp', 'PageUp'].includes(event.key) || (event.key === ' ' && event.shiftKey) ? -120 : 120, true);
    }
  });
  addEventListener('wheel', event => advance(event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? innerHeight : 1)), {passive:true});
  addEventListener('touchstart', event => { touchY = event.touches[0].clientY; }, {passive:true});
  addEventListener('touchmove', event => {
    if (touchY === null) return;
    const y = event.touches[0].clientY;
    advance((touchY - y) * 2);
    touchY = y;
  }, {passive:true});
  addEventListener('touchend', () => { touchY = null; }, {passive:true});
  document.querySelector('#reset').addEventListener('click', syncEntry);
  addEventListener('hashchange', syncEntry);
  syncEntry();
})();
