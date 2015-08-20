var data = require('sdk/self').data;
var pageMod = require('sdk/page-mod');
 
pageMod.PageMod({
	include: /https?:\/\/mush\.(vg|twinoid\.(com|es))\/?#?$/,
	contentScriptFile: data.url('SmallMush.user.js'),
	contentScriptOptions: { baseUrl: data.url('ico.png').slice(0, -7) }
});