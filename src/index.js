import ProjectManager from './ProjectManager.js';
import SkillManager from './SkillManager.js';
import ContactManager from './ContactManager.js';

class PortfolioApp {
  constructor() {
    this.projectManager = new ProjectManager();
    this.skillManager = new SkillManager();
    this.contactManager = new ContactManager();
  }

  addProject(project) {
    return this.projectManager.addProject(project);
  }

  getProject(id) {
    return this.projectManager.getProject(id);
  }

  getAllProjects() {
    return this.projectManager.getAllProjects();
  }

  addSkill(skill) {
    return this.skillManager.addSkill(skill);
  }

  getAllSkills() {
    return this.skillManager.getAllSkills();
  }

  addContact(contact) {
    return this.contactManager.addContact(contact);
  }

  getAllContacts() {
    return this.contactManager.getAllContacts();
  }
}

export default PortfolioApp;
export { ProjectManager, SkillManager, ContactManager };
