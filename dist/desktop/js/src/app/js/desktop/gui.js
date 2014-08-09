(function() {
    document.querySelector('body').classList.add('desktop');
    
    var gui = require('nw.gui'),
         win = gui.Window.get();
    
    function exit() {
        gui.App.quit();
    }
    
    document.querySelector('#close-button').addEventListener('click', function() {
        var tray = new gui.Tray({ icon: 'tray.png' });
        var menu = new gui.Menu();
        menu.append(new gui.MenuItem({ label: 'Exit', click: exit}));
        tray.menu = menu;
        win.hide();
        tray.on('click', function() {
            win.show();
            tray.remove();
            var firstInput = document.querySelector("input");
            if (firstInput) {
                firstInput.focus();   
            }
        });
    }); 
    
}());



