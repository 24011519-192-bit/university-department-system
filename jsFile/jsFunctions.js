document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initActiveLink();
  initAccordions();
  initSmoothScroll();
  initPasswordToggle();
  initForms();
  
  if(document.getElementById('facultySearch')) initFacultyFilter();
  if(document.getElementById('courseSearch')) initCourseFilter();
  if(document.querySelector('.chart-container')) initChart();
});

function initNavbar() {
  const toggle = document.querySelector('.menu-toggle');
  const links = document.querySelector('.nav-links');
  if(toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('active');
    });
  }
}

function initActiveLink() {
  const links = document.querySelectorAll('.nav-link');
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  
  links.forEach(link => {
    const href = link.getAttribute('href').split('/').pop();
    if(href === currentPath) {
      link.classList.add('active');
    }
  });
}

function initAccordions() {
  const headers = document.querySelectorAll('.accordion-header');
  headers.forEach(header => {
    header.addEventListener('click', () => {
      const body = header.nextElementSibling;
      const icon = header.querySelector('.accordion-icon');
      
      body.classList.toggle('open');
      if(body.classList.contains('open')) {
        icon.textContent = '−';
      } else {
        icon.textContent = '+';
      }
    });
  });
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if(target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
}

function initPasswordToggle() {
  const toggles = document.querySelectorAll('.toggle-password');
  toggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      const input = toggle.previousElementSibling;
      if(input.type === 'password') {
        input.type = 'text';
        toggle.textContent = 'Hide';
      } else {
        input.type = 'password';
        toggle.textContent = 'Show';
      }
    });
  });
}

function initFacultyFilter() {
  const search = document.getElementById('facultySearch');
  const cards = document.querySelectorAll('.card'); // Assume faculty cards are just .card
  
  search.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    cards.forEach(card => {
      // Find name in the card to filter by
      const nameEl = card.querySelector('h3');
      if(nameEl) {
          const text = nameEl.textContent.toLowerCase();
          if(text.includes(term)) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
      }
    });
  });
}

function initCourseFilter() {
  const search = document.getElementById('courseSearch');
  const rows = document.querySelectorAll('.data-table tbody tr');
  
  search.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    rows.forEach(row => {
      const text = row.textContent.toLowerCase();
      if(text.includes(term)) {
        row.style.display = 'table-row';
      } else {
        row.style.display = 'none';
      }
    });
  });
}

function initForms() {
  const forms = document.querySelectorAll('.validate-form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;
      
      const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
      inputs.forEach(input => {
        let errorMsg = input.nextElementSibling;
        if(input.parentElement.classList.contains('password-wrapper')) {
            errorMsg = input.parentElement.nextElementSibling;
        }

        if(!input.value.trim()) {
          isValid = false;
          input.classList.add('error');
          if(errorMsg && errorMsg.classList.contains('error-msg')) {
            errorMsg.style.display = 'block';
            errorMsg.textContent = 'This field is required';
          }
        } else {
          input.classList.remove('error');
          if(errorMsg && errorMsg.classList.contains('error-msg')) {
            errorMsg.style.display = 'none';
          }
        }
        
        // Email validation
        if(input.type === 'email' && input.value.trim()) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if(!emailRegex.test(input.value)) {
            isValid = false;
            input.classList.add('error');
            if(errorMsg && errorMsg.classList.contains('error-msg')) {
              errorMsg.style.display = 'block';
              errorMsg.textContent = 'Invalid email address';
            }
          }
        }
      });
      
      // Password match validation
      const pass = form.querySelector('input[name="password"]');
      const confirmPass = form.querySelector('input[name="confirmPassword"]');
      
      if(pass && confirmPass && pass.value !== confirmPass.value) {
        isValid = false;
        confirmPass.classList.add('error');
        let confirmError = confirmPass.parentElement.nextElementSibling;
        if(confirmPass.parentElement.classList.contains('password-wrapper')){
             confirmError = confirmPass.parentElement.nextElementSibling;
        } else {
             confirmError = confirmPass.nextElementSibling;
        }

        if(confirmError && confirmError.classList.contains('error-msg')) {
          confirmError.style.display = 'block';
          confirmError.textContent = 'Passwords do not match';
        }
      }
      
      if(isValid) {
        alert('Form submitted successfully!');
        form.reset();
      }
    });
  });
}

function initChart() {
  const data = [
    { label: 'Sem1', value: 120 },
    { label: 'Sem2', value: 110 },
    { label: 'Sem3', value: 95 },
    { label: 'Sem4', value: 88 },
    { label: 'Sem5', value: 75 },
    { label: 'Sem6', value: 60 }
  ];
  
  const max = Math.max(...data.map(d => d.value));
  const container = document.querySelector('.chart-container');
  
  if(container) {
    container.innerHTML = '';
    data.forEach(item => {
      const heightPercent = (item.value / max) * 100;
      
      const wrapper = document.createElement('div');
      wrapper.className = 'chart-bar-wrapper';
      
      const bar = document.createElement('div');
      bar.className = 'chart-bar';
      bar.style.height = `${heightPercent}%`;
      bar.title = `${item.value} Students`;
      
      const label = document.createElement('div');
      label.className = 'chart-label';
      label.textContent = item.label;
      
      wrapper.appendChild(bar);
      wrapper.appendChild(label);
      container.appendChild(wrapper);
    });
  }
}
