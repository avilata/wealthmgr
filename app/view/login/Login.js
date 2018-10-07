Ext.define('wealthmgr.view.login.Login', {
    extend: 'Ext.panel.Panel',
    xtype: 'login',

	 plugins: 'viewport',
    controller: 'login',
    bodyPadding: 10,
    closable: false,
    autoShow: true,

	items: [           
		{
			xtype: 'container',
			height: '60%',
			loader: {
                  //  autoLoad: true,
                 //   url: 'app/view/login/caratula.html'
                }
		},
		{
			xtype:'container',
			layout:{type:'hbox',
					pack  : 'center',
					align : 'middle'
			},
			items:[{
					xtype: 'loginf'
					}]
		}
	]

});