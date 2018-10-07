


// pongo aqui el require de todos los archivos del proyecto así no tengo que poner requires en cada uno de los archivos 
Ext.require([
'Ext.ux.statusbar.StatusBar' //jv.7.10.18. he tenido que copiar la carpeta packages/classic/ux en /ext/classic/src
//'Ext.ux.CheckColumn',
//'Ext.data.proxy.Rest',
//'Ext.form.FieldContainer',
//'Ext.form.field.Date',
//'Ext.toolbar.Spacer',
//'Ext.util.Cookies',
//'Ext.grid.*',
//'Ext.util.History'
 ]);
Ext.require([
             'wealthmgr.model.*',
             'wealthmgr.store.*',
             'wealthmgr.view.*',
             'wealthmgr.widget.*',
             'wealthmgr.data.writer.MappedJson'
             ]);

/**
 * The main application class. An instance of this class is created by app.js when it calls
 * Ext.application(). This is the ideal place to handle application launch and initialization
 * details.
 */
Ext.define('wealthmgr.Application', {
    extend: 'Ext.app.Application',
    
    name: 'wealthmgr',

    stores: [
        // TODO: add global / shared stores here
		// se cargan al iniciar la aplicacion
      'Ejercicios' ,
	  'Cursoformacion'
    ],
    
    launch: function () {

        // It's important to note that this type of application could use
        // any type of storage, i.e., Cookies, LocalStorage, etc.
        var loggedIn;

        // Check to see the current value of the localStorage key
        loggedIn = localStorage.getItem("UserLoggedIn");
        wealthmgr.app.datosLogin = {};
		wealthmgr.app.datosLogin.login=localStorage.getItem("login");
		wealthmgr.app.datosLogin.email=localStorage.getItem("email");
		wealthmgr.app.datosLogin.userRol=localStorage.getItem("userRol");

        // This ternary operator determines the value of the TutorialLoggedIn key.
        // If TutorialLoggedIn isn't true, we display the login window,
        // otherwise, we display the main view
        Ext.widget(loggedIn ? 'app-main' : 'login');

    }   
});
