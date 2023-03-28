var gold = 0;
var AD = 1;
var attackSeconds = 3;

var zone = 1;
var enemyMaxHp = 5;
var enemyHp = 5;

loadZone(0);
function loadZone(up){
    zone += up;
    enemyMaxHp = Math.floor(5 * Math.pow(1.25, zone - 1));
    enemyHp = enemyMaxHp;
    document.getElementById("zone").innerHTML = "Zone " + zone;
}
hpBar = document.getElementById("playerhpbar")
function hpBar(){
    hpBar.style.width = 100;
}

var lastFrameAt = 0;
function Update(timestamp){;
    delta = timestamp - lastFrameAt;
    if(delta > 20){
    console.log(delta)}
    window.requestAnimationFrame(Update)
    lastFrameAt = timestamp;
    delta = delta / 1000
    Charge(delta);
    barUpdate();

    ADCalc();
    document.getElementById("gold").innerHTML = "Gold: " + gold;

}
window.requestAnimationFrame(Update)

var attackCharge = 0;
function Charge(time){
    attackCharge += time;
    if(attackCharge >= attackSeconds){
        Attack()
        attackCharge = 0;
        return
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
    console.log(enemyHp + AD, enemyHp)
    if(enemyHp <= 0){kill()}
}
function kill(){
    gold  += Math.floor((2 * Math.pow(1.2, zone - 1)) + (zone - 1))
    loadZone(1)
}
document.getElementById("sword").addEventListener("click", function(buyS){
    buySword()
})
ADPurchase = 0;
function buySword(){
    if(gold >= Math.floor(4 * (Math.pow(1.5, ADPurchase)))){
    gold -= Math.floor(4 * (Math.pow(1.5, ADPurchase)))
    ADPurchase += 1;
    document.getElementById("sword").innerHTML = "Cost: " + Math.floor(4 * (Math.pow(1.5, ADPurchase)))}
}
function ADCalc(){
    AD = 1 + ADPurchase;
}
function barUpdate(){
    hpBar = document.getElementById("pp")
    hpText = ["):             "]
    for (let i = Math.ceil(((enemyHp * 100)/ (enemyMaxHp  * 100)) * 100); i  > 0; i--){
        hpText.push("/")
    }
    hpBar.innerHTML = hpText.join("");
}
