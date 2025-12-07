const ContactManager = require('../ContactManager');

describe('ContactManager', () => {
  let contactManager;

  beforeEach(() => {
    contactManager = new ContactManager();
  });

  describe('addContact', () => {
    test('sollte eine Kontaktanfrage erfolgreich hinzufügen', () => {
      const contact = {
        id: '1',
        name: 'Max Mustermann',
        email: 'max@example.com',
        message: 'Hallo, ich interessiere mich für Ihre Arbeit!',
        date: new Date()
      };

      const result = contactManager.addContact(contact);
      expect(result).toBe(true);
      expect(contactManager.getAllContacts()).toHaveLength(1);
    });

    test('sollte einen Fehler werfen, wenn Name fehlt', () => {
      const contact = {
        id: '1',
        email: 'max@example.com',
        message: 'Hallo!'
      };

      expect(() => {
        contactManager.addContact(contact);
      }).toThrow('Name ist erforderlich');
    });

    test('sollte einen Fehler werfen, wenn E-Mail fehlt', () => {
      const contact = {
        id: '1',
        name: 'Max Mustermann',
        message: 'Hallo!'
      };

      expect(() => {
        contactManager.addContact(contact);
      }).toThrow('E-Mail ist erforderlich');
    });

    test('sollte einen Fehler werfen, wenn E-Mail ungültig ist', () => {
      const contact = {
        id: '1',
        name: 'Max Mustermann',
        email: 'ungültige-email',
        message: 'Hallo!'
      };

      expect(() => {
        contactManager.addContact(contact);
      }).toThrow('Ungültige E-Mail-Adresse');
    });

    test('sollte keine Duplikate mit derselben ID erlauben', () => {
      const contact1 = {
        id: '1',
        name: 'Max Mustermann',
        email: 'max@example.com',
        message: 'Nachricht 1'
      };

      const contact2 = {
        id: '1',
        name: 'Anna Schmidt',
        email: 'anna@example.com',
        message: 'Nachricht 2'
      };

      contactManager.addContact(contact1);
      expect(() => {
        contactManager.addContact(contact2);
      }).toThrow('Kontakt mit dieser ID existiert bereits');
    });
  });

  describe('getContact', () => {
    test('sollte einen Kontakt anhand der ID abrufen', () => {
      const contact = {
        id: '1',
        name: 'Max Mustermann',
        email: 'max@example.com',
        message: 'Hallo!'
      };

      contactManager.addContact(contact);
      const retrieved = contactManager.getContact('1');

      expect(retrieved).toEqual(contact);
    });

    test('sollte undefined zurückgeben, wenn Kontakt nicht gefunden wird', () => {
      expect(contactManager.getContact('999')).toBeUndefined();
    });
  });

  describe('getAllContacts', () => {
    test('sollte eine leere Liste zurückgeben, wenn keine Kontakte vorhanden sind', () => {
      expect(contactManager.getAllContacts()).toEqual([]);
    });

    test('sollte alle Kontakte zurückgeben', () => {
      const contact1 = {
        id: '1',
        name: 'Max Mustermann',
        email: 'max@example.com',
        message: 'Nachricht 1'
      };
      const contact2 = {
        id: '2',
        name: 'Anna Schmidt',
        email: 'anna@example.com',
        message: 'Nachricht 2'
      };

      contactManager.addContact(contact1);
      contactManager.addContact(contact2);

      const contacts = contactManager.getAllContacts();
      expect(contacts).toHaveLength(2);
    });
  });

  describe('getUnreadContacts', () => {
    test('sollte nur ungelesene Kontakte zurückgeben', () => {
      const contact1 = {
        id: '1',
        name: 'Max Mustermann',
        email: 'max@example.com',
        message: 'Nachricht 1',
        read: false
      };
      const contact2 = {
        id: '2',
        name: 'Anna Schmidt',
        email: 'anna@example.com',
        message: 'Nachricht 2',
        read: true
      };
      const contact3 = {
        id: '3',
        name: 'Peter Müller',
        email: 'peter@example.com',
        message: 'Nachricht 3',
        read: false
      };

      contactManager.addContact(contact1);
      contactManager.addContact(contact2);
      contactManager.addContact(contact3);

      const unread = contactManager.getUnreadContacts();
      expect(unread).toHaveLength(2);
      expect(unread).toContainEqual(contact1);
      expect(unread).toContainEqual(contact3);
    });
  });

  describe('markAsRead', () => {
    test('sollte einen Kontakt als gelesen markieren', () => {
      const contact = {
        id: '1',
        name: 'Max Mustermann',
        email: 'max@example.com',
        message: 'Nachricht',
        read: false
      };

      contactManager.addContact(contact);
      const result = contactManager.markAsRead('1');

      expect(result).toBe(true);
      expect(contactManager.getContact('1').read).toBe(true);
    });

    test('sollte false zurückgeben, wenn Kontakt nicht gefunden wird', () => {
      expect(contactManager.markAsRead('999')).toBe(false);
    });
  });

  describe('deleteContact', () => {
    test('sollte einen Kontakt erfolgreich löschen', () => {
      const contact = {
        id: '1',
        name: 'Max Mustermann',
        email: 'max@example.com',
        message: 'Nachricht'
      };

      contactManager.addContact(contact);
      expect(contactManager.getAllContacts()).toHaveLength(1);

      const result = contactManager.deleteContact('1');
      expect(result).toBe(true);
      expect(contactManager.getAllContacts()).toHaveLength(0);
    });

    test('sollte false zurückgeben, wenn Kontakt nicht gefunden wird', () => {
      expect(contactManager.deleteContact('999')).toBe(false);
    });
  });
});

