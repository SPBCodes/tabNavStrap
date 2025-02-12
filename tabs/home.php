<div class="row">
	<div class="col-12 col-lg-2 mb-3"><img class="w-75 mt-2 mb-3 d-block m-auto" style="aspect-ratio:1/1" src="/favicon.png">
		<button class="btn-sm w-100 btn btn-primary mb-1" data-tab="invoke" data-tabconfig='{"tabid":"tab1","content":"/tabs/personal.php","refresh":true,"closeable":true,"label":"Personal Information","contentType":"file"}'>Personal Info</button> 
		
		<button class="btn-sm w-100 btn btn-primary" data-tab="invoke" data-tabconfig='{"label":"Static Content","tabid":"tab2","content":"<p>This tab has static, text content</p>","closeable":true}'>Another Tab</button> 
	</div>
	<div class="col-12 col-lg-10">
		<h1>Home Tab Content</h1>
		<p>Loaded dynamically from /tabs/home.php at <?=date("Y-m-d H:i:s",time())?></p>
		<p>This tab has these settings:</p>
		<pre>	
	{
		tabid:"home",
		label:"&lti class=\"bi bi-house\">&lt;/i> Home",
		content:"/tabs/home.php",
		contentType:"file",
		ajaxMethod:"GET",
		closeable:false,
		refresh:false
	}
		</pre> 
		<p>This means the content is loaded only once and the tab cannot be closed by the user.</p>
	</div>
</div>
