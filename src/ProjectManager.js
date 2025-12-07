class ProjectManager {
  constructor() {
    this.projects = [];
  }

  addProject(project) {
    if (!project.id) throw new Error('Projekt-ID ist erforderlich');
    if (!project.title) throw new Error('Projekt-Titel ist erforderlich');
    if (this.projects.find(p => p.id === project.id)) throw new Error('Projekt mit dieser ID existiert bereits');
    this.projects.push(project);
    return true;
  }

  getProject(id) {
    return this.projects.find(p => p.id === id);
  }

  getAllProjects() {
    return [...this.projects];
  }

  filterProjectsByTechnology(technology) {
    return this.projects.filter(project => project.technologies?.includes(technology));
  }

  deleteProject(id) {
    const index = this.projects.findIndex(p => p.id === id);
    if (index === -1) return false;
    this.projects.splice(index, 1);
    return true;
  }
}

export default ProjectManager;
