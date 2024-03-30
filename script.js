const pokemon1 = {
    name: "Charizard",
    health: 100,
    attack: 15,
    defense: 8,
    hpDisplayMax: 100,
};

const pokemon2 = {
    name: "Pikachu",
    health: 80,
    attack: 16,
    defense: 8,
    hpDisplayMax: 80,
};

const pokemon3 = {
    name: "Ditto",
    health: 120,
    attack: 10,
    defense: 12,
    hpDisplayMax: 120,
};

let playerPokemon;
let opponentPokemon;

function showBattle() {
    const chooseSection = document.querySelector('.choose');
    const battleSection = document.querySelector('.battle');

    chooseSection.style.display = 'none';
    battleSection.style.display = 'block';
}

function endScreen() {
    const attackSection = document.querySelector('.attack');
    const endTextSection = document.querySelector('.run-text');
    const pokemonSprite1 = document.querySelector('.chariback');
    const pokemonSprite2 = document.querySelector('.pikaback');
    const pokemonSprite3 = document.querySelector('.dittoback');
    const damageOutputElement1 = document.querySelector('.damage-output-player');
    const damageOutputElement2 = document.querySelector('.damage-output-opponent');
    const resetOption = document.querySelector('.reset-div');
    resetOption.style.display = 'block';
    attackSection.style.display = 'none';
    endTextSection.style.display = 'block';
    pokemonSprite1.style.display = 'none';
    pokemonSprite2.style.display = 'none';
    pokemonSprite3.style.display = 'none';
    damageOutputElement1.style.display = 'none';
    damageOutputElement2.style.display = 'none';
}

function playerRun() {
    console.log("Player chooses to run!");
    console.log("Player has fled from battle!");
    endScreen();
    return;
}

function battle1Reveal() {
    const chooseBattle = document.querySelector('.battle1');
    chooseBattle.style.display = 'block';
}
function battle2Reveal() {
    const chooseBattle = document.querySelector('.battle2');
    chooseBattle.style.display = 'block';
}
function battle3Reveal() {
    const chooseBattle = document.querySelector('.battle3');
    chooseBattle.style.display = 'block';
}

function startBattle(pokemon) {
    playerPokemon = pokemon;
    if (pokemon === pokemon1) {
        opponentPokemon = pokemon2;
        battle1Reveal();
    } else if (pokemon === pokemon2) {
        opponentPokemon = pokemon1;
        battle2Reveal();
    } else {
        opponentPokemon = pokemon2;
        battle3Reveal();
    }
    alert(`Player chooses ${playerPokemon.name}!`);
    alert(`Opponent chooses ${opponentPokemon.name}!`);

    const pokemonChosenSection = document.querySelector('.buttons');
    const pokemonAttackSection = document.querySelector('.attack');
    pokemonChosenSection.style.display = 'none';
    pokemonAttackSection.style.display = 'block';

    //hide margin
    const hideMargin = document.querySelector('.screen-battle');
    hideMargin.style.marginTop = '0';

    const showHp = document.querySelector('.hp-Div');
    showHp.style.display = 'flex';

    updatePokemonHP();

}

function updatePokemonHP() {
    // opponent and player hp display
    document.getElementById('hp-opponent-text').textContent = `HP: ${opponentPokemon.health}/${opponentPokemon.hpDisplayMax}`;
    document.getElementById('hp-player-text').textContent = `HP: ${playerPokemon.health}/${playerPokemon.hpDisplayMax}`;
    // player-hp-bar, opponent-hp-bar
    const hpPercentOpponent = (opponentPokemon.health / opponentPokemon.hpDisplayMax) * 100;
    const hpPercentPlayer = (playerPokemon.health / playerPokemon.hpDisplayMax) * 100;

    const playerHPbar = document.querySelector('#player-hp-bar');
    const oppHPbar = document.querySelector('#opponent-hp-bar');

    oppHPbar.style.width = `${hpPercentOpponent}%`;
    playerHPbar.style.width = `${hpPercentPlayer}%`;

}

function playerAttack() {
    if (playerPokemon.health <= 0 || opponentPokemon.health <= 0) {
        console.log("Cannot attack. One of the Pokémon has fainted.");
        return;
    }
    const damage = calculateDamage(playerPokemon.attack, opponentPokemon.defense);
    opponentPokemon.health -= damage;

    opponentPokemon.health = Math.max(0, opponentPokemon.health);

    console.log("Player's " + playerPokemon.name + " attacks! " + opponentPokemon.name + " takes " + damage + " damage.");
    const damageOutputElement = document.querySelector('.damage-output-player');
    damageOutputElement.textContent = "Player's " + playerPokemon.name + " attacks! " + opponentPokemon.name + " takes " + damage + " damage.";
    checkFaint();
    updatePokemonHP();
    opponentAttack();
}

function opponentAttack() {
    if (playerPokemon.health <= 0 || opponentPokemon.health <= 0) {
        console.log("Cannot attack. One of the Pokémon has fainted.");
        return;
    }
    const damage = calculateDamage(opponentPokemon.attack, playerPokemon.defense);
    playerPokemon.health -= damage;

    playerPokemon.health = Math.max(0, playerPokemon.health);

    console.log("Opponent's " + opponentPokemon.name + " attacks! " + playerPokemon.name + " takes " + damage + " damage.");
    const damageOutputElement = document.querySelector('.damage-output-opponent');
    damageOutputElement.textContent = "Opponent's " + opponentPokemon.name + " attacks! " + playerPokemon.name + " takes " + damage + " damage.";
    updatePokemonHP();
    checkFaint();
}

function calculateDamage(attack, defense) {
    const maxDamage = Math.max(1, Math.floor(attack * 1.5) - defense);
    const minDamage = Math.max(1, Math.floor(attack * 0.5) - defense);
    const damage = Math.floor(Math.random() * (maxDamage - minDamage + 1)) + minDamage;
    return damage;
}

function playerFaint() {
    const attackSection = document.querySelector('.attack');
    const endTextSection = document.querySelector('.faint-text');
    const pokemonSprite1 = document.querySelector('.chariback');
    const pokemonSprite2 = document.querySelector('.pikaback');
    const pokemonSprite3 = document.querySelector('.dittoback');
    const damageOutputElement1 = document.querySelector('.damage-output-player');
    const damageOutputElement2 = document.querySelector('.damage-output-opponent');
    const resetOption = document.querySelector('.reset-div');
    resetOption.style.display = 'block';
    attackSection.style.display = 'none';
    endTextSection.style.display = 'block';
    pokemonSprite1.style.display = 'none';
    pokemonSprite2.style.display = 'none';
    pokemonSprite3.style.display = 'none';
    damageOutputElement1.style.display = 'none';
    damageOutputElement2.style.display = 'none';
}

function opponentFaint() {
    const attackSection = document.querySelector('.attack');
    const endTextSection = document.querySelector('.win-text');
    const pokemonSprite1 = document.querySelector('.charifront');
    const pokemonSprite2 = document.querySelector('.pikafront');
    const damageOutputElement1 = document.querySelector('.damage-output-player');
    const damageOutputElement2 = document.querySelector('.damage-output-opponent');
    const resetOption = document.querySelector('.reset-div');
    resetOption.style.display = 'block';
    attackSection.style.display = 'none';
    endTextSection.style.display = 'block';
    pokemonSprite1.style.cssText = 'visibility: hidden';
    pokemonSprite2.style.cssText = 'visibility: hidden';
    damageOutputElement1.style.display = 'none';
    damageOutputElement2.style.display = 'none';
}

function checkFaint() {
    if (playerPokemon.health <= 0) {
        console.log("Player's " + playerPokemon.name + " has fainted!");
        playerFaint();
        return;
    }
    if (opponentPokemon.health <= 0) {
        console.log("Opponent's " + opponentPokemon.name + " has fainted!");
        opponentFaint();
        return;
    }
}

document.getElementById("pokemon1").addEventListener("click", function() {
    startBattle(pokemon1);
});

document.getElementById("pokemon2").addEventListener("click", function() {
    startBattle(pokemon2);
});

document.getElementById("pokemon3").addEventListener("click", function() {
    startBattle(pokemon3);
});

document.getElementById("start").addEventListener("click", function(){
    showBattle();
});

document.getElementById("fight").addEventListener("click", function(){
    playerAttack();
});

document.getElementById("run").addEventListener("click", function(){
    playerRun();
});

// reset game
document.getElementById("reset").addEventListener("click", function() {
    resetGame();
});

function resetGame() {
    window.location.reload();
}