// ==UserScript==
// @name      Small(Mush)
// @version   0.9.1
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
var _tid = unsafeWindow._tid || _tid;
var js = unsafeWindow.js || js;


var SM = {};


/* FONCTIONS DÉVELOPPEUR */

SM.sel = function(name) {
	if (name[0] == "." && name.search(' ') == -1) { return document.getElementsByClassName(name.slice(1))[0]; }
	else if (name[0] == '#' && name.search(' ') == -1) { return document.getElementById(name.slice(1)); }
	else { return document.querySelector(name); }
};


SM.getAttributesList = function(el) {
	var attrs = [];
	for (var i = 0; i < el.attributes.length; i++)
	{
		if (el.attributes[i].name != 'id')
			{ attrs.push([el.attributes[i].name, el.attributes[i].value]); }
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
	if (attrs) { for (var i = 0; i < attrs.length; i++) { el.setAttribute(attrs[i][0], attrs[i][1]); } }
	if (parent) { parent.appendChild(el); }
	return el;
};


SM.addButton = function(parent, text, attrs) {
	var butattrs = [['class', 'but']];
	if (attrs) {
		for (var i = 0; i < attrs.length; i++) {
			if (attrs[i][0] == 'class')
				{ butattrs[0][1] += ' ' + attrs[i][1]; }
			else
				{ butattrs.push(attrs[i]); }
		}
	}
	var a = SM.addNewEl('div', parent, null, null, butattrs);
	var b = SM.addNewEl('div', a, null, null, [['class', 'butright']]);
	var c = SM.addNewEl('div', b, null, text, [['class', 'butbg']]);
	return a;
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
	for (i = 0; i < children.length; i++)
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



/* FONCTIONS SMALL(MUSH) */

SM.generateMinimap = function() {
	var rooms = [['m129.5 10.5 0 20 -20 0 0 60 100 0 0 -60 -20 0 0 -20 -60 0z', [155, 50]], [60, 120, 249.5, 230.5], [60, 120, 9.5, 230.5], [60, 120, 249.5, 350.5], [60, 40, 129.5, 310.5], [80, 60, 69.5, 170.5], [80, 60, 69.5, 110.5], [100, 60, 109.5, 250.5], [80, 60, 169.5, 110.5], [180, 90, 69.5, 430.5], [40, 40, 209.5, 50.5], [40, 40, 249.5, 190.5], [40, 40, 249.5, 470.5], [40, 40, 69.5, 50.5], [40, 40, 29.5, 190.5], [40, 40, 29.5, 470.5], [], [], [], [], [], [], [], [], ['m69.5 90.5 0 20 80 0 0 120 20 0 0 -120 80 0 0 -20 -180 0z', [160, 92]], [180, 20, 69.5, 230.5], [220, 20, 29.5, 350.5], [], [60, 100, 9.5, 370.5], ['m209.5 290.5 0 20 -20 0 0 40 60 0 0 -60 -40 0z', [210, 320]], ['m69.5 290.5 0 60 60 0 0 -40 -20 0 0 -20 -40 0z', [100, 320]], [80, 60, 169.5, 170.5], [40, 40, 209.5, 250.5], [40, 60, 209.5, 370.5], [40, 40, 69.5, 250.5], [40, 60, 69.5, 370.5]];

	var doors = [['209.5 60.5 0 20', '0-10'], ['109.5 60.5 0 20', '0-13'], ['149.5 90.5 20 0', '0-24'], ['259.5 350.5 20 0', '1-3'], ['259.5 230.5 20 0', '1-11'], ['249.5 230.5 0 20', '1-25'], ['249.5 300.5 0 20', '1-29'], ['249.5 260.5 0 20', '1-32'], ['39.5 230.5 20 0', '2-14'], ['69.5 230.5 0 20', '2-25'], ['39.5 350.5 20 0', '2-26'], ['69.5 300.5 0 20', '2-30'], ['69.5 260.5 0 20', '2-34'], ['249.5 440.5 0 20', '3-9'], ['259.5 470.5 20 0', '3-12'], ['249.5 350.5 0 20', '3-26'], ['149.5 350.5 20 0', '4-26'], ['119.5 170.5 20 0', '5-6'], ['69.5 200.5 0 20', '5-14'], ['149.5 180.5 0 20', '5-24'], ['149.5 140.5 0 20', '6-24'], ['149.5 250.5 20 0', '7-25'], ['169.5 140.5 0 20', '8-24'], ['179.5 170.5 20 0', '8-31'], ['249.5 480.5 0 20', '9-12'], ['69.5 480.5 0 20', '9-15'], ['69.5 440.5 0 20', '9-28'], ['219.5 430.5 20 0', '9-33'], ['79.5 430.5 20 0', '9-35'], ['219.5 90.5 20 0', '10-24'], ['249.5 200.5 0 20', '11-31'], ['79.5 90.5 20 0', '13-24'], ['39.5 470.5 20 0', '15-28'], ['149.5 230.5 20 0', '24-25'], ['169.5 180.5 0 20', '24-31'], ['39.5 370.5 20 0', '26-28'],  ['219.5 350.5 20 0', '26-29'], ['79.5 350.5 20 0', '26-30'], ['219.5 370.5 20 0', '26-33'], ['79.5 370.5 20 0', '26-35']];

	var popup = SM.sel('#SMpopup');
	popup.innerHTML = '';
	SM.addButton(popup, "X", [['id', 'SMpopupclose']]).addEventListener('click', function() { SM.sel('#SMpopup').style.display = 'none'; });
	popup.style.display = 'block';

	SM.addNewEl('h4', popup, null, "<img src='" + SM.src + "ico.png' /> " + SM.TEXT['minimap-title']);
	SM.addNewEl('p', popup, null, SM.TEXT['minimap-warning']);
	SM.addNewEl('p', popup, null, SM.TEXT['minimap-legend']).className = 'nospace';
	SM.addNewEl('p', popup, null, SM.TEXT['minimap-room']).className = 'nospace';

	var al = { fAl: 'fire', dAl: 'door', eAl: 'alert' }; //Incendies, portes, équipements
	for (var j in al)
	{
		var k = SM.sel('.alarm_bg [src$="/' + al[j] + '.png"]');
		al[j] = ((k) ? k.parentNode.getAttribute('onmouseover').replace(/\\r|\\n/g, '').replace(/\s+/g, ' ') : '');
	}

	var bloc = SM.addNewEl('div', popup, 'SMminimapbloc');
	var svg = SM.addNewEl('svg', bloc, 'SMminimap', null, [['width', '320'], ['height', '530']]);

	for (i = 0; i < rooms.length; i++)
	{
		var r = rooms[i];
		if (!r.length)
			{ continue; }

		var regexp = RegExp(SM.alertrooms[i] + '\\s\*\[\^2\]', 'g'); //Attention à Baie Alpha et Baie Alpha 2
		if (regexp.test(al.fAl))
			{ var roomclass = 'SMmaproom SMmapfire'; }
		else
			{ var roomclass = 'SMmaproom'; }
		if (r.length == 2) //Pièce non rectangulaire
		{
			SM.addNewEl('path', svg, null, null, [['d', r[0]], ['data-maproom', i], ['class', roomclass]]).addEventListener('click', function() {
				var halo = SM.sel('#SMmapselected');
				if (halo) { halo.id = ''; }
				SM.sel('#SMminimaproom').textContent = SM.localerooms[parseInt(this.getAttribute('data-maproom'))];
				this.id = 'SMmapselected';
			});
			var c = r[1];
		}
		else //Pièce rectangulaire
		{
			SM.addNewEl('rect', svg, null, null, [['width', r[0]], ['height', r[1]], ['x', r[2]], ['y', r[3]], ['data-maproom', i], ['class', roomclass]]).addEventListener('click', function() {
				var halo = SM.sel('#SMmapselected');
				if (halo) { halo.id = ''; }
				SM.sel('#SMminimaproom').textContent = SM.localerooms[parseInt(this.getAttribute('data-maproom'))];
				this.id = 'SMmapselected';
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
			SM.addNewEl('div', bloc, null, rd, [['style', 'position: absolute; left: ' + (c[0] - 10) + 'px; top: ' + c[1] + 'px;'], ['class', 'SMmapalertd']]);
			SM.addNewEl('div', bloc, null, re, [['style', 'position: absolute; left: ' + (c[0] +5) + 'px; top: ' + c[1] + 'px;'], ['class', 'SMmapalerte']]);
		}
		else if (rd)
			{ SM.addNewEl('div', bloc, null, rd, [['style', 'position: absolute; left: ' + (c[0] - 5) + 'px; top: ' + c[1] + 'px;'], ['class', 'SMmapalertd']]); }
		else if (re)
			{ SM.addNewEl('div', bloc, null, re, [['style', 'position: absolute; left: ' + (c[0] - 5) + 'px; top: ' + c[1] + 'px;'], ['class', 'SMmapalerte']]); }
	}
	//Portes
	for (i = 0; i < doors.length; i++)
		{ SM.addNewEl('path', svg, null, null, [['d', 'm' + doors[i][0]], ['data-mapdoor', doors[i][1]], ['class', 'SMmapdoor']]); }
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
		if (char.parentNode.getAttribute('data-visible-tab') == 'room_col') /* Si on vient de l'onglet Flash */
		{
			SM.sel('#content').scrollLeft = 0;
			SM.sel('#topinfo_bar').style.left = '0';
			SM.sel('.mxhead').style.left = '0';
		}
		char.style.display = 'none';
		SM.sel('#ship_tab').style.display = 'none';
		SM.sel('#room_tab').style.display = 'none';
		SM.sel('#chat_col').style.display = 'none';
		SM.sel('#' + newtab).style.display = 'block';
	}
	char.parentNode.setAttribute('data-visible-tab', newtab);
};


SM.SMhelp = function(e) {
	var el = document.elementFromPoint(e.clientX, e.clientY);
	for (i = 0; i < 5; i++)
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
			var desc = el.getAttribute('data-desc').replace(/\\'/g, "'").replace(/\n|\r/g, '');
			Main.showTip(el, "<div class='tiptop'><div class='tipbottom'><div class='tipbg'><div class='tipcontent'><h1>" + name + "</h1>" + desc + "</div></div></div></div>");
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
		//Vérification (non-bloquante) d'énergie pour se déplacer
		var energy = false;
		if (SM.sel('[src$="/pa1.png"]') || SM.sel('[src$="/pa2.png"]'))
			{ energy = true; }
		//Monture non fonctionnelle aux cycles impairs
		var boulder = false;
		if (SM.sel('#myInventory [style*="rolling_boulder.jpg"]') && !(parseInt(SM.sel('.cycletime').textContent.match(/([0-9]+)/g)[1]) % 2))
			{ boulder = true; }
		var disabled = SM.sel('.statuses [src$="disabled.png"]');
		/* Soit :
		- on n'est pas handicapé et on n'a pas d'énergie ;
		- on est handicapé, on est seul, et soit on n'a pas d'énergie, soit le Simulateur de gravité est en panne et ni compétence Sprinter, ni Trottinette ni Monture rocheuse fonctionnelle sur soi. */
		if
		(
			(!disabled && !energy)
			||
			(disabled && SM.ME_ALONE
				&& (!energy || (!SM.GRAVITY && !SM.sel('#char_col [src$="skills/sprint.png"]') && !SM.sel('#myInventory [style*="antigrav_scooter.jpg"]') && !boulder))
			)
		)
		{
			if (!confirm(SM.TEXT['move_alert']))
				{ return false; }
		}
		
		if (SM.GUARDIAN && !confirm(SM.TEXT['move_guardian']))
			{ return false; }
		
		if (confirm(SM.TEXT['move_confirm'] + roomname + " ?"))
		{
			el.firstChild.firstChild.innerHTML = "<img class='cdLoading' src='/img/icons/ui/loading1.gif' alt='loading…' /> " + SM.TEXT['move_button'];
			if (SM.ME_MODULING) //Si le joueur est en train d'accéder à un terminal, il gardera le statut Concentré ; il faut donc quitter avant
			{
				SM.sel('#SMloadscreen').style.display = 'block';
				SM.SMexitModule(function() {
					SM.sel('#SMloadscreen').style.display = 'block';
					Main.ajax('/?fa=81&fp=' + select.value, null, function() {
						SM.changeTab('room_tab');
						SM.sel('#SMloadscreen').style.display = 'none';
					});
				});
			}
			else
				{ Main.ajax('/?fa=81&fp=' + select.value); }
		}
	}
};


SM.displayRoomActions = function(type, serial) { //0: personnage; 1: équipment; 3: chat
	var herohalo = SM.sel('#SMheroselected'); //Halo autour d'un personnage ou de Schrödinger
	var itemhalo = SM.sel('.SMselected'); //Halo autour d'un item de l'inventaire SM
	if (itemhalo)
		{ itemhalo.parentNode.removeChild(itemhalo); }

	switch (type)
	{
		case 0: //Personnage
			SM.sel('#equipmentselect').selectedIndex = 0;
			var selectedhero = SM.sel('[data-serial="' + serial + '"]');

			if (herohalo)
			{
				if (herohalo.parentNode == selectedhero)
				{
					selectedhero.removeChild(herohalo);
					SM.updateRoomActions(4);
					break;
				}
				else
					{ herohalo.parentNode.removeChild(herohalo); }
			}
			var hero = Main.heroes.get(serial);
			SM.moveEl(SM.addNewEl('img', null, 'SMheroselected', null, [['src', selectedhero.lastElementChild.getAttribute('src').replace(/\.png/, '_selected.png')]]), selectedhero, selectedhero.lastElementChild);
			SM.updateRoomActions(type, serial);
			break;

		case 1: //Équipement
			if (herohalo)
				{ herohalo.parentNode.removeChild(herohalo); }
				
			var serial = SM.sel('#equipmentselect').value;
			if (serial == 'NULL')
				{ SM.updateRoomActions(4); }
			else
				{ SM.updateRoomActions(type, serial); }
			break;

		case 3: //Chat
			SM.sel('#equipmentselect').selectedIndex = 0;
			var cat = SM.sel('[data-serial="' + serial + '"]');

			if (herohalo)
			{
				if (herohalo.parentNode == cat)
				{
					cat.removeChild(herohalo);
					SM.updateRoomActions(4);
					break;
				}
				else
					{ herohalo.parentNode.removeChild(herohalo); }
			}
			SM.moveEl(SM.addNewEl('img', null, 'SMheroselected', null, [['src', SM.src + "ui/chars/schrodinger_selected.png"]]), cat, cat.lastElementChild);
			SM.updateRoomActions(type, serial);
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
			SM.addNewEl('div', actionListA, null, null, [['class', 'cdFace face portrait_' + hero.dev_surname]]); //Portrait
			var herostatus = SM.addNewEl('div', actionListA, null, null, [['class', 'status']]);
			SM.addNewEl('div', herostatus, null, hero.name, [['class', 'cdCharName charname']]); //Nom

			//Statuts
			var statuslist = SM.addNewEl('ul', herostatus, null, null, [['class', 'cdStatusList']]);
			var statuses = hero.statuses.iterator();
			while (statuses.hasNext())
			{
				var status = statuses.next();
				SM.addNewEl('li', statuslist, null, '<img src="/img/icons/ui/status/' + status.img + '.png" />', [['onmouseover', 'Main.showTip(this,"<div class=\'tiptop\' ><div class=\'tipbottom\'><div class=\'tipbg\'><div class=\'tipcontent\'><h1>' + status.name + '</h1>' + status.desc + '</div></div></div></div>");'], ['onmouseout', 'Main.hideTip();']]);
			}

			//Titres
			var titles = hero.titles.iterator();
			while (titles.hasNext())
			{
				var title = titles.next();
				SM.addNewEl('li', statuslist, null, '<img src="/img/icons/ui/' + title.img + '.png" />', [['onmouseover', 'Main.showTip(this,"<div class=\'tiptop\' ><div class=\'tipbottom\'><div class=\'tipbg\'><div class=\'tipcontent\'><h1>' + title.name + '</h1>' + title.desc + '</div></div></div></div>");'], ['onmouseout', 'Main.hideTip();']]);
			}

			//Spores
			if (hero.spores != null)
				{ SM.addNewEl('li', SM.addNewEl('span', statuslist), null, "<img src='" + hero.spores.img + "' />x" + hero.spores.nb); }

			//Bio courte
			SM.addNewEl('div', actionListA, null, hero.short_desc, [['class', 'presentation']]);

			//Compétences
			var skillslist = SM.addNewEl('ul', actionListA, null, null, [['class', 'cdSkills skills']]);
			var skills = hero.skills.iterator();
			while (skills.hasNext())
			{
				var skill = skills.next();
				SM.addNewEl('li', skillslist, null, '<img src="/img/icons/skills/' + skill.img + '.png" />', [['onmouseover', 'Main.showTip(this,"<div class=\'tiptop\' ><div class=\'tipbottom\'><div class=\'tipbg\'><div class=\'tipcontent\'><h1>' + skill.name + '</h1>' + skill.desc.replace(/\n/g, '') + '</div></div></div></div>");'], ['onmouseout', 'Main.hideTip();']]);
			} //.replace car un retour à la ligne empêcherait l'infobulle d'être correcte pour certains navigateurs (ex. Prémonition)

			//Boutons d'action
			var actions = SM.toArray(document.querySelectorAll('.cdActionRepository [webdata="' + serial + '"]'));
			for (j = 0; j < actions.length; j++)
				{ SM.copyEl(actions[j], actionListB); }

			actionListA.parentNode.className = 'player';
			SM.sel('#SMtt_itemname').textContent = hero.name;
			break;

		case 1: //Équipement
			var actions = SM.toArray(document.querySelectorAll('.cdActionRepository [webdata="' + serial + '"]'));
			for (j = 0; j < actions.length; j++)
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
			for (j = 0; j < actions.length; j++)
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
			if (SM.parameters['food-desc'] && item.getAttribute('data-id') == 'CONSUMABLE')
				{ SM.sel('#SMitemdesc').innerHTML = item.getAttribute('data-desc').replace(/\\r|\\n/g, '').replace(/\s+/g, ' ').replace(/\\'/g, "'"); }
			else
				{ SM.sel('#SMitemdesc').innerHTML = ''; }
			break;

		case 3: //Chat
			var action = document.querySelector('.cdActionRepository [webdata="' + serial + '"]'); //Une seule action, Prendre
			SM.copyEl(action, actionListA);

			SM.sel('#SMtt_itemname').textContent = 'Schrödinger';
			break;

		case 4: //Reset (déjà fait au début)
			break;
	}

};


SM.changeChatTab = function(el) {
	if (el.getAttribute('data-tab')) //Onglet original
	{
		SM.sel('#SMeditortab').className = 'tab taboff';
		SM.sel('#SMeditor').style.display = 'none';
		Main.selChat(parseInt(el.getAttribute('data-tab')));
		SM.sel('#chatBlock').style.height = '500px';
    }
    
    else //Onglet Éditeur de messages
	{
		var tabs = SM.sel('#cdTabsChat').children;
		for (i = 0; i < tabs.length; i++)
			{ tabs[i].className = tabs[i].className.replace(/tabon/, 'taboff'); }
		SM.sel('#SMeditortab').className = 'tab tabon';

		//Onglets
		var walls = SM.sel('#chatBlock').children;
		for (i = 0; i < walls.length; i++)
			{ walls[i].style.display = 'none'; }
		SM.sel('#SMeditor').style.display = 'block';

		//Entrées de texte
		SM.sel('#wall').style.display = 'none';
		SM.sel('#privateform').style.display = 'none';

		SM.sel('#chatBlock').style.height = 'auto';
	}
};


SM.SMexitModule = function(func) {
	js.JQuery(".cdExitModuleButton").prepend("<img class='cdLoading' src='/img/icons/ui/loading1.gif' alt='loading…' />");
	js.JQuery("#input").attr("isModule", "false");
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
	SM.sel('.cdExitModuleButton').style.display = 'none';
	SM.sel('#cdMainContent').style.display = 'block';
};


SM.changeActionFunctions = function() {
	//Boutons Nouveau cycle et Nouvelle étape
	SM.sel('#txt_new_cycle a').setAttribute('onclick', 'Main.ajax("/", null, function() { SM.reInit(); Main.onLoad(1); Main.enableClock = true; }); return false;');
	SM.sel('#txt_new_step a').setAttribute('onclick', 'Main.ajax("/", null, function() { SM.reInit(); Main.onLoad(1); Main.enableClock = true; }); return false;');
	//Boutons d'action
	var actions = document.querySelectorAll('.but:not(.fake) [href^="?action="]');
	for (i = 0; i < actions.length; i++)
	{
		if (!actions[i].getAttribute('onclick').match(/SM\./))
			{ actions[i].setAttribute('onclick', 'if (!SM.beforeAction(this)) { return false; } ' + actions[i].getAttribute('onclick')); }
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
	if (SM.parameters['confirm-action'])
	{
		if (!confirm(SM.TEXT['confirm_action'] + el.innerHTML.trim().replace(/ ?<img(?:.*)\/?>/g, SM.TEXT['ap']).replace(/<\/?span>/g, '').replace(/\s+/g, ' ') + "' ?"))
			{ return false; }
	}

	//Changement d'onglet Small(Mush)
	var action = Main.extractAction(el.getAttribute('href'));
	//Accéder à un terminal ou au Bloc de post-it, Envoyer une mission
	if (['ACCESS', 'COMMANDER_ORDER'].indexOf(action) != -1)
	{
		SM.changeTab('room_col');
		SM.sel('#SMloadscreen').style.display = 'block';
	}
	//Examiner, Lire, Vérifier son niveau pré-fongique, Lister l'équipage, Lire le niveau de fuel dans la Chambre de combustion
	else if (['INSPECT', 'CONSULT_DOC', 'CHECK_FOR_INFECTION', 'CHECK_CREW_LIST', 'CHECK_LEVEL'].indexOf(action) != -1)
	{
		SM.changeTab('chat_col');
		SM.sel('#SMloadscreen').style.display = 'block';
	}

	return true;
};


SM.reInit = function() {
	SM.ME_NERON = false;
	SM.ME_ALONE = true;
	SM.ME_MODULING = false;
	SM.GUARDIAN = false;
	SM.GRAVITY = true;

	SM.sel('#ship_tab').innerHTML = '';
	SM.sel('#room_tab').innerHTML = '';
	SM.charTab();
	SM.shipTab();
	SM.roomTab();
	SM.chatTab();
	SM.gameTab();
	SM.messageEditor();
	SM.changeActionFunctions();
	SM.sel("#SMbar .cycletime").textContent = SM.sel("#chat_col .cycletime").textContent;
	SM.sel('#SMloadscreen').style.display = 'none';
};


SM.showLicense = function() {
	var popup = SM.sel('#SMpopup');
	popup.innerHTML = '';
	SM.addButton(popup, "X", [['id', 'SMpopupclose']]).addEventListener('click', function() { SM.sel('#SMpopup').style.display = 'none'; });
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
		SM.moveEl(SM.addNewEl('div', null, null, null, [['class', 'SMselected']]), item, itemchild);
		SM.updateRoomActions(2, item.getAttribute('serial'));
	}

	SM.sel('#equipmentselect').selectedIndex = 0;
	var heroselection = SM.sel('#SMheroselected');
	if (heroselection)
		{ heroselection.parentNode.removeChild(heroselection); }
};


SM.itemLeft = function() {
	var inventory = SM.sel('#SMroom');
	var arrowleft = SM.sel('#SMtt_itemname').previousElementSibling;
	var arrowright = SM.sel('#SMtt_itemname').nextElementSibling;
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


SM.itemRight = function() {
	var inventory = SM.sel('#SMroom');
	var arrowleft = SM.sel('#SMtt_itemname').previousElementSibling;
	var arrowright = SM.sel('#SMtt_itemname').nextElementSibling;
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



/* FONCTIONS RELATIVES AUX PARAMÈTRES SMALL(MUSH) */

SM.getSMParameters = function() {
	SM.parameters = {};
	SM.parameters['first-time'] = true;
	SM.parameters['confirm-action'] = true;
	SM.parameters['food-desc'] = true;
	SM.parameters['forced-locale'] = false;
	SM.parameters['locale'] = '0'; //0: non forcé ; 1: français ; 2: anglais

	var offset = document.cookie.search('SMparams');
	if (offset != -1)
	{
		var parameters = document.cookie.slice(offset + 9); //Pas de fin en cas d'ajout de paramètres ; les nouveaux prendront simplement la valeur false
		SM.parameters['first-time'] = ((parameters[0] == '1') ? true : false);
		SM.parameters['confirm-action'] = ((parameters[1] == '1') ? true : false);
		SM.parameters['food-desc'] = ((parameters[2] == '1') ? true : false);
		SM.parameters['forced-locale'] = ((['1', '2'].indexOf(parameters[3]) != -1) ? true : false);
		if (SM.parameters['forced-locale'])
			{ SM.parameters['locale'] = parseInt(parameters[3]); }
		else
			{ SM.parameters['locale'] = ['', 'mush.vg', 'mush.twinoid.com'].indexOf(document.domain); }
	}
	else
		{ SM.setSMParameters(); }

	return true;
	//SMparams=011
	//0123456789AB
};


SM.setSMParameters = function() {
	var parameters = '0'; //paramètre 'first-time' passant forcément à false
	parameters += ((SM.parameters['confirm-action']) ? 1 : 0);
	parameters += ((SM.parameters['food-desc']) ? 1 : 0);
	parameters += ((SM.parameters['forced-locale']) ? SM.parameters['locale'] : 0);

	var date = new Date();
	date.setTime(date.getTime() + 31536000000);
	document.cookie = 'SMparams=' + parameters + '; expires=' + date.toGMTString() + '; path=/';
};


SM.buildParamsMenu = function() {
	var popup = SM.sel('#SMpopup');
	popup.innerHTML = '';

	SM.addButton(popup, "X", [['id', 'SMpopupclose']]).addEventListener('click', function() { SM.sel('#SMpopup').style.display = 'none'; });
	SM.addNewEl('h4', popup, null, SM.TEXT['SMparams_title'] + "  <img src='" + SM.src + "ico.png' />");

	var parameters = ['confirm-action', 'food-desc', 'forced-locale'];
	for (i = 0; i < parameters.length; i++)
	{
		var parameter = parameters[i];
		var div = SM.addNewEl('div', popup);
		if (SM.parameters[parameter])
		{
			SM.addNewEl('input', div, null, null, [['type', 'checkbox'], ['checked', 'true']]);
			div.addEventListener('click', function() { SM.parameters[parameter] = false; SM.setSMParameters(); });
		}
		else
		{
			SM.addNewEl('input', div, null, null, [['type', 'checkbox']]);
			div.addEventListener('click', function() { SM.parameters[parameter] = true; SM.setSMParameters(); });
		}
		div.innerHTML += SM.TEXT['SMparams_' + parameter];
		div.className = 'SMparamsdiv';
	}

	SM.addNewEl('p', popup, null, SM.TEXT['SMparams_lang-title']);
	var langs = SM.addNewEl('select', popup, 'SMlangselect');
	SM.addNewEl('option', langs, null, "Français", ((SM.parameters['locale'] == 1) ? [['value', '1'], ['selected', 'selected']] : [['value', '1']]));
	SM.addNewEl('option', langs, null, "English", ((SM.parameters['locale'] == 2) ? [['value', '2'], ['selected', 'selected']] : [['value', '2']]));
	langs.addEventListener('change', function() { SM.parameters['locale'] = this.value; SM.locale(); SM.setSMParameters(); });

	//Affichage de l'inventaire dans l'onglet Module
	SM.addButton(popup, SM.TEXT['show-flash-inventory']).addEventListener('click', function() {
		SM.changeTab('room_col');
		SM.sel('#cdInventory').style.visibility = 'visible';
		SM.sel('#cdInventory').firstElementChild.style.display = 'block';
		SM.sel('#roomActionList1').style.opacity = 1;
		SM.sel('#roomActionList2').style.opacity = 1;
	});

	SM.addNewEl('p', popup, null, SM.TEXT['SMparams_credits']);
};



/* FONCTIONS D'ADAPTATION DE L'INTERFACE */

SM.initCss = function() {
	SM.addNewEl('link', document.head, null, null, [['rel', 'stylesheet'], ['href', SM.src + "SmallMush.css"], ['type', 'text/css']]);
	SM.addNewEl('meta', document.head, null, null, [['name', 'viewport'], ['content', 'width=424px, initial-scale=' + screen.width / 424]]);

	SM.addNewEl('img', document.body, 'SMicon', null, [['src', SM.src + "ico.png"]]);
	SM.moveEl(SM.addNewEl('img', null, 'SMbottom', null, [['src', SM.src + "ui/bottom.png"]]), document.body, SM.sel('#tid_bar_down'));

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
	SM.addButton(bar, "<img src='" + SM.src + "ui/reload_Mush.png' />").addEventListener('click', function() {
		SM.sel('#SMloadscreen').style.display = 'block';
		Main.ajax('/', null, function() { SM.reInit(); SM.sel('#SMloadscreen').style.display = 'none'; });
	});
	SM.addNewEl('div', document.body, 'SMloadscreen', "<img src='/img/icons/ui/loading1.gif' />").addEventListener('click', function() { this.style.display = 'none'; });

	//Aide
	SM.addButton(bar, "<img src='http://mush.vg/img/icons/ui/infoalert.png' />?").addEventListener('click', function() { SM.sel('#SMhelpscreenA').style.display = 'block'; });
	//Premier écran noir : sélectionner l'élément ; second écran noir : cacher l'infobulle (sinon elle reste)
	SM.addNewEl('div', document.body, 'SMhelpscreenA', SM.TEXT['help_screen_A']).addEventListener('click', function(e) { this.style.display = 'none'; SM.SMhelp(e); });
	SM.addNewEl('div', document.body, 'SMhelpscreenB', SM.TEXT['help_screen_B']).addEventListener('click', function(e) { this.style.display = 'none'; Main.hideTip(); });

	SM.copyEl(SM.sel('.cycletime'), bar); //Jour et cycle
	SM.copyEl(SM.sel('.cdShipCasio'), bar); //Horloge

	//Paramètres Small(Mush)
	SM.addNewEl('img', bar, 'SMparams', null, [['src', SM.src + "ui/params.png"]]).addEventListener('click', function() {
		SM.buildParamsMenu();
		SM.sel('#SMpopup').style.display = 'block';
	});


	//Liens
	var links = SM.sel('#menuBar').children;
	for (i = 0; i < links.length; i++)
		{ links[i].firstElementChild.setAttribute('target', '_blank'); }

	//Onglets Small(Mush)
	var menu = SM.addNewEl('ul', SM.sel('.mxhead'), 'SMtabs');
	SM.addNewEl('li', menu, null, "<img src='/img/icons/ui/noob.png' />" + SM.TEXT['tabs_char']).addEventListener('click', function() { SM.changeTab('char_col'); });
	SM.addNewEl('li', menu, null, "<img src='/img/icons/ui/pa_core.png' />" + SM.TEXT['tabs_ship']).addEventListener('click', function() { SM.changeTab('ship_tab'); });
	SM.addNewEl('li', menu, null, "<img src='/img/icons/ui/door.png' />" + SM.TEXT['tabs_room']).addEventListener('click', function() { SM.changeTab('room_tab'); });
	SM.addNewEl('li', menu, null, "<img src='/img/icons/ui/wall.png' />" + SM.TEXT['tabs_chat']).addEventListener('click', function() { SM.changeTab('chat_col'); });
	SM.addNewEl('li', menu, null, "<img src='/img/icons/ui/moduling.png' />" + SM.TEXT['tabs_game']).addEventListener('click', function() { SM.changeTab('room_col'); });
	SM.addNewEl('li', menu, 'SMvending', "<img src='/img/icons/ui/credit_small.png' />" + SM.TEXT['tabs_shop']).addEventListener('click', function() {
		SM.sel('#SMvending').innerHTML = "<img src='/img/icons/ui/loading1.gif' />" + SM.TEXT['tabs_shop']; Main.ajax('/vending', null, function() {
			SM.reInit(); SM.changeTab('room_col'); SM.sel('#SMvending').innerHTML = "<img src='/img/icons/ui/credit_small.png' />" + SM.TEXT['tabs_shop'];
		});
	});

	SM.addNewEl('div', document.body, 'SMpopup').style.display = 'none';
	SM.buildParamsMenu();
};


SM.initTabs = function() {
	var tabs_box = SM.sel('#char_col').parentNode; //table.inter > tr
	tabs_box.setAttribute('data-visible-tab', 'char_col');
	tabs_box.id = 'tabs_box';

	var char_tab = SM.sel('#char_col');
	var ship_tab = SM.addNewEl('td', tabs_box, 'ship_tab');
	var room_tab = SM.addNewEl('td', tabs_box, 'room_tab');
	var chat_tab = SM.sel('#chat_col');
	var game_tab = SM.sel('#room_col');

	//#room_col doit être à droite pour que le .scrollLeft fonctionne correctement ; sinon il est directement après #char_col
	SM.moveEl(ship_tab, tabs_box, game_tab);
	SM.moveEl(room_tab, tabs_box, game_tab);
	SM.moveEl(chat_tab, tabs_box, game_tab);

	char_tab.style.display = 'block';
	ship_tab.style.display = 'none';
	room_tab.style.display = 'none';
	chat_tab.style.display = 'none';
	//Ne pas cacher game_tab (#room_col), ou le jeu Flash ne fonctionnera pas ; utiliser .scrollLeft
};


SM.charTab = function() {
	var sheetmain = SM.sel('.sheetmain');
	//Affiche les actions joueur, qui sont normalement cachées jusqu'au chargement du jeu Flash
	var a = SM.sel('.cdActionRepository .heroRoomActions').children;
	for (i = 0; i < a.length - 1; i++) //Le dernier bouton est un reste de la beta à ne pas afficher (.move)
		{ SM.copyEl(a[i], SM.sel('.cdActionList')); }

	if (SM.sel('#SMenergybar')) //Si l'onglet n'a pas déjà été adapté
		{ return; }

	// COMPÉTENCES //
	SM.moveEl(SM.sel('[class="skills"]'), sheetmain, sheetmain.firstChild);

	// PERSONNAGE //
	//Bloc comprenant le portrait en fond (.avatar), le nom et les titres (.SMwho) en haut à gauche, le triomphe (triumphLi) en haut à droite, le niveau (.level) en bas à droite et le message de promo (.gogold) en bas, afin de pouvoir placer tous ces éléments en position:absolute
	var characterdiv = SM.moveEl(SM.addNewEl('div', null, 'SMcharacterdiv'), sheetmain, sheetmain.firstChild);
	SM.addNewEl('div', characterdiv, '', SM.sel('.who').parentNode.innerHTML).className = 'SMwho';
	var triumphLi = SM.sel('[src$="triumph.png"]').parentNode;
	SM.moveEl(SM.addNewEl('div', null, 'triumph', triumphLi.innerHTML.trim(), SM.getAttributesList(triumphLi)), characterdiv);
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
		var extratd = SM.addNewEl('td', SM.addNewEl('tr', SM.sel('.pvsm').firstElementChild), 'SMextratd', null, [['colspan', '2']]);
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
		{ var alertsdiv = SM.addNewEl('div', ship_tab, 'SMalerts', SM.sel('.alarm_bg').innerHTML + SM.getTipContent(SM.sel('.alarm').parentNode.onmouseover), [['class', 'SMnoalert']]); }
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
					var span = SM.moveEl(SM.addNewEl('span', null, null, SM.TEXT['show_alert_reports'], [['class', 'SMalertexpand']]), alertContent, alertContent.getElementsByClassName('ul')[0]);
					span.addEventListener('click', function() { SM.toggleAlertList(this); });
					alertContent.className = 'SMhidden_alerts';
				}

				//Mis à zéro, sinon l'infobulle s'affiche en passant la souris/le doigt sur l'alerte déjà lisible
				alert.onmouseover = '';
				alert.onmouseout = '';
			}

			if (alert.innerHTML.match(/simulator.png/))
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
		SM.copyEl(expoblock, ship_tab).style.display = 'block'; //Copie, et pas déplacement, sinon le bloc est perdu au rechargement interne
		expoblock.style.display = 'none';
		SM.moveEl(SM.addNewEl('img', null, null, null, [['src', '/img/icons/ui/planet.png']]), firstalert, firstalert.firstChild); //Icône planète = expédition en cours
	}

	// PROJETS, RECHERCHES & PILGRED //
	//.SMcardsbreak : saut de ligne
	SM.addNewEl('h4', ship_tab, null, SM.TEXT['cards-title']);
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
			li.onmouseover = function() { Main.showTip(this, SM.TEXT['plasma-onmouseover']); };
			li.onmouseout = function() { Main.hideTip(); };
			SM.moveEl(li, levels, levels.children[3]);
		}
	}
};


SM.roomTab = function() {
	var room_tab = SM.sel('#room_tab');
	SM.addNewEl('h4', room_tab, null, SM.TEXT['SM-added_tab']).className = 'SMtabwarning';
	SM.addNewEl('p', room_tab, null, SM.TEXT['SM-added_tab_text']).className = 'SMtabwarning';

	// INCENDIE DANS LA PIÈCE //
	var infobar = SM.sel('#topinfo_bar');
	var fireroom = SM.alertrooms[SM.rooms.indexOf(SM.sel('#input').getAttribute('d_name'))]; //Voir .alertrooms
	if (SM.sel('[href^="?action=SIGNAL_FIRE"]') //Pas encore signalé
		|| (document.querySelector('.alarm [src$="fire.png"]') //Signalé
		   && RegExp(fireroom + '\\s\*\[\^2\]').test(SM.getTipContent(document.querySelector('.alarm [src$="fire.png"]').parentNode.onmouseover)))
	)
	{
		infobar.className += ' SMfire'; //Changement du fond de la barre d'info
		SM.addNewEl('p', room_tab, 'SMfiretext', SM.TEXT['fire'], [['class', 'SMfire']]); //Ajout d'un texte
	}
	else //Remise à zéro
	{
		infobar.className = 'topinfo';
		if (SM.sel('#SMfiretext'))
			{ room_tab.removeChild(SM.sel('#SMfiretext')); }
	}

	// SE DÉPLACER //
	var doors = [[10,13,24],[11,25,32,29,3],[14,25,34,30,26],[1,26,12,9],[26],[6,24,14],[24,5],[25],[24,31],[28,15,12,33,35,3],[0,24],[31,1],[3,9],[0,24],[5,2],[28,9],[],[],[],[],[],[],[],[],[0,10,13,6,5,8,31,25],[2,24,7,1],[2,29,30,4,3,28,33,35],[],[26,15,9],[1,26],[2,26],[24,8,11],[1],[26,9],[2],[26,9],[],[]];
   
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
		var roomdoors = SM.addNewEl('select', room_tab, 'roomselect');
		SM.addButton(room_tab, SM.TEXT['move_button']).addEventListener('click', function() { SM.changeRoom(this); });

		for (i = 0; i < doors[room].length; i++)
		{
			var door = doors[room][i];
			if (brokendoors.indexOf(door) != -1)
				{ SM.addNewEl('option', roomdoors, null, SM.localerooms[door] + SM.TEXT['broken_door'], [['value', 'NULL'], ['class', 'SMbrokendoor']]); }
			else
				{ SM.addNewEl('option', roomdoors, null, SM.localerooms[door], [['value', door]]); }
		}
	}

	// ÉQUIPEMENTS //
	SM.addNewEl('p', room_tab, null, SM.TEXT['equipments']);
	var equipmentlist = SM.addNewEl('select', room_tab, 'equipmentselect');
	equipmentlist.addEventListener('change', function() { SM.displayRoomActions(1); });
	SM.addNewEl('option', equipmentlist, null, "—", [['value', 'NULL']]);

	var items = Main.items.iterator();
	while (items.hasNext())
	{
		var item = items.next();
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
			for (i = 0; i < actions.length; i++)
			{
				if (actions[i].innerHTML.indexOf('REPAIR_OBJECT') != -1 || actions[i].innerHTML.indexOf('REPAIR_PATROL_SHIP') != -1)
					{ eqname += ((item.iid == 'DOOR') ? SM.TEXT['broken_door'] : SM.TEXT['broken']); }
			}
			SM.addNewEl('option', equipmentlist, null, eqname, [['value', item.serial]]);
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

		var block = SM.addNewEl('li', herolist, null, null, [['class', 'SMheroblock'], ['data-serial', hero.serial]]);
		block.addEventListener('click', function() { SM.displayRoomActions(0, this.getAttribute('data-serial')); });


		if (berzerk)
			{ SM.addNewEl('img', block, null, null, [['src', SM.src + "ui/chars/berzerk.png"]]); }
		else
		{
			if (laid)
			{
				if (room == 5)
					{ SM.addNewEl('img', block, null, null, [['src', SM.src + "ui/bed_medlab.png"]]); }
				else
					{ SM.addNewEl('img', block, null, null, [['src', SM.src + "ui/bed_" + (Math.floor(Math.random() * 6) + 1) + ".png"]]); }
				SM.addNewEl('img', block, null, null, [['src', SM.src + "ui/chars/" + hero.dev_surname + "-laid.png"]]);
				if (herolist.children.length > 1)
					{ SM.moveEl(block, herolist, herolist.firstChild); }
				block.className += ' SMlaid';
			}
			else
				{ SM.addNewEl('img', block, null, null, [['src', SM.src + "ui/chars/" + hero.dev_surname + ".png"]]); }
		}
	}

	// SCHRÖDINGER //
	var cat = Main.npc.iterator();
	if (cat.hasNext())
	{
		var catli = SM.addNewEl('li', herolist, null, "<img src='" + SM.src + "ui/chars/schrodinger.png' />", [['class', 'SMheroblock'], ['data-serial', cat.next().serial]]);
		catli.addEventListener('click', function() { SM.displayRoomActions(3, this.getAttribute('data-serial')); });
	}

	// INVENTAIRE (COPIÉ) //
	SM.addButton(room_tab, SM.TEXT['show_inventory']).addEventListener('click', function() { SM.sel('#SMcdInventory').firstElementChild.style.display = 'block'; });
	var invblock = SM.copyEl(SM.sel('#cdInventory'), room_tab);
	invblock.style.visibility = 'visible';
	SM.sel('#SMroomActionList1').style.opacity = 1;
	SM.sel('#SMroomActionList2').style.opacity = 1;

	//Changement des fonctions Main par les fonctions SM
	SM.sel('#SMtt_itemname').previousElementSibling.setAttribute('onclick', 'SM.itemLeft();');
	SM.sel('#SMtt_itemname').nextElementSibling.setAttribute('onclick', 'SM.itemRight();');
	var inventory = SM.sel('#SMroom');
	for (i = 0; i < inventory.children.length; i++)
		{ inventory.children[i].setAttribute('onclick', 'SM.selectItem(this);'); }

	SM.moveEl(SM.addNewEl('div', null, 'SMitemdesc', null), invblock, invblock.lastElementChild);
};


SM.chatTab = function() {
	var chat = SM.sel('#cdMainChat');
	if (chat.className.search(/SM(hide|show)paste/) == -1)
	{
		chat.className = 'SMhidepaste';
		//#wall : création d'un nouveau topic général ; #privateform : création d'un message privé
		var wallinputs = [['#wall', '#cdChatInput5'], ['#privateform', '#cdChatInput7']];
		for (i = 0; i < wallinputs.length; i++)
		{
			var input = SM.sel(wallinputs[i][1]);
			input.setAttribute('onfocus', '$(this).addClass("chatboxfocus"); return true;'); //Main.onChatFocus ne fait qu'empêcher le collage… -_-
			input.value = '';
			SM.addButton(SM.sel(wallinputs[i][0]), SM.TEXT['paste'], [['class', 'SMpastebutton'], ['data-id', wallinputs[i][1]]]).addEventListener('click', function() {
				if (SM.previewtext)
				{
					var t = SM.sel(this.getAttribute('data-id'));
					t.value = SM.previewtext;
					t.focus();
				}
				SM.sel('#cdMainChat').className = 'SMhidepaste';
			});
		}
	}

	//Topics
	var units = document.getElementsByClassName('unit');
	for (i = 0; i < units.length; i++)
	{
		if (units[i].lastElementChild.className != 'but SMpastebutton')
		{
			SM.addButton(units[i], SM.TEXT['paste'], [['class', 'SMpastebutton'], ['data-id', units[i].getAttribute('data-k')]]).addEventListener('click', function() {
				if (SM.previewtext)
				{
					var t = SM.sel('#wall_reply_' + this.getAttribute('data-id'));
					t.value = SM.previewtext;
					t.parentNode.parentNode.parentNode.className = 'blockreply';
					t.focus();
				}
				SM.sel('#cdMainChat').className = 'SMhidepaste';
			});
		}
	}

	//Fonction répétée lors du chargement de nouveaux messages pour relancer SM.chatTab() une fois ces messages chargés
	SM.sel('#chatBlock').setAttribute('onscroll', 'Main.onChatScroll( $(this) ); var chatloading = window.setInterval(function() { if (!Main.lmwProcessing) { clearInterval(chatloading); SM.chatTab(); } }, 200); return true;');
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

	var egg = SM.sel('#calcModule [style*="display:none"]');
	if (egg)
		{ egg.textContent = "nuqDaq ’oH eDen. " + egg.textContent; } //Dédicace à BM ! ^_^
};



/* FONCTIONS RELATIVES À L'ÉDITEUR DE MESSAGES */

SM.messageEditor = function() {
	var tabs = SM.sel('#cdTabsChat').children;
	for (i = 0; i < tabs.length; i++)
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
	tab.addEventListener('mouseover', function() { Main.showTip(this, SM.TEXT['editor_tip']); });
	tab.addEventListener('mouseout', function() { Main.hideTip(); });
	tab.addEventListener('click', function() { SM.changeChatTab(this); });
	tab.className = 'tab taboff';
	var editor = SM.addNewEl('div', SM.sel('#chatBlock'), 'SMeditor');
	SM.addNewEl('h4', editor, null, SM.TEXT['SM-added_tab']).className = 'SMtabwarning';
	SM.addNewEl('p', editor, null, SM.TEXT['SM-added_tab_text']).className = 'SMtabwarning';
	editor.style.display = 'none';

	//On récupère le formulaire de post de message sur le Nexus de Twinoid pour avoir la prévisualisation Twinoid et les smileys
	var src = _tid.makeUrl('/mod/wall/post', { _id: 'tabreply_content', jsm: '1', lang: 'FR' });
	SM.addNewEl('div', editor, 'tabreply_content');
	SM.addNewEl('script', document.body, null, null, [['src', src], ['async', 'true']]).onload = function() {
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
		SM.addButton(buts, SM.TEXT['preview_refresh']).addEventListener('click', function() { SM.refreshPreview(); });
		SM.addButton(buts, SM.TEXT['preview_erase']).addEventListener('click', function() {
			if (confirm(SM.TEXT['preview_confirm_erase']))
			{
				SM.sel('#tid_wallPost').value = '';
				SM.refreshPreview();
			}
		});

		//Ajout des smileys Mush
		SM.addNewEl('p', form, null, '↓ ' + SM.TEXT['editor-mush_smileys'] + ' ↓', [['class', 'SMcenter']]).addEventListener('click', function() {
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
		for (i = 0; i < SM.smileys.length; i++) //Smileys Mush
		{
			SM.addNewEl('img', s, null, null, [['src', '/img/icons/ui/' + SM.smileys[i][1]], ['data-smiley', SM.smileys[i][0].split('|')[0]]]).addEventListener('click', function() {
				SM.sel('#tid_wallPost').value += ':' + this.getAttribute('data-smiley') + ':';
				setTimeout(function() { SM.refreshPreview(); }, 100);
			});
		}

		//Liste des messages préformatés
		SM.addNewEl('p', form, null, SM.TEXT['premessages_title'], [['style', 'color: black; margin-top: 20px;']]);
		var premessages = SM.addNewEl('select', form, 'SMpremessages');
		premessages.addEventListener('change', function() { SM.buildMessage(); });
		var options = ['NULL', 'inventory', 'researches', 'researches++', 'projects', 'planet'];
		for (i = 0; i < options.length; i++)
			{ SM.addNewEl('option', premessages, null, SM.TEXT['premessages_' + options[i]], [['value', options[i]]]); }

		//Ajout des boutons de copie & sauvegarde
		SM.addButton(form, SM.TEXT['preview_copy']).addEventListener('click', function() {
			if (SM.sel('#tid_wallPost').value)
			{
				SM.previewtext = SM.sel('#tid_wallPost').value.slice(0, 2500);
				SM.sel('#cdMainChat').className = 'SMshowpaste';
			}
		});
		SM.addButton(form, SM.TEXT['preview_save']).addEventListener('click', function() { SM.savePreview(); });
		SM.addButton(form, SM.TEXT['preview_retrieve']).addEventListener('click', function() { SM.retrievePreview(); });

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
	for (i = 0; i < SM.smileys.length; i++) //Smileys Mush
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
	for (i = 0; i < cookies.length; i++)
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
				n = n.replace(/<img(?:[^<]*)plant_diseased\.png(?:[^<]*)>/, " //" + SM.TEXT['preformat-inventory_diseased'] + "//");
				n = n.replace(/<img(?:[^<]*)plant_thirsty\.png(?:[^<]*)>/, " //" + SM.TEXT['preformat-inventory_thirsty'] + "//");
				n = n.replace(/<img(?:[^<]*)plant_dry\.png(?:[^<]*)>/, " //" + SM.TEXT['preformat-inventory_dry'] + "//");
				n = n.replace(/<img(?:[^<]*)broken\.png(?:[^<]*)>/, " //" + SM.TEXT['preformat-inventory_broken'] + "//"); //Objet cassé
				n = n.replace(/<img(?:[^<]*)charge\.png(?:[^<]*)>x([0-9]+)/, " [$1 " + SM.TEXT['preformat-inventory_charge'] + "]"); //Charges
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
					{ message += "//" + SM.TEXT['preformat-inventory_' + e] + "//, "; }
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
				{ alert(SM.TEXT['preformat-researches_nomodule']); break; }

			message += "**//" + SM.TEXT['preformat-researches_title'] + " //**\n\n\n\n";
			var cards = document.getElementsByClassName('cdProjCard');
			for (i = 0; i < cards.length; i++)
			{
				message += "**" + cards[i].firstElementChild.textContent.trim() + " :** ";
				message += SM.sel('[data-p="' + cards[i].getAttribute('data-p') + '"] #p').textContent.trim() + "\n";
			}

			wallpost.value = message;
			SM.refreshPreview();
			break;

		case 'researches++':
			if (!SM.sel('#research_module'))
				{ alert(SM.TEXT['preformat-researches_nomodule']); break; }

			var researches = [];
			popup.style.display = 'block';
			SM.addNewEl('h3', popup, null, SM.TEXT['preformat-researches++_title']);
			var table = SM.addNewEl('table', popup);
			var h = SM.addNewEl('thead', table);
			SM.addNewEl('td', h, null, SM.TEXT['preformat-researches++_share']); //Partager ?
			SM.addNewEl('td', h, null, SM.TEXT['preformat-researches++_name']); //Nom
			SM.addNewEl('td', h, null, SM.TEXT['preformat-researches++_progress']); //Progression
			SM.addNewEl('td', h, null, SM.TEXT['preformat-researches++_important']); //Prioritaire ?
			SM.addNewEl('td', h, null, SM.TEXT['preformat-researches++_relay']); //Relais nécessaire ?
			var cards = document.getElementsByClassName('cdProjCard');
			for (i = 0; i < cards.length; i++)
			{
				var name = cards[i].firstElementChild.textContent.trim();
				var progress = SM.sel('[data-p="' + cards[i].getAttribute('data-p') + '"] #p').textContent.trim();
				researches.push([name, progress]);
				var l = SM.addNewEl('tr', table, null, null, [['class', 'SMresearch']]);
				SM.addNewEl('td', l, null, '<input type="checkbox" checked="true" />').className = 'SMcenter';
				SM.addNewEl('td', l, null, name);
				SM.addNewEl('td', l, null, progress);
				SM.addNewEl('td', l, null, '<input type="checkbox" />').className = 'SMcenter';
				SM.addNewEl('td', l, null, '<input type="checkbox" />').className = 'SMcenter';
			}

			//Création du message
			SM.addButton(popup, SM.TEXT['preformat-researches++_submit']).addEventListener('click', function() {
				var message = "**//" + SM.TEXT['preformat-researches_title'] + " //**\n\n\n\n";
				var researches = document.getElementsByClassName('SMresearch');
				for (i = 0; i < researches.length; i++)
				{
					var children = researches[i].children;
					if (children[0].firstChild.checked) //À partager
					{
						message += '**' + children[1].textContent + ' :** ';
						message += children[2].textContent;
						if (children[3].firstChild.checked) //Prioritaire
							{ message += ", **//" + SM.TEXT['preformat-researches++_text_important'] + "//**"; }
						if (children[4].firstChild.checked) //À relayer
							{ message += ", //" + SM.TEXT['preformat-researches++_text_relay'] + "//"; }
						message += ".\n";
					}
					SM.sel('#SMpopup').style.display = 'none';
				}
				wallpost.value = message;
				SM.refreshPreview();
			});
			break;

		case 'projects':
			if (!/img\/cards\/projects/.test(SM.sel('#cdModuleContent').innerHTML)) //Pas d'ID spécifique au Cœur de NERON :-/
				{ alert(SM.TEXT['preformat-projects_nomodule']); break; }

			message += "**//" + SM.TEXT['preformat-projects_title'] + " //**\n\n\n\n";
			var cards = document.getElementsByClassName('cdProjCard');
			for (i = 0; i < cards.length; i++)
			{
				message += "**" + cards[i].firstElementChild.textContent.trim() + " :** ";
				message += SM.sel('[data-p="' + cards[i].getAttribute('data-p') + '"] .desc').textContent.trim() + "\n";
			}

			wallpost.value = message;
			SM.refreshPreview();
			break;

		case 'planet':
			if (!SM.sel('#navModule'))
				{ alert(SM.TEXT['preformat-planet_nomodule']); break; }

			var planets = document.querySelectorAll('[class="planet"]');
			switch (planets.length)
			{
				case 0:
					alert(SM.TEXT['preformat-planet_none']);
					break;

				case 1:
					wallpost.value = SM.preformatPlanet(planets[0]);
					SM.refreshPreview();
					break;

				case 2:
					popup.style.display = 'block';
					SM.addNewEl('h3', popup, null, SM.TEXT['preformat-planet_title']);
					SM.addButton(popup, planets[0].firstElementChild.textContent).addEventListener('click', function() {
						SM.sel('#tid_wallPost').value = SM.preformatPlanet(planets[0]);
						SM.refreshPreview();
						SM.sel('#SMpopup').style.display = 'none';
					}); //Première planète
					SM.addButton(popup, planets[1].firstElementChild.textContent).addEventListener('click', function() {
						SM.sel('#tid_wallPost').value = SM.preformatPlanet(planets[1]);
						SM.refreshPreview();
						SM.sel('#SMpopup').style.display = 'none';
					}); //Seconde planète
					SM.addButton(popup, SM.TEXT['preformat-planet_both']).addEventListener('click', function() {
						SM.sel('#tid_wallPost').value = SM.preformatPlanet(planets[0]) + "\n\n\n\n" + SM.preformatPlanet(planets[1]);
						SM.refreshPreview();
						SM.sel('#SMpopup').style.display = 'none';
					}); //Les deux planètes
					break;
			}
			break;
	}

	SM.sel('#SMpremessages').selectedIndex = 0;
};


SM.preformatPlanet = function(planet) {
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
		{ message += "//" + unknown + " " + SM.TEXT['preformat-planet_unknown'] + '//, '; }
	message = message.slice(0, -2) + '.';

	return message;
};



/* FONCTION DE LOCALISATION */

SM.locale = function() {
	SM.TEXT = {};
	var lang = parseInt(SM.parameters['locale']);

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
		SM.TEXT['ap'] = "PA";
		SM.TEXT['hide_alert_reports'] = "Cacher les rapports";
		SM.TEXT['show_alert_reports'] = "Lister les rapports";
		SM.TEXT['unvalid_move'] = "Cette porte est cassée, vous ne pouvez pas vous déplacer !";
		SM.TEXT['move_confirm'] = "Voulez-vous vous déplacer vers ";
		SM.TEXT['move_alert'] = "ATTENTION : il semble très probable que vous ne puissiez pas vous déplacer actuellement. Si c'est le cas, un message d'erreur peut s'afficher. Continuer ?";
		SM.TEXT['move_guardian'] = "ATTENTION : quelqu'un garde cette pièce. À moins que vous ne soyez Fuyant, un message d'erreur peut s'afficher. Continuer ?";
		SM.TEXT['current_room'] = "Vous êtes en : ";
		SM.TEXT['move_button'] = "Se déplacer";
		SM.TEXT['broken_door'] = " — CASSÉE";
		SM.TEXT['door_to'] = "Porte → ";
		SM.TEXT['SMparams_title'] = "Paramètres de Small(Mush)";
		SM.TEXT['SMparams_confirm-action'] = "Confirmer les actions";
		SM.TEXT['SMparams_food-desc'] = "Afficher les effets des aliments sous l'inventaire";
		SM.TEXT['SMparams_forced-locale'] = "Forcer la langue de Small(Mush)";
		SM.TEXT['SMparams_lang-title'] = "Langue de l'interface Small(Mush) :";
		SM.TEXT['SMparams_credits'] = "Script codé par <a href='http://twinoid.com/user/8412516' target='_blank'>LAbare</a>. <span onclick='SM.showLicense();'>Licence MIT.</span>";
		SM.TEXT['confirm_action'] = "Voulez-vous effectuer l'action '";
		SM.TEXT['tabs_char'] = "Perso";
		SM.TEXT['tabs_ship'] = "Général";
		SM.TEXT['tabs_room'] = "Pièce";
		SM.TEXT['tabs_chat'] = "Chat";
		SM.TEXT['tabs_game'] = "Module";
		SM.TEXT['tabs_shop'] = "Achats";
		SM.TEXT['SM-added_tab'] = "<img src='" + SM.src + "ico.png' /> <b>Attention :</b> Onglet Small(Mush) <img src='" + SM.src + "ico.png' />";
		SM.TEXT['SM-added_tab_text'] = "Cet onglet est un ajout de l'interface Small(Mush). Si un bug venait à se produire ici, il ne pourrait s'agir que d'un bug de <em>script</em> : il ne faudrait alors en avertir que son auteur.";
		SM.TEXT['plasma-onmouseover'] = "<div class='tiptop' ><div class='tipbottom'><div class='tipbg'><div class='tipcontent'><h1>Bouclier plasma</h1>Le bouclier plasma est activé.</div></div></div></div>";
		SM.TEXT['cards-title'] = "Projets et recherches :";
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
		SM.TEXT['warning_title'] = "Small(Mush) — chargé";
		SM.TEXT['warning_1'] = "<strong>ATTENTION :</strong> ce script adapte l'interface de Mush. Si vous rencontrez un bug en jeu, <em>reproduisez le bug sur ordinateur</em> afin de vérifier que c'est bien le jeu, et non pas ce script, qui est en cause. Ne reportez sur les forums que les bugs <em>reproduits en jeu sur ordinateur sans script</em>.";
		SM.TEXT['warning_2'] = "Si vous rencontrez un bug à cause du script, contactez son auteur à partir des paramètres. Ni l'auteur ni le script ne sont affiliés à Motion Twin et ne sauraient être responsables d'un quelconque problème (bien que le script soit codé et testé de manière à ne pas générer de bug pouvant influer sur le jeu lui-même).";
		SM.TEXT['warning_3'] = "Bon jeu !";
		SM.TEXT['license'] = "<h4><img src='" + SM.src + "ico.png' /> Small(Mush) : Licence MIT</h4><p>Copyright (c) 2015 LAbare</p><p>L'autorisation est accordée, gracieusement, à toute personne acquérant une copie de ce script et des fichiers de documentation associés (le « Script »), de commercialiser le Script sans restriction, notamment les droits d'utiliser, de copier, de modifier, de fusionner, de publier, de distribuer, de sous-licencier et/ou de vendre des copies du Script, ainsi que d'autoriser les personnes auxquelles le Script est fourni à le faire, sous réserve des conditions suivantes :</p><p>La déclaration de copyright ci-dessus et la présente autorisation doivent être incluses dans toute copie ou partie substantielle du Script.</p><p>Le Script est fourni « tel quel », sans garantie d'aucune sorte, explicite ou implicite, notamment sans garantie de qualité marchande, d’adéquation à un usage particulier et d'absence de contrefaçon. En aucun cas les auteurs ou titulaires du droit d'auteur ne seront responsables de tout dommage, réclamation ou autre responsabilité, que ce soit dans le cadre d'un contrat, d'un délit ou autre, en provenance de, consécutif à ou en relation avec le Script ou son utilisation, ou avec d'autres éléments du Script. Bref, si ça casse, c'est pas ma faute. Mais ça va pas casser, normalement. À peine. Moi, j'y crois.</p>";
		SM.TEXT['help_screen_A'] = "Cliquez pour afficher une infobulle.<br />Aucune action ne sera faite.";
		SM.TEXT['help_screen_B'] = "Cliquez pour cacher l'infobulle.";
		SM.TEXT['show_inventory'] = "Afficher l'inventaire";
		SM.TEXT['show-flash-inventory'] = "DEBUG : Afficher l'inventaire Flash";
		SM.TEXT['editor_tip'] = "<div class='tiptop' ><div class='tipbottom'><div class='tipbg'><div class='tipcontent'><h1>Éditeur de messages Small(Mush)</h1><p>Facilite la mise en forme des messages et permet leur prévisualisation.</p></div></div></div></div>";
		SM.TEXT['editor-mush_smileys'] = "Smileys Mush";
		SM.TEXT['paste'] = "Coller";
		SM.TEXT['preview_refresh'] = "Rafraîchir";
		SM.TEXT['preview_erase'] = "Effacer";
		SM.TEXT['preview_confirm_erase'] = "Voulez-vous vraiment effacer votre message ?";
		SM.TEXT['preview_save'] = "Sauvegarder";
		SM.TEXT['preview_copy'] = "Copier";
		SM.TEXT['preview_retrieve'] = "Recharger le message sauvegardé";
		SM.TEXT['premessages_title'] = "Messages préformatés :";
		SM.TEXT['premessages_NULL'] = "Aucun";
		SM.TEXT['premessages_inventory'] = "Partager l'inventaire";
		SM.TEXT['premessages_researches'] = "Lister les recherches";
		SM.TEXT['premessages_researches++'] = "Lister les recherches (mode avancé)";
		SM.TEXT['premessages_projects'] = "Lister les projets";
		SM.TEXT['premessages_planet'] = "Partager une planète";
		SM.TEXT['message-overwrite_retrieve'] = "Attention : ceci va effacer votre message actuel. Continuer ?";
		SM.TEXT['message-overwrite_build'] = "Voulez-vous effacer le message actuel (Annuler) ou écrire à sa suite (OK) ?";
		SM.TEXT['preformat-researches_nomodule'] = "Veuillez accéder au laboratoire pour activer cette fonction.";
		SM.TEXT['preformat-researches_title'] = "Recherches :";
		SM.TEXT['preformat-researches++_title'] = "<img src='" + SM.src + "ico.png' /> Recherches préformatées — mode avancé";
		SM.TEXT['preformat-researches++_share'] = "Lister";
		SM.TEXT['preformat-researches++_name'] = "Nom";
		SM.TEXT['preformat-researches++_progress'] = "%";
		SM.TEXT['preformat-researches++_important'] = "Important ?";
		SM.TEXT['preformat-researches++_relay'] = "Relais ?";
		SM.TEXT['preformat-researches++_submit'] = "Lister les recherches";
		SM.TEXT['preformat-researches++_text_important'] = "prioritaire";
		SM.TEXT['preformat-researches++_text_relay'] = "besoin d'un relais";
		SM.TEXT['preformat-inventory_HELP_DRONE'] = "Drone";
		SM.TEXT['preformat-inventory_CAMERA'] = "Caméra";
		SM.TEXT['preformat-inventory_thirsty'] = "assoiffé";
		SM.TEXT['preformat-inventory_dry'] = "desséché";
		SM.TEXT['preformat-inventory_diseased'] = "malade";
		SM.TEXT['preformat-inventory_broken'] = "cassé";
		SM.TEXT['preformat-inventory_charge'] = "charge(s)";
		SM.TEXT['preformat-planet_none'] = "Vous n'avez pas scanné de planète.";
		SM.TEXT['preformat-planet_title'] = "Choisissez une planète :";
		SM.TEXT['preformat-planet_nomodule'] = "Veuillez accéder au Terminal Astro pour activer cette fonction.";
		SM.TEXT['preformat-planet_both'] = "Partager les deux";
		SM.TEXT['preformat-planet_unknown'] = "zone(s) inconnue(s)";
		SM.TEXT['preformat-projects_nomodule'] = "Veuillez accéder au Cœur de NERON pour activer cette fonction.";
		SM.TEXT['preformat-projects_title'] = "Nouveaux projets :";
		SM.TEXT['minimap-button'] = "Afficher la minimap Small(Mush)";
		SM.TEXT['minimap-title'] = "Minimap Small(Mush)";
		SM.TEXT['minimap-warning'] = "<b>ATTENTION :</b> cette minimap n'est pas celle du jeu Flash ; elle ne sert que de repère avec quelques indications. Il se peut que certaines avaries signalées n'y apparaissent pas.";
		SM.TEXT['minimap-legend'] = "<b>Légende :</b> <span class='SMmapfire'>Incendie signalé</span> <span class='SMmapalertd'>Portes signalées</span> <span class='SMmapalerte'>Équipements signalés</span>";
		SM.TEXT['minimap-room'] = "Vous avez sélectionné : <b><span id='SMminimaproom'>rien</span></b>.";
		
		SM.localerooms = ['Pont', 'Baie Alpha', 'Baie Beta', 'Baie Alpha 2', 'Nexus', 'Infirmerie', 'Laboratoire', 'Réfectoire', 'Jardin Hydroponique', 'Salle des moteurs', 'Tourelle Alpha avant', 'Tourelle Alpha centre', 'Tourelle Alpha arrière', 'Tourelle Beta avant', 'Tourelle Beta centre', 'Tourelle Beta arrière', 'Patrouilleur Longane', 'Patrouilleur Jujube', 'Patrouilleur Tamarin', 'Patrouilleur Socrate', 'Patrouilleur Epicure', 'Patrouilleur Platon', 'Patrouilleur Wallis', 'Pasiphae', 'Couloir avant', 'Couloir central', 'Couloir arrière', 'Planète', 'Baie Icarus', 'Dortoir Alpha', 'Dortoir Beta', 'Stockage Avant', 'Stockage Alpha centre', 'Stockage Alpha arrière', 'Stockage Beta centre', 'Stockage Beta arrière', 'Espace infini', 'Les Limbes'];
		break;

		case 2: //Anglais
		SM.TEXT['ap'] = "AP";
		SM.TEXT['hide_alert_reports'] = "Hide reports";
		SM.TEXT['show_alert_reports'] = "Show reports";
		SM.TEXT['unvalid_move'] = "This door is broken, you cannot move there!";
		SM.TEXT['move_confirm'] = "Do you want to move to ";
		SM.TEXT['move_alert'] = "WARNING: it seems that you are not able to move at the moment. An error may display. Continue?";
		SM.TEXT['move_guardian'] = "WARNING: someone is guarding this room. Unless you're Sneaky, you shall only move to the room whence you came, else an error may display. Continue?";
		SM.TEXT['current_room'] = "You are in: ";
		SM.TEXT['move_button'] = "Move";
		SM.TEXT['broken_door'] = " — BROKEN";
		SM.TEXT['door_to'] = "Door → ";
		SM.TEXT['SMparams_title'] = "Small(Mush) parameters";
		SM.TEXT['SMparams_confirm-action'] = "Confirm actions";
		SM.TEXT['SMparams_food-desc'] = "Show consumables effects under inventory";
		SM.TEXT['SMparams_forced-locale'] = "Force Small(Mush) language";
		SM.TEXT['SMparams_lang-title'] = "Small(Mush) language:";
		SM.TEXT['SMparams_credits'] = "Script developed by <a href='http://twinoid.com/user/8412516' target='_blank'>LAbare</a>. <span onclick='SM.showLicense();'>MIT licensed.</span>";
		SM.TEXT['confirm_action'] = "Do you want to '";
		SM.TEXT['tabs_char'] = "Myself";
		SM.TEXT['tabs_ship'] = "Ship";
		SM.TEXT['tabs_room'] = "Room";
		SM.TEXT['tabs_chat'] = "Chat";
		SM.TEXT['tabs_game'] = "Module";
		SM.TEXT['tabs_shop'] = "Shop";
		SM.TEXT['SM-added_tab'] = "<img src='" + SM.src + "ico.png' /> <b>Warning:</b> Small(Mush) tab <img src='" + SM.src + "ico.png' />";
		SM.TEXT['SM-added_tab_text'] = "This tab is an addition of the Small(Mush) interface. If a bug happens here, it would definitely be a <em>script bug</em> and should be reported only to the author of this script.";
		SM.TEXT['plasma-onmouseover'] = "<div class='tiptop' ><div class='tipbottom'><div class='tipbg'><div class='tipcontent'><h1>Plasma shield</h1>The plasma shield is active.</div></div></div></div>";
		SM.TEXT['cards-title'] = "Projects and researches:";
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
		SM.TEXT['warning_title'] = "Small(Mush) — loaded";
		SM.TEXT['warning_1'] = "<strong>WARNING:</strong> this script reshapes the game's interface. In case of an unfortunate bug, <em>reproduce it on a computer</em> to make sure that it is an in-game bug, and not a script bug. Only warn the forums in case of a <em>computer-reproduced in-game bug in a scriptless browser</em>.";
		SM.TEXT['warning_2'] = "In case of a script bug, contact its author from the parameters menu. Neither the author nor the script have any link to Motion Twin, and they cannot be held responsible in case of a bug (although this script has been developed and tested in order not to generate any game-breaking bug).";
		SM.TEXT['warning_3'] = "Have a good game!";
		SM.TEXT['license'] = "<h4><img src='" + SM.src + "ico.png' /> Small(Mush) — MIT License</h4><p>Copyright (c) 2015 LAbare</p><p>Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the \"Software\"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:</p><p>The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.</p><p>The Software is provided \"as is\", without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose and noninfringement. In no event shall the authors or copyright holders be liable for any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising from, out of or in connection with the Software or the use or other dealings in the Software. Basically, if the script goes berzerk, stabs your kids and burns your house, I'm not to blame. But nothing bad should happen, not even a script-breaking bug. Trust me.</p>";
		SM.TEXT['help_screen_A'] = "Click on an element to show its tooltip.<br />This won't make you do any action.";
		SM.TEXT['help_screen_B'] = "Click again to hide the tooltip.";
		SM.TEXT['show_inventory'] = "Show inventory";
		SM.TEXT['show-flash-inventory'] = "DEBUG: Show Flash inventory";
		SM.TEXT['editor_tip'] = "<div class='tiptop' ><div class='tipbottom'><div class='tipbg'><div class='tipcontent'><h1>Small(Mush) Message editor</h1><p>Allows for message formatting and preview.</p></div></div></div></div>";
		SM.TEXT['editor-mush_smileys'] = "Mush smileys";
		SM.TEXT['paste'] = "Paste";
		SM.TEXT['preview_refresh'] = "Refresh";
		SM.TEXT['preview_erase'] = "Erase";
		SM.TEXT['preview_confirm_erase'] = "Do you wish to erase your message?";
		SM.TEXT['preview_save'] = "Save";
		SM.TEXT['preview_copy'] = "Copy";
		SM.TEXT['preview_retrieve'] = "Retrieve saved message";
		SM.TEXT['premessages_title'] = "Select a preformatted message:";
		SM.TEXT['premessages_NULL'] = "None";
		SM.TEXT['premessages_inventory'] = "Share inventory";
		SM.TEXT['premessages_researches'] = "Share researches";
		SM.TEXT['premessages_researches++'] = "Share researches (advanced mode)";
		SM.TEXT['premessages_projects'] = "Share projects";
		SM.TEXT['premessages_planet'] = "Share a planet";
		SM.TEXT['message-overwrite_retrieve'] = "Warning: this will overwrite your current message. Continue?";
		SM.TEXT['message-overwrite_build'] = "Do you wish to overwrite your current message (Cancel) or add this to its end (OK)?";
		SM.TEXT['preformat-researches_nomodule'] = "Please access the laboratory in order to activate research preformatting.";
		SM.TEXT['preformat-researches_title'] = "Researches:";
		SM.TEXT['preformat-researches++_title'] = "<img src='" + SM.src + "ico.png' /> Sharing researches — advanced mode";
		SM.TEXT['preformat-researches++_share'] = "Share ?";
		SM.TEXT['preformat-researches++_name'] = "Name";
		SM.TEXT['preformat-researches++_progress'] = "%";
		SM.TEXT['preformat-researches++_important'] = "Important ?";
		SM.TEXT['preformat-researches++_relay'] = "Need a relay ?";
		SM.TEXT['preformat-researches++_submit'] = "Share researches";
		SM.TEXT['preformat-researches++_text_important'] = "priority research";
		SM.TEXT['preformat-researches++_text_relay'] = "relay needed";
		SM.TEXT['preformat-inventory_HELP_DRONE'] = "Support drone";
		SM.TEXT['preformat-inventory_CAMERA'] = "Camera";
		SM.TEXT['preformat-inventory_thirsty'] = "thirsty";
		SM.TEXT['preformat-inventory_dry'] = "dry";
		SM.TEXT['preformat-inventory_diseased'] = "diseased";
		SM.TEXT['preformat-inventory_broken'] = "broken";
		SM.TEXT['preformat-inventory_charge'] = "charge(s)";
		SM.TEXT['preformat-planet_none'] = "You haven't scanned any planet yet.";
		SM.TEXT['preformat-planet_title'] = "Choose a planet:";
		SM.TEXT['preformat-planet_nomodule'] = "Please access the Astro Terminal in order to activate planet preformatting.";
		SM.TEXT['preformat-planet_both'] = "Share both";
		SM.TEXT['preformat-planet_unknown'] = "unknown zone(s)";
		SM.TEXT['preformat-projects_nomodule'] = "Please access the NERON Core in order to activate research preformatting.";
		SM.TEXT['preformat-projects_title'] = "New projects:";
		SM.TEXT['minimap-button'] = "Show the Small(Mush) minimap";
		SM.TEXT['minimap-title'] = "Small(Mush) minimap";
		SM.TEXT['minimap-warning'] = "<b>WARNING:</b> This minimap is not that of the Flash game, but merely a map of the Daedalus containing a little information. It may also not display certain reports.";
		SM.TEXT['minimap-legend'] = "<b>Legend:</b> <span class='SMmapfire'>Reported fire</span> <span class='SMmapalertd'>Reported doors</span> <span class='SMmapalerte'>Reported equipments</span>";
		SM.TEXT['minimap-room'] = "You selected: <b><span id='SMminimaproom'>nothing</span></b>.";
		
		SM.localerooms = ['Bridge', 'Alpha Bay', 'Bravo Bay', 'Alpha Bay 2', 'Nexus', 'Medlab', 'Laboratory', 'Refectory', 'Hydroponic Garden', 'Engine Room', 'Front Alpha Turret', 'Centre Alpha Turret', 'Rear Alpha Turret', 'Front Bravo Turret', 'Centre Bravo Turret', 'Rear Bravo Turret', 'Patrol Ship Tomorrowland', 'Patrol Ship Olive Grove', 'Patrol Ship Yasmin', 'Patrol Ship Wolf', 'Patrol Ship E-Street', 'Patrol Ship Eponine', 'Patrol Ship Carpe Diem', 'Pasiphae', 'Front Corridor', 'Central Corridor', 'Rear Corridor', 'Planet', 'Icarus Bay', 'Alpha Dorm', 'Bravo Dorm', 'Front Storage', 'Centre Alpha Storage', 'Rear Alpha Storage', 'Centre Bravo Storage', 'Rear Bravo Storage', 'Outer Space', 'Limbo'];
		break;

		case 3: //Espagnol
		SM.TEXT['ap'] = "AP";
		SM.TEXT['hide_alert_reports'] = "Hide reports";
		SM.TEXT['show_alert_reports'] = "Show reports";
		SM.TEXT['unvalid_move'] = "This door is broken, you cannot move there!";
		SM.TEXT['move_confirm'] = "Do you want to move to ";
		SM.TEXT['move_alert'] = "WARNING: it seems that you are not able to move at the moment. An error may display. Continue?";
		SM.TEXT['move_guardian'] = "WARNING: someone is guarding this room. Unless you're Sneaky, you shall only move to the room whence you came, else an error may display. Continue?";
		SM.TEXT['current_room'] = "You are in: ";
		SM.TEXT['move_button'] = "Move";
		SM.TEXT['broken_door'] = " — BROKEN";
		SM.TEXT['door_to'] = "Door → ";
		SM.TEXT['SMparams_title'] = "Small(Mush) parameters";
		SM.TEXT['SMparams_confirm-action'] = "Confirm actions";
		SM.TEXT['SMparams_food-desc'] = "Show consumables effects under inventory";
		SM.TEXT['SMparams_forced-locale'] = "Force Small(Mush) language";
		SM.TEXT['SMparams_lang-title'] = "Small(Mush) language:";
		SM.TEXT['SMparams_credits'] = "Script developed by <a href='http://twinoid.com/user/8412516' target='_blank'>LAbare</a>. <span onclick='SM.showLicense();'>MIT licensed.</span>";
		SM.TEXT['confirm_action'] = "Do you want to '";
		SM.TEXT['tabs_char'] = "Myself";
		SM.TEXT['tabs_ship'] = "Ship";
		SM.TEXT['tabs_room'] = "Room";
		SM.TEXT['tabs_chat'] = "Chat";
		SM.TEXT['tabs_game'] = "Module";
		SM.TEXT['tabs_shop'] = "Shop";
		SM.TEXT['SM-added_tab'] = "<img src='" + SM.src + "ico.png' /> <b>Warning:</b> Small(Mush) tab <img src='" + SM.src + "ico.png' />";
		SM.TEXT['SM-added_tab_text'] = "This tab is an addition of the Small(Mush) interface. If a bug happens here, it would definitely be a <em>script bug</em> and should be reported only to the author of this script.";
		SM.TEXT['plasma-onmouseover'] = "<div class='tiptop' ><div class='tipbottom'><div class='tipbg'><div class='tipcontent'><h1>Plasma shield</h1>The plasma shield is active.</div></div></div></div>";
		SM.TEXT['cards-title'] = "Projects and researches:";
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
		SM.TEXT['warning_title'] = "Small(Mush) — loaded";
		SM.TEXT['warning_1'] = "<strong>WARNING:</strong> this script reshapes the game's interface. In case of an unfortunate bug, <em>reproduce it on a computer</em> to make sure that it is an in-game bug, and not a script bug. Only warn the forums in case of a <em>computer-reproduced in-game bug in a scriptless browser</em>.";
		SM.TEXT['warning_2'] = "In case of a script bug, contact its author from the parameters menu. Neither the author nor the script have any link to Motion Twin, and they cannot be held responsible in case of a bug (although this script has been developed and tested in order not to generate any game-breaking bug).";
		SM.TEXT['warning_3'] = "Have a good game!";
		SM.TEXT['license'] = "<h4><img src='" + SM.src + "ico.png' /> Small(Mush) — MIT License</h4><p>Copyright (c) 2015 LAbare</p><p>Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the \"Software\"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:</p><p>The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.</p><p>The Software is provided \"as is\", without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose and noninfringement. In no event shall the authors or copyright holders be liable for any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising from, out of or in connection with the Software or the use or other dealings in the Software. Basically, if the script goes berzerk, stabs your kids and burns your house, I'm not to blame. But nothing bad should happen, not even a script-breaking bug. Trust me.</p>";
		SM.TEXT['help_screen_A'] = "Click on an element to show its tooltip.<br />This won't make you do any action.";
		SM.TEXT['help_screen_B'] = "Click again to hide the tooltip.";
		SM.TEXT['show_inventory'] = "Show inventory";
		SM.TEXT['show-flash-inventory'] = "DEBUG: Show Flash inventory";
		SM.TEXT['editor_tip'] = "<div class='tiptop' ><div class='tipbottom'><div class='tipbg'><div class='tipcontent'><h1>Small(Mush) Message editor</h1><p>Allows for message formatting and preview.</p></div></div></div></div>";
		SM.TEXT['editor-mush_smileys'] = "Mush smileys";
		SM.TEXT['paste'] = "Paste";
		SM.TEXT['preview_refresh'] = "Refresh";
		SM.TEXT['preview_erase'] = "Erase";
		SM.TEXT['preview_confirm_erase'] = "Do you wish to erase your message?";
		SM.TEXT['preview_save'] = "Save";
		SM.TEXT['preview_copy'] = "Copy";
		SM.TEXT['preview_retrieve'] = "Retrieve saved message";
		SM.TEXT['premessages_title'] = "Select a preformatted message:";
		SM.TEXT['premessages_NULL'] = "None";
		SM.TEXT['premessages_inventory'] = "Share inventory";
		SM.TEXT['premessages_researches'] = "Share researches";
		SM.TEXT['premessages_researches++'] = "Share researches (advanced mode)";
		SM.TEXT['premessages_projects'] = "Share projects";
		SM.TEXT['premessages_planet'] = "Share a planet";
		SM.TEXT['message-overwrite_retrieve'] = "Warning: this will overwrite your current message. Continue?";
		SM.TEXT['message-overwrite_build'] = "Do you wish to overwrite your current message (Cancel) or add this to its end (OK)?";
		SM.TEXT['preformat-researches_nomodule'] = "Please access the laboratory in order to activate research preformatting.";
		SM.TEXT['preformat-researches_title'] = "Researches:";
		SM.TEXT['preformat-researches++_title'] = "<img src='" + SM.src + "ico.png' /> Sharing researches — advanced mode";
		SM.TEXT['preformat-researches++_share'] = "Share ?";
		SM.TEXT['preformat-researches++_name'] = "Name";
		SM.TEXT['preformat-researches++_progress'] = "%";
		SM.TEXT['preformat-researches++_important'] = "Important ?";
		SM.TEXT['preformat-researches++_relay'] = "Need a relay ?";
		SM.TEXT['preformat-researches++_submit'] = "Share researches";
		SM.TEXT['preformat-researches++_text_important'] = "priority research";
		SM.TEXT['preformat-researches++_text_relay'] = "relay needed";
		SM.TEXT['preformat-inventory_HELP_DRONE'] = "Support drone";
		SM.TEXT['preformat-inventory_CAMERA'] = "Camera";
		SM.TEXT['preformat-inventory_thirsty'] = "thirsty";
		SM.TEXT['preformat-inventory_dry'] = "dry";
		SM.TEXT['preformat-inventory_diseased'] = "diseased";
		SM.TEXT['preformat-inventory_broken'] = "broken";
		SM.TEXT['preformat-inventory_charge'] = "charge(s)";
		SM.TEXT['preformat-planet_none'] = "You haven't scanned any planet yet.";
		SM.TEXT['preformat-planet_title'] = "Choose a planet:";
		SM.TEXT['preformat-planet_nomodule'] = "Please access the Astro Terminal in order to activate planet preformatting.";
		SM.TEXT['preformat-planet_both'] = "Share both";
		SM.TEXT['preformat-planet_unknown'] = "unknown zone(s)";
		SM.TEXT['preformat-projects_nomodule'] = "Please access the NERON Core in order to activate research preformatting.";
		SM.TEXT['preformat-projects_title'] = "New projects:";
		SM.TEXT['minimap-button'] = "Show the Small(Mush) minimap";
		SM.TEXT['minimap-title'] = "Small(Mush) minimap";
		SM.TEXT['minimap-warning'] = "<b>WARNING:</b> This minimap is not that of the Flash game, but merely a map of the Daedalus containing a little information. It may also not display certain reports.";
		SM.TEXT['minimap-legend'] = "<b>Legend:</b> <span class='SMmapfire'>Reported fire</span> <span class='SMmapalertd'>Reported doors</span> <span class='SMmapalerte'>Reported equipments</span>";
		SM.TEXT['minimap-room'] = "You selected: <b><span id='SMminimaproom'>nothing</span></b>.";
		
		SM.localerooms = ['Bridge', 'Alpha Bay', 'Bravo Bay', 'Alpha Bay 2', 'Nexus', 'Medlab', 'Laboratory', 'Refectory', 'Hydroponic Garden', 'Engine Room', 'Front Alpha Turret', 'Centre Alpha Turret', 'Rear Alpha Turret', 'Front Bravo Turret', 'Centre Bravo Turret', 'Rear Bravo Turret', 'Patrol Ship Tomorrowland', 'Patrol Ship Olive Grove', 'Patrol Ship Yasmin', 'Patrol Ship Wolf', 'Patrol Ship E-Street', 'Patrol Ship Eponine', 'Patrol Ship Carpe Diem', 'Pasiphae', 'Front Corridor', 'Central Corridor', 'Rear Corridor', 'Planet', 'Icarus Bay', 'Alpha Dorm', 'Bravo Dorm', 'Front Storage', 'Centre Alpha Storage', 'Rear Alpha Storage', 'Centre Bravo Storage', 'Rear Bravo Storage', 'Outer Space', 'Limbo'];
		break;
	}

	SM.init();
};



/* FONCTION D'INITIALISATION */

SM.init = function() {
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
	SM.messageEditor();
	SM.changeActionFunctions();
	Main.selUpdtArr.push('chat_col'); //Pour que .cycletime puisse être mis à jour en interne
	SM.sel('#content').scrollLeft = 0;

	//Première fois : alerte à lire
	if (SM.parameters['first-time'])
	{
		SM.copyEl(SM.sel('#dialog'), document.body).style.display = 'block';
		SM.sel('#SMdialog_title').innerHTML = "<img src='" + SM.src + "ico.png' />  " + SM.TEXT['warning_title'];
		SM.addNewEl('p', SM.sel('#SMdialog_body'), null, SM.TEXT['warning_1']);
		SM.addNewEl('p', SM.sel('#SMdialog_body'), null, SM.TEXT['warning_2']);
		SM.addNewEl('p', SM.sel('#SMdialog_body'), null, SM.TEXT['warning_3']);
		SM.sel('#SMdialog_ok').addEventListener('click', function() { document.body.removeChild(SM.sel('#SMdialog')); });
		SM.parameters['first-time'] = false;
		SM.setSMParameters();
	}

	//Le rechargement interne de la page écrase les modifications et ajouts, donc on fait une vérification régulière
	window.setInterval(function() {
		if (!SM.sel('#SMenergybar'))
			{ SM.reInit(); }
	}, 250);
};



/* VARIABLES */

//SM.src = "http://labare.alwaysdata.net/SmallMush/";
SM.src = "http://labare.github.io/SmallMush/";

SM.smileys = [['pa_pm', 'pslots.png'], ['pa', 'pa_slot1.png'], ['pm', 'pa_slot2.png'], ['pv|hp', 'lp.png'], ['xp', 'xp.png'], ['xpbig', 'xpbig.png'], ['pa_heal', 'pa_heal.png'], ['asocial', 'status/unsociable.png'], ['disabled', 'status/disabled.png'], ['hungry', 'status/hungry.png'], ['hurt', 'status/hurt.png'], ['ill', 'status/disease.png'], ['psy_disease', 'status/psy_disease.png'], ['commander', 'title_01.png'], ['admin_neron', 'title_02.png'], ['resp_comm', 'title_03.png'], ['alert', 'alert.png'], ['com', 'comm.png'], ['door', 'door.png'], ['plant_youngling', 'plant_youngling.png'], ['plant_thirsty', 'plant_thirsty.png'], ['plant_dry', 'plant_dry.png'], ['plant_diseased', 'plant_diseased.png'], ['bin', 'bin.png'], ['next', 'pageright.png'], ['ship_triumph', 'daedalus_triumph.png'], ['pa_comp', 'pa_comp.png'], ['pa_cook', 'pa_cook.png'], ['pa_core', 'pa_core.png'], ['pa_eng|eng', 'pa_eng.png'], ['pa_garden', 'pa_garden.png'], ['pa_pilgred', 'pa_pilgred.png'], ['pa_shoot', 'pa_shoot.png'], ['laid', 'status/laid.png'], ['mastered', 'status/mastered.png'], ['mush', 'mush.png'], ['stink', 'status/stinky.png'], ['fuel', 'fuel.png'], ['o2', 'o2.png'], ['moral|pmo', 'moral.png'], ['eat', 'sat.png'], ['pills', 'demoralized2.png'], ['dead', 'dead.png'], ['hunter', 'hunter.png'], ['fire', 'fire.png'], ['more', 'more.png'], ['less', 'less.png'], ['chut', 'discrete.png'], ['talk', 'talk.gif'], ['talky', 'talkie.png'], ['cat', 'cat.png'], ['time', 'casio.png'], ['tip', 'tip.png'], ['triumph', 'triumph.png']];

SM.ME_NERON = false;
SM.ME_ALONE = true;
SM.ME_MODULING = false;
SM.GUARDIAN = false;
SM.GRAVITY = true;



/** INITIALISATION **/

if (SM.sel('#SMbar') == null) //Une seule initialisation suffit, sinon ça casse !
{
	SM.getSMParameters();
	SM.locale();
}