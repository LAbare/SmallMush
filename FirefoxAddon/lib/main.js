var pageMod = require("sdk/page-mod");
 
pageMod.PageMod({
	include: /https?:\/\/mush\.(vg|twinoid\.(com|es))\/?#?$/,
	contentScript: 'var MM = document.createElement("script"); MM.src = "http://labare.alwaysdata.net/MushMobile/MushMobile.user.js"; document.head.appendChild(MM);',
});