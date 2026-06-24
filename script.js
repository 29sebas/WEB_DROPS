// ========================================================
// EFECTOS VISUALES Y CURSOR (Tus animaciones originales)
// ========================================================
const cursor = document.querySelector('.custom-cursor');
if (cursor) {
  window.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });
}

const menu = document.querySelector('.menu');
if (menu) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      menu.classList.add('scrolled');
    } else {
      menu.classList.remove('scrolled');
    }
  });
}

const reveals = document.querySelectorAll('.reveal');
function revealElements() {
  const windowHeight = window.innerHeight;
  reveals.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    if (elementTop < windowHeight - 100) {
      element.classList.add('active');
    }
  });
}
window.addEventListener('scroll', revealElements);
revealElements();

const header = document.querySelector('.header');
if (header) {
  window.addEventListener('scroll', () => {
    const scroll = window.scrollY;
    header.style.backgroundPositionY = scroll * 0.5 + 'px';
  });
}

// ========================================================
// INTERRUPTORES DE MODALES (ABRIR / CERRAR)
// ========================================================
const openModal = document.getElementById('openModal');
const closeModal = document.getElementById('closeModal');
const modal = document.getElementById('accessModal');

const openLoginModal = document.getElementById('openLoginModal');
const closeLoginModal = document.getElementById('closeLoginModal');
const loginModal = document.getElementById('loginModal');

const inviteButton = document.getElementById('inviteButton');
const inviteModal = document.getElementById('inviteModal');
const closeInviteModal = document.getElementById('closeInviteModal');

if (openModal) openModal.addEventListener('click', (e) => { e.preventDefault(); modal.classList.add('active'); });
if (closeModal) closeModal.addEventListener('click', () => { modal.classList.remove('active'); });

if (openLoginModal) openLoginModal.addEventListener('click', (e) => { e.preventDefault(); loginModal.classList.add('active'); });
if (closeLoginModal) closeLoginModal.addEventListener('click', () => { loginModal.classList.remove('active'); });

if (inviteButton) inviteButton.addEventListener('click', (e) => { e.preventDefault(); inviteModal.classList.add('active'); });
if (closeInviteModal) closeInviteModal.addEventListener('click', () => { inviteModal.classList.remove('active'); });

window.addEventListener('click', (e) => {
  if (e.target === modal) modal.classList.remove('active');
  if (e.target === loginModal) loginModal.classList.remove('active');
  if (e.target === inviteModal) inviteModal.classList.remove('active');
});

// ========================================================
// ENVÍO DE FORMULARIOS AL SERVIDOR LOCAL (fetch)
// ========================================================
const accessForm = document.getElementById('accessForm');
const successMessage = document.getElementById('successMessage');
const loadingBox = document.getElementById('loadingBox');

if (accessForm) {
  accessForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (loadingBox) loadingBox.classList.add('active');

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const instagram = document.getElementById('instagram').value;
    const message = document.getElementById('message').value;

    try {
      const response = await fetch('http://localhost:3000/request-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, instagram, message })
      });

      if (loadingBox) loadingBox.classList.remove('active');

      if (response.ok) {
        accessForm.style.display = 'none';
        if (successMessage) successMessage.classList.add('active');
        setTimeout(() => {
          modal.classList.remove('active');
          accessForm.reset();
          accessForm.style.display = 'flex';
          if (successMessage) successMessage.classList.remove('active');
        }, 2500);
      } else {
        alert('Error al procesar la solicitud en la base de datos.');
      }
    } catch (err) {
      if (loadingBox) loadingBox.classList.remove('active');
      alert('Error de conexión con el servidor.');
    }
  });
}

// Formulario de Invitaciones
const inviteForm = document.getElementById('inviteForm');
const inviteSuccess = document.getElementById('inviteSuccess');

if (inviteForm) {
  inviteForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const inviteEmail = document.getElementById('inviteEmail').value;
    const inviteCode = document.getElementById('inviteCode').value;

    try {
      const response = await fetch('http://localhost:3000/send-invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inviteEmail, inviteCode })
      });

      if (response.ok) {
        inviteForm.style.display = 'none';
        inviteSuccess.classList.add('active');
        setTimeout(() => {
          inviteModal.classList.remove('active');
          inviteForm.reset();
          inviteForm.style.display = 'flex';
          inviteSuccess.classList.remove('active');
        }, 2500);
      }
    } catch (err) {
      alert('Error al conectar.');
    }
  });
}

// Formulario de Login
const loginForm = document.getElementById('loginForm');
const loginSuccess = document.getElementById('loginSuccess');

if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        loginForm.style.display = 'none';
        loginSuccess.classList.add('active');
        setTimeout(() => {
          loginModal.classList.remove('active');
          loginForm.reset();
          loginForm.style.display = 'flex';
          loginSuccess.classList.remove('active');
        }, 2500);
      } else {
        alert('Acceso denegado. Correo no registrado.');
      }
    } catch (err) {
      alert('Error de conexión.');
    }
  });
}