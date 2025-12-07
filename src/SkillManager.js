class SkillManager {
  constructor() {
    this.skills = [];
  }

  addSkill(skill) {
    if (!skill.name) throw new Error('Skill-Name ist erforderlich');
    if (this.skills.find(s => s.name === skill.name)) throw new Error('Skill mit diesem Namen existiert bereits');
    this.skills.push(skill);
    return true;
  }

  getSkill(name) {
    return this.skills.find(s => s.name === name);
  }

  getAllSkills() {
    return [...this.skills];
  }

  getSkillsByCategory(category) {
    return this.skills.filter(skill => skill.category === category);
  }

  updateSkill(name, updates) {
    const skill = this.getSkill(name);
    if (!skill) return false;
    Object.assign(skill, updates);
    return true;
  }

  deleteSkill(name) {
    const index = this.skills.findIndex(s => s.name === name);
    if (index === -1) return false;
    this.skills.splice(index, 1);
    return true;
  }
}

export default SkillManager;
