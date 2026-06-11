// year
var yr=document.getElementById('yr'); if(yr) yr.textContent=new Date().getFullYear();
// sticky nav
var nav=document.getElementById('nav');
if(nav){
  addEventListener('scroll',function(){nav.classList.toggle('solid',scrollY>40)});
  // mobile menu
  var burger=document.getElementById('burger');
  if(burger){
    burger.addEventListener('click',function(){nav.classList.toggle('open')});
    nav.querySelectorAll('.nav-links a').forEach(function(a){a.addEventListener('click',function(){nav.classList.remove('open')})});
  }
}
// menu tabs (only on menu page)
var tabs=document.getElementById('tabs');
if(tabs){
  tabs.addEventListener('click',function(e){
    var b=e.target.closest('.tab'); if(!b)return;
    tabs.querySelectorAll('.tab').forEach(function(t){t.classList.remove('on')});
    document.querySelectorAll('.pane').forEach(function(p){p.classList.remove('on')});
    b.classList.add('on');
    var pane=document.getElementById('p-'+b.dataset.p); if(pane)pane.classList.add('on');
  });
}
// family reservation -> WhatsApp (only on reserve page)
var resForm=document.getElementById('resForm');
if(resForm){
  resForm.addEventListener('submit',function(e){
    e.preventDefault();
    var v=function(id){var el=document.getElementById(id);return el?(el.value||'').trim():'';};
    var msg=
      "*Family Section Reservation — Qahwa House*\n"+
      "Name: "+v('rName')+"\n"+
      "Mobile: "+v('rPhone')+"\n"+
      "Date: "+v('rDate')+"\n"+
      "Time: "+v('rTime')+"\n"+
      "Guests: "+v('rGuests')+
      (v('rOccasion')? "\nOccasion: "+v('rOccasion'):"")+
      (v('rNotes')? "\nNotes: "+v('rNotes'):"");
    window.open('https://wa.me/918790620996?text='+encodeURIComponent(msg),'_blank');
  });
}
