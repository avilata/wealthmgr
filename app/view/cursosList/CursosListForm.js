Ext.define('wealthmgr.view.cursosList.CursosListForm',{
    extend: 'Ext.tab.Panel',
    alias: 'widget.CursosListForm',
	controller:'CursosListForm',
    title: 'Cursos',
    iconCls: 'icon-rosette',
	closable:true,
    bodyBorder: false, 

    tabPosition: 'left',
    bodyStyle: { padding: '5px' },
    initComponent: function() {
        var me = this;
        Ext.apply(me, {
            items: me.buildItems()
        });
        me.callParent(arguments);
    },
    buildItems: function() {
        return [{
				xtype: 'CursosListEast'
			},
			{
				xtype:'SuscritosCenter'
			},
			{
				xtype:'Attach'
			}
		]
    }
});