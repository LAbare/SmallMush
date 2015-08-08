// ==UserScript==
// @name      MushMobile
// @version   0.9.7
// @icon      http://labare.alwaysdata.net/MushMobile/ico.png
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
var _tid = unsafeWindow._tid || _tid;
var ActionListMaintainer = unsafeWindow.ActionListMaintainer || ActionListMaintainer;
var js = unsafeWindow.js || js;


var MM = {};


/* FONCTIONS DÉVELOPPEUR */

MM.sel = function(name) {
	if (name[0] == "." && name.search(' ') == -1) { return document.getElementsByClassName(name.slice(1))[0]; }
	else if (name[0] == '#' && name.search(' ') == -1) { return document.getElementById(name.slice(1)); }
	else { return document.querySelector(name); }
};


MM.getAttributesList = function(el) {
	var attrs = [];
	for (var i = 0; i < el.attributes.length; i++)
	{
		if (el.attributes[i].name != 'id')
			{ attrs.push([el.attributes[i].name, el.attributes[i].value]); }
	};
	return attrs;
};


MM.addNewEl = function(type, parent, id, content, attrs) {
	if (['svg', 'path', 'rect', 'text'].indexOf(type) != -1)
		{ var el = document.createElementNS('http://www.w3.org/2000/svg', type); }
	else
		{ var el = document.createElement(type); }
	if (id) { el.id = id; }
	if (content) { el.innerHTML = content; }
	if (attrs) { for (var i = 0; i < attrs.length; i++) { el.setAttribute(attrs[i][0], attrs[i][1]); } }
	if (parent) { parent.appendChild(el); }
	return el;
};


MM.addButton = function(parent, text, attrs) {
	var butattrs = [['class', 'but']];
	if (attrs) {
		for (var i = 0; i < attrs.length; i++) {
			if (attrs[i][0] == 'class')
				{ butattrs[0][1] += ' ' + attrs[i][1]; }
			else
				{ butattrs.push(attrs[i]); }
		}
	}
	var a = MM.addNewEl('div', parent, null, null, butattrs);
	var b = MM.addNewEl('div', a, null, null, [['class', 'butright']]);
	var c = MM.addNewEl('div', b, null, text, [['class', 'butbg']]);
	return a;
};


MM.moveEl = function(el, dest, bef) {
	if (el.parentNode) { el.parentNode.removeChild(el); }
	if (bef) { dest.insertBefore(el, bef); }
	else { dest.appendChild(el); }
	return el;
};


MM.copyEl = function (el, dest, bef) {
	var newEl = MM.addNewEl(el.nodeName, null, ((el.id) ? 'MM' + el.id : ''), el.innerHTML, MM.getAttributesList(el));
	var children = newEl.getElementsByTagName("*");
	for (i = 0; i < children.length; i++)
		{ if (children[i].id) { children[i].id = 'MM' + children[i].id; } }
	if (bef) { dest.insertBefore(newEl, bef); }
	else { dest.appendChild(newEl); }
	return newEl;
};


MM.getTipContent = function(tipFunction) {
	tipFunction();
	var tipContent = MM.sel('.tipcontent').innerHTML;
	Main.hideTip();
	return tipContent;
};


MM.toArray = function(obj) {
	return [].slice.call(obj);
};



/* FONCTIONS MUSHMOBILE */

MM.generateMinimap = function() {
	var rooms = [['m129.5 10.5 0 20 -20 0 0 60 100 0 0 -60 -20 0 0 -20 -60 0z', [155, 50]], [60, 120, 249.5, 230.5], [60, 120, 9.5, 230.5], [60, 120, 249.5, 350.5], [60, 40, 129.5, 310.5], [80, 60, 69.5, 170.5], [80, 60, 69.5, 110.5], [100, 60, 109.5, 250.5], [80, 60, 169.5, 110.5], [180, 90, 69.5, 430.5], [40, 40, 209.5, 50.5], [40, 40, 249.5, 190.5], [40, 40, 249.5, 470.5], [40, 40, 69.5, 50.5], [40, 40, 29.5, 190.5], [40, 40, 29.5, 470.5], [], [], [], [], [], [], [], [], ['m69.5 90.5 0 20 80 0 0 120 20 0 0 -120 80 0 0 -20 -180 0z', [160, 92]], [180, 20, 69.5, 230.5], [220, 20, 29.5, 350.5], [], [60, 100, 9.5, 370.5], ['m209.5 290.5 0 20 -20 0 0 40 60 0 0 -60 -40 0z', [210, 320]], ['m69.5 290.5 0 60 60 0 0 -40 -20 0 0 -20 -40 0z', [100, 320]], [80, 60, 169.5, 170.5], [40, 40, 209.5, 250.5], [40, 60, 209.5, 370.5], [40, 40, 69.5, 250.5], [40, 60, 69.5, 370.5]];

	var doors = [['209.5 60.5 0 20', '0-10'], ['109.5 60.5 0 20', '0-13'], ['149.5 90.5 20 0', '0-24'], ['259.5 350.5 20 0', '1-3'], ['259.5 230.5 20 0', '1-11'], ['249.5 230.5 0 20', '1-25'], ['249.5 300.5 0 20', '1-29'], ['249.5 260.5 0 20', '1-32'], ['39.5 230.5 20 0', '2-14'], ['69.5 230.5 0 20', '2-25'], ['39.5 350.5 20 0', '2-26'], ['69.5 300.5 0 20', '2-30'], ['69.5 260.5 0 20', '2-34'], ['249.5 440.5 0 20', '3-9'], ['259.5 470.5 20 0', '3-12'], ['249.5 350.5 0 20', '3-26'], ['149.5 350.5 20 0', '4-26'], ['119.5 170.5 20 0', '5-6'], ['69.5 200.5 0 20', '5-14'], ['149.5 180.5 0 20', '5-24'], ['149.5 140.5 0 20', '6-24'], ['149.5 250.5 20 0', '7-25'], ['169.5 140.5 0 20', '8-24'], ['179.5 170.5 20 0', '8-31'], ['249.5 480.5 0 20', '9-12'], ['69.5 480.5 0 20', '9-15'], ['69.5 440.5 0 20', '9-28'], ['219.5 430.5 20 0', '9-33'], ['79.5 430.5 20 0', '9-35'], ['219.5 90.5 20 0', '10-24'], ['249.5 200.5 0 20', '11-31'], ['79.5 90.5 20 0', '13-24'], ['39.5 470.5 20 0', '15-28'], ['149.5 230.5 20 0', '24-25'], ['169.5 180.5 0 20', '24-31'], ['39.5 370.5 20 0', '26-28'],  ['219.5 350.5 20 0', '26-29'], ['79.5 350.5 20 0', '26-30'], ['219.5 370.5 20 0', '26-33'], ['79.5 370.5 20 0', '26-35']];

	var popup = MM.sel('#MMpopup');
	popup.innerHTML = '';
	MM.addButton(popup, "X", [['id', 'MMpopupclose']]).addEventListener('click', function() { MM.sel('#MMpopup').style.display = 'none'; });
	popup.style.display = 'block';

	MM.addNewEl('h4', popup, null, "<img src='" + MM.src + "ico.png' /> " + MM.TEXT['minimap-title']);
	MM.addNewEl('p', popup, null, MM.TEXT['minimap-warning']);
	MM.addNewEl('p', popup, null, MM.TEXT['minimap-legend']).className = 'nospace';
	MM.addNewEl('p', popup, null, MM.TEXT['minimap-room']).className = 'nospace';

	var al = { fAl: 'fire', dAl: 'door', eAl: 'alert' }; //Incendies, portes, équipements
	for (var j in al)
	{
		var k = MM.sel('.alarm_bg [src$="/' + al[j] + '.png"]');
		al[j] = ((k) ? k.parentNode.getAttribute('onmouseover').replace(/\\r|\\n/g, '').replace(/\s+/g, ' ') : '');
	}

	var bloc = MM.addNewEl('div', popup, 'MMminimapbloc');
	var svg = MM.addNewEl('svg', bloc, 'MMminimap', null, [['width', '320'], ['height', '530']]);

	for (i = 0; i < rooms.length; i++)
	{
		var r = rooms[i];
		if (!r.length)
			{ continue; }

		var regexp = RegExp(MM.alertrooms[i] + '\\s\*\[\^2\]', 'g'); //Attention à Baie Alpha et Baie Alpha 2
		if (regexp.test(al.fAl))
			{ var roomclass = 'MMmaproom MMmapfire'; }
		else
			{ var roomclass = 'MMmaproom'; }
		if (r.length == 2) //Pièce non rectangulaire
		{
			MM.addNewEl('path', svg, null, null, [['d', r[0]], ['data-maproom', i], ['class', roomclass]]).addEventListener('click', function() {
				var halo = MM.sel('#MMmapselected');
				if (halo) { halo.id = ''; }
				MM.sel('#MMminimaproom').textContent = MM.localerooms[parseInt(this.getAttribute('data-maproom'))];
				this.id = 'MMmapselected';
			});
			var c = r[1];
		}
		else //Pièce rectangulaire
		{
			MM.addNewEl('rect', svg, null, null, [['width', r[0]], ['height', r[1]], ['x', r[2]], ['y', r[3]], ['data-maproom', i], ['class', roomclass]]).addEventListener('click', function() {
				var halo = MM.sel('#MMmapselected');
				if (halo) { halo.id = ''; }
				MM.sel('#MMminimaproom').textContent = MM.localerooms[parseInt(this.getAttribute('data-maproom'))];
				this.id = 'MMmapselected';
			});
			var c = [r[2] + (r[0] / 2), r[3] + (r[1] / 2) - 10];
		}

		//Avaries signalées
		//<div> plutôt que <text> car ce dernier n'est bizarrement pas supporté sur tous les navigateurs mobiles (coucou Dolphin)
		var rd = al.dAl.match(regexp);
		var re = al.eAl.match(regexp);
		if (rd) { rd = rd.length; }
		if (re) { re = re.length; }
		if (rd && re)
		{
			MM.addNewEl('div', bloc, null, rd, [['style', 'position: absolute; left: ' + (c[0] - 10) + 'px; top: ' + c[1] + 'px;'], ['class', 'MMmapalertd']]);
			MM.addNewEl('div', bloc, null, re, [['style', 'position: absolute; left: ' + (c[0] +5) + 'px; top: ' + c[1] + 'px;'], ['class', 'MMmapalerte']]);
		}
		else if (rd)
			{ MM.addNewEl('div', bloc, null, rd, [['style', 'position: absolute; left: ' + (c[0] - 5) + 'px; top: ' + c[1] + 'px;'], ['class', 'MMmapalertd']]); }
		else if (re)
			{ MM.addNewEl('div', bloc, null, re, [['style', 'position: absolute; left: ' + (c[0] - 5) + 'px; top: ' + c[1] + 'px;'], ['class', 'MMmapalerte']]); }
	}
	//Portes
	for (i = 0; i < doors.length; i++)
		{ MM.addNewEl('path', svg, null, null, [['d', 'm' + doors[i][0]], ['data-mapdoor', doors[i][1]], ['class', 'MMmapdoor']]); }
	var it = Main.items.iterator();
	while (it.hasNext())
	{
		var i = it.next();
		if (i.iid == 'DOOR')
			{ MM.sel('[data-mapdoor="' + i.key + '"]').setAttribute('class', 'MMmapdoorbroken'); }
	}
};

MM.changeTab = function(newtab) {
	//#room_col n'est pas caché pour que le jeu Flash fonctionne, juste hors-champ ; on fait glisser #content, la barre d'info et le logo/les liens/les onglets
	var char = MM.sel('#char_col');
	if (newtab == 'room_col')
	{
		MM.sel('#content').scrollLeft = 424;
		MM.sel('#topinfo_bar').style.left = '424px';
		MM.sel('.mxhead').style.left = '424px';
	}
	else
	{
		if (char.parentNode.getAttribute('data-visible-tab') == 'room_col') /* Si on vient de l'onglet Flash */
		{
			MM.sel('#content').scrollLeft = 0;
			MM.sel('#topinfo_bar').style.left = '0';
			MM.sel('.mxhead').style.left = '0';
		}
		char.style.display = 'none';
		MM.sel('#ship_tab').style.display = 'none';
		MM.sel('#room_tab').style.display = 'none';
		MM.sel('#chat_col').style.display = 'none';
		MM.sel('#' + newtab).style.display = 'block';
	}
	char.parentNode.setAttribute('data-visible-tab', newtab);
};


MM.MMhelp = function(e) {
	var el = document.elementFromPoint(e.clientX, e.clientY);
	for (i = 0; i < 5; i++)
	{
		if (el.onmouseover)
		{
			el.onmouseover();
			MM.sel('#MMhelpscreenB').style.display = 'block';
			break;
		}
		else if (el.getAttribute('data-tip')) //Item : 4 niveaux au-dessus
		{
			var name = decodeURIComponent(/namey[0-9]+:(.+)g$/.exec(el.getAttribute('data-tip'))[1]);
			var desc = el.getAttribute('data-desc').replace(/\\'/g, "'").replace(/\n|\r/g, '');
			Main.showTip(el, "<div class='tiptop'><div class='tipbottom'><div class='tipbg'><div class='tipcontent'><h1>" + name + "</h1>" + desc + "</div></div></div></div>");
			MM.sel('#MMhelpscreenB').style.display = 'block';
			break;
		}
		else
			{ el = el.parentNode; }
	}
};


MM.toggleAlertList = function(expand) {
	alerts = expand.parentNode;
	if (alerts.className == 'MMhidden_alerts')
	{
		alerts.className = 'MMshown_alerts';
		expand.textContent = MM.TEXT['hide_alert_reports'];
	}
	else
	{
		alerts.className = 'MMhidden_alerts';
		expand.textContent = MM.TEXT['show_alert_reports'];
	}
};


MM.changeRoom = function(el) {
	var select = MM.sel('#roomselect');
	var roomname = select.options[select.selectedIndex].text;
	if (select.value == 'NULL')
		{ alert(MM.TEXT['unvalid_move']); }
	else
	{
		//Vérification (non-bloquante) d'énergie pour se déplacer
		var energy = false;
		if (MM.sel('[src$="/pa1.png"]') || MM.sel('[src$="/pa2.png"]'))
			{ energy = true; }
		//Monture non fonctionnelle aux cycles impairs
		var boulder = false;
		if (MM.sel('#myInventory [style*="rolling_boulder.jpg"]') && !(parseInt(MM.sel('.cycletime').textContent.match(/([0-9]+)/g)[1]) % 2))
			{ boulder = true; }
		var disabled = MM.sel('.statuses [src$="disabled.png"]');
		/* Soit :
		- on n'est pas handicapé et on n'a pas d'énergie ;
		- on est handicapé, on est seul, et soit on n'a pas d'énergie, soit le Simulateur de gravité est en panne et ni compétence Sprinter, ni Trottinette ni Monture rocheuse fonctionnelle sur soi. */
		if
		(
			(!disabled && !energy)
			||
			(disabled && MM.ME_ALONE
				&& (!energy || (!MM.GRAVITY && !MM.sel('#char_col [src$="skills/sprint.png"]') && !MM.sel('#myInventory [style*="antigrav_scooter.jpg"]') && !boulder))
			)
		)
		{
			if (!confirm(MM.TEXT['move_alert']))
				{ return false; }
		}
		
		if (MM.GUARDIAN && !confirm(MM.TEXT['move_guardian']))
			{ return false; }
		
		if (confirm(MM.TEXT['move_confirm'] + roomname + " ?"))
		{
			el.firstChild.firstChild.innerHTML = "<img class='cdLoading' src='/img/icons/ui/loading1.gif' alt='loading…' /> " + MM.TEXT['move_button'];
			if (MM.ME_MODULING) //Si le joueur est en train d'accéder à un terminal, il gardera le statut Concentré ; il faut donc quitter avant
			{
				MM.MMexitModule(function() {
					MM.sel('#MMloadscreen').style.display = 'block';
					Main.ajax('/?fa=81&fp=' + select.value, null, function() {
						MM.changeTab('room_tab');
						MM.sel('#MMloadscreen').style.display = 'none';
					});
				});
			}
			else
				{ Main.ajax('/?fa=81&fp=' + select.value); }
		}
	}
};


MM.displayRoomActions = function(type, serial) { //0: personnage; 1: équipment; 3: chat
	var herohalo = MM.sel('#MMheroselected'); //Halo autour d'un personnage ou de Schrödinger
	var itemhalo = MM.sel('.MMselected'); //Halo autour d'un item de l'inventaire MM
	if (itemhalo)
		{ itemhalo.parentNode.removeChild(itemhalo); }

	switch (type)
	{
		case 0: //Personnage
			MM.sel('#equipmentselect').selectedIndex = 0;
			var selectedhero = MM.sel('[data-serial="' + serial + '"]');

			if (herohalo)
			{
				if (herohalo.parentNode == selectedhero)
				{
					selectedhero.removeChild(herohalo);
					MM.updateRoomActions(4);
					break;
				}
				else
					{ herohalo.parentNode.removeChild(herohalo); }
			}
			var hero = Main.heroes.get(serial);
			MM.moveEl(MM.addNewEl('img', null, 'MMheroselected', null, [['src', selectedhero.lastElementChild.getAttribute('src').replace(/\.png/, '_selected.png')]]), selectedhero, selectedhero.lastElementChild);
			MM.updateRoomActions(type, serial);
			break;

		case 1: //Équipement
			if (herohalo)
				{ herohalo.parentNode.removeChild(herohalo); }
				
			var serial = MM.sel('#equipmentselect').value;
			if (serial == 'NULL')
				{ MM.updateRoomActions(4); }
			else
				{ MM.updateRoomActions(type, serial); }
			break;

		case 3: //Chat
			MM.sel('#equipmentselect').selectedIndex = 0;
			var cat = MM.sel('[data-serial="' + serial + '"]');

			if (herohalo)
			{
				if (herohalo.parentNode == cat)
				{
					cat.removeChild(herohalo);
					MM.updateRoomActions(4);
					break;
				}
				else
					{ herohalo.parentNode.removeChild(herohalo); }
			}
			MM.moveEl(MM.addNewEl('img', null, 'MMheroselected', null, [['src', MM.src + "ui/chars/schrodinger_selected.png"]]), cat, cat.lastElementChild);
			MM.updateRoomActions(type, serial);
			break;
	}
};


MM.updateRoomActions = function(type, serial) { //0: personnage; 1: équipment; 2: item; 3: chat; 4: reset
	var actionListA = MM.sel('#MMroomActionList1');
	var actionListB = MM.sel('#MMroomActionList2');

	//Reset au début nécessaire dans tous les cas
	actionListA.innerHTML = "";
	actionListB.innerHTML = "";
	MM.sel('#MMtt_itemname').innerHTML = '';
	MM.sel('#MMitemdesc').innerHTML = "";
	actionListA.parentNode.className = '';

	if (typeof serial == 'undefined' || serial == 'NULL')
		{ type = 4; }

	switch (type) {
		case 0: //Personnage
			var hero = Main.heroes.get(serial);
			MM.addNewEl('div', actionListA, null, null, [['class', 'cdFace face portrait_' + hero.dev_surname]]); //Portrait
			var herostatus = MM.addNewEl('div', actionListA, null, null, [['class', 'status']]);
			MM.addNewEl('div', herostatus, null, hero.name, [['class', 'cdCharName charname']]); //Nom

			//Statuts
			var statuslist = MM.addNewEl('ul', herostatus, null, null, [['class', 'cdStatusList']]);
			var statuses = hero.statuses.iterator();
			while (statuses.hasNext())
			{
				var status = statuses.next();
				MM.addNewEl('li', statuslist, null, '<img src="/img/icons/ui/status/' + status.img + '.png" />', [['onmouseover', 'Main.showTip(this,"<div class=\'tiptop\' ><div class=\'tipbottom\'><div class=\'tipbg\'><div class=\'tipcontent\'><h1>' + status.name + '</h1>' + status.desc + '</div></div></div></div>");'], ['onmouseout', 'Main.hideTip();']]);
			}

			//Titres
			var titles = hero.titles.iterator();
			while (titles.hasNext())
			{
				var title = titles.next();
				MM.addNewEl('li', statuslist, null, '<img src="/img/icons/ui/' + title.img + '.png" />', [['onmouseover', 'Main.showTip(this,"<div class=\'tiptop\' ><div class=\'tipbottom\'><div class=\'tipbg\'><div class=\'tipcontent\'><h1>' + title.name + '</h1>' + title.desc + '</div></div></div></div>");'], ['onmouseout', 'Main.hideTip();']]);
			}

			//Spores
			if (hero.spores != null)
				{ MM.addNewEl('li', MM.addNewEl('span', statuslist), null, "<img src='" + hero.spores.img + "' />x" + hero.spores.nb); }

			//Bio courte
			MM.addNewEl('div', actionListA, null, hero.short_desc, [['class', 'presentation']]);

			//Compétences
			var skillslist = MM.addNewEl('ul', actionListA, null, null, [['class', 'cdSkills skills']]);
			var skills = hero.skills.iterator();
			while (skills.hasNext())
			{
				var skill = skills.next();
				MM.addNewEl('li', skillslist, null, '<img src="/img/icons/skills/' + skill.img + '.png" />', [['onmouseover', 'Main.showTip(this,"<div class=\'tiptop\' ><div class=\'tipbottom\'><div class=\'tipbg\'><div class=\'tipcontent\'><h1>' + skill.name + '</h1>' + skill.desc.replace(/\n/g, '') + '</div></div></div></div>");'], ['onmouseout', 'Main.hideTip();']]);
			} //.replace car un retour à la ligne empêcherait l'infobulle d'être correcte pour certains navigateurs (ex. Prémonition)

			//Boutons d'action
			var actions = MM.toArray(document.querySelectorAll('.cdActionRepository [webdata="' + serial + '"]'));
			for (j = 0; j < actions.length; j++)
				{ MM.copyEl(actions[j], actionListB); }

			actionListA.parentNode.className = 'player';
			MM.sel('#MMtt_itemname').textContent = hero.name;
			break;

		case 1: //Équipement
			var actions = MM.toArray(document.querySelectorAll('.cdActionRepository [webdata="' + serial + '"]'));
			for (j = 0; j < actions.length; j++)
			{
				if (j % 2)
					{ MM.copyEl(actions[j], actionListB); }
				else
					{ MM.copyEl(actions[j], actionListA); }
			}

			MM.sel('#MMtt_itemname').textContent = MM.sel('[value="' + serial + '"]').textContent;
			break;

		case 2: //Item
			var actions = MM.toArray(document.querySelectorAll('.cdActionRepository [webdata="' + serial + '"]'));
			for (j = 0; j < actions.length; j++)
			{
				if (j % 2)
					{ MM.copyEl(actions[j], actionListB); }
				else
					{ MM.copyEl(actions[j], actionListA); }
			}

			item = MM.sel('[serial="' + serial + '"]');
			MM.sel('#MMtt_itemname').innerHTML = (
				(item.getAttribute('data-id') == 'BOOK')
				? decodeURIComponent(/namey[0-9]+:(.+)g$/.exec(item.getAttribute('data-tip'))[1]) //Pour obtenir la compétence de l'apprenton dans le nom
				: item.getAttribute('data-name') //Pour avoir les attributs (charges, objet lourd, caché…) dans les autres cas
			);
			if (MM.parameters['food-desc'] && item.getAttribute('data-id') == 'CONSUMABLE')
				{ MM.sel('#MMitemdesc').innerHTML = item.getAttribute('data-desc').replace(/\\r|\\n/g, '').replace(/\s+/g, ' ').replace(/\\'/g, "'"); }
			else
				{ MM.sel('#MMitemdesc').innerHTML = ''; }
			break;

		case 3: //Chat
			var action = document.querySelector('.cdActionRepository [webdata="' + serial + '"]'); //Une seule action, Prendre
			MM.copyEl(action, actionListA);

			MM.sel('#MMtt_itemname').textContent = 'Schrödinger';
			break;

		case 4: //Reset (déjà fait au début)
			break;
	}

};


MM.changeChatTab = function(el) {
	if (el.getAttribute('data-tab')) //Onglet original
	{
		MM.sel('#MMeditortab').className = 'tab taboff';
		MM.sel('#MMeditor').style.display = 'none';
		Main.selChat(parseInt(el.getAttribute('data-tab')));
    }
    
    else //Onglet Éditeur de messages
	{
		var tabs = MM.sel('#cdTabsChat').children;
		for (i = 0; i < tabs.length; i++)
			{ tabs[i].className = tabs[i].className.replace(/tabon/, 'taboff'); }
		MM.sel('#MMeditortab').className = 'tab tabon';

		//Onglets
		var walls = MM.sel('#chatBlock').children;
		for (i = 0; i < walls.length; i++)
			{ walls[i].style.display = 'none'; }
		MM.sel('#MMeditor').style.display = 'block';

		//Entrées de texte
		MM.sel('#wall').style.display = 'none';
		MM.sel('#privateform').style.display = 'none';
	}
};


MM.MMexitModule = function(func) {
	js.JQuery(".cdExitModuleButton").prepend("<img class='cdLoading' src='/img/icons/ui/loading1.gif' alt='loading…' />");
	js.JQuery("#input").attr("isModule", "false");
	Main.firstLabDone = false;
	Main.labPage = null;
	//Auparavant window.location, utilisation de Main.ajax() pour éviter le rechargement total
	var updtFunc = function(func) {
		MM.reInit();
		if (func) { func(); }
	};
	Main.ajax("/clearSessionMods", null, updtFunc);
	MM.changeTab('room_tab');
	MM.sel('#cdModuleContent').style.display = 'none';
	MM.sel('.cdExitModuleButton').style.display = 'none';
	MM.sel('#cdMainContent').style.display = 'block';
};


MM.changeActionFunctions = function() {
	//Boutons Nouveau cycle et Nouvelle étape
	MM.sel('#txt_new_cycle a').setAttribute('onclick', 'Main.ajax("/", null, function() { MM.reInit(); Main.onLoad(1); Main.enableClock = true; }); return false;');
	MM.sel('#txt_new_step a').setAttribute('onclick', 'Main.ajax("/", null, function() { MM.reInit(); Main.onLoad(1); Main.enableClock = true; }); return false;');
	//Boutons d'action
	var actions = document.querySelectorAll('.but:not(.fake) [href^="?action="]');
	for (i = 0; i < actions.length; i++)
	{
		if (!actions[i].getAttribute('onclick').match(/MM\./))
			{ actions[i].setAttribute('onclick', 'if (!MM.beforeAction(this)) { return false; } ' + actions[i].getAttribute('onclick')); }
	}
	//En cas d'accès à un terminal, changement de Main.exitModule() en MM.MMexitModule()
	var exitmodule = MM.sel('.cdExitModuleButton');
	if (exitmodule)
		{ exitmodule.setAttribute('onclick', 'MM.MMexitModule(); return false;'); }
};


MM.beforeAction = function(el) {
	//Sauvegarde du message de l'éditeur
	var wallpost = MM.sel('#tid_wallPost');
	if (wallpost && wallpost.value)
		{ MM.previewtext = wallpost.value.slice(0, 2500); }

	//Confirmation d'action
	if (MM.parameters['confirm-action'])
	{
		if (!confirm(MM.TEXT['confirm_action'] + el.innerHTML.trim().replace(/ ?<img(?:.*)\/?>/g, MM.TEXT['ap']).replace(/<\/?span>/g, '').replace(/\s+/g, ' ') + "' ?"))
			{ return false; }
	}

	//Changement d'onglet MushMobile
	var action = Main.extractAction(el.getAttribute('href'));
	//Accéder à un terminal ou au Bloc de post-it, Envoyer une mission
	if (['ACCESS', 'COMMANDER_ORDER'].indexOf(action) != -1)
		{ MM.changeTab('room_col'); }
	//Examiner, Lire, Vérifier son niveau pré-fongique, Lister l'équipage, Lire le niveau de fuel dans la Chambre de combustion
	else if (['INSPECT', 'CONSULT_DOC', 'CHECK_FOR_INFECTION', 'CHECK_CREW_LIST', 'CHECK_LEVEL'].indexOf(action) != -1)
		{ MM.changeTab('chat_col'); }

	return true;
};


MM.reInit = function() {
	MM.sel('#ship_tab').innerHTML = '';
	MM.sel('#room_tab').innerHTML = '';
	MM.charTab();
	MM.shipTab();
	MM.roomTab();
	MM.chatTab();
	MM.gameTab();
	MM.messageEditor();
	MM.changeActionFunctions();
	MM.sel("#MMbar .cycletime").textContent = MM.sel("#chat_col .cycletime").textContent;

	MM.ME_NERON = false;
	MM.ME_ALONE = true;
	MM.ME_MODULING = false;
	MM.GUARDIAN = false;
	MM.GRAVITY = true;
};


MM.showLicense = function() {
	var popup = MM.sel('#MMpopup');
	popup.innerHTML = '';
	MM.addButton(popup, "X", [['id', 'MMpopupclose']]).addEventListener('click', function() { MM.sel('#MMpopup').style.display = 'none'; });
	MM.addNewEl('div', popup, null, MM.TEXT['license']);
};



/* FONCTIONS RELATIVES À L'INVENTAIRE MUSHMOBILE */

MM.selectItem = function(item) {
	var itemchild = item.firstElementChild; //Soit le halo de sélection, soit l'image de l'objet
	if (itemchild.className == 'MMselected')
	{
		item.removeChild(itemchild);
		MM.updateRoomActions(4); //Reset
	}
	else
	{
		var itemhalo = MM.sel('.MMselected');
		if (itemhalo)
			{ itemhalo.parentNode.removeChild(itemhalo); }
		MM.moveEl(MM.addNewEl('div', null, null, null, [['class', 'MMselected']]), item, itemchild);
		MM.updateRoomActions(2, item.getAttribute('serial'));
	}

	MM.sel('#equipmentselect').selectedIndex = 0;
	var heroselection = MM.sel('#MMheroselected');
	if (heroselection)
		{ heroselection.parentNode.removeChild(heroselection); }
};


MM.itemLeft = function() {
	var inventory = MM.sel('#MMroom');
	var arrowleft = MM.sel('#MMtt_itemname').previousElementSibling;
	var arrowright = MM.sel('#MMtt_itemname').nextElementSibling;
	var shift = -parseInt(inventory.style.marginLeft) || 0;
	if (shift > 0)
	{
		var newshift = shift - 56;
		if (newshift == 0)
			{ arrowleft.className += " off"; }
		if (inventory.children.length - (newshift / 56) > 7)
			{ arrowright.className = arrowright.className.replace(/ off/, ''); }
		else
			{ arrowright.className += ' off'; }
		inventory.style.marginLeft = '-' + newshift + 'px';
	}
};


MM.itemRight = function() {
	var inventory = MM.sel('#MMroom');
	var arrowleft = MM.sel('#MMtt_itemname').previousElementSibling;
	var arrowright = MM.sel('#MMtt_itemname').nextElementSibling;
	var shift = -parseInt(inventory.style.marginLeft) || 0;
	if (shift < ((inventory.children.length - 7) * 56))
	{
		var newshift = shift + 56;
		if (newshift == ((inventory.children.length - 7) * 56))
			{ arrowright.className += " off"; }
		arrowleft.className = arrowleft.className.replace(/ off/, '');
		inventory.style.marginLeft = '-' + newshift + 'px';
	}
};



/* FONCTIONS RELATIVES AUX PARAMÈTRES MUSHMOBILE */

MM.getMMParameters = function() {
	MM.parameters = {};
	MM.parameters['first-time'] = true;
	MM.parameters['confirm-action'] = true;
	MM.parameters['food-desc'] = true;
	MM.parameters['forced-locale'] = false;
	MM.parameters['locale'] = '0'; //0: non forcé ; 1: français ; 2: anglais

	var offset = document.cookie.search('MMparams');
	if (offset != -1)
	{
		var parameters = document.cookie.slice(offset + 9); //Pas de fin en cas d'ajout de paramètres ; les nouveaux prendront simplement la valeur false
		MM.parameters['first-time'] = ((parameters[0] == '1') ? true : false);
		MM.parameters['confirm-action'] = ((parameters[1] == '1') ? true : false);
		MM.parameters['food-desc'] = ((parameters[2] == '1') ? true : false);
		MM.parameters['forced-locale'] = ((['1', '2'].indexOf(parameters[3]) != -1) ? true : false);
		if (MM.parameters['forced-locale'])
			{ MM.parameters['locale'] = parseInt(parameters[3]); }
		else
			{ MM.parameters['locale'] = ['', 'mush.vg', 'mush.twinoid.com'].indexOf(document.domain); }
	}
	else
		{ MM.setMMParameters(); }

	return true;
	//MMparams=011
	//0123456789AB
};


MM.setMMParameters = function() {
	var parameters = '0'; //paramètre 'first-time' passant forcément à false
	parameters += ((MM.parameters['confirm-action']) ? 1 : 0);
	parameters += ((MM.parameters['food-desc']) ? 1 : 0);
	parameters += ((MM.parameters['forced-locale']) ? MM.parameters['locale'] : 0);

	var date = new Date();
	date.setTime(date.getTime() + 31536000000);
	document.cookie = 'MMparams=' + parameters + '; expires=' + date.toGMTString() + '; path=/';
};


MM.buildParamsMenu = function() {
	var popup = MM.sel('#MMpopup');
	popup.innerHTML = '';

	MM.addButton(popup, "X", [['id', 'MMpopupclose']]).addEventListener('click', function() { MM.sel('#MMpopup').style.display = 'none'; });
	MM.addNewEl('h4', popup, null, MM.TEXT['MMparams_title'] + "  <img src='" + MM.src + "ico.png' />");

	var parameters = ['confirm-action', 'food-desc', 'forced-locale'];
	for (i = 0; i < parameters.length; i++)
	{
		var parameter = parameters[i];
		var div = MM.addNewEl('div', popup);
		if (MM.parameters[parameter])
		{
			MM.addNewEl('input', div, null, null, [['type', 'checkbox'], ['checked', 'true']]);
			div.addEventListener('click', function() { MM.parameters[parameter] = false; MM.setMMParameters(); });
		}
		else
		{
			MM.addNewEl('input', div, null, null, [['type', 'checkbox']]);
			div.addEventListener('click', function() { MM.parameters[parameter] = true; MM.setMMParameters(); });
		}
		div.innerHTML += MM.TEXT['MMparams_' + parameter];
		div.className = 'MMparamsdiv';
	}

	MM.addNewEl('p', popup, null, MM.TEXT['MMparams_lang-title']);
	var langs = MM.addNewEl('select', popup, 'MMlangselect');
	MM.addNewEl('option', langs, null, "Français", ((MM.parameters['locale'] == 1) ? [['value', '1'], ['selected', 'selected']] : [['value', '1']]));
	MM.addNewEl('option', langs, null, "English", ((MM.parameters['locale'] == 2) ? [['value', '2'], ['selected', 'selected']] : [['value', '2']]));
	langs.addEventListener('change', function() { MM.parameters['locale'] = this.value; MM.locale(); MM.setMMParameters(); });

	//Boutons DEBUG pour l'affichage des inventaires
	MM.addButton(popup, MM.TEXT['inventory_debug']).addEventListener('click', function() { MM.sel('#MMcdInventory').firstElementChild.style.display = 'block'; });
	MM.addButton(popup, MM.TEXT['show-flash-inventory']).addEventListener('click', function() {
		MM.changeTab('room_col');
		MM.sel('#cdInventory').style.visibility = 'visible';
		MM.sel('#cdInventory').firstElementChild.style.display = 'block';
		MM.sel('#roomActionList1').style.opacity = 1;
		MM.sel('#roomActionList2').style.opacity = 1;
	});

	MM.addNewEl('p', popup, null, MM.TEXT['MMparams_credits']);
};



/* FONCTIONS D'ADAPTATION DE L'INTERFACE */

MM.initCss = function() {
	MM.addNewEl('link', document.head, null, null, [['rel', 'stylesheet'], ['href', MM.src + "MushMobile.css"], ['type', 'text/css']]);
	MM.addNewEl('meta', document.head, null, null, [['name', 'viewport'], ['content', 'width=424px, initial-scale=' + screen.width / 424]]);

	MM.addNewEl('img', document.body, 'MMicon', null, [['src', MM.src + "ico.png"]]);
	MM.moveEl(MM.addNewEl('img', null, 'MMbottom', null, [['src', MM.src + "ui/bottom.png"]]), document.body, MM.sel('#tid_bar_down'));

	//Styles CSS basés sur des URLs
	var relcss = MM.addNewEl('style', document.head);
	//Bloc conteneur d'onglets
	relcss.innerHTML += '#content { background: transparent url("' + MM.src + 'ui/background.png"); }\n';
	//Fenêtre d'alerte (« Vous vous êtes sali… »)
	relcss.innerHTML += '.poptop { background: transparent url("' + MM.src + 'ui/poptop.png") no-repeat left top; }\n';
	relcss.innerHTML += '.poptop .popbottom { background: transparent url("' + MM.src + 'ui/popbottom.png") no-repeat left bottom; }\n';
	relcss.innerHTML += '.poptop .popbg { background: transparent url("' + MM.src + 'ui/popbg.png") repeat left bottom; }\n';
	//Barre de liens
	relcss.innerHTML += '#MMlinks { background: transparent url("' + MM.src + 'ui/background.png"); }\n';
	//Conteneurs compétences
	relcss.innerHTML += 'li.skill { background-image: url("' + MM.src + 'ui/skillblock.png"); }\n';
	relcss.innerHTML += '.once_skill .container { background-image: url("' + MM.src + 'ui/once_skill.png"); }\n';
	relcss.innerHTML += '.gold_skill .container { background-image: url("' + MM.src + 'ui/gold_skill.png"); }\n';
	//Énergie
	relcss.innerHTML += '#MMenergybar td { background: transparent url("' + MM.src + 'ui/pabar.png") no-repeat left top; }';
};


MM.initMenubar = function() {
	var bar = MM.moveEl(MM.addNewEl('div', null, 'MMbar'), MM.sel('.mxhead'), MM.sel('.mainmenu'));

	// BARRE MUSHMOBILE //
	//Rechargement interne de la page
	MM.addButton(bar, "<img src='" + MM.src + "ui/reload_Mush.png' />").addEventListener('click', function() {
		MM.sel('#MMloadscreen').style.display = 'block';
		Main.ajax('/', null, function() { MM.reInit(); MM.sel('#MMloadscreen').style.display = 'none'; });
	});
	MM.addNewEl('div', document.body, 'MMloadscreen', "<img src='/img/icons/ui/loading1.gif' />").addEventListener('click', function() { this.style.display = 'none'; });

	//Aide
	MM.addButton(bar, "<img src='http://mush.vg/img/icons/ui/infoalert.png' />?").addEventListener('click', function() { MM.sel('#MMhelpscreenA').style.display = 'block'; });
	//Premier écran noir : sélectionner l'élément ; second écran noir : cacher l'infobulle (sinon elle reste)
	MM.addNewEl('div', document.body, 'MMhelpscreenA', MM.TEXT['help_screen_A']).addEventListener('click', function(e) { this.style.display = 'none'; MM.MMhelp(e); });
	MM.addNewEl('div', document.body, 'MMhelpscreenB', MM.TEXT['help_screen_B']).addEventListener('click', function(e) { this.style.display = 'none'; Main.hideTip(); });

	MM.copyEl(MM.sel('.cycletime'), bar); //Jour et cycle
	MM.copyEl(MM.sel('.cdShipCasio'), bar); //Horloge

	//Paramètres MushMobile
	MM.addNewEl('img', bar, 'MMparams', null, [['src', MM.src + "ui/params.png"]]).addEventListener('click', function() {
		MM.buildParamsMenu();
		MM.sel('#MMpopup').style.display = 'block';
	});


	//Liens
	var links = MM.sel('#menuBar').children;
	for (i = 0; i < links.length; i++)
		{ links[i].firstElementChild.setAttribute('target', '_blank'); }

	//Onglets MushMobile
	var menu = MM.addNewEl('ul', MM.sel('.mxhead'), 'MMtabs');
	MM.addNewEl('li', menu, null, "<img src='/img/icons/ui/noob.png' />" + MM.TEXT['tabs_char']).addEventListener('click', function() { MM.changeTab('char_col'); });
	MM.addNewEl('li', menu, null, "<img src='/img/icons/ui/pa_core.png' />" + MM.TEXT['tabs_ship']).addEventListener('click', function() { MM.changeTab('ship_tab'); });
	MM.addNewEl('li', menu, null, "<img src='/img/icons/ui/door.png' />" + MM.TEXT['tabs_room']).addEventListener('click', function() { MM.changeTab('room_tab'); });
	MM.addNewEl('li', menu, null, "<img src='/img/icons/ui/wall.png' />" + MM.TEXT['tabs_chat']).addEventListener('click', function() { MM.changeTab('chat_col'); });
	MM.addNewEl('li', menu, null, "<img src='/img/icons/ui/moduling.png' />" + MM.TEXT['tabs_game']).addEventListener('click', function() { MM.changeTab('room_col'); });
	MM.addNewEl('li', menu, 'MMvending', "<img src='/img/icons/ui/credit_small.png' />" + MM.TEXT['tabs_shop']).addEventListener('click', function() {
		MM.sel('#MMvending').innerHTML = "<img src='/img/icons/ui/loading1.gif' />" + MM.TEXT['tabs_shop']; Main.ajax('/vending', null, function() {
			MM.reInit(); MM.changeTab('room_col'); MM.sel('#MMvending').innerHTML = "<img src='/img/icons/ui/credit_small.png' />" + MM.TEXT['tabs_shop'];
		});
	});

	MM.addNewEl('div', document.body, 'MMpopup').style.display = 'none';
	MM.buildParamsMenu();
};


MM.initTabs = function() {
	var tabs_box = MM.sel('#char_col').parentNode; //table.inter > tr
	tabs_box.setAttribute('data-visible-tab', 'char_col');
	tabs_box.id = 'tabs_box';

	var char_tab = MM.sel('#char_col');
	var ship_tab = MM.addNewEl('td', tabs_box, 'ship_tab');
	var room_tab = MM.addNewEl('td', tabs_box, 'room_tab');
	var chat_tab = MM.sel('#chat_col');
	var game_tab = MM.sel('#room_col');

	//#room_col doit être à droite pour que le .scrollLeft fonctionne correctement ; sinon il est directement après #char_col
	MM.moveEl(ship_tab, tabs_box, game_tab);
	MM.moveEl(room_tab, tabs_box, game_tab);
	MM.moveEl(chat_tab, tabs_box, game_tab);

	char_tab.style.display = 'block';
	ship_tab.style.display = 'none';
	room_tab.style.display = 'none';
	chat_tab.style.display = 'none';
	//Ne pas cacher game_tab (#room_col), ou le jeu Flash ne fonctionnera pas ; utiliser .scrollLeft
};


MM.charTab = function() {
	var sheetmain = MM.sel('.sheetmain');
	//Affiche les actions joueur, qui sont normalement cachées jusqu'au chargement du jeu Flash
	ActionListMaintainer.prototype.changeHeroListState2(["DisplayHeroActions", 0]);

	if (MM.sel('#MMenergybar')) //Si l'onglet n'a pas déjà été adapté
		{ return; }

	// COMPÉTENCES //
	MM.moveEl(MM.sel('[class="skills"]'), sheetmain, sheetmain.firstChild);

	// PERSONNAGE //
	//Bloc comprenant le portrait en fond (.avatar), le nom et les titres (.MMwho) en haut à gauche, le triomphe (triumphLi) en haut à droite, le niveau (.level) en bas à droite et le message de promo (.gogold) en bas, afin de pouvoir placer tous ces éléments en position:absolute
	var characterdiv = MM.moveEl(MM.addNewEl('div', null, 'MMcharacterdiv'), sheetmain, sheetmain.firstChild);
	MM.addNewEl('div', characterdiv, '', MM.sel('.who').parentNode.innerHTML).className = 'MMwho';
	var triumphLi = MM.sel('[src$="triumph.png"]').parentNode;
	MM.moveEl(MM.addNewEl('div', null, 'triumph', triumphLi.innerHTML.trim(), MM.getAttributesList(triumphLi)), characterdiv);
	MM.copyEl(MM.sel('.level'), characterdiv);
	MM.moveEl(MM.sel('.avatar'), characterdiv).className = 'avatar MM' + MM.sel('.who').textContent.trim().replace(" ", "_").toLowerCase();
	if (MM.sel('.gogold')) //Message « Achetez du mode Or »
		{ MM.moveEl(MM.sel('.gogold'), characterdiv); }

	// ÉNERGIE //
	//Copie des barres d'énergie pour les intégrer au tableau des barres de santé (plus léger et plus sûr niveau CSS que des position: dans tous les sens…)
	var MMenergybar = MM.addNewEl('tr', MM.sel('.pvsm').firstElementChild, 'MMenergybar');
	var oldPa = MM.sel('#cdPaBloc');
	var APbar = oldPa.children[2];
	MM.addNewEl('td', MMenergybar, null, APbar.innerHTML, MM.getAttributesList(APbar));
	var MPbar = oldPa.children[3];
	MM.addNewEl('td', MMenergybar, null, MPbar.innerHTML, MM.getAttributesList(MPbar));

	//Points d'action spéciaux : ont la forme Nombre:Image dans la structure HTML de base
	var extraAPs = MM.toArray(document.getElementsByClassName('extrapa'));
	if (extraAPs.length)
	{
		var extratd = MM.addNewEl('td', MM.addNewEl('tr', MM.sel('.pvsm').firstElementChild), 'MMextratd', null, [['colspan', '2']]);
		for (var i = 0; i < extraAPs.length; i++)
		{ 
			var extrapoint = MM.addNewEl('span', extratd, null, null, MM.getAttributesList(extraAPs[i]));
			MM.moveEl(extraAPs[i].lastElementChild, extrapoint); //Image
			MM.moveEl(extraAPs[i].firstElementChild, extrapoint); //Nombre
		}
	}

	oldPa.style.display = 'none';
};


MM.shipTab = function() {
	var ship_tab = MM.sel('#ship_tab');
	MM.addNewEl('h4', ship_tab, null, MM.TEXT['MM-added_tab']).className = 'MMtabwarning';
	MM.addNewEl('p', ship_tab, null, MM.TEXT['MM-added_tab_text']).className = 'MMtabwarning';

	// ALERTES //
	//Copie des alertes dans un format facilement lisible
	var alerts = MM.sel('.alarm_bg').firstElementChild;

	if (alerts.nodeName == 'IMG') //Vaisseau calme
		{ var alertsdiv = MM.addNewEl('div', ship_tab, 'MMalerts', MM.sel('.alarm_bg').innerHTML + MM.getTipContent(MM.sel('.alarm').parentNode.onmouseover), [['class', 'MMnoalert']]); }
	else
	{
		alerts = MM.copyEl(alerts, ship_tab);
		alerts.id = 'MMalerts';
		alerts.className = 'MMalerton';

		for (var i = 0; i < alerts.children.length; i++)
		{
			var alert = alerts.children[i];
			if (alert.onmouseover)
			{
				var alertContent = MM.addNewEl('div', alert, null, MM.getTipContent(alert.onmouseover)); //Texte
				MM.moveEl(alert.firstElementChild, alertContent.firstElementChild, alertContent.firstElementChild.firstChild); //Image

				//Liste de rapports (portes cassées, incendies…) → la liste est cachée (par CSS) et on ajoute un bouton « Afficher les rapports »
				if (alertContent.lastElementChild.nodeName == 'UL')
				{
					var span = MM.moveEl(MM.addNewEl('span', null, null, MM.TEXT['show_alert_reports'], [['class', 'MMalertexpand']]), alertContent, alertContent.getElementsByClassName('ul')[0]);
					span.addEventListener('click', function() { MM.toggleAlertList(this); });
					alertContent.className = 'MMhidden_alerts';
				}

				//Mis à zéro, sinon l'infobulle s'affiche en passant la souris/le doigt sur l'alerte déjà lisible
				alert.onmouseover = '';
				alert.onmouseout = '';
			}

			if (alert.innerHTML.match(/simulator.png/))
				{ MM.GRAVITY = false; }
		}

		var alarmtext = MM.sel('.alarm_bg li:first-of-type');
		alarmtext.textContent = alarmtext.textContent.replace(/:/, '!');
	}

	MM.sel('.alarm').addEventListener('click', function() { MM.changeTab('ship_tab'); }); //Un clic renvoie aux alertes détaillées

	// EXPÉDITION //
	var expoblock = MM.sel('.exploring');
	if (expoblock)
	{
		var firstalert = MM.sel('.alarm_bg li:first-of-type');
		MM.copyEl(expoblock, ship_tab).style.display = 'block'; //Copie, et pas déplacement, sinon le bloc est perdu au rechargement interne
		expoblock.style.display = 'none';
		MM.moveEl(MM.addNewEl('img', null, null, null, [['src', '/img/icons/ui/planet.png']]), firstalert, firstalert.firstChild); //Icône planète = expédition en cours
	}

	// PROJETS, RECHERCHES & PILGRED //
	//.MMcardsbreak : saut de ligne
	MM.addNewEl('h4', ship_tab, null, MM.TEXT['cards-title']);
	var newcards = MM.copyEl(MM.sel('#cdBottomBlock'), ship_tab).firstElementChild;
	if (MM.sel('#MMcdBottomBlock .research'))
		{ MM.moveEl(MM.addNewEl('li'), newcards, MM.sel('#MMcdBottomBlock .research').parentNode).className = 'MMcardsbreak'; }
	if (MM.sel('#MMcdBottomBlock .pilgred'))
		{ MM.moveEl(MM.addNewEl('li'), newcards, MM.sel('#MMcdBottomBlock .pilgred').parentNode).className = 'MMcardsbreak'; }

	// BOUCLIER PLASMA //
	if (!MM.sel('[src$="plasma.png"]'))
	{
		var levels = MM.sel('.spaceshipstatus').firstElementChild;
		var plasmalevel = levels.children[2].getAttribute('onmouseover').match(/: ([0-9]+)/g); //Renvoie [': XX' (coque), ': XX' (plasma)]
		if (typeof plasmalevel[1] != 'undefined')
		{
			var li = MM.addNewEl('li', null, null, plasmalevel[1].slice(2) + ' <img src="/img/icons/ui/plasma.png" />');
			li.onmouseover = function() { Main.showTip(this, MM.TEXT['plasma-onmouseover']); };
			li.onmouseout = function() { Main.hideTip(); };
			MM.moveEl(li, levels, levels.children[3]);
		}
	}
};


MM.roomTab = function() {
	var room_tab = MM.sel('#room_tab');
	MM.addNewEl('h4', room_tab, null, MM.TEXT['MM-added_tab']).className = 'MMtabwarning';
	MM.addNewEl('p', room_tab, null, MM.TEXT['MM-added_tab_text']).className = 'MMtabwarning';

	// INCENDIE DANS LA PIÈCE //
	var infobar = MM.sel('#topinfo_bar');
	var fireroom = MM.alertrooms[MM.rooms.indexOf(MM.sel('#input').getAttribute('d_name'))]; //Voir .alertrooms
	if (MM.sel('[href^="?action=SIGNAL_FIRE"]') //Pas encore signalé
		|| (document.querySelector('.alarm [src$="fire.png"]') //Signalé
		   && RegExp(fireroom + '\\s\*\[\^2\]').test(MM.getTipContent(document.querySelector('.alarm [src$="fire.png"]').parentNode.onmouseover)))
	)
	{
		infobar.className += ' MMfire'; //Changement du fond de la barre d'info
		MM.addNewEl('p', room_tab, 'MMfiretext', MM.TEXT['fire'], [['class', 'MMfire']]); //Ajout d'un texte
	}
	else //Remise à zéro
	{
		infobar.className = 'topinfo';
		if (MM.sel('#MMfiretext'))
			{ room_tab.removeChild(MM.sel('#MMfiretext')); }
	}

	// SE DÉPLACER //
	var doors = [[10,13,24],[11,25,32,29,3],[14,25,34,30,26],[1,26,12,9],[26],[6,24,14],[24,5],[25],[24,31],[28,15,12,33,35,3],[0,24],[31,1],[3,9],[0,24],[5,2],[28,9],[],[],[],[],[],[],[],[],[0,10,13,6,5,8,31,25],[2,24,7,1],[2,29,30,4,3,28,33,35],[],[26,15,9],[1,26],[2,26],[24,8,11],[1],[26,9],[2],[26,9],[],[]];
   
	var roomname = MM.sel('#input').getAttribute('d_name');
	var room = MM.rooms.indexOf(roomname);

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

		MM.addNewEl('b', MM.addNewEl('p', room_tab, null, MM.TEXT['current_room']), null, MM.localerooms[room]);
		var roomdoors = MM.addNewEl('select', room_tab, 'roomselect');
		MM.addButton(room_tab, MM.TEXT['move_button']).addEventListener('click', function() { MM.changeRoom(this); });

		for (i = 0; i < doors[room].length; i++)
		{
			var door = doors[room][i];
			if (brokendoors.indexOf(door) != -1)
				{ MM.addNewEl('option', roomdoors, null, MM.localerooms[door] + MM.TEXT['broken_door'], [['value', 'NULL'], ['class', 'MMbrokendoor']]); }
			else
				{ MM.addNewEl('option', roomdoors, null, MM.localerooms[door], [['value', door]]); }
		}
	}

	// ÉQUIPEMENTS //
	MM.addNewEl('p', room_tab, null, MM.TEXT['equipments']);
	var equipmentlist = MM.addNewEl('select', room_tab, 'equipmentselect');
	equipmentlist.addEventListener('change', function() { MM.displayRoomActions(1); });
	MM.addNewEl('option', equipmentlist, null, "—", [['value', 'NULL']]);

	var items = Main.items.iterator();
	while (items.hasNext())
	{
		var item = items.next();
		switch (item.iid)
		{
			case 'DOOR': //Portes cassées
				var j = item.key.split('-');
				if (j[0] == room)
					{ eqname = MM.TEXT['door_to'] + MM.localerooms[j[1]]; }
				else
					{ eqname = MM.TEXT['door_to'] + MM.localerooms[j[0]]; }
				break;

			case 'ROTATIONAL_REACTOR': //Réacteurs rotationnels, listés par le jeu de droite à gauche
			case 'BED': //Lits
			case 'PATROL_INTERFACE': //Patrouilleurs
				eqname = MM.TEXT[item.key];
				if (!eqname)
					{ eqname = MM.TEXT[item.iid + '_unknown']; }
				break;

			default: //Autres équipements (sans aucune particularité) et items
				if (MM.sel('[serial="' + item.serial + '"]')) //Si c'est un item, on ne l'ajoute pas à la liste des équipements
					{ eqname = null; }
				else
					{ eqname = item.name; }
				break;
		}
		if (eqname)
		{
			var actions = document.querySelectorAll('[webdata="' + item.serial + '"]');
			for (i = 0; i < actions.length; i++)
			{
				if (actions[i].innerHTML.indexOf('REPAIR_OBJECT') != -1 || actions[i].innerHTML.indexOf('REPAIR_PATROL_SHIP') != -1)
					{ eqname += ((item.iid == 'DOOR') ? MM.TEXT['broken_door'] : MM.TEXT['broken']); }
			}
			MM.addNewEl('option', equipmentlist, null, eqname, [['value', item.serial]]);
		}
	}

	// CAMARADES //
	var herolist = MM.addNewEl('ul', room_tab, 'MMheroes');

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
					{ MM.ME_NERON = true; }
			}
		}
		else
			{ MM.ME_ALONE = false; }

		while (statuses.hasNext())
		{
			var status = statuses.next();
			if (status.img == 'berzerk')
				{ berzerk = true; }
			else if (status.img == 'laid')
				{ laid = true; }
			else if (status.img == ('mastered' || 'guardian'))
				{ MM.GUARDIAN = true; }
				
			if (hero.me && status.img == 'moduling')
				{ MM.ME_MODULING = true; }
		}

		var block = MM.addNewEl('li', herolist, null, null, [['class', 'MMheroblock'], ['data-serial', hero.serial]]);
		block.addEventListener('click', function() { MM.displayRoomActions(0, this.getAttribute('data-serial')); });


		if (berzerk)
			{ MM.addNewEl('img', block, null, null, [['src', MM.src + "ui/chars/berzerk.png"]]); }
		else
		{
			if (laid)
			{
				if (room == 5)
					{ MM.addNewEl('img', block, null, null, [['src', MM.src + "ui/bed_medlab.png"]]); }
				else
					{ MM.addNewEl('img', block, null, null, [['src', MM.src + "ui/bed_" + (Math.floor(Math.random() * 6) + 1) + ".png"]]); }
				MM.addNewEl('img', block, null, null, [['src', MM.src + "ui/chars/" + hero.dev_surname + "-laid.png"]]);
				if (herolist.children.length > 1)
					{ MM.moveEl(block, herolist, herolist.firstChild); }
				block.className += ' MMlaid';
			}
			else
				{ MM.addNewEl('img', block, null, null, [['src', MM.src + "ui/chars/" + hero.dev_surname + ".png"]]); }
		}
	}

	// SCHRÖDINGER //
	var cat = Main.npc.iterator();
	if (cat.hasNext())
	{
		var catli = MM.addNewEl('li', herolist, null, "<img src='" + MM.src + "ui/chars/schrodinger.png' />", [['class', 'MMheroblock'], ['data-serial', cat.next().serial]]);
		catli.addEventListener('click', function() { MM.displayRoomActions(3, this.getAttribute('data-serial')); });
	}

	// INVENTAIRE (COPIÉ) //
	var invblock = MM.copyEl(MM.sel('#cdInventory'), MM.sel('#room_tab'));
	invblock.style.visibility = 'visible';
	invblock.firstElementChild.style.display = 'block';
	MM.sel('#MMroomActionList1').style.opacity = 1;
	MM.sel('#MMroomActionList2').style.opacity = 1;

	//Changement des fonctions Main par les fonctions MM
	MM.sel('#MMtt_itemname').previousElementSibling.setAttribute('onclick', 'MM.itemLeft();');
	MM.sel('#MMtt_itemname').nextElementSibling.setAttribute('onclick', 'MM.itemRight();');
	var inventory = MM.sel('#MMroom');
	for (i = 0; i < inventory.children.length; i++)
		{ inventory.children[i].setAttribute('onclick', 'MM.selectItem(this);'); }

	MM.moveEl(MM.addNewEl('div', null, 'MMitemdesc', null), invblock, invblock.lastElementChild);
};


MM.chatTab = function() {
	var chat = MM.sel('#cdMainChat');
	if (chat.className.search(/MM(hide|show)paste/) == -1)
	{
		chat.className = 'MMhidepaste';
		//#wall : création d'un nouveau topic général ; #privateform : création d'un message privé
		var wallinputs = [['#wall', '#cdChatInput5'], ['#privateform', '#cdChatInput7']];
		for (i = 0; i < wallinputs.length; i++)
		{
			var input = MM.sel(wallinputs[i][1]);
			input.setAttribute('onfocus', '$(this).addClass("chatboxfocus"); return true;'); //Main.onChatFocus ne fait qu'empêcher le collage… -_-
			input.value = '';
			MM.addButton(MM.sel(wallinputs[i][0]), MM.TEXT['paste'], [['class', 'MMpastebutton'], ['data-id', wallinputs[i][1]]]).addEventListener('click', function() {
				if (MM.previewtext)
				{
					var t = MM.sel(this.getAttribute('data-id'));
					t.value = MM.previewtext;
					t.focus();
				}
				MM.sel('#cdMainChat').className = 'MMhidepaste';
			});
		}
	}

	//Topics
	var units = document.getElementsByClassName('unit');
	for (i = 0; i < units.length; i++)
	{
		if (units[i].lastElementChild.className != 'but MMpastebutton')
		{
			MM.addButton(units[i], MM.TEXT['paste'], [['class', 'MMpastebutton'], ['data-id', units[i].getAttribute('data-k')]]).addEventListener('click', function() {
				if (MM.previewtext)
				{
					var t = MM.sel('#wall_reply_' + this.getAttribute('data-id'));
					t.value = MM.previewtext;
					t.parentNode.parentNode.parentNode.className = 'blockreply';
					t.focus();
				}
				MM.sel('#cdMainChat').className = 'MMhidepaste';
			});
		}
	}

	//Fonction répétée lors du chargement de nouveaux messages pour relancer MM.chatTab() une fois ces messages chargés
	MM.sel('#chatBlock').setAttribute('onscroll', 'Main.onChatScroll( $(this) ); var chatloading = window.setInterval(function() { if (!Main.lmwProcessing) { clearInterval(chatloading); MM.chatTab(); } }, 200); return true;');
};


MM.gameTab = function() {
	if (MM.sel('#room_col').lastChild.className != 'but')
		{ MM.addButton(MM.sel('#room_col'), MM.TEXT['minimap-button']).addEventListener('click', function() { MM.generateMinimap(); }); }

	var distrib = MM.sel('a.distr');
	distrib.setAttribute('href', '#');
	distrib.addEventListener('click', function() {
		Main.ajax('/vending', null, function() {
			MM.reInit();
		});
	});

	var egg = MM.sel('#calcModule [style*="display:none"]');
	if (egg)
		{ egg.textContent = "nuqDaq ’oH eDen. " + egg.textContent; } //Dédicace à BM ! ^_^
};



/* FONCTIONS RELATIVES À L'ÉDITEUR DE MESSAGES */

MM.messageEditor = function() {
	var tabs = MM.sel('#cdTabsChat').children;
	for (i = 0; i < tabs.length; i++)
		{ tabs[i].setAttribute('onclick', 'MM.changeChatTab(this);'); }

	if (MM.sel('#MMeditor')) //Si l'onglet existe déjà
	{
		//On remet le message sauvegardé
		if (MM.previewtext)
		{
			MM.sel('#tid_wallPost').value = MM.previewtext;
			setTimeout(function() { MM.refreshPreview(); }, 100);
		}
		MM.sel('#MMeditor').style.display = 'none';
		return false;
	}

	var tab = MM.addNewEl('li', MM.sel('.tabschat'), 'MMeditortab', '<img src="http://mush.twinoid.com/img/icons/ui/conceptor.png" />');
	tab.addEventListener('mouseover', function() { Main.showTip(this, MM.TEXT['editor_tip']); });
	tab.addEventListener('mouseout', function() { Main.hideTip(); });
	tab.addEventListener('click', function() { MM.changeChatTab(this); });
	tab.className = 'tab taboff';
	var editor = MM.addNewEl('div', MM.sel('#chatBlock'), 'MMeditor');
	MM.addNewEl('h4', editor, null, MM.TEXT['MM-added_tab']).className = 'MMtabwarning';
	MM.addNewEl('p', editor, null, MM.TEXT['MM-added_tab_text']).className = 'MMtabwarning';
	editor.style.display = 'none';

	//On récupère le formulaire de post de message sur le Nexus de Twinoid pour avoir la prévisualisation Twinoid et les smileys
	var src = _tid.makeUrl('/mod/wall/post', { _id: 'tabreply_content', jsm: '1', lang: 'FR' });
	MM.addNewEl('div', editor, 'tabreply_content');
	MM.addNewEl('script', document.body, null, null, [['src', src], ['async', 'true']]).onload = function() {
		var form = MM.sel('[action="/mod/wall/post?submit=1"]');
		form.removeChild(form.lastElementChild); //Boutons Envoyer, Options avancées… complètement inutiles ici
		form.removeChild(form.lastElementChild);
		form.removeChild(form.lastElementChild);
		form.action = '';
		form.onsubmit = '';
		var wallpost = MM.sel('#tid_wallPost');
		wallpost.setAttribute('maxlength', '2500');

		//Retrait des balises non-fonctionnelles dans Mush
		var buts = MM.sel('.tid_editorButtons');
		buts.removeChild(MM.sel('.tid_editorBut_link'));
		buts.removeChild(MM.sel('.tid_editorBut_rp'));
		buts.removeChild(MM.sel('.tid_editorBut_question'));
		buts.removeChild(buts.lastChild); //.tid_clear

		//Ajout des boutons de prévisualisation Rafraîchir & Effacer
		MM.addButton(buts, MM.TEXT['preview_refresh']).addEventListener('click', function() { MM.refreshPreview(); });
		MM.addButton(buts, MM.TEXT['preview_erase']).addEventListener('click', function() {
			if (confirm(MM.TEXT['preview_confirm_erase']))
			{
				MM.sel('#tid_wallPost').value = '';
				MM.refreshPreview();
			}
		});

		//Ajout des smileys Mush
		MM.addNewEl('p', form, null, '↓ ' + MM.TEXT['editor-mush_smileys'] + ' ↓', [['class', 'MMcenter']]).addEventListener('click', function() {
			var block = MM.sel('#MMsmileysblock');
			if (block.style.display == 'none')
			{
				block.style.display = 'block';
				this.textContent = '↑ ' + MM.TEXT['editor-mush_smileys'] + ' ↑';
			}
			else
			{
				block.style.display = 'none';
				this.textContent = '↓ ' + MM.TEXT['editor-mush_smileys'] + ' ↓';
			}
		});
		var s = MM.addNewEl('div', form, 'MMsmileysblock');
		s.style.display = 'none';
		for (i = 0; i < MM.smileys.length; i++) //Smileys Mush
		{
			MM.addNewEl('img', s, null, null, [['src', '/img/icons/ui/' + MM.smileys[i][1]], ['data-smiley', MM.smileys[i][0].split('|')[0]]]).addEventListener('click', function() {
				MM.sel('#tid_wallPost').value += ':' + this.getAttribute('data-smiley') + ':';
				setTimeout(function() { MM.refreshPreview(); }, 100);
			});
		}

		//Liste des messages préformatés
		MM.addNewEl('p', form, null, MM.TEXT['premessages_title'], [['style', 'color: black; margin-top: 20px;']]);
		var premessages = MM.addNewEl('select', form, 'MMpremessages');
		premessages.addEventListener('change', function() { MM.buildMessage(); });
		var options = ['NULL', 'inventory', 'researches', 'researches++', 'projects', 'planet'];
		for (i = 0; i < options.length; i++)
			{ MM.addNewEl('option', premessages, null, MM.TEXT['premessages_' + options[i]], [['value', options[i]]]); }

		//Ajout des boutons de copie & sauvegarde
		MM.addButton(form, MM.TEXT['preview_copy']).addEventListener('click', function() {
			if (MM.sel('#tid_wallPost').value)
			{
				MM.previewtext = MM.sel('#tid_wallPost').value.slice(0, 2500);
				MM.sel('#cdMainChat').className = 'MMshowpaste';
			}
		});
		MM.addButton(form, MM.TEXT['preview_save']).addEventListener('click', function() { MM.savePreview(); });
		MM.addButton(form, MM.TEXT['preview_retrieve']).addEventListener('click', function() { MM.retrievePreview(); });

		//Mise à jour de la prévisualisation avec surcouche de formatage Mush
		MM.sel("#tid_wallPost_preview").className += ' talks'; //CSS « bulle »
		wallpost.addEventListener('input', function() {
			setTimeout(function() { MM.refreshPreview(); }, 100); //Délai pour que la surcouche s'effectue après la prévisualisation Twinoid
		});

		if (MM.previewtext) //En cas de reconstruction de l'interface
		{
			wallpost.value = MM.previewtext;
			setTimeout(function() { MM.refreshPreview(); }, 100);
		}
	};
};


MM.refreshPreview = function () {
	var t = MM.sel("#tid_wallPost_preview").innerHTML;
	t = t.replace(/<\/p><p>/g, ''); //Le double retour à la ligne disparaît
	t = t.replace(/\*+([^\*]*)\*+/g, '<strong>$1</strong>'); //Les astérisques simples suffisent à faire du gras
	t = t.replace(/<(\/?)pre>/g, '&lt;$1code&gt;'); //<code> non fonctionnel
	t = t.replace(/<a target=["']_blank["'] href=["'](.*)["']>(.*)<\/a>/g, '[link=$1]$2[/link]'); //Liens non fonctionnels
	t = t.replace(/<span class=["']tid_preRoleplay["']>(.*)<\/span><span class=["']tid_roleplay["']><span class=["']tid_wroleplay["']>(.*)<\/span><\/span>/g, '[rp=$1]$2[/rp]'); //Balise RP
	if (MM.ME_NERON) //Commande /neron
		{ t = t.replace(/\/neron /, '<img src="http://mush.vg/img/icons/ui/pa_core.png" /> <span class="buddy">NERON : </span>'); }
	for (i = 0; i < MM.smileys.length; i++) //Smileys Mush
		{ t = t.replace(RegExp(':\(' + MM.smileys[i][0] + '\):', 'g'), '<img src="/img/icons/ui/' + MM.smileys[i][1] + '" alt="$1" />'); }
	MM.sel("#tid_wallPost_preview").innerHTML = t;
};


MM.savePreview = function() {
	if (MM.sel('#tid_wallPost').value)
	{
		MM.previewtext = MM.sel('#tid_wallPost').value.slice(0, 2500);
		var date = new Date();
		date.setTime(date.getTime() + 31536000000);
		document.cookie = 'MMptext=' + encodeURIComponent(MM.previewtext) + '; expires=' + date.toGMTString() + '; path=/';
	}
};


MM.retrievePreview = function() {
	var cookies = document.cookie.split('; ');
	for (i = 0; i < cookies.length; i++)
	{
		var cookie = cookies[i].split('=');
		if (cookie[0] == 'MMptext')
		{
			if (MM.sel('#tid_wallPost').value && !confirm(MM.TEXT['message-overwrite_retrieve']))
				{ return false; }
			var saved = decodeURIComponent(cookie[1]);
			MM.previewtext = saved;
			MM.sel("#tid_wallPost").value = saved;
			MM.refreshPreview();
		}
	}
};


MM.buildMessage = function() {
	var wallpost = MM.sel('#tid_wallPost');
	if (wallpost.value && confirm(MM.TEXT['message-overwrite_build']))
		{ var message = wallpost.value + "\n\n\n\n"; }
	else
		{ var message = ""; }

	var popup = MM.sel('#MMpopup');
	popup.innerHTML = '';

	switch(MM.sel('#MMpremessages').value)
	{
		case 'inventory':
			message += "**" + MM.sel('#input').getAttribute('d_name') + " :** "; //Nom de la pièce
			var inventory = MM.sel('#room').children;
			for (i = 0; i < inventory.length; i++)
			{
				var item = inventory[i];
				if (item.className == 'item cdEmptySlot') //On arrête dès qu'on tombe sur un slot vide
					{ break; }
				if (/hidden\.png/.test(item.getAttribute('data-name'))) //On ne liste pas les objets cachés
					{ continue; }
				var n = (
					(item.getAttribute('data-id') == 'BOOK')
					? decodeURIComponent(/namey[0-9]+:(.+)g$/.exec(item.getAttribute('data-tip'))[1]) //Pour avoir la compétence en cas d'apprenton
					: item.getAttribute('data-name').trim() //Pour avoir les attributs (lourd, cassé, etc.) pour les autres objets
				);
				n = n.replace(/<img(?:[^<]*)plant_diseased\.png(?:[^<]*)>/, " //" + MM.TEXT['preformat-inventory_diseased'] + "//");
				n = n.replace(/<img(?:[^<]*)plant_thirsty\.png(?:[^<]*)>/, " //" + MM.TEXT['preformat-inventory_thirsty'] + "//");
				n = n.replace(/<img(?:[^<]*)plant_dry\.png(?:[^<]*)>/, " //" + MM.TEXT['preformat-inventory_dry'] + "//");
				n = n.replace(/<img(?:[^<]*)broken\.png(?:[^<]*)>/, " //" + MM.TEXT['preformat-inventory_broken'] + "//"); //Objet cassé
				n = n.replace(/<img(?:[^<]*)charge\.png(?:[^<]*)>x([0-9]+)/, " [$1 " + MM.TEXT['preformat-inventory_charge'] + "]"); //Charges
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
				if ((e == 'HELP_DRONE' || e == 'CAMERA') && !MM.sel('[serial="' + e.serial + '"]')) //Équipements seulement, pas en items (caméra installée)
					{ message += "//" + MM.TEXT['preformat-inventory_' + e] + "//, "; }
			}

			var cat = Main.npc.iterator(); //Schrödinger
			if (cat.hasNext())
				{ message += "//Schrödinger//, "; }

			message = message.slice(0, -2) + ".";
			wallpost.value = message;
			MM.refreshPreview();
			break;

		case 'researches':
			if (!MM.sel('#research_module'))
				{ alert(MM.TEXT['preformat-researches_nomodule']); break; }

			message += "**//" + MM.TEXT['preformat-researches_title'] + " //**\n\n\n\n";
			var cards = document.getElementsByClassName('cdProjCard');
			for (i = 0; i < cards.length; i++)
			{
				message += "**" + cards[i].firstElementChild.textContent.trim() + " :** ";
				message += MM.sel('[data-p="' + cards[i].getAttribute('data-p') + '"] #p').textContent.trim() + "\n";
			}

			wallpost.value = message;
			MM.refreshPreview();
			break;

		case 'researches++':
			if (!MM.sel('#research_module'))
				{ alert(MM.TEXT['preformat-researches_nomodule']); break; }

			var researches = [];
			popup.style.display = 'block';
			MM.addNewEl('h3', popup, null, MM.TEXT['preformat-researches++_title']);
			var table = MM.addNewEl('table', popup);
			var h = MM.addNewEl('thead', table);
			MM.addNewEl('td', h, null, MM.TEXT['preformat-researches++_share']); //Partager ?
			MM.addNewEl('td', h, null, MM.TEXT['preformat-researches++_name']); //Nom
			MM.addNewEl('td', h, null, MM.TEXT['preformat-researches++_progress']); //Progression
			MM.addNewEl('td', h, null, MM.TEXT['preformat-researches++_important']); //Prioritaire ?
			MM.addNewEl('td', h, null, MM.TEXT['preformat-researches++_relay']); //Relais nécessaire ?
			var cards = document.getElementsByClassName('cdProjCard');
			for (i = 0; i < cards.length; i++)
			{
				var name = cards[i].firstElementChild.textContent.trim();
				var progress = MM.sel('[data-p="' + cards[i].getAttribute('data-p') + '"] #p').textContent.trim();
				researches.push([name, progress]);
				var l = MM.addNewEl('tr', table, null, null, [['class', 'MMresearch']]);
				MM.addNewEl('td', l, null, '<input type="checkbox" checked="true" />').className = 'MMcenter';
				MM.addNewEl('td', l, null, name);
				MM.addNewEl('td', l, null, progress);
				MM.addNewEl('td', l, null, '<input type="checkbox" />').className = 'MMcenter';
				MM.addNewEl('td', l, null, '<input type="checkbox" />').className = 'MMcenter';
			}

			//Création du message
			MM.addButton(popup, MM.TEXT['preformat-researches++_submit']).addEventListener('click', function() {
				var message = "**//" + MM.TEXT['preformat-researches_title'] + " //**\n\n\n\n";
				var researches = document.getElementsByClassName('MMresearch');
				for (i = 0; i < researches.length; i++)
				{
					var children = researches[i].children;
					if (children[0].firstChild.checked) //À partager
					{
						message += '**' + children[1].textContent + ' :** ';
						message += children[2].textContent;
						if (children[3].firstChild.checked) //Prioritaire
							{ message += ", **//" + MM.TEXT['preformat-researches++_text_important'] + "//**"; }
						if (children[4].firstChild.checked) //À relayer
							{ message += ", //" + MM.TEXT['preformat-researches++_text_relay'] + "//"; }
						message += ".\n";
					}
					MM.sel('#MMpopup').style.display = 'none';
				}
				wallpost.value = message;
				MM.refreshPreview();
			});
			break;

		case 'projects':
			if (!/img\/cards\/projects/.test(MM.sel('#cdModuleContent').innerHTML)) //Pas d'ID spécifique au Cœur de NERON :-/
				{ alert(MM.TEXT['preformat-projects_nomodule']); break; }

			message += "**//" + MM.TEXT['preformat-projects_title'] + " //**\n\n\n\n";
			var cards = document.getElementsByClassName('cdProjCard');
			for (i = 0; i < cards.length; i++)
			{
				message += "**" + cards[i].firstElementChild.textContent.trim() + " :** ";
				message += MM.sel('[data-p="' + cards[i].getAttribute('data-p') + '"] .desc').textContent.trim() + "\n";
			}

			wallpost.value = message;
			MM.refreshPreview();
			break;

		case 'planet':
			if (!MM.sel('#navModule'))
				{ alert(MM.TEXT['preformat-planet_nomodule']); break; }

			var planets = document.querySelectorAll('[class="planet"]');
			switch (planets.length)
			{
				case 0:
					alert(MM.TEXT['preformat-planet_none']);
					break;

				case 1:
					wallpost.value = MM.preformatPlanet(planets[0]);
					MM.refreshPreview();
					break;

				case 2:
					popup.style.display = 'block';
					MM.addNewEl('h3', popup, null, MM.TEXT['preformat-planet_title']);
					MM.addButton(popup, planets[0].firstElementChild.textContent).addEventListener('click', function() {
						MM.sel('#tid_wallPost').value = MM.preformatPlanet(planets[0]);
						MM.refreshPreview();
						MM.sel('#MMpopup').style.display = 'none';
					}); //Première planète
					MM.addButton(popup, planets[1].firstElementChild.textContent).addEventListener('click', function() {
						MM.sel('#tid_wallPost').value = MM.preformatPlanet(planets[1]);
						MM.refreshPreview();
						MM.sel('#MMpopup').style.display = 'none';
					}); //Seconde planète
					MM.addButton(popup, MM.TEXT['preformat-planet_both']).addEventListener('click', function() {
						MM.sel('#tid_wallPost').value = MM.preformatPlanet(planets[0]) + "\n\n\n\n" + MM.preformatPlanet(planets[1]);
						MM.refreshPreview();
						MM.sel('#MMpopup').style.display = 'none';
					}); //Les deux planètes
					break;
			}
			break;
	}

	MM.sel('#MMpremessages').selectedIndex = 0;
};


MM.preformatPlanet = function(planet) {
	var name = planet.firstElementChild.textContent;
	var direction = planet.children[2].children[1].children[0].innerHTML.replace(/<span>(?:.*)<\/span>/, '').trim();
	var fuel = planet.children[2].children[1].children[1].innerHTML.replace(/<span>(?:.*)<\/span>/, '').trim();
	var zones = planet.lastElementChild.firstElementChild.innerHTML.match(/<h1>(.*)<\/h1>/g);

	var message = "**" + name + " :** //" + direction + "//, " + fuel + " :fuel: ; ";
	var unknown = 0;
	for (i = 0; i < zones.length; i++)
	{
		var zone = zones[i].slice(4, -5);
		if (zone == '???')
			{ unknown += 1; }
		else
			{ message += zone + ", "; }
	}
	if (unknown)
		{ message += "//" + unknown + " " + MM.TEXT['preformat-planet_unknown'] + '//, '; }
	message = message.slice(0, -2) + '.';

	return message;
};



/* FONCTION DE LOCALISATION */

MM.locale = function() {
	MM.TEXT = {};
	var lang = parseInt(MM.parameters['locale']);

	//Doit rester indépendant de la locale choisie puisqu'en interaction avec la page elle-même
	//.alertroom : certaines pièces (ex. Jardin) sont mal écrites dans les rapports d'alerte
	switch (document.domain)
	{
		case 'mush.vg':
			MM.rooms = ['Pont', 'Baie Alpha', 'Baie Beta', 'Baie Alpha 2', 'Nexus', 'Infirmerie', 'Laboratoire', 'Réfectoire', 'Jardin Hydroponique', 'Salle des moteurs', 'Tourelle Alpha avant', 'Tourelle Alpha centre', 'Tourelle Alpha arrière', 'Tourelle Beta avant', 'Tourelle Beta centre', 'Tourelle Beta arrière', 'Patrouilleur Longane', 'Patrouilleur Jujube', 'Patrouilleur Tamarin', 'Patrouilleur Socrate', 'Patrouilleur Epicure', 'Patrouilleur Platon', 'Patrouilleur Wallis', 'Pasiphae', 'Couloir avant', 'Couloir central', 'Couloir arrière', 'Planète', 'Baie Icarus', 'Dortoir Alpha', 'Dortoir Beta', 'Stockage Avant', 'Stockage Alpha centre', 'Stockage Alpha arrière', 'Stockage Beta centre', 'Stockage Beta arrière', 'Espace infini', 'Les Limbes'];
			MM.alertrooms = MM.toArray(MM.rooms);
			MM.alertrooms[8] = 'Jardin Hydoponique'; //hydRo
			MM.alertrooms[28] = 'Icarus'; //Pas de Baie
			break;

		case 'mush.twinoid.es':
			MM.rooms = ['Puente de mando', 'Plataforma Alpha', 'Plataforma Beta', 'Plataforma Alpha 2', 'Nexus', 'Enfermería', 'Laboratorio', 'Comedor', 'Jardín Hidropónico', 'Sala de motores', 'Cañón Alpha delantero', 'Cañón Alpha central', 'Cañón Alpha trasero', 'Cañón Beta delantero', 'Cañón Beta central', 'Cañón Beta trasero', 'Patrullero Longane', 'Patrullero Jujube', 'Patrullero Tamarindo', 'Patrullero Sócrates', 'Patrullero Epicuro', 'Patrullero Platón', 'Patrullero Wallis', 'Pasiphae', 'Pasillo delantero', 'Pasillo central', 'Pasillo trasero', 'Planeta', 'Icarus', 'Dormitorio Alpha', 'Dormitorio Beta', 'Almacén delantero', 'Almacén Alpha central', 'Almacén Alpha trasero', 'Almacén Beta central', 'Almacén Beta trasero', 'Espacio infinito', 'El limbo'];
			MM.alertrooms = MM.toArray(MM.rooms);
			break;

		default:
			MM.rooms = ['Bridge', 'Alpha Bay', 'Bravo Bay', 'Alpha Bay 2', 'Nexus', 'Medlab', 'Laboratory', 'Refectory', 'Hydroponic Garden', 'Engine Room', 'Front Alpha Turret', 'Centre Alpha Turret', 'Rear Alpha Turret', 'Front Bravo Turret', 'Centre Bravo Turret', 'Rear Bravo Turret', 'Patrol Ship Tomorrowland', 'Patrol Ship Olive Grove', 'Patrol Ship Yasmin', 'Patrol Ship Wolf', 'Patrol Ship E-Street', 'Patrol Ship Eponine', 'Patrol Ship Carpe Diem', 'Pasiphae', 'Front Corridor', 'Central Corridor', 'Rear Corridor', 'Planet', 'Icarus Bay', 'Alpha Dorm', 'Bravo Dorm', 'Front Storage', 'Centre Alpha Storage', 'Rear Alpha Storage', 'Centre Bravo Storage', 'Rear Bravo Storage', 'Outer Space', 'Limbo'];
			MM.alertrooms = MM.toArray(MM.rooms);
	}

	switch (lang)
	{
		case 1: //Français
		MM.TEXT['ap'] = "PA";
		MM.TEXT['hide_alert_reports'] = "Cacher les rapports";
		MM.TEXT['show_alert_reports'] = "Lister les rapports";
		MM.TEXT['unvalid_move'] = "Cette porte est cassée, vous ne pouvez pas vous déplacer !";
		MM.TEXT['move_confirm'] = "Voulez-vous vous déplacer vers ";
		MM.TEXT['move_alert'] = "ATTENTION : il semble très probable que vous ne puissiez pas vous déplacer actuellement. Si c'est le cas, un message d'erreur peut s'afficher. Continuer ?";
		MM.TEXT['move_guardian'] = "ATTENTION : quelqu'un garde cette pièce. À moins que vous ne soyez Fuyant, un message d'erreur peut s'afficher. Continuer ?";
		MM.TEXT['current_room'] = "Vous êtes en : ";
		MM.TEXT['move_button'] = "Se déplacer";
		MM.TEXT['broken_door'] = " — CASSÉE";
		MM.TEXT['door_to'] = "Porte → ";
		MM.TEXT['MMparams_title'] = "Paramètres de MushMobile";
		MM.TEXT['MMparams_confirm-action'] = "Confirmer les actions";
		MM.TEXT['MMparams_food-desc'] = "Afficher les effets des aliments sous l'inventaire";
		MM.TEXT['MMparams_forced-locale'] = "Forcer la langue de MushMobile";
		MM.TEXT['MMparams_lang-title'] = "Langue de l'interface MushMobile :";
		MM.TEXT['MMparams_credits'] = "Script codé par <a href='http://twinoid.com/user/8412516' target='_blank'>LAbare</a>. <span onclick='MM.showLicense();'>Licence MIT.</span>";
		MM.TEXT['confirm_action'] = "Voulez-vous effectuer l'action '";
		MM.TEXT['tabs_char'] = "Perso";
		MM.TEXT['tabs_ship'] = "Général";
		MM.TEXT['tabs_room'] = "Pièce";
		MM.TEXT['tabs_chat'] = "Chat";
		MM.TEXT['tabs_game'] = "Module";
		MM.TEXT['tabs_shop'] = "Achats";
		MM.TEXT['MM-added_tab'] = "<img src='" + MM.src + "ico.png' /> <b>Attention :</b> Onglet MushMobile <img src='" + MM.src + "ico.png' />";
		MM.TEXT['MM-added_tab_text'] = "Cet onglet est un ajout de l'interface MushMobile. Si un bug venait à se produire ici, il ne pourrait s'agir que d'un bug de <em>script</em> : il ne faudrait alors en avertir que son auteur.";
		MM.TEXT['plasma-onmouseover'] = "<div class='tiptop' ><div class='tipbottom'><div class='tipbg'><div class='tipcontent'><h1>Bouclier plasma</h1>Le bouclier plasma est activé.</div></div></div></div>";
		MM.TEXT['cards-title'] = "Projets et recherches :";
		MM.TEXT['fire'] = "La pièce est dévorée par les flammes. Faites quelque chose !";
		MM.TEXT['equipments'] = "Équipements";
		MM.TEXT['broken'] = " — CASSÉ";
		MM.TEXT['reac_b'] = "Réacteur latéral gauche"; //B = gauche
		MM.TEXT['reac_a'] = "Réacteur latéral droit";
		MM.TEXT['ROTATIONAL_REACTOR_unknown'] = "Réacteur latéral inconnu";
		MM.TEXT['bed_a_a'] = "Lit Alpha 1";
		MM.TEXT['bed_a_b'] = "Lit Alpha 2";
		MM.TEXT['bed_a_c'] = "Lit Alpha 3";
		MM.TEXT['bed_b_a'] = "Lit Beta 1";
		MM.TEXT['bed_b_b'] = "Lit Beta 2";
		MM.TEXT['bed_b_c'] = "Lit Beta 3";
		MM.TEXT['sick_couch'] = "Lit Infirmerie";
		MM.TEXT['BED_unknown'] = "Lit inconnu";
		MM.TEXT['PATROL_SHIP_A_0'] = "Patrouilleur Longane";
		MM.TEXT['PATROL_SHIP_A_1'] = "Patrouilleur Jujube";
		MM.TEXT['PATROL_SHIP_A_2'] = "Patrouilleur Tamarin";
		MM.TEXT['PATROL_SHIP_B_0'] = "Patrouilleur Socrate";
		MM.TEXT['PATROL_SHIP_B_1'] = "Patrouilleur Épicure";
		MM.TEXT['PATROL_SHIP_B_2'] = "Patrouilleur Platon";
		MM.TEXT['PATROL_SHIP_AA_0'] = "Patrouilleur Wallis";
		MM.TEXT['PATROL_SHIP_AA_1'] = "Pasiphae";
		MM.TEXT['PATROL_INTERFACE_unknown'] = "Patrouilleur inconnu";
		MM.TEXT['warning_title'] = "MushMobile — chargé";
		MM.TEXT['warning_1'] = "<strong>ATTENTION :</strong> ce script adapte l'interface de Mush. Si vous rencontrez un bug en jeu, <em>reproduisez le bug sur ordinateur</em> afin de vérifier que c'est bien le jeu, et non pas ce script, qui est en cause. Ne reportez sur les forums que les bugs <em>reproduits en jeu sur ordinateur sans script</em>.";
		MM.TEXT['warning_2'] = "Si vous rencontrez un bug à cause du script, contactez son auteur à partir des paramètres. Ni l'auteur ni le script ne sont affiliés à Motion Twin et ne sauraient être responsables d'un quelconque problème (bien que le script soit codé et testé de manière à ne pas générer de bug pouvant influer sur le jeu lui-même).";
		MM.TEXT['warning_3'] = "Bon jeu !";
		MM.TEXT['license'] = "<h4><img src='" + MM.src + "ico.png' /> MushMobile : Licence MIT</h4><p>Copyright (c) 2015 LAbare</p><p>L'autorisation est accordée, gracieusement, à toute personne acquérant une copie de ce script et des fichiers de documentation associés (le « Script »), de commercialiser le Script sans restriction, notamment les droits d'utiliser, de copier, de modifier, de fusionner, de publier, de distribuer, de sous-licencier et/ou de vendre des copies du Script, ainsi que d'autoriser les personnes auxquelles le Script est fourni à le faire, sous réserve des conditions suivantes :</p><p>La déclaration de copyright ci-dessus et la présente autorisation doivent être incluses dans toute copie ou partie substantielle du Script.</p><p>Le Script est fourni « tel quel », sans garantie d'aucune sorte, explicite ou implicite, notamment sans garantie de qualité marchande, d’adéquation à un usage particulier et d'absence de contrefaçon. En aucun cas les auteurs ou titulaires du droit d'auteur ne seront responsables de tout dommage, réclamation ou autre responsabilité, que ce soit dans le cadre d'un contrat, d'un délit ou autre, en provenance de, consécutif à ou en relation avec le Script ou son utilisation, ou avec d'autres éléments du Script. Bref, si ça casse, c'est pas ma faute. Mais ça va pas casser, normalement. À peine. Moi, j'y crois.</p>";
		MM.TEXT['help_screen_A'] = "Cliquez pour afficher une infobulle.<br />Aucune action ne sera faite.";
		MM.TEXT['help_screen_B'] = "Cliquez pour cacher l'infobulle.";
		MM.TEXT['inventory_debug'] = "DEBUG : Afficher l'inventaire MushMobile";
		MM.TEXT['show-flash-inventory'] = "DEBUG : Afficher l'inventaire Flash";
		MM.TEXT['editor_tip'] = "<div class='tiptop' ><div class='tipbottom'><div class='tipbg'><div class='tipcontent'><h1>Éditeur de messages MushMobile</h1><p>Facilite la mise en forme des messages et permet leur prévisualisation.</p></div></div></div></div>";
		MM.TEXT['editor-mush_smileys'] = "Smileys Mush";
		MM.TEXT['paste'] = "Coller";
		MM.TEXT['preview_refresh'] = "Rafraîchir";
		MM.TEXT['preview_erase'] = "Effacer";
		MM.TEXT['preview_confirm_erase'] = "Voulez-vous vraiment effacer votre message ?";
		MM.TEXT['preview_save'] = "Sauvegarder";
		MM.TEXT['preview_copy'] = "Copier";
		MM.TEXT['preview_retrieve'] = "Recharger le message sauvegardé";
		MM.TEXT['premessages_title'] = "Messages préformatés :";
		MM.TEXT['premessages_NULL'] = "Aucun";
		MM.TEXT['premessages_inventory'] = "Partager l'inventaire";
		MM.TEXT['premessages_researches'] = "Lister les recherches";
		MM.TEXT['premessages_researches++'] = "Lister les recherches (mode avancé)";
		MM.TEXT['premessages_projects'] = "Lister les projets";
		MM.TEXT['premessages_planet'] = "Partager une planète";
		MM.TEXT['message-overwrite_retrieve'] = "Attention : ceci va effacer votre message actuel. Continuer ?";
		MM.TEXT['message-overwrite_build'] = "Voulez-vous effacer le message actuel (Annuler) ou écrire à sa suite (OK) ?";
		MM.TEXT['preformat-researches_nomodule'] = "Veuillez accéder au laboratoire pour activer cette fonction.";
		MM.TEXT['preformat-researches_title'] = "Recherches :";
		MM.TEXT['preformat-researches++_title'] = "<img src='" + MM.src + "ico.png' /> Recherches préformatées — mode avancé";
		MM.TEXT['preformat-researches++_share'] = "Lister";
		MM.TEXT['preformat-researches++_name'] = "Nom";
		MM.TEXT['preformat-researches++_progress'] = "%";
		MM.TEXT['preformat-researches++_important'] = "Important ?";
		MM.TEXT['preformat-researches++_relay'] = "Relais ?";
		MM.TEXT['preformat-researches++_submit'] = "Lister les recherches";
		MM.TEXT['preformat-researches++_text_important'] = "prioritaire";
		MM.TEXT['preformat-researches++_text_relay'] = "besoin d'un relais";
		MM.TEXT['preformat-inventory_HELP_DRONE'] = "Drone";
		MM.TEXT['preformat-inventory_CAMERA'] = "Caméra";
		MM.TEXT['preformat-inventory_thirsty'] = "assoiffé";
		MM.TEXT['preformat-inventory_dry'] = "desséché";
		MM.TEXT['preformat-inventory_diseased'] = "malade";
		MM.TEXT['preformat-inventory_broken'] = "cassé";
		MM.TEXT['preformat-inventory_charge'] = "charge(s)";
		MM.TEXT['preformat-planet_none'] = "Vous n'avez pas scanné de planète.";
		MM.TEXT['preformat-planet_title'] = "Choisissez une planète :";
		MM.TEXT['preformat-planet_nomodule'] = "Veuillez accéder au Terminal Astro pour activer cette fonction.";
		MM.TEXT['preformat-planet_both'] = "Partager les deux";
		MM.TEXT['preformat-planet_unknown'] = "zone(s) inconnue(s)";
		MM.TEXT['preformat-projects_nomodule'] = "Veuillez accéder au Cœur de NERON pour activer cette fonction.";
		MM.TEXT['preformat-projects_title'] = "Nouveaux projets :";
		MM.TEXT['minimap-button'] = "Afficher la minimap MushMobile";
		MM.TEXT['minimap-title'] = "Minimap MushMobile";
		MM.TEXT['minimap-warning'] = "<b>ATTENTION :</b> cette minimap n'est pas celle du jeu Flash ; elle ne sert que de repère avec quelques indications. Il se peut que certaines avaries signalées n'y apparaissent pas.";
		MM.TEXT['minimap-legend'] = "<b>Légende :</b> <span class='MMmapfire'>Incendie signalé</span> <span class='MMmapalertd'>Portes signalées</span> <span class='MMmapalerte'>Équipements signalés</span>";
		MM.TEXT['minimap-room'] = "Vous avez sélectionné : <b><span id='MMminimaproom'>rien</span></b>.";
		
		MM.localerooms = ['Pont', 'Baie Alpha', 'Baie Beta', 'Baie Alpha 2', 'Nexus', 'Infirmerie', 'Laboratoire', 'Réfectoire', 'Jardin Hydroponique', 'Salle des moteurs', 'Tourelle Alpha avant', 'Tourelle Alpha centre', 'Tourelle Alpha arrière', 'Tourelle Beta avant', 'Tourelle Beta centre', 'Tourelle Beta arrière', 'Patrouilleur Longane', 'Patrouilleur Jujube', 'Patrouilleur Tamarin', 'Patrouilleur Socrate', 'Patrouilleur Epicure', 'Patrouilleur Platon', 'Patrouilleur Wallis', 'Pasiphae', 'Couloir avant', 'Couloir central', 'Couloir arrière', 'Planète', 'Baie Icarus', 'Dortoir Alpha', 'Dortoir Beta', 'Stockage Avant', 'Stockage Alpha centre', 'Stockage Alpha arrière', 'Stockage Beta centre', 'Stockage Beta arrière', 'Espace infini', 'Les Limbes'];
		break;

		case 2: //Anglais
		MM.TEXT['ap'] = "AP";
		MM.TEXT['hide_alert_reports'] = "Hide reports";
		MM.TEXT['show_alert_reports'] = "Show reports";
		MM.TEXT['unvalid_move'] = "This door is broken, you cannot move there!";
		MM.TEXT['move_confirm'] = "Do you want to move to ";
		MM.TEXT['move_alert'] = "WARNING: it seems that you are not able to move at the moment. An error may display. Continue?";
		MM.TEXT['move_guardian'] = "WARNING: someone is guarding this room. Unless you're Sneaky, you shall only move to the room whence you came, else an error may display. Continue?";
		MM.TEXT['current_room'] = "You are in: ";
		MM.TEXT['move_button'] = "Move";
		MM.TEXT['broken_door'] = " — BROKEN";
		MM.TEXT['door_to'] = "Door → ";
		MM.TEXT['MMparams_title'] = "MushMobile parameters";
		MM.TEXT['MMparams_confirm-action'] = "Confirm actions";
		MM.TEXT['MMparams_food-desc'] = "Show consumables effects under inventory";
		MM.TEXT['MMparams_forced-locale'] = "Force MushMobile language";
		MM.TEXT['MMparams_lang-title'] = "MushMobile language:";
		MM.TEXT['MMparams_credits'] = "Script developed by <a href='http://twinoid.com/user/8412516' target='_blank'>LAbare</a>. <span onclick='MM.showLicense();'>MIT licensed.</span>";
		MM.TEXT['confirm_action'] = "Do you want to '";
		MM.TEXT['tabs_char'] = "Myself";
		MM.TEXT['tabs_ship'] = "Ship";
		MM.TEXT['tabs_room'] = "Room";
		MM.TEXT['tabs_chat'] = "Chat";
		MM.TEXT['tabs_game'] = "Module";
		MM.TEXT['tabs_shop'] = "Shop";
		MM.TEXT['MM-added_tab'] = "<img src='" + MM.src + "ico.png' /> <b>Warning:</b> MushMobile tab <img src='" + MM.src + "ico.png' />";
		MM.TEXT['MM-added_tab_text'] = "This tab is an addition of the MushMobile interface. If a bug happens here, it would definitely be a <em>script bug</em> and should be reported only to the author of this script.";
		MM.TEXT['plasma-onmouseover'] = "<div class='tiptop' ><div class='tipbottom'><div class='tipbg'><div class='tipcontent'><h1>Plasma shield</h1>The plasma shield is active.</div></div></div></div>";
		MM.TEXT['cards-title'] = "Projects and researches:";
		MM.TEXT['fire'] = "There is a fire in the room. Quick, grab an extinguisher!";
		MM.TEXT['equipments'] = "Equipments";
		MM.TEXT['broken'] = " — BROKEN";
		MM.TEXT['reac_b'] = "Left lateral reactor";
		MM.TEXT['reac_a'] = "Right lateral reactor";
		MM.TEXT['ROTATIONAL_REACTOR_unknown'] = "Unknown lateral reactor";
		MM.TEXT['bed_a_a'] = "Alpha bed 1";
		MM.TEXT['bed_a_b'] = "Alpha bed 2";
		MM.TEXT['bed_a_c'] = "Alpha bed 3";
		MM.TEXT['bed_b_a'] = "Bravo bed 1";
		MM.TEXT['bed_b_b'] = "Bravo bed 2";
		MM.TEXT['bed_b_c'] = "Bravo bed 3";
		MM.TEXT['sick_couch'] = "Medlab bed";
		MM.TEXT['BED_unknown'] = "Unknown bed";
		MM.TEXT['PATROL_SHIP_A_0'] = "Patrol ship Tomorrowland";
		MM.TEXT['PATROL_SHIP_A_1'] = "Patrol ship Olive Grove";
		MM.TEXT['PATROL_SHIP_A_2'] = "Patrol ship Yasmin";
		MM.TEXT['PATROL_SHIP_B_0'] = "Patrol ship Wolf";
		MM.TEXT['PATROL_SHIP_B_1'] = "Patrol ship E-Street";
		MM.TEXT['PATROL_SHIP_B_2'] = "Patrol ship Eponine";
		MM.TEXT['PATROL_SHIP_AA_0'] = "Patrol ship Carpe Diem";
		MM.TEXT['PATROL_SHIP_AA_1'] = "Pasiphae";
		MM.TEXT['PATROL_INTERFACE_unknown'] = "Unknown patrol ship";
		MM.TEXT['warning_title'] = "MushMobile — loaded";
		MM.TEXT['warning_1'] = "<strong>WARNING:</strong> this script reshapes the game's interface. In case of an unfortunate bug, <em>reproduce it on a computer</em> to make sure that it is an in-game bug, and not a script bug. Only warn the forums in case of a <em>computer-reproduced in-game bug in a scriptless browser</em>.";
		MM.TEXT['warning_2'] = "In case of a script bug, contact its author from the parameters menu. Neither the author nor the script have any link to Motion Twin, and they cannot be held responsible in case of a bug (although this script has been developed and tested in order not to generate any game-breaking bug).";
		MM.TEXT['warning_3'] = "Have a good game!";
		MM.TEXT['license'] = "<h4><img src='" + MM.src + "ico.png' /> MushMobile — MIT License</h4><p>Copyright (c) 2015 LAbare</p><p>Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the \"Software\"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:</p><p>The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.</p><p>The Software is provided \"as is\", without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose and noninfringement. In no event shall the authors or copyright holders be liable for any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising from, out of or in connection with the Software or the use or other dealings in the Software. Basically, if the script goes berzerk, stabs your kids and burns your house, I'm not to blame. But nothing bad should happen, not even a script-breaking bug. Trust me.</p>";
		MM.TEXT['help_screen_A'] = "Click on an element to show its tooltip.<br />This won't make you do any action.";
		MM.TEXT['help_screen_B'] = "Click again to hide the tooltip.";
		MM.TEXT['inventory_debug'] = "DEBUG: Show MushMobile inventory";
		MM.TEXT['show-flash-inventory'] = "DEBUG: Show Flash inventory";
		MM.TEXT['editor_tip'] = "<div class='tiptop' ><div class='tipbottom'><div class='tipbg'><div class='tipcontent'><h1>MushMobile Message editor</h1><p>Allows for message formatting and preview.</p></div></div></div></div>";
		MM.TEXT['editor-mush_smileys'] = "Mush smileys";
		MM.TEXT['paste'] = "Paste";
		MM.TEXT['preview_refresh'] = "Refresh";
		MM.TEXT['preview_erase'] = "Erase";
		MM.TEXT['preview_confirm_erase'] = "Do you wish to erase your message?";
		MM.TEXT['preview_save'] = "Save";
		MM.TEXT['preview_copy'] = "Copy";
		MM.TEXT['preview_retrieve'] = "Retrieve saved message";
		MM.TEXT['premessages_title'] = "Select a preformatted message:";
		MM.TEXT['premessages_NULL'] = "None";
		MM.TEXT['premessages_inventory'] = "Share inventory";
		MM.TEXT['premessages_researches'] = "Share researches";
		MM.TEXT['premessages_researches++'] = "Share researches (advanced mode)";
		MM.TEXT['premessages_projects'] = "Share projects";
		MM.TEXT['premessages_planet'] = "Share a planet";
		MM.TEXT['message-overwrite_retrieve'] = "Warning: this will overwrite your current message. Continue?";
		MM.TEXT['message-overwrite_build'] = "Do you wish to overwrite your current message (Cancel) or add this to its end (OK)?";
		MM.TEXT['preformat-researches_nomodule'] = "Please access the laboratory in order to activate research preformatting.";
		MM.TEXT['preformat-researches_title'] = "Researches:";
		MM.TEXT['preformat-researches++_title'] = "<img src='" + MM.src + "ico.png' /> Sharing researches — advanced mode";
		MM.TEXT['preformat-researches++_share'] = "Share ?";
		MM.TEXT['preformat-researches++_name'] = "Name";
		MM.TEXT['preformat-researches++_progress'] = "%";
		MM.TEXT['preformat-researches++_important'] = "Important ?";
		MM.TEXT['preformat-researches++_relay'] = "Need a relay ?";
		MM.TEXT['preformat-researches++_submit'] = "Share researches";
		MM.TEXT['preformat-researches++_text_important'] = "priority research";
		MM.TEXT['preformat-researches++_text_relay'] = "relay needed";
		MM.TEXT['preformat-inventory_HELP_DRONE'] = "Support drone";
		MM.TEXT['preformat-inventory_CAMERA'] = "Camera";
		MM.TEXT['preformat-inventory_thirsty'] = "thirsty";
		MM.TEXT['preformat-inventory_dry'] = "dry";
		MM.TEXT['preformat-inventory_diseased'] = "diseased";
		MM.TEXT['preformat-inventory_broken'] = "broken";
		MM.TEXT['preformat-inventory_charge'] = "charge(s)";
		MM.TEXT['preformat-planet_none'] = "You haven't scanned any planet yet.";
		MM.TEXT['preformat-planet_title'] = "Choose a planet:";
		MM.TEXT['preformat-planet_nomodule'] = "Please access the Astro Terminal in order to activate planet preformatting.";
		MM.TEXT['preformat-planet_both'] = "Share both";
		MM.TEXT['preformat-planet_unknown'] = "unknown zone(s)";
		MM.TEXT['preformat-projects_nomodule'] = "Please access the NERON Core in order to activate research preformatting.";
		MM.TEXT['preformat-projects_title'] = "New projects:";
		MM.TEXT['minimap-button'] = "Show the MushMobile minimap";
		MM.TEXT['minimap-title'] = "MushMobile minimap";
		MM.TEXT['minimap-warning'] = "<b>WARNING:</b> This minimap is not that of the Flash game, but merely a map of the Daedalus containing a little information. It may also not display certain reports.";
		MM.TEXT['minimap-legend'] = "<b>Legend:</b> <span class='MMmapfire'>Reported fire</span> <span class='MMmapalertd'>Reported doors</span> <span class='MMmapalerte'>Reported equipments</span>";
		MM.TEXT['minimap-room'] = "You selected: <b><span id='MMminimaproom'>nothing</span></b>.";
		
		MM.localerooms = ['Bridge', 'Alpha Bay', 'Bravo Bay', 'Alpha Bay 2', 'Nexus', 'Medlab', 'Laboratory', 'Refectory', 'Hydroponic Garden', 'Engine Room', 'Front Alpha Turret', 'Centre Alpha Turret', 'Rear Alpha Turret', 'Front Bravo Turret', 'Centre Bravo Turret', 'Rear Bravo Turret', 'Patrol Ship Tomorrowland', 'Patrol Ship Olive Grove', 'Patrol Ship Yasmin', 'Patrol Ship Wolf', 'Patrol Ship E-Street', 'Patrol Ship Eponine', 'Patrol Ship Carpe Diem', 'Pasiphae', 'Front Corridor', 'Central Corridor', 'Rear Corridor', 'Planet', 'Icarus Bay', 'Alpha Dorm', 'Bravo Dorm', 'Front Storage', 'Centre Alpha Storage', 'Rear Alpha Storage', 'Centre Bravo Storage', 'Rear Bravo Storage', 'Outer Space', 'Limbo'];
		break;

		case 3: //Espagnol
		MM.TEXT['ap'] = "AP";
		MM.TEXT['hide_alert_reports'] = "Hide reports";
		MM.TEXT['show_alert_reports'] = "Show reports";
		MM.TEXT['unvalid_move'] = "This door is broken, you cannot move there!";
		MM.TEXT['move_confirm'] = "Do you want to move to ";
		MM.TEXT['move_alert'] = "WARNING: it seems that you are not able to move at the moment. An error may display. Continue?";
		MM.TEXT['move_guardian'] = "WARNING: someone is guarding this room. Unless you're Sneaky, you shall only move to the room whence you came, else an error may display. Continue?";
		MM.TEXT['current_room'] = "You are in: ";
		MM.TEXT['move_button'] = "Move";
		MM.TEXT['broken_door'] = " — BROKEN";
		MM.TEXT['door_to'] = "Door → ";
		MM.TEXT['MMparams_title'] = "MushMobile parameters";
		MM.TEXT['MMparams_confirm-action'] = "Confirm actions";
		MM.TEXT['MMparams_food-desc'] = "Show consumables effects under inventory";
		MM.TEXT['MMparams_forced-locale'] = "Force MushMobile language";
		MM.TEXT['MMparams_lang-title'] = "MushMobile language:";
		MM.TEXT['MMparams_credits'] = "Script developed by <a href='http://twinoid.com/user/8412516' target='_blank'>LAbare</a>. <span onclick='MM.showLicense();'>MIT licensed.</span>";
		MM.TEXT['confirm_action'] = "Do you want to '";
		MM.TEXT['tabs_char'] = "Myself";
		MM.TEXT['tabs_ship'] = "Ship";
		MM.TEXT['tabs_room'] = "Room";
		MM.TEXT['tabs_chat'] = "Chat";
		MM.TEXT['tabs_game'] = "Module";
		MM.TEXT['tabs_shop'] = "Shop";
		MM.TEXT['MM-added_tab'] = "<img src='" + MM.src + "ico.png' /> <b>Warning:</b> MushMobile tab <img src='" + MM.src + "ico.png' />";
		MM.TEXT['MM-added_tab_text'] = "This tab is an addition of the MushMobile interface. If a bug happens here, it would definitely be a <em>script bug</em> and should be reported only to the author of this script.";
		MM.TEXT['plasma-onmouseover'] = "<div class='tiptop' ><div class='tipbottom'><div class='tipbg'><div class='tipcontent'><h1>Plasma shield</h1>The plasma shield is active.</div></div></div></div>";
		MM.TEXT['cards-title'] = "Projects and researches:";
		MM.TEXT['fire'] = "There is a fire in the room. Quick, grab an extinguisher!";
		MM.TEXT['equipments'] = "Equipments";
		MM.TEXT['broken'] = " — BROKEN";
		MM.TEXT['reac_b'] = "Left lateral reactor";
		MM.TEXT['reac_a'] = "Right lateral reactor";
		MM.TEXT['ROTATIONAL_REACTOR_unknown'] = "Unknown lateral reactor";
		MM.TEXT['bed_a_a'] = "Alpha bed 1";
		MM.TEXT['bed_a_b'] = "Alpha bed 2";
		MM.TEXT['bed_a_c'] = "Alpha bed 3";
		MM.TEXT['bed_b_a'] = "Bravo bed 1";
		MM.TEXT['bed_b_b'] = "Bravo bed 2";
		MM.TEXT['bed_b_c'] = "Bravo bed 3";
		MM.TEXT['sick_couch'] = "Medlab bed";
		MM.TEXT['BED_unknown'] = "Unknown bed";
		MM.TEXT['PATROL_SHIP_A_0'] = "Patrol ship Tomorrowland";
		MM.TEXT['PATROL_SHIP_A_1'] = "Patrol ship Olive Grove";
		MM.TEXT['PATROL_SHIP_A_2'] = "Patrol ship Yasmin";
		MM.TEXT['PATROL_SHIP_B_0'] = "Patrol ship Wolf";
		MM.TEXT['PATROL_SHIP_B_1'] = "Patrol ship E-Street";
		MM.TEXT['PATROL_SHIP_B_2'] = "Patrol ship Eponine";
		MM.TEXT['PATROL_SHIP_AA_0'] = "Patrol ship Carpe Diem";
		MM.TEXT['PATROL_SHIP_AA_1'] = "Pasiphae";
		MM.TEXT['PATROL_INTERFACE_unknown'] = "Unknown patrol ship";
		MM.TEXT['warning_title'] = "MushMobile — loaded";
		MM.TEXT['warning_1'] = "<strong>WARNING:</strong> this script reshapes the game's interface. In case of an unfortunate bug, <em>reproduce it on a computer</em> to make sure that it is an in-game bug, and not a script bug. Only warn the forums in case of a <em>computer-reproduced in-game bug in a scriptless browser</em>.";
		MM.TEXT['warning_2'] = "In case of a script bug, contact its author from the parameters menu. Neither the author nor the script have any link to Motion Twin, and they cannot be held responsible in case of a bug (although this script has been developed and tested in order not to generate any game-breaking bug).";
		MM.TEXT['warning_3'] = "Have a good game!";
		MM.TEXT['license'] = "<h4><img src='" + MM.src + "ico.png' /> MushMobile — MIT License</h4><p>Copyright (c) 2015 LAbare</p><p>Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the \"Software\"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:</p><p>The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.</p><p>The Software is provided \"as is\", without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose and noninfringement. In no event shall the authors or copyright holders be liable for any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising from, out of or in connection with the Software or the use or other dealings in the Software. Basically, if the script goes berzerk, stabs your kids and burns your house, I'm not to blame. But nothing bad should happen, not even a script-breaking bug. Trust me.</p>";
		MM.TEXT['help_screen_A'] = "Click on an element to show its tooltip.<br />This won't make you do any action.";
		MM.TEXT['help_screen_B'] = "Click again to hide the tooltip.";
		MM.TEXT['inventory_debug'] = "DEBUG: Show MushMobile inventory";
		MM.TEXT['show-flash-inventory'] = "DEBUG: Show Flash inventory";
		MM.TEXT['editor_tip'] = "<div class='tiptop' ><div class='tipbottom'><div class='tipbg'><div class='tipcontent'><h1>MushMobile Message editor</h1><p>Allows for message formatting and preview.</p></div></div></div></div>";
		MM.TEXT['editor-mush_smileys'] = "Mush smileys";
		MM.TEXT['paste'] = "Paste";
		MM.TEXT['preview_refresh'] = "Refresh";
		MM.TEXT['preview_erase'] = "Erase";
		MM.TEXT['preview_confirm_erase'] = "Do you wish to erase your message?";
		MM.TEXT['preview_save'] = "Save";
		MM.TEXT['preview_copy'] = "Copy";
		MM.TEXT['preview_retrieve'] = "Retrieve saved message";
		MM.TEXT['premessages_title'] = "Select a preformatted message:";
		MM.TEXT['premessages_NULL'] = "None";
		MM.TEXT['premessages_inventory'] = "Share inventory";
		MM.TEXT['premessages_researches'] = "Share researches";
		MM.TEXT['premessages_researches++'] = "Share researches (advanced mode)";
		MM.TEXT['premessages_projects'] = "Share projects";
		MM.TEXT['premessages_planet'] = "Share a planet";
		MM.TEXT['message-overwrite_retrieve'] = "Warning: this will overwrite your current message. Continue?";
		MM.TEXT['message-overwrite_build'] = "Do you wish to overwrite your current message (Cancel) or add this to its end (OK)?";
		MM.TEXT['preformat-researches_nomodule'] = "Please access the laboratory in order to activate research preformatting.";
		MM.TEXT['preformat-researches_title'] = "Researches:";
		MM.TEXT['preformat-researches++_title'] = "<img src='" + MM.src + "ico.png' /> Sharing researches — advanced mode";
		MM.TEXT['preformat-researches++_share'] = "Share ?";
		MM.TEXT['preformat-researches++_name'] = "Name";
		MM.TEXT['preformat-researches++_progress'] = "%";
		MM.TEXT['preformat-researches++_important'] = "Important ?";
		MM.TEXT['preformat-researches++_relay'] = "Need a relay ?";
		MM.TEXT['preformat-researches++_submit'] = "Share researches";
		MM.TEXT['preformat-researches++_text_important'] = "priority research";
		MM.TEXT['preformat-researches++_text_relay'] = "relay needed";
		MM.TEXT['preformat-inventory_HELP_DRONE'] = "Support drone";
		MM.TEXT['preformat-inventory_CAMERA'] = "Camera";
		MM.TEXT['preformat-inventory_thirsty'] = "thirsty";
		MM.TEXT['preformat-inventory_dry'] = "dry";
		MM.TEXT['preformat-inventory_diseased'] = "diseased";
		MM.TEXT['preformat-inventory_broken'] = "broken";
		MM.TEXT['preformat-inventory_charge'] = "charge(s)";
		MM.TEXT['preformat-planet_none'] = "You haven't scanned any planet yet.";
		MM.TEXT['preformat-planet_title'] = "Choose a planet:";
		MM.TEXT['preformat-planet_nomodule'] = "Please access the Astro Terminal in order to activate planet preformatting.";
		MM.TEXT['preformat-planet_both'] = "Share both";
		MM.TEXT['preformat-planet_unknown'] = "unknown zone(s)";
		MM.TEXT['preformat-projects_nomodule'] = "Please access the NERON Core in order to activate research preformatting.";
		MM.TEXT['preformat-projects_title'] = "New projects:";
		MM.TEXT['minimap-button'] = "Show the MushMobile minimap";
		MM.TEXT['minimap-title'] = "MushMobile minimap";
		MM.TEXT['minimap-warning'] = "<b>WARNING:</b> This minimap is not that of the Flash game, but merely a map of the Daedalus containing a little information. It may also not display certain reports.";
		MM.TEXT['minimap-legend'] = "<b>Legend:</b> <span class='MMmapfire'>Reported fire</span> <span class='MMmapalertd'>Reported doors</span> <span class='MMmapalerte'>Reported equipments</span>";
		MM.TEXT['minimap-room'] = "You selected: <b><span id='MMminimaproom'>nothing</span></b>.";
		
		MM.localerooms = ['Bridge', 'Alpha Bay', 'Bravo Bay', 'Alpha Bay 2', 'Nexus', 'Medlab', 'Laboratory', 'Refectory', 'Hydroponic Garden', 'Engine Room', 'Front Alpha Turret', 'Centre Alpha Turret', 'Rear Alpha Turret', 'Front Bravo Turret', 'Centre Bravo Turret', 'Rear Bravo Turret', 'Patrol Ship Tomorrowland', 'Patrol Ship Olive Grove', 'Patrol Ship Yasmin', 'Patrol Ship Wolf', 'Patrol Ship E-Street', 'Patrol Ship Eponine', 'Patrol Ship Carpe Diem', 'Pasiphae', 'Front Corridor', 'Central Corridor', 'Rear Corridor', 'Planet', 'Icarus Bay', 'Alpha Dorm', 'Bravo Dorm', 'Front Storage', 'Centre Alpha Storage', 'Rear Alpha Storage', 'Centre Bravo Storage', 'Rear Bravo Storage', 'Outer Space', 'Limbo'];
		break;
	}
};



/* FONCTION D'INITIALISATION */

MM.init = function() {
	if (MM.sel('#MMbar') == null)
	{
		MM.initCss();
		MM.initMenubar();
		MM.initTabs();
	}
	MM.charTab();
	MM.shipTab();
	MM.roomTab();
	MM.chatTab();
	MM.gameTab();
	MM.messageEditor();
	MM.changeActionFunctions();
	Main.selUpdtArr.push('chat_col'); //Pour que .cycletime puisse être mis à jour en interne
	MM.sel('#content').scrollLeft = 0;

	//Première fois : alerte à lire
	if (MM.parameters['first-time'])
	{
		MM.copyEl(MM.sel('#dialog'), document.body).style.display = 'block';
		MM.sel('#MMdialog_title').innerHTML = "<img src='" + MM.src + "ico.png' />  " + MM.TEXT['warning_title'];
		MM.addNewEl('p', MM.sel('#MMdialog_body'), null, MM.TEXT['warning_1']);
		MM.addNewEl('p', MM.sel('#MMdialog_body'), null, MM.TEXT['warning_2']);
		MM.addNewEl('p', MM.sel('#MMdialog_body'), null, MM.TEXT['warning_3']);
		MM.sel('#MMdialog_ok').addEventListener('click', function() { document.body.removeChild(MM.sel('#MMdialog')); });
		MM.parameters['first-time'] = false;
		MM.setMMParameters();
	}

	//Le rechargement interne de la page écrase les modifications et ajouts, donc on fait une vérification régulière
	window.setInterval(function() {
		if (!MM.sel('#MMenergybar'))
			{ MM.reInit(); }
	}, 250);
};



/* VARIABLES */

//MM.src = "http://labare.alwaysdata.net/MushMobile/";
MM.src = "http://labare.github.io/MushMobile/";

MM.smileys = [['pa_pm', 'pslots.png'], ['pa', 'pa_slot1.png'], ['pm', 'pa_slot2.png'], ['pv|hp', 'lp.png'], ['xp', 'xp.png'], ['xpbig', 'xpbig.png'], ['pa_heal', 'pa_heal.png'], ['asocial', 'status/unsociable.png'], ['disabled', 'status/disabled.png'], ['hungry', 'status/hungry.png'], ['hurt', 'status/hurt.png'], ['ill', 'status/disease.png'], ['psy_disease', 'status/psy_disease.png'], ['commander', 'title_01.png'], ['admin_neron', 'title_02.png'], ['resp_comm', 'title_03.png'], ['alert', 'alert.png'], ['com', 'comm.png'], ['door', 'door.png'], ['plant_youngling', 'plant_youngling.png'], ['plant_thirsty', 'plant_thirsty.png'], ['plant_dry', 'plant_dry.png'], ['plant_diseased', 'plant_diseased.png'], ['bin', 'bin.png'], ['next', 'pageright.png'], ['ship_triumph', 'daedalus_triumph.png'], ['pa_comp', 'pa_comp.png'], ['pa_cook', 'pa_cook.png'], ['pa_core', 'pa_core.png'], ['pa_eng|eng', 'pa_eng.png'], ['pa_garden', 'pa_garden.png'], ['pa_pilgred', 'pa_pilgred.png'], ['pa_shoot', 'pa_shoot.png'], ['laid', 'status/laid.png'], ['mastered', 'status/mastered.png'], ['mush', 'mush.png'], ['stink', 'status/stinky.png'], ['fuel', 'fuel.png'], ['o2', 'o2.png'], ['moral|pmo', 'moral.png'], ['eat', 'sat.png'], ['pills', 'demoralized2.png'], ['dead', 'dead.png'], ['hunter', 'hunter.png'], ['fire', 'fire.png'], ['more', 'more.png'], ['less', 'less.png'], ['chut', 'discrete.png'], ['talk', 'talk.gif'], ['talky', 'talkie.png'], ['cat', 'cat.png'], ['time', 'casio.png'], ['tip', 'tip.png'], ['triumph', 'triumph.png']];

MM.ME_NERON = false;
MM.ME_ALONE = true;
MM.ME_MODULING = false;
MM.GUARDIAN = false;
MM.GRAVITY = true;



/** INITIALISATION **/

if (MM.sel('#MMbar') == null) //Une seule initialisation suffit, sinon ça casse !
{
	MM.getMMParameters();
	MM.locale();
}