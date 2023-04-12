var gold = 0;
var AD = 1;
var attackSeconds = 3;

ADPurchase = 0;
AD2Purchase = 0;

var zone = 1;
var hZE = 0;
var enemyMaxHp = 5;
var enemyHp = 5;

var playerCurrentHp = 50;
var playerHp = 50;
var level = 1;
var exp = 0;
var expToNext = 6;

var devspeed = 1;
var elapsed = 0;

var D11 = 0;
var D12 = 0;
var D13 = 0;

var stones = 0;
var WUS = 0;
var WUBS = 0;

var tomes = 0;
tomeBank = 0;

advancing = true;

document.getElementById("tomes").innerHTML = tomes + " tomes";
document.getElementById("sword").innerHTML = "Cost: " + Math.floor(4 * (Math.pow(1.5, ADPurchase)))
            document.getElementById("swordtext").innerHTML = "Sword: Level "+ ADPurchase;

loadZone(0);
function loadZone(up){
    playerCurrentHp = playerHp;
    zone += up;
    if(zone > hZE){hZE=zone}
    enemyMaxHp = Math.floor(5 * Math.pow(1.25, zone - 1));
    enemyHp = enemyMaxHp;
    valueCalc();
    document.getElementById("zone").innerHTML = "Zone " + zone + " ("+value + ")";
    attackCharge = 0;
}
hpBar = document.getElementById("playerhpbar")
function hpBar(){
    hpBar.style.width = 100;
}

var lastFrameAt = 0;
function Update(timestamp){;
    delta = timestamp - lastFrameAt;
    delta *= devspeed;
    elapsed += delta / 1000
    document.getElementById("l").innerHTML = elapsed / 60 + "min"
    window.requestAnimationFrame(Update)
    lastFrameAt = timestamp;
    delta = delta / 1000
    Charge(delta);
    enemyCharges(delta);
    barUpdate();

    ADCalc();
    document.getElementById("gold").innerHTML = "Gold: " + gold;
    if(attackCharge < 0){
        attackCharge = 0;
    }
}
window.requestAnimationFrame(Update)

var attackCharge = 0;
function Charge(time){
    attackCharge += time;
    attackSeconds = 3 * Math.pow(0.99, level)
    if(attackCharge >= attackSeconds){
        Attack()
        attackCharge -= attackSeconds;
        return
    }
}
var enemyCharge = 0;
function enemyCharges(time){
    enemyCharge += time;
    if(enemyCharge >= 2){
        enemyAttack()
        enemyCharge = 0;
        return
    }
}
function eADCalc(){
    eAD = (Math.pow(1.1, zone) * (zone * 0.5)) + 1;
    if(D12 == 1){
        eAD /= (Math.pow(AD, 0.3333333) / 2)
    }
    eAD = Math.floor(eAD)
}
function enemyAttack(){
    eADCalc()
    playerCurrentHp -= eAD
    if(playerCurrentHp <= 0){
        Die();
    }
}
function Die(){
    if(zone > 5){
        loadZone(-1)
    }else{
        loadZone((-1 * zone)+1)
    }
    playerLoadHp(1);
    advancing = false;
    attackCharge = 0;
}
document.getElementById("adv").addEventListener("click", function(d){
    advancing = true;
})

var levelFactor = 1;
function levelUp(){
    if(exp >= expToNext){
        exp = exp - expToNext;
        level++;
        expToNext = 6 * (Math.pow(1.5, level))
        document.getElementById("leveltext").innerHTML = "Level " + level;
        playerLoadHp(0.15);
    }
}
function playerLoadHp(restore){
    levelFactor = Math.pow(1.15, level - 1)
    playerHp = (50 * levelFactor)
    playerCurrentHp += playerHp * restore;
    if(playerCurrentHp > playerHp){
        playerCurrentHp = playerHp;
    }
}

document.getElementById("treepanel").style.display = "none"
document.getElementById("upgtab").addEventListener("click", function(a){
    document.getElementById("upgpanel").style.display = "block"
    document.getElementById("treepanel").style.display = "none"
    document.getElementById("wupgpanel").style.display = "none"
})
document.getElementById("treetab").addEventListener("click", function(b){
    document.getElementById("treepanel").style.display = "block"
    document.getElementById("upgpanel").style.display = "none"
    document.getElementById("wupgpanel").style.display = "none"
})
document.getElementById("weaponupgtab").addEventListener("click", function(a){
    document.getElementById("upgpanel").style.display = "none"
    document.getElementById("treepanel").style.display = "none"
    document.getElementById("wupgpanel").style.display = "block"
    WUText();
})

function Attack(){
    enemyHp -= AD
    if(enemyHp <= 0){kill()}
}
function valueCalc(){
    value = Math.floor((2 * Math.pow(1.25, zone - 1)))
    value *= ((Math.floor(zone / 10))+1)
}
function tomeCheck(){
    if(hZE == zone){
        if((zone / 10) == Math.floor(zone / 10)){
            tomes += 1;
            document.getElementById("tomes").innerHTML = tomes + " tomes";
        }
    }
}
function stoneCheck(){
    if(hZE == zone){
        if((zone / 25) == Math.floor(zone / 25)){
            stones += 1;
            document.getElementById("stones").innerHTML = stones + " stones";
        }
    }
}
function kill(){
    valueCalc()
    gold  += value
   tomeCheck()
   stoneCheck()
    enemyCharge = 0;
    playerLoadHp(1);
    if(playerCurrentHp > playerHp){playerCurrentHp = playerHp}
    exp += (Math.pow(1.4, zone-1))
    levelUp();
    if(advancing == true){loadZone(1)} else {loadZone(0)}
    attackCharge = 0;
}
document.getElementById("sword").addEventListener("click", function(buyS){
    buy("sword")
})
document.getElementById("bigsword").addEventListener("click", function(buyBS){
    buy("bigsword")
})

function buy(thing){
    if(thing == "sword"){
        if(gold >= Math.floor(4 * (Math.pow(1.5, ADPurchase)) / Math.max(1, 0.5 * Math.pow((D13+1),4)))){
            gold -= Math.floor(4 * (Math.pow(1.5, ADPurchase)) / Math.max(1, 0.5 * Math.pow((D13+1),4)))
            ADPurchase += 1;
            document.getElementById("sword").innerHTML = "Cost: " + Math.floor((4 * (Math.pow(1.5, ADPurchase))) / Math.max(1, 0.5 * Math.pow((D13+1),4)))
            document.getElementById("swordtext").innerHTML = "Sword: Level "+ ADPurchase;
        }
    }
    if(thing == "bigsword"){
        if(gold >= Math.floor(50 * Math.floor(Math.pow(10, AD2Purchase)) / Math.max(1, 0.5 * Math.pow((D13+1),4)))){
            gold -= Math.floor(50 * Math.floor(Math.pow(10, AD2Purchase)) / Math.max(1, 0.5 * Math.pow((D13+1),4)));
            AD2Purchase += 1;
            document.getElementById("bigsword").innerHTML = "Cost: " + Math.floor((50 * Math.floor(Math.pow(10, AD2Purchase))) / Math.max(1, 0.5 * Math.pow((D13+1),4)))

        }
    }
}
function ADCalc(){
    AD = 1 + ADPurchase;
    AD *= Math.pow((1 + (0.2 * WUS)), Math.floor(ADPurchase / 25))
    AD = AD * Math.pow(2 + (0.2 * WUBS), AD2Purchase)
    document.getElementById("ad").innerHTML = AD + " AD"
}
playerHpBar = document.getElementById("playerhpbar");
hpBar = document.getElementById("enemyhpbar")
expBar = document.getElementById("expbar")
attackBar = document.getElementById("attackbar")
function barUpdate(){
    hpBar.style.width = (400 * (enemyHp / enemyMaxHp )) + "px"
    hpBar.innerHTML = enemyHp + "/" + enemyMaxHp;
    playerHpBar.style.width = (400 * (playerCurrentHp / playerHp)) + "px";
    playerHpBar.innerHTML = Math.floor(playerCurrentHp) + "/" + Math.floor(playerHp);
    expBar.style.width = (200 * (exp / expToNext)) + "px"
    expBar.innerHTML = Math.floor((exp / expToNext) * 100) + "%"
    attackBar.style.width = (400 * (attackCharge / attackSeconds)) + "px"
    attackBar.innerHTML = Math.floor(attackCharge * 100 / attackSeconds) + "%"
    if(advancing == true){
        document.getElementById("adv").style.display = "none";
    }else{document.getElementById("adv").style.display = "inline-block";}

    if(D11 == 1 && D11loaded == false){addUpgrade("bigsword")}
    }

D11loaded = false;
function addUpgrade(upg){
    if(upg == "bigsword"){
        bigsword = document.getElementsByClassName("bs")
        for(var i = 0; i < bigsword.length; i++){
            bigsword[i].style.display = "inline-block"
        }
        D11loaded = true;
        console.log("tick")
    }
    


}
adPanel = document.getElementById("adpanel")
function loadTree(tree){
    if(tree == "ad"){
        adPanel.style.display = "block"
    }
    if(tree == "aps"){
        adPanel.style.display = "none"
    }
    if(tree == "ap"){
        adPanel.style.display = "none"
    }
    if(tree == "hp"){
        adPanel.style.display = "none"
    }
}

perktitle = document.getElementById("perktitle");
perkdesc = document.getElementById("perkdesc");
perkeffect = document.getElementById("perkeffect");
var perkhover;
function loadPerk(perk){
    if(perk == "D1"){
        perktitle.innerHTML = "Really Big Sword (" + D11 + "/1)" 
        perkdesc.innerHTML = "Unlock a new upgrade to exponentially increase AD."
        perkeffect.innerHTML = "-"
        perkhover = "D1"
    }
    if(perk == "D2"){
        perktitle.innerHTML = "Ferocity (" + D12 + "/1)"
        perkdesc.innerHTML = "Your power scares the enemy, reducing damage taken based on your AD."
        perkeffect.innerHTML = "Currently: /" +  Math.max((Math.pow(AD, 0.3333333) / 2),1)
        perkhover = "D2"
    }
    if(perk == "D3"){
        perktitle.innerHTML = "Expertise (" + D13 + "/10)"
        perkdesc.innerHTML = "Gain knowledge of cheaper weapons to use, reducing costs of both swords."
        perkeffect.innerHTML = "Currently: /" + Math.max(1, 0.5 * Math.pow((D13+1),4)) + ", \n Next: /" + Math.max(1, 0.5 * Math.pow((D13+2),4))
        perkhover = "D3"
    }
}
function buyPerk(){
    if(perkhover == "D1"){
        if(tomes >= 1){
            tomeBank++;
            tomes--;
            D11 = 1;
            document.getElementById("tomes").innerHTML = tomes + " tomes";
        }
    }
    if(perkhover == "D2"){
        if(tomes >= 1){
            tomeBank++;
            tomes--;
            D12 = 1;
            document.getElementById("tomes").innerHTML = tomes + " tomes";
        }
    }
    if(perkhover == "D3"){
        if(tomes >= 1){
            tomeBank++;
            tomes--;
            D13 += 1;
            document.getElementById("tomes").innerHTML = tomes + " tomes";
            document.getElementById("sword").innerHTML = "Cost: " + Math.floor((4 * (Math.pow(1.5, ADPurchase))) / Math.max(1, 0.5 * Math.pow((D13+1),4)))
            document.getElementById("bigsword").innerHTML = "Cost: " + Math.floor((50 * Math.floor(Math.pow(10, AD2Purchase))) / Math.max(1, 0.5 * Math.pow((D13+1),4)))
        }
    }
    loadPerk(perkhover)
}

document.getElementById("adbutton").addEventListener("click", function(a){
    loadTree("ad")
})
document.getElementById("apsbutton").addEventListener("click", function(b){
    loadTree("aps")
})
document.getElementById("apbutton").addEventListener("click", function(c){
    loadTree("ap")
})
document.getElementById("hpbutton").addEventListener("click", function(e){
    loadTree("hp")
})
document.getElementById("D1").addEventListener("mouseover", function(z){
    loadPerk("D1");
})
document.getElementById("D2").addEventListener("mouseover", function(z){
    loadPerk("D2");
})
document.getElementById("D3").addEventListener("mouseover", function(z){
    loadPerk("D3");
})


var perkbuttons = document.querySelectorAll(".perkbuttons");

for(var i = 0; i < perkbuttons.length; i++){
  perkbuttons[i].addEventListener("click", function() {
    buyPerk();
  });
}

WUStxt = document.getElementById("swordwutxt")
WUBStxt = document.getElementById("bigswordwutxt")
WUStxt.addEventListener("click", function(i){
    wuscost = Math.pow(2, WUS)
    if(stones >= wuscost){
        WUS++
        stones-=wuscost
    }
    WUText();
})
WUBStxt.addEventListener("click", function(i){
    wubscost = Math.pow(2, WUBS)
    if(stones >= wubscost){
        WUBS++
        stones-=wubscost
    }
    WUText();
})

function WUText(){
    WUStxt.innerHTML = Math.pow(2, WUS) + " stones (" + (1+(0.2 * WUS)) + " > " + (1+(0.2 * (WUS+1))) + ")"
    WUBStxt.innerHTML = Math.pow(2, WUBS) + " stones (" + (2+(0.2 * WUBS)) + " > " + (2+(0.2 * (WUBS+1))) + ")"
}