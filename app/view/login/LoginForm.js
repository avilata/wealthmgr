Ext.define('wealthmgr.view.login.LoginForm', {
    extend: 'Ext.form.Panel',
    xtype: 'loginf',

//	 plugins: 'viewport',
    controller: 'login',
    bodyPadding: 10,
    title: 'Identificación de Usuario',
    width:500,
	border:true,
	items: [           
		{
            xtype: 'textfield',
            name: 'email',
			width:'100%',
            fieldLabel: 'Email',
            allowBlank: false
        }, {
            xtype: 'textfield',
            name: 'password',
			width:'100%',
            inputType: 'password',
            fieldLabel: 'Password'
       //     allowBlank: false
        }, {
            xtype: 'displayfield',
            hideEmptyLabel: false,
            value: 'No puede dejar en blanco ninguno de los dos campos'
        }],
        buttons: [{
            text: 'Login',
            formBind: true,
            listeners: {
                click: 'onLoginClick'
            }
        }]

});