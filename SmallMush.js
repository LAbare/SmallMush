var SM = {};


/* FONCTIONS DÉVELOPPEUR */

SM.sel = function(name) {
	if (name[0] == "." && name.search(' ') == -1) { return document.getElementsByClassName(name.slice(1))[0]; }
	else if (name[0] == '#' && name.search(' ') == -1) { return document.getElementById(name.slice(1)); }
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
	var a = SM.addNewEl('div', ((parent) ? parent : null), null, null, butattrs);
	var b = SM.addNewEl('div', a, null, null, { class: 'butright' });
	var c = SM.addNewEl('div', b, null, text, { class: 'butbg' });
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

	for (var i = 0; i < rooms.length; i++)
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
		//<div> plutôt que <text> car ce dernier n'est bizarrement pas supporté sur tous les navigateurs mobiles (coucou Dolphin)
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
		{ SM.addNewEl('path', svg, null, null, { d: 'm' + doors[i][0], dataMapdoor: doors[i][1], class: 'SMmapdoor' }); }
	var it = Main.items.iterator();
	while (it.hasNext())
	{
		var i = it.next();
		if (i.iid == 'DOOR')
			{ SM.sel('[dataMapdoor="' + i.key + '"]').setAttribute('class', 'SMmapdoorbroken'); }
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
		//Vérification (non-bloquante) d'énergie pour se déplacer
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
		- on n'est pas handicapé et on n'a pas d'énergie ;
		- on est handicapé, on est seul, et soit on n'a pas d'énergie, soit le Simulateur de gravité est en panne et ni compétence Sprinter, ni Trottinette ni Monture rocheuse fonctionnelle sur soi.
		Ne prend pas en compte les blessures ni les objets lourds. */
		if ((!disabled && !energy) || (disabled && SM.ME_ALONE && (!energy || (!SM.GRAVITY && !sprinter && !scooter && !boulder))))
		{
			if (!confirm(SM.TEXT['move_alert']))
				{ return false; }
		}
		
		if (SM.GUARDIAN && !confirm(SM.TEXT['move_guardian']))
			{ return false; }
		
		if (SM.parameters['confirm-action'])
		{
			if (!confirm(SM.TEXT['move_confirm'] + roomname + " ?"))
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
			SM.moveEl(SM.addNewEl('img', null, 'SMheroselected', null, { src: selectedhero.lastElementChild.getAttribute('src').replace(/\.png/, '_selected.png') }), selectedhero, selectedhero.lastElementChild);
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
			SM.moveEl(SM.addNewEl('img', null, 'SMheroselected', null, { src: SM.src + "ui/chars/schrodinger_selected.png" }), cat, cat.lastElementChild);
			SM.updateRoomActions(type, serial);
			break;

		case 5: //Drone
			SM.sel('#equipmentselect').selectedIndex = 0;
			var drone = SM.sel('[data-serial="' + serial + '"]');

			if (herohalo)
			{
				if (herohalo.parentNode == drone)
				{
					drone.removeChild(herohalo);
					SM.updateRoomActions(4);
					break;
				}
				else
					{ herohalo.parentNode.removeChild(herohalo); }
			}
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
			if (SM.parameters['food-desc'] && item.getAttribute('data-id') == 'CONSUMABLE')
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
	if (el.getAttribute('data-tab')) //Onglet original
	{
		SM.sel('#SMeditortab').className = 'tab taboff';
		SM.sel('#SMeditor').style.display = 'none';
		Main.selChat(parseInt(el.getAttribute('data-tab')));
		SM.sel('#chatBlock').style.height = '550px';
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
		SM.sel('#wall').style.display = 'none';
		SM.sel('#privateform').style.display = 'none';

		SM.sel('#chatBlock').style.height = 'auto';
	}
};


SM.SMexitModule = function(func) {
	var button = SM.sel(".cdExitModuleButton");
	//Confirmation d'action
	if (SM.parameters['confirm-action'])
	{
		if (!confirm(SM.TEXT['confirm_action'] + button.textContent.trim() + "' ?"))
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
	//Boutons d'action
	var actions = document.querySelectorAll('.but:not(.fake) [href^="?action="]');
	for (var i = 0; i < actions.length; i++)
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
				default: pa = 'general'; break;
			}
			return SM.TEXT['AP-' + pa] + " :";
		});
		if (!confirm(SM.TEXT['confirm_action'] + name + "' ?"))
			{ return false; }
	}
	SM.loadingScreen();

	//Changement d'onglet Small(Mush)
	var action = Main.extractAction(el.getAttribute('href'));
	//Accéder à un terminal ou au Bloc de post-it, Radio du Daedalus, Envoyer une mission, Annonce générale
	if (['ACCESS', 'ACCESS_SECONDARY', 'COMMANDER_ORDER', 'DAILY_ORDER'].indexOf(action) != -1)
		{ SM.changeTab('room_col'); }
	//Examiner, Lire, Vérifier son niveau pré-fongique, Lister l'équipage, Lire le niveau de fuel dans la Chambre de combustion
	else if (['INSPECT', 'CONSULT_DOC', 'CHECK_FOR_INFECTION', 'CHECK_CREW_LIST', 'CHECK_LEVEL'].indexOf(action) != -1)
		{ SM.changeTab('chat_col'); }

	return true;
};


SM.hidePaste = function() {
	SM.sel('#cdMainChat').className = 'SMhidepaste';
	SM.sel('#cdModuleContent').className = SM.sel('#cdModuleContent').className.replace(/SMshowpaste/, 'SMhidepaste');
}


SM.loadingScreen = function() {
	var screen = SM.sel('#SMloadscreen');
	screen.innerHTML = '<img src="/img/icons/ui/loading1.gif" /><br />' + SM.loadingTexts[Math.floor(Math.random() * (SM.loadingTexts.length))];
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
	SM.messageEditor();
	SM.changeActionFunctions();
	SM.sel("#SMbar .cycletime").textContent = SM.sel("#chat_col .cycletime").textContent;
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
	SM.parameters['confirm-action'] = false;
	SM.parameters['food-desc'] = true;
	SM.parameters['forced-locale'] = false;
	SM.parameters['locale'] = '0'; //0: non forcé ; 1: français ; 2: anglais ; 3: espagnol

	var offset = document.cookie.search('SMparams');
	if (offset != -1)
	{
		var parameters = document.cookie.slice(offset + 9); //Pas de fin en cas d'ajout de paramètres ; les nouveaux prendront simplement la valeur false
		SM.parameters['first-time'] = ((parameters[0] == '1') ? true : false);
		SM.parameters['confirm-action'] = ((parameters[1] == '1') ? true : false);
		SM.parameters['food-desc'] = ((parameters[2] == '1') ? true : false);
		SM.parameters['forced-locale'] = ((['1', '2', '3'].indexOf(parameters[3]) != -1) ? true : false);
		if (SM.parameters['forced-locale'])
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

	SM.getSMParameters();
	SM.buildParamsMenu();
};


SM.buildParamsMenu = function() {
	var popup = SM.sel('#SMpopup');
	popup.innerHTML = '';

	SM.addButton(popup, "X", { id: 'SMpopupclose' }).addEventListener('click', function() { SM.sel('#SMpopup').style.display = 'none'; });
	SM.addNewEl('h4', popup, null, SM.TEXT['SMparams_title'] + "  <img src='" + SM.src + "ico.png' />");

	var parameters = ['confirm-action', 'food-desc', 'forced-locale'];
	for (i in parameters)
	{
		var parameter = parameters[i];
		var div = SM.addNewEl('div', popup);
		if (SM.parameters[parameter])
		{
			var input = SM.addNewEl('input', div, 'SMlabel_' + parameter, null, { type: 'checkbox', checked: 'true', 'data-parameter': parameter })
			input.addEventListener('change', function() { SM.parameters[this.getAttribute('data-parameter')] = false; SM.setSMParameters(); });
		}
		else
		{
			var input = SM.addNewEl('input', div, 'SMlabel_' + parameter, null, { type: 'checkbox', 'data-parameter': parameter })
			input.addEventListener('change', function() { SM.parameters[this.getAttribute('data-parameter')] = true; SM.setSMParameters(); });
		}
		SM.addNewEl('label', div, null, SM.TEXT['SMparams_' + parameter], { 'for': 'SMlabel_' + parameter });
		div.className = 'SMparamsdiv';
	}

	SM.addNewEl('p', popup, null, SM.TEXT['SMparams_lang-title']);
	var langs = SM.addNewEl('select', popup, 'SMlangselect');
	SM.addNewEl('option', langs, null, "Français", ((SM.parameters['locale'] == 1) ? { value: '1', selected: 'selected' } : { value: '1' }));
	SM.addNewEl('option', langs, null, "English", ((SM.parameters['locale'] == 2) ? { value: '2', selected: 'selected' } : { value: '2' }));
	langs.addEventListener('change', function() { SM.parameters['locale'] = this.value; SM.locale(function() { SM.setSMParameters(); }); });

	//Affichage de l'inventaire dans l'onglet Module
	SM.addButton(popup, SM.TEXT['show-flash-inventory']).addEventListener('click', function() {
		SM.changeTab('room_col');
		SM.sel('#cdInventory').style.visibility = 'visible';
		SM.sel('#cdInventory').firstElementChild.style.display = 'block';
		SM.sel('#roomActionList1').style.opacity = 1;
		SM.sel('#roomActionList2').style.opacity = 1;
	});

	//BETA
	SM.addButton(popup, "BETA : reset cookies").addEventListener('click', function() {
		var date = new Date();
		date.setTime(date.getTime() + 31536000000);
		document.cookie = 'SMparams=0000; expires=' + date.toGMTString() + '; path=/';
	});

	SM.addNewEl('p', popup, null, SM.TEXT['SMparams_credits'], { class: 'SMnospace' });
	SM.addNewEl('p', popup, null, "<a href='http://github.com/LAbare/SmallMush/releases' target='_blank'>v" + SM.version + "</a>", { class: 'SMnospace' });
};



/* FONCTIONS D'ADAPTATION DE L'INTERFACE */

SM.initCss = function() {
	SM.addNewEl('link', document.head, null, null, { rel: 'stylesheet', href: SM.src + "SmallMush.css", type: 'text/css' });
	SM.addNewEl('meta', document.head, null, null, { name: 'viewport', content: 'width=424px, initial-scale=' + screen.width / 424 });

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
	var butr = SM.addButton(bar, "<img src='" + SM.src + "ui/reload_Mush.png' />");
	butr.addEventListener('click', function() {
		SM.loadingScreen();
		Main.ajax('/', null, function() { SM.reInit(); SM.sel('#SMloadscreen').style.display = 'none'; });
	});
	butr.setAttribute('data-SMtip', SM.TEXT['buttontip-reload']);

	var butrall = SM.addButton(bar, "<img src='" + SM.src + "ui/reload_Mushall.png' />");
	butrall.addEventListener('click', function() {
		SM.loadingScreen();
		Main.ajax('/', Main.SMupdtArr, function() { SM.reInit(); SM.changeTab('char_col'); SM.sel('#SMloadscreen').style.display = 'none'; });
	});
	butrall.setAttribute('data-SMtip', SM.TEXT['buttontip-reloadall']);

	SM.addNewEl('div', document.body, 'SMloadscreen', "<img src='/img/icons/ui/loading1.gif' />").addEventListener('click', function() { this.style.display = 'none'; });

	//Aide
	var buthelp = SM.addButton(bar, "<img src='http://mush.vg/img/icons/ui/infoalert.png' />?");
	buthelp.addEventListener('click', function() { SM.sel('#SMhelpscreenA').style.display = 'block'; });
	buthelp.setAttribute('data-SMtip', SM.TEXT['buttontip-help']);
	//Premier écran noir : sélectionner l'élément ; second écran noir : cacher l'infobulle (sinon elle reste)
	SM.addNewEl('div', document.body, 'SMhelpscreenA', SM.TEXT['help_screen_A']).addEventListener('click', function(e) { this.style.display = 'none'; SM.SMhelp(e); });
	SM.addNewEl('div', document.body, 'SMhelpscreenB', SM.TEXT['help_screen_B']).addEventListener('click', function(e) { this.style.display = 'none'; Main.hideTip(); });

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
	var chartab = SM.addNewEl('li', menu, 'SMtab-char_col', "<img src='/img/icons/ui/noob.png' />" + SM.TEXT['tabs_char']);
	chartab.addEventListener('click', function() { SM.changeTab('char_col'); });
	chartab.setAttribute('data-SMtip', SM.TEXT['tabtip-chartab']);
	chartab.className = 'SMtabselected';
	var shiptab = SM.addNewEl('li', menu, 'SMtab-ship_tab', "<img src='/img/icons/ui/pa_core.png' />" + SM.TEXT['tabs_ship']);
	shiptab.addEventListener('click', function() { SM.changeTab('ship_tab'); });
	shiptab.setAttribute('data-SMtip', SM.TEXT['tabtip-shiptab']);
	var roomtab = SM.addNewEl('li', menu, 'SMtab-room_tab', "<img src='/img/icons/ui/door.png' />" + SM.TEXT['tabs_room']);
	roomtab.addEventListener('click', function() { SM.changeTab('room_tab'); });
	roomtab.setAttribute('data-SMtip', SM.TEXT['tabtip-roomtab']);
	var chattab = SM.addNewEl('li', menu, 'SMtab-chat_col', "<img src='/img/icons/ui/wall.png' />" + SM.TEXT['tabs_chat']);
	chattab.addEventListener('click', function() { SM.changeTab('chat_col'); });
	chattab.setAttribute('data-SMtip', SM.TEXT['tabtip-chattab']);
	var gametab = SM.addNewEl('li', menu, 'SMtab-room_col', "<img src='/img/icons/ui/moduling.png' />" + SM.TEXT['tabs_game']);
	gametab.addEventListener('click', function() { SM.changeTab('room_col'); });
	gametab.setAttribute('data-SMtip', SM.TEXT['tabtip-gametab']);
	var shoptab = SM.addNewEl('li', menu, 'SMvending', "<img src='/img/icons/ui/credit_small.png' />" + SM.TEXT['tabs_shop'])
	shoptab.addEventListener('click', function() {
		SM.sel('#SMvending').innerHTML = "<img src='/img/icons/ui/loading1.gif' />" + SM.TEXT['tabs_shop'];
		Main.ajax('/vending', null, function() {
			SM.reInit();
			SM.changeTab('room_col');
			SM.sel('#SMvending').innerHTML = "<img src='/img/icons/ui/credit_small.png' />" + SM.TEXT['tabs_shop'];
		});
	});
	shoptab.setAttribute('data-SMtip', SM.TEXT['tabtip-shoptab']);

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
		SM.copyEl(expoblock, ship_tab, SM.sel('#SMalerts')).style.display = 'block'; //Copie, et pas déplacement, sinon le bloc est perdu au rechargement interne
		expoblock.style.display = 'none';
		SM.moveEl(SM.addNewEl('img', null, null, null, { src: '/img/icons/ui/planet.png' }), firstalert, firstalert.firstChild); //Icône planète = expédition en cours
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

	if (SM.sel('.statuses [src$="moduling.png"]'))
	{
		SM.addNewEl('p', room_tab, null, SM.TEXT['roomtab-focused']).className = 'SMcenter';
		return;
	}

	// INCENDIE DANS LA PIÈCE //
	var infobar = SM.sel('#topinfo_bar');
	var fireroom = SM.alertrooms[SM.rooms.indexOf(SM.sel('#input').getAttribute('d_name'))]; //Voir .alertrooms
	if (SM.sel('[href^="?action=SIGNAL_FIRE"]') //Pas encore signalé
		|| (document.querySelector('.alarm [src$="fire.png"]') //Signalé
		   && RegExp(fireroom + '\\s\*\[\^2\]').test(SM.getTipContent(document.querySelector('.alarm [src$="fire.png"]').parentNode.onmouseover)))
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
	var equipmentlist = SM.addNewEl('select', room_tab, 'equipmentselect');
	equipmentlist.addEventListener('change', function() { SM.displayRoomActions(1); });
	SM.addNewEl('option', equipmentlist, null, "—", { value: 'NULL' });

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
			for (var i = 0; i < actions.length; i++)
			{
				if (actions[i].innerHTML.indexOf('REPAIR_OBJECT') != -1 || actions[i].innerHTML.indexOf('REPAIR_PATROL_SHIP') != -1)
					{ eqname += ((item.iid == 'DOOR') ? SM.TEXT['broken_door'] : SM.TEXT['broken']); break; }
			}
			SM.addNewEl('option', equipmentlist, null, eqname, { value: item.serial });
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
	var inventory = SM.sel('#SMroom');
	for (var i = 0; i < inventory.children.length; i++)
		{ inventory.children[i].setAttribute('onclick', 'SM.selectItem(this);'); }

	SM.moveEl(SM.addNewEl('div', null, 'SMitemdesc', null), invblock, invblock.lastElementChild);
};


SM.chatTab = function() {
	var chat = SM.sel('#cdMainChat');

	//Liens d'exploration
	var bubbles = SM.toArray(document.querySelectorAll('.bubble:not(.SMlinked)'));
	for (var i = 0; i < bubbles.length; i++)
	{
		bubbles[i].innerHTML = bubbles[i].innerHTML.replace(/https?:\/\/mush\.(vg|twinoid\.(com|es))\/expPerma\/[0-9]+/g, "<a target='_blank' href='$&'>$&</a>");
		bubbles[i].className += ' SMlinked';
	}

	if (chat.className.search(/SM(hide|show)paste/) == -1)
	{
		chat.className = 'SMhidepaste';
		//#wall : création d'un nouveau topic général ; #privateform : création d'un message privé
		var wallinputs = [['#wall', '#cdChatInput5'], ['#privateform', '#cdChatInput7']];
		for (i in wallinputs)
		{
			var input = SM.sel(wallinputs[i][1]);
			input.setAttribute('onfocus', '$(this).addClass("chatboxfocus"); return true;'); //Main.onChatFocus ne fait qu'empêcher le collage… -_-
			input.value = '';
			SM.addButton(SM.sel(wallinputs[i][0]), SM.TEXT['paste'], { class: 'SMpastebutton', dataId: wallinputs[i][1] }).addEventListener('click', function() {
				if (SM.previewtext)
				{
					var t = SM.sel(this.getAttribute('dataId'));
					t.value = SM.previewtext;
					t.focus();
				}
				SM.hidePaste();
			});
		}
	}

	//Topics
	var units = document.getElementsByClassName('unit');
	for (var i = 0; i < units.length; i++)
	{
		if (units[i].lastElementChild.className != 'but SMpastebutton')
		{
			SM.addButton(units[i], SM.TEXT['paste'], { class: 'SMpastebutton', dataId: units[i].getAttribute('data-k') }).addEventListener('click', function() {
				if (SM.previewtext)
				{
					var t = SM.sel('#wall_reply_' + this.getAttribute('dataId'));
					t.value = SM.previewtext;
					t.parentNode.parentNode.parentNode.className = 'blockreply';
					t.focus();
				}
				SM.hidePaste();
			});
		}
	}

	//Favori/défavori
	var unfavs = SM.toArray(document.querySelectorAll('[onclick^="Main.onUnfavClick"]'));
	for (var i = 0; i < unfavs.length; i++)
		{ unfavs[i].setAttribute('onclick', "SM.loadingScreen(); Main.onUnfavClick($(this)); return false;"); }
	var favs = SM.toArray(document.querySelectorAll('[onclick^="Main.onFavClick"]'));
	for (var i = 0; i < favs.length; i++)
		{ favs[i].setAttribute('onclick', "SM.loadingScreen(); Main.onFavClick($(this)); return false;"); }

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
	
	//Annonce : /submitDailyOrder ; TODO: marche peut-être aussi pour les missions ?
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
	tab.onmouseover = function() { Main.showTip(this, SM.TEXT['editor_tip']); };
	tab.addEventListener('mouseout', function() { Main.hideTip(); });
	tab.addEventListener('click', function() { SM.changeChatTab(this); });
	tab.className = 'tab taboff';
	var editor = SM.addNewEl('div', SM.sel('#chatBlock'), 'SMeditor');
	SM.addNewEl('h4', editor, null, SM.TEXT['SM-added_tab']).className = 'SMtabwarning';
	SM.addNewEl('p', editor, null, SM.TEXT['SM-added_tab_text']).className = 'SMtabwarning';
	SM.addNewEl('p', editor, null, SM.TEXT['preview-tags-warning']).className = 'SMcenter';
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
		SM.addButton(buts, SM.TEXT['preview_refresh'], { class: 'SMsmallbut' }).addEventListener('click', function() { SM.refreshPreview(); });
		SM.addButton(buts, SM.TEXT['preview_erase'], { class: 'SMsmallbut' }).addEventListener('click', function() {
			if (confirm(SM.TEXT['preview_confirm_erase']))
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
			SM.addNewEl('img', s, null, null, { src: '/img/icons/ui/' + SM.smileys[i][1], dataSmiley: SM.smileys[i][0].split('|')[0] }).addEventListener('click', function() {
				SM.sel('#tid_wallPost').value += ':' + this.getAttribute('dataSmiley') + ':';
				setTimeout(function() { SM.refreshPreview(); }, 100);
			});
		}

		//Liste des messages préformatés
		SM.addNewEl('p', form, null, SM.TEXT['premessages_title'], { style: 'color: black; margin-top: 20px;' });
		var premessages = SM.addNewEl('select', form, 'SMpremessages');
		premessages.addEventListener('change', function() { SM.buildMessage(); });
		var options = ['NULL', 'inventory', 'researches', 'researches++', 'projects', 'planet', 'comms'];
		for (var i = 0; i < options.length; i++)
			{ SM.addNewEl('option', premessages, null, SM.TEXT['premessages_' + options[i]], { value: options[i] }); }

		//Ajout des boutons de copie & sauvegarde
		SM.addButton(form, SM.TEXT['preview_copy']).addEventListener('click', function() {
			if (SM.sel('#tid_wallPost').value)
			{
				SM.previewtext = SM.sel('#tid_wallPost').value.slice(0, 2500);
				SM.sel('#cdMainChat').className = 'SMshowpaste';
				SM.sel('#cdModuleContent').className = SM.sel('#cdModuleContent').className.replace(/SMhidepaste/, 'SMshowpaste');
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

			message += ":pills: **//" + SM.TEXT['preformat-researches_title'] + " //**:pills:\n\n\n\n";
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
			SM.addButton(popup, SM.TEXT['preformat-researches++_submit']).addEventListener('click', function() {
				var message = ":pills: **//" + SM.TEXT['preformat-researches_title'] + " //**:pills:\n\n\n\n";
				var researches = document.getElementsByClassName('SMresearch');
				for (var i = 0; i < researches.length; i++)
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
			if (!/img\/cards\/projects/.test(SM.sel('#cdModuleContent').innerHTML)) //Pas d'ID spécifique au Cœur de NERON :(
				{ alert(SM.TEXT['preformat-projects_nomodule']); break; }

			message += ":pa_core: **//" + SM.TEXT['preformat-projects_title'] + " //**:pa_core:\n\n\n\n";
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
						message += SM.preformatPlanet(planets[0]);
						SM.sel('#tid_wallPost').value = message;
						SM.refreshPreview();
						SM.sel('#SMpopup').style.display = 'none';
					}); //Première planète
					SM.addButton(popup, planets[1].firstElementChild.textContent).addEventListener('click', function() {
						message += SM.preformatPlanet(planets[1]);
						SM.sel('#tid_wallPost').value = message;
						SM.refreshPreview();
						SM.sel('#SMpopup').style.display = 'none';
					}); //Seconde planète
					SM.addButton(popup, SM.TEXT['preformat-planet_both']).addEventListener('click', function() {
						message += SM.preformatPlanet(planets[0]) + "\n\n\n\n" + SM.preformatPlanet(planets[1]);
						SM.sel('#tid_wallPost').value = message;
						SM.refreshPreview();
						SM.sel('#SMpopup').style.display = 'none';
					}); //Les deux planètes
					break;
			}
			break;

		case 'comms':
			if (!SM.sel('#trackerModule'))
				{ alert(SM.TEXT['preformat-comms_nomodule']); break; }

			message += ":com: " + SM.TEXT['preformat-comms_title'] + ":com:\n\n\n\n";

			//Qualité du signal
			message += SM.TEXT['preformat-comms_signal'] + SM.sel('#trackerModule .sensors p:first-of-type em').textContent.match(/[0-9]+\s*%/)[0] + "\n";

			//Xyloph
			message += SM.TEXT['preformat-comms_Xyloph'];
			var dbs = SM.toArray(document.querySelectorAll('#trackerModule .perfor li:not(.undone)'));
			if (dbs.length)
			{
				message += dbs.length + "/12\n";
				var writedesc = confirm(SM.TEXT['preformat-comms_Xylophdesc']);
				for (var i = 0; i < dbs.length; i++)
				{
					var text = SM.reformat(SM.getTipContent(dbs[i].onmouseover));
					if (writedesc)
					{
						var desc = " : //" + text.match(/<p><strong>(.*)<\/strong><\/p>/)[1] + "//";
						desc = SM.reformat(desc.replace(/<img(?:.*)alt=['"]([a-zA-Z]+)['"](?:.*)\/?>/g, "$1").replace(/<strong>(.*)<\/strong>/g, "$1"));
					}
					else
						{ var desc = ""; }
					message += "- " + text.match(/<h1>(.*)<\/h1>/)[1] + desc + "\n";
				}
			}
			else
				{ message += SM.TEXT['preformat-comms_Xylophnone'] + "\n"; }

			//Bases rebelles
			message += SM.TEXT['preformat-comms_bases'];
			var bases = SM.toArray(document.querySelectorAll('#trackerModule .bases [data-id]')).reverse();
			var anysignal = false;
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
					{ message += SM.TEXT['preformat-comms_basedecoded'] + "\n"; }
				else
				{
					if (span.className == 'percent') //En décodage
						{ message += span.textContent.trim() + "\n"; }
					else //Perdue
						{ message += SM.TEXT['preformat-comms_baselost'] + "\n"; }
				}
			}
			if (!anysignal) //Aucun signal pour le moment
				{ message += SM.TEXT['preformat-comms_basesnone'] + "\n"; }

			//MAJ NERON
			message += SM.TEXT['preformat-comms_neron'] + SM.sel('#trackerModule .neron h2').textContent.match(/[0-9]+\.[0-9]+/)[0] + "\n\n\n\n//Over.//";

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
		{ var message = SM.TEXT['preformat-planet_orbiting'] + " **" + name + " :** "; }
	else //Dans l'espace infini, donc fuel et direction nécessaires
	{
		var direction = planet.children[2].children[1].children[0].innerHTML.replace(/<span>(?:.*)<\/span>/, '').trim();
		var fuel = planet.children[2].children[1].children[1].innerHTML.replace(/<span>(?:.*)<\/span>/, '').trim();
		var message = "**" + name + " :** //" + direction + "//, " + fuel + " :fuel: ; ";
	}

	//Regroupement des zones identiques
	for (var i = 0; i < zones.length; i++)
	{
		var zone = zones[i].slice(4, -5);
		if (zone == '???')
			{ unknown += 1; }
		else
			{ message += zone + ', '; }
	}
	if (unknown)
		{ message += "//" + unknown + " " + SM.TEXT['preformat-planet_unknown'] + '//, '; }
	message = message.slice(0, -2) + '.';

	return message;
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

	/* BEGIN PYTHON REPLACE */
	var l = ['', 'fr', 'en', 'es'];
	SM.addNewEl('script', document.head, null, null, { src: SM.src + 'SMlang-' + l[lang] + '.js' }).onload = func;
	/* END PYTHON REPLACE */
};



/* FONCTION D'INITIALISATION */

SM.init = function() {
	var inlineJS = "document.body.setAttribute('data-SM-src', _tid.makeUrl('/mod/wall/post', { _id: 'tabreply_content', jsm: '1', lang: 'FR' })); Main.SMupdtArr = ['maincontainer']; Main.normalSelUpdtArr = Main.selUpdtArr;";
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
	SM.messageEditor();
	SM.changeActionFunctions();
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
	}, 500);
};


// PYTHON USERSCRIPT //


/* VARIABLES */

SM.version = "0.9.7.4";
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

if (SM.sel('#SMbar') == null) //Une seule initialisation suffit, sinon ça casse !
{
	SM.getSMParameters();
	SM.locale(function() { SM.init(); });
}