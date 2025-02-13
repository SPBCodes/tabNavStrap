<div>
	<label>Enter some text here to make the tab "dirty"</label>
	<textarea class="form-control" onkeyup="$('#formbut').html('Save Changes')"; data-tabdirtify='{"event":"change","value":true}'></textarea>
	<p class="form-text">You will be warned when you try to close the tab</p>
</div>
<button id="formbut" onclick="$(this).html('Saved!')" class="btn btn-success" data-tabdirtify='{"event":"click","value":false}' >Save</button>
<hr>
<p>When you enter text, the "dirty" status of the tab is set to true. You will have to confirm you want to close the tab.</p>
<p>Save the changes and the "dirty" status is set to false.</p>
