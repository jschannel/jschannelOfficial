"use strict";angular.module("jschannel",["ngAnimate","ngCookies","ngTouch","ngSanitize","ngResource","ngRoute","ui.bootstrap","duScroll","angularSpinner"]).config(["$routeProvider",function(e){e.when("/",{templateUrl:"app/main/main.html",controller:"MainCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("jschannel").directive("subscription",["$q","$http",function(e,s){return{restrict:"AE",scope:{},templateUrl:"components/subscription/subscription.html",link:function(e){e.user={email:"",submitting:!1},e.subscribeUser=function(){if(void 0!==e.user.email){var a="/api/users/subscribe";e.submitting=!0,s.post(a,{email:e.user.email}).success(function(s){e.submitting=!1,$("#subscribe").children("form").hide(),$("#subscribe").children("h4").html(s.message).removeClass("hidden")}).error(function(s){e.submitting=!1,$("#subscribe").children("form").hide(),$("#subscribe").children("h4").html(s.message).removeClass("hidden")})}}}}}]),angular.module("jschannel").directive("navbar",["$rootScope",function(e){return{restrict:"AE",scope:{},templateUrl:"components/navbar/navbar.html",link:function(s){s.hideMenuList=!1,s.toggleMenuBar=function(){s.hideMenuList=!s.hideMenuList},e.$on("duScrollspy:becameActive",function(){s.hideMenuList=!1})}}}]),angular.module("jschannel").controller("NavbarCtrl",["$scope",function(e){e.date=new Date}]),angular.module("jschannel").controller("ModalInstanceCtrl",["$scope","$modalInstance",function(e,s){e.ok=function(){s.close(e.selected.item)},e.closeModal=e.cancel=function(){s.dismiss("cancel")}}]),angular.module("jschannel").service("MeetupService",["$q","$http",function(e,s){function a(){var a=e.defer(),i="/api/meetups/all";return s.get(i).then(function(e){a.resolve(e.data)},function(e){a.reject(e)}),a.promise}function i(a){var i=e.defer(),n="/api/meetups/:group_name";return n=n.replace(":group_name",a.group_name),s.get(n).then(function(e){i.resolve(e.data)},function(e){i.reject(e)}),i.promise}return{all:a,events:i}}]),angular.module("jschannel").controller("MeetupController",["MeetupService","$scope","usSpinnerService","$modalInstance","$timeout",function(e,s,a,i,n){function t(){n(function(){a.spin("spinner-1")},50),e.all().then(function(e){a.stop("spinner-1"),s.meetups=e},function(){a.stop("spinner-1"),s.meetups=[]})}t(),s.closeModal=s.cancel=function(){i.dismiss("cancel")}}]),angular.module("jschannel").controller("FooterCtrl",function(){}),angular.module("jschannel").directive("navShrink",["$timeout",function(e){return{link:function(s,a){s.initScroll=function(a){window.addEventListener("scroll",function(){a.didScroll||(a.didScroll=!0,e(function(){s.scrollPage(a)},250))},!1)},s.scrollPage=function(e){function s(){return window.pageYOffset||document.documentElement.scrollTop}var a=s();a>=300?(e.addClass("navbar-shrink"),angular.element("#back-top").removeClass("hidden")):(e.removeClass("navbar-shrink"),angular.element("#back-top").addClass("hidden")),e.didScroll=!1},s.initScroll($(a))}}}]),angular.module("jschannel").controller("MainCtrl",["$scope","$document","$modal",function(e,s,a){var i=null;e.associations=[{url:"http://www.github.com",hasImg:!0},{url:"http://jsconf.com",text:"JSConf"},{url:"http://communityjs.org",text:"CommunityJS.org"},{url:"http://bangalorejs.org",hasImg:!0}],e.members=[{name:"Amit Kumar",twitter:"https://twitter.com/toamit",facebook:"https://www.facebook.com/toamitkumar",linkedin:"https://www.linkedin.com/in/toamitkumar",title:"Digital Expert"},{name:"Amit Anand",twitter:"https://twitter.com/iamitanand",facebook:"https://www.facebook.com/aanand388",linkedin:"http://au.linkedin.com/in/iamitanand",title:"Digital Engagement Manager"},{name:"Naresh Sharma",twitter:"https://twitter.com/narunaram",facebook:"https://www.facebook.com/naresh.sharma.798",linkedin:"http://in.linkedin.com/in/narunaram",title:"Digital Consultant"},{name:"Niraj Bhandari",twitter:"https://twitter.com/nirajkbhandari ",facebook:"https://www.facebook.com/nirajkbhandari",linkedin:"http://in.linkedin.com/in/nirajbhandari",title:"Product Manager"},{name:"Suman Paul",twitter:"https://twitter.com/sumankpaul",facebook:"https://www.facebook.com/paul.sumank",linkedin:"https://in.linkedin.com/in/skeep/",title:"Senior Digital Analyst"}],e.scrollToTop=function(){s.scrollTop(0,5e3)},e.openModal=function(e){switch(e){case"conference":i=a.open({templateUrl:"components/modals/conference1.html",controller:"ModalInstanceCtrl",size:"lg"});break;case"meetup":i=a.open({templateUrl:"components/modals/meetup.html",controller:"MeetupController",size:"lg"});break;case"conduct":i=a.open({templateUrl:"components/modals/codeofconduct.html",controller:"ModalInstanceCtrl",size:"lg"})}}}]),angular.module("jschannel").run(["$templateCache",function(e){e.put("app/main/main.html",'<navbar></navbar><header class="parallax"><div class="container"><div class="row"><div class="col-sm-2">&nbsp;</div><div class="col-sm-8 embeded-video"><div class="embed-responsive embed-responsive-16by9"><iframe class="embed-responsive-item" src="//www.youtube.com/embed/eNgOPgZ1aGw" width="300" height="200"></iframe></div></div><div class="col-sm-2">&nbsp;</div></div><div class="row"><div class="col-lg-12 intro-text"><div class="intro-heading">We, The JavaScript People</div></div></div><div class="row"><subscription></subscription><div class="col-md-5 book-ticket"><a href="http://2016.jschannel.com" target="_blank" class="page-scroll btn btn-primary button-shadow">&nbsp;&nbsp;&nbsp;&nbsp;Book Tickets&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a> <a href="assets/docs/JSChannel_Sponsorship_2016.pdf" target="_blank" class="page-scroll btn btn-primary button-shadow">Want to Sponsor?</a></div></div></div></header><section id="events" class="events"><div class="container"><div class="row"><div class="col-lg-12 text-center"><h2 class="section-heading">Events</h2></div></div><div class="row text-center"><div class="col-md-4"><img ng-click="openModal(\'conference\')" class="img-centered img-circle img-responsive" src="assets/images/icons/conference.png" alt=""><h4 class="service-heading">Conferences</h4><p class="text-muted">One of the most sought after JS Conference in India. It is a unique platform to hear best of the bests speakers in JS Community along with learn from expert JS trainers in workshop/live-coding sessions.</p></div><div class="col-md-4"><img ng-click="openModal(\'meetup\')" class="img-centered img-circle img-responsive" src="assets/images/icons/meetup-icon.png" alt=""><h4 class="service-heading">Meet-ups</h4><p class="text-muted">One of the largest JS meetup group in India. We run monthly meetups across 3 locations - Bangalore, NCR & London.</p></div><div class="col-md-4"><img data-toggle="modal" data-target="training" class="img-centered img-circle img-responsive" src="assets/images/icons/js-training.png" alt=""><h4 class="service-heading">Trainings</h4><p class="text-muted">We coduct JS training for individuals/ organisations. The agenda is tailored based on the maturity of the trainees. We ran final semester JS training in <a href="https://www.flickr.com/photos/100543192@N08/sets/72157644681224084/" target="_blank">RVCE Bangalore</a> with more than 500 attendees.</p></div></div></div></section><section id="about" class="bg-darkest-gray"><div class="container"><div class="row"><div class="col-lg-12 text-center"><h2 class="section-heading">About</h2><h3 class="section-subheading text-subheading">See JavaScript, like never seen before.</h3></div></div><div class="row"><div class="col-lg-12"><ul class="timeline"><li><div class="timeline-image"><img class="img-circle img-responsive" src="assets/images/about/1.jpg" alt=""></div><div class="timeline-panel"><div class="timeline-heading"><h4>2013</h4><h4 class="subheading">Our Humble Beginnings</h4></div><div class="timeline-body"><p class="text-subheading">Our first meetup in NCR!</p></div></div></li><li class="timeline-inverted"><div class="timeline-image"><img class="img-circle img-responsive" src="assets/images/about/2.jpg" alt=""></div><div class="timeline-panel"><div class="timeline-heading"><h4>7 Sept 2013</h4><h4 class="subheading">A Community is Born</h4></div><div class="timeline-body"><p class="text-subheading">Our first conference in NCR!</p></div></div></li><li><div class="timeline-image"><img class="img-circle img-responsive" src="assets/images/about/3.jpg" alt=""></div><div class="timeline-panel"><div class="timeline-heading"><h4>16 Nov 2013</h4><h4 class="subheading">Transition to Full Service</h4></div><div class="timeline-body"><p class="text-subheading">We run our first conference in Bengaluru!</p></div></div></li><li class="timeline-inverted"><div class="timeline-image"><img class="img-circle img-responsive" src="assets/images/about/3.jpg" alt=""></div><div class="timeline-panel"><div class="timeline-heading"><h4>18-19 July 2014</h4><h4 class="subheading">Next big leap</h4></div><div class="timeline-body"><p class="text-subheading">We ran India\'s largest JS conference in Bengaluru!</p></div></div></li><li><div class="timeline-image"><img class="img-circle img-responsive" src="assets/images/about/3.jpg" alt=""></div><div class="timeline-panel"><div class="timeline-heading"><h4>17-18 July 2015</h4><h4 class="subheading">Transition to Full Service</h4></div><div class="timeline-body"><p class="text-subheading">We run our first conference in Bengaluru!</p></div></div></li><li class="timeline-inverted"><div class="timeline-image"><h4>Be Part<br>Of Our<br>Story!</h4></div><div class="timeline-panel"><div class="timeline-heading"><h4>15-16 July 2016</h4><h4 class="subheading">Our next chapter</h4></div><div class="timeline-body"><p class="text-subheading">Next conference in Bengaluru!</p></div></div></li></ul></div></div></div></section><aside class="partners" id="partners"><div class="container"><div class="row"><div class="col-lg-12 text-center"><h2 class="section-heading">Big thanks to our partners</h2></div></div><div class="row"><div class="col-md-3 col-sm-6"><a href="http://www.mckinsey.com/client_service/mckinsey_digital/expertise/digital_labs"><span><h1 class="mdl">McKinsey Digital Labs</h1></span></a></div><div class="col-md-3 col-sm-6"><a href="https://www.github.com"><img ng-src="assets/images/associations/1.png" class="img-responsive img-centered" alt=""></a></div><div class="col-md-3 col-sm-6"><a href="http://jsconf.com"><span><h1 class="jsconf">JSConf<sup>TM</sup></h1></span></a></div><div class="col-md-3 col-sm-6"><a href="http://jsconf.com"><span><h1>CommunityJS.org</h1></span></a></div></div><div class="row"><div class="col-md-3 col-sm-6"><a href="http://bangalorejs.org"><img ng-src="assets/images/associations/4.png" class="img-responsive img-centered bangalorejs" alt=""></a></div></div></div></aside><section id="team" class="bg-darkest-gray"><div class="container"><div class="row"><div class="col-lg-12 text-center"><h2 class="section-heading">Our Amazing Team</h2></div></div><div class="row"><div class="col-sm-3" ng-repeat="member in members"><div class="team-member"><a ng-href="{{member.twitter}}" target="_blank"><img ng-src="assets/images/members/{{$index+1}}.jpg" class="img-responsive img-circle" alt=""></a><h4>{{member.name}}</h4><p class="text-subheading">{{member.title}}</p><hr class="divider-short center"><ul class="list-inline social-buttons"><li><a ng-href="{{member.twitter}}" target="_blank"><i class="fa fa-twitter"></i></a></li><li><a ng-href="{{member.facebook}}" target="_blank"><i class="fa fa-facebook"></i></a></li><li><a ng-href="{{member.linkedin}}" target="_blank"><i class="fa fa-linkedin"></i></a></li></ul></div></div></div></div></section><ng-include src="\'components/footer/footer.html\'"></ng-include>'),e.put("components/footer/footer.html",'<footer ng-controller="FooterCtrl"><div class="container"><div class="row"><div class="col-md-4"><span class="copyright">Copyright &copy; JSChannel 2013-2016</span></div><div class="col-md-4"><ul class="list-inline social-buttons"><li><a href="mailto:info@jschannel.com?Subject=Hello JSChannel Team"><i class="fa fa-envelope"></i></a></li><li><a href="https://twitter.com/js_channel/"><i class="fa fa-twitter"></i></a></li><li><a href="https://www.facebook.com/javascriptchannel" target="_blank"><i class="fa fa-facebook"></i></a></li><li><a href="https://plus.google.com/111069083279946389343/"><i class="fa fa-google-plus"></i></a></li><li><a href="http://www.linkedin.com/groups?home=&gid=5112841"><i class="fa fa-linkedin"></i></a></li><li><a href="https://www.youtube.com/channel/UCdf_Ezv2lcB9OKE_4N23w1A"><i class="fa fa-youtube"></i></a></li><li><a href="https://www.flickr.com/photos/100543192@N08/sets/72157646036037789/"><i class="fa fa-flickr"></i></a></li></ul></div><div class="col-md-4"><ul class="list-inline quicklinks"><li><a href="#">Privacy Policy</a></li><li><a href="#">Terms of Use</a></li><li><a href="javascript:void(0)" ng-click="openModal(\'conduct\')">Code of Conduct</a></li></ul></div></div></div></footer><p id="back-top" class="hidden" ng-click="scrollToTop()"><a href="#page-top" du-scrollspy="page-top" offset="30" du-smooth-scroll="">Back to Top</a></p>'),e.put("components/modals/codeofconduct.html",'<div class="modal-header"><div class="row"><div class="col-md-8"><h2 class="modal-title">Code of Conduct</h2></div><div class="col-md-4"><div class="close-modal" ng-click="closeModal()"><div class="lr"><div class="rl"></div></div></div></div></div></div><div class="modal-body"><div class="row"><div class="col-md-12"><div class="code-conduct code-conduct-info"><h4>tl;dr: Be excellent with each other</h4><p>All attendees, speakers, sponsors and volunteers at our conference are required to agree with the following code of conduct. Organisers will enforce this code throughout the event. We are expecting cooperation from all participants to help ensuring a safe environment for everybody.</p></div><div class="code-conduct code-conduct-info-shorter"><h4>The Quick Version</h4><p>Our conference is dedicated to providing a harassment-free conference experience for everyone, regardless of gender, age, sexual orientation, disability, physical appearance, body size, race, or religion (or lack thereof). We do not tolerate harassment of conference participants in any form. Sexual language and imagery is not appropriate for any conference venue, including talks, workshops, parties, Twitter and other online media. Conference participants violating these rules may be sanctioned or expelled from the conference without a refund at the discretion of the conference organisers.</p></div><div class="code-conduct code-conduct-info-longer"><h4>The Less Quick Version</h4><p>Harassment includes offensive verbal comments related to gender, age, sexual orientation, disability, physical appearance, body size, race, religion, sexual images in public spaces, deliberate intimidation, stalking, following, harassing photography or recording, sustained disruption of talks or other events, inappropriate physical contact, and unwelcome sexual attention. Participants asked to stop any harassing behavior are expected to comply immediately. Sponsors are also subject to the anti-harassment policy. In particular, sponsors should not use sexualised images, activities, or other material. Booth staff (including volunteers) should not use sexualised clothing/uniforms/costumes, or otherwise create a sexualised environment. If a participant engages in harassing behavior, the conference organisers may take any action they deem appropriate, including warning the offender or expulsion from the conference with no refund. If you are being harassed, notice that someone else is being harassed, or have any other concerns, please contact a member of conference staff immediately. Conference staff can be identified as they\'ll be wearing branded t-shirts. Conference staff will be happy to help participants contact hotel/venue security or local law enforcement, provide escorts, or otherwise assist those experiencing harassment to feel safe for the duration of the conference. We value your attendance.We expect participants to follow these rules at conference and workshop venues and conference-related social events.</p></div><div class="panel panel-info"><div class="panel-heading"><h3 class="panel-title">Need Help?</h3></div><div class="panel-body">Amit Kumar&nbsp;&nbsp;<i class="fa fa-mobile-phone">+91 9619483353</i><br>Rajesh Panda&nbsp;&nbsp;<i class="fa fa-mobile-phone">+91 9900488400</i><br>Niket Jain&nbsp;&nbsp;<i class="fa fa-mobile-phone">+91 9025328198</i><br>Naresh Sharma&nbsp;&nbsp;<i class="fa fa-mobile-phone">+91 9741594633</i><br>Suman Paul&nbsp;&nbsp;<i class="fa fa-mobile-phone">+91 9945458300</i></div></div></div></div></div><div class="modal-footer jsmodal-footer"><div class="closemodal-button"><button type="button" class="btn btn-primary" ng-click="closeModal()"><i class="fa fa-times"></i> Close Project</button></div></div>'),e.put("components/modals/conference.html",'<div class="container-fluid jsc-modal"><div class="row"><div class="col-md-8"><h2 class="text-muted">Conferences</h2></div><div class="col-md-4"><div class="close-modal" ng-click="closeModal()"><div class="lr"><div class="rl"></div></div></div></div></div><div class="row"><div class="modal-body"><div class="timeline-container clearfix"><div id="time-line"></div><div class="time-to-filter clearfix" id="2014"><p class="timeline-filter"><span>2014</span></p><span class="top-ring"></span> <span class="bottom-ring"></span></div><article class="timeline-item standard-post clearfix"><div class="timeline-icon col-md-2"><div><p data-icon=""></p></div><span class="dotted-horizon"></span> <span class="vertical-line"></span> <span class="circle-outer"></span> <span class="circle-inner"></span></div><div class="entry-body clearfix col-md-10"><div class="kp-thumb hover-effect"><img src="assets/images/modal/2014-conf.jpg" alt=""></div><div><h3 class="entry-title"><a href="2014.jschannel.com">JS Conference 2014</a></h3><span class="entry-date"><span class="icon-clock-4 entry-icon" aria-hidden="true"></span><span>July 18-19, 2014</span></span></div><p>Autem sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tinci laoreet dolore magna aliquam erat volutpat.Ut wisi enim ad minim veniam, quis nostrud exerci</p><a href="http://2014.jschannel.com" target="_blank" class="more-link">Know more&nbsp;<i class="fa fa-chevron-circle-right"></i></a></div></article><div class="time-to-filter clearfix" id="october"><p class="timeline-filter"><span>2013</span></p><span class="top-ring"></span> <span class="bottom-ring"></span></div><article class="timeline-item standard-post clearfix"><div class="timeline-icon"><div><p data-icon=""></p></div><span class="dotted-horizon"></span> <span class="vertical-line"></span> <span class="circle-outer"></span> <span class="circle-inner"></span></div><div class="entry-body clearfix"><div class="kp-thumb hover-effect"><img src="placeholders/post-image/post-1.jpg" alt=""></div><div><h3 class="entry-title"><a href="#">JS Conference 2013 - BLR</a></h3><span class="entry-date"><span class="icon-clock-4 entry-icon" aria-hidden="true"></span><span>November 7, 2013</span></span></div><p>Autem sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tinci laoreet dolore magna aliquam erat volutpat.Ut wisi enim ad minim veniam, quis nostrud exerci</p><a href="http://2013.jschannel.com" target="_blank" class="more-link">Know more&nbsp;<i class="fa fa-chevron-circle-right"></i></a></div></article><article class="timeline-item standard-post clearfix"><div class="timeline-icon"><div><p data-icon=""></p></div><span class="dotted-horizon"></span> <span class="vertical-line"></span> <span class="circle-outer"></span> <span class="circle-inner"></span></div><div class="entry-body clearfix"><div class="kp-thumb hover-effect"><img src="placeholders/post-image/post-1.jpg" alt=""></div><div><h3 class="entry-title"><a href="#">JS Conference 2013 - NCR</a></h3><span class="entry-date"><span class="icon-clock-4 entry-icon" aria-hidden="true"></span><span>September 7, 2013</span></span></div><p>Autem sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tinci laoreet dolore magna aliquam erat volutpat.Ut wisi enim ad minim veniam, quis nostrud exerci</p><a href="http://2013.jschannel.com" target="_blank" class="more-link">Know more&nbsp;<i class="fa fa-chevron-circle-right"></i></a></div></article><a href="#" class="load-more kp-tooltip" data-toggle="tooltip" data-original-title="Load More"><i class="icon-plus"></i></a></div><div class="closemodal-button"><button type="button" class="btn btn-primary" ng-click="closeModal()"><i class="fa fa-times"></i> Close Project</button></div></div></div></div>'),e.put("components/modals/conference1.html",'<div class="modal-header"><div class="row"><div class="col-md-8"><h2 class="modal-title">Conferences</h2></div><div class="col-md-4"><div class="close-modal" ng-click="closeModal()"><div class="lr"><div class="rl"></div></div></div></div></div></div><div class="modal-body"><ul id="timeline"><li class="work"><input class="radio" id="work6" name="works" type="radio" checked=""><div class="relative"><label for="work6">JSChannel Conference 2015</label> <span class="date">17-18th July 2015</span> <span class="circle"></span></div><div class="content"><div class="row"><div class="col-md-4"><a href="http://2015.jschannel.com" class="thumbnail" target="_blank"><img src="assets/images/modal/2014-conf.jpg" alt=""></a></div><div class="col-md-8">JSChannel Conf 2015, was the largest JS conference gathering in Asia with more than 750 attendees. We were honored to have Douglas Crockford - Father of JSON & Yehuda Katz - creator of EmberJS, keynote the conference. <a href="http://2015.jschannel.com" target="_blank" class="more-link">Know more&nbsp;<i class="fa fa-chevron-circle-right"></i></a></div></div></div></li><li class="work"><input class="radio" id="work5" name="works" type="radio"><div class="relative"><label for="work5">JSChannel Conference 2014</label> <span class="date">18-19th July 2014</span> <span class="circle"></span></div><div class="content"><div class="row"><div class="col-md-4"><a href="http://2014.jschannel.com" class="thumbnail" target="_blank"><img src="assets/images/modal/2014-conf.jpg" alt=""></a></div><div class="col-md-8">JSChannel Conf 2014, was one of the largest JS conference gathering in Asia with more than 350 attendees. We were honored to have Douglas Crockford - Father of JSON, keynote the conference. We also had Amod Malviya, CTO Flipkart give a keynote talk. <a href="http://2014.jschannel.com" target="_blank" class="more-link">Know more&nbsp;<i class="fa fa-chevron-circle-right"></i></a></div></div></div></li><li class="work"><input class="radio" id="work4" name="works" type="radio"><div class="relative"><label for="work4">JSChannel Conference BLR - 2013</label> <span class="date">16th Nov 2013</span> <span class="circle"></span></div><div class="content"><div class="row"><div class="col-md-4"><a href="http://2013-blr.jschannel.com" class="thumbnail"><img src="assets/images/modal/2014-conf.jpg" alt=""></a></div><div class="col-md-8">This was our very first conference in Bangalore with more than 150 attendees. The conference was keynote by Kyle Simpson. <a href="http://2013-blr.jschannel.com" target="_blank" class="more-link">Know more&nbsp;<i class="fa fa-chevron-circle-right"></i></a></div></div></div></li><li class="work"><input class="radio" id="work3" name="works" type="radio"><div class="relative"><label for="work3">JSChannel Conference NCR - 2013</label> <span class="date">7th Sept 2013</span> <span class="circle"></span></div><div class="content"><div class="row"><div class="col-md-4"><a href="http://2013-ncr.jschannel.com" class="thumbnail"><img src="assets/images/about/2.jpg" alt=""></a></div><div class="col-md-8">This was our very first conference in Delhi NCR with approximately 100 attendees. The conference was keynote by Christin Lilley. <a href="http://2013-ncr.jschannel.com" target="_blank" class="more-link">Know more&nbsp;<i class="fa fa-chevron-circle-right"></i></a></div></div></div></li></ul></div><div class="modal-footer jsmodal-footer"><div class="closemodal-button"><button type="button" class="btn btn-primary" ng-click="closeModal()"><i class="fa fa-times"></i> Close</button></div></div>'),e.put("components/modals/meetup.html",'<div class="modal-header"><div class="row"><div class="col-md-8"><h2 class="modal-title">Conferences</h2></div><div class="col-md-4"><div class="close-modal" ng-click="closeModal()"><div class="lr"><div class="rl"></div></div></div></div></div></div><div class="modal-body"><span us-spinner="{ lines: 10, length: 3, width: 5, radius: 10, color: \'#fff\' }" spinner-key="spinner-1"></span><accordion><accordion-group ng-repeat="meetup in meetups"><accordion-heading><div class="row">{{meetup.metadata.name}} <i class="pull-right-chevron glyphicon" ng-class="{\'glyphicon-chevron-down\': status.open, \'glyphicon-chevron-right\': !status.open}"></i></div></accordion-heading><div class="row"><div class="col-md-4"><h4><i class="fa fa-group"></i>&nbsp;{{meetup.metadata.members}} members</h4></div><div class="col-md-4"><i class="icon-group"></i><h4>Rated {{meetup.metadata.rating}} out of 5</h4></div><div class="col-md-4"><a ng-href="meetup.metadata.url" class="btn button-shadow-meetups pull-right">Join here</a></div></div><div class="row"><ul class="event-items"><li class="event-item clearfix col-md-1"></li><li class="event-item clearfix col-md-4" ng-if="meetup.upcoming.location"><div class="event-date"><time datetime="2014-09-23">Tuseday Sep. 23</time></div><br class="clearfix"><div class="event-entry text-center"><h3 class="entry-title">Upcoming</h3><p class="lead">{{meetup.upcoming.title}}</p><div class="entry-content"><h5><time datetime="10:00">10:00 AM onwards</time></h5><h5><i class="fa fa-location-arrow"></i>&nbsp;&nbsp;{{meetup.upcoming.location}}<br></h5><p>RSVPs: {{meetup.upcoming.rsvp}}<br><a ng-href="{{meetup.upcoming.url}}" target="_blank">More details <i class="fa fa-chevron-circle-right"></i></a></p></div></div></li><li class="event-item clearfix col-md-4" ng-if="!meetup.upcoming.location"><div class="event-date"><time datetime="2014-09-23"></time></div><br class="clearfix"><div class="event-entry text-center"><h3 class="entry-title">Upcoming</h3><p class="lead">No upcoming event planned, <a ng-href="{{meetup.metadata.url}}" target="_blank">want to suggest one?</a></p></div></li><li class="event-item clearfix col-md-2"></li><li class="event-item clearfix col-md-4" ng-if="meetup.past.location"><div class="event-date"><time datetime="2014-09-23">Tuseday Sep. 23</time></div><br class="clearfix"><div class="event-entry text-center"><h3 class="entry-title">Past</h3><p class="lead">{{meetup.past.title}}</p><div class="entry-content"><h5><time datetime="10:00">10:00 AM onwards</time></h5><h5><i class="fa fa-location-arrow"></i>&nbsp;&nbsp;{{meetup.past.location}}<br></h5><p>RSVPs: {{meetup.past.rsvp}}<br><a ng-href="{{meetup.past.url}}" target="_blank">More details <i class="fa fa-chevron-circle-right"></i></a></p></div></div></li><li class="event-item clearfix col-md-4" ng-if="!meetup.past.location"><div class="event-date"><time datetime="2014-09-23"></time></div><br class="clearfix"><div class="event-entry text-center"><h3 class="entry-title">Past</h3><p class="lead">No past events</p></div></li><li class="event-item clearfix col-md-1"></li></ul></div></accordion-group></accordion></div><div class="modal-footer jsmodal-footer"><div class="closemodal-button"><button type="button" class="btn btn-primary" ng-click="closeModal()"><i class="fa fa-times"></i> Close Project</button></div></div>'),e.put("components/navbar/navbar.html",'<nav nav-shrink="" class="navbar navbar-default navbar-fixed-top" ng-controller="NavbarCtrl"><div class="container"><div class="navbar-header page-scroll col-md-4"><button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" ng-click="toggleMenuBar()"><span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span></button><a href="#page-top" class="navbar-brand page-scroll logo" title="Javascript Enthusiasts Community" du-scrollspy="page-top" offset="30" du-smooth-scroll=""><span></span></a><br><br><span class="nav-text"><a href="http://2016.jschannel.com">15-16 JULY 2016, Bangalore, India <i class="fa fa-chevron-circle-right"></i></a></span></div><div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1 col-md-8" ng-class="hideMenuList ? \'in\' : \'out\'"><ul class="nav navbar-nav navbar-right"><li class="hidden"><a href="#page-top" du-scrollspy="page-top" offset="30" du-smooth-scroll=""></a></li><li du-scrollspy="events" offset="30" du-smooth-scroll=""><a class="page-scroll" href="#events" du-scrollspy="events" offset="30" du-smooth-scroll="">Events</a></li><li du-scrollspy="about" offset="30" du-smooth-scroll=""><a class="page-scroll" href="#about" du-scrollspy="about" offset="30" du-smooth-scroll="">About</a></li><li du-scrollspy="partners" offset="30" du-smooth-scroll=""><a class="page-scroll" href="#partners" du-scrollspy="partners" offset="30" du-smooth-scroll="">Partners</a></li><li du-scrollspy="team" offset="30" du-smooth-scroll=""><a class="page-scroll" href="#team" du-scrollspy="team" offset="30" du-smooth-scroll="">Team</a></li></ul></div></div></nav>'),e.put("components/subscription/subscription.html",'<div class="col-md-7 subscribe" id="subscribe"><form ng-submit="subscribeUser()" method="post" class="horizontal-form" novalidate=""><div class="inline-block"><div class="silver"><input type="email" ng-model="user.email" name="email" placeholder="Enter your email address" class="block-input margin-right"> <button type="submit" ng-disabled="user.submitting" class="btn btn-primary button-shadow" id="subscribe" target="_blank">Subscribe to updates</button></div></div></form><h4 class="subscripition hidden" id="subscripition">Thank you for subscribing to our Newsletter!</h4></div>')}]);