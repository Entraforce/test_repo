// year
var yr=document.getElementById('yr'); if(yr) yr.textContent=new Date().getFullYear();
// scroll reveal — fade/slide elements in as they enter the viewport
(function(){
  var els=document.querySelectorAll('.reveal');
  if(!els.length) return;
  if(!('IntersectionObserver' in window)){els.forEach(function(e){e.classList.add('in')});return;}
  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target);}
    });
  },{threshold:.12,rootMargin:'0px 0px -8% 0px'});
  els.forEach(function(e){io.observe(e)});
})();
// biryani feature: gentle scroll parallax + 3D tilt on hover
(function(){
  var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion:reduce)').matches;
  if(reduce) return;
  // --- parallax: shift [data-parallax] media as it scrolls through view ---
  var px=document.querySelectorAll('[data-parallax]');
  if(px.length){
    var ticking=false;
    var apply=function(){
      ticking=false;
      var vh=innerHeight||document.documentElement.clientHeight;
      px.forEach(function(el){
        var r=el.getBoundingClientRect();
        if(r.bottom<-40||r.top>vh+40) return;
        var prog=((r.top+r.height/2)-vh/2)/vh;      // ~ -0.6..0.6
        el.style.transform='translate3d(0,'+(prog*-30).toFixed(1)+'px,0)';
      });
    };
    addEventListener('scroll',function(){if(!ticking){ticking=true;requestAnimationFrame(apply);}},{passive:true});
    addEventListener('resize',apply,{passive:true});
    apply();
  }
  // --- 3D tilt toward the cursor on [data-tilt] (fine pointers only) ---
  var fine=window.matchMedia&&matchMedia('(hover:hover) and (pointer:fine)').matches;
  if(fine){
    document.querySelectorAll('[data-tilt]').forEach(function(el){
      var max=el.classList.contains('bir-feature')?5:7;
      el.addEventListener('mousemove',function(e){
        var r=el.getBoundingClientRect();
        var x=(e.clientX-r.left)/r.width-0.5;
        var y=(e.clientY-r.top)/r.height-0.5;
        el.style.transform='perspective(1000px) rotateX('+(-y*max).toFixed(2)+'deg) rotateY('+(x*max).toFixed(2)+'deg)';
      });
      el.addEventListener('mouseleave',function(){el.style.transform='';});
    });
  }
})();
// hero video: play a touch slower for a calmer, slow-pour feel
var hv=document.querySelector('.hero-video');
if(hv){var setRate=function(){hv.playbackRate=0.7;};hv.addEventListener('loadedmetadata',setRate);setRate();}
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

/* ═══════════ WhatsApp button + Menu chatbot (all pages) ═══════════ */
(function(){
  var WA='918790620996';
  var wa=function(text){return 'https://wa.me/'+WA+'?text='+encodeURIComponent(text);};

  // ---- Menu knowledge base ----
  // veg:true=vegetarian, false=non-veg, null=n/a (drinks). price:null = ask counter / varies.
  var MENU=[
    {n:'Mutton Biryani (Single)',p:200,veg:false,cat:'Biryani',fav:1,k:['mutton biryani','biryani','mutton','dum']},
    {n:'Mutton Biryani (Full)',p:380,veg:false,cat:'Biryani',k:['mutton biryani full','biryani','mutton']},
    {n:'Mutton Biryani (Family Pack)',p:580,veg:false,cat:'Biryani',k:['mutton biryani family','biryani','mutton','family pack']},
    {n:'Chicken Biryani (Single)',p:160,veg:false,cat:'Biryani',fav:1,k:['chicken biryani','biryani','dum']},
    {n:'Chicken Biryani (Full)',p:280,veg:false,cat:'Biryani',k:['chicken biryani full','biryani']},
    {n:'Chicken Biryani (Family Pack)',p:480,veg:false,cat:'Biryani',k:['chicken biryani family','biryani','family pack']},
    {n:'Veg Biryani (Single)',p:140,veg:true,cat:'Biryani',k:['veg biryani','biryani','dum']},
    {n:'Veg Biryani (Full)',p:240,veg:true,cat:'Biryani',k:['veg biryani full','biryani']},
    {n:'Veg Biryani (Family Pack)',p:380,veg:true,cat:'Biryani',k:['veg biryani family','biryani','family pack']},
    {n:'Biryani Rice',p:120,veg:true,cat:'Biryani',k:['biryani rice','rice']},
    {n:'Chicken 65 (Half)',p:180,veg:false,cat:'Biryani',k:['chicken 65','65 half']},
    {n:'Chicken 65 (Full)',p:280,veg:false,cat:'Biryani',k:['chicken 65 full','65 full']},
    {n:'Rumali Roti',p:20,veg:true,cat:'Biryani',k:['rumali','roti']},
    {n:'Irani Chai',p:40,veg:true,cat:'Chai & Coffee',fav:1,k:['chai','tea','irani']},
    {n:'Qahwa',p:40,veg:true,cat:'Chai & Coffee',fav:1,k:['qahwa','arabic coffee']},
    {n:'Premium Organic Coffee',p:null,veg:true,cat:'Chai & Coffee',k:['coffee','organic']},
    {n:'Dum Tea',p:40,veg:true,cat:'Chai & Coffee',k:['dum','tea']},
    {n:'Honey Cheese Comb',p:80,veg:true,cat:'Bakery & Buns',fav:1,k:['honey','comb','khaliat','cheese comb','honeycomb']},
    {n:'Chicken Puff',p:40,veg:false,cat:'Bakery & Buns',k:['puff','chicken puff']},
    {n:'Veg Puff',p:null,veg:true,cat:'Bakery & Buns',k:['veg puff']},
    {n:'Bun',p:15,veg:true,cat:'Bakery & Buns',k:['bun']},
    {n:'Maska Bun',p:null,veg:true,cat:'Bakery & Buns',k:['maska']},
    {n:'Malai Bun',p:null,veg:true,cat:'Bakery & Buns',k:['malai']},
    {n:'Red Velvet Cake (500g)',p:450,veg:true,cat:'Cakes & Pastries',k:['red velvet','cake']},
    {n:'Pineapple Cake (500g)',p:400,veg:true,cat:'Cakes & Pastries',k:['pineapple cake','cake']},
    {n:'Choco Truffle Cake',p:450,veg:true,cat:'Cakes & Pastries',k:['truffle','choco cake','cake']},
    {n:'Dark Chocolate Pastry',p:99,veg:true,cat:'Cakes & Pastries',k:['dark chocolate','pastry']},
    {n:'Black Forest Pastry',p:80,veg:true,cat:'Cakes & Pastries',k:['black forest','pastry']},
    {n:'Choco Chips Pastry',p:80,veg:true,cat:'Cakes & Pastries',k:['choco chips','pastry']},
    {n:'Pineapple Pastry',p:80,veg:true,cat:'Cakes & Pastries',k:['pineapple pastry','pastry']},
    {n:'Mango Pastry',p:75,veg:true,cat:'Cakes & Pastries',k:['mango','pastry']},
    {n:'Biscoff Cheesecake',p:69,veg:true,cat:'Cakes & Pastries',k:['biscoff','cheesecake']},
    {n:'Apricot Delight',p:130,veg:true,cat:'Cakes & Pastries',k:['apricot']},
    {n:'Chocolate Pudding Pot',p:50,veg:true,cat:'Cakes & Pastries',k:['pudding','chocolate pudding']},
    {n:'Mixed Fruit Pudding',p:50,veg:true,cat:'Cakes & Pastries',k:['fruit pudding','pudding']},
    {n:'Osmania Biscuit',p:null,veg:true,cat:'Biscuits',fav:1,k:['osmania','biscuit']},
    {n:'Fruit Biscuit',p:null,veg:true,cat:'Biscuits',k:['fruit biscuit','biscuit']},
    {n:'Coconut Biscuit',p:15,veg:true,cat:'Biscuits',k:['coconut biscuit','biscuit']},
    {n:'Chand Biscuit',p:10,veg:true,cat:'Biscuits',k:['chand','biscuit']},
    {n:'Chocolate Cashew',p:15,veg:true,cat:'Biscuits',k:['cashew','choc cashew','biscuit']},
    {n:'Chocolate Chip',p:null,veg:true,cat:'Biscuits',k:['chocolate chip','choc chip','cookie']},
    {n:'Dry Fruit & Almond',p:null,veg:true,cat:'Biscuits',k:['almond','dry fruit','biscuit']},
    {n:'Sesame Biscuit',p:null,veg:true,cat:'Biscuits',k:['sesame','biscuit']},
    {n:'Oat Biscuit',p:null,veg:true,cat:'Biscuits',k:['oat','biscuit']},
    {n:'Saffron Cookie',p:null,veg:true,cat:'Biscuits',k:['saffron','cookie']},
    {n:'Coconut Cherry',p:null,veg:true,cat:'Biscuits',k:['cherry','coconut cherry','biscuit']},
    {n:'Chicken Pizza',p:160,veg:false,cat:'Snacks & Fast Food',fav:1,k:['chicken pizza','pizza']},
    {n:'Veg Pizza',p:130,veg:true,cat:'Snacks & Fast Food',k:['veg pizza','pizza']},
    {n:'Chicken Burger',p:80,veg:false,cat:'Snacks & Fast Food',fav:1,k:['chicken burger','burger']},
    {n:'Crispy Burger',p:130,veg:false,cat:'Snacks & Fast Food',k:['crispy burger','burger']},
    {n:'Veg Burger',p:50,veg:true,cat:'Snacks & Fast Food',k:['veg burger','burger']},
    {n:'Chicken Wrap',p:100,veg:false,cat:'Snacks & Fast Food',k:['chicken wrap','wrap']},
    {n:'Crispy Chicken Wrap',p:110,veg:false,cat:'Snacks & Fast Food',k:['crispy wrap','wrap']},
    {n:'Paneer Wrap',p:120,veg:true,cat:'Snacks & Fast Food',k:['paneer','wrap']},
    {n:'Chicken Pop Corn',p:90,veg:false,cat:'Snacks & Fast Food',k:['popcorn','pop corn']},
    {n:'Chicken Samoli',p:null,veg:false,cat:'Snacks & Fast Food',k:['samoli','sub']},
    {n:'Chicken 65 Roll',p:90,veg:false,cat:'Snacks & Fast Food',k:['chicken 65','65 roll','roll']},
    {n:'Butter Chicken Roll',p:90,veg:false,cat:'Snacks & Fast Food',k:['butter chicken','roll']},
    {n:'Chicken Roll',p:80,veg:false,cat:'Snacks & Fast Food',k:['chicken roll','roll']},
    {n:'Club Sandwich',p:80,veg:false,cat:'Snacks & Fast Food',k:['club','sandwich']},
    {n:'Veg Sandwich',p:50,veg:true,cat:'Snacks & Fast Food',k:['veg sandwich','sandwich']},
    {n:'Chicken Salad',p:80,veg:false,cat:'Snacks & Fast Food',k:['salad']}
  ];
  var fmt=function(p){return p?'₹'+p:'Ask counter';};
  var CATS=['Biryani','Chai & Coffee','Bakery & Buns','Cakes & Pastries','Biscuits','Snacks & Fast Food'];

  // ---- build floating UI ----
  var waSvg='<svg viewBox="0 0 32 32"><path d="M16 .5C7.4.5.5 7.4.5 16c0 2.8.7 5.4 2 7.8L.5 31.5l7.9-2c2.3 1.2 4.9 1.9 7.6 1.9 8.6 0 15.5-6.9 15.5-15.5S24.6.5 16 .5zm0 28.3c-2.5 0-4.9-.7-6.9-1.9l-.5-.3-4.6 1.2 1.2-4.5-.3-.5C3.9 20.7 3.2 18.4 3.2 16 3.2 9 9 3.2 16 3.2S28.8 9 28.8 16 23 28.8 16 28.8zm7.1-8.8c-.4-.2-2.3-1.1-2.6-1.3-.4-.1-.6-.2-.9.2-.2.4-.9 1.2-1.1 1.4-.2.2-.4.2-.8.1-.4-.2-1.6-.6-3.1-1.9-1.1-1-1.9-2.3-2.1-2.7-.2-.4 0-.5.2-.7.2-.2.4-.4.5-.6.2-.2.2-.4.4-.6.1-.2.1-.4 0-.6s-.9-2.1-1.2-2.8c-.3-.7-.6-.6-.9-.6h-.7c-.2 0-.6.1-.9.4-.3.4-1.2 1.2-1.2 2.9s1.2 3.4 1.4 3.6c.2.2 2.4 3.7 5.9 5.2.8.4 1.5.6 2 .7.8.3 1.6.2 2.2.1.7-.1 2.3-.9 2.6-1.8.3-.9.3-1.6.2-1.8-.1-.1-.4-.2-.8-.4z"/></svg>';
  var fabs=document.createElement('div');
  fabs.className='qh-fabs';
  fabs.innerHTML=
    '<button class="qh-fab qh-fab-chat" id="qhToggle" aria-label="Chat about the menu">'+
      '<span class="qh-fab-ico">💬</span><span class="qh-fab-close">×</span>'+
      '<span class="qh-tip">Ask about the menu</span>'+
    '</button>'+
    '<a class="qh-fab qh-fab-wa" href="'+wa('Hello Qahwa House 👋 I have a question:')+'" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">'+waSvg+'</a>';
  document.body.appendChild(fabs);

  var chat=document.createElement('div');
  chat.className='qh-chat';
  chat.innerHTML=
    '<div class="qh-head">'+
      '<img src="assets/logo-mark.png" alt="Qahwa House">'+
      '<div class="qh-head-id"><b>Qahwa House</b><small>Menu assistant · instant replies</small></div>'+
      '<button class="qh-x" id="qhClose" aria-label="Close">×</button>'+
    '</div>'+
    '<div class="qh-body" id="qhBody"></div>'+
    '<div class="qh-cart" id="qhCart" style="display:none"></div>'+
    '<form class="qh-input" id="qhForm" autocomplete="off">'+
      '<input id="qhText" placeholder="Ask about the menu…" aria-label="Message">'+
      '<button class="qh-send" type="submit" aria-label="Send">➤</button>'+
    '</form>';
  document.body.appendChild(chat);

  var body=chat.querySelector('#qhBody'),
      form=chat.querySelector('#qhForm'),
      input=chat.querySelector('#qhText'),
      cartBar=chat.querySelector('#qhCart'),
      toggle=fabs.querySelector('#qhToggle');
  var greeted=false, cart=[];

  // ---- cart ----
  function addToCart(name){
    var it=MENU.filter(function(m){return m.n===name})[0]; if(!it)return;
    var line=cart.filter(function(c){return c.n===name})[0];
    if(line){line.q++;}else{cart.push({n:it.n,p:it.p,q:1});}
    renderCart();
  }
  function renderCart(){
    if(!cart.length){cartBar.style.display='none';return;}
    var count=0,total=0,known=false;
    cart.forEach(function(c){count+=c.q;if(c.p){total+=c.p*c.q;known=true;}});
    cartBar.style.display='flex';
    cartBar.innerHTML=
      '<div class="qh-cart-i"><b>'+count+'</b> item'+(count>1?'s':'')+(known?' · approx <b>₹'+total+'</b>':'')+
        ' <button class="qh-clear" id="qhClear" type="button">clear</button></div>'+
      '<a class="qh-cart-order" id="qhOrder">'+waSvg+'Order</a>';
    cartBar.querySelector('#qhClear').onclick=function(){cart=[];renderCart();};
    cartBar.querySelector('#qhOrder').onclick=function(){
      var msg='*Order — Qahwa House*\n';
      cart.forEach(function(c){msg+='• '+c.n+' ×'+c.q+(c.p?' — ₹'+(c.p*c.q):' — (ask counter)')+'\n';});
      var t=0;cart.forEach(function(c){if(c.p)t+=c.p*c.q;});
      msg+='\nApprox total: ₹'+t+'\n(Please confirm availability & final price.)\n\nName:\nPickup / Delivery:\nTime:';
      window.open(wa(msg),'_blank');
    };
  }

  // ---- render helpers ----
  function scroll(){body.scrollTop=body.scrollHeight;}
  function addBot(html,items,chips){
    var m=document.createElement('div');m.className='qh-msg bot';m.innerHTML=html;body.appendChild(m);
    if(items&&items.length){
      var wrap=document.createElement('div');wrap.className='qh-items';
      items.forEach(function(it){
        var row=document.createElement('div');row.className='qh-item';
        var dot=it.veg===null?'':'<span class="qh-dot '+(it.veg?'veg':'non')+'"></span>';
        row.innerHTML='<div class="qh-item-i"><b>'+it.n+'</b><span>'+dot+(it.veg===null?'Drink':it.veg?'Veg':'Non-veg')+'</span></div>'+
          '<div class="qh-item-p">'+fmt(it.p)+'</div>'+
          '<button class="qh-add" data-n="'+it.n+'" aria-label="Add '+it.n+'">＋</button>';
        wrap.appendChild(row);
      });
      body.appendChild(wrap);
    }
    if(chips&&chips.length){
      var cw=document.createElement('div');cw.className='qh-chips';
      chips.forEach(function(c){var b=document.createElement('button');b.className='qh-chip';b.type='button';b.textContent=c;b.onclick=function(){handle(c);};cw.appendChild(b);});
      body.appendChild(cw);
    }
    scroll();
  }
  function addUser(t){var m=document.createElement('div');m.className='qh-msg user';m.textContent=t;body.appendChild(m);scroll();}

  body.addEventListener('click',function(e){
    var b=e.target.closest('.qh-add'); if(!b)return;
    addToCart(b.dataset.n); b.classList.add('added'); b.textContent='✓';
    setTimeout(function(){b.classList.remove('added');b.textContent='＋';},900);
  });

  // ---- bot brain ----
  var DEFAULT_CHIPS=['🍛 Biryani','📋 Full menu','🌿 Veg only','⭐ Bestsellers','🕔 Timings','📍 Location'];
  function listCat(cat){return MENU.filter(function(m){return m.cat===cat});}
  function has(q){for(var i=1;i<arguments.length;i++){if(q.indexOf(arguments[i])>-1)return true;}return false;}

  function respond(raw){
    var q=raw.toLowerCase().trim();
    if(!q) return {html:"Ask me anything about our menu 🙂",chips:DEFAULT_CHIPS};

    if(has(q,'hi','hello','hey','salam','assalam','aoa','yo'))
      return {html:"Assalamu alaikum & welcome to <b>Qahwa House</b>! ☕ I can help you explore the menu, prices, veg options and place an order. What are you in the mood for?",chips:DEFAULT_CHIPS};
    if(has(q,'thank','shukriya','thanks'))
      return {html:"You're most welcome! 🌟 Anything else from the menu?",chips:['📋 Full menu','🛒 Order on WhatsApp']};
    if(has(q,'time','timing','hour','open','close','when'))
      return {html:"We're open <b>every day, 5:00 AM – 1:00 AM</b> — early chai to late-night cravings. 🌙",chips:['📍 Location','⭐ Bestsellers']};
    if(has(q,'where','location','address','direction','reach','map','located'))
      return {html:"📍 <b>Qahwa House</b><br>Pillar No. 14, Asif Nagar Rd, near Raitu Bazaar, Mehdipatnam, Hyderabad 500028.<br><br><a href='https://www.google.com/maps/search/?api=1&query=Qahwa+House+Mehdipatnam+Hyderabad' target='_blank' style='color:var(--gold-l);text-decoration:underline'>Open in Google Maps →</a>",chips:['🕔 Timings','📞 Contact']};
    if(has(q,'phone','contact','call','number','whatsapp'))
      return {html:"📞 Call or WhatsApp us at <b>+91 87906 20996</b>.<br><a href='tel:+918790620996' style='color:var(--gold-l);text-decoration:underline'>Tap to call →</a>",chips:['🕔 Timings','📍 Location']};
    if(has(q,'reserve','reservation','book','table','family'))
      return {html:"We have an A/C upstairs <b>family section</b> — perfect for birthdays & get-togethers. You can <a href='reserve.html' style='color:var(--gold-l);text-decoration:underline'>request a table here →</a> and we'll confirm on WhatsApp.",chips:['⭐ Bestsellers','📋 Full menu']};
    if(has(q,'order','buy','delivery','deliver','parcel','takeaway','take away','home delivery'))
      return {html:"Happy to take your order! 🛒 Tap <b>＋</b> on any item to add it, then hit <b>Order</b> — it'll open WhatsApp with your list ready to send. Or start browsing:",chips:['⭐ Bestsellers','🍔 Fast Food','📋 Full menu']};

    if(q==='veg'||has(q,'vegetarian','veg only','only veg','veg option','veg item','something veg','pure veg','no chicken','no meat')){
      var v=MENU.filter(function(m){return m.veg===true;});
      return {html:"🌿 Plenty for vegetarians! Here are our <b>veg</b> picks:",items:v.slice(0,10),chips:['🍰 Cakes & Pastries','🍪 Biscuits','🛒 Order on WhatsApp']};
    }
    if(has(q,'non veg','non-veg','nonveg'))
      return {html:"Here are our <b>non-veg</b> favourites:",items:MENU.filter(function(m){return m.veg===false;}),chips:['🛒 Order on WhatsApp']};
    if(has(q,'best','popular','recommend','signature','famous','must try','must-try','special','suggest','top'))
      return {html:"⭐ Our customers' favourites:",items:MENU.filter(function(m){return m.fav;}),chips:['🌿 Veg only','🛒 Order on WhatsApp']};
    if(has(q,'cheap','budget','affordable','low price','under 50','under fifty','snack under'))
      return {html:"Easy on the pocket 👇 tasty picks at <b>₹50 or less</b>:",items:MENU.filter(function(m){return m.p&&m.p<=50;}),chips:['⭐ Bestsellers','🛒 Order on WhatsApp']};

    // category intents
    if(has(q,'biryani','biriyani','biriani','dum','mutton','handi'))
      return {html:"🍛 Our new <b>Hyderabadi Dum Biryani</b> — extra-long basmati rice, slow-cooked on <i>dum</i> in a traditional handi. Available in Mutton, Chicken &amp; Veg (Single / Full / Family Pack):",items:listCat('Biryani'),chips:['🛒 Order on WhatsApp','⭐ Bestsellers']};
    if(has(q,'chai','tea','coffee','qahwa','drink','beverage'))
      return {html:"☕ From our brew counter:",items:listCat('Chai & Coffee'),chips:['🥐 Bakery','⭐ Bestsellers']};
    if(has(q,'cake','pastry','dessert','sweet','cheesecake','pudding'))
      return {html:"🍰 Cakes & pastries, baked fresh:",items:listCat('Cakes & Pastries'),chips:['🍪 Biscuits','🛒 Order on WhatsApp']};
    if(has(q,'biscuit','cookie','osmania'))
      return {html:"🍪 Our biscuit tin (prices vary by weight — ask the counter for today's trays):",items:listCat('Biscuits'),chips:['🍰 Cakes & Pastries','🛒 Order on WhatsApp']};
    if(has(q,'bun','bakery','maska','malai','puff','comb','honey'))
      return {html:"🥐 Fresh from the bakery:",items:listCat('Bakery & Buns'),chips:['🍰 Cakes & Pastries','⭐ Bestsellers']};
    if(has(q,'fast food','snack','pizza','burger','wrap','roll','sandwich','samoli','popcorn','65','salad'))
      return {html:"🍔 Snacks & fast food:",items:listCat('Snacks & Fast Food'),chips:['🌿 Veg only','🛒 Order on WhatsApp']};

    if(has(q,'menu','what do you have','options','list','show me','everything','eat'))
      return {html:"Here's the whole menu — pick a section: 👇",chips:['🍛 Biryani','☕ Chai & Coffee','🥐 Bakery','🍰 Cakes & Pastries','🍪 Biscuits','🍔 Fast Food','⭐ Bestsellers']};

    // direct item / keyword match
    var hits=MENU.filter(function(m){
      if(q.indexOf(m.n.toLowerCase())>-1) return true;
      return m.k.some(function(k){return q.indexOf(k)>-1;});
    });
    if(hits.length===1) return {html:"Here you go — tap <b>＋</b> to add it to your order:",items:hits,chips:['🛒 Order on WhatsApp','📋 Full menu']};
    if(hits.length>1) return {html:"Found these for you:",items:hits.slice(0,8),chips:['🛒 Order on WhatsApp']};

    if(has(q,'price','cost','rate','how much','kitne','kitna'))
      return {html:"Sure — which item's price would you like? You can type its name, e.g. <b>Chicken Pizza</b> or <b>Red Velvet</b>.",chips:['📋 Full menu','⭐ Bestsellers']};

    return {html:"I didn't quite catch that 🙈 I can help with the <b>menu, prices, veg options, bestsellers, timings, location</b> or taking your <b>order</b>. Or chat with us directly on WhatsApp.",chips:['📋 Full menu','🌿 Veg only','📞 Contact','🛒 Order on WhatsApp']};
  }

  function handle(text){
    addUser(text);
    if(/order on whatsapp/i.test(text) && cart.length){
      cartBar.querySelector('#qhOrder').click(); return;
    }
    setTimeout(function(){var r=respond(text);addBot(r.html,r.items,r.chips);},260);
  }

  form.addEventListener('submit',function(e){e.preventDefault();var t=input.value.trim();if(!t)return;input.value='';handle(t);});

  function openChat(){
    chat.classList.add('open');fabs.classList.add('open');
    if(!greeted){greeted=true;setTimeout(function(){addBot("👋 Hi! I'm the <b>Qahwa House</b> menu assistant. Ask me about chai, bakery, cakes, fast food, prices or veg options — or tap a quick option below.",null,DEFAULT_CHIPS);},150);}
    setTimeout(function(){input.focus();},300);
  }
  function closeChat(){chat.classList.remove('open');fabs.classList.remove('open');}
  toggle.addEventListener('click',function(){chat.classList.contains('open')?closeChat():openChat();});
  chat.querySelector('#qhClose').addEventListener('click',closeChat);
})();
