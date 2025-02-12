// tabNavStrap is © 2025 by Steve Burgess (SPBCodes)
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
		var tabcont=$("#"+this.container).append(`<ul   id="`+this.id+`"  class="flex-row mt-1 nav nav-tabs ">	</ul><div   class="flex-grow-1 flex-row mb-3" style="padding:20px;background-color:white;border:1px solid rgb(222,226,230);overflow:auto;border-top:0;"><div  id="`+this.id+`-content" class="pb-2"  ></div></div>`);
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
			if($("#"+this.id).find("#"+tab.tabid+"-tab").data("ajaxData"))
			{
				console.log("Element has data");
				if(JSON.stringify(tab.ajaxData)!=$("#"+this.id).find("#"+tab.tabid+"-tab").data("ajaxData"))
				{
					if(confirm("This tab you are trying to open is already open with other content.\r\n\r\nClick OK to replace this tab's content with the new content")==true)
					{
						that.closetab(tab.tabid,function() {
							that.opentab(tab);	
						});
					}
					else
					{
						return false;
					}
				}
			}
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
				$("#"+this.id).find("#"+tab.tabid+"-tab a").find("i.bi-x-circle").on("click",function() { that.closetab(tab.tabid) });
			}
			if(tab.ajaxData)
			{
				
				$("#"+this.id + " li#"+tab.tabid+"-tab").data("ajaxData",JSON.stringify(tab.ajaxData)); 
				console.log($("#"+this.id + " li#"+tab.tabid+"-tab"));
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
	closetab(tabid,callback)
	{
		event.stopPropagation();
		if(typeof tabid=="undefined")
		{
			tabid=$("#"+this.id).find("li a.active").parent().attr("id").replace("-tab","");
		}
		$("#"+this.id).find("#"+tabid+"-tab").remove();
		$("#"+this.id + "-content").find("#"+tabid+"-content").remove();
		this.history.splice(this.history.indexOf(tabid),1);
		this.tabnext--;
		$("#"+this.id).find("#"+this.history[this.history.length-1]+"-tab a").trigger("click");
		if(typeof callback=="function")
		{
			callback();
		}
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
