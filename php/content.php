<?php
	$key = $_GET['id'];

	switch($key) {
		case '0':
			echo '<p>Lorem ipsum</p><p>Lorem ipsum</p><p>Lorem ipsum</p>';
		break;
		case '1':
			echo '<p>Lorem ipsum</p><p>Lorem ipsum</p><p>Lorem ipsum</p><ul><li>thing</li><li>thing</li><li>thing</li></ul>';
		break;
		case '2':
			echo '<p>Lorem ipsum</p><p>Lorem ipsum</p><p>Lorem ipsum</p>';
		break;
		case '3':
			echo '<p>Lorem ipsum</p><p>Lorem ipsum</p><p>Lorem ipsum</p>';
		break;
		default:
			echo '<p>No content</p>';
		break;
	}
	echo '<p class="date">' . date('n/j/Y h:i') . '</p>';
?>