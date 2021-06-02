/*** CONFIG START * Use Country Codes ***/
var hl="id"; // Our Webpage Languages
var tl="en"; // Target Languages
var analytics='UA-104256209-4'; //Google Analytics
var activate_translate=true; //true OR false
/*** CONFIG END ***/
if(hl === null){var hl="auto"}if(tl === null){var tl="en"}if(analytics === null){var analytics='UA-104256209-4'}
if(activate_translate !== false){ 
var cssTR = '#google_translate_element,.skiptranslate{display:none;}body{top:0!important;}',
headTR = document.head || document.getElementsByTagName('head')[0],
styleTR = document.createElement('style');
styleTR.type = 'text/css';
if (styleTR.styleSheet){
  styleTR.styleSheet.cssText = cssTR;
} else {
  styleTR.appendChild(document.createTextNode(cssTR));
}
headTR.appendChild(styleTR);
var divTR = document.createElement('div');
divTR.setAttribute("id","google_translate_element");
divTR.style.cssText = "display:none";
document.getElementsByTagName('body')[0].appendChild(divTR);
function TR() {
  new google.translate.TranslateElement({ 
    pageLanguage: hl,
    includedLanguages: tl,
    layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
    multilanguagePage: false,
    gaTrack: true,
    autoDisplay: false,
    gaId: analytics}, 'google_translate_element');
   var atrns=document.querySelector("#google_translate_element select");atrns.selectedIndex=1,atrns.dispatchEvent(new Event("change"));
}
var scriptTR = document.createElement('script');
scriptTR.onload = function(){console.log(script)};
scriptTR.src="//translate.google.com/translate_a/element.js?cb=TR";
document.getElementsByTagName('body')[0].appendChild(scriptTR);
}