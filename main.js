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
}
window.requestAnimationFrame(Update)

var attackCharge = 0;
var attackSeconds = 4;
function Charge(time){
    attackCharge += time;
    if(attackCharge >= attackSeconds){
        Attack()
        attackCharge = 0;
        return
    }
}

var dox = document.getElementById("what")

var AD = 1;
function Attack(){
    enemyHp -= AD
    console.log(enemyHp + AD, enemyHp)
}

function barUpdate(){
    hpBar = document.getElementById("pp")
    hpText = ["):             "]
    for (let i = Math.ceil(((enemyHp * 100)/ (enemyMaxHp  * 100)) * 100); i  > 0; i--){
        hpText.push("/")
    }
    hpBar.innerHTML = hpText.join("");
}
var enemyMaxHp = 5;
var enemyHp = 5;