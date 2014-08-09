angular.module('phoneListApp.services').factory('Contact', ['Persistence', function (persistence) {
    var storageKey = "phone-contacts",
        cachedContacts = null;
    
    function saveContacts(contacts) {
        cachedContacts = contacts;
        persistence.set(storageKey, angular.toJson(contacts));
    }

    function getContacts() {
        if (!cachedContacts) {
            var contactsString = persistence.get(storageKey);
            if (contactsString) {
                cachedContacts = JSON.parse(contactsString);
            } else {
                cachedContacts = {};
            }
        }
        return cachedContacts;
    }
    
    function getContact(contactId, callback) {
        return getContacts()[contactId];
    }
    
    function saveContact(contact, callback) {
        var contacts = getContacts();
        if (!contact.id) {
            // This is a new contact
            var nextId = 0;
            while (contacts.hasOwnProperty(++nextId)) {}
            contact.id = nextId;
        }

        contacts[contact.id] = contact;
        saveContacts(contacts);   
        return contact;
    }
    
    function deleteContact(contactId) {
        var contacts = getContacts();
        if (contacts.hasOwnProperty(contactId)) {
            delete contacts[contactId];
            saveContacts(contacts);
        }
    }
    
    return {
        getContact: getContact,
        getContacts: function() {
            return Object.keys(getContacts()).map(function(id) {return cachedContacts[id];})
        },
        saveContact: saveContact,
        deleteContact: deleteContact
    };
    
    
}]);