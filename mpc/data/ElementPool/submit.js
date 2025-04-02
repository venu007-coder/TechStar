// This should be in the element's edit_properties but the parser doesn't like the "javascript:" 
// on an href

		write('<a href="javascript:document.saveprop.submit();" ');
		write('onMouseOver="window.status=\\'Save Properties\\';return true;" ');
		write('onMouseOut="window.status=window.defaultStatus;return true;">');
		write('<img src=/webpub/graphics/save.gif border=0></a>');

		write('<a href="javascript:document.saveprop.sm_action.value=\\'MPEA_CANCEL_EDITPROPERTIES\\';');
		write('document.saveprop.submit();" ');
		write('onMouseOver="window.status=\\'Cancel Properties\\';return true;" ');
		write('onMouseOut="window.status=window.defaultStatus;return true;">');
		write('<img src=/webpub/graphics/cancel.gif border=0></a>');
