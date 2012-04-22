// ------------------------------------------------------------------------------------------------------------------------
//
//  ██████             ████       
//  ██  ██             ██         
//  ██  ██ ████ █████  ██   █████ 
//  ██████ ██   ██ ██ █████ ██    
//  ██     ██   █████  ██   █████ 
//  ██     ██   ██     ██      ██ 
//  ██     ██   █████  ██   █████ 
//
// ------------------------------------------------------------------------------------------------------------------------
// Prefs

	// --------------------------------------------------------------------------------
	// debug
	
		//var log		= ko.logging.getLogger("pref-jsfl");
		//log.setLevel(ko.logging.LOG_DEBUG);
		//log.setLevel(ko.logging.LOG_INFO);
	
	// --------------------------------------------------------------------------------
	// globals
	
		if(parent && parent.opener)
		{
			var clear		= window.clear || parent.opener.clear || function(){ };
			var trace		= window.trace || parent.opener.trace || function(){ };
			var ko			= parent.opener.ko;
			var xjsfl		= parent.opener.xjsfl;
			var xjsflLib	= parent.opener.xjsflLib;
		}
	
	// --------------------------------------------------------------------------------
	// variables
	
		var ui = new xjsflLib.UIManager(this);
		var settings =
		[
			['xjsflPath', 'xjsfl.paths.xjsfl'],
			['jsflExtraPaths', 'xjsfl.paths.extra'],
			['execFile', 'xjsfl.exec.file', true],
			['execProject', 'xjsfl.exec.project', true],
			['execItems', 'xjsfl.exec.items', true],
		]
	
	// --------------------------------------------------------------------------------
	// handlers
	
		function onLoad()
		{
			ui.loadGroup(settings);
			parent.hPrefWindow.onpageload();
		}
		
		function OnPreferencePageOK()
		{
			ui.saveGroup();
			return true;
		}
		
	// --------------------------------------------------------------------------------
	// methods
	
		function setXJSFLPath()
		{
			var textbox     = document.getElementById('xjsflPath');
			var path		= ko.filepicker.getFolder(textbox.value, 'Pick the xJSFL installation folder');
			if(path)
			{
				// test that the location is valid
					var url		= (path + '/core/jsfl/libraries/xjsfl.jsfl').replace(/\\/g, '/');
					var file	= new xjsflLib.File(path + '/core/jsfl/libraries/xjsfl.jsfl');
					if( ! file.exists )
					{
						alert('The selected folder is not an xJSFL installation folder');
						return false;
					}
	
				// assign path
					textbox.value   = path;
	
				// create libraries path
					var libraries   = path + '/core/jsfl/libraries/'
					if(navigator.userAgent.indexOf('Windows') != -1)
					{
						libraries   = libraries.replace(/\//g, '\\');
					};
	
				// add libraries to paths if not already there
					var extraPaths = document.getElementById('jsflExtraPaths');
					if(extraPaths.value.indexOf(libraries) === -1)
					{
						extraPaths.value = libraries + ';' + extraPaths.value;
					}
	
				// return
					return true;
					
			}
	
			return false;
		}

