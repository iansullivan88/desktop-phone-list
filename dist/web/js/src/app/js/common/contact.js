angular.module('phoneListApp.services').factory('Contact', ['$q', function ($q) {
    var storageKey = "contacts",
        cachedContacts = null;
    
    function saveContacts(contacts) {
        cachedContacts = contacts;
        window.localStorage.setItem(storageKey, angular.toJson(contacts));
    }

    function getContacts() {
        if (!cachedContacts) {
            var storedContacts = window.localStorage.getItem(storageKey);
            if (storedContacts) {
                cachedContacts = JSON.parse(storedContacts);
            } else {
                cachedContacts = {};
            }
        }
        return cachedContacts;
    }
    
    function getContact(contactId, callback) {
        callback(getContacts()[contactId]);
    }
    
    function saveContact(contact, callback) {
        var contacts = getContacts();
        if (!contact.id) {
            var nextId = 0;
            while (contacts.hasOwnProperty(++nextId)) {}
            contact.id = nextId;
        }

        contacts[contact.id] = contact;
        saveContacts(contacts);   
        callback(contact);
    }
    
    function deleteContact(contactId, callback) {
        var contacts = getContacts();
        if (contacts.hasOwnProperty(contactId)) {
            delete contacts[contactId];
            saveContacts(contacts);
        }
        callback();
    }
    
    return {
        getContact: getContact,
        getContacts: function(callback) {
            var contactArray = Object.keys(getContacts()).map(function(id) {return cachedContacts[id];})
            callback(contactArray);
        },
        saveContact: saveContact,
        deleteContact: deleteContact
    };
    
    
}]);