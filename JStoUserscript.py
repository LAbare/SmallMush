source = open('MushMobile.js', 'r')
FR = open('MMlang-fr.js', 'r')
EN = open('MMlang-en.js', 'r')
ES = open('MMlang-es.js', 'r')
dest = open('MushMobile.user.js', 'w')
replacing = False;

dest.write('// ==UserScript==\n')
dest.write('// @name      MushMobile\n')
dest.write('// @version   ' + input('Version : ') + '\n')
dest.write('// @match     http://mush.vg/\n')
dest.write('// @match     http://mush.vg/#\n')
dest.write('// @match     http://mush.twinoid.com/\n')
dest.write('// @match     http://mush.twinoid.com/#\n')
dest.write('// @match     http://mush.twinoid.es/\n')
dest.write('// @match     http://mush.twinoid.es/#\n')
dest.write('// @author    LAbare\n')
dest.write('// ==/UserScript==\n\n\n')

for line in source:
	if 'BEGIN PYTHON REPLACE' in line:
		replacing = True;
		dest.write('\tswitch (lang)\n')
		dest.write('\t{\n')

		dest.write('\t\tcase 1: //Français\n')
		for l in FR:
			dest.write('\t\t' + l)
		dest.write('\n\t\tbreak;\n')

		dest.write('\n\t\tcase 2: //Anglais\n')
		for l in EN:
			dest.write('\t\t' + l)
		dest.write('\n\t\tbreak;\n')

		dest.write('\n\t\tcase 3: //Espagnol\n')
		for l in ES:
			dest.write('\t\t' + l)
		dest.write('\n\t\tbreak;\n')

		dest.write('\t}\n')

	elif 'END PYTHON REPLACE' in line:
		replacing = False;

	else:
		if replacing == False:
			dest.write(line)

source.close()
FR.close()
EN.close()
ES.close()
dest.close()