<?php
$html = file_get_contents('fl-menu/fl-menu.html');
$html = str_replace("{{RELATIVE_PATH}}","fl-menu/",$html);
print $html;
?>
