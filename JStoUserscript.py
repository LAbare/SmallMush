#!/usr/bin/python3

source = open('SmallMush.js', 'r')
FR = open('SMlang-fr.js', 'r')
EN = open('SMlang-en.js', 'r')
ES = open('SMlang-es.js', 'r')
dest = open('SmallMush.user.js', 'w')
replacingGreasemonkey = False
replacingLocale = False
functions = []
goodsource = False

for line in source:
	if "//SM.src = " in line:
		print("Not source : " + line)

source.seek(0)

dest.write('// ==UserScript==\n')
dest.write('// @name      Small(Mush)\n')
dest.write('// @version   ' + input('Version : ') + '\n')
dest.write("""
// @icon      http://labare.github.io/SmallMush/ico.png
// @match     http://mush.vg/
// @match     http://mush.vg/#*
// @match     http://mush.vg/?*
// @match     http://mush.vg/play*
// @match     http://mush.twinoid.com/
// @match     http://mush.twinoid.com/#*
// @match     http://mush.twinoid.com/?*
// @match     http://mush.twinoid.com/play*
// @match     http://mush.twinoid.es/
// @match     http://mush.twinoid.es/#*
// @match     http://mush.twinoid.es/?*
// @match     http://mush.twinoid.es/play*
// @run-at    document-start
// @grant     unsafeWindow
// @author    LAbare
// ==/UserScript==


var Main; // Defined later once the DOM is loaded
var unsafeSM = createObjectIn(unsafeWindow, { defineAs: "SM" });


""")

for line in source:
	if line[0:3] == 'SM.' and '= function' in line:
		functions.append(line.split(' = ')[0].split('.')[1])

	if 'BEGIN PYTHON REPLACE LOCALE' in line:
		replacingLocale = True
		dest.write('\tswitch (lang)\n')
		dest.write('\t{\n')

		dest.write('\t\tcase 1: //Français\n')
		for l in FR:
			dest.write('\t\t\t' + l)
		dest.write('\n\t\t\tbreak;\n')

		dest.write('\n\t\tcase 2: //Anglais\n')
		for l in EN:
			dest.write('\t\t\t' + l)
		dest.write('\n\t\t\tbreak;\n')

		dest.write('\n\t\tcase 3: //Espagnol\n')
		for l in ES:
			dest.write('\t\t\t' + l)
		dest.write('\n\t\t\tbreak;\n')

		dest.write('\t}\n\n')
		dest.write('\tcb();\n')

	elif 'END PYTHON REPLACE LOCALE' in line:
		replacingLocale = False

	elif 'BEGIN PYTHON REPLACE GREASEMONKEY VARIABLES' in line:
		replacingGreasemonkey = True

	elif 'END PYTHON REPLACE GREASEMONKEY VARIABLES' in line:
		replacingGreasemonkey = False

	elif 'PYTHON USERSCRIPT' in line:
		for function in functions:
			dest.write('exportFunction(SM.' + function + ', unsafeSM, { defineAs: "' + function + '" });\n')
		dest.write('\n\n')

	else:
		if replacingLocale == False and replacingGreasemonkey == False:
			dest.write(line)

source.close()
FR.close()
EN.close()
ES.close()
dest.close()
