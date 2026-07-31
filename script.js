/* ==========================================================================
   PORTFOLIO LOGIC & INTERACTION - Premium Tech-Minimalist (Menta & Sage)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Inicializar iconos Lucide
  lucide.createIcons();



  /* ==========================================================================
     2. NAVIGATION & ACTIVE MENU HIGHLIGHT
     ========================================================================== */
  // Menú Hamburguesa en Móviles
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinksList = document.getElementById('nav-links');
  const navLinks = document.querySelectorAll('.nav-links a');

  mobileToggle.addEventListener('click', () => {
    mobileToggle.classList.toggle('open');
    navLinksList.classList.toggle('open');
  });

  // Cerrar menú al hacer clic en un enlace en móviles
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileToggle.classList.remove('open');
      navLinksList.classList.remove('open');
    });
  });

  // Highlight activo mediante IntersectionObserver
  // REMOVED: User requested the navigation bar to remain static and not highlight active sections on scroll.

  /* ==========================================================================
     3. INTERACTIVE TECH SKILLS HIGHLIGHTER
     ========================================================================== */
  const skillTags = document.querySelectorAll('.skill-tag');
  const projectCards = document.querySelectorAll('.project-card');

  skillTags.forEach(tag => {
    tag.addEventListener('click', () => {
      const tech = tag.getAttribute('data-tech');

      // Toggle de estado visual de la etiqueta
      tag.classList.toggle('highlight-active');
      const isSelected = tag.classList.contains('highlight-active');

      // Limpiar otros tags seleccionados si los hay
      skillTags.forEach(otherTag => {
        if (otherTag !== tag) otherTag.classList.remove('highlight-active');
      });

      // Iluminar u opacar proyectos que usen la tecnología
      projectCards.forEach(card => {
        const techTags = card.querySelectorAll('.project-tech span');
        let usesTech = false;

        techTags.forEach(techSpan => {
          if (techSpan.textContent.toLowerCase().includes(tech.toLowerCase())) {
            usesTech = true;
          }
        });

        if (isSelected) {
          if (usesTech) {
            card.style.borderColor = 'var(--color-mint)';
            card.style.boxShadow = '0 0 25px rgba(186, 224, 218, 0.2)';
            // Removing transform interactions as requested
          } else {
            card.style.opacity = '0.4';
          }
        } else {
          // Resetear estilos
          card.style.borderColor = '';
          card.style.boxShadow = '';
          card.style.opacity = '1';
        }
      });
    });
  });

  /* ==========================================================================
     4. PLAYABLE TERMINAL: REPLACED BY REACT SPA
     ========================================================================== */

  /* ==========================================================================
     4.2. INTERACTIVE MATCHING SIMULATOR (MINDMATCH TFG)
     ========================================================================== */
  const simViewSelect = document.getElementById('sim-view-select');
  const simViewLoading = document.getElementById('sim-view-loading');
  const simViewResults = document.getElementById('sim-view-results');
  const simOptionBtns = document.querySelectorAll('.sim-option-btn');
  const simProgressFill = document.getElementById('sim-progress-fill');
  const btnSimReset = document.getElementById('btn-sim-reset');

  // Datos de terapeutas por eneatipo
  const therapistsData = {
    '5': {
      name: 'Dr. Alejandro Ramos',
      specialties: ['#TCC', '#Eneatipo5', '#Ansiedad'],
      desc: 'Especializado en personas de perfil racional y analítico, ayudando a canalizar la hiperactividad intelectual y el aislamiento social mediante terapia estructurada de corte conductual.',
      avatarUrl: 'assets/psicologos/pensamiento.png'
    },
    '9': {
      name: 'Dra. Sofía Mendoza',
      specialties: ['#Aceptación', '#Eneatipo9', '#Conflictos'],
      desc: 'Experta en terapia de aceptación y compromiso, ayudando a perfiles mediadores a reconectar con sus deseos individuales y a expresar asertivamente sus opiniones y emociones.',
      avatarUrl: 'assets/psicologos/medicinaEmocional.png'
    },
    '2': {
      name: 'Dr. Carlos Ortiz',
      specialties: ['#Límites', '#Eneatipo2', '#Autoestima'],
      desc: 'Especialista en relaciones de apego y límites personales, guiando a perfiles empáticos y altruistas a cuidar de sí mismos con la misma intensidad con la que cuidan a los demás.',
      avatarUrl: 'assets/psicologos/biodecodificacion.png'
    }
  };

  if (simViewSelect && simViewLoading && simViewResults) {
    simOptionBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const type = btn.getAttribute('data-type');

        // Ocultar vista inicial, mostrar pantalla de carga
        simViewSelect.classList.add('d-none');
        simViewLoading.classList.remove('d-none');

        // Resetear barra de progreso y pasos
        simProgressFill.style.width = '0%';
        const step1 = document.getElementById('sim-step-1');
        const step2 = document.getElementById('sim-step-2');
        const step3 = document.getElementById('sim-step-3');

        step1.className = 'sim-step active';
        step2.className = 'sim-step';
        step3.className = 'sim-step';

        // Secuencia animada de matching (1.6 segundos en total)
        setTimeout(() => {
          simProgressFill.style.width = '33%';
          step1.className = 'sim-step completed';
          step2.className = 'sim-step active';
        }, 400);

        setTimeout(() => {
          simProgressFill.style.width = '66%';
          step2.className = 'sim-step completed';
          step3.className = 'sim-step active';
        }, 900);

        setTimeout(() => {
          simProgressFill.style.width = '100%';
          step3.className = 'sim-step completed';
        }, 1300);

        setTimeout(() => {
          // Cargar datos en la vista de resultados
          const data = therapistsData[type];
          if (data) {
            document.getElementById('therapist-name').textContent = data.name;
            document.getElementById('therapist-desc').textContent = data.desc;

            // Establecer avatar
            const avatar = document.getElementById('therapist-avatar');
            avatar.style.backgroundImage = `url('${data.avatarUrl}')`;

            // Renderizar especialidades
            const specialtiesContainer = document.getElementById('therapist-specialties');
            specialtiesContainer.innerHTML = '';
            data.specialties.forEach(spec => {
              const span = document.createElement('span');
              span.textContent = spec;
              specialtiesContainer.appendChild(span);
            });
          }

          // Mostrar vista de resultados
          simViewLoading.classList.add('d-none');
          simViewResults.classList.remove('d-none');
        }, 1600);
      });
    });

    if (btnSimReset) {
      btnSimReset.addEventListener('click', () => {
        simViewResults.classList.add('d-none');
        simViewSelect.classList.remove('d-none');
      });
    }
  }

  /* ==========================================================================
     5. CONTACT FORM INTERACTIVE SUBMISSION
     ========================================================================== */
  const contactForm = document.getElementById('portfolio-contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitBtn = document.getElementById('btn-submit');
      const originalBtnHTML = submitBtn.innerHTML;

      // Cambiar botón a estado de carga
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Enviando... <i data-lucide="loader" class="animate-spin"></i>';
      lucide.createIcons(); // Recargar iconos

      // 1. Recogemos los datos que el usuario ha escrito en el formulario
      const nameValue = document.getElementById('name').value;
      const emailValue = document.getElementById('email').value;
      const messageValue = document.getElementById('message').value;

      // 2. Hacemos la petición REAL a tu API de FastAPI
      fetch('https://portfolio-api-soniajdv.onrender.com/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        // Convertimos los datos al formato JSON que espera FastAPI (ContactForm)
        body: JSON.stringify({
          name: nameValue,
          email: emailValue,
          message: messageValue
        })
      })
        .then(response => response.json())
        .then(data => {
          // 3. Si todo va bien, mostramos la pantalla de éxito que ya tenías
          contactForm.innerHTML = `
          <div class="success-screen">
            <div class="success-icon">
              <i data-lucide="check"></i>
            </div>
            <h3 class="font-heading" style="font-size: 1.8rem; margin-bottom: 12px; color: var(--color-mint);">¡Mensaje Enviado con Éxito!</h3>
            <p style="color: var(--color-text-secondary); max-width: 500px; margin: 0 auto 24px auto;">
              Muchas gracias por ponerte en contacto. El Backend ha procesado tu petición.
            </p>
            <button class="btn-secondary" onclick="window.location.reload();">
              Enviar otro mensaje
              <i data-lucide="rotate-ccw"></i>
            </button>
          </div>
        `;
          lucide.createIcons();
        })
        .catch(error => {
          // Por si acaso falla el backend, devolvemos el botón a la normalidad
          console.error("Error conectando con la API:", error);
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnHTML;
          alert("Uy, parece que el servidor está apagado o hubo un error.");
        });

    });
  }
});
