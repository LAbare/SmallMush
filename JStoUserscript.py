source = open('SmallMush.js', 'r')
FR = open('SMlang-fr.js', 'r')
EN = open('SMlang-en.js', 'r')
ES = open('SMlang-es.js', 'r')
dest = open('SmallMush.user.js', 'w')
replacing = False;
functions = []

print("Check that you changed the source!")

dest.write('// ==UserScript==\n')
dest.write('// @name      Small(Mush)\n')
dest.write('// @version   ' + input('Version : ') + '\n')
dest.write('// @icon      http://labare.github.io/SmallMush/ico.png\n')
dest.write('// @match     http://mush.vg/\n')
dest.write('// @match     http://mush.vg/#\n')
dest.write('// @match     http://mush.twinoid.com/\n')
dest.write('// @match     http://mush.twinoid.com/#\n')
dest.write('// @match     http://mush.twinoid.es/\n')
dest.write('// @match     http://mush.twinoid.es/#\n')
dest.write('// @grant     unsafeWindow\n')
dest.write('// @author    LAbare\n')
dest.write('// ==/UserScript==\n\n\n')
dest.write('var Main = unsafeWindow.Main || Main;\n\n')
dest.write('var unsafeSM = createObjectIn(unsafeWindow, {defineAs: "SM"});\n\n\n')

for line in source:
	if line[0:3] == 'SM.' and '= function' in line:
		functions.append(line.split(' = ')[0].split('.')[1])

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

		dest.write('\t}\n\n')
		dest.write('\tfunc();\n')

	elif 'END PYTHON REPLACE' in line:
		replacing = False;

	elif 'PYTHON USERSCRIPT' in line:
		for function in functions:
			dest.write('exportFunction(SM.' + function + ', unsafeSM, { defineAs: "' + function + '" });\n')
		dest.write('\n\n')

	else:
		if replacing == False:
			dest.write(line)

source.close()
FR.close()
EN.close()
ES.close()
dest.close()