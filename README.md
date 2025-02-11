# tabNavStrap
Create tabbed navigation and containers for Bootstrap

This JavaScript class enables you to create a Bootstrap tabbed navigation and dynamically add and remove tabs and related content containers.

The class requires:
* jQuery. Tested with v3.7.0.
* jQuery UI (if sortable tabs are required). Tested with v1.13.2.
* Bootstrap CSS and JavaScript files. Tested with v5.3.

# Getting Started

```tabnav=new TabNav(id,container,sortable,hometab);```

* **id** : a unique id for the nav
* **container** : the nav will be created in the container (probably a DIV) with this id
* **sortable** : should the user be able to sort the tabs?
* **hometab** : the settings for the first (home) tab e.g.:

```
{
  tabid:"home",
  label:"<i class=\"bi bi-house\"></i> Home",
  content:"/tabs/home.php",
  contentType:"file",
  ajaxMethod:"GET",
  closeable:false, // the home tab should not be closeable
  refresh:false,
};
```
* **tabid** : a unique id for the tab
* **label** : the label for the tab - can include icons e.g. **&lt;i class="bi bi-house">&lt;/i> Home**
* **content** : the content to display in the tab's content container - can be HTML or a file path
* **contentType** : if the content is a file path, set this to file - otherwise set it to HTML
* **ajaxMethod** : if the content is a file, the file will be retrieved via an ajax request of this type - POST or GET
* **ajaxData** : if a JSON object is specified here, this will be sent with the request
* **closeable** : can the tab be closed by the user - if true, a "close" icon will be displayed in the tab
* **refresh** : if the content is a file and this is set to true, the file will be retrieved each time the tab becomes active

To create the nav within the container:

```tabnav.initialise();```

## Open or Add a new tab:
If a tab with the specified tabid exists, it is set to be active. Otherwise, a new tab is added at the end of the existing tabs.
```
const tabconfig={
  "tabid":"newtab",
  "label":"New Tab",
  "content":"<h1>New Tab Content!</h1>",
  "contentType":"html",
  "closeable":true;
  "refresh":false  
};
tabnav.opentab(tabconfig)
```

## Close a tab programmatically:

```tabnav.closetab()```

will close the currently active tab. The tab and the content container are removed from the DOM.

```tabnav.closetab("newtab")```

will close the tab with a specific id.

## Open a tab using a control on the ajax retrieved content
If you want to open a tab using a control on the content that is retrieved by an ajax request, you can use data attributes.

In the example below the following data attributes are set on a button:

* **data-tab** - this has a value of "invoke" which tells tabStrap that the button wants to open a new tab
* **data-tabconfig** - this has a JSON object with the settings outlined above for opening a new tab. A Staff ID is sent with the ajax request so the content can be specific to the staff member with that ID.

```
<div><h1>List of staff members</h1>
<table class="table table-bordered">
  <thead>
    <tr>
      <th>Name</th>
      <th>Job Title</th>
      <th>Salary</th><th>&nbsp;</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Joe Bloggs</td>
      <td>CEO</td>
      <td>£100,000</td>
      <td><button data-tab="invoke" data-tabconfig='{"tabid":"tab3","label":"Staff Record","content":"/tabs/staffrecord.php","contentType":"file","ajaxData":{"staffid":150},"ajaxMethod":"POST"}' class="btn btn-sm btn-primary">More Info</button></td>
    </tr>
  </table>
</div>
```
## Close the current tab using a control on the ajax retrieved content
If you want to open a tab using a control on the content that is retrieved by an ajax request you can use data attributes.

```
<div>
  <h1>Content retrieved from ajax request</h1>
  <button class="btn btn-danger" data-tab="close">Close This Tab</button>
</div>
```
Clicking the button with close the current tab.

# Live Demo
[View the live demo](https://spbcodes.online/tabNavStrap)
