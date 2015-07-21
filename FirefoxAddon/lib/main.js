var data = require("sdk/self").data;
var pageMod = require("sdk/page-mod");
 
pageMod.PageMod({
	include: /https?:\/\/mush\.(vg|twinoid\.(com|es))\/?#?$/,
	contentScriptFile: data.url('MushMobile.user.js'),
	contentScriptOptions: { baseURL: data.url('ico.png') }
});