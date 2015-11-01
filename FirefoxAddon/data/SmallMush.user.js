// ==UserScript==
// @name      Small(Mush)
// @version   1.1
// @icon      http://labare.github.io/SmallMush/ico.png
// @match     http://mush.vg/
// @match     http://mush.vg/#
// @match     http://mush.twinoid.com/
// @match     http://mush.twinoid.com/#
// @match     http://mush.twinoid.es/
// @match     http://mush.twinoid.es/#
// @grant     unsafeWindow
// @author    LAbare
// ==/UserScript==


var Main = unsafeWindow.Main || Main;

var unsafeSM = createObjectIn(unsafeWindow, {defineAs: "SM"});


/**—————————————————————————————**\
 *          SMALL(MUSH)          *
 *           by LAbare           *
 *  Script pour Mush sur mobile  *
 *             v1.1              *
\**—————————————————————————————**/


var SM = {};


/* FONCTIONS DÉVELOPPEUR */

SM.sel = function(name) {
	var qsl = name.search(' |:');
	if (name[0] == "." && qsl == -1) { return document.getElementsByClassName(name.slice(1))[0]; }
	else if (name[0] == '#' && qsl == -1) { return document.getElementById(name.slice(1)); }
	else { return document.querySelector(name); }
};

SM.getAttributesList = function(el) {
	var attrs = {};
	for (var i = 0; i < el.attributes.length; i++)
	{
		if (el.attributes[i].name != 'id')
			{ attrs[el.attributes[i].name] = el.attributes[i].value; }
	};
	return attrs;
};

SM.addNewEl = function(type, parent, id, content, attrs) {
	if (['svg', 'path', 'rect', 'text'].indexOf(type) != -1)
		{ var el = document.createElementNS('http://www.w3.org/2000/svg', type); }
	else
		{ var el = document.createElement(type); }
	if (id) { el.id = id; }
	if (content) { el.innerHTML = content; }
	if (attrs) { for (i in attrs) { el.setAttribute(i, attrs[i]); } }
	if (parent) { parent.appendChild(el); }
	return el;
};

SM.addButton = function(parent, text, attrs) {
	var butattrs = { class: 'but' };
	if (attrs)
	{
		for (i in attrs)
		{
			if (i == 'class') { butattrs['class'] += ' ' + attrs[i]; }
			else { butattrs[i] = attrs[i]; }
		}
	}
	var but = SM.addNewEl('div', ((parent) ? parent : null), null, null, butattrs);
	SM.addNewEl('div', SM.addNewEl('div', but, null, null, { class: 'butright' }), null, text, { class: 'butbg' });
	return but;
};

SM.moveEl = function(el, dest, bef) {
	if (el.parentNode) { el.parentNode.removeChild(el); }
	if (bef) { dest.insertBefore(el, bef); }
	else { dest.appendChild(el); }
	return el;
};

SM.copyEl = function (el, dest, bef) {
	var newEl = SM.addNewEl(el.nodeName, null, ((el.id) ? 'SM' + el.id : ''), el.innerHTML, SM.getAttributesList(el));
	var children = newEl.getElementsByTagName("*");
	for (var i = 0; i < children.length; i++)
		{ if (children[i].id) { children[i].id = 'SM' + children[i].id; } }
	if (bef) { dest.insertBefore(newEl, bef); }
	else { dest.appendChild(newEl); }
	return newEl;
};

SM.getTipContent = function(tipFunction) {
	tipFunction();
	var tipContent = SM.sel('.tipcontent').innerHTML;
	Main.hideTip();
	return tipContent;
};

SM.toArray = function(obj) {
	return [].slice.call(obj);
};

SM.reformat = function(text) {
	return text.replace(/\\r|\\n|\r|\n/g, '').replace(/\s+/g, ' ').replace(/\\'/g, "'").replace(/&nbsp;/g, ' ');
};



/* FONCTIONS SMALL(MUSH) */

SM.generateMinimap = function() {
	var rooms = [['m129.5 10.5 0 20 -20 0 0 60 100 0 0 -60 -20 0 0 -20 -60 0z', [155, 50]], [60, 120, 249.5, 230.5], [60, 120, 9.5, 230.5], [60, 120, 249.5, 350.5], [60, 40, 129.5, 310.5], [80, 60, 69.5, 170.5], [80, 60, 69.5, 110.5], [100, 60, 109.5, 250.5], [80, 60, 169.5, 110.5], [180, 90, 69.5, 430.5], [40, 40, 209.5, 50.5], [40, 40, 249.5, 190.5], [40, 40, 249.5, 470.5], [40, 40, 69.5, 50.5], [40, 40, 29.5, 190.5], [40, 40, 29.5, 470.5], [], [], [], [], [], [], [], [], ['m69.5 90.5 0 20 80 0 0 120 20 0 0 -120 80 0 0 -20 -180 0z', [160, 92]], [180, 20, 69.5, 230.5], [220, 20, 29.5, 350.5], [], [60, 100, 9.5, 370.5], ['m209.5 290.5 0 20 -20 0 0 40 60 0 0 -60 -40 0z', [210, 320]], ['m69.5 290.5 0 60 60 0 0 -40 -20 0 0 -20 -40 0z', [100, 320]], [80, 60, 169.5, 170.5], [40, 40, 209.5, 250.5], [40, 60, 209.5, 370.5], [40, 40, 69.5, 250.5], [40, 60, 69.5, 370.5]];

	var doors = [['209.5 60.5 0 20', '0-10'], ['109.5 60.5 0 20', '0-13'], ['149.5 90.5 20 0', '0-24'], ['259.5 350.5 20 0', '1-3'], ['259.5 230.5 20 0', '1-11'], ['249.5 230.5 0 20', '1-25'], ['249.5 300.5 0 20', '1-29'], ['249.5 260.5 0 20', '1-32'], ['39.5 230.5 20 0', '2-14'], ['69.5 230.5 0 20', '2-25'], ['39.5 350.5 20 0', '2-26'], ['69.5 300.5 0 20', '2-30'], ['69.5 260.5 0 20', '2-34'], ['249.5 440.5 0 20', '3-9'], ['259.5 470.5 20 0', '3-12'], ['249.5 350.5 0 20', '3-26'], ['149.5 350.5 20 0', '4-26'], ['119.5 170.5 20 0', '5-6'], ['69.5 200.5 0 20', '5-14'], ['149.5 180.5 0 20', '5-24'], ['149.5 140.5 0 20', '6-24'], ['149.5 250.5 20 0', '7-25'], ['169.5 140.5 0 20', '8-24'], ['179.5 170.5 20 0', '8-31'], ['249.5 480.5 0 20', '9-12'], ['69.5 480.5 0 20', '9-15'], ['69.5 440.5 0 20', '9-28'], ['219.5 430.5 20 0', '9-33'], ['79.5 430.5 20 0', '9-35'], ['219.5 90.5 20 0', '10-24'], ['249.5 200.5 0 20', '11-31'], ['79.5 90.5 20 0', '13-24'], ['39.5 470.5 20 0', '15-28'], ['149.5 230.5 20 0', '24-25'], ['169.5 180.5 0 20', '24-31'], ['39.5 370.5 20 0', '26-28'],  ['219.5 350.5 20 0', '26-29'], ['79.5 350.5 20 0', '26-30'], ['219.5 370.5 20 0', '26-33'], ['79.5 370.5 20 0', '26-35']];

	var popup = SM.sel('#SMpopup');
	popup.innerHTML = '';
	SM.addButton(popup, "X", { id: 'SMpopupclose' }).addEventListener('click', function() { SM.sel('#SMpopup').style.display = 'none'; });
	popup.style.display = 'block';

	SM.addNewEl('h4', popup, null, "<img src='" + SM.src + "ico.png' /> " + SM.TEXT['minimap-title']);
	SM.addNewEl('p', popup, null, SM.TEXT['minimap-warning']);
	SM.addNewEl('p', popup, null, SM.TEXT['minimap-legend']).className = 'SMnospace';
	SM.addNewEl('p', popup, null, SM.TEXT['minimap-room']).className = 'SMnospace';

	var al = { fAl: 'fire', dAl: 'door', eAl: 'alert' }; //Incendies, portes, équipements
	for (var j in al)
	{
		var k = SM.sel('.alarm_bg [src$="/' + al[j] + '.png"]');
		al[j] = ((k) ? SM.reformat(k.parentNode.getAttribute('onmouseover')) : '');
	}

	var bloc = SM.addNewEl('div', popup, 'SMminimapbloc');
	var svg = SM.addNewEl('svg', bloc, 'SMminimap', null, { width: '320', height: '530' });
	var myroom = SM.rooms.indexOf(SM.sel('#input').getAttribute('d_name'));

	for (var i = 0; i < rooms.length; i++)
	{
		var r = rooms[i];
		if (!r.length)
			{ continue; }

		var regexp = RegExp(SM.alertrooms[i] + '\\s\*\[\^2\]\{0,10}\\s\*\\.', 'g'); //Attention à Baie Alpha et Baie Alpha 2
		if (regexp.test(al.fAl))
			{ var roomclass = 'SMmaproom SMmapfire'; }
		else
			{ var roomclass = 'SMmaproom'; }
		if (i == myroom)
			{ roomclass += ' SMmyroom'; }
		if (r.length == 2) //Pièce non rectangulaire
		{
			SM.addNewEl('path', svg, null, null, { d: r[0], 'data-maproom': i, class: roomclass }).addEventListener('click', function() {
				var halo = SM.sel('#SMmapselected');
				if (halo) { halo.id = ''; }
				SM.sel('#SMminimaproom').textContent = SM.localerooms[parseInt(this.getAttribute('data-maproom'))];
				this.id = 'SMmapselected';
			});
			var c = r[1];
		}
		else //Pièce rectangulaire
		{
			SM.addNewEl('rect', svg, null, null, { width: r[0], height: r[1], x: r[2], y: r[3], 'data-maproom': i, class: roomclass }).addEventListener('click', function() {
				var halo = SM.sel('#SMmapselected');
				if (halo) { halo.id = ''; }
				SM.sel('#SMminimaproom').textContent = SM.localerooms[parseInt(this.getAttribute('data-maproom'))];
				this.id = 'SMmapselected';
			});
			var c = [r[2] + (r[0] / 2), r[3] + (r[1] / 2) - 10];
		}

		//Avaries signalées
		//<div> nécessaire, <text> pas supporté sur tous les navigateurs mobiles (coucou Dolphin)
		var rd = al.dAl.match(regexp);
		var re = al.eAl.match(regexp);
		if (rd) { rd = rd.length; }
		if (re) { re = re.length; }
		if (rd && re)
		{
			SM.addNewEl('div', bloc, null, rd, { style: 'position: absolute; left: ' + (c[0] - 10) + 'px; top: ' + c[1] + 'px;', class: 'SMmapalertd' });
			SM.addNewEl('div', bloc, null, re, { style: 'position: absolute; left: ' + (c[0] +5) + 'px; top: ' + c[1] + 'px;', class: 'SMmapalerte' });
		}
		else if (rd)
			{ SM.addNewEl('div', bloc, null, rd, { style: 'position: absolute; left: ' + (c[0] - 5) + 'px; top: ' + c[1] + 'px;', class: 'SMmapalertd' }); }
		else if (re)
			{ SM.addNewEl('div', bloc, null, re, { style: 'position: absolute; left: ' + (c[0] - 5) + 'px; top: ' + c[1] + 'px;', class: 'SMmapalerte' }); }
	}
	//Portes
	for (var i = 0; i < doors.length; i++)
		{ SM.addNewEl('path', svg, null, null, { d: 'm' + doors[i][0], 'data-mapdoor': doors[i][1], class: 'SMmapdoor' }); }
	var it = Main.items.iterator();
	while (it.hasNext())
	{
		var i = it.next();
		if (i.iid == 'DOOR')
			{ SM.sel('[data-mapdoor="' + i.key + '"]').setAttribute('class', 'SMmapdoorbroken'); }
	}
};

SM.changeTab = function(newtab) {
	//#room_col n'est pas caché pour que le jeu Flash fonctionne, juste hors-champ ; on fait glisser #content, la barre d'info et le logo/les liens/les onglets
	var char = SM.sel('#char_col');
	if (newtab == 'room_col')
	{
		SM.sel('#content').scrollLeft = 424;
		SM.sel('#topinfo_bar').style.left = '424px';
		SM.sel('.mxhead').style.left = '424px';
	}
	else
	{
		SM.sel('#content').scrollLeft = 0;
		SM.sel('#topinfo_bar').style.left = '0';
		SM.sel('.mxhead').style.left = '0';
		char.style.display = 'none';
		SM.sel('#ship_tab').style.display = 'none';
		SM.sel('#room_tab').style.display = 'none';
		SM.sel('#chat_col').style.display = 'none';
		SM.sel('#' + newtab).style.display = 'block';
	}
	SM.sel('.SMtabselected').className = '';
	SM.sel('#SMtab-' + newtab).className = 'SMtabselected';
};


SM.SMhelp = function(e) {
	Main.hideTip();
	var el = document.elementFromPoint(e.clientX, e.clientY);
	for (var i = 0; i < 5; i++)
	{
		if (el.onmouseover)
		{
			el.onmouseover();
			SM.sel('#SMhelpscreenB').style.display = 'block';
			break;
		}
		else if (el.getAttribute('data-tip')) //Item : 4 niveaux au-dessus
		{
			var name = decodeURIComponent(/namey[0-9]+:(.+)g$/.exec(el.getAttribute('data-tip'))[1]);
			var desc = SM.reformat(el.getAttribute('data-desc'));
			Main.showTip(el, "<div class='tiptop'><div class='tipbottom'><div class='tipbg'><div class='tipcontent'><h1>" + name + "</h1>" + desc + "</div></div></div></div>");
			SM.sel('#SMhelpscreenB').style.display = 'block';
			break;
		}
		else if (el.getAttribute('data-SMtip'))
		{
			Main.showTip(el, "<div class='tiptop'><div class='tipbottom'><div class='tipbg'><div class='tipcontent'>" + el.getAttribute('data-SMtip') + "</div></div></div></div>");
			SM.sel('#SMhelpscreenB').style.display = 'block';
			break;
		}
		else
			{ el = el.parentNode; }
	}
};


SM.toggleAlertList = function(expand) {
	alerts = expand.parentNode;
	if (alerts.className == 'SMhidden_alerts')
	{
		alerts.className = 'SMshown_alerts';
		expand.textContent = SM.TEXT['hide_alert_reports'];
	}
	else
	{
		alerts.className = 'SMhidden_alerts';
		expand.textContent = SM.TEXT['show_alert_reports'];
	}
};


SM.changeRoom = function(el) {
	var select = SM.sel('#roomselect');
	var roomname = select.options[select.selectedIndex].text;
	if (select.value == 'NULL')
		{ alert(SM.TEXT['unvalid_move']); }
	else
	{
		//Vérification (non-bloquante) d'énergie
		var energy = false;
		if (SM.sel('[src$="/pa1.png"]') || SM.sel('[src$="/pa2.png"]'))
			{ energy = true; }

		//Monture non fonctionnelle aux cycles impairs
		var boulder = false;
		if (SM.sel('#myInventory [style*="rolling_boulder.jpg"]') && parseInt(SM.sel('#input').getAttribute('curcycle')) % 2 == 1) //0 = J1C1
			{ boulder = true; }

		//Handicapé et trottinette
		var disabled = SM.sel('.statuses [src$="disabled.png"]');
		var scooter = SM.sel('#myInventory [style*="antigrav_scooter.jpg"]');

		//Sprinter : pas visible en icône si Mush
		var sprinter = false;
		var heroes = Main.heroes.iterator();
		while (heroes.hasNext())
		{
			var hero = heroes.next();
			if (hero.me == 'true')
			{
				var skills = hero.skills.iterator();
				while (skills.hasNext())
				{
					if (skills.next().img == 'sprinter')
						{ sprinter = true; }
				}
			}
		}

		/* Soit :
		- pas handicapé et pas d'énergie ;
		- handicapé, seul, et soit pas d'énergie, soit Simulateur de gravité en panne et ni Sprinter, ni Trottinette ni Monture rocheuse fonctionnelle sur soi.
		Ne prend pas en compte les blessures ni les objets lourds. */
		if ((!disabled && !energy) || (disabled && SM.ME_ALONE && (!energy || (!SM.GRAVITY && !sprinter && !scooter && !boulder))))
		{
			if (!confirm(SM.TEXT['move_alert']))
				{ return false; }
		}
		
		if (SM.GUARDIAN && !confirm(SM.TEXT['move_guardian']))
			{ return false; }
		
		if (SM.parameters['confirm_action'])
		{
			if (!confirm(SM.TEXT['move_confirm'] + roomname + SM.INTERR))
				{ return false; }
		}
		el.firstChild.firstChild.innerHTML = "<img class='cdLoading' src='/img/icons/ui/loading1.gif' alt='loading…' /> " + SM.TEXT['move_button'];
		if (SM.ME_MODULING) //Si le joueur est en train d'accéder à un terminal, il gardera le statut Concentré ; il faut donc quitter avant
		{
			SM.loadingScreen();
			SM.SMexitModule(function() {
				SM.loadingScreen();
				Main.ajax('/?fa=81&fp=' + select.value, null, function() {
					SM.changeTab('room_tab');
					SM.sel('#SMloadscreen').style.display = 'none';
				});
			});
		}
		else
		{
			SM.loadingScreen();
			Main.ajax('/?fa=81&fp=' + select.value);
		}
	}
};


SM.displayRoomActions = function(type, serial) { //0: personnage; 1: équipment; 3: chat; 5: drone
	var herohalo = SM.sel('#SMheroselected'); //Halo autour d'un personnage, de Schrödinger ou d'un drone
	if (herohalo)
	{
		var halopar = herohalo.parentNode;
		halopar.removeChild(herohalo);
	}
	else
		{ var halopar = ''; }
	var itemhalo = SM.sel('.SMselected'); //Halo autour d'un item de l'inventaire SM
	if (itemhalo)
		{ itemhalo.parentNode.removeChild(itemhalo); }

	switch (type)
	{
		case 0: //Personnage
			SM.sel('#equipmentselect').selectedIndex = 0;
			var selhero = SM.sel('[data-serial="' + serial + '"]');

			if (halopar == selhero)
				{ SM.updateRoomActions(4); break; }
			var hero = Main.heroes.get(serial);
			var srcsel = selhero.lastElementChild.getAttribute('src').replace(/\.png/, '_selected.png');
			SM.moveEl(SM.addNewEl('img', null, 'SMheroselected', null, { src: srcsel }), selhero, selhero.lastElementChild);
			SM.updateRoomActions(0, serial);
			break;

		case 1: //Équipement
			var serial = SM.sel('#equipmentselect').value;
			if (serial == 'NULL')
				{ SM.updateRoomActions(4); }
			else
				{ SM.updateRoomActions(1, serial); }
			break;

		case 3: //Chat
			SM.sel('#equipmentselect').selectedIndex = 0;
			var cat = SM.sel('[data-serial="' + serial + '"]');

			if (halopar == cat)
				{ SM.updateRoomActions(4); break; }
			SM.moveEl(SM.addNewEl('img', null, 'SMheroselected', null, { src: SM.src + "ui/chars/schrodinger_selected.png" }), cat, cat.lastElementChild);
			SM.updateRoomActions(3, serial);
			break;

		case 5: //Drone
			SM.sel('#equipmentselect').selectedIndex = 0;
			var drone = SM.sel('[data-serial="' + serial + '"]');

			if (halopar == drone)
				{ SM.updateRoomActions(4); break; }
			SM.moveEl(SM.addNewEl('img', null, 'SMheroselected', null, { src: SM.src + "ui/chars/drone_selected.png" }), drone, drone.lastElementChild);
			SM.updateRoomActions(1, serial);
			break;
	}
};


SM.updateRoomActions = function(type, serial) { //0: personnage; 1: équipment; 2: item; 3: chat; 4: reset
	var actionListA = SM.sel('#SMroomActionList1');
	var actionListB = SM.sel('#SMroomActionList2');

	//Reset au début nécessaire dans tous les cas
	actionListA.innerHTML = "";
	actionListB.innerHTML = "";
	SM.sel('#SMtt_itemname').innerHTML = '';
	SM.sel('#SMitemdesc').innerHTML = "";
	actionListA.parentNode.className = '';

	if (typeof serial == 'undefined' || serial == 'NULL')
		{ type = 4; }

	switch (type) {
		case 0: //Personnage
			var hero = Main.heroes.get(serial);
			SM.addNewEl('div', actionListA, null, null, { class: 'cdFace face portrait_' + hero.dev_surname }); //Portrait
			var herostatus = SM.addNewEl('div', actionListA, null, null, { class: 'status' });
			SM.addNewEl('div', herostatus, null, hero.name, { class: 'cdCharName charname' }); //Nom

			//Statuts
			var statuslist = SM.addNewEl('ul', herostatus, null, null, { class: 'cdStatusList' });
			var statuses = hero.statuses.iterator();
			while (statuses.hasNext())
			{
				var status = statuses.next();
				SM.addNewEl('li', statuslist, null, '<img src="/img/icons/ui/status/' + status.img + '.png" />', { onmouseover: 'Main.showTip(this,"<div class=\'tiptop\' ><div class=\'tipbottom\'><div class=\'tipbg\'><div class=\'tipcontent\'><h1>' + status.name + '</h1>' + status.desc + '</div></div></div></div>");', onmouseout: 'Main.hideTip();' });
			}

			//Titres
			var titles = hero.titles.iterator();
			while (titles.hasNext())
			{
				var title = titles.next();
				SM.addNewEl('li', statuslist, null, '<img src="/img/icons/ui/' + title.img + '.png" />', { onmouseover: 'Main.showTip(this,"<div class=\'tiptop\' ><div class=\'tipbottom\'><div class=\'tipbg\'><div class=\'tipcontent\'><h1>' + title.name + '</h1>' + title.desc + '</div></div></div></div>");', onmouseout: 'Main.hideTip();' });
			}

			//Spores
			if (hero.spores != null)
				{ SM.addNewEl('li', SM.addNewEl('span', statuslist), null, "<img src='" + hero.spores.img + "' />x" + hero.spores.nb); }

			//Bio courte
			SM.addNewEl('div', actionListA, null, hero.short_desc, { class: 'presentation' });

			//Compétences
			var skillslist = SM.addNewEl('ul', actionListA, null, null, { class: 'cdSkills skills' });
			var skills = hero.skills.iterator();
			while (skills.hasNext())
			{
				var skill = skills.next();
				SM.addNewEl('li', skillslist, null, '<img src="/img/icons/skills/' + skill.img + '.png" />', { onmouseover: 'Main.showTip(this,"<div class=\'tiptop\' ><div class=\'tipbottom\'><div class=\'tipbg\'><div class=\'tipcontent\'><h1>' + skill.name + '</h1>' + skill.desc.replace(/\n/g, '') + '</div></div></div></div>");', onmouseout: 'Main.hideTip();' });
			} //.replace car un retour à la ligne empêcherait l'infobulle d'être correcte pour certains navigateurs (ex. Prémonition)

			//Boutons d'action
			var actions = SM.toArray(document.querySelectorAll('.cdActionRepository [webdata="' + serial + '"]'));
			for (var j = 0; j < actions.length; j++)
				{ SM.copyEl(actions[j], actionListB); }

			actionListA.parentNode.className = 'player';
			SM.sel('#SMtt_itemname').textContent = hero.name;
			break;

		case 1: //Équipement
			var actions = SM.toArray(document.querySelectorAll('.cdActionRepository [webdata="' + serial + '"]'));
			for (var j = 0; j < actions.length; j++)
			{
				if (j % 2)
					{ SM.copyEl(actions[j], actionListB); }
				else
					{ SM.copyEl(actions[j], actionListA); }
			}

			SM.sel('#SMtt_itemname').textContent = SM.sel('[value="' + serial + '"]').textContent;
			break;

		case 2: //Item
			var actions = SM.toArray(document.querySelectorAll('.cdActionRepository [webdata="' + serial + '"]'));
			for (var j = 0; j < actions.length; j++)
			{
				if (j % 2)
					{ SM.copyEl(actions[j], actionListB); }
				else
					{ SM.copyEl(actions[j], actionListA); }
			}

			item = SM.sel('[serial="' + serial + '"]');
			SM.sel('#SMtt_itemname').innerHTML = (
				(item.getAttribute('data-id') == 'BOOK')
				? decodeURIComponent(/namey[0-9]+:(.+)g$/.exec(item.getAttribute('data-tip'))[1]) //Pour obtenir la compétence de l'apprenton dans le nom
				: item.getAttribute('data-name') //Pour avoir les attributs (charges, objet lourd, caché…) dans les autres cas
			);
			if (SM.parameters['food_desc'] && item.getAttribute('data-id') == 'CONSUMABLE')
				{ SM.sel('#SMitemdesc').innerHTML = SM.reformat(item.getAttribute('data-desc')); }
			else
				{ SM.sel('#SMitemdesc').innerHTML = ''; }
			break;

		case 3: //Chat
			var actions = SM.toArray(document.querySelectorAll('.cdActionRepository [webdata="' + serial + '"]'));
			for (var j = 0; j < actions.length; j++)
			{
				if (j % 2)
					{ SM.copyEl(actions[j], actionListB); }
				else
					{ SM.copyEl(actions[j], actionListA); }
			}

			SM.sel('#SMtt_itemname').textContent = 'Schrödinger';
			break;

		case 4: //Reset (déjà fait au début)
			break;
	}

};


SM.changeChatTab = function(el) {
	var tab = el.getAttribute('data-tab');
	if (tab) //Onglet original
	{
		SM.sel('#SMeditortab').className = 'tab taboff';
		SM.sel('#SMeditor').style.display = 'none';
		Main.selChat(parseInt(tab));
		SM.sel('#chatBlock').style.height = '80vh';
		//On force le cookie curChat pour les cas de message dans le mauvais canal (rare et intestable…)
		var date = new Date();
		date.setTime(date.getTime() + 31536000000);
		document.cookie = 'curChat=' + tab + '; expires=' + date.toGMTString() + '; path=/';
		//Avertissement
		var regtab = Main.curChat()[1];
		var bug = SM.sel('#SMchatBug');
		if (!bug)
		{
			var bloc = SM.sel('#chat_col .rightbg');
			bug = SM.moveEl(SM.addNewEl('div', null, 'SMchatBug', null, { style: 'color: red;' }), bloc, bloc.firstChild);
		}
		bug.innerHTML = SM.TEXT['chat_bug'] + SM.TEXT['chat_bug-' + ['local', null, 'mush', null, 'obj', 'wall', 'fav', 'p', 'p', 'p', 'p', 'p'][regtab]];
		if (regtab >= 7)
			{ bug.innerHTML += (regtab - 6) + "."; }
    }
    
    else //Onglet Éditeur de messages
	{
		var tabs = SM.sel('#cdTabsChat').children;
		for (var i = 0; i < tabs.length; i++)
			{ tabs[i].className = tabs[i].className.replace(/tabon/, 'taboff'); }
		SM.sel('#SMeditortab').className = 'tab tabon';

		//Onglets
		var walls = SM.sel('#chatBlock').children;
		for (var i = 0; i < walls.length; i++)
			{ walls[i].style.display = 'none'; }
		SM.sel('#SMeditor').style.display = 'block';

		//Entrées de texte
		SM.sel('#mushform').style.display = 'none';
		SM.sel('#wall').style.display = 'none';
		SM.sel('#privateform').style.display = 'none';

		SM.sel('#chatBlock').style.height = 'auto';
	}
};


SM.SMexitModule = function(func) {
	var button = SM.sel(".cdExitModuleButton");
	//Confirmation d'action
	if (SM.parameters['confirm_action'])
	{
		if (!confirm(SM.TEXT['confirm_action'] + button.textContent.trim() + "'" + SM.INTERR))
			{ return false; }
	}
	SM.loadingScreen();
	button.innerHTML = "<img class='cdLoading' src='/img/icons/ui/loading1.gif' alt='loading…' />" + button.innerHTML;
	SM.sel("#input").setAttribute('isModule', 'false');
	Main.firstLabDone = false;
	Main.labPage = null;
	//Auparavant window.location, utilisation de Main.ajax() pour éviter le rechargement total
	var updtFunc = function() {
		SM.reInit();
		if (func) { func(); }
	};
	Main.ajax("/clearSessionMods", null, updtFunc);
	SM.changeTab('room_tab');
	SM.sel('#cdModuleContent').style.display = 'none';
	button.style.display = 'none';
	SM.sel('#cdMainContent').style.display = 'block';
};


SM.changeActionFunctions = function() {
	//Boutons Nouveau cycle et Nouvelle étape
	SM.sel('#txt_new_cycle a').setAttribute('onclick', 'SM.loadingScreen(); Main.ajax("/", Main.SMupdtArr, function() { SM.reInit(); SM.changeTab("char_col"); }); return false;');
	SM.sel('#txt_new_step a').setAttribute('onclick', 'SM.loadingScreen(); Main.ajax("/", Main.SMupdtArr, function() { SM.reInit(); SM.changeTab("room_col"); }); return false;');
	SM.sel('#txt_new_cycle a').setAttribute('data-SMreload', 'full');
	SM.sel('#txt_new_step a').setAttribute('data-SMreload', 'full');
	//Boutons d'action
	var actions = document.querySelectorAll('.but:not(.fake) [href^="?action="]');
	for (var i = 0; i < actions.length; i++)
	{
		var onclick = actions[i].getAttribute('onclick');
		if (!/SM\./.test(onclick) && !/Main\.confirmAjaxAction/.test(onclick)) //On ne demande pas de confirmation pour ce qui se confirme déjà…
			{ actions[i].setAttribute('onclick', 'if (!SM.beforeAction(this)) { return false; } ' + onclick); }
	}
	//Distributeur (et autres modules ?)
	var shop = document.querySelectorAll('[onclick*="Main.ajaxModule("]');
	for (var i = 0; i < shop.length; i++)
	{
		if (!shop[i].getAttribute('onclick').match(/SM\./))
			{ shop[i].setAttribute('onclick', 'if (!SM.beforeAction(this)) { return false; } ' + shop[i].getAttribute('onclick')); }
	}
	//Missions et actions à rechargement discret : écran + rechargement forcé
	var mis = document.querySelectorAll('[onclick*="Main.ajaxDiscrete("]');
	for (var i = 0; i < mis.length; i++)
	{
		var onclick = mis[i].getAttribute('onclick');
		if (!/SM\./.test(onclick)) //On ne demande pas de confirmation pour ce qui se confirme déjà…
			{ mis[i].setAttribute('onclick', onclick + ' SM.loadingScreen(); Main.ajax("/", null, function() { SM.reInit(); });'); }
	}
	//En cas d'accès à un terminal, changement de Main.exitModule() en SM.SMexitModule()
	var exitmodule = SM.sel('.cdExitModuleButton');
	if (exitmodule)
		{ exitmodule.setAttribute('onclick', 'SM.SMexitModule(); return false;'); }
};


SM.beforeAction = function(el) {
	//Sauvegarde du message de l'éditeur
	var wallpost = SM.sel('#tid_wallPost');
	if (wallpost && wallpost.value)
		{ SM.previewtext = wallpost.value.slice(0, 2500); }

	//Confirmation d'action
	if (SM.parameters['confirm_action'])
	{
		var name = SM.reformat(el.innerHTML.trim().replace(/<\/?span>/g, ''));
		name = name.replace(/<img(?:.*)\/(.*)\.png(?:.*)\/?>/g, function (s, p) {
			var pa;
			switch (p)
			{
				case 'pa_eng': pa = 'eng'; break;
				case 'pa_garden': pa = 'garden'; break;
				case 'pa_core': pa = 'neron'; break;
				case 'pa_comp': pa = 'comp'; break;
				case 'pa_heal': pa = 'heal'; break;
				case 'pa_pilgred': pa = 'pilgred'; break;
				case 'pa_shoot': pa = 'shoot'; break;
				case 'pa_cook': pa = 'cook'; break;
				case 'credit_small': pa = 'klix'; break;
				default: pa = 'general'; break;
			}
			return SM.TEXT['AP-' + pa] + " :";
		});
		if (!confirm(SM.TEXT['confirm_action'] + name + "'" + SM.INTERR))
			{ return false; }
	}
	SM.loadingScreen();

	//Changement d'onglet Small(Mush)
	var action = Main.extractAction(el.getAttribute('href'));
	//Accéder à un terminal ou au Bloc de post-it, Radio du Daedalus, Envoyer une mission, Annonce générale, Décoller en Icarus
	if (['ACCESS', 'ACCESS_SECONDARY', 'COMMANDER_ORDER', 'DAILY_ORDER', 'ICARUS_TAKEOFF'].indexOf(action) != -1)
		{ SM.changeTab('room_col'); }
	//Examiner, Lire, Passage au Mycoscan, Lister l'équipage, Lire le niveau de la Chambre de combustion, Torturer, Prémonition, Kube, Chuchoter, Fouiner (Métalo)
	else if (['INSPECT', 'CONSULT_DOC', 'CHECK_FOR_INFECTION', 'CHECK_CREW_LIST', 'CHECK_LEVEL', 'TORTURE', 'PREMONITION', 'TRY_KUBE', 'WHISPER', 'GEN_METAL'].indexOf(action) != -1)
		{ SM.changeTab('chat_col'); }

	return true;
};


SM.hidePaste = function() {
	SM.sel('#cdMainChat').className = 'SMhidepaste';
	SM.sel('#cdModuleContent').className = SM.sel('#cdModuleContent').className.replace(/SMshowpaste/, 'SMhidepaste');
}


SM.loadingScreen = function() {
	var screen = SM.sel('#SMloadscreen');
	screen.innerHTML = '<img src="/img/icons/ui/loading1.gif" /><br /><img src="/img/icons/ui/pa_core.png" style="vertical-align: middle;" /> ' + SM.loadingTexts[Math.floor(Math.random() * (SM.loadingTexts.length))];
	screen.style.display = 'block';
};


SM.reInit = function() {
	SM.ME_NERON = false;
	SM.ME_ALONE = true;
	SM.ME_MODULING = false;
	SM.GUARDIAN = false;
	SM.GRAVITY = true;

	Main.onLoad(1);
	Main.enableClock = true;
	if (!SM.sel('#ship_tab'))
		{ SM.initTabs(); }
	SM.sel('#ship_tab').innerHTML = '';
	SM.sel('#room_tab').innerHTML = '';
	SM.charTab();
	SM.shipTab();
	SM.roomTab();
	SM.chatTab();
	SM.gameTab();
	SM.topStats();
	SM.messageEditor();
	SM.changeActionFunctions();
	SM.sel("#SMbar .cycletime").textContent = SM.sel("#chat_col .cycletime").textContent;
	if (SM.sel('.SMtabselected') == SM.sel('#SMtab-room_col'))
	{
		SM.sel('#content').scrollLeft = 424;
		SM.sel('#topinfo_bar').style.left = '424px';
		SM.sel('.mxhead').style.left = '424px';
	}
	SM.sel('#SMloadscreen').style.display = 'none';
};


SM.showLicense = function() {
	var popup = SM.sel('#SMpopup');
	popup.innerHTML = '';
	SM.addButton(popup, "X", { id: 'SMpopupclose' }).addEventListener('click', function() { SM.sel('#SMpopup').style.display = 'none'; });
	SM.addNewEl('div', popup, null, SM.TEXT['license']);
};



/* FONCTIONS RELATIVES À L'INVENTAIRE SMALL(MUSH) */

SM.selectItem = function(item) {
	var itemchild = item.firstElementChild; //Soit le halo de sélection, soit l'image de l'objet
	if (itemchild.className == 'SMselected')
	{
		item.removeChild(itemchild);
		SM.updateRoomActions(4); //Reset
	}
	else
	{
		var itemhalo = SM.sel('.SMselected');
		if (itemhalo)
			{ itemhalo.parentNode.removeChild(itemhalo); }
		SM.moveEl(SM.addNewEl('div', null, null, null, { class: 'SMselected' }), item, itemchild);
		SM.updateRoomActions(2, item.getAttribute('serial'));
	}

	SM.sel('#equipmentselect').selectedIndex = 0;
	var herosel = SM.sel('#SMheroselected');
	if (herosel)
		{ herosel.parentNode.removeChild(herosel); }
};


SM.itemLeft = function() {
	var inv = SM.sel('#SMroom');
	var arrowleft = SM.sel('#SMtt_itemname').previousElementSibling;
	var arrowright = SM.sel('#SMtt_itemname').nextElementSibling;
	var shift = -parseInt(inv.style.marginLeft) || 0;
	if (shift > 0)
	{
		var newshift = shift - 56;
		if (newshift == 0)
			{ arrowleft.className += ' off'; }
		if (inv.children.length - (newshift / 56) > 7)
			{ arrowright.className = arrowright.className.replace(/ off/, ''); }
		else
			{ arrowright.className += ' off'; }
		inv.style.marginLeft = '-' + newshift + 'px';
	}
};


SM.itemRight = function() {
	var inv = SM.sel('#SMroom');
	var arrowleft = SM.sel('#SMtt_itemname').previousElementSibling;
	var arrowright = SM.sel('#SMtt_itemname').nextElementSibling;
	var shift = -parseInt(inv.style.marginLeft) || 0;
	if (shift < ((inv.children.length - 7) * 56))
	{
		var newshift = shift + 56;
		if (newshift == ((inv.children.length - 7) * 56))
			{ arrowright.className += ' off'; }
		arrowleft.className = arrowleft.className.replace(/ off/, '');
		inv.style.marginLeft = '-' + newshift + 'px';
	}
};



/* FONCTIONS RELATIVES AUX PARAMÈTRES SMALL(MUSH) */

SM.getSMParameters = function() {
	SM.parameters = {};
	SM.parameters['first_time'] = true;
	SM.parameters['confirm_action'] = false;
	SM.parameters['food_desc'] = true;
	SM.parameters['forced_locale'] = false;
	SM.parameters['locale'] = '0'; //0: non forcé ; 1: FR ; 2: EN ; 3: ES

	var offset = document.cookie.search('SMparams');
	if (offset != -1)
	{
		var parameters = document.cookie.slice(offset + 9);
		SM.parameters['first_time'] = ((parameters[0] == '1') ? true : false);
		SM.parameters['confirm_action'] = ((parameters[1] == '1') ? true : false);
		SM.parameters['food_desc'] = ((parameters[2] == '1') ? true : false);
		SM.parameters['forced_locale'] = ((['1', '2', '3'].indexOf(parameters[3]) != -1) ? true : false);
		if (SM.parameters['forced_locale'])
			{ SM.parameters['locale'] = parseInt(parameters[3]); }
		else
		{
			SM.parameters['locale'] = ['', 'mush.vg', 'mush.twinoid.com', 'mush.twinoid.es'].indexOf(document.domain);
			if (SM.parameters['locale'] == -1)
				{ SM.parameters['locale'] = 2; } //Défault : anglais
		}
	}
	else
		{ SM.setSMParameters(); }
};


SM.setSMParameters = function() {
	var parameters = '0'; //paramètre 'first-time' passant forcément à false
	parameters += ((SM.parameters['confirm_action']) ? 1 : 0);
	parameters += ((SM.parameters['food_desc']) ? 1 : 0);
	parameters += ((SM.parameters['forced_locale']) ? SM.parameters['locale'] : 0);

	var date = new Date();
	date.setTime(date.getTime() + 31536000000);
	document.cookie = 'SMparams=' + parameters + '; expires=' + date.toGMTString() + '; path=/';
};


SM.buildParamsMenu = function() {
	var popup = SM.sel('#SMpopup');
	popup.innerHTML = '';

	SM.addButton(popup, "X", { id: 'SMpopupclose' }).addEventListener('click', function() { SM.sel('#SMpopup').style.display = 'none'; });
	SM.addNewEl('h4', popup, null, SM.TEXT['SMparams-title'] + "  <img src='" + SM.src + "ico.png' />");

	var parameters = ['confirm_action', 'food_desc', 'forced_locale'];
	for (i in parameters)
	{
		var parameter = parameters[i];
		var div = SM.addNewEl('div', popup);
		if (SM.parameters[parameter])
		{
			var input = SM.addNewEl('input', div, 'SMlabel_' + parameter, null, { type: 'checkbox', checked: 'true', 'data-parameter': parameter })
			input.addEventListener('change', function() {
				var p = this.getAttribute('data-parameter');
				SM.parameters[p] = false;
				if (p == 'forced_locale')
				{
					SM.parameters['locale'] = ['', 'mush.vg', 'mush.twinoid.com', 'mush.twinoid.es'].indexOf(document.domain);
					SM.locale(function() {
						SM.setSMParameters();
						SM.buildParamsMenu();
					});
				}
				else
				{
					SM.setSMParameters();
					SM.buildParamsMenu();
				}
			});
		}
		else
		{
			var input = SM.addNewEl('input', div, 'SMlabel_' + parameter, null, { type: 'checkbox', 'data-parameter': parameter })
			input.addEventListener('change', function() {
				SM.parameters[this.getAttribute('data-parameter')] = true;
				SM.setSMParameters();
				SM.buildParamsMenu();
			});
		}
		SM.addNewEl('label', div, null, SM.TEXT['SMparams-' + parameter], { 'for': 'SMlabel_' + parameter });
		div.className = 'SMparamsdiv';
	}

	if (SM.parameters['forced_locale'])
	{
		SM.addNewEl('p', popup, null, SM.TEXT['SMparams-lang_title']);
		var langs = SM.addNewEl('select', popup, 'SMlangselect');
		SM.addNewEl('option', langs, null, "Français", ((SM.parameters['locale'] == 1) ? { value: '1', selected: 'selected' } : { value: '1' }));
		SM.addNewEl('option', langs, null, "English", ((SM.parameters['locale'] == 2) ? { value: '2', selected: 'selected' } : { value: '2' }));
		SM.addNewEl('option', langs, null, "Español", ((SM.parameters['locale'] == 3) ? { value: '3', selected: 'selected' } : { value: '3' }));
		langs.addEventListener('change', function() {
			SM.parameters['locale'] = this.value;
			SM.locale(function() {
				SM.setSMParameters();
				SM.buildParamsMenu();
			});
		});
	}

	//Affichage de l'inventaire dans l'onglet Module
	SM.addButton(popup, SM.TEXT['show_flash_inventory']).addEventListener('click', function() {
		SM.changeTab('room_col');
		SM.sel('#cdInventory').style.visibility = 'visible';
		SM.sel('#cdInventory').firstElementChild.style.display = 'block';
		SM.sel('#roomActionList1').style.opacity = 1;
		SM.sel('#roomActionList2').style.opacity = 1;
	});

	SM.addButton(popup, SM.TEXT['SMparams-chat_unload'], { 'data-tip': SM.TEXT['SMparams-chat_unload_tip'] }).addEventListener('click', function() {
		var date = new Date();
		date.setTime(new Date().getTime() - 42000);
		document.cookie = 'sid=; expires=' + date.toGMTString() + '; path=/; domain=.' + document.domain;
		document.cookie = 'mush_sid=; expires=' + date.toGMTString() + '; path=/; domain=.' + document.domain;
		SM.sel('#SMloadscreen').innerHTML = SM.TEXT['SMparams-chat_unload_reload'];
		SM.sel('#SMloadscreen').style.display = 'block';
		window.setTimeout(function() { window.location = '/'; }, 3000);
	});

	SM.addNewEl('p', popup, null, SM.TEXT['SMparams-credits'], { class: 'SMnospace' });
	SM.addNewEl('p', popup, null, "<a href='http://github.com/LAbare/SmallMush/releases' target='_blank'>v" + SM.version + "</a>", { class: 'SMnospace' });
	SM.addNewEl('p', popup, null, SM.TEXT['SMparams-credits_beta'], { style: 'font-size: 0.7em; margin-bottom: 0;' });
};



/* FONCTIONS D'ADAPTATION DE L'INTERFACE */

SM.initCss = function() {
	SM.addNewEl('link', document.head, null, null, { rel: 'stylesheet', href: SM.src + "SmallMush.css", type: 'text/css' });
	if (screen.width > screen.height) //Mode paysage
		{ var zoom = screen.height / 424; }
	else
		{ var zoom = screen.width / 424; }
	if (zoom > 3)
		{ zoom = 3; }
	SM.addNewEl('meta', document.head, null, null, { name: 'viewport', content: 'width=424px, initial-scale=' + zoom });

	SM.moveEl(SM.addNewEl('img', null, 'SMbottom', null, { src: SM.src + "ui/bottom.png" }), document.body, SM.sel('#tid_bar_down'));

	//Styles CSS basés sur des URLs
	var relcss = SM.addNewEl('style', document.head);
	//Bloc conteneur d'onglets
	relcss.innerHTML += '#content { background: transparent url("' + SM.src + 'ui/background.png"); }\n';
	//Fenêtre d'alerte (« Vous vous êtes sali… »)
	relcss.innerHTML += '.poptop { background: transparent url("' + SM.src + 'ui/poptop.png") no-repeat left top; }\n';
	relcss.innerHTML += '.poptop .popbottom { background: transparent url("' + SM.src + 'ui/popbottom.png") no-repeat left bottom; }\n';
	relcss.innerHTML += '.poptop .popbg { background: transparent url("' + SM.src + 'ui/popbg.png") repeat left bottom; }\n';
	//Barre de liens
	relcss.innerHTML += '#SMlinks { background: transparent url("' + SM.src + 'ui/background.png"); }\n';
	//Conteneurs compétences
	relcss.innerHTML += 'li.skill { background-image: url("' + SM.src + 'ui/skillblock.png"); }\n';
	relcss.innerHTML += '.once_skill .container { background-image: url("' + SM.src + 'ui/once_skill.png"); }\n';
	relcss.innerHTML += '.gold_skill .container { background-image: url("' + SM.src + 'ui/gold_skill.png"); }\n';
	//Énergie
	relcss.innerHTML += '#SMenergybar td { background: transparent url("' + SM.src + 'ui/pabar.png") no-repeat left top; }';
};


SM.initMenubar = function() {
	var bar = SM.moveEl(SM.addNewEl('div', null, 'SMbar'), SM.sel('.mxhead'), SM.sel('.mainmenu'));

	// BARRE SMALL(MUSH) //
	//Rechargement interne de la page
	var butr = SM.addButton(bar, "<img src='" + SM.src + "ui/reload_Mush.png' />", { 'data-SMtip': SM.TEXT['buttontip-reload'] });
	butr.addEventListener('click', function() {
		SM.loadingScreen();
		if (SM.sel('#SMbar [data-SMreload]') || SM.sel('#room_col [data-SMreload]')) //Nouveau cycle ou nouvelle étape
			{ Main.ajax('/', Main.SMupdtArr, function() { SM.reInit(); }); }
		else
			{ Main.ajax('/', null, function() { SM.reInit(); }); }
	});
	SM.addNewEl('div', document.body, 'SMloadscreen', "<img src='/img/icons/ui/loading1.gif' />").addEventListener('click', function() { this.style.display = 'none'; });

	//Aide
	var buthelp = SM.addButton(bar, "<img src='http://mush.vg/img/icons/ui/infoalert.png' />?", { 'data-SMtip': SM.TEXT['buttontip-help'] });
	buthelp.addEventListener('click', function() { SM.sel('#SMhelpscreenA').style.display = 'block'; });
	//Premier écran noir : sélectionner l'élément ; second écran noir : cacher l'infobulle (sinon elle reste)
	SM.addNewEl('div', document.body, 'SMhelpscreenA', SM.TEXT['help_screen-A']).addEventListener('click', function(e) { this.style.display = 'none'; SM.SMhelp(e); });
	SM.addNewEl('div', document.body, 'SMhelpscreenB', SM.TEXT['help_screen-B']).addEventListener('click', function(e) { this.style.display = 'none'; Main.hideTip(); });

	SM.copyEl(SM.sel('.cycletime'), bar); //Jour et cycle
	SM.copyEl(SM.sel('.cdShipCasio'), bar); //Horloge

	//Paramètres Small(Mush)
	SM.addNewEl('img', bar, 'SMparams', null, { src: SM.src + "ui/params.png" }).addEventListener('click', function() {
		SM.buildParamsMenu();
		SM.sel('#SMpopup').style.display = 'block';
	});

	//Liens
	var links = SM.toArray(SM.sel('#menuBar').children);
	for (var i = 0; i < links.length; i++)
		{ links[i].firstElementChild.setAttribute('target', '_blank'); }

	//Onglets Small(Mush)
	var menu = SM.addNewEl('ul', SM.sel('.mxhead'), 'SMtabs');
	var chartab = SM.addNewEl('li', menu, 'SMtab-char_col', "<img src='/img/icons/ui/noob.png' />" + SM.TEXT['tabs-char'], { 'data-SMtip': SM.TEXT['tabtip-chartab'] });
	chartab.addEventListener('click', function() { SM.changeTab('char_col'); });
	chartab.className = 'SMtabselected';

	var shiptab = SM.addNewEl('li', menu, 'SMtab-ship_tab', "<img src='/img/icons/ui/pa_core.png' />" + SM.TEXT['tabs-ship'], { 'data-SMtip': SM.TEXT['tabtip-shiptab'] });
	shiptab.addEventListener('click', function() { SM.changeTab('ship_tab'); });

	var roomtab = SM.addNewEl('li', menu, 'SMtab-room_tab', "<img src='/img/icons/ui/door.png' />" + SM.TEXT['tabs-room'], { 'data-SMtip': SM.TEXT['tabtip-roomtab'] });
	roomtab.addEventListener('click', function() { SM.changeTab('room_tab'); });

	var chattab = SM.addNewEl('li', menu, 'SMtab-chat_col', "<img src='/img/icons/ui/wall.png' />" + SM.TEXT['tabs-chat'], { 'data-SMtip': SM.TEXT['tabtip-chattab'] });
	chattab.addEventListener('click', function() { SM.changeTab('chat_col'); });

	var gametab = SM.addNewEl('li', menu, 'SMtab-room_col', "<img src='/img/icons/ui/moduling.png' />" + SM.TEXT['tabs-game'], { 'data-SMtip': SM.TEXT['tabtip-gametab'] });
	gametab.addEventListener('click', function() { SM.changeTab('room_col'); });

	var shoptab = SM.addNewEl('li', menu, 'SMvending', "<img src='/img/icons/ui/credit_small.png' />" + SM.TEXT['tabs-shop'], { 'data-SMtip': SM.TEXT['tabtip-shoptab'] });
	shoptab.addEventListener('click', function() {
		SM.sel('#SMvending').innerHTML = "<img src='/img/icons/ui/loading1.gif' />" + SM.TEXT['tabs-shop'];
		Main.ajax('/vending', null, function() {
			SM.reInit();
			SM.changeTab('room_col');
			SM.sel('#SMvending').innerHTML = "<img src='/img/icons/ui/credit_small.png' />" + SM.TEXT['tabs-shop'];
		});
	});

	SM.addNewEl('div', document.body, 'SMpopup').style.display = 'none';
	SM.buildParamsMenu();
};


SM.initTabs = function() {
	var tabs = SM.sel('#char_col').parentNode; //table.inter > tr
	tabs.setAttribute('data-visible-tab', 'char_col');
	tabs.id = 'tabs_box';

	var chartab = SM.sel('#char_col');
	var shiptab = SM.addNewEl('td', tabs, 'ship_tab');
	var roomtab = SM.addNewEl('td', tabs, 'room_tab');
	var chattab = SM.sel('#chat_col');
	var gametab = SM.sel('#room_col');

	//#room_col doit être à droite pour que le .scrollLeft fonctionne correctement ; sinon il est directement après #char_col
	SM.moveEl(shiptab, tabs, gametab);
	SM.moveEl(roomtab, tabs, gametab);
	SM.moveEl(chattab, tabs, gametab);

	chartab.style.display = 'block';
	shiptab.style.display = 'none';
	roomtab.style.display = 'none';
	chattab.style.display = 'none';
	//Ne pas cacher game_tab (#room_col), ou le jeu Flash ne fonctionnera pas ; utiliser .scrollLeft
};


SM.charTab = function() {
	var sheetmain = SM.sel('.sheetmain');
	//Affiche les actions joueur, qui sont normalement cachées jusqu'au chargement du jeu Flash
	if (SM.sel('.cdActionList').children.length == 0)
	{
		var actions = SM.sel('.cdActionRepository .heroRoomActions').children;
		for (var i = 0; i < actions.length; i++)
			{ SM.copyEl(actions[i], SM.sel('.cdActionList')); }
	}

	if (SM.sel('#SMenergybar')) //Si l'onglet n'a pas déjà été adapté
		{ return; }

	// COMPÉTENCES //
	SM.moveEl(SM.sel('[class="skills"]'), sheetmain, sheetmain.firstChild);

	// PERSONNAGE //
	//Bloc comprenant le portrait en fond (.avatar), le nom et les titres (.SMwho) en haut à gauche, le triomphe (triumphLi) en haut à droite, le niveau (.level) en bas à droite et le message de promo (.gogold) en bas, afin de pouvoir placer tous ces éléments en position:absolute
	var characterdiv = SM.moveEl(SM.addNewEl('div', null, 'SMcharacterdiv'), sheetmain, sheetmain.firstChild);
	SM.addNewEl('div', characterdiv, '', SM.sel('.who').parentNode.innerHTML).className = 'SMwho';
	var triumphLi = SM.sel('.spaceshipstatus [src$="triumph.png"]').parentNode;
	SM.moveEl(SM.addNewEl('div', null, 'SMtriumph', triumphLi.innerHTML.trim(), SM.getAttributesList(triumphLi)), characterdiv);
	SM.copyEl(SM.sel('.level'), characterdiv);
	SM.moveEl(SM.sel('.avatar'), characterdiv).className = 'avatar SM' + SM.sel('.who').textContent.trim().replace(" ", "_").toLowerCase();
	if (SM.sel('.gogold')) //Message « Achetez du mode Or »
		{ SM.moveEl(SM.sel('.gogold'), characterdiv); }

	// ÉNERGIE //
	//Copie des barres d'énergie pour les intégrer au tableau des barres de santé (plus léger et plus sûr niveau CSS que des position: dans tous les sens…)
	var SMenergybar = SM.addNewEl('tr', SM.sel('.pvsm').firstElementChild, 'SMenergybar');
	var oldPa = SM.sel('#cdPaBloc');
	var APbar = oldPa.children[2];
	SM.addNewEl('td', SMenergybar, null, APbar.innerHTML, SM.getAttributesList(APbar));
	var MPbar = oldPa.children[3];
	SM.addNewEl('td', SMenergybar, null, MPbar.innerHTML, SM.getAttributesList(MPbar));

	//Points d'action spéciaux : ont la forme Nombre:Image dans la structure HTML de base
	var extraAPs = SM.toArray(document.getElementsByClassName('extrapa'));
	if (extraAPs.length)
	{
		var extratd = SM.addNewEl('td', SM.addNewEl('tr', SM.sel('.pvsm').firstElementChild), 'SMextratd', null, { colspan: '2' });
		for (var i = 0; i < extraAPs.length; i++)
		{
			var extrapoint = SM.addNewEl('span', extratd, null, null, SM.getAttributesList(extraAPs[i]));
			SM.moveEl(extraAPs[i].lastElementChild, extrapoint); //Image
			SM.moveEl(extraAPs[i].firstElementChild, extrapoint); //Nombre
		}
	}

	oldPa.style.display = 'none';
};


SM.shipTab = function() {
	var ship_tab = SM.sel('#ship_tab');
	SM.addNewEl('h4', ship_tab, null, SM.TEXT['SM-added_tab']).className = 'SMtabwarning';
	SM.addNewEl('p', ship_tab, null, SM.TEXT['SM-added_tab_text']).className = 'SMtabwarning';

	// ALERTES //
	//Copie des alertes dans un format facilement lisible
	var alerts = SM.sel('.alarm_bg').firstElementChild;

	if (alerts.nodeName == 'IMG') //Vaisseau calme
		{ var alertsdiv = SM.addNewEl('div', ship_tab, 'SMalerts', SM.sel('.alarm_bg').innerHTML + SM.getTipContent(SM.sel('.alarm').parentNode.onmouseover), { class: 'SMnoalert' }); }
	else
	{
		alerts = SM.copyEl(alerts, ship_tab);
		alerts.id = 'SMalerts';
		alerts.className = 'SMalerton';

		for (var i = 0; i < alerts.children.length; i++)
		{
			var alert = alerts.children[i];
			if (alert.onmouseover)
			{
				var alertContent = SM.addNewEl('div', alert, null, SM.getTipContent(alert.onmouseover)); //Texte
				SM.moveEl(alert.firstElementChild, alertContent.firstElementChild, alertContent.firstElementChild.firstChild); //Image

				//Liste de rapports (portes cassées, incendies…) → la liste est cachée (par CSS) et on ajoute un bouton « Afficher les rapports »
				if (alertContent.lastElementChild.nodeName == 'UL')
				{
					var span = SM.moveEl(SM.addNewEl('span', null, null, SM.TEXT['show_alert_reports'], { class: 'SMalertexpand' }), alertContent, alertContent.getElementsByClassName('ul')[0]);
					span.addEventListener('click', function() { SM.toggleAlertList(this); });
					alertContent.className = 'SMhidden_alerts';
				}

				//Mis à zéro, sinon l'infobulle s'affiche en passant la souris/le doigt sur l'alerte déjà lisible
				alert.onmouseover = '';
				alert.onmouseout = '';
			}

			if (alert.innerHTML.match(/simulator\.png/))
				{ SM.GRAVITY = false; }
		}

		var alarmtext = SM.sel('.alarm_bg li:first-of-type');
		alarmtext.textContent = alarmtext.textContent.replace(/:/, '!');
	}

	SM.sel('.alarm').addEventListener('click', function() { SM.changeTab('ship_tab'); }); //Un clic renvoie aux alertes détaillées

	// EXPÉDITION //
	var expoblock = SM.sel('.exploring');
	if (expoblock)
	{
		var firstalert = SM.sel('.alarm_bg li:first-of-type');
		SM.copyEl(expoblock, ship_tab, SM.sel('#SMalerts')).style.display = 'block'; //Copie, et pas déplacement, sinon le bloc est perdu au rechargement interne
		expoblock.style.display = 'none';
		SM.moveEl(SM.addNewEl('img', null, null, null, { src: '/img/icons/ui/planet.png' }), firstalert, firstalert.firstChild); //Icône planète = expédition en cours
	}

	// PROJETS, RECHERCHES & PILGRED //
	//.SMcardsbreak : saut de ligne
	SM.addNewEl('h4', ship_tab, null, SM.TEXT['cards_title']);
	var newcards = SM.copyEl(SM.sel('#cdBottomBlock'), ship_tab).firstElementChild;
	if (SM.sel('#SMcdBottomBlock .research'))
		{ SM.moveEl(SM.addNewEl('li'), newcards, SM.sel('#SMcdBottomBlock .research').parentNode).className = 'SMcardsbreak'; }
	if (SM.sel('#SMcdBottomBlock .pilgred'))
		{ SM.moveEl(SM.addNewEl('li'), newcards, SM.sel('#SMcdBottomBlock .pilgred').parentNode).className = 'SMcardsbreak'; }

	// BOUCLIER PLASMA //
	if (!SM.sel('[src$="plasma.png"]'))
	{
		var levels = SM.sel('.spaceshipstatus').firstElementChild;
		var plasmalevel = levels.children[2].getAttribute('onmouseover').match(/: ([0-9]+)/g); //Renvoie [': XX' (coque), ': XX' (plasma)]
		if (typeof plasmalevel[1] != 'undefined')
		{
			var li = SM.addNewEl('li', null, null, plasmalevel[1].slice(2) + ' <img src="/img/icons/ui/plasma.png" />');
			li.onmouseover = function() { Main.showTip(this, SM.TEXT['plasma_onmouseover']); };
			li.onmouseout = function() { Main.hideTip(); };
			SM.moveEl(li, levels, levels.children[3]);
		}
	}
};


SM.roomTab = function() {
	var room_tab = SM.sel('#room_tab');
	SM.addNewEl('h4', room_tab, null, SM.TEXT['SM-added_tab']).className = 'SMtabwarning';
	SM.addNewEl('p', room_tab, null, SM.TEXT['SM-added_tab_text']).className = 'SMtabwarning';

	if (SM.sel('.statuses [src$="moduling.png"]'))
	{
		SM.addNewEl('p', room_tab, null, SM.TEXT['roomtab_focused']).className = 'SMcenter';
		return;
	}

	// INCENDIE DANS LA PIÈCE //
	var infobar = SM.sel('#topinfo_bar');
	var fireroom = SM.alertrooms[SM.rooms.indexOf(SM.sel('#input').getAttribute('d_name'))]; //Voir .alertrooms
	if (SM.sel('[href^="?action=SIGNAL_FIRE"]') //Pas encore signalé
		|| (document.querySelector('.alarm [src$="fire.png"]') //Signalé
		   && RegExp(fireroom + '\\s\*\[\^2\]\{0,10}\\s\*\\.').test(SM.getTipContent(document.querySelector('.alarm [src$="fire.png"]').parentNode.onmouseover)))
	)
	{
		infobar.className += ' SMfire'; //Changement du fond de la barre d'info
		SM.addNewEl('p', room_tab, 'SMfiretext', SM.TEXT['fire'], { class: 'SMfire' }); //Ajout d'un texte
	}
	else //Remise à zéro
	{
		infobar.className = 'topinfo';
		if (SM.sel('#SMfiretext'))
			{ room_tab.removeChild(SM.sel('#SMfiretext')); }
	}

	// SE DÉPLACER //
	var doors = [[24,10,13],[3,25,29,32,11],[25,26,30,34,14],[1,26,9,12],[26],[6,24,14],[24,5],[25],[24,31],[33,35,28,3,12,15],[0,24],[31,1],[3,9],[0,24],[5,2],[28,9],[],[],[],[],[],[],[],[],[0,10,13,6,5,8,31,25],[24,2,1,7],[2,3,29,30,4,28,33,35],[],[26,9,15],[1,26],[2,26],[24,11,8],[1],[26,9],[2],[26,9],[],[]];
   
	var roomname = SM.sel('#input').getAttribute('d_name');
	var room = SM.rooms.indexOf(roomname);

	if ([16, 17, 18, 19, 20, 21, 22, 23, 27, 36, 37].indexOf(room) == -1) //Salles sans porte
	{
		//Recherche des portes cassées
		var brokendoors = [];
		var it = Main.items.iterator();
		while (it.hasNext())
		{
			var i = it.next();
			if (i.iid == 'DOOR')
			{
				var j = i.key.split('-'); //Forme '0-24' (pont — couloir avant), toujours dans l'ordre numérique
				if (j[0] == room)
					{ brokendoors.push(parseInt(j[1])); }
				else
					{ brokendoors.push(parseInt(j[0])); }
			}
		}

		SM.addNewEl('b', SM.addNewEl('p', room_tab, null, SM.TEXT['current_room']), null, SM.localerooms[room]);
		SM.addButton(room_tab, SM.TEXT['move_button'], { class: 'SMsmallbut' }).addEventListener('click', function() { SM.changeRoom(this); });
		var roomdoors = SM.addNewEl('select', room_tab, 'roomselect');

		for (var i = 0; i < doors[room].length; i++)
		{
			var door = doors[room][i];
			if (brokendoors.indexOf(door) != -1)
				{ SM.addNewEl('option', roomdoors, null, SM.localerooms[door] + SM.TEXT['broken_door'], { value: 'NULL', class: 'SMbrokendoor' }); }
			else
				{ SM.addNewEl('option', roomdoors, null, SM.localerooms[door], { value: door }); }
		}
	}

	// ÉQUIPEMENTS //
	SM.addNewEl('p', room_tab, null, SM.TEXT['equipments'], { style: 'margin-top: 20px;' });
	var eqlist = SM.addNewEl('select', room_tab, 'equipmentselect');
	eqlist.addEventListener('change', function() { SM.displayRoomActions(1); });
	SM.addNewEl('option', eqlist, null, "—", { value: 'NULL' });

	var items = Main.items.iterator();
	while (items.hasNext())
	{
		var item = items.next();
		var eqname;
		switch (item.iid)
		{
			case 'DOOR': //Portes cassées
				var j = item.key.split('-');
				if (j[0] == room)
					{ eqname = SM.TEXT['door_to'] + SM.localerooms[j[1]]; }
				else
					{ eqname = SM.TEXT['door_to'] + SM.localerooms[j[0]]; }
				break;

			case 'ROTATIONAL_REACTOR': //Réacteurs rotationnels, listés par le jeu de droite à gauche
			case 'BED': //Lits
			case 'PATROL_INTERFACE': //Patrouilleurs
				eqname = SM.TEXT[item.key];
				if (!eqname)
					{ eqname = SM.TEXT[item.iid + '_unknown']; }
				break;

			default: //Autres équipements (sans aucune particularité) et items
				if (SM.sel('[serial="' + item.serial + '"]')) //Si c'est un item, on ne l'ajoute pas à la liste des équipements
					{ eqname = null; }
				else
					{ eqname = item.name; }
				break;
		}
		if (eqname)
		{
			var actions = document.querySelectorAll('[webdata="' + item.serial + '"]');
			for (var i = 0; i < actions.length; i++)
			{
				if (actions[i].innerHTML.indexOf('REPAIR_OBJECT') != -1 || actions[i].innerHTML.indexOf('REPAIR_PATROL_SHIP') != -1)
					{ eqname += ((item.iid == 'DOOR') ? SM.TEXT['broken_door'] : SM.TEXT['broken']); break; }
			}
			SM.addNewEl('option', eqlist, null, eqname, { value: item.serial });
		}
	}

	// CAMARADES //
	var herolist = SM.addNewEl('ul', room_tab, 'SMheroes');

	var heroes = Main.heroes.iterator();
	while (heroes.hasNext())
	{
		var hero = heroes.next();
		var statuses = hero.statuses.iterator();
		var berzerk = false;
		var laid = false;

		if (hero.me == 'true')
		{
			var titles = hero.titles.iterator();
			while (titles.hasNext())
			{
				var title = titles.next();
				if (title.img == 'title_02')
					{ SM.ME_NERON = true; }
			}
		}
		else
			{ SM.ME_ALONE = false; }

		while (statuses.hasNext())
		{
			var status = statuses.next();
			if (status.img == 'berzerk')
				{ berzerk = true; }
			else if (status.img == 'laid')
				{ laid = true; }
			else if (status.img == ('mastered' || 'guardian'))
				{ SM.GUARDIAN = true; }
				
			if (hero.me && status.img == 'moduling')
				{ SM.ME_MODULING = true; }
		}

		var block = SM.addNewEl('li', herolist, null, null, { class: 'SMheroblock', 'data-serial': hero.serial });
		block.addEventListener('click', function() { SM.displayRoomActions(0, this.getAttribute('data-serial')); });

		if (berzerk)
			{ SM.addNewEl('img', block, null, null, { src: SM.src + "ui/chars/berzerk.png" }); }
		else
		{
			if (laid)
			{
				if (room == 5)
					{ SM.addNewEl('img', block, null, null, { src: SM.src + "ui/bed_medlab.png" }); }
				else
					{ SM.addNewEl('img', block, null, null, { src: SM.src + "ui/bed_" + (Math.floor(Math.random() * 6) + 1) + ".png" }); }
				SM.addNewEl('img', block, null, null, { src: SM.src + "ui/chars/" + hero.dev_surname + "-laid.png" });
				if (herolist.children.length > 1)
					{ SM.moveEl(block, herolist, herolist.firstChild); }
				block.className += ' SMlaid';
			}
			else
				{ SM.addNewEl('img', block, null, null, { src: SM.src + "ui/chars/" + hero.dev_surname + ".png" }); }
		}
	}

	// SCHRÖDINGER //
	var cat = Main.npc.iterator();
	if (cat.hasNext() && !SM.sel('[data-id="BODY_CAT"]'))
	{
		var catli = SM.addNewEl('li', herolist, null, "<img src='" + SM.src + "ui/chars/schrodinger.png' />", { class: 'SMheroblock', 'data-serial': cat.next().serial });
		catli.addEventListener('click', function() { SM.displayRoomActions(3, this.getAttribute('data-serial')); });
	}
	
	// DRONES (GRAPHIQUE) //
	var drones = Main.items.iterator();
	while (drones.hasNext())
	{
		var drone = drones.next();
		if (drone.iid == 'HELP_DRONE')
		{
			var d = SM.addNewEl('li', herolist, null, "<img src='" + SM.src + "ui/chars/drone.png' />", { class: 'SMheroblock', 'data-serial': drone.serial });
			d.addEventListener('click', function() { SM.displayRoomActions(5, this.getAttribute('data-serial')); });
		}
	}

	// INVENTAIRE (COPIÉ) //
	SM.addButton(room_tab, SM.TEXT['show_inventory']).addEventListener('click', function() {
		SM.sel('#SMcdInventory .invcolorbg').style.display = 'block'; //Parfois caché par le jeu Flash
		SM.sel('#SMcdInventory .exceed').style.display = 'block';
	});
	var invblock = SM.copyEl(SM.sel('#cdInventory'), room_tab);
	invblock.style.visibility = 'visible';
	SM.sel('#SMcdInventory .invcolorbg').style.display = 'block';
	SM.sel('#SMroomActionList1').style.opacity = 1;
	SM.sel('#SMroomActionList2').style.opacity = 1;
	SM.sel('#SMcdInventory .exceed').style.display = 'none';

	//Changement des fonctions Main par les fonctions SM
	SM.sel('#SMtt_itemname').previousElementSibling.setAttribute('onclick', 'SM.itemLeft();');
	SM.sel('#SMtt_itemname').nextElementSibling.setAttribute('onclick', 'SM.itemRight();');
	var inv = SM.sel('#SMroom');
	for (var i = 0; i < inv.children.length; i++)
		{ inv.children[i].setAttribute('onclick', 'SM.selectItem(this);'); }

	SM.moveEl(SM.addNewEl('div', null, 'SMitemdesc', null), invblock, invblock.lastElementChild);
};


SM.chatTab = function() {
	var chat = SM.sel('#cdMainChat');

	//Liens d'exploration
	var bubbles = SM.toArray(document.querySelectorAll('.bubble:not(.SMlinked)'));
	var exp = /https?:\/\/mush\.(vg|twinoid\.(com|es))\/expPerma\/[0-9]+/g;
	for (var i = 0; i < bubbles.length; i++)
	{
		if (exp.test(bubbles[i].textContent))
		{
			bubbles[i].innerHTML = bubbles[i].innerHTML.replace(exp, "<a target='_blank' href='$&'>$&</a>");
			bubbles[i].className += ' SMlinked';
		}
	}

	// BOUTONS COLLER //
	if (chat.className.search(/SM(hide|show)paste/) == -1)
	{
		chat.className = 'SMhidepaste';
		//Canaux : Mush, général, privé
		var wallinputs = [['#mushform', '#cdChatInput2'], ['#wall', '#cdChatInput5'], ['#privateform', '#cdChatInput7']];
		for (i in wallinputs)
		{
			var input = SM.sel(wallinputs[i][1]);
			if (input)
			{
				input.setAttribute('onfocus', '$(this).addClass("chatboxfocus"); return true;'); //Main.onChatFocus ne fait qu'empêcher le collage… -_-
				input.value = '';
				SM.addButton(SM.sel(wallinputs[i][0]), SM.TEXT['paste'], { class: 'SMpastebutton', 'data-id': wallinputs[i][1] }).addEventListener('click', function() {
					if (SM.previewtext)
					{
						var t = SM.sel(this.getAttribute('data-id'));
						t.value = SM.previewtext;
						t.focus();
					}
					SM.hidePaste();
				});
			}
		}
	}
	//Topics
	var units = document.getElementsByClassName('unit');
	for (var i = 0; i < units.length; i++)
	{
		if (units[i].lastElementChild.className != 'but SMpastebutton')
		{
			SM.addButton(units[i], SM.TEXT['paste'], { class: 'SMpastebutton', 'data-id': units[i].getAttribute('data-k') }).addEventListener('click', function() {
				if (SM.previewtext)
				{
					var t = SM.sel('#wall_reply_' + this.getAttribute('data-id'));
					t.value = SM.previewtext;
					t.parentNode.parentNode.parentNode.className = 'blockreply';
					t.focus();
				}
				SM.hidePaste();
			});
		}
	}

	//Messages non lus
	var unread = document.querySelectorAll('.treereply .not_read');
	for (var i = 0; i < unread.length; i++)
		{ unread[i].setAttribute('style', 'display: table-row;'); }

	//Favoris
	var unfavs = SM.toArray(document.querySelectorAll('[onclick^="Main.onUnfavClick"]'));
	for (var i = 0; i < unfavs.length; i++)
		{ unfavs[i].setAttribute('onclick', "SM.loadingScreen(); Main.onUnfavClick($(this)); return false;"); }
	var favs = SM.toArray(document.querySelectorAll('[onclick^="Main.onFavClick"]'));
	for (var i = 0; i < favs.length; i++)
		{ favs[i].setAttribute('onclick', "SM.loadingScreen(); Main.onFavClick($(this)); return false;"); }

	//Relancement de SM.chatTab() une fois les messages chargés
	SM.sel('#chatBlock').setAttribute('onscroll', 'Main.onChatScroll( $(this) ); if (Main.lmwProcessing) { var chatloading = window.setInterval(function() { if (!Main.lmwProcessing) { clearInterval(chatloading); SM.chatTab(); } }, 100); return true; }');

	//Aide à la copie des logs
	var cycles = document.querySelectorAll('#localChannel .cdChatPack:not(.SMtextlog)');
	for (var i = 0; i < cycles.length; i++)
	{
		cycles[i].style.position = 'relative';
		cycles[i].className = cycles[i].className + ' SMtextlog'
		SM.addNewEl('a', cycles[i], null, SM.TEXT['copy_logs-button'], { class: 'butmini SMlogsbut' }).addEventListener('click', function() {
			var par = this.parentNode;
			var cycle = par.firstElementChild.textContent.trim().toUpperCase();

			var popup = SM.sel('#SMpopup');
			popup.innerHTML = '';
			SM.addButton(popup, "X", { id: 'SMpopupclose' }).addEventListener('click', function() { SM.sel('#SMpopup').style.display = 'none'; });
			popup.style.display = 'block';
			SM.addNewEl('h4', popup, null, cycle);
			var area = SM.addNewEl('textarea', popup, 'SMlogsarea');
			area.value = cycle + "\n\n";

			var logs = par.getElementsByClassName('what_happened');
			for (var j = 0; j < logs.length; j++)
			{
				var log = "";
				var parts = logs[j].childNodes;
				for (var k = 0; k < parts.length; k++)
				{
					var l = parts[k].textContent.trim();
					if (l)
						{ log += l + " "; }
				}
				area.value += log + "\n";
			}
		});
	}
};


SM.gameTab = function() {
	if (SM.sel('#room_col').lastChild.className != 'but')
		{ SM.addButton(SM.sel('#room_col'), SM.TEXT['minimap-button']).addEventListener('click', function() { SM.generateMinimap(); }); }

	var distrib = SM.sel('a.distr');
	distrib.setAttribute('href', '#');
	distrib.addEventListener('click', function() {
		Main.ajax('/vending', null, function() {
			SM.reInit();
		});
	});
	
	//Bouton Coller pour annonces et missions
	var writeblock = SM.sel('#msg_write_form'); //Formulaire d'annonce / ordre
	if (writeblock)
	{
		SM.sel('#cdModuleContent').className += ' SMhidepaste';
		SM.addButton(writeblock, SM.TEXT['paste'], { class: 'SMpastebutton' }).addEventListener('click', function() {
			if (SM.previewtext)
			{
				SM.sel('#msg_write_form textarea').value = SM.previewtext;
				SM.hidePaste();
			}
		});
	}

	var egg = SM.sel('#calcModule [style*="display:none"]');
	if (egg)
		{ egg.textContent = "nuqDaq ’oH eDen. " + egg.textContent; } //Dédicace à BM ! ^_^
};


SM.topStats = function() {
	var hp = SM.sel('.pvsmbar:not(.barmoral) span').textContent.trim();
	var pmo = SM.sel('.barmoral span').textContent.trim();
	var pmatip = SM.getTipContent(SM.sel('#cdPaBloc .bar').onmouseover).match(/[0-9]+\s*<img/g);
	var pa = pmatip[0].slice(0, -4).trim();
	var pm = pmatip[1].slice(0, -4).trim();
	var td = SM.sel('#SMtopstats');
	if (!td)
		{ td = SM.addNewEl('td', SM.addNewEl('tr', SM.sel('#topinfo_bar .genstatus tbody')), 'SMtopstats', SM.TEXT['stats_perso'], { colspan: '2' }); }
	else
		{ td.innerHTML = SM.TEXT['stats_perso']; }
	SM.addNewEl('span', td, null, hp + " <img src='/img/icons/ui/lp.png' alt='hp' />");
	SM.addNewEl('span', td, null, pmo + " <img src='/img/icons/ui/moral.png' alt='moral' />");
	SM.addNewEl('span', td, null, pa + " <img src='/img/icons/ui/pa_slot1.png' alt='pa' />");
	SM.addNewEl('span', td, null, pm + " <img src='/img/icons/ui/pa_slot2.png' alt='pm' />");
};



/* FONCTIONS RELATIVES À L'ÉDITEUR DE MESSAGES */

SM.messageEditor = function() {
	var tabs = SM.sel('#cdTabsChat').children;
	for (var i = 0; i < tabs.length; i++)
		{ tabs[i].setAttribute('onclick', 'SM.changeChatTab(this);'); }

	if (SM.sel('#SMeditor')) //Si l'onglet existe déjà
	{
		//On remet le message sauvegardé
		if (SM.previewtext)
		{
			SM.sel('#tid_wallPost').value = SM.previewtext;
			setTimeout(function() { SM.refreshPreview(); }, 100);
		}
		SM.sel('#SMeditor').style.display = 'none';
		return false;
	}

	var tab = SM.addNewEl('li', SM.sel('.tabschat'), 'SMeditortab', '<img src="http://mush.twinoid.com/img/icons/ui/conceptor.png" />');
	tab.onmouseover = function() { Main.showTip(this, SM.TEXT['editor-tip']); };
	tab.addEventListener('mouseout', function() { Main.hideTip(); });
	tab.addEventListener('click', function() { SM.changeChatTab(this); });
	tab.className = 'tab taboff';
	var editor = SM.addNewEl('div', SM.sel('#chatBlock'), 'SMeditor');
	SM.addNewEl('h4', editor, null, SM.TEXT['SM-added_tab']).className = 'SMtabwarning';
	SM.addNewEl('p', editor, null, SM.TEXT['SM-added_tab_text']).className = 'SMtabwarning';
	SM.addNewEl('p', editor, null, SM.TEXT['editor-tags_warning']).className = 'SMcenter';
	editor.style.display = 'none';

	//On récupère le formulaire de post de message sur le Nexus de Twinoid pour avoir la prévisualisation Twinoid et les smileys
	var src = document.body.getAttribute('data-SM-src');
	SM.addNewEl('div', editor, 'tabreply_content');
	SM.addNewEl('script', document.body, null, null, { src: src, async: 'true' }).onload = function() {
		var form = SM.sel('[action="/mod/wall/post?submit=1"]');
		form.removeChild(form.lastElementChild); //Boutons Envoyer, Options avancées… complètement inutiles ici
		form.removeChild(form.lastElementChild);
		form.removeChild(form.lastElementChild);
		form.action = '';
		form.onsubmit = '';
		var wallpost = SM.sel('#tid_wallPost');
		wallpost.setAttribute('maxlength', '2500');

		//Retrait des balises non-fonctionnelles dans Mush
		var buts = SM.sel('.tid_editorButtons');
		buts.removeChild(SM.sel('.tid_editorBut_link'));
		buts.removeChild(SM.sel('.tid_editorBut_rp'));
		buts.removeChild(SM.sel('.tid_editorBut_question'));
		buts.removeChild(buts.lastChild); //.tid_clear

		//Ajout des boutons de prévisualisation Rafraîchir & Effacer
		SM.addButton(buts, SM.TEXT['preview-refresh'], { class: 'SMsmallbut' }).addEventListener('click', function() { SM.refreshPreview(); });
		SM.addButton(buts, SM.TEXT['preview-erase'], { class: 'SMsmallbut' }).addEventListener('click', function() {
			if (confirm(SM.TEXT['preview-confirm_erase']))
			{
				SM.sel('#tid_wallPost').value = '';
				SM.refreshPreview();
				SM.hidePaste();
			}
		});

		//Ajout des smileys Mush
		SM.addNewEl('p', form, null, '↓ ' + SM.TEXT['editor-mush_smileys'] + ' ↓', { class: 'SMcenter' }).addEventListener('click', function() {
			var block = SM.sel('#SMsmileysblock');
			if (block.style.display == 'none')
			{
				block.style.display = 'block';
				this.textContent = '↑ ' + SM.TEXT['editor-mush_smileys'] + ' ↑';
			}
			else
			{
				block.style.display = 'none';
				this.textContent = '↓ ' + SM.TEXT['editor-mush_smileys'] + ' ↓';
			}
		});
		var s = SM.addNewEl('div', form, 'SMsmileysblock');
		s.style.display = 'none';
		for (var i = 0; i < SM.smileys.length; i++) //Smileys Mush
		{
			SM.addNewEl('img', s, null, null, { src: '/img/icons/ui/' + SM.smileys[i][1], 'data-smiley': SM.smileys[i][0].split('|')[0] }).addEventListener('click', function() {
				SM.sel('#tid_wallPost').value += ':' + this.getAttribute('data-smiley') + ':';
				setTimeout(function() { SM.refreshPreview(); }, 100);
			});
		}

		//Liste des messages préformatés
		SM.addNewEl('p', form, null, SM.TEXT['premessages-title'], { style: 'color: black; margin-top: 20px;' });
		var premessages = SM.addNewEl('select', form, 'SMpremessages');
		premessages.addEventListener('change', function() { SM.buildMessage(); });
		var options = ['NULL', 'inventory', 'researches', 'researches++', 'projects', 'planet', 'comms'];
		for (var i = 0; i < options.length; i++)
			{ SM.addNewEl('option', premessages, null, SM.TEXT['premessages-' + options[i]], { value: options[i] }); }

		//Ajout des boutons de copie & sauvegarde
		SM.addButton(form, SM.TEXT['preview-copy']).addEventListener('click', function() {
			if (SM.sel('#tid_wallPost').value)
			{
				SM.previewtext = SM.sel('#tid_wallPost').value.slice(0, 2500);
				SM.sel('#cdMainChat').className = 'SMshowpaste';
				SM.sel('#cdModuleContent').className = SM.sel('#cdModuleContent').className.replace(/SMhidepaste/, 'SMshowpaste');
			}
		});
		SM.addButton(form, SM.TEXT['preview-save']).addEventListener('click', function() { SM.savePreview(); });
		SM.addButton(form, SM.TEXT['preview-retrieve']).addEventListener('click', function() { SM.retrievePreview(); });

		//Mise à jour de la prévisualisation avec surcouche de formatage Mush
		SM.sel("#tid_wallPost_preview").className += ' talks'; //CSS « bulle »
		wallpost.addEventListener('input', function() {
			setTimeout(function() { SM.refreshPreview(); }, 100); //Délai pour que la surcouche s'effectue après la prévisualisation Twinoid
		});

		if (SM.previewtext) //En cas de reconstruction de l'interface
		{
			wallpost.value = SM.previewtext;
			setTimeout(function() { SM.refreshPreview(); }, 100);
		}
	};
};


SM.refreshPreview = function () {
	var t = SM.sel("#tid_wallPost_preview").innerHTML;
	t = t.replace(/<\/p><p>/g, ''); //Le double retour à la ligne disparaît
	t = t.replace(/\*+([^\*]*)\*+/g, '<strong>$1</strong>'); //Les astérisques simples suffisent à faire du gras
	t = t.replace(/<(\/?)pre>/g, '&lt;$1code&gt;'); //<code> non fonctionnel
	t = t.replace(/<a target=["']_blank["'] href=["'](.*)["']>(.*)<\/a>/g, '[link=$1]$2[/link]'); //Liens non fonctionnels
	t = t.replace(/<span class=["']tid_preRoleplay["']>(.*)<\/span><span class=["']tid_roleplay["']><span class=["']tid_wroleplay["']>(.*)<\/span><\/span>/g, '[rp=$1]$2[/rp]'); //Balise RP
	if (SM.ME_NERON) //Commande /neron
		{ t = t.replace(/\/neron /, '<img src="http://mush.vg/img/icons/ui/pa_core.png" /> <span class="buddy">NERON : </span>'); }
	for (var i = 0; i < SM.smileys.length; i++) //Smileys Mush
		{ t = t.replace(RegExp(':\(' + SM.smileys[i][0] + '\):', 'g'), '<img src="/img/icons/ui/' + SM.smileys[i][1] + '" alt="$1" />'); }
	SM.sel("#tid_wallPost_preview").innerHTML = t;
};


SM.savePreview = function() {
	if (SM.sel('#tid_wallPost').value)
	{
		SM.previewtext = SM.sel('#tid_wallPost').value.slice(0, 2500);
		var date = new Date();
		date.setTime(date.getTime() + 31536000000);
		document.cookie = 'SMptext=' + encodeURIComponent(SM.previewtext) + '; expires=' + date.toGMTString() + '; path=/';
	}
};


SM.retrievePreview = function() {
	var cookies = document.cookie.split('; ');
	for (var i = 0; i < cookies.length; i++)
	{
		var cookie = cookies[i].split('=');
		if (cookie[0] == 'SMptext')
		{
			if (SM.sel('#tid_wallPost').value && !confirm(SM.TEXT['message-overwrite_retrieve']))
				{ return false; }
			var saved = decodeURIComponent(cookie[1]);
			SM.previewtext = saved;
			SM.sel("#tid_wallPost").value = saved;
			SM.refreshPreview();
		}
	}
};


SM.buildMessage = function() {
	var wallpost = SM.sel('#tid_wallPost');
	if (wallpost.value && confirm(SM.TEXT['message-overwrite_build']))
		{ var message = wallpost.value + "\n\n\n\n"; }
	else
		{ var message = ""; }

	var popup = SM.sel('#SMpopup');
	popup.innerHTML = '';

	switch(SM.sel('#SMpremessages').value)
	{
		case 'inventory':
			message += "**" + SM.sel('#input').getAttribute('d_name') + " :** "; //Nom de la pièce
			var inventory = SM.sel('#room').children;
			for (var i = 0; i < inventory.length; i++)
			{
				var item = inventory[i];
				if (item.className == 'item cdEmptySlot') //On arrête dès qu'on tombe sur un slot vide
					{ break; }
				if (/hidden\.png/.test(item.getAttribute('data-name'))) //On ne liste pas les objets cachés
					{ continue; }
				if (/(tracker|talky_walky|super_talky)\.jpg/.test(item.innerHTML)) //Ni les objets personnels
					{ continue; }
				var n = (
					(item.getAttribute('data-id') == 'BOOK')
					? decodeURIComponent(/namey[0-9]+:(.+)g$/.exec(item.getAttribute('data-tip'))[1]) //Pour avoir la compétence en cas d'apprenton
					: item.getAttribute('data-name').trim() //Pour avoir les attributs (lourd, cassé, etc.) pour les autres objets
				);
				n = n.replace(/<img(?:[^<]*)plant_diseased\.png(?:[^<]*)>/, " //" + SM.TEXT['preformat-inventory-diseased'] + "//");
				n = n.replace(/<img(?:[^<]*)plant_thirsty\.png(?:[^<]*)>/, " //" + SM.TEXT['preformat-inventory-thirsty'] + "//");
				n = n.replace(/<img(?:[^<]*)plant_dry\.png(?:[^<]*)>/, " //" + SM.TEXT['preformat-inventory-dry'] + "//");
				n = n.replace(/<img(?:[^<]*)broken\.png(?:[^<]*)>/, " //" + SM.TEXT['preformat-inventory-broken'] + "//"); //Objet cassé
				n = n.replace(/<img(?:[^<]*)charge\.png(?:[^<]*)>x([0-9]+)/, " [$1 " + SM.TEXT['preformat-inventory-charge'] + "]"); //Charges
				n = n.replace(/ ?<img(?:.*)>/g, ''); //Les autres attributs n'importent pas
				message += n;

				if (item.lastElementChild.className == 'qty') //Quantité
					{ message += " (x" + item.lastElementChild.textContent.trim() + ")"; }
				message += ', ';
			}

			var it = Main.items.iterator();
			while (it.hasNext())
			{
				var e = it.next().iid;
				if ((e == 'HELP_DRONE' || e == 'CAMERA') && !SM.sel('[serial="' + e.serial + '"]')) //Équipements seulement, pas en items (caméra installée)
					{ message += "//" + SM.TEXT['preformat-inventory-' + e] + "//, "; }
			}

			var cat = Main.npc.iterator(); //Schrödinger
			if (cat.hasNext())
				{ message += "//Schrödinger//, "; }

			message = message.slice(0, -2) + ".";
			wallpost.value = message;
			SM.refreshPreview();
			break;

		case 'researches':
			if (!SM.sel('#research_module'))
				{ alert(SM.TEXT['preformat-researches-nomodule']); break; }

			message += ":pills: **//" + SM.TEXT['preformat-researches-title'] + " //**:pills:\n\n\n\n";
			var cards = document.getElementsByClassName('cdProjCard');
			for (var i = 0; i < cards.length; i++)
			{
				message += "**" + cards[i].firstElementChild.textContent.trim() + " :** ";
				message += SM.sel('[data-p="' + cards[i].getAttribute('data-p') + '"] #p').textContent.trim() + "\n";
			}

			wallpost.value = message;
			SM.refreshPreview();
			break;

		case 'researches++':
			if (!SM.sel('#research_module'))
				{ alert(SM.TEXT['preformat-researches-nomodule']); break; }

			var researches = [];
			popup.style.display = 'block';
			SM.addNewEl('h3', popup, null, SM.TEXT['preformat-researches++-title']);
			var table = SM.addNewEl('table', popup);
			var h = SM.addNewEl('thead', table);
			SM.addNewEl('td', h, null, SM.TEXT['preformat-researches++-share']); //Partager ?
			SM.addNewEl('td', h, null, SM.TEXT['preformat-researches++-name']); //Nom
			SM.addNewEl('td', h, null, SM.TEXT['preformat-researches++-progress']); //Progression
			SM.addNewEl('td', h, null, SM.TEXT['preformat-researches++-important']); //Prioritaire ?
			SM.addNewEl('td', h, null, SM.TEXT['preformat-researches++-relay']); //Relais nécessaire ?
			var cards = document.getElementsByClassName('cdProjCard');
			for (var i = 0; i < cards.length; i++)
			{
				var name = cards[i].firstElementChild.textContent.trim();
				var progress = SM.sel('[data-p="' + cards[i].getAttribute('data-p') + '"] #p').textContent.trim();
				var l = SM.addNewEl('tr', table, null, null, { class: 'SMresearch' });
				SM.addNewEl('td', l, null, '<input type="checkbox" checked="true" />').className = 'SMcenter';
				SM.addNewEl('td', l, null, name);
				SM.addNewEl('td', l, null, progress);
				SM.addNewEl('td', l, null, '<input type="checkbox" />').className = 'SMcenter';
				SM.addNewEl('td', l, null, '<input type="checkbox" />').className = 'SMcenter';
			}

			//Création du message
			SM.addButton(popup, SM.TEXT['preformat-researches++-submit']).addEventListener('click', function() {
				message += ":pills: **//" + SM.TEXT['preformat-researches-title'] + " //**:pills:\n\n\n\n";
				var researches = document.getElementsByClassName('SMresearch');
				for (var i = 0; i < researches.length; i++)
				{
					var children = researches[i].children;
					if (children[0].firstChild.checked) //À partager
					{
						message += '**' + children[1].textContent + ' :** ';
						message += children[2].textContent;
						if (children[3].firstChild.checked) //Prioritaire
							{ message += ", **//" + SM.TEXT['preformat-researches++-text_important'] + "//**"; }
						if (children[4].firstChild.checked) //À relayer
							{ message += ", //" + SM.TEXT['preformat-researches++-text_relay'] + "//"; }
						message += ".\n";
					}
					SM.sel('#SMpopup').style.display = 'none';
				}
				wallpost.value = message;
				SM.refreshPreview();
			});
			break;

		case 'projects':
			if (!/img\/cards\/projects/.test(SM.sel('#cdModuleContent').innerHTML)) //Pas d'ID spécifique au Cœur de NERON :(
				{ alert(SM.TEXT['preformat-projects-nomodule']); break; }

			message += ":pa_core: **//" + SM.TEXT['preformat-projects-title'] + " //**:pa_core:\n\n\n\n";
			var cards = document.getElementsByClassName('cdProjCard');
			for (var i = 0; i < cards.length; i++)
			{
				message += "**" + cards[i].firstElementChild.textContent.trim() + " :** ";
				message += SM.sel('[data-p="' + cards[i].getAttribute('data-p') + '"] .desc').textContent.trim() + "\n";
			}

			wallpost.value = message;
			SM.refreshPreview();
			break;

		case 'planet':
			if (!SM.sel('#navModule'))
				{ alert(SM.TEXT['preformat-planet-nomodule']); break; }

			var planets = document.querySelectorAll('[class="planet"]');
			switch (planets.length)
			{
				case 0:
					alert(SM.TEXT['preformat-planet-none']);
					break;

				case 1:
					wallpost.value = SM.preformatPlanet(planets[0]);
					SM.refreshPreview();
					break;

				case 2:
					popup.style.display = 'block';
					popup.style.top = '200px';
					SM.addNewEl('h3', popup, null, SM.TEXT['preformat-planet-title']);
					SM.addButton(popup, planets[0].firstElementChild.textContent).addEventListener('click', function() {
						message += SM.preformatPlanet(planets[0]);
						SM.sel('#tid_wallPost').value = message;
						SM.refreshPreview();
						SM.sel('#SMpopup').style.display = 'none';
						SM.sel('#SMpopup').style.top = '100px';
					}); //Première planète
					SM.addButton(popup, planets[1].firstElementChild.textContent).addEventListener('click', function() {
						message += SM.preformatPlanet(planets[1]);
						SM.sel('#tid_wallPost').value = message;
						SM.refreshPreview();
						SM.sel('#SMpopup').style.display = 'none';
						SM.sel('#SMpopup').style.top = '100px';
					}); //Seconde planète
					SM.addButton(popup, SM.TEXT['preformat-planet-both']).addEventListener('click', function() {
						message += SM.preformatPlanet(planets[0]) + "\n\n\n\n" + SM.preformatPlanet(planets[1]);
						SM.sel('#tid_wallPost').value = message;
						SM.refreshPreview();
						SM.sel('#SMpopup').style.display = 'none';
						SM.sel('#SMpopup').style.top = '100px';
					}); //Les deux planètes
					break;
			}
			break;

		case 'comms':
			if (!SM.sel('#trackerModule'))
				{ alert(SM.TEXT['preformat-comms-nomodule']); break; }

			message += ":com: " + SM.TEXT['preformat-comms-title'] + ":com:\n\n\n\n";

			//Qualité du signal
			message += SM.TEXT['preformat-comms-signal'] + SM.sel('#trackerModule .sensors p:first-of-type em').textContent.match(/[0-9]+\s*%/)[0] + "\n";

			//Xyloph
			message += SM.TEXT['preformat-comms-Xyloph'];
			var dbs = SM.toArray(document.querySelectorAll('#trackerModule .perfor li:not(.undone)'));
			if (dbs.length)
			{
				message += dbs.length + "/12\n";
				var writedesc = confirm(SM.TEXT['preformat-comms-Xylophdesc']);
				for (var i = 0; i < dbs.length; i++)
				{
					var text = SM.reformat(SM.getTipContent(dbs[i].onmouseover));
					if (writedesc)
					{
						var desc = " : //" + text.match(/<p><strong>(.*)<\/strong><\/p>/)[1] + "//";
						desc = SM.reformat(desc.replace(/<img(?:.*)alt=['"]([a-zA-Z]*)['"](?:.*)\/?>/g, "$1").replace(/<strong>(.*)<\/strong>/g, "$1"));
					}
					else
						{ var desc = ""; }
					message += "- " + text.match(/<h1>(.*)<\/h1>/)[1] + desc + "\n";
				}
			}
			else
				{ message += SM.TEXT['preformat-comms-Xylophnone'] + "\n"; }

			//Bases rebelles
			message += SM.TEXT['preformat-comms-bases'];
			var bases = SM.toArray(document.querySelectorAll('#trackerModule .bases [data-id]')).reverse();
			var anysignal = false;
			var writedesc = confirm(SM.TEXT['preformat-comms-basesdesc']);
			for (var i = 0; i < bases.length; i++)
			{
				var id = bases[i].getAttribute('data-id');
				var span = SM.sel('#trackerModule [data-id="' + id + '"] span');
				var decoded = ((SM.sel('#trackerModule [data-id="' + id + '"] h3').textContent.trim() != "???") ? true : false);
				var name = id.toLowerCase().replace(/_/, "-").replace(/\b\w/g, function (l) { return l.toUpperCase(); });
				if (!span && !decoded)
					{ continue; } //Signal pas encore envoyé
				if (!anysignal)
				{
					message += "\n";
					anysignal = true;
				}

				message += "- //" + name + " (" + SM.TEXT['abbr-day'] + (i + 2) + ") : //"; //Nom de la base
				if (decoded) //Décodée
				{
					var text = SM.reformat(SM.getTipContent(bases[i].onmouseover));
					if (writedesc)
					{
						var desc = ", //" + text.match(/<li>(.*)<\/li>/)[1] + "//";
						desc = SM.reformat(desc.replace(/<img(?:.*)alt=['"]([a-zA-Z]*)['"](?:.*)\/?>/g, "$1").replace(/<strong>(.*)<\/strong>/g, "$1"));
					}
					else
						{ var desc = ""; }
					message += SM.TEXT['preformat-comms-basedecoded'] + desc + "\n";
				}
				else
				{
					if (span.className == 'percent') //En décodage
						{ message += span.textContent.trim() + "\n"; }
					else //Perdue
						{ message += SM.TEXT['preformat-comms-baselost'] + "\n"; }
				}
			}
			if (!anysignal) //Aucun signal pour le moment
				{ message += SM.TEXT['preformat-comms-basesnone'] + "\n"; }

			//MAJ NERON
			message += SM.TEXT['preformat-comms-neron'] + SM.sel('#trackerModule .neron h2').textContent.match(/[0-9]+\.[0-9]+/)[0] + "\n\n\n\n//Over.//";

			wallpost.value = message;
			SM.refreshPreview();
			break;
	}

	SM.sel('#SMpremessages').selectedIndex = 0;
};


SM.preformatPlanet = function(planet) {
	var name = planet.firstElementChild.textContent;
	var zones = planet.lastElementChild.firstElementChild.innerHTML.match(/<h1>(.*)<\/h1>/g);
	var unknown = 0;

	//Détection orbite ou espace infini
	if (SM.sel('.planet .pllist').firstElementChild.firstChild.tagName == 'IMG') //En orbite
		{ var mess = SM.TEXT['preformat-planet-orbiting'] + " **" + name + " :** "; }
	else //Dans l'espace infini, donc fuel et direction nécessaires
	{
		var direction = planet.children[2].children[1].children[0].innerHTML.replace(/<span>(?:.*)<\/span>/, '').trim();
		var fuel = planet.children[2].children[1].children[1].innerHTML.replace(/<span>(?:.*)<\/span>/, '').trim();
		var mess = "**" + name + " :** //" + direction + "//, " + fuel + " :fuel: ; ";
	}

	//Regroupement des zones identiques
	for (var i = 0; i < zones.length; i++)
	{
		var zone = zones[i].slice(4, -5);
		if (zone == '???')
			{ unknown += 1; }
		else
			{ mess += zone + ', '; }
	}
	if (unknown)
		{ mess += "//" + unknown + " " + SM.TEXT['preformat-planet-unknown'] + '//, '; }
	mess = mess.slice(0, -2) + '.';

	return mess;
};



/* FONCTION DE LOCALISATION */

SM.locale = function(func) {
	SM.TEXT = {};
	var lang = parseInt(SM.parameters['locale']);
	if (typeof func == 'undefined')
		{ var func = function() { var x; }; }

	//Doit rester indépendant de la locale choisie puisqu'en interaction avec la page elle-même
	//.alertroom : certaines pièces (ex. Jardin) sont mal écrites dans les rapports d'alerte
	switch (document.domain)
	{
		case 'mush.vg':
			SM.rooms = ['Pont', 'Baie Alpha', 'Baie Beta', 'Baie Alpha 2', 'Nexus', 'Infirmerie', 'Laboratoire', 'Réfectoire', 'Jardin Hydroponique', 'Salle des moteurs', 'Tourelle Alpha avant', 'Tourelle Alpha centre', 'Tourelle Alpha arrière', 'Tourelle Beta avant', 'Tourelle Beta centre', 'Tourelle Beta arrière', 'Patrouilleur Longane', 'Patrouilleur Jujube', 'Patrouilleur Tamarin', 'Patrouilleur Socrate', 'Patrouilleur Epicure', 'Patrouilleur Platon', 'Patrouilleur Wallis', 'Pasiphae', 'Couloir avant', 'Couloir central', 'Couloir arrière', 'Planète', 'Baie Icarus', 'Dortoir Alpha', 'Dortoir Beta', 'Stockage Avant', 'Stockage Alpha centre', 'Stockage Alpha arrière', 'Stockage Beta centre', 'Stockage Beta arrière', 'Espace infini', 'Les Limbes'];
			SM.alertrooms = SM.toArray(SM.rooms);
			SM.alertrooms[8] = 'Jardin Hydoponique'; //hydRo
			SM.alertrooms[28] = 'Icarus'; //Pas de Baie
			break;

		case 'mush.twinoid.es':
			SM.rooms = ['Puente de mando', 'Plataforma Alpha', 'Plataforma Beta', 'Plataforma Alpha 2', 'Nexus', 'Enfermería', 'Laboratorio', 'Comedor', 'Jardín Hidropónico', 'Sala de motores', 'Cañón Alpha delantero', 'Cañón Alpha central', 'Cañón Alpha trasero', 'Cañón Beta delantero', 'Cañón Beta central', 'Cañón Beta trasero', 'Patrullero Longane', 'Patrullero Jujube', 'Patrullero Tamarindo', 'Patrullero Sócrates', 'Patrullero Epicuro', 'Patrullero Platón', 'Patrullero Wallis', 'Pasiphae', 'Pasillo delantero', 'Pasillo central', 'Pasillo trasero', 'Planeta', 'Icarus', 'Dormitorio Alpha', 'Dormitorio Beta', 'Almacén delantero', 'Almacén Alpha central', 'Almacén Alpha trasero', 'Almacén Beta central', 'Almacén Beta trasero', 'Espacio infinito', 'El limbo'];
			SM.alertrooms = SM.toArray(SM.rooms);
			break;

		default:
			SM.rooms = ['Bridge', 'Alpha Bay', 'Bravo Bay', 'Alpha Bay 2', 'Nexus', 'Medlab', 'Laboratory', 'Refectory', 'Hydroponic Garden', 'Engine Room', 'Front Alpha Turret', 'Centre Alpha Turret', 'Rear Alpha Turret', 'Front Bravo Turret', 'Centre Bravo Turret', 'Rear Bravo Turret', 'Patrol Ship Tomorrowland', 'Patrol Ship Olive Grove', 'Patrol Ship Yasmin', 'Patrol Ship Wolf', 'Patrol Ship E-Street', 'Patrol Ship Eponine', 'Patrol Ship Carpe Diem', 'Pasiphae', 'Front Corridor', 'Central Corridor', 'Rear Corridor', 'Planet', 'Icarus Bay', 'Alpha Dorm', 'Bravo Dorm', 'Front Storage', 'Centre Alpha Storage', 'Rear Alpha Storage', 'Centre Bravo Storage', 'Rear Bravo Storage', 'Outer Space', 'Limbo'];
			SM.alertrooms = SM.toArray(SM.rooms);
	}

	switch (lang)
	{
		case 1: //Français
		SM.TEXT['stats_perso'] = "<b>Vos statistiques actuelles :</b> "; //Espace
		SM.TEXT['AP-general'] = "point(s) d'action";
		SM.TEXT['AP-eng'] = "point(s) de mécanique";
		SM.TEXT['AP-garden'] = "point(s) de jardinage";
		SM.TEXT['AP-neron'] = "point(s) de Nexus";
		SM.TEXT['AP-comp'] = "point(s) d'informatique";
		SM.TEXT['AP-heal'] = "point(s) de soin";
		SM.TEXT['AP-pilgred'] = "point(s) de PILGRED";
		SM.TEXT['AP-shoot'] = "point(s) de tir";
		SM.TEXT['AP-cook'] = "point(s) de cuisine";
		SM.TEXT['AP-klix'] = "Klix";
		SM.TEXT['hide_alert_reports'] = "Cacher les rapports";
		SM.TEXT['show_alert_reports'] = "Lister les rapports";
		SM.TEXT['unvalid_move'] = "Cette porte est cassée, vous ne pouvez pas vous déplacer !";
		SM.TEXT['move_confirm'] = "Voulez-vous vous déplacer vers "; //Espace
		SM.TEXT['move_alert'] = "ATTENTION : il semble très probable que vous ne puissiez pas vous déplacer actuellement. Si c'est le cas, un message d'erreur peut s'afficher. Continuer ?";
		SM.TEXT['move_guardian'] = "ATTENTION : quelqu'un garde cette pièce. À moins que vous ne soyez Fuyant, un message d'erreur peut s'afficher si vous vous dirigez vers la mauvaise pièce. Continuer ?";
		SM.TEXT['current_room'] = "Vous êtes en : "; //Espace
		SM.TEXT['move_button'] = "Se déplacer vers :";
		SM.TEXT['broken_door'] = " — CASSÉE";
		SM.TEXT['door_to'] = "Porte → "; //Espace
		SM.TEXT['SMparams-title'] = "Paramètres de Small(Mush)";
		SM.TEXT['SMparams-confirm_action'] = "Confirmer les actions";
		SM.TEXT['SMparams-food_desc'] = "Afficher les effets des aliments sous l'inventaire";
		SM.TEXT['SMparams-forced_locale'] = "Forcer la langue de Small(Mush)";
		SM.TEXT['SMparams-lang_title'] = "Langue de l'interface Small(Mush) :";
		SM.TEXT['SMparams-chat_unload'] = "Délester le chat";
		SM.TEXT['SMparams-chat_unload_tip'] = "<div class='tiptop'><div class='tipbottom'><div class='tipbg'><div class='tipcontent'><h1>Délester le chat</h1>Le canal général sera rendu plus léger au rechargement.</div></div></div></div>";
		SM.TEXT['SMparams-chat_unload_reload'] = "Rechargement total imminent !<br />(Désolé…)<br />Veuillez attacher vos ceintures.";
		SM.TEXT['SMparams-credits'] = "Script codé par <a href='http://twinoid.com/user/8412516' target='_blank'>LAbare</a>. <span onclick='SM.showLicense();'>Licence MIT.</span>";
		SM.TEXT['SMparams-credits_beta'] = "<img src='/img/icons/ui/likemush.gif' /> Merci aux beta-testeurs :<br /><a href='http://twinoid.com/user/8412516' target='_blank'>LAbare</a> (bah ouais)<br /><a href='http://twinoid.com/user/2718866' target='_blank'>Heimdall</a>, que personne ni Windows n'aime<br /><a href='http://twinoid.com/user/1729323' target='_blank'>Breith</a> le poney de l'Apocalypse<br /><a href='http://twinoid.com/user/6541022' target='_blank'>lucasmore</a> le paumé de l'espace<br /><a href='http://twinoid.com/user/6207430' target='_blank'>Hyomin</a> l'Augure stalker<br /><a href='http://twinoid.com/user/20309' target='_blank'>Guilherande</a>, la plus beta des testeuses<br /><a href='http://twinoid.com/user/1244143' target='_blank'>badconker</a>, dont vient le délestage du chat<br /><a href='http://twinoid.com/user/839307' target='_blank'>Contry</a> la pas bavarde<br /><a href='http://twinoid.com/user/110901' target='_blank'>Bronu</a>, rentré sur Sol en plein milieu de la beta";
		SM.TEXT['confirm_action'] = "Voulez-vous effectuer l'action '";
		SM.TEXT['tabs-char'] = "Perso";
		SM.TEXT['tabs-ship'] = "Général";
		SM.TEXT['tabs-room'] = "Pièce";
		SM.TEXT['tabs-chat'] = "Chat";
		SM.TEXT['tabs-game'] = "Module";
		SM.TEXT['tabs-shop'] = "Achats";
		SM.TEXT['SM-added_tab'] = "<img src='" + SM.src + "ico.png' /> <b>Attention :</b> Onglet Small(Mush) <img src='" + SM.src + "ico.png' />";
		SM.TEXT['SM-added_tab_text'] = "Cet onglet est un ajout du script Small(Mush). Si un bug venait à se produire ici, il ne pourrait s'agir que d'un bug de <em>script</em> : il ne faudrait alors en avertir que son auteur.";
		SM.TEXT['plasma_onmouseover'] = "<div class='tiptop'><div class='tipbottom'><div class='tipbg'><div class='tipcontent'><h1>Bouclier plasma</h1>Le bouclier plasma est activé.</div></div></div></div>";
		SM.TEXT['cards_title'] = "Projets et recherches :";
		SM.TEXT['roomtab_focused'] = "Vous êtes Concentré sur un terminal, ce qui signifie que vous ne voyez pas ce qu'il y a autour de vous. Quittez le terminal pour voir la pièce. (Si vous n'arrivez pas à vous débarrasser du statut Concentré, accédez au distributeur puis quittez-le.)";
		SM.TEXT['fire'] = "La pièce est dévorée par les flammes. Faites quelque chose !";
		SM.TEXT['equipments'] = "Équipements";
		SM.TEXT['broken'] = " — CASSÉ";
		SM.TEXT['reac_b'] = "Réacteur latéral gauche"; //B = gauche
		SM.TEXT['reac_a'] = "Réacteur latéral droit";
		SM.TEXT['ROTATIONAL_REACTOR_unknown'] = "Réacteur latéral inconnu";
		SM.TEXT['bed_a_a'] = "Lit Alpha 1";
		SM.TEXT['bed_a_b'] = "Lit Alpha 2";
		SM.TEXT['bed_a_c'] = "Lit Alpha 3";
		SM.TEXT['bed_b_a'] = "Lit Beta 1";
		SM.TEXT['bed_b_b'] = "Lit Beta 2";
		SM.TEXT['bed_b_c'] = "Lit Beta 3";
		SM.TEXT['sick_couch'] = "Lit Infirmerie";
		SM.TEXT['BED_unknown'] = "Lit inconnu";
		SM.TEXT['PATROL_SHIP_A_0'] = "Patrouilleur Longane";
		SM.TEXT['PATROL_SHIP_A_1'] = "Patrouilleur Jujube";
		SM.TEXT['PATROL_SHIP_A_2'] = "Patrouilleur Tamarin";
		SM.TEXT['PATROL_SHIP_B_0'] = "Patrouilleur Socrate";
		SM.TEXT['PATROL_SHIP_B_1'] = "Patrouilleur Épicure";
		SM.TEXT['PATROL_SHIP_B_2'] = "Patrouilleur Platon";
		SM.TEXT['PATROL_SHIP_AA_0'] = "Patrouilleur Wallis";
		SM.TEXT['PATROL_SHIP_AA_1'] = "Pasiphae";
		SM.TEXT['PATROL_INTERFACE_unknown'] = "Patrouilleur inconnu";
		SM.TEXT['warning-title'] = "Small(Mush) — chargé";
		SM.TEXT['warning-1'] = "<strong>ATTENTION :</strong> ce script adapte l'interface de Mush. Si vous rencontrez un bug en jeu, <em>reproduisez le bug sur ordinateur</em> afin de vérifier que c'est bien le jeu, et non pas ce script, qui est en cause. Ne reportez sur les forums que les bugs <em>reproduits en jeu sur ordinateur sans script</em>.";
		SM.TEXT['warning-2'] = "Si vous rencontrez un bug à cause du script, contactez son auteur à partir des paramètres. Ni l'auteur ni le script ne sont affiliés à Motion Twin et ne sauraient être responsables d'un quelconque problème (bien que le script a été codé et testé de manière à ne pas générer de bug pouvant influer sur le jeu lui-même).";
		SM.TEXT['warning-3'] = "Bon jeu !";
		SM.TEXT['license'] = "<h4><img src='" + SM.src + "ico.png' /> Small(Mush) : Licence MIT</h4><p>Copyright © 2015 LAbare</p><p>L'autorisation est accordée, gracieusement, à toute personne acquérant une copie de ce script et des fichiers de documentation associés (le « Script »), de commercialiser le Script sans restriction, notamment les droits d'utiliser, de copier, de modifier, de fusionner, de publier, de distribuer, de sous-licencier et/ou de vendre des copies du Script, ainsi que d'autoriser les personnes auxquelles le Script est fourni à le faire, sous réserve des conditions suivantes :</p><p>La déclaration de copyright ci-dessus et la présente autorisation doivent être incluses dans toute copie ou partie substantielle du Script.</p><p>Le Script est fourni « tel quel », sans garantie d'aucune sorte, explicite ou implicite, notamment sans garantie de qualité marchande, d’adéquation à un usage particulier et d'absence de contrefaçon. En aucun cas les auteurs ou titulaires du droit d'auteur ne seront responsables de tout dommage, réclamation ou autre responsabilité, que ce soit dans le cadre d'un contrat, d'un délit ou autre, en provenance de, consécutif à ou en relation avec le Script ou son utilisation, ou avec d'autres éléments du Script. Bref, si ça casse, c'est pas ma faute. Mais ça va pas casser, normalement. À peine. Moi, j'y crois.</p>";
		SM.TEXT['help_screen-A'] = "Cliquez pour afficher une infobulle.<br />Aucune action ne sera faite.";
		SM.TEXT['help_screen-B'] = "Cliquez pour cacher l'infobulle.";
		SM.TEXT['show_inventory'] = "Afficher l'inventaire";
		SM.TEXT['show_flash_inventory'] = "DEBUG : Afficher l'inventaire Flash";
		SM.TEXT['editor-tip'] = "<div class='tiptop'><div class='tipbottom'><div class='tipbg'><div class='tipcontent'><h1>Éditeur de messages Small(Mush)</h1><p>Facilite la mise en forme des messages et permet leur prévisualisation.</p></div></div></div></div>";
		SM.TEXT['editor-tags_warning'] = "<span class='buddy'>Attention :</span> ces balises ne fonctionnent que sur les <em>canaux privés</em> ; sur le canal public, seuls fonctionnent le <strong>gras</strong> et l'<em>italique</em>.";
		SM.TEXT['editor-mush_smileys'] = "Smileys Mush";
		SM.TEXT['paste'] = "Coller";
		SM.TEXT['preview-refresh'] = "Rafraîchir";
		SM.TEXT['preview-erase'] = "Effacer";
		SM.TEXT['preview-confirm_erase'] = "Voulez-vous vraiment effacer votre message ?";
		SM.TEXT['preview-save'] = "Sauvegarder";
		SM.TEXT['preview-copy'] = "Copier";
		SM.TEXT['preview-retrieve'] = "Recharger le message sauvegardé";
		SM.TEXT['premessages-title'] = "Messages préformatés :";
		SM.TEXT['premessages-NULL'] = "Aucun";
		SM.TEXT['premessages-inventory'] = "Partager l'inventaire";
		SM.TEXT['premessages-researches'] = "Lister les recherches";
		SM.TEXT['premessages-researches++'] = "Lister les recherches (mode avancé)";
		SM.TEXT['premessages-projects'] = "Lister les projets";
		SM.TEXT['premessages-planet'] = "Partager une planète";
		SM.TEXT['premessages-comms'] = "Partager l'avancement des communications";
		SM.TEXT['message-overwrite_retrieve'] = "Attention : ceci va effacer votre message actuel. Continuer ?";
		SM.TEXT['message-overwrite_build'] = "Voulez-vous effacer le message actuel (Annuler) ou écrire à sa suite (OK) ?";
		SM.TEXT['preformat-researches-nomodule'] = "Veuillez accéder au laboratoire pour activer cette fonction.";
		SM.TEXT['preformat-researches-title'] = "Recherches :";
		SM.TEXT['preformat-researches++-title'] = "<img src='" + SM.src + "ico.png' /> Recherches préformatées — mode avancé";
		SM.TEXT['preformat-researches++-share'] = "Lister";
		SM.TEXT['preformat-researches++-name'] = "Nom";
		SM.TEXT['preformat-researches++-progress'] = "%";
		SM.TEXT['preformat-researches++-important'] = "Important ?";
		SM.TEXT['preformat-researches++-relay'] = "Relais ?";
		SM.TEXT['preformat-researches++-submit'] = "Lister les recherches";
		SM.TEXT['preformat-researches++-text_important'] = "prioritaire";
		SM.TEXT['preformat-researches++-text_relay'] = "besoin d'un relais";
		SM.TEXT['preformat-inventory-HELP_DRONE'] = "Drone";
		SM.TEXT['preformat-inventory-CAMERA'] = "Caméra";
		SM.TEXT['preformat-inventory-thirsty'] = "assoiffé";
		SM.TEXT['preformat-inventory-dry'] = "desséché";
		SM.TEXT['preformat-inventory-diseased'] = "malade";
		SM.TEXT['preformat-inventory-broken'] = "cassé";
		SM.TEXT['preformat-inventory-charge'] = "charge(s)";
		SM.TEXT['preformat-planet-none'] = "Vous n'avez pas scanné de planète.";
		SM.TEXT['preformat-planet-title'] = "Choisissez une planète :";
		SM.TEXT['preformat-planet-nomodule'] = "Veuillez accéder au Terminal Astro pour activer cette fonction.";
		SM.TEXT['preformat-planet-both'] = "Partager les deux";
		SM.TEXT['preformat-planet-orbiting'] = "En orbite de la planète";
		SM.TEXT['preformat-planet-unknown'] = "zone(s) inconnue(s)";
		SM.TEXT['preformat-projects-nomodule'] = "Veuillez accéder au Cœur de NERON pour activer cette fonction.";
		SM.TEXT['preformat-projects-title'] = "Nouveaux projets :";
		SM.TEXT['preformat-comms-nomodule'] = "Veuillez accéder au Centre de communications pour activer cette fonction.";
		SM.TEXT['preformat-comms-title'] = "**//Avancement des communications : //**";
		SM.TEXT['preformat-comms-signal'] = "**Qualité du signal :** "; //Espace
		SM.TEXT['preformat-comms-Xyloph'] = "**Données Xyloph décodées :** "; //Espace
		SM.TEXT['preformat-comms-Xylophnone'] = "aucune";
		SM.TEXT['preformat-comms-Xylophdesc'] = "Voulez-vous inclure la description des données Xyloph ?";
		SM.TEXT['preformat-comms-bases'] = "**Décodage des bases rebelles :** "; //Espace
		SM.TEXT['preformat-comms-basedecoded'] = "décodée";
		SM.TEXT['preformat-comms-baselost'] = "signal perdu";
		SM.TEXT['preformat-comms-basesdesc'] = "Voulez-vous inclure la description des bases décodées ?";
		SM.TEXT['preformat-comms-basesnone'] = "aucune";
		SM.TEXT['preformat-comms-neron'] = "**Version de NERON :** "; //Espace
		SM.TEXT['abbr-day'] = "J";
		SM.TEXT['minimap-button'] = "Afficher la minimap Small(Mush)";
		SM.TEXT['minimap-title'] = "Minimap Small(Mush)";
		SM.TEXT['minimap-warning'] = "<b>ATTENTION :</b> cette minimap n'est pas celle du jeu Flash ; elle ne sert que de repère avec quelques indications. Il se peut que certaines avaries signalées n'y apparaissent pas.";
		SM.TEXT['minimap-legend'] = "<b>Légende :</b><br /><span class='SMmapfire SMlegend'>Incendie signalé</span><br /><span class='SMmapalertd SMlegend'>Portes signalées</span><br /><span class='SMmapalerte SMlegend'>Équipements signalés</span><br /><span class='SMmyroom SMlegend'>Vous êtes ici !</span>";
		SM.TEXT['minimap-room'] = "Vous avez sélectionné : <b><span id='SMminimaproom'>rien</span></b>.";
		SM.TEXT['tabtip-chartab'] = "<h1>Onglet Personnage</h1>Cet onglet contient toutes les informations sur votre personnage.";
		SM.TEXT['tabtip-shiptab'] = "<h1>Onglet Vaisseau</h1>Cet onglet contient les informations relatives à l'état et l'avancement du vaisseau : alertes, expédition, projets et recherches terminés.";
		SM.TEXT['tabtip-roomtab'] = "<h1>Onglet Pièce</h1>Cet onglet contient toutes les informations disponibles sur la pièce dans laquelle vous êtes.";
		SM.TEXT['tabtip-chattab'] = "<h1>Onglet Chat</h1>Cet onglet comprend le chat et les logs et l'éditeur de messages Small(Mush).";
		SM.TEXT['tabtip-gametab'] = "<h1>Onglet Module/Flash</h1>Cet onglet contient le jeu Flash et les terminaux auxquels vous accédez, ainsi que la minimap Small(Mush).";
		SM.TEXT['tabtip-shoptab'] = "<h1>Onglet Distributeur</h1>Cet onglet vous permet d'accéder au distributeur.";
		SM.TEXT['buttontip-reload'] = "<h1>Rafraîchir</h1>Rafraîchit le jeu pour les actions courantes.";
		SM.TEXT['buttontip-help'] = "<h1>Aide</h1>Affiche les infobulles (dont certaines récalcitrantes sur mobile) ainsi que de l'aide pour les éléments ajoutés par le script Small(Mush).";
		SM.TEXT['chat_bug'] = "Vous êtes sur le canal "; //Espace
		SM.TEXT['chat_bug-local'] = "des logs.";
		SM.TEXT['chat_bug-mush'] = "Mush.";
		SM.TEXT['chat_bug-obj'] = "des objectifs.";
		SM.TEXT['chat_bug-wall'] = "principal.";
		SM.TEXT['chat_bug-fav'] = "des favoris.";
		SM.TEXT['chat_bug-p'] = "privé n°";
		SM.TEXT['chat_bug-'] = "INCONNU";
		SM.TEXT['copy_logs-button'] = "Logs au format texte";
		
		SM.loadingTexts = ["Photobirouillage des métaplores…", "Tir aux poulets intergalactiques…", "Test chat / micro-ondes…", "Recherche de Charlie…", "Tournée d'arrays de bool…", "Rechargement des blasters à la confiture de queues de cerises…", "Détraquage du distributeur…", "Résolution du Mad Kube…", "Bidulage des trucs…", "Redémarrage du lutin des annonces vocodées…", "Localisation des drones…", "Schématisation des Terminatransistors du PILGRED…", "Manœuvre d'évitement mouette / réacteur…", "Vidange des réservoirs d'oxygène…", "Décapitation des inactifs…", "Fortification du Jardin hydroponique…", "Surchauffe des modules persos…", "Détartrage du matou…", "Cueillette des champignons…", "Accélération du rythme de pédalage des bisounours dans le PILGRED…", "Destruction des denrées non périssables. Vous aviez faim ?…", "Engraissement d'Hua en cours…", "Augmentation de l’énervement des Mankarogs…", "Localisation du chat en cours… Erreur.", "Cavalier en Baie Alpha. Échec et mat.", "Nodocéphales détectés. Élimination par capillotractage enclenchée…", "[HAAaXX] Grésillage du trolley. Cause probable : remplissage du gazomètre.", "Extinction des consignes lumineuses. Décodage en cours…", "Dépoussiérage des capsules de cryogénisation…", "Mise en place des saucisses sur le moteur latéral gauche…", "Recycleur d'excréments enclenché. Préparation des rations en cours…", "Boulon, feuille, ciseau ! NERON perdu. Simulateur de gravité intact.", "Arroseurs automatiques : soirée mousse enclenchée.", "Rupture de café : remplacement par dosettes de cyanure validé.", "Drone armé terminé. Libération en cours… [HAX]", "Apparition d'asperges holographiques dans le réfectoire… [Terminé]", "Rotation de LAbare de navigation…", "Schrödinger mort. Cause : l'électron a pris le mauvais chemin…", "Aaah, la bonne odeur de viande neuro-cryptique…", "Tu manqueras à personne, sale mutant !", "Inactifs détectés en couloir. Achat de boules de bowling SNC…"];
		
		SM.localerooms = ['Pont', 'Baie Alpha', 'Baie Beta', 'Baie Alpha 2', 'Nexus', 'Infirmerie', 'Laboratoire', 'Réfectoire', 'Jardin Hydroponique', 'Salle des moteurs', 'Tourelle Alpha avant', 'Tourelle Alpha centre', 'Tourelle Alpha arrière', 'Tourelle Beta avant', 'Tourelle Beta centre', 'Tourelle Beta arrière', 'Patrouilleur Longane', 'Patrouilleur Jujube', 'Patrouilleur Tamarin', 'Patrouilleur Socrate', 'Patrouilleur Epicure', 'Patrouilleur Platon', 'Patrouilleur Wallis', 'Pasiphae', 'Couloir avant', 'Couloir central', 'Couloir arrière', 'Planète', 'Baie Icarus', 'Dortoir Alpha', 'Dortoir Beta', 'Stockage Avant', 'Stockage Alpha centre', 'Stockage Alpha arrière', 'Stockage Beta centre', 'Stockage Beta arrière', 'Espace infini', 'Les Limbes'];
		
		SM.INTERR = " ?";
		break;

		case 2: //Anglais
		SM.TEXT['stats_perso'] = "<b>Your current statistics:</b> ";
		SM.TEXT['AP-general'] = "action point(s)";
		SM.TEXT['AP-eng'] = "tech point(s)";
		SM.TEXT['AP-garden'] = "gardening point(s)";
		SM.TEXT['AP-neron'] = "NERON projects point(s)";
		SM.TEXT['AP-comp'] = "IT point(s)";
		SM.TEXT['AP-heal'] = "healing point(s)";
		SM.TEXT['AP-pilgred'] = "PILGRED point(s)";
		SM.TEXT['AP-shoot'] = "shooting point(s)";
		SM.TEXT['AP-cook'] = "cooking point(s)";
		SM.TEXT['AP-klix'] = "Klix";
		SM.TEXT['hide_alert_reports'] = "Hide reports";
		SM.TEXT['show_alert_reports'] = "Show reports";
		SM.TEXT['unvalid_move'] = "This door is broken, you cannot move there!";
		SM.TEXT['move_confirm'] = "Do you want to move to ";
		SM.TEXT['move_alert'] = "WARNING: it seems that you are not able to move at the moment. An error may display. Continue?";
		SM.TEXT['move_guardian'] = "WARNING: someone is guarding this room. Unless you're Sneaky, you shall only move to the room whence you came, else an error may display. Continue?";
		SM.TEXT['current_room'] = "You are in: ";
		SM.TEXT['move_button'] = "Move to:";
		SM.TEXT['broken_door'] = " — BROKEN";
		SM.TEXT['door_to'] = "Door → ";
		SM.TEXT['SMparams-title'] = "Small(Mush) parameters";
		SM.TEXT['SMparams-confirm_action'] = "Confirm actions";
		SM.TEXT['SMparams-food_desc'] = "Show consumables effects under inventory";
		SM.TEXT['SMparams-forced_locale'] = "Force Small(Mush) language";
		SM.TEXT['SMparams-lang_title'] = "Small(Mush) language:";
		SM.TEXT['SMparams-chat_unload'] = "Unload chat";
		SM.TEXT['SMparams-chat_unload_tip'] = "<div class='tiptop'><div class='tipbottom'><div class='tipbg'><div class='tipcontent'><h1>Unload chat</h1>The main channel will be lighter to reload.</div></div></div></div>";
		SM.TEXT['SMparams-chat_unload_reload'] = "Incoming hard reload!<br />(Sorry for that…)<br />Please fasten your seat belts.";
		SM.TEXT['SMparams-credits'] = "Script developed by <a href='http://twinoid.com/user/8412516' target='_blank'>LAbare</a>. <span onclick='SM.showLicense();'>MIT licensed.</span>";
		SM.TEXT['SMparams-credits_beta'] = "<img src='/img/icons/ui/likemush.gif' /> Thanks to the beta team:<br /><a href='http://twinoid.com/user/8412516' target='_blank'>LAbare</a> (yeah, why not?)<br /><a href='http://twinoid.com/user/2718866' target='_blank'>Heimdall</a>, rejected by everybody including Windows<br /><a href='http://twinoid.com/user/1729323' target='_blank'>Breith</a> the Apocalyptic pony<br /><a href='http://twinoid.com/user/6541022' target='_blank'>lucasmore</a>, lost in space<br /><a href='http://twinoid.com/user/6207430' target='_blank'>Hyomin</a> the creepy cutie<br /><a href='http://twinoid.com/user/20309' target='_blank'>Guilherande</a>, smart as her smartphone<br /><a href='http://twinoid.com/user/1244143' target='_blank'>badconker</a>, coder of the chat unloader<br /><a href='http://twinoid.com/user/839307' target='_blank'>Contry</a> the quiet<br /><a href='http://twinoid.com/user/110901' target='_blank'>Bronu</a>, who came back to Sol right in the middle of the beta";
		SM.TEXT['confirm_action'] = "Do you want to '";
		SM.TEXT['tabs-char'] = "Myself";
		SM.TEXT['tabs-ship'] = "Ship";
		SM.TEXT['tabs-room'] = "Room";
		SM.TEXT['tabs-chat'] = "Chat";
		SM.TEXT['tabs-game'] = "Module";
		SM.TEXT['tabs-shop'] = "Shop";
		SM.TEXT['SM-added_tab'] = "<img src='" + SM.src + "ico.png' /> <b>Warning:</b> Small(Mush) tab <img src='" + SM.src + "ico.png' />";
		SM.TEXT['SM-added_tab_text'] = "This tab is an addition of the Small(Mush) script. If a bug happens here, it would definitely be a <em>script bug</em> and should be reported only to the author of this script.";
		SM.TEXT['plasma_onmouseover'] = "<div class='tiptop'><div class='tipbottom'><div class='tipbg'><div class='tipcontent'><h1>Plasma shield</h1>The plasma shield is active.</div></div></div></div>";
		SM.TEXT['cards_title'] = "Projects and researches:";
		SM.TEXT['roomtab_focused'] = "You are currently Focused on a terminal, which means you cannot see what's in the room. The room will be displayed as soon as you exit your terminal. (If stuck with the Focused status, access then exit the vending machine to get rid of it.)";
		SM.TEXT['fire'] = "There is a fire in the room. Quick, grab an extinguisher!";
		SM.TEXT['equipments'] = "Equipments";
		SM.TEXT['broken'] = " — BROKEN";
		SM.TEXT['reac_b'] = "Left lateral reactor";
		SM.TEXT['reac_a'] = "Right lateral reactor";
		SM.TEXT['ROTATIONAL_REACTOR_unknown'] = "Unknown lateral reactor";
		SM.TEXT['bed_a_a'] = "Alpha bed 1";
		SM.TEXT['bed_a_b'] = "Alpha bed 2";
		SM.TEXT['bed_a_c'] = "Alpha bed 3";
		SM.TEXT['bed_b_a'] = "Bravo bed 1";
		SM.TEXT['bed_b_b'] = "Bravo bed 2";
		SM.TEXT['bed_b_c'] = "Bravo bed 3";
		SM.TEXT['sick_couch'] = "Medlab bed";
		SM.TEXT['BED_unknown'] = "Unknown bed";
		SM.TEXT['PATROL_SHIP_A_0'] = "Patrol ship Tomorrowland";
		SM.TEXT['PATROL_SHIP_A_1'] = "Patrol ship Olive Grove";
		SM.TEXT['PATROL_SHIP_A_2'] = "Patrol ship Yasmin";
		SM.TEXT['PATROL_SHIP_B_0'] = "Patrol ship Wolf";
		SM.TEXT['PATROL_SHIP_B_1'] = "Patrol ship E-Street";
		SM.TEXT['PATROL_SHIP_B_2'] = "Patrol ship Eponine";
		SM.TEXT['PATROL_SHIP_AA_0'] = "Patrol ship Carpe Diem";
		SM.TEXT['PATROL_SHIP_AA_1'] = "Pasiphae";
		SM.TEXT['PATROL_INTERFACE_unknown'] = "Unknown patrol ship";
		SM.TEXT['warning-title'] = "Small(Mush) — loaded";
		SM.TEXT['warning-1'] = "<strong>WARNING:</strong> this script reshapes the game's interface. In case of an unfortunate bug, <em>reproduce it on a computer</em> to make sure that it is an in-game bug, and not a script bug. Only warn the forums in case of a <em>computer-reproduced in-game bug in a scriptless browser</em>.";
		SM.TEXT['warning-2'] = "In case of a script bug, contact its author from the parameters menu. Neither the author nor the script have any link with Motion Twin, and they cannot be held responsible in case of a bug (although this script has been thoroughly developed and tested in order not to generate any game-breaking bug).";
		SM.TEXT['warning-3'] = "Have a nice game!";
		SM.TEXT['license'] = "<h4><img src='" + SM.src + "ico.png' /> Small(Mush) — MIT License</h4><p>Copyright © 2015 LAbare</p><p>Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the \"Software\"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:</p><p>The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.</p><p>The Software is provided \"as is\", without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose and noninfringement. In no event shall the authors or copyright holders be liable for any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising from, out of or in connection with the Software or the use or other dealings in the Software. Basically, if the script goes berzerk, stabs your kids and burns your house, I'm not to blame. But nothing bad should happen, not even a script-breaking bug. Trust me.</p>";
		SM.TEXT['help_screen-A'] = "Click on an element to show its tooltip.<br />This won't make you do any action.";
		SM.TEXT['help_screen-B'] = "Click again to hide the tooltip.";
		SM.TEXT['show_inventory'] = "Show inventory";
		SM.TEXT['show_flash_inventory'] = "DEBUG: Show Flash inventory";
		SM.TEXT['editor-tip'] = "<div class='tiptop'><div class='tipbottom'><div class='tipbg'><div class='tipcontent'><h1>Small(Mush) Message editor</h1><p>Allows for message formatting and preview.</p></div></div></div></div>";
		SM.TEXT['editor-tags_warning'] = "<span class='buddy'>Warning:</span> these tags only work in <em>private channels</em>; on the main channel, only the <strong>bold</strong> and <em>italics</em> tags display.";
		SM.TEXT['editor-mush_smileys'] = "Mush smileys";
		SM.TEXT['paste'] = "Paste";
		SM.TEXT['preview-refresh'] = "Refresh";
		SM.TEXT['preview-erase'] = "Erase";
		SM.TEXT['preview-confirm_erase'] = "Do you wish to erase your message?";
		SM.TEXT['preview-save'] = "Save";
		SM.TEXT['preview-copy'] = "Copy";
		SM.TEXT['preview-retrieve'] = "Retrieve saved message";
		SM.TEXT['premessages-title'] = "Select a preformatted message:";
		SM.TEXT['premessages-NULL'] = "None";
		SM.TEXT['premessages-inventory'] = "Share inventory";
		SM.TEXT['premessages-researches'] = "Share researches";
		SM.TEXT['premessages-researches++'] = "Share researches (advanced mode)";
		SM.TEXT['premessages-projects'] = "Share projects";
		SM.TEXT['premessages-planet'] = "Share a planet";
		SM.TEXT['premessages-comms'] = "Share communications progress";
		SM.TEXT['message-overwrite_retrieve'] = "Warning: this will overwrite your current message. Continue?";
		SM.TEXT['message-overwrite_build'] = "Do you wish to overwrite your current message (Cancel) or add this to its end (OK)?";
		SM.TEXT['preformat-researches-nomodule'] = "Please access the laboratory in order to activate research preformatting.";
		SM.TEXT['preformat-researches-title'] = "Researches:";
		SM.TEXT['preformat-researches++-title'] = "<img src='" + SM.src + "ico.png' /> Sharing researches — advanced mode";
		SM.TEXT['preformat-researches++-share'] = "Share?";
		SM.TEXT['preformat-researches++-name'] = "Name";
		SM.TEXT['preformat-researches++-progress'] = "%";
		SM.TEXT['preformat-researches++-important'] = "Important?";
		SM.TEXT['preformat-researches++-relay'] = "Need a relay?";
		SM.TEXT['preformat-researches++-submit'] = "Share researches";
		SM.TEXT['preformat-researches++-text_important'] = "priority research";
		SM.TEXT['preformat-researches++-text_relay'] = "relay needed";
		SM.TEXT['preformat-inventory-HELP_DRONE'] = "Support drone";
		SM.TEXT['preformat-inventory-CAMERA'] = "Camera";
		SM.TEXT['preformat-inventory-thirsty'] = "thirsty";
		SM.TEXT['preformat-inventory-dry'] = "dry";
		SM.TEXT['preformat-inventory-diseased'] = "diseased";
		SM.TEXT['preformat-inventory-broken'] = "broken";
		SM.TEXT['preformat-inventory-charge'] = "charge(s)";
		SM.TEXT['preformat-planet-none'] = "You haven't scanned any planet yet.";
		SM.TEXT['preformat-planet-title'] = "Choose a planet:";
		SM.TEXT['preformat-planet-nomodule'] = "Please access the Astro Terminal in order to activate planet preformatting.";
		SM.TEXT['preformat-planet-both'] = "Share both";
		SM.TEXT['preformat-planet-orbiting'] = "Orbiting planet";
		SM.TEXT['preformat-planet-unknown'] = "unknown zone(s)";
		SM.TEXT['preformat-projects-nomodule'] = "Please access the NERON Core in order to activate projects preformatting.";
		SM.TEXT['preformat-projects-title'] = "New projects:";
		SM.TEXT['preformat-comms-nomodule'] = "Please access the Communications center in order to activate communications preformatting.";
		SM.TEXT['preformat-comms-title'] = "**//Communications progress: //**";
		SM.TEXT['preformat-comms-signal'] = "**Signal quality:** ";
		SM.TEXT['preformat-comms-Xyloph'] = "**Xyloph databases decoded:** ";
		SM.TEXT['preformat-comms-Xylophnone'] = "none";
		SM.TEXT['preformat-comms-Xylophdesc'] = "Do you want to share Xyloph databases descriptions?";
		SM.TEXT['preformat-comms-bases'] = "**Rebel bases progress:** ";
		SM.TEXT['preformat-comms-basedecoded'] = "decoded";
		SM.TEXT['preformat-comms-baselost'] = "signal lost";
		SM.TEXT['preformat-comms-basesdesc'] = "Do you want to share decoded bases descriptions?";
		SM.TEXT['preformat-comms-basesnone'] = "none";
		SM.TEXT['preformat-comms-neron'] = "**NERON version:** ";
		SM.TEXT['abbr-day'] = "D";
		SM.TEXT['minimap-button'] = "Show the Small(Mush) minimap";
		SM.TEXT['minimap-title'] = "Small(Mush) minimap";
		SM.TEXT['minimap-warning'] = "<b>WARNING:</b> This minimap is not that of the Flash game, but merely a map of the Daedalus containing a little information. It may also not display certain reports.";
		SM.TEXT['minimap-legend'] = "<b>Legend:</b><br /><span class='SMmapfire SMlegend'>Reported fire</span><br /><span class='SMmapalertd SMlegend'>Reported doors</span><br /><span class='SMmapalerte SMlegend'>Reported equipments</span><br /><span class='SMmyroom SMlegend'>You are here!</span>";
		SM.TEXT['minimap-room'] = "You selected: <b><span id='SMminimaproom'>nothing</span></b>.";
		SM.TEXT['tabtip-chartab'] = "<h1>Character tab</h1>This tab contains all information relative to your character.";
		SM.TEXT['tabtip-shiptab'] = "<h1>Ship tab</h1>This tab contains all information relative to the ship in general: current alerts, exploration, projects and researches done…";
		SM.TEXT['tabtip-roomtab'] = "<h1>Room tab</h1>This tab contains all information about the room you're in.";
		SM.TEXT['tabtip-chattab'] = "<h1>Chat tab</h1>This tab is for the chat and logs and the Small(Mush) message editor.";
		SM.TEXT['tabtip-gametab'] = "<h1>Game/Terminal tab</h1>This tab contains the Flash game and the terminals you access.";
		SM.TEXT['tabtip-shoptab'] = "<h1>Vending machine tab</h1>This tab allows you to access the vending machine.";
		SM.TEXT['buttontip-reload'] = "<h1>Refresh</h1>Refreshes the game as common actions do.";
		SM.TEXT['buttontip-help'] = "<h1>Help</h1>Displays game tooltips (including some mobile-malfunctioning ones) as well as Small(Mush) script additions help tooltips.";
		SM.TEXT['chat_bug'] = "You are in the tab: ";
		SM.TEXT['chat_bug-local'] = "logs.";
		SM.TEXT['chat_bug-mush'] = "Mush channel.";
		SM.TEXT['chat_bug-obj'] = "objectives.";
		SM.TEXT['chat_bug-wall'] = "main channel.";
		SM.TEXT['chat_bug-fav'] = "favorites.";
		SM.TEXT['chat_bug-p'] = "private channel #";
		SM.TEXT['chat_bug-'] = "UNKNOWN";
		SM.TEXT['copy_logs-button'] = "Logs in text format";
		
		SM.loadingTexts = ["Photoscamping the scransons…", "Shooting intergalactic chicken…", "Cat / microwave experiment in progress…", "Looking for Waldo…", "Serving round of read bools…", "Reloading blasters with cherry stalk jam…", "Out-of-servicing the vending machine…", "Solving the Kube…", "Thinging thingys…", "Rebooting vocoded announcements fairy…", "Locating drones…", "Mapping PILGRED Terminatransistors…", "Avoiding seagull / reactor collision…", "Emptying oxygen tanks…", "Beheading inactives…", "Fortifying the Hydroponic garden…", "Overheating PDAs…", "Scaling the kitty's teeth…", "Picking mushrooms…", "Accelerating PILGRED Carebears' pedalling rhythm…", "Destroying non-perishable rations. Were you by any chance hungry?…", "Fattening Hua…", "Raising Mankarogs' irritation levels…", "Locating the cat… Error.", "Knight in Alpha Bay. Checkmate.", "Curmudgeons detected aboard. Triggering death by discombobulation…", "[HAAaXX] Going off my trolley… Probable cause: tanking up.", "Turning off cabin lights. Starting cipher analysis…", "Blowing dust off the Cryosleep capsules…", "Placing sausages on left lateral reactor…", "Feces recycler activated. Baking rations…", "Bolt, paper, scissors! NERON lost. Gravity Simulator unscathed yet.", "Automatic sprinklers: wet shirt contest beginning…", "Coffee shortage: validating use of cyanure capsules…", "Killer drone completed. Allowing ship-wide access… [HAX]", "Projecting asparagus holograms in the refectory… [Done]", "Schrödinger died. Cause: the electron took the route B…", "Nothing like the smell of new neuro-cryptic meat…", "Thanks for standing still, inactive!", "Inactives detected in the corridors. Buying SNC bowling balls…"];
		
		SM.localerooms = ['Bridge', 'Alpha Bay', 'Bravo Bay', 'Alpha Bay 2', 'Nexus', 'Medlab', 'Laboratory', 'Refectory', 'Hydroponic Garden', 'Engine Room', 'Front Alpha Turret', 'Centre Alpha Turret', 'Rear Alpha Turret', 'Front Bravo Turret', 'Centre Bravo Turret', 'Rear Bravo Turret', 'Patrol Ship Tomorrowland', 'Patrol Ship Olive Grove', 'Patrol Ship Yasmin', 'Patrol Ship Wolf', 'Patrol Ship E-Street', 'Patrol Ship Eponine', 'Patrol Ship Carpe Diem', 'Pasiphae', 'Front Corridor', 'Central Corridor', 'Rear Corridor', 'Planet', 'Icarus Bay', 'Alpha Dorm', 'Bravo Dorm', 'Front Storage', 'Centre Alpha Storage', 'Rear Alpha Storage', 'Centre Bravo Storage', 'Rear Bravo Storage', 'Outer Space', 'Limbo'];
		
		SM.INTERR = "?";
		break;

		case 3: //Espagnol
		SM.TEXT['stats_perso'] = "<b>Tus estadísticas actuales:</b> ";
		SM.TEXT['AP-general'] = "punto(s) de acción";
		SM.TEXT['AP-eng'] = "punto(s) de reparación";
		SM.TEXT['AP-garden'] = "punto(s) de jardinería";
		SM.TEXT['AP-neron'] = "punto(s) de artífice";
		SM.TEXT['AP-comp'] = "punto(s) de informática";
		SM.TEXT['AP-heal'] = "punto(s) de  acción cura";
		SM.TEXT['AP-pilgred'] = "punto(s) de PILGRED";
		SM.TEXT['AP-shoot'] = "punto(s) de disparo";
		SM.TEXT['AP-cook'] = "punto(s) de cocina";
		SM.TEXT['AP-klix'] = "Klix";
		SM.TEXT['hide_alert_reports'] = "Esconder reportes";
		SM.TEXT['show_alert_reports'] = "Mostrar reportes";
		SM.TEXT['unvalid_move'] = "¡Esta puerta está rota, no puedes desplazarte allí!";
		SM.TEXT['move_confirm'] = "¿Quieres desplazarte a ";
		SM.TEXT['move_alert'] = "CUIDADO : Parece que no puedes desplazarte en este momento. Puede que haya un error. ¿Continuar?";
		SM.TEXT['move_guardian'] = "CUIDADO : Alguien está vigilando esta habitación. A menos que seas Huidizo, solo puedes moverte a la habitación por la cual viniste, puede que haya un error. ¿Continuar?";
		SM.TEXT['current_room'] = "Estás en : ";
		SM.TEXT['move_button'] = "Desplazare a :";
		SM.TEXT['broken_door'] = " — ROTA";
		SM.TEXT['door_to'] = "Puerta → ";
		SM.TEXT['SMparams-title'] = "Parámetros de Small(Mush)";
		SM.TEXT['SMparams-confirm_action'] = "Confirmar acciones";
		SM.TEXT['SMparams-food_desc'] = "Mostrar efectos de consumibles bajo el inventario";
		SM.TEXT['SMparams-forced_locale'] = "Forzar cambio de idioma de Small(Mush)";
		SM.TEXT['SMparams-lang_title'] = "Idioma de Small(Mush):";
		SM.TEXT['SMparams-chat_unload'] = "Limpiar el chat";
		SM.TEXT['SMparams-chat_unload_tip'] = "Limpiar el chat<br />El canal principal tardará menos en recargar";
		SM.TEXT['SMparams-chat_unload_reload'] = "¡Recarga forzosa inminente!<br />(Lo siento por eso...)<br />Por favor ajusten sus cinturones.";
		SM.TEXT['SMparams-credits'] = "Script desarrollado por <a href='http://twinoid.com/user/8412516' target='_blank'>LAbare</a>. <a onclick='SM.showLicense();'>Licencia MIT</a>.<br />Traducción al Español por <a href='http://twinoid.com/user/8822437' target='_blank'>CptArgentina</a> y <a href='http://twinoid.com/user/20309' target='_blank'>Guilherande</a> (¡de nada!).";
		SM.TEXT['SMparams-credits_beta'] = "<img src='/img/icons/ui/likemush.gif' /> Gracias al equipo de la beta:<br /><a href='http://twinoid.com/user/8412516' target='_blank'>LAbare</a> (¿sí, por qué no?)<br /><a href='http://twinoid.com/user/2718866' target='_blank'>Heimdall</a>, rechazado por todos, inclusive Windows<br /><a href='http://twinoid.com/user/1729323' target='_blank'>Breith</a> el pony apocalíptico<br /><a href='http://twinoid.com/user/6541022' target='_blank'>lucasmore</a>, perdido en el espacio<br /><a href='http://twinoid.com/user/6207430' target='_blank'>Hyomin</a>, la dulzura aterradora<br /><a href='http://twinoid.com/user/20309' target='_blank'>Guilherande</a>, la mas beta de los probadores<br /><a href='http://twinoid.com/user/1244143' target='_blank'>badconker</a>, programador del limpiador del chat<br /><a href='http://twinoid.com/user/839307' target='_blank'>Contry</a> la callada<br /><a href='http://twinoid.com/user/110901' target='_blank'>Bronu</a>, quien volvió al SS justo en el medio de la beta";
		SM.TEXT['confirm_action'] = "¿Quieres '";
		SM.TEXT['tabs-char'] = "Yo";
		SM.TEXT['tabs-ship'] = "Nave";
		SM.TEXT['tabs-room'] = "Sala";
		SM.TEXT['tabs-chat'] = "Chat";
		SM.TEXT['tabs-game'] = "Módulo";
		SM.TEXT['tabs-shop'] = "Tienda";
		SM.TEXT['SM-added_tab'] = "<img src='" + SM.src + "ico.png' /> <b>Atención:</b> Pestaña de Small(Mush) <img src='" + SM.src + "ico.png' />";
		SM.TEXT['SM-added_tab_text'] = "Esta pestaña es añadida por el script Small(Mush). Si un bug es encontrado aquí, definitivamente es un <em>bug del script</em> y debería ser reportado únicamente al autor del script";
		SM.TEXT['plasma_onmouseover'] = "<div class='tiptop'><div class='tipbottom'><div class='tipbg'><div class='tipcontent'><h1>Escudo de plasma</h1>El escudo de plasma está activo.</div></div></div></div>";
		SM.TEXT['cards_title'] = "Proyectos e investigaciones:";
		SM.TEXT['roomtab_focused'] = "Actualmente estás Concentrado en un terminal, no puedes ver que ocurre en la sala. Podrás hacerlo cuando abandones el terminal. (Si no puedes deshacerte del estado Concentrado, accede y abandona la máquina expendedora.)";
		SM.TEXT['fire'] = "Hay un incendio en la sala. ¡Rápido, agarra un extinguidor!";
		SM.TEXT['equipments'] = "Equipamientos";
		SM.TEXT['broken'] = " — ROTO";
		SM.TEXT['reac_b'] = "Reactor lateral izquierdo";
		SM.TEXT['reac_a'] = "Reactor lateral derecho";
		SM.TEXT['ROTATIONAL_REACTOR_unknown'] = "Reactor lateral desconocido";
		SM.TEXT['bed_a_a'] = "Cama Alpha 1";
		SM.TEXT['bed_a_b'] = "Cama Alpha 2";
		SM.TEXT['bed_a_c'] = "Cama Alpha 3";
		SM.TEXT['bed_b_a'] = "Cama Beta 1";
		SM.TEXT['bed_b_b'] = "Cama Beta 2";
		SM.TEXT['bed_b_c'] = "Cama Beta 3";
		SM.TEXT['sick_couch'] = "Cama de la Enfermería";
		SM.TEXT['BED_unknown'] = "Cama desconocida";
		SM.TEXT['PATROL_SHIP_A_0'] = "Patrullero Longane";
		SM.TEXT['PATROL_SHIP_A_1'] = "Patrullero Jujube";
		SM.TEXT['PATROL_SHIP_A_2'] = "Patrullero Tamarindo";
		SM.TEXT['PATROL_SHIP_B_0'] = "Patrullero Sócrates";
		SM.TEXT['PATROL_SHIP_B_1'] = "Patrullero Epicuro";
		SM.TEXT['PATROL_SHIP_B_2'] = "Patrullero Platón";
		SM.TEXT['PATROL_SHIP_AA_0'] = "Patrullero Wallis";
		SM.TEXT['PATROL_SHIP_AA_1'] = "Pasiphae";
		SM.TEXT['PATROL_INTERFACE_unknown'] = "Patrullero desconocido";
		SM.TEXT['warning-title'] = "Small(Mush) — cargado";
		SM.TEXT['warning-1'] = "<strong>ATENCIÓN:</strong> Este script modifica la interfaz del juego. En caso de un desafortunado bug, <em>reproducelo en una PC</em> para asegurarte de que es un bug del juego y no del script. Publicalo en los foros únicamente si lo reproduciste <em>en una PC en un navegador sin scripts</em>.";
		SM.TEXT['warning-2'] = "En caso de un bug del script, contacta al autor desde el menú de parámetros. Ni el autor ni el script están relacionados de ninguna manera con Motion Twin, y no pueden ser culpados en caso de un bug (Aunque este script fue completamente desarrolado y testeado para no generar ningún bug capaz de tener un efecto importante en el juego)";
		SM.TEXT['warning-3'] = "¡Ten un buen juego!";
		SM.TEXT['license'] = "<h4><img src='" + SM.src + "ico.png' /> Small(Mush) — Licencia MIT</h4><p>Licencia MIT — Traducción no oficial ni autorizada para su uso como licencia legal.</p><p>Copyright © 2015 LAbare</p><p>Se concede permiso por la presente, de forma gratuita, a cualquier persona que obtenga una copia de este software y de los archivos de documentación asociados (el «Script»), para utilizar el Script sin restricción, incluyendo sin limitación los derechos de usar, copiar, modificar, fusionar, publicar, distribuir, sublicenciar, y/o vender copias de este Script, y para permitir a las personas a las que se les proporcione el Script a hacer lo mismo, sujeto a las siguientes condiciones:</p><p>El aviso de copyright anterior y este aviso de permiso se incluirán en todas las copias o partes sustanciales del Script.</p><p>El Script se proporciona «tal cual», sin garantía de ningún tipo, expresa o implícita, incluyendo pero no limitado a garantías de comercialización, idoneidad para un propósito particular y no infracción. en ningún caso los autores o titulares del copyright serán responsables de ninguna reclamación, daños u otras responsabilidades, ya sea en un litigio, agravio o de otro modo, que surja de o en conexión con el Script o el uso u otro tipo de acciones en el Script. Básicamente, si el script se vuelve un berzerker, apuñala a tus hijos, y quema tu casa, no me culpes. Pero nada malo debería ocurrir, ni siquiera un bug relacionado al script. Confía en mí.</p>";
		SM.TEXT['help_screen-A'] = "Haz click para mostrar un tooltip.<br />Esto no te hará cometer ninguna acción.";
		SM.TEXT['help_screen-B'] = "Haz click de nuevo para esconder el tooltip.";
		SM.TEXT['show_inventory'] = "Monstrar inventario";
		SM.TEXT['show_flash_inventory'] = "DEBUG: Mostrar inventario de Flash";
		SM.TEXT['editor-tip'] = "<div class='tiptop'><div class='tipbottom'><div class='tipbg'><div class='tipcontent'><h1>Editor de mensajes de Small(Mush)</h1><p>Permite modificar el formato y ver una previsualización.</p></div></div></div></div>";
		SM.TEXT['editor-tags_warning'] = "<span class='buddy'>Atención:</span> Estos formatos solo sirven en <em>canales privados</em>; en el canal principal, solo funcionan la <strong>negrita</strong> y la <em>cursiva</em>.";
		SM.TEXT['editor-mush_smileys'] = "Emoticones de Mush";
		SM.TEXT['paste'] = "Pegar";
		SM.TEXT['preview-refresh'] = "Recargar";
		SM.TEXT['preview-erase'] = "Borrar";
		SM.TEXT['preview-confirm_erase'] = "¿Deseas borrar tu mensaje?";
		SM.TEXT['preview-save'] = "Guardar";
		SM.TEXT['preview-copy'] = "Copiar";
		SM.TEXT['preview-retrieve'] = "Recuperar el mensaje guardado";
		SM.TEXT['premessages-title'] = "Seleccionar un mensaje preformateado";
		SM.TEXT['premessages-NULL'] = "Ninguno";
		SM.TEXT['premessages-inventory'] = "Compartir inventario";
		SM.TEXT['premessages-researches'] = "Compartir investigaciones";
		SM.TEXT['premessages-researches++'] = "Compartir investigaciones (modo avanzado)";
		SM.TEXT['premessages-projects'] = "Compartir proyectos";
		SM.TEXT['premessages-planet'] = "Compartir un planeta";
		SM.TEXT['premessages-comms'] = "Compartir progreso de las comunicaciones";
		SM.TEXT['message-overwrite_retrieve'] = "Atención: Esto sobreescribirá tu mensaje actual. ¿Continuar?";
		SM.TEXT['message-overwrite_build'] = "¿Deseas sobreescribir tu mensaje actual (Cancelar) o añadir esto al final (OK)?";
		SM.TEXT['preformat-researches-nomodule'] = "Por favor accede al laboratorio antes de reformatear la compartición de investigaciones.";
		SM.TEXT['preformat-researches-title'] = "Investigaciones:";
		SM.TEXT['preformat-researches++-title'] = "<img src='" + SM.src + "ico.png' /> Compartir investigaciones — modo avanzado";
		SM.TEXT['preformat-researches++-share'] = "¿Compartir?";
		SM.TEXT['preformat-researches++-name'] = "Nombre";
		SM.TEXT['preformat-researches++-progress'] = "%";
		SM.TEXT['preformat-researches++-important'] = "¿Importante?";
		SM.TEXT['preformat-researches++-relay'] = "¿Relevo?";
		SM.TEXT['preformat-researches++-submit'] = "Compartir investigaciones";
		SM.TEXT['preformat-researches++-text_important'] = "prioritario";
		SM.TEXT['preformat-researches++-text_relay'] = "Relevo necesitado";
		SM.TEXT['preformat-inventory-HELP_DRONE'] = "Drone";
		SM.TEXT['preformat-inventory-CAMERA'] = "Cámara";
		SM.TEXT['preformat-inventory-thirsty'] = "sedienta";
		SM.TEXT['preformat-inventory-dry'] = "seca";
		SM.TEXT['preformat-inventory-diseased'] = "enferma";
		SM.TEXT['preformat-inventory-broken'] = "roto";
		SM.TEXT['preformat-inventory-charge'] = "carga(s)";
		SM.TEXT['preformat-planet-none'] = "Aún no haz escaneado planetas.";
		SM.TEXT['preformat-planet-title'] = "Escoge un planeta:";
		SM.TEXT['preformat-planet-nomodule'] = "Por favor accede al Terminal Astro para reformatear la compartición de planetas.";
		SM.TEXT['preformat-planet-both'] = "Compartir ambos";
		SM.TEXT['preformat-planet-orbiting'] = "Orbitanto planeta";
		SM.TEXT['preformat-planet-unknown'] = "zona(s) desconocida(s)";
		SM.TEXT['preformat-projects-nomodule'] = "Por favor accede al Núcleo NERON para reformatear la compartición de proyectos.";
		SM.TEXT['preformat-projects-title'] = "Nuevos proyectos:";
		SM.TEXT['preformat-comms-nomodule'] = "Por favor accede al Centro de Comunicaciones para reformatear la compartición del progreso de las comunicaciones.";
		SM.TEXT['preformat-comms-title'] = "**//Progreso de las comunicaciones: //**";
		SM.TEXT['preformat-comms-signal'] = "**Calidad de la señal:** ";
		SM.TEXT['preformat-comms-Xyloph'] = "**Bases de Xyloph decodificadas:** ";
		SM.TEXT['preformat-comms-Xylophnone'] = "ninguna";
		SM.TEXT['preformat-comms-Xylophdesc'] = "¿Deseas compartir las descripciones de las bases de Xyloph?";
		SM.TEXT['preformat-comms-bases'] = "**Progreso de las bases rebeldes:** ";
		SM.TEXT['preformat-comms-basedecoded'] = "decodificada";
		SM.TEXT['preformat-comms-baselost'] = "señal perdida";
		SM.TEXT['preformat-comms-basesdesc'] = "¿Deseas compartir las descripciones y nombres de las bases rebeldes?";
		SM.TEXT['preformat-comms-basesnone'] = "ninguno";
		SM.TEXT['preformat-comms-neron'] = "**Versión de NERON:** ";
		SM.TEXT['abbr-day'] = "D";
		SM.TEXT['minimap-button'] = "Mostrar el minimapa de Small(Mush)";
		SM.TEXT['minimap-title'] = "Minimapa de Small(Mush)";
		SM.TEXT['minimap-warning'] = "<b>ATENCIÓN:</b> Este minimapa no es el de Flash, meramente es un mapa del Daedalus conteniendo algo de información. Puede que muestre algunos reportes.";
		SM.TEXT['minimap-legend'] = "<b>Referencias:</b><br /><span class='SMmapfire SMlegend'>Incendio reportado</span><br /><span class='SMmapalertd SMlegend'>Puertas reportadas</span><br /><span class='SMmapalerte SMlegend'>Equipamientos reportados</span><br /><span class='SMmyroom SMlegend'>¡Tú estás aquí!</span>";
		SM.TEXT['minimap-room'] = "Tu seleccionaste: <b><span id='SMminimaproom'>nada</span></b>";
		SM.TEXT['tabtip-chartab'] = "<h1>Pestaña Personaje</h1>Contiene toda la información relativa a tu personaje.";
		SM.TEXT['tabtip-shiptab'] = "<h1>Pestaña Nave</h1>Contiene toda la información relativa a la nave en general: alertas, expediciones, proyectos, etc.";
		SM.TEXT['tabtip-roomtab'] = "<h1>Pestaña Sala</h1>Contiene toda la información relativa a la sala en la que estás.";
		SM.TEXT['tabtip-chattab'] = "<h1>Pestaña Chat</h1>Contiene el chat,registros y el editor de mensajes de Small(Mush).";
		SM.TEXT['tabtip-gametab'] = "<h1>Pestaña Módulo</h1>Contiene el juego de Flash y las terminales a las que accedes.";
		SM.TEXT['tabtip-shoptab'] = "<h1>Pestaña Tienda</h1>Te permite acceder a la máquina expendedora.";
		SM.TEXT['buttontip-reload'] = "<h1>Recargar</h1>Recarga el juego como lo hacen las acciones normales.";
		SM.TEXT['buttontip-help'] = "<h1>Ayuda</h1>Muestra tooltips,inclyendo algunos que no funcionan correctamente desde un teléfono y otros sobre adiciones de Small(Mush).";
		SM.TEXT['chat_bug'] = "Estás en la pestaña: ";
		SM.TEXT['chat_bug-local'] = "registros.";
		SM.TEXT['chat_bug-mush'] = "canal Mush.";
		SM.TEXT['chat_bug-obj'] = "objetivos.";
		SM.TEXT['chat_bug-wall'] = "canal principal.";
		SM.TEXT['chat_bug-fav'] = "favoritos.";
		SM.TEXT['chat_bug-p'] = "canal privado #";
		SM.TEXT['chat_bug-'] = "DESCONOCIDO";
		SM.TEXT['copy_logs-button'] = "Registros en formato de texto";
		
		SM.loadingTexts = ["Experimento gato/microondas en progreso…", "Recargando blasters con mermelada de tallos de cereza…", "Máquina expendedora fuera de servicio…", "Resolviendo el Kubo…", "Coseando cosas…", "Reiniciado el hada de los anuncios vocodificados…", "Localizando drones…", "Mapeando Terminatransmisores PILGRED…", "Evitando colisión gaviota/reactor…", "Vacíando tanques de oxígeno…", "Decapitando inactivos…", "Disparando a gallinas intergalácticas…", "Buscando a Wally…", "Fortificando el Jardín hidropónico…", "Sobrecalentando PDAs…", "Limpiando los dientes del minino…", "Recolectando hongos…", "Destruyendo raciones no-perecibles. No tenías hambre, ¿verdad?…", "Hua revolucionando la mayonesa…", "Incrementando nivel de irritación de los Mankarog…", "Caballo a Plataforma Alpha. Jaque mate.", "Colocando salchicas en el reactor lateral izquierdo…", "Reciclador de heces activado. Cocinando raciones…", "¡Piedra, papel, circuito! Neron pierde. Simulador de gravedad (aún no) roto.", "Regaderas automáticas: concurso de camisetas mojadas iniciando.", "Escasez de café: validando uso de cápsulas de cianuro…", "Permitiendo acceso completo a la nave al dron asesino... [HAX]", "Proyectando hologramas de esparragos en el comedor… [Listo]", "Acelerando el ritmo de pedaleo de los Ositos Pilgredositos…", "Error cuatrocientos-gato…", "Apagando luces. Comenzando análisis del código…", "Desempolvando capsulas de Cryoletárgo…", "Yendo AL bare…", "Schrödinger murió. Causa: El electrón tomó la ruta B…", "Ah, nada como el olor a carne neuro-críptica nueva…", "Inactivos detectados en el pasillo. Compra de bolas de bolos SNC…"];
		
		SM.localerooms = ['Puente de mando', 'Plataforma Alpha', 'Plataforma Beta', 'Plataforma Alpha 2', 'Nexus', 'Enfermería', 'Laboratorio', 'Comedor', 'Jardín Hidropónico', 'Sala de motores', 'Cañón Alpha delantero', 'Cañón Alpha central', 'Cañón Alpha trasero', 'Cañón Beta delantero', 'Cañón Beta central', 'Cañón Beta trasero', 'Patrullero Longane', 'Patrullero Jujube', 'Patrullero Tamarindo', 'Patrullero Sócrates', 'Patrullero Epicuro', 'Patrullero Platón', 'Patrullero Wallis', 'Pasiphae', 'Pasillo delantero', 'Pasillo central', 'Pasillo trasero', 'Planeta', 'Icarus', 'Dormitorio Alpha', 'Dormitorio Beta', 'Almacén delantero', 'Almacén Alpha central', 'Almacén Alpha trasero', 'Almacén Beta central', 'Almacén Beta trasero', 'Espacio infinito', 'El limbo'];
		
		SM.INTERR = "?";
		break;
	}

	func();
};



/* FONCTION D'INITIALISATION */

SM.init = function() {
	var inlineJS = "document.body.setAttribute('data-SM-src', _tid.makeUrl('/mod/wall/post', { _id: 'tabreply_content', jsm: '1', lang: 'FR' })); Main.SMupdtArr = ['maincontainer'];";
	SM.addNewEl('script', document.head, null, inlineJS); //Compatibilité avec userscript, sinon _tid.makeUrl est inaccessible et Main.SMupdtArr ne marche pas

	if (SM.sel('#SMbar') == null)
	{
		SM.initCss();
		SM.initMenubar();
		SM.initTabs();
	}
	SM.charTab();
	SM.shipTab();
	SM.roomTab();
	SM.chatTab();
	SM.gameTab();
	SM.topStats();
	SM.messageEditor();
	SM.changeActionFunctions();
	window.setTimeout(function() { SM.sel('#content').scrollLeft = 0; }, 500);

	//Première fois : alerte à lire
	if (SM.parameters['first_time'])
	{
		var SMdialog = SM.copyEl(SM.sel('#dialog'), document.body);
		SMdialog.style.display = 'block';
		SMdialog.style.left = '12px !important';
		SMdialog.style.top = '100px';
		SM.sel('#SMdialog_title').innerHTML = "<img src='" + SM.src + "ico.png' />  " + SM.TEXT['warning-title'];
		SM.addNewEl('p', SM.sel('#SMdialog_body'), null, SM.TEXT['warning-1']);
		SM.addNewEl('p', SM.sel('#SMdialog_body'), null, SM.TEXT['warning-2']);
		SM.addNewEl('p', SM.sel('#SMdialog_body'), null, SM.TEXT['warning-3']);
		SM.sel('#SMdialog_ok').addEventListener('click', function() { document.body.removeChild(SM.sel('#SMdialog')); });
		SM.parameters['first_time'] = false;
		SM.setSMParameters();
	}

	//Le rechargement interne de la page écrase les modifications et ajouts, donc on fait une vérification régulière
	window.setInterval(function() {
		if (!SM.sel('#SMenergybar'))
			{ SM.reInit(); }
	}, 500);
};


exportFunction(SM.sel, unsafeSM, { defineAs: "sel" });
exportFunction(SM.getAttributesList, unsafeSM, { defineAs: "getAttributesList" });
exportFunction(SM.addNewEl, unsafeSM, { defineAs: "addNewEl" });
exportFunction(SM.addButton, unsafeSM, { defineAs: "addButton" });
exportFunction(SM.moveEl, unsafeSM, { defineAs: "moveEl" });
exportFunction(SM.copyEl, unsafeSM, { defineAs: "copyEl" });
exportFunction(SM.getTipContent, unsafeSM, { defineAs: "getTipContent" });
exportFunction(SM.toArray, unsafeSM, { defineAs: "toArray" });
exportFunction(SM.reformat, unsafeSM, { defineAs: "reformat" });
exportFunction(SM.generateMinimap, unsafeSM, { defineAs: "generateMinimap" });
exportFunction(SM.changeTab, unsafeSM, { defineAs: "changeTab" });
exportFunction(SM.SMhelp, unsafeSM, { defineAs: "SMhelp" });
exportFunction(SM.toggleAlertList, unsafeSM, { defineAs: "toggleAlertList" });
exportFunction(SM.changeRoom, unsafeSM, { defineAs: "changeRoom" });
exportFunction(SM.displayRoomActions, unsafeSM, { defineAs: "displayRoomActions" });
exportFunction(SM.updateRoomActions, unsafeSM, { defineAs: "updateRoomActions" });
exportFunction(SM.changeChatTab, unsafeSM, { defineAs: "changeChatTab" });
exportFunction(SM.SMexitModule, unsafeSM, { defineAs: "SMexitModule" });
exportFunction(SM.changeActionFunctions, unsafeSM, { defineAs: "changeActionFunctions" });
exportFunction(SM.beforeAction, unsafeSM, { defineAs: "beforeAction" });
exportFunction(SM.hidePaste, unsafeSM, { defineAs: "hidePaste" });
exportFunction(SM.loadingScreen, unsafeSM, { defineAs: "loadingScreen" });
exportFunction(SM.reInit, unsafeSM, { defineAs: "reInit" });
exportFunction(SM.showLicense, unsafeSM, { defineAs: "showLicense" });
exportFunction(SM.selectItem, unsafeSM, { defineAs: "selectItem" });
exportFunction(SM.itemLeft, unsafeSM, { defineAs: "itemLeft" });
exportFunction(SM.itemRight, unsafeSM, { defineAs: "itemRight" });
exportFunction(SM.getSMParameters, unsafeSM, { defineAs: "getSMParameters" });
exportFunction(SM.setSMParameters, unsafeSM, { defineAs: "setSMParameters" });
exportFunction(SM.buildParamsMenu, unsafeSM, { defineAs: "buildParamsMenu" });
exportFunction(SM.initCss, unsafeSM, { defineAs: "initCss" });
exportFunction(SM.initMenubar, unsafeSM, { defineAs: "initMenubar" });
exportFunction(SM.initTabs, unsafeSM, { defineAs: "initTabs" });
exportFunction(SM.charTab, unsafeSM, { defineAs: "charTab" });
exportFunction(SM.shipTab, unsafeSM, { defineAs: "shipTab" });
exportFunction(SM.roomTab, unsafeSM, { defineAs: "roomTab" });
exportFunction(SM.chatTab, unsafeSM, { defineAs: "chatTab" });
exportFunction(SM.gameTab, unsafeSM, { defineAs: "gameTab" });
exportFunction(SM.topStats, unsafeSM, { defineAs: "topStats" });
exportFunction(SM.messageEditor, unsafeSM, { defineAs: "messageEditor" });
exportFunction(SM.refreshPreview, unsafeSM, { defineAs: "refreshPreview" });
exportFunction(SM.savePreview, unsafeSM, { defineAs: "savePreview" });
exportFunction(SM.retrievePreview, unsafeSM, { defineAs: "retrievePreview" });
exportFunction(SM.buildMessage, unsafeSM, { defineAs: "buildMessage" });
exportFunction(SM.preformatPlanet, unsafeSM, { defineAs: "preformatPlanet" });
exportFunction(SM.locale, unsafeSM, { defineAs: "locale" });
exportFunction(SM.init, unsafeSM, { defineAs: "init" });




/* VARIABLES */

SM.version = "1.1";
//SM.src = "http://labare.alwaysdata.net/SmallMush/";
SM.src = "http://labare.github.io/SmallMush/";
try { SM.src = self.options.baseUrl; } //Addon Firefox
catch(e) { console.log('Small(Mush) & FF addon: ' + e); }

SM.smileys = [['pa_pm', 'pslots.png'], ['pa', 'pa_slot1.png'], ['pm', 'pa_slot2.png'], ['pv|hp', 'lp.png'], ['xp', 'xp.png'], ['xpbig', 'xpbig.png'], ['pa_heal', 'pa_heal.png'], ['asocial', 'status/unsociable.png'], ['disabled', 'status/disabled.png'], ['hungry', 'status/hungry.png'], ['hurt', 'status/hurt.png'], ['ill', 'status/disease.png'], ['psy_disease', 'status/psy_disease.png'], ['commander', 'title_01.png'], ['admin_neron', 'title_02.png'], ['resp_comm', 'title_03.png'], ['alert', 'alert.png'], ['com', 'comm.png'], ['door', 'door.png'], ['plant_youngling', 'plant_youngling.png'], ['plant_thirsty', 'plant_thirsty.png'], ['plant_dry', 'plant_dry.png'], ['plant_diseased', 'plant_diseased.png'], ['bin', 'bin.png'], ['next', 'pageright.png'], ['ship_triumph', 'daedalus_triumph.png'], ['pa_comp', 'pa_comp.png'], ['pa_cook', 'pa_cook.png'], ['pa_core', 'pa_core.png'], ['pa_eng|eng', 'pa_eng.png'], ['pa_garden', 'pa_garden.png'], ['pa_pilgred', 'pa_pilgred.png'], ['pa_shoot', 'pa_shoot.png'], ['laid', 'status/laid.png'], ['mastered', 'status/mastered.png'], ['mush', 'mush.png'], ['stink', 'status/stinky.png'], ['fuel', 'fuel.png'], ['o2', 'o2.png'], ['moral|pmo', 'moral.png'], ['eat', 'sat.png'], ['pills', 'demoralized2.png'], ['dead', 'dead.png'], ['hunter', 'hunter.png'], ['fire', 'fire.png'], ['more', 'more.png'], ['less', 'less.png'], ['chut', 'discrete.png'], ['talk', 'talk.gif'], ['talky', 'talkie.png'], ['cat', 'cat.png'], ['time', 'casio.png'], ['tip', 'tip.png'], ['triumph', 'triumph.png']];

SM.ME_NERON = false;
SM.ME_ALONE = true;
SM.ME_MODULING = false;
SM.GUARDIAN = false;
SM.GRAVITY = true;


/** INITIALISATION **/
if (SM.sel('#SMbar') == null)
{
	SM.getSMParameters();
	SM.locale(function() { SM.init(); });
}