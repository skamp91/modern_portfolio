const SkillManager = require('../SkillManager');

describe('SkillManager', () => {
  let skillManager;

  beforeEach(() => {
    skillManager = new SkillManager();
  });

  describe('addSkill', () => {
    test('sollte einen Skill erfolgreich hinzufügen', () => {
      const skill = {
        name: 'JavaScript',
        level: 'Expert',
        category: 'Programming'
      };

      const result = skillManager.addSkill(skill);
      expect(result).toBe(true);
      expect(skillManager.getAllSkills()).toHaveLength(1);
    });

    test('sollte einen Fehler werfen, wenn Skill-Name fehlt', () => {
      const skill = {
        level: 'Expert',
        category: 'Programming'
      };

      expect(() => {
        skillManager.addSkill(skill);
      }).toThrow('Skill-Name ist erforderlich');
    });

    test('sollte keinen Duplikat-Skill erlauben', () => {
      const skill = {
        name: 'JavaScript',
        level: 'Expert',
        category: 'Programming'
      };

      skillManager.addSkill(skill);
      expect(() => {
        skillManager.addSkill(skill);
      }).toThrow('Skill mit diesem Namen existiert bereits');
    });
  });

  describe('getSkill', () => {
    test('sollte einen Skill anhand des Namens abrufen', () => {
      const skill = {
        name: 'JavaScript',
        level: 'Expert',
        category: 'Programming'
      };

      skillManager.addSkill(skill);
      const retrieved = skillManager.getSkill('JavaScript');

      expect(retrieved).toEqual(skill);
    });

    test('sollte undefined zurückgeben, wenn Skill nicht gefunden wird', () => {
      expect(skillManager.getSkill('NonExistent')).toBeUndefined();
    });
  });

  describe('getAllSkills', () => {
    test('sollte eine leere Liste zurückgeben, wenn keine Skills vorhanden sind', () => {
      expect(skillManager.getAllSkills()).toEqual([]);
    });

    test('sollte alle Skills zurückgeben', () => {
      const skill1 = { name: 'JavaScript', level: 'Expert', category: 'Programming' };
      const skill2 = { name: 'React', level: 'Advanced', category: 'Framework' };

      skillManager.addSkill(skill1);
      skillManager.addSkill(skill2);

      const skills = skillManager.getAllSkills();
      expect(skills).toHaveLength(2);
    });
  });

  describe('getSkillsByCategory', () => {
    test('sollte Skills nach Kategorie filtern', () => {
      const skill1 = { name: 'JavaScript', level: 'Expert', category: 'Programming' };
      const skill2 = { name: 'Python', level: 'Advanced', category: 'Programming' };
      const skill3 = { name: 'React', level: 'Expert', category: 'Framework' };

      skillManager.addSkill(skill1);
      skillManager.addSkill(skill2);
      skillManager.addSkill(skill3);

      const programmingSkills = skillManager.getSkillsByCategory('Programming');
      expect(programmingSkills).toHaveLength(2);
      expect(programmingSkills).toContainEqual(skill1);
      expect(programmingSkills).toContainEqual(skill2);
    });

    test('sollte eine leere Liste zurückgeben, wenn keine Skills in der Kategorie gefunden werden', () => {
      const skill = { name: 'JavaScript', level: 'Expert', category: 'Programming' };
      skillManager.addSkill(skill);

      const filtered = skillManager.getSkillsByCategory('Design');
      expect(filtered).toEqual([]);
    });
  });

  describe('updateSkill', () => {
    test('sollte einen Skill erfolgreich aktualisieren', () => {
      const skill = {
        name: 'JavaScript',
        level: 'Expert',
        category: 'Programming'
      };

      skillManager.addSkill(skill);
      const updated = skillManager.updateSkill('JavaScript', { level: 'Master' });

      expect(updated).toBe(true);
      expect(skillManager.getSkill('JavaScript').level).toBe('Master');
    });

    test('sollte false zurückgeben, wenn Skill nicht gefunden wird', () => {
      expect(skillManager.updateSkill('NonExistent', { level: 'Expert' })).toBe(false);
    });
  });

  describe('deleteSkill', () => {
    test('sollte einen Skill erfolgreich löschen', () => {
      const skill = {
        name: 'JavaScript',
        level: 'Expert',
        category: 'Programming'
      };

      skillManager.addSkill(skill);
      expect(skillManager.getAllSkills()).toHaveLength(1);

      const result = skillManager.deleteSkill('JavaScript');
      expect(result).toBe(true);
      expect(skillManager.getAllSkills()).toHaveLength(0);
    });

    test('sollte false zurückgeben, wenn Skill nicht gefunden wird', () => {
      expect(skillManager.deleteSkill('NonExistent')).toBe(false);
    });
  });
});

