// tabStrap is © 2025 by Steve Burgess (SPBCodes)
// This is released under the MIT licence.
// Please ensure this notice and the licence are published along with the code

class TabNav
{
	constructor(id,container,sortable,homeconfig)
	{
		this.id=id;
		this.container=container;
		this.homeconfig=homeconfig;
		this.history=[];
		this.history[0]=id;
		this.tabnext=0;
		this.sortable=sortable;
	}
	initialise()
	{
		var tabcont=$("#"+this.container).append(`<ul class="nav nav-tabs" id="`+this.id+`"></ul><div id="`+this.id+`-content" class="tabcontentcontainer"></div>`);
		if(this.sortable)
		{
		$("#"+this.id).sortable(
		{
			items: "li:not(:first-child)"
		});
		}
		this.opentab(this.homeconfig);
		
	}
	opentab(tab)
	{
		if(typeof tab.ajaxData=="undefined")
		{
			tab.ajaxData=null;
		}
		if(typeof tab.contentType=="undefined")
		{
			tab.contentType="html";
		}
		if(typeof tab.label=="undefined")
		{
			tab.label="Tab Label Undefined";
		}
		if(typeof tab.ajaxMethod=="undefined" && tab.contentType=="file")
		{
			tab.ajaxMethod="POST";
		}
		if(typeof tab.refresh=="undefined")
		{
			tab.refresh=false;
		}
		if(typeof tab.closeable=="undefined")
		{
			tab.closeable=true;
		}
		$("#"+this.id).find("i.bi-x-circle").hide();
		var that=this;
		
		if($("#"+this.id).find("#"+tab.tabid+"-tab").length==1)
		{
			$("#"+this.id).find(".nav-link").removeClass("active");
			$("#"+this.id).find("#"+tab.tabid+"-tab").find(".nav-link").addClass("active");
			if(tab.closeable)
			{
				$("#"+this.id).find("#"+tab.tabid+"-tab a").find("i.bi-x-circle").show();
			}
			if(tab.refresh==true)
			{
				this.getContent(tab);
			}
		} 
		else
		{
			$("#"+this.id).find(".nav-link").removeClass("active");
			$("#"+this.id).append(`<li  id="`+ tab.tabid+`-tab"   class="nav-item nav-sortable">
			<a class="nav-link active" href="#"><span class="label">` + tab.label +	`</span> </a></li>`);
			if(tab.closeable)
			{
				$("#"+this.id).find("#"+tab.tabid+"-tab a").append(`<i   data-bs-toggle="tooltip" title="Close this tab" class="text-danger ms-2 bi bi-x-circle"></i>`);
				$("#"+this.id).find("#"+tab.tabid+"-tab a").find("i.bi-x-circle").on("click",function() { that.closetab(tab) });
			}
			$(`#`+this.id+`-content`).append(`<div class="tabcontent" id="`+tab.tabid+`-content"></div>`);
			this.getContent(tab);
			$("li#"+tab.tabid+"-tab a").off("click");
			$("li#"+tab.tabid+"-tab a").on("click",
				function()
				{
					that.opentab(tab);
				});
				this.history[this.tabnext]=tab.tabid;
				this.tabnext++;
		}	
		
		$("#"+this.id+"-content").find(".tabcontent").hide();
		$("#"+this.id+"-content").find("#"+tab.tabid+`-content`).show();
	}
	closetab(tabid)
	{
		event.stopPropagation();
		if(typeof tab=="undefined")
		{
			tabid=$("#"+this.id).find("i.bi-x-circle:visible").parent().parent().attr("id").replace("-tab","");
		}
		$("#"+this.id).find("#"+tabid+"-tab").remove();
		$("#"+this.id + "-content").find("#"+tabid+"-content").remove();
		this.history.splice(this.history.indexOf(tabid),1);
		this.tabnext--;
		$("#"+this.id).find("#"+this.history[this.history.length-1]+"-tab a").trigger("click");
	}
	getContent(tab)
	{
		if(tab.contentType=="html")
		{
			$("#"+this.id+"-content").find("#"+tab.tabid+"-content").html(tab.content)
		}
		else
		{
			var that=this;
			var ajaxconfig={};
			ajaxconfig["url"]=tab.content,
			ajaxconfig["method"]=tab.ajaxMethod;
			if(tab.ajaxData)
			{
				ajaxconfig["data"]=tab.ajaxData;	
			}
			$("#"+this.id+"-content").find("#"+tab.tabid+"-content").html(`<div id="loading"><i class="bi bi-arrow-repeat"></i> LOADING - PLEASE WAIT`);
			$.ajax(ajaxconfig).done(
				function(tabcontent) 
				{
					$("#"+that.id+"-content").find("#"+tab.tabid+"-content").html(tabcontent);
					$("#"+that.id+"-content").find("#"+tab.tabid+"-content").find("[data-tab='invoke']").each(function()
						{
							var button=this;
							$(button).on("click",function() 
								{ 
									that.opentab($(button).data("tabconfig"));
								});
						});
						$("#"+that.id+"-content").find("#"+tab.tabid+"-content").find("[data-tab='close']").each(function()
							{
								var button=this;
								$(button).on("click",function()
									{ 
										that.closetab();
									});
							});
				}).fail(function(e)
				{
					$("#"+that.id+"-content").find("#"+tab.tabid+"-content").html(e.responseText);
				});
		}
	}
}
