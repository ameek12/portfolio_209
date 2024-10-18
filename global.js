// IT'S ALIVE will be printed to the console when you use the Developer elements 
console.log('IT\'S ALIVE!'); 

function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

// array of navlinks 
let navLinks = $$("nav a");

// finding the link to the currecnt page 
let currentLink = navLinks.find(
  (a) => a.host === location.host && a.pathname === location.pathname
);

// adding the current class to the currnet page link 
currentLink?.classList.add('current');

// Same pages as before 
let pages = [
    { url: "index.html", title: 'Home' },
    { url: "projects/index.html", title: 'Projects' },
    { url: "resume/index.html", title: 'Resume' },
    { url: "contact/index.html", title: 'Contact' },
    { url: 'https://github.com/ameek12', title: 'GitHub' }
];

// seeing if we are on the home page and storing into a variable 
const ARE_WE_HOME = document.documentElement.classList.contains('home');

// creating the navigation bar
let nav = document.createElement('nav');
document.body.prepend(nav);

// creating the links
for (let p of pages) {
    let a = document.createElement('a');  
    let url = p.url;

    
    if (!ARE_WE_HOME && !url.startsWith('http')) {
      url = '../' + url;
    }
  
    a.href = url;
    a.textContent = p.title;
    nav.append(a);
  
    a.classList.toggle(
      'current',
      a.host === location.host && a.pathname === location.pathname
    );
  
    if (a.host !== location.host) {
      a.target = '_blank';
    }
}

// to create each link and add it to the nav and adding the theme
document.body.insertAdjacentHTML(
    'afterbegin',
    `
    <label class="color-scheme">
      Theme:
      <select id="theme-switcher">
        <option value="light dark">Automatic</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </label>
    `
);


const select = document.querySelector('#theme-switcher');

select.addEventListener('input', function (event) {
    const selectedScheme = event.target.value;
    document.documentElement.style.setProperty('color-scheme', selectedScheme);
    localStorage.setItem('colorScheme', selectedScheme);
    console.log('Color scheme changed to:', selectedScheme);
});


window.addEventListener('DOMContentLoaded', () => {
    const savedScheme = localStorage.getItem('colorScheme');
    if (savedScheme) {
      document.documentElement.style.setProperty('color-scheme', savedScheme);
      select.value = savedScheme;
    }
});

const form = document.getElementById('contact-form');

// event listener for form submission
form?.addEventListener('submit', function (event) {
  event.preventDefault();

  const data = new FormData(form);

  const params = [];

  // iterate over submits
  for (let [name, value] of data) {
    params.push(`${encodeURIComponent(name)}=${encodeURIComponent(value)}`);
  }

  // build  URL
  const url = `${form.action}?${params.join('&')}`;

  location.href = url; 
});
