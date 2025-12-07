const ProjectManager = require('../ProjectManager');

describe('ProjectManager', () => {
  let projectManager;

  beforeEach(() => {
    projectManager = new ProjectManager();
  });

  describe('addProject', () => {
    test('sollte ein Projekt erfolgreich hinzufügen', () => {
      const project = {
        id: '1',
        title: 'Mein Projekt',
        description: 'Eine tolle Beschreibung',
        technologies: ['JavaScript', 'React'],
        url: 'https://example.com'
      };

      const result = projectManager.addProject(project);
      expect(result).toBe(true);
      expect(projectManager.getAllProjects()).toHaveLength(1);
    });

    test('sollte ein Fehler werfen, wenn Projekt-ID fehlt', () => {
      const project = {
        title: 'Mein Projekt',
        description: 'Eine tolle Beschreibung'
      };

      expect(() => {
        projectManager.addProject(project);
      }).toThrow('Projekt-ID ist erforderlich');
    });

    test('sollte ein Fehler werfen, wenn Projekt-Titel fehlt', () => {
      const project = {
        id: '1',
        description: 'Eine tolle Beschreibung'
      };

      expect(() => {
        projectManager.addProject(project);
      }).toThrow('Projekt-Titel ist erforderlich');
    });

    test('sollte keine Duplikate mit derselben ID erlauben', () => {
      const project1 = {
        id: '1',
        title: 'Projekt 1',
        description: 'Beschreibung 1'
      };

      const project2 = {
        id: '1',
        title: 'Projekt 2',
        description: 'Beschreibung 2'
      };

      projectManager.addProject(project1);
      expect(() => {
        projectManager.addProject(project2);
      }).toThrow('Projekt mit dieser ID existiert bereits');
    });
  });

  describe('getProject', () => {
    test('sollte ein Projekt anhand der ID abrufen', () => {
      const project = {
        id: '1',
        title: 'Mein Projekt',
        description: 'Eine tolle Beschreibung'
      };

      projectManager.addProject(project);
      const retrieved = projectManager.getProject('1');

      expect(retrieved).toEqual(project);
    });

    test('sollte undefined zurückgeben, wenn Projekt nicht gefunden wird', () => {
      expect(projectManager.getProject('999')).toBeUndefined();
    });
  });

  describe('getAllProjects', () => {
    test('sollte eine leere Liste zurückgeben, wenn keine Projekte vorhanden sind', () => {
      expect(projectManager.getAllProjects()).toEqual([]);
    });

    test('sollte alle Projekte zurückgeben', () => {
      const project1 = { id: '1', title: 'Projekt 1', description: 'Beschreibung 1' };
      const project2 = { id: '2', title: 'Projekt 2', description: 'Beschreibung 2' };

      projectManager.addProject(project1);
      projectManager.addProject(project2);

      const projects = projectManager.getAllProjects();
      expect(projects).toHaveLength(2);
      expect(projects).toContainEqual(project1);
      expect(projects).toContainEqual(project2);
    });
  });

  describe('filterProjectsByTechnology', () => {
    test('sollte Projekte nach Technologie filtern', () => {
      const project1 = {
        id: '1',
        title: 'React Projekt',
        description: 'Beschreibung 1',
        technologies: ['React', 'JavaScript']
      };
      const project2 = {
        id: '2',
        title: 'Vue Projekt',
        description: 'Beschreibung 2',
        technologies: ['Vue', 'JavaScript']
      };
      const project3 = {
        id: '3',
        title: 'Angular Projekt',
        description: 'Beschreibung 3',
        technologies: ['Angular', 'TypeScript']
      };

      projectManager.addProject(project1);
      projectManager.addProject(project2);
      projectManager.addProject(project3);

      const reactProjects = projectManager.filterProjectsByTechnology('React');
      expect(reactProjects).toHaveLength(1);
      expect(reactProjects[0]).toEqual(project1);

      const jsProjects = projectManager.filterProjectsByTechnology('JavaScript');
      expect(jsProjects).toHaveLength(2);
    });

    test('sollte eine leere Liste zurückgeben, wenn keine Projekte mit der Technologie gefunden werden', () => {
      const project = {
        id: '1',
        title: 'Projekt',
        description: 'Beschreibung',
        technologies: ['React']
      };

      projectManager.addProject(project);
      const filtered = projectManager.filterProjectsByTechnology('Vue');

      expect(filtered).toEqual([]);
    });
  });

  describe('deleteProject', () => {
    test('sollte ein Projekt erfolgreich löschen', () => {
      const project = {
        id: '1',
        title: 'Mein Projekt',
        description: 'Eine tolle Beschreibung'
      };

      projectManager.addProject(project);
      expect(projectManager.getAllProjects()).toHaveLength(1);

      const result = projectManager.deleteProject('1');
      expect(result).toBe(true);
      expect(projectManager.getAllProjects()).toHaveLength(0);
    });

    test('sollte false zurückgeben, wenn Projekt nicht gefunden wird', () => {
      expect(projectManager.deleteProject('999')).toBe(false);
    });
  });
});

