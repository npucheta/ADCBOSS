<?php
function includes()
{
	foreach (glob("src/*.php") as $filename)
		include $filename;
	foreach (glob("src/templates/L4/*.php") as $filename)
			include $filename;
	foreach (glob("src/templates/L7/*.php") as $filename)
			include $filename;
	foreach (glob("src/templates/persist/*.php") as $filename)
			include $filename;
	foreach (glob("src/templates/SLB/*.php") as $filename)
			include $filename;
	foreach (glob("src/templates/SSL/*.php") as $filename)
			include $filename;
}
