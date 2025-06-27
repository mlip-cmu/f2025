const fs = require('fs');
const path = require('path');
const marked = require('marked');



// Check for command line arguments
const args = process.argv.slice(2);
if (args.length < 2) {
    console.error('Usage: node index.js <markdown_file> <schedule_file>');
    process.exit(1);
}

const [mdPath, schedulePath] = args;


let mdContent = '';
try {
    const scheduleContent = fs.readFileSync(schedulePath, 'utf-8');
    mdContent = fs.readFileSync(mdPath, 'utf-8').replace("[Schedule]", scheduleContent);
} catch (error) {
    console.error(`Error: File not found or cannot be read: ${error.path}`);
    process.exit(1);
}









// Custom renderer for Bulma classes
const renderer = new marked.Renderer();

renderer.table = function(token) {
  const header = token.header.map(cell =>
    `<th${cell.align ? ` style=\"text-align:${cell.align}\"` : ''}>${this.parser.parseInline(cell.tokens)}</th>`
  ).join('');
  const rows = token.rows.map(row =>
    `<tr>${row.map(cell =>
      `<td${cell.align ? ` style=\"text-align:${cell.align}\"` : ''}>${this.parser.parseInline(cell.tokens)}</td>`
    ).join('')}</tr>`
  ).join(''); 
  return `
    <div class=\"table-container\">
      <table class=\"table is-striped is-hoverable is-fullwidth\">
        <thead><tr>${header}</tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `;
};


renderer.heading = function(token) {
  // token.depth: heading level (1-6)
  // token.tokens: inline tokens for the heading text
  const text = this.parser.parseInline(token.tokens);
  if (token.depth === 3) {
    return `<h3 class="is-size-4">${text}</h3>`;
  }
  // Default rendering for other headings
  return `<h${token.depth}>${text}</h${token.depth}>`;
};


// Tokenize the markdown
const tokens = marked.lexer(mdContent);

// Group tokens by h2 headings
let groups = [];
let currentGroup = { heading: null, tokens: [] };

for (let i = 0; i < tokens.length; i++) {
  const token = tokens[i];
  if (token.type === 'heading' && token.depth <= 2) {
    if (currentGroup.tokens.length > 0 || currentGroup.heading) {
      groups.push(currentGroup);
    }
    currentGroup = { heading: token.text, tokens: [] };
  } else {
    currentGroup.tokens.push(token);
  }
}
if (currentGroup.tokens.length > 0 || currentGroup.heading) {
  groups.push(currentGroup);
}

// Helper to create a slug/id from heading text
function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

// Prepare nav links for each card (for desktop and mobile)
const navLinks = groups.map(group => {
  if (!group.heading) return '';
  const id = slugify(group.heading);
  return `<a class="navbar-item" href="#${id}">${group.heading}</a>`;
}).join('\n');

const navLinksMobile = groups.map(group => {
  if (!group.heading) return '';
  const id = slugify(group.heading);
  return `<a class="navbar-item" href="#${id}" onclick="document.getElementById('navbarBasic').classList.remove('is-active')">${group.heading}</a>`;
}).join('\n');

// Render the content before the first h2 (if any)
let preContent = '';
if (groups.length > 0 && !groups[0].heading) {
  preContent = marked.parser(groups[0].tokens, { renderer });
  groups = groups.slice(1);
}

// Render each group as a Bulma card with an id
const cards = groups.map(group => {
  const content = marked.parser(group.tokens, { renderer });
  const id = group.heading ? slugify(group.heading) : '';
  return `
    <section class="section" id="${id}">
      <div class="card">
        <div class="card-content">
          <h2 class="title is-2 has-text-danger">${group.heading}</h2>
          <div class="content">
          ${content}
          </div>
        </div>
      </div>
    </section>
  `;
}).join('\n');

// Bulma HTML template with responsive navbar
const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Machine Learning in Production</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
  <style>
    body {
      font-size: 1.5rem;
      background: #fafafa;
      font-family: 'Roboto', Arial, sans-serif;
    }
    .container {
      max-width: 900px; 
    }
    @media (min-width: 1500px) {
      nav .navbar-brand .navbar-item {
        font-size: 4rem;
      }
    }
    html { scroll-behavior: smooth; }
    main { margin-top: 2rem; }
  </style>
</head>
<body>
  <nav class="navbar is-danger" role="navigation" aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand">
        <a class="navbar-item" href="#">
          <strong>Machine Learning in Production</strong><br />
        </a>
        <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasic">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div id="navbarBasic" class="navbar-menu">
        <div class="navbar-start">
          <a class="navbar-item" href="#schedule">Schedule</a>
          <a class="navbar-item" href="#course-syllabus-and-policies">Syllabus</a>
          <a class="navbar-item" href="">Canvas</a>
          <a class="navbar-item" href="https://github.com/mlip-cmu/f2025" target="_blank" rel="noopener">
            <span class="icon">
              <i class="fab fa-github"></i>
            </span>
          </a>
        </div>
      </div>
    </div>
  </nav>
  <main class="container">
    ${preContent}
    ${cards}
  </main>
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      // Get all "navbar-burger" elements
      const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
      // Add a click event on each of them
      $navbarBurgers.forEach(el => {
        el.addEventListener('click', () => {
          // Get the target from the "data-target" attribute
          const target = el.dataset.target;
          const $target = document.getElementById(target);
          // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
          el.classList.toggle('is-active');
          $target.classList.toggle('is-active');
        });
      });
    });
  </script>
</body>
</html>`;

console.log(html); 