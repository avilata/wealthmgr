Ext.define('wealthmgr.model.Users', {
	extend: 'Ext.data.Model',
	fields: [
	         { name: 'id',  type: 'int' ,persist:false},
	         { name: 'email',  type: 'string'},
	         { name: 'username',  type: 'string'},
			 { name: 'userRol', type:'int'} // 0 normal, 1 superuser

	         ],
	proxy: {
		type: 'rest',
		url: 'php/users/bd_users.php/findUsersFilter/',
		writer:{type:'mappedjson', nameProperty:'mapping'}, // para que no intente escribir los datos mapping
		listeners : {
					exception : function(proxy, response, operation) {
							Ext.Msg.alert('Atención',response.responseText);
							Ext.ComponentMgr.get('app-main').destroy();
							Ext.widget('login');
					}
				}
	}

});	