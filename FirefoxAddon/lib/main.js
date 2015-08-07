var pageMod = require("sdk/page-mod");
 
pageMod.PageMod({
	include: /https?:\/\/mush\.(vg|twinoid\.(com|es))\/?#?$/,
	contentScript: 'var MM = document.createElement("script"); MM.src = "http://labare.github.io/MushMobile/MushMobile.js"; document.head.appendChild(MM);',
});