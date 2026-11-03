(function(){"use strict";
document.addEventListener("input",function(e){var t=e.target;if(t&&t.getAttribute&&t.getAttribute("data-vin")){var c=t.selectionStart;t.value=t.value.toUpperCase().replace(/[^A-Z0-9]/g,"");try{t.setSelectionRange(c,c)}catch(_){}}});
function send(body){var o={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(body),keepalive:true};return fetch(WEBHOOK,o).then(function(r){if(!r.ok)throw 0}).catch(function(){setTimeout(function(){fetch(WEBHOOK,o).catch(function(){})},2000)})}
var WEBHOOK=["https://app.calldirector.ai","api/webhooks/flow/8528","786b937539fd9b132044c6da5fa944e0f6224555f1d440efb5eacea656c5caa8"].join("/");
var T0=Date.now(),human=false;
["pointerdown","touchstart","keydown"].forEach(function(ev){addEventListener(ev,function(e){if(e.isTrusted)human=true},{capture:true,passive:true})});
var bg=document.querySelector(".burger"),mn=document.querySelector(".mnav");
bg.addEventListener("click",function(){var o=mn.classList.toggle("open");bg.setAttribute("aria-expanded",o)});
mn.querySelectorAll("a").forEach(function(a){a.addEventListener("click",function(){mn.classList.remove("open");bg.setAttribute("aria-expanded","false")})});
var host=document.getElementById("qhost"),thanks=document.getElementById("qthanks"),built=false,formOpen=false,preLine="",tmr;
var START=host?host.innerHTML:"";
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
var YN=["Yes","No"],ST="MD";
var CONTACT=[{n:"Full Name",l:"Full name (first and last)",r:1,a:"name"},{n:"Phone",l:"Phone",k:"tel",r:1,a:"tel"},{n:"Email",l:"Email",k:"email",r:1,a:"email"},{n:"Preferred language",l:"Preferred language",k:"s",o:["English","Français"]}];
var ADDR=function(p){return[{n:p+"Street Address",l:"Street address",r:1,w:1,a:"street-address"},{n:p+"City",l:"City",r:1},{n:p+"State",l:"State",r:1,v:ST},{n:p+"ZIP Code",l:"ZIP code",r:1,k:"zip"}]};
var CURINS=[{n:"Currently insured",l:"Do you have coverage now?",k:"s",o:YN,r:1},{n:"Current insurer",l:"Current insurance company",r:1,sh:["Currently insured","Yes"]},{n:"Policy expiration",l:"Current policy expires",k:"date",sh:["Currently insured","Yes"]}];
var CLOSE=[{n:"Preferred contact method",l:"Preferred contact method",k:"s",o:["Phone","Text","Email"],r:1},{n:"Best time to contact",l:"Best time to reach you",k:"s",o:["Morning","Afternoon","Evening","Any time"]},{n:"Additional notes",l:"Anything else we should know?",k:"ta",w:1,ph:"New purchase, teen driver, rideshare, special requirements…"}];
var FORMS={
"Auto":{t:"Auto Insurance",s:[
 {h:"Your contact details",f:CONTACT},
 {h:"About you",f:ADDR("Mailing ").concat([
  {n:"Time at current address",l:"Time at current address",k:"s",o:["Less than 6 months","6–12 months","1–2 years","3–5 years or more"],r:1},
  {n:"Applicant DOB",l:"Your date of birth",k:"date",r:1},
  {n:"Residence status",l:"Residence status",k:"s",o:["Rent","Own home or condo","Live with parents or other"],r:1},
  {n:"Education level",l:"Education level",k:"s",o:["High school","Some college","Undergraduate degree","Graduate degree"]},
  {n:"Employment status",l:"Employment status",k:"s",o:["Employed","Self-employed","Unemployed","Retired","Student","Homemaker"]},
  {n:"Industry",l:"Industry you work in",ph:"e.g. healthcare, construction"}])},
 {h:"Insurance history",f:CURINS.concat([
  {n:"Lapse in prior insurance",l:"Any lapse in coverage?",k:"s",o:["No lapse","1–29 days","No prior coverage"],r:1},
  {n:"Household members 16+",l:"Household members age 16+",k:"s",o:["0","1","2","3","4","5","6 or more"],r:1},
  {n:"Coverage needed by",l:"When do you need coverage?",k:"date",r:1}])},
 {h:"Vehicles",rep:{key:"Vehicle",max:4,f:[{n:"VIN",l:"VIN, 17 letters and numbers (on your title, registration or insurance card)",k:"vin",r:1,w:1,ph:"e.g. 1HGCM82633A004352"},{n:"Year",l:"Year",k:"num",r:1},{n:"Make",l:"Make",r:1,ph:"e.g. Toyota"},{n:"Model",l:"Model",r:1,ph:"e.g. Camry"}]}},
 {h:"Drivers",rep:{key:"Driver",max:5,f:[{n:"Full Name",l:"First and last name",r:1},{n:"DOB",l:"Date of birth",k:"date",r:1},{n:"License #",l:"Driver’s license number",r:1},{n:"License State",l:"License state",r:1,v:ST},{n:"Gender",l:"Gender",k:"s",o:["Male","Female"],r:1},{n:"Marital Status",l:"Marital status",k:"s",o:["Single","Married","Other"],r:1},{n:"Years Licensed",l:"Years licensed",k:"num",r:1},{n:"Relationship",l:"Relationship to you",k:"s",o:["Self","Spouse","Child","Parent","Relative","Other household member"],r:1,first:"Self"},{n:"Good Student (A/B)",l:"Good student, A or B average?",k:"s",o:YN},{n:"SR-22 Needed",l:"SR-22 needed?",k:"s",o:YN},{n:"Occupation",l:"Occupation (optional)"},{n:"Notes",l:"Notes (optional)",ph:"Tickets, DUI, etc."}]}},
 {h:"Driving record & coverage",f:[
  {n:"Tickets/accidents (5 yrs)",l:"Any tickets or accidents in the past 5 years?",k:"s",o:YN,r:1},
  {n:"# of accidents",l:"Number of accidents",k:"num",r:1,sh:["Tickets/accidents (5 yrs)","Yes"]},
  {n:"# of violations",l:"Number of violations",k:"num",r:1,sh:["Tickets/accidents (5 yrs)","Yes"]},
  {n:"Desired coverage",l:"Coverage you want",k:"s",o:["Liability only","Full coverage (comprehensive & collision)","Not sure, advise me"],r:1},
  {n:"Collision deductible",l:"Collision deductible",k:"s",o:["$250","$500","$1,000","Not applicable (liability only)"],r:1},
  {n:"Comprehensive deductible",l:"Comprehensive deductible",k:"s",o:["$250","$500","$1,000","Not applicable (liability only)"],r:1},
  {n:"Current premium (approx)",l:"Current premium (approx., optional)",ph:"e.g. $180/month"},
  {n:"Extras",l:"Add-ons",k:"cg",o:["Roadside assistance","Rental reimbursement"],w:1}]},
 {h:"Almost done",f:CLOSE,fin:1}]},
"Home / Condo / Renters":{t:"Property Insurance",s:[
 {h:"Your contact details",f:[{n:"Property type",l:"What are you insuring?",k:"s",o:["Home (homeowners)","Condo","Rental property (landlord)","Renters"],r:1,w:1}].concat(CONTACT)},
 {h:"The property",f:ADDR("Property ").concat([
  {n:"Occupancy",l:"Occupancy",k:"s",o:["Primary residence","Secondary home","Rental","Vacant"],r:1},
  {n:"Year built",l:"Year built (if known)",k:"num"},{n:"Square footage",l:"Square footage (if known)",k:"num"},
  {n:"Number of owners",l:"Number of owners",k:"num"},
  {n:"Pets",l:"Any pets?",k:"s",o:YN},{n:"Pet details",l:"Number and type of pets",sh:["Pets","Yes"],ph:"e.g. 1 dog (Labrador)"}])},
 {h:"Home details",f:[
  {n:"Number of rooms",l:"Number of rooms",k:"num"},{n:"Full baths",l:"Full bathrooms",k:"num"},{n:"Half baths",l:"Half bathrooms",k:"num"},
  {n:"Basement",l:"Basement",k:"s",o:["None","Full","Partial"]},{n:"Walkout basement",l:"Walkout basement?",k:"s",o:YN,shn:["Basement","None"]},
  {n:"Roof replaced",l:"Has the roof been replaced?",k:"s",o:["Yes","No","Not sure"]},{n:"Roof replaced year",l:"Year roof was replaced",k:"num",sh:["Roof replaced","Yes"]},
  {n:"Garage",l:"Garage?",k:"s",o:YN},{n:"Garage type",l:"Garage type",k:"s",o:["Attached","Detached"],sh:["Garage","Yes"]},
  {n:"Heating / utilities",l:"Heating / utilities",k:"s",o:["Gas","Electric","Oil","Other"]},
  {n:"Safety features",l:"Safety features",k:"cg",o:["Smoke detectors","Sprinklers","Monitored alarm","Fire extinguisher","Deadbolt locks"],w:1}]},
 {h:"Insurance history",f:CURINS.concat([
  {n:"Claims (5 yrs)",l:"Any claims in the past 5 years?",k:"s",o:YN,r:1},
  {n:"# of claims",l:"Number of claims",k:"num",r:1,sh:["Claims (5 yrs)","Yes"]},
  {n:"Coverage needed by",l:"When do you need coverage?",k:"date"},
  {n:"Bundle auto",l:"Also want an auto quote? (bundling often saves)",k:"s",o:YN}])},
 {h:"Almost done",f:CLOSE,fin:1}]},
"Business":{t:"Business Insurance",s:[
 {h:"Your contact details",f:CONTACT},
 {h:"Your business",f:[{n:"Business legal name",l:"Business legal name",r:1},{n:"DBA",l:"DBA (if any)"},
  {n:"Entity type",l:"Entity type",k:"s",o:["Sole proprietor","LLC","Corporation","Partnership","Nonprofit","Other"],r:1},
  {n:"FEIN / Tax ID",l:"FEIN / Tax ID (if you have one)"},{n:"Years in business",l:"Years in business",k:"num",r:1},
  {n:"Business phone",l:"Business phone",k:"tel",r:1},{n:"Website",l:"Website (if any)",k:"url"}].concat(ADDR("Business "))},
 {h:"Operations",f:[{n:"Operations",l:"Describe your products, services and daily operations",k:"ta",r:1,w:1},
  {n:"Annual revenue",l:"Annual revenue (approx. $)",k:"num"},{n:"Annual payroll",l:"Annual payroll (approx. $)",k:"num"},
  {n:"Full-time employees",l:"Full-time employees",k:"num",r:1,v:"0"},{n:"Part-time employees",l:"Part-time employees",k:"num",r:1,v:"0"}]},
 {h:"Coverage needed",f:[{n:"Coverage",l:"Coverage you need (check all that apply)",k:"cg",r:1,w:1,o:["General Liability","Business Owners Policy (BOP)","Commercial Property","Workers' Compensation","Professional Liability (E&O)","Cyber Liability","Commercial Auto","Umbrella","Bonds"]},
  {n:"Insure a location",l:"Do you need coverage for a building or its contents?",k:"s",o:YN,r:1,w:1},
  {n:"Occupancy",l:"Occupancy",k:"s",o:["Tenant","Owner-occupied"],r:1,sh:["Insure a location","Yes"]},
  {n:"Year built",l:"Year built",k:"num",sh:["Insure a location","Yes"]},{n:"Square footage",l:"Square footage",k:"num",sh:["Insure a location","Yes"]},
  {n:"Construction type",l:"Construction type (optional)",k:"s",o:["Frame","Masonry","Non-combustible","Fire-resistive","Not sure"],sh:["Insure a location","Yes"]},
  {n:"Sprinklers",l:"Sprinklers?",k:"s",o:YN,sh:["Insure a location","Yes"]},{n:"Central station alarm",l:"Central station alarm?",k:"s",o:YN,sh:["Insure a location","Yes"]},
  {n:"Contents value",l:"Estimated contents value ($)",k:"num",sh:["Insure a location","Yes"]}]},
 {h:"Insurance history",f:CURINS.concat([
  {n:"Lapse in prior insurance",l:"Any lapse in coverage?",k:"s",o:["No lapse","1–29 days","No prior coverage"]},
  {n:"Claims (5 yrs)",l:"Any claims in the past 5 years?",k:"s",o:YN,r:1},
  {n:"# of claims",l:"Number of claims",k:"num",r:1,sh:["Claims (5 yrs)","Yes"]},
  {n:"Total paid on claims",l:"Total paid on claims (approx. $)",k:"num",sh:["Claims (5 yrs)","Yes"]},
  {n:"Desired effective date",l:"Desired effective date",k:"date",r:1}])},
 {h:"Almost done",f:CLOSE,fin:1}]},
"Commercial Auto":{t:"Commercial Auto Insurance",s:[
 {h:"Your contact details",f:CONTACT},
 {h:"Your business & vehicles",f:[{n:"Business legal name",l:"Business legal name",r:1},{n:"Vehicle use",l:"What are the vehicles used for?",r:1,ph:"e.g. HVAC service, delivery"},
  {n:"Number of vehicles",l:"Number of vehicles",k:"s",o:["1","2–3","4–10","11+"],r:1},{n:"Radius",l:"How far do they travel?",k:"s",o:["Under 50 miles","50–200 miles","Over 200 miles / multi-state"],r:1},
  {n:"USDOT / MC",l:"USDOT / MC number (if any)"},{n:"Garaging ZIP",l:"Garaging ZIP code",k:"zip",r:1}]},
 {h:"Insurance history",f:CURINS.concat([{n:"Coverage needed by",l:"When do you need coverage?",k:"date",r:1}])},
 {h:"Almost done",f:CLOSE,fin:1}]}
};
var LINES=["Auto","Home / Condo / Renters","Business","Commercial Auto"],LBL={"Home / Condo / Renters":"Home / Condo / Rental"};
function fld(x,p){var n=esc(p+x.n),id="q_"+(p+x.n).replace(/\W+/g,"_"),req=x.r?" required":"",k=x.k||"t",cls="fld"+(x.w||k==="ta"||k==="cg"?" wide":""),
 sh=x.sh?' data-sh="'+esc(p+x.sh[0])+'|'+esc(x.sh[1])+'"':(x.shn?' data-shn="'+esc(p+x.shn[0])+'|'+esc(x.shn[1])+'"':""),lab='<label for="'+id+'">'+esc(x.l)+(x.r?' *':'')+'</label>',h;
 if(k==="s"){var fv=(p.indexOf("Driver 1 ")===0&&x.first)?x.first:"";h=lab+'<select id="'+id+'" name="'+n+'"'+req+'><option value="">Choose…</option>'+x.o.map(function(o){return'<option'+(o===fv?" selected":"")+'>'+esc(o)+'</option>'}).join("")+'</select>'}
 else if(k==="ta")h=lab+'<textarea id="'+id+'" name="'+n+'" rows="3"'+req+(x.ph?' placeholder="'+esc(x.ph)+'"':'')+'></textarea>';
 else if(k==="cg")h='<fieldset class="cgp"'+(x.r?' data-req="1"':'')+' data-n="'+n+'"><legend>'+esc(x.l)+(x.r?' *':'')+'</legend>'+x.o.map(function(o){return'<label class="cb"><input type="checkbox" name="'+n+'" value="'+esc(o)+'"> '+esc(o)+'</label>'}).join("")+'</fieldset>';
 else{var ty={tel:"tel",email:"email",num:"number",date:"date",url:"url",zip:"text"}[k]||"text";
  h=lab+'<input id="'+id+'" name="'+n+'" type="'+ty+'"'+req+(x.v?' value="'+esc(x.v)+'"':'')+(x.ph?' placeholder="'+esc(x.ph)+'"':'')+(x.a?' autocomplete="'+x.a+'"':'')+(k==="zip"?' inputmode="numeric" pattern="[0-9]{5}"':'')+(k==="num"?' min="0" inputmode="numeric"':'')+(k==="tel"?' inputmode="tel"':'')+(k==="vin"?' maxlength="17" pattern="[A-HJ-NPR-Za-hj-npr-z0-9]{17}" title="A VIN is exactly 17 letters and numbers (no I, O or Q)." autocapitalize="characters" spellcheck="false" data-vin="1"':'')+'>'}
 return'<div class="'+cls+'"'+sh+'>'+h+'</div>'}
function block(rep,i){return'<div class="qblock" data-i="'+i+'"><div class="qbh"><strong>'+rep.key+' '+i+'</strong>'+(i>1?'<button type="button" class="qbtn qrm">Remove</button>':'')+'</div><div class="grid">'+rep.f.map(function(x){return fld(x,rep.key+" "+i+" ")}).join("")+'</div></div>'}
function sec(s,i,tot){var b='<div data-st="'+(i+1)+'" hidden><h4>Step '+(i+2)+' of '+(tot+1)+' · '+esc(s.h)+'</h4>';
 if(s.rep)b+='<div class="qlist" data-k="'+s.rep.key+'" data-max="'+s.rep.max+'">'+block(s.rep,1)+'</div><button type="button" class="qbtn qadd" data-k="'+s.rep.key+'">+ Add another '+s.rep.key.toLowerCase()+' (max '+s.rep.max+')</button>';
 else b+='<div class="grid">'+s.f.map(function(x){return fld(x,"")}).join("")+'</div>';
 if(s.fin)b+='<label class="cons"><input type="checkbox" name="Consent" value="Yes" required><span>I agree to be contacted by Tram\'s Insurance Agency about my quote request by phone or email. *</span></label><label class="cons"><input type="checkbox" name="SMS consent" value="Yes"><span>Optional: text me updates about my quote. Msg &amp; data rates may apply. Reply STOP to opt out.</span></label><p class="priv">Please don\'t enter your Social Security number here. If a carrier needs ID details, our licensed agent will collect them securely by phone.</p>';
 b+='<div class="qnav"><button type="button" class="btn btn-line" data-back>Back</button>'+(s.fin?'<button type="submit" class="btn btn-mint">Get my quote</button>':'<button type="button" class="btn btn-ink" data-next>Next</button>')+'</div></div>';return b}
function build(){
 built=true;formOpen=true;var vbx=document.getElementById("vb");if(vbx)vbx.classList.remove("on");
 host.innerHTML='<form class="qf on" novalidate><input class="hp" name="_gotcha" tabindex="-1" autocomplete="off" aria-hidden="true"><div class="bar"><i></i></div>'+
 '<div data-st="0"><h4>Step 1 · Coverage</h4><div class="qlines" role="radiogroup" aria-label="Coverage type">'+LINES.map(function(l){return'<label><input type="radio" name="Quote Type" value="'+esc(l)+'"'+(l===preLine?' checked':'')+'><span>'+esc(LBL[l]||l)+'</span></label>'}).join("")+'</div><div class="qnav"><span></span><button type="button" class="btn btn-ink" data-next>Next</button></div></div>'+
 '<div data-secs></div><div class="qmsg" role="alert"></div></form>';
 var fm=host.querySelector("form"),st=0,tot=0,cur="",bar=fm.querySelector(".bar i"),msg=fm.querySelector(".qmsg"),secs=fm.querySelector("[data-secs]");
 function err(t){msg.className="qmsg err";msg.innerHTML=t}
 function render(line){if(line===cur)return;cur=line;var F=FORMS[line];tot=F.s.length;secs.innerHTML=F.s.map(function(s,i){return sec(s,i,tot)}).join("");fm.querySelector('[data-st="0"] h4').textContent="Step 1 of "+(tot+1)+" · Coverage";apply()}
 function ctl(name){return fm.elements.namedItem(name)}
 function val(name){var c=ctl(name);if(!c)return"";if(c.length!==undefined&&!c.tagName)return"";return c.value}
 function apply(){fm.querySelectorAll("[data-sh],[data-shn]").forEach(function(d){var a=(d.getAttribute("data-sh")||d.getAttribute("data-shn")).split("|"),v=val(a[0]),on=d.hasAttribute("data-sh")?v===a[1]:(v!==""&&v!==a[1]);d.hidden=!on;d.querySelectorAll("input,select,textarea").forEach(function(c){c.disabled=!on})})}
 function show(n){st=n;fm.querySelectorAll("[data-st]").forEach(function(d){d.hidden=+d.getAttribute("data-st")!==n});bar.style.width=Math.round((n+1)/(tot+1||5)*100)+"%";msg.className="qmsg";
  var first=fm.querySelector('[data-st="'+n+'"] input:not([type=radio]):not([type=checkbox]):not(:disabled),[data-st="'+n+'"] select:not(:disabled)');if(n>0&&first)first.focus({preventScroll:true});
  fm.scrollIntoView({behavior:"smooth",block:"start"})}
 function valid(n){var box=fm.querySelector('[data-st="'+n+'"]');
  if(n===0){var r=fm.querySelector('[name="Quote Type"]:checked');if(!r){err("Please pick what you'd like to cover.");return false}render(r.value);return true}
  var els=box.querySelectorAll("input:not([type=checkbox]):not(:disabled),select:not(:disabled),textarea:not(:disabled),.cons input");for(var i=0;i<els.length;i++){if(!els[i].checkValidity()){els[i].reportValidity();return false}}
  var g=box.querySelectorAll('fieldset[data-req]');for(var j=0;j<g.length;j++){if(!g[j].querySelector("input:checked")){err("Please check at least one option.");return false}}return true}
 function renum(list){var k=list.getAttribute("data-k"),rep=null;FORMS[cur].s.forEach(function(s){if(s.rep&&s.rep.key===k)rep=s.rep});
  var data=[].map.call(list.children,function(b){var o={};b.querySelectorAll("input,select,textarea").forEach(function(c){o[c.name.replace(/^\w+ \d+ /,"")]=c.value});return o});
  list.innerHTML=data.map(function(_,i){return block(rep,i+1)}).join("");
  [].forEach.call(list.children,function(b,i){b.querySelectorAll("input,select,textarea").forEach(function(c){var key=c.name.replace(/^\w+ \d+ /,"");if(data[i][key]!==undefined)c.value=data[i][key]})});
  fm.querySelector('.qadd[data-k="'+k+'"]').disabled=list.children.length>=+list.getAttribute("data-max")}
 fm.addEventListener("click",function(e){var b=e.target.closest("button");if(!b)return;
  if(b.hasAttribute("data-next")){if(valid(st))show(st+1)}
  if(b.hasAttribute("data-back"))show(st-1);
  if(b.classList.contains("qadd")){var k=b.getAttribute("data-k"),list=fm.querySelector('.qlist[data-k="'+k+'"]'),rep;FORMS[cur].s.forEach(function(s){if(s.rep&&s.rep.key===k)rep=s.rep});
   if(list.children.length<rep.max){list.insertAdjacentHTML("beforeend",block(rep,list.children.length+1));b.disabled=list.children.length>=rep.max;apply()}}
  if(b.classList.contains("qrm")){var l2=b.closest(".qlist");b.closest(".qblock").remove();renum(l2);apply()}});
 fm.addEventListener("change",function(e){if(e.target.name==="Quote Type"){render(e.target.value);setTimeout(function(){show(1)},180)}else apply()});
 if(preLine){render(preLine);show(1)}
 fm.addEventListener("submit",function(e){e.preventDefault();if(!valid(st))return;
  var fd=new FormData(fm),lines=[],seen={};fd.forEach(function(v,k){if(k==="_gotcha"||typeof v!=="string"||!v.trim())return;if(seen[k]){seen[k].push(v.trim());return}seen[k]=[v.trim()];lines.push(k)});
  var summary=lines.map(function(k){return k+": "+seen[k].join(", ")}).join("\n");
  var spam=!!String(fd.get("_gotcha")||"")||navigator.webdriver===true||!human||Date.now()-T0<3000;
  var ph=String(fd.get("Phone")||"").replace(/\D/g,"");ph=ph.length===10?"+1"+ph:(ph.length===11&&ph[0]==="1"?"+"+ph:fd.get("Phone"));
  send({contactName:fd.get("Full Name"),contactEmail:fd.get("Email"),contactPhone:ph,data:{formType:FORMS[cur].t+" Quote",page:location.href.split("#")[0],summary:summary,language:fd.get("Preferred language")||"English",spam:spam?"yes":"no"}});
  host.innerHTML='<div class="qthanks on" style="display:block">✅ Got it! A licensed agent is on it and will reach out shortly.</div>';setTimeout(resetAll,3500)});
}
function resetAll(){formOpen=false;built=false;preLine="";host.innerHTML=START;wire();thanks.classList.add("on");clearTimeout(tmr);tmr=setTimeout(function(){thanks.classList.remove("on")},12000)}
function open(){
 if(navigator.webdriver===true){host.innerHTML='<p style="font-weight:700">Please call us at <a href="tel:+12408429293">(240) 842-9293</a> for a quote.</p>';return}
 if(built)return;
 if(!preLine&&host.getAttribute("data-default"))preLine=host.getAttribute("data-default");
 var wait=3000-(Date.now()-T0);
 if(!human||wait>0){var b=document.getElementById("qopen");if(b)b.textContent="One moment…";setTimeout(function(){if(human&&!built)build();else if(b&&!built)b.textContent="Start my free quote"},Math.max(wait,400));return}
 build();
}
function wire(){var b=document.getElementById("qopen");if(b)b.addEventListener("click",function(e){if(e.isTrusted)open()})}
if(host)wire();
function toQuote(line){if(!host){location.href="/#quote";return}preLine=line||"";document.getElementById("quote").scrollIntoView({behavior:"smooth",block:"start"});setTimeout(open,350)}
document.querySelectorAll("[data-line]").forEach(function(b){b.addEventListener("click",function(e){if(!e.isTrusted)return;e.preventDefault();if(built&&host){built=false;formOpen=false;host.innerHTML=START;wire()}toQuote(b.getAttribute("data-line"))})});
document.querySelectorAll("a[data-q]").forEach(function(a){a.addEventListener("click",function(e){e.preventDefault();if(e.isTrusted)toQuote("")})});
var vb=document.getElementById("vb");if(vb){vb.querySelector("button").addEventListener("click",function(){vb.classList.remove("on")});
setTimeout(function(){if(formOpen)return;vb.classList.add("on");setTimeout(function(){vb.classList.remove("on")},15000)},2500);}
// simple forms (contact, referral): anti-spam + reset
document.querySelectorAll("form[data-simple]").forEach(function(f){var box=f.parentNode,st=f.querySelector(".qmsg");
 f.addEventListener("submit",function(e){e.preventDefault();if(!f.checkValidity()){f.reportValidity();return}
  var fd=new FormData(f),lines=[];fd.forEach(function(v,k){if(k!=="_gotcha"&&typeof v==="string"&&v.trim())lines.push(k+": "+v.trim())});
  var spam=!!String(fd.get("_gotcha")||"")||navigator.webdriver===true||!human||Date.now()-T0<3000;
  var ph=String(fd.get("Phone")||"").replace(/\D/g,"");ph=ph.length===10?"+1"+ph:(ph.length===11&&ph[0]==="1"?"+"+ph:fd.get("Phone"));
  send({contactName:fd.get("Full Name"),contactEmail:fd.get("Email"),contactPhone:ph,data:{formType:f.getAttribute("data-simple"),page:location.href.split("#")[0],summary:lines.join("\n"),spam:spam?"yes":"no"}});
  f.reset();T0=Date.now();st.className="qthanks on";st.textContent=f.getAttribute("data-ok");setTimeout(function(){st.className="qmsg";st.textContent=""},12000)})});
})();
