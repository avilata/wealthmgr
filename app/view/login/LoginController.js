Ext.define('wealthmgr.view.login.LoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.login',

    onLoginClick: function(component) {
	  var panel = component.up('login').down('loginf'),
		form = panel.getForm(),
		ctrl=this;

		form.submit({
			url: 'php/users/users.php/',
			params:{action:'login'},
			success: function(c,obj) {
				// cargar resto de datos del usuario
				ctrl.doGetDatosUsuario(obj.result.data.email);
				// Remove Login Window
				ctrl.getView().destroy();
			},
			failure: function(c,obj) {
				Ext.Msg.alert('Atencion', obj.result.failure);
			}
		});
    },
	
	/*
	*
	*/
	doGetDatosUsuario: function (pemail) {
		var main = wealthmgr.app.getController('generalController'),
			thisApp=wealthmgr.app; // asi quedan registrados los datos del login en datosLogin
 
				 Ext.Ajax.request({
					url: 'php/users/bd_users.php/findUsersFilter/',
					method: 'GET', 
					params: {email:pemail},
					success: function(response, opts) {
						var result = Ext.decode(response.responseText);
						// Set the localStorage value to true
						localStorage.setItem("UserLoggedIn", true);
						localStorage.setItem("login", result[0].login);
						localStorage.setItem("email", result[0].email);
						localStorage.setItem("userRol", result[0].userRol);
						
						// Add the main view to the viewport
						Ext.widget('app-main');			
						main.status(true, 'Login', null);
						thisApp.datosLogin=result[0];
						Ext.getCmp('mainLogon').setText(thisApp.datosLogin.email);
						main.fireEvent('cargarPermisos'); // lo captura mainmenu controller
					   },
					failure: function(response, opts){
						 Ext.Msg.alert('Atencion',response.responseText);
						 					// Add the main view to the viewport
					}
				});
	}
});