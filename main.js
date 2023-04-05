var gold = 0;
var AD = 1;
var attackSeconds = 3;

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

var D11 = false;
var D12 = false;

var tomes = 0;
advancing = true;


loadZone(0);
function loadZone(up){
    playerCurrentHp = playerHp;
    zone += up;
    if(zone > hZE){hze=zone}
    enemyMaxHp = Math.floor(5 * Math.pow(1.25, zone - 1));
    enemyHp = enemyMaxHp;
    valueCalc();
    document.getElementById("zone").innerHTML = "Zone " + zone + " ("+value + ")";
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
    if(D12 == true){
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
})
document.getElementById("treetab").addEventListener("click", function(b){
    document.getElementById("treepanel").style.display = "block"
    document.getElementById("upgpanel").style.display = "none"

})

function Attack(){
    enemyHp -= AD
    if(enemyHp <= 0){kill()}
}
function valueCalc(){
    value = Math.floor((2 * Math.pow(1.25, zone - 1)))
    value *= ((Math.floor(zone / 10))+1)
}
function kill(){
    valueCalc()
    gold  += value
    if(zone == hZE && Math.floor(zone/10) == zone/10){tomes += 1;}
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
ADPurchase = 0;
AD2Purchase = 0;
function buy(thing){
    if(thing == "sword"){
        if(gold >= Math.floor(4 * (Math.pow(1.5, ADPurchase)))){
            gold -= Math.floor(4 * (Math.pow(1.5, ADPurchase)))
            ADPurchase += 1;
            document.getElementById("sword").innerHTML = "Cost: " + Math.floor(4 * (Math.pow(1.5, ADPurchase)))
            document.getElementById("swordtext").innerHTML = "Sword: Level "+ ADPurchase;
        }
    }
    if(thing == "bigsword"){
        if(gold >= Math.floor(50 * Math.floor(Math.pow(10, AD2Purchase)))){
            gold -= Math.floor(50 * Math.floor(Math.pow(10, AD2Purchase)));
            AD2Purchase += 1;
            document.getElementById("bigsword").innerHTML = "Cost: " + Math.floor(50 * Math.floor(Math.pow(10, AD2Purchase)))

        }
    }
}
function ADCalc(){
    AD = 1 + ADPurchase;
    AD = AD * Math.pow(2, AD2Purchase)
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
    }
