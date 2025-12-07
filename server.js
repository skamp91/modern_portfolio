import express from 'express';
import PortfolioApp from './src/index.js';

const app = express();
const portfolioApp = new PortfolioApp();

app.use(express.json());
app.use(express.static('public'));

// API Routes - Projekte
app.get('/api/projects', (req, res) => {
  try {
    res.json({ success: true, data: portfolioApp.getAllProjects() });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/projects/:id', (req, res) => {
  try {
    const project = portfolioApp.getProject(req.params.id);
    if (!project) return res.status(404).json({ success: false, error: 'Projekt nicht gefunden' });
    res.json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/projects', (req, res) => {
  try {
    portfolioApp.addProject(req.body);
    res.status(201).json({ success: true, message: 'Projekt erfolgreich hinzugefügt' });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

app.delete('/api/projects/:id', (req, res) => {
  try {
    const result = portfolioApp.projectManager.deleteProject(req.params.id);
    if (!result) return res.status(404).json({ success: false, error: 'Projekt nicht gefunden' });
    res.json({ success: true, message: 'Projekt erfolgreich gelöscht' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/projects/technology/:tech', (req, res) => {
  try {
    res.json({ success: true, data: portfolioApp.projectManager.filterProjectsByTechnology(req.params.tech) });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// API Routes - Skills
app.get('/api/skills', (req, res) => {
  try {
    res.json({ success: true, data: portfolioApp.getAllSkills() });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/skills', (req, res) => {
  try {
    portfolioApp.addSkill(req.body);
    res.status(201).json({ success: true, message: 'Skill erfolgreich hinzugefügt' });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

app.get('/api/skills/category/:category', (req, res) => {
  try {
    res.json({ success: true, data: portfolioApp.skillManager.getSkillsByCategory(req.params.category) });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// API Routes - Kontakte
app.get('/api/contacts', (req, res) => {
  try {
    res.json({ success: true, data: portfolioApp.getAllContacts() });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/contacts', (req, res) => {
  try {
    portfolioApp.addContact({ ...req.body, id: Date.now().toString(), date: new Date() });
    res.status(201).json({ success: true, message: 'Kontakt erfolgreich hinzugefügt' });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

app.get('/api/contacts/unread', (req, res) => {
  try {
    res.json({ success: true, data: portfolioApp.contactManager.getUnreadContacts() });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Portfolio App läuft auf http://localhost:${PORT}`);
  console.log(`📊 Öffnen Sie http://localhost:${PORT} im Browser`);
});
