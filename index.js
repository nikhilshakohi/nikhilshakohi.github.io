//Onload function
function loadContent(){
	getImages(); //Load modal of bigger images 
	getConnectionDetails(); //To fetch social connections details
	getSkillDetails(); //Skills
	getProjectDetails();	//Projects
	getTipsTabDetails(); //React Tips Tab
	setInterval(checkPosition,500); //For showing current nav position in menu
}

//For showing current nav position in menu
function checkPosition(){
	//Get Individual divs
	var home = document.getElementById('content-home');
	var works = document.getElementById('content-works');
	var tips = document.getElementById('content-tips');
	var about = document.getElementById('content-about');
	var navs = document.getElementsByClassName("nav-item");
		
	//Clear Old style
	for(var i=0;i<navs.length;i++){navs[i].style.borderBottom="0px solid silver";navs[i].style.opacity="0.8";}

	//Set New style
	var style = "2px solid gainsboro";
	if(window.pageYOffset<works.offsetTop){
		document.getElementById("nav-item-home").style.borderBottom=style;
		document.getElementById("nav-item-home").style.opacity="1";
	}else if(window.pageYOffset>=works.offsetTop-300 && window.pageYOffset<tips.offsetTop-300){
		document.getElementById("nav-item-works").style.borderBottom=style;
		document.getElementById("nav-item-works").style.opacity="1";
	}else if(window.pageYOffset>=tips.offsetTop-300 && window.pageYOffset<about.offsetTop-300){
		document.getElementById("nav-item-tips").style.borderBottom=style;
		document.getElementById("nav-item-tips").style.opacity="1";
	}else if(window.pageYOffset>=about.offsetTop-300){
		document.getElementById("nav-item-about").style.borderBottom=style;
		document.getElementById("nav-item-about").style.opacity="1";
	}

	//Set animation for connectionIcons
	let connectionDetails=JSON.parse(connections);
	for(var i=0;i<connectionDetails.length;i++){
		if(window.pageYOffset<document.getElementById('content-works').offsetTop){
			document.getElementById("connectionIconID"+i).classList.add("ripple");
		}else{
			document.getElementById("connectionIconID"+i).classList.remove("ripple");
		}
	}

	//Set animation for skillIcons
	let skillDetails=JSON.parse(skills);
	for(var i=0;i<skillDetails.length;i++){
		if(window.pageYOffset<document.getElementById('content-works').offsetTop){
			document.getElementById("skillIconID"+i).classList.add("ripple");
		}else{
			document.getElementById("skillIconID"+i).classList.remove("ripple");
		}
	}

	//Set animation for content-item
	let projectsDetails=JSON.parse(projects);
	for(var i=0;i<projectsDetails.length;i++){
		if(window.pageYOffset+window.innerHeight>document.getElementById("contentItemID"+i).offsetTop){
			document.getElementById("contentItemID"+i).classList.add("getUpAnimation");
			document.getElementById("contentItemID"+i).classList.remove("stayDown");
		}else{
			document.getElementById("contentItemID"+i).classList.remove("getUpAnimation");
			document.getElementById("contentItemID"+i).classList.add("stayDown");
		}
	}

	//Set animation for content-tips
	let tipsDetails=JSON.parse(reactTips);
	for(var i=0;i<tipsDetails.length;i++){
		var j=i+1;
		if(window.pageYOffset+window.innerHeight>document.getElementById("tipNo"+j).offsetTop){
			document.getElementById("tipNo"+j).classList.add("getSideAnimation");
			document.getElementById("tipNo"+j).classList.remove("staySide");
		}else{
			document.getElementById("tipNo"+j).classList.remove("getSideAnimation");
			document.getElementById("tipNo"+j).classList.add("staySide");
		}
	}

}

//All images of posts as modal
function getImages(){
	let projectImages=[];
	let projectsDetails=JSON.parse(projects);
	projectsDetails.map((item,id) => {
		projectImages=projectImages+'<div id="'+item.name+'PicModal" class="outsideModal" onclick="hideImage()">'+
	    '<img class="imageModal" src="images/'+item.name+'Pic.png">'+
	  '</div>';
	});
	document.getElementById("bigImages").innerHTML=projectImages;
}
function showImage(image){
	document.getElementById(image+"Modal").style.display="block";
}
function hideImage(){
	var modals=document.getElementsByClassName("outsideModal");
	for(var i=0;i<modals.length;i++){
	  modals[i].style.display="none";
	}
}

//Connection icons in Contact Tab
function getConnectionDetails(){
	var connectionMap=[];
	var connectionsDetails=JSON.parse(connections);
	connectionsDetails.map((item,id) => {
		connectionMap=connectionMap+
		'<a class="connectionIconLink" target="_blank" tabindex="-1" title="'+item.title.charAt(0).toUpperCase()+item.title.slice(1)+' | Nikhil Shakohi" href="'+item.link+'"><img tabindex="0" id="connectionIconID'+id+'" class="subIcon connectionIcon" src="images/'+item.title+'Icon.png" alt="icon"></a>';
	});
	document.getElementById("connectionDetails").innerHTML=connectionMap;
}

//Skills 
function getSkillDetails(){
	var skillMap=[];
	var skillsDetails=JSON.parse(skills);
	skillsDetails.map((item,id) => {
		skillMap=skillMap+'<span class="skillIconDiv" title="'+item.title+'"><img id="skillIconID'+id+'" src="images/'+item.icon+'.png" class="skillIcon" tabindex="0"></span>';
	});
	document.getElementById("skillDetails").innerHTML=skillMap;
}

//Project Details
function getProjectDetails(){
	var projectsMap=[];
	var projectsDetails=JSON.parse(projects);
	projectsDetails.map((item,id) => {
		projectsMap=projectsMap+
		'<div id="contentItemID'+id+'" class="content-works-item stayDown">'+
				'<div class="content-works-item-heading">'+
						'<div class="worksHeading">'+item.heading+'</div>'+
						'<div class="languagesUsed">'+item.languages+'</div>'+
						'<div class="contentSites">'+
								'<a class="myButton siteButton" href="'+item.link+'" target="_blank">See Website</a>'+
								'<a class="myButton linkButton" href="'+item.githubLink+'" target="_blank">See Code in GitHub</a>'+
						'</div>'+
					'</div>'+
				'<div class="content-works-item-content">'+
					item.content+
				'</div>'+
				'<div class="content-works-item-image">'+
					'<div><img class="projectImage" onclick="showImage(\''+item.name+'Pic\')" src="images/'+item.name+'Pic.png" onclick="showImage(\''+item.name+'Pic\')" alt="Project Picture"></div>'+
				'</div>'+
				'<div class="contentSitesMobile">'+
						'<a class="myButton siteButton" href="'+item.link+'" target="_blank">See Website</a>'+
						'<a class="myButton linkButton" href="'+item.githubLink+'" target="_blank">See Code in GitHub</a>'+
				'</div>'+
		'</div>';
	});
	document.getElementById("projectDetails").innerHTML=projectsMap;
}

//React Tips Tab
function getTipsTabDetails(){
	var tipsMap=[];
	var tipsDetails=JSON.parse(reactTips);
	var tipsMenu=[];
	tipsDetails.map((item,id) => {tipsMenu=tipsMenu+(id!=0 ? '<a href="#tipNo'+id+'" class="pageLink">#'+id+' '+item.heading+'</a><br>' : '');});
	tipsDetails.map((item,id) => {
		if(id==0){var contactMeText = '<br>If there are any queries or mistakes or suggestions for these, you can <a class="pageLink" href="#">contact me</a><br>Menu of the below topics:<br>'+tipsMenu;}
		else{var contactMeText='';}
		var newID=id+1;
		tipsMap=tipsMap+
		'<div id="tipNo'+newID+'" class="indtabcontent staySide">'+
			  '<div class="aboutLine">'+
				    '<div class="postHeading"> #'+id+' '+
				      item.heading+
			    '</div>'+
			  '</div>'+
			  '<div>'+
			      item.content+contactMeText+
			  '</div>'+
		'</div>';
	});
	document.getElementById("tipsDetails").innerHTML=tipsMap;
}

