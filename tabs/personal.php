<?
	sleep(1); // force a delay of 1 second to demonstrate slow loading content
?><h1>Personal Tab Content</h1>
<div class="row">
	<div class="col-12 col-lg-6">
		<p>This page is deliberately loaded after a delay to demonstrate slow loading content.</p>
		<p>Loaded dynamically from /tabs/home.php at <?=date("Y-m-d H:i:s",time())?></p>
		<p>This tab has this setting:</p>
		<pre>	refresh=true;</pre> <p>This means the content is reloaded whenever the tab is made active.</p>
		<p>This button calls the close tab method but does not specify which tab to close. The currently active tab will be closed.</p>
		<button data-tab="close" class="mb-5 btn btn-danger">Close This Tab</button>
		</div><div class="col-12 col-lg-6">
		<h2>Staff List</h2>
		<p>In this example, each button loads the dynamic data for each record into its own tab.</p>
		<table class="table table-bordered table-sm">
			<thead>
				<tr>
					<th>Name</th><th>Job Title</th><th>&nbsp;</th>
				</tr>
			</thead>
			<tbody>
				<tr><td>Joe Bloggs</td><td>Chief Executive Officer</td><td><button data-tab="invoke" data-tabconfig='{"tabid":"tab3","label":"Staff Record :  Joe Bloggs","content":"/tabs/staffrecord.php","contentType":"file","ajaxData":{"staffid":150},"ajaxMethod":"POST"}' class="btn btn-sm btn-primary w-100">More Info</button></td></tr>
				<tr><td>Sue Briggs</td><td>Finance Director</td><td><button data-tab="invoke" data-tabconfig='{"tabid":"tab4","label":"Staff Record : Sue Briggs","content":"/tabs/staffrecord.php","contentType":"file","ajaxData":{"staffid":160},"ajaxMethod":"POST"}' class="w-100 btn btn-sm btn-primary">More Info</button></td></tr>
			</tbody>
		</table>
		<p>In this example, each button tries to load the dynamic data into the same tab (e.g. so only one record can be open at a time).</p>
		<table class="table table-sm table-bordered">
			<thead>
				<tr><th>Name</th><th>Job Title</th><th>&nbsp;</th></tr>
			</thead>
			<tbody>
				<tr><td>Joe Bloggs</td><td>Chief Executive Officer</td><td><button data-tab="invoke" data-tabconfig='{"tabid":"tab3","label":"Staff Record :  Joe Bloggs","content":"/tabs/staffrecord.php","contentType":"file","ajaxData":{"staffid":150},"ajaxMethod":"POST"}' class="btn btn-sm btn-primary w-100">More Info</button></td></tr>
				<tr><td>Sue Briggs</td><td>Finance Director</td><td><button data-tab="invoke" data-tabconfig='{"tabid":"tab3","label":"Staff Record : Sue Briggs","content":"/tabs/staffrecord.php","contentType":"file","ajaxData":{"staffid":160},"ajaxMethod":"POST"}' class="w-100 btn btn-sm btn-primary">More Info</button></td></tr>
			</tbody>
		</table>
	</div>
</div>
