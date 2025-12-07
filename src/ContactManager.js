class ContactManager {
  constructor() {
    this.contacts = [];
  }

  _isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  addContact(contact) {
    if (!contact.name) throw new Error('Name ist erforderlich');
    if (!contact.email) throw new Error('E-Mail ist erforderlich');
    if (!this._isValidEmail(contact.email)) throw new Error('Ungültige E-Mail-Adresse');
    if (this.contacts.find(c => c.id === contact.id)) throw new Error('Kontakt mit dieser ID existiert bereits');
    if (contact.read === undefined) contact.read = false;
    this.contacts.push(contact);
    return true;
  }

  getContact(id) {
    return this.contacts.find(c => c.id === id);
  }

  getAllContacts() {
    return [...this.contacts];
  }

  getUnreadContacts() {
    return this.contacts.filter(c => !c.read);
  }

  markAsRead(id) {
    const contact = this.getContact(id);
    if (!contact) return false;
    contact.read = true;
    return true;
  }

  deleteContact(id) {
    const index = this.contacts.findIndex(c => c.id === id);
    if (index === -1) return false;
    this.contacts.splice(index, 1);
    return true;
  }
}

export default ContactManager;
