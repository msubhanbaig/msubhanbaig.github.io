# Subhan Baig — Portfolio Website 🚀

A modern, cyberpunk-themed portfolio website showcasing skills, projects, and experience with interactive particle network animations.

---

## ✨ Features

- **Particle Network Animation** - Full-page background with animated particles and connecting lines
- **Smooth Scrolling** - Navigation with smooth scroll effects
- **Dark Theme** - Cyberpunk-inspired dark mode with green/cyan accents
- **Responsive Design** - Mobile-friendly layout
- **Interactive Elements** - Hover effects, animations, and transitions
- **CV Download** - Download resume in PDF format
- **Social Links** - Easy contact via LinkedIn, GitHub, and email

---

## 📁 Project Structure

```
portfolio/
├── index.html              # Main HTML file
├── assets/
│   ├── CV.pdf             # Resume PDF
│   └── Black_Ops_One/     # Font files
├── css/
│   └── style.css          # All styling
├── js/
│   └── script.js          # JavaScript animations & logic
└── README.md              # This file
```

---

## 🎨 Sections

1. **Hero** - Introduction and call-to-action
2. **About** - Personal background and CV download
3. **Skills** - Technical skills showcase
4. **Experience** - Work experience timeline
5. **Achievements** - Stats and accomplishments
6. **Projects** - Portfolio projects
7. **Education** - Educational background
8. **Resume** - Resume preview and download
9. **Contact** - Contact information (Email, LinkedIn, GitHub)

---

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No build tools required - runs as static HTML

### Installation

1. **Clone or download the project**
```bash
git clone <repository-url>
cd portfolio
```

2. **Open in browser**
   - Double-click `index.html` OR
   - Use a local server (recommended):
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Or Node.js
   npx http-server
   ```

3. **Visit in browser**
   - Local: `http://localhost:8000`
   - Direct file: `file:///path/to/portfolio/index.html`

---

## 🎯 Key Features Explained

### Particle Network Animation
- Located at: `js/script.js` (Lines 7-102)
- **Canvas ID**: `portfolioCanvas`
- **Features**:
  - 60 particles moving randomly
  - Lines connect nearby particles
  - Mouse repulsion effect
  - Full-page background (z-index: -1)

### Styling System
- **Theme Variables**: CSS custom properties in `style.css`
- **Colors**:
  - Green (`--clr-purple`): #34d399
  - Cyan (`--clr-cyan`): #38bdf8
  - Amber (`--clr-amber`): #f59e0b
  - Red (`--clr-red`): #fb7185

### Responsive Breakpoints
- **Tablet**: 1024px
- **Mobile**: 768px

---

## 📝 Content Update Guide

### Edit Sections
1. Open `index.html`
2. Find the section you want to edit
3. Modify the content
4. Save and refresh browser

### Update CV
1. Replace `assets/CV.pdf` with your CV
2. Keep the same filename
3. Download button will work automatically

### Change Colors
1. Open `css/style.css`
2. Edit CSS variables in `:root` section (lines 15-49)
3. Example:
```css
--clr-purple: #34d399;  /* Change this color */
--clr-cyan: #38bdf8;
```

### Customize Animations
- **Particle speed**: `js/script.js` line 30-31
- **Connection distance**: `js/script.js` line 15
- **Canvas opacity**: `css/style.css` line 435

---

## 🔧 Customization

### Change Fonts
1. Add font files to `assets/`
2. Update `@font-face` in `css/style.css` (lines 7-12)
3. Use in CSS: `font-family: 'Your Font'`

### Modify Navigation
- Edit links in `index.html` (lines 33-39)
- Add new sections and update navigation accordingly

### Update Social Links
- Email: `index.html` line 496
- LinkedIn: `index.html` line 503
- GitHub: `index.html` line 510

---

## 🌐 Deployment

### Deploy to GitHub Pages
1. Create GitHub repository
2. Push code to `main` branch
3. Enable GitHub Pages in repository settings
4. Your site will be live at: `https://username.github.io/portfolio`

### Deploy to Vercel
1. Push to GitHub
2. Connect repository to Vercel
3. Deploy with one click

### Deploy to Netlify
1. Push to GitHub
2. Connect repository to Netlify
3. Deploy automatically on push

---

## 📱 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ⚠️ IE (not supported)

---

## 🐛 Troubleshooting

### CV Download Not Working
- **Issue**: "File wasn't available on site"
- **Solution**: Ensure `assets/CV.pdf` exists with correct path
- **Check**: `href="assets/CV.pdf"` in `index.html`

### Animation Not Showing
- **Issue**: Particles not visible
- **Check**: 
  - Browser console for errors
  - Canvas element exists: `<canvas id="portfolioCanvas"></canvas>`
  - `opacity` value in `.portfolio-canvas` CSS

### Slow Performance
- **Reduce particles**: `script.js` line 13
  - Default: `PARTICLE_COUNT = 60`
  - Reduce to: `40` or `30`
- **Lower canvas opacity**: `css/style.css` line 435

---

## 📜 License

This portfolio is open source and available under the MIT License.

---

## 👤 Author

**Subhan Baig**
- 📧 Email: subhanbaig123456@gmail.com
- 💼 LinkedIn: [linkedin.com/in/subhan-baig-b3023a331/](https://www.linkedin.com/in/subhan-baig-b3023a331/)
- 🐙 GitHub: [github.com/Subhan-Baig](https://github.com/Subhan-Baig)

---

## 🤝 Contributing

Found a bug or have suggestions? Feel free to open an issue or submit a pull request!

---

## 📞 Support

For questions or issues, contact me via:
- Email: subhanbaig123456@gmail.com
- LinkedIn: [Message on LinkedIn](https://www.linkedin.com/in/subhan-baig-b3023a331/)

---

**Last Updated**: June 2026

---

Made with ❤️ by Subhan Baig
