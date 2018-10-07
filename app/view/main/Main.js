/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('wealthmgr.view.main.Main', {
    extend: 'Ext.panel.Panel',
 
    xtype: 'app-main',
    id:'app-main',
    controller: 'main',
    plugins: 'viewport',
    layout: {
    	type: 'vbox',
    	align: 'stretch'
    },

    items: [
            {
        xtype: 'container',
        height: 33,
        html: 
			   '<style>'+
			       ' #app-header {'+
				'		background: #CC1414 url(img/hd-bg.gif) repeat-x scroll 0pt;'+
				'		border: 0pt none;'+
				'		padding-left: 3px;'+
				'		color: white;'+
				'		font-family: arial, sans-serif;'+
				'		font-size: 16px;'+
				'		font-size-adjust: none;'+
				'		font-stretch: normal;'+
				'		font-style: normal;'+
				'		font-variant: normal;'+
				'		font-weight: bold;'+
				'		line-height: normal;'+
				'		padding: 6px 0 8px 6px;'+
				'	}'+
			    '</style>'+

        	'<div id="app-header">Plan de Formación</div>'
    }
    ,{
    	xtype: 'MainMenu',
    	height: 28
    }
    ,{
        xtype: 'MainTabs',
        id: 'mainTabs',
        flex: 1
    }    
    ,{
    	xtype: 'statusbar',
    	id: 'mainStatus',
    	defaultText: '',
    	autoClear: 2000,
    	items: ['-', {
    		xtype: 'tbtext',
    		id: 'mainLogon',
    		text: 'Login'
    	}, '']
    }
    ]
});
