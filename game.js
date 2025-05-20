/* ======================================================
   SIMON MEMORY CHALLENGE –  JavaScript
   ======================================================
   1.  DATA  -> Which colors are in the current sequence?
   2.  OUTPUT-> Flash pads + update round counter.
   3.  INPUT -> Pad clicks from the player.
   (Scroll ↓ for functions; every step is commented.)
*/

// ---------- 1. DATA (state variables) ----------

// pad IDs in one handy array
const startText = ["textNW", "textNE", "textSW", "textSE"]
const pads = ["NW", "NE", "SW", "SE"]; //CHANGE: Changed pad names to be directional rather than color

// the growing sequence the player must repeat
let sequence = [];

// where the player currently is in that sequence
let playerPos = 0;

// CHANGE: I found the game would start way too early and the player could easily miss the first flash so I added a delay. This is the variable that controls that delay
var startDelayMs = 2000;

// ---------- 2. OUTPUT  ----------

/**
 * flash(color)
 * -------------
 * Briefly adds the .lit class to the chosen pad,
 * then removes it after 400 ms.
 */
function flash(color) {
  const pad = document.getElementById(color);
  pad.classList.add("lit");
  setTimeout(() => pad.classList.remove("lit"), 400);
}

/**
 * addStep()
 * ----------
 * Push one random color onto the sequence array.
 */
function addStep() {
  const next = pads[Math.floor(Math.random() * 4)]; // 0‑3 → random color
  sequence.push(next);
}

/**
 * playSequence()
 * ---------------
 * Plays (flashes) the entire sequence so far.
 * Uses forEach + setTimeout to stagger flashes.
 */
function playSequence() {
  playerPos = 0;                                    // reset player progress
  document.getElementById("round").innerText = sequence.length;

  sequence.forEach((clr, i) => {
    // each flash delayed by i × 600 ms
    setTimeout(() => flash(clr), i * 600);
  });
}

// ---------- 3. INPUT  ----------

/**
 * handleClick(chosen)
 * -------------------
 * Runs every time the player clicks a pad.
 * 1) Checks if chosen color matches sequence[playerPos].
 * 2) If wrong → game over & reset.
 * 3) If correct & end of round → nextRound().
 */
function handleClick(chosen) {
  if (chosen === sequence[playerPos]) {
    flash(chosen);          // give feedback
    playerPos++;            // move to next expected position

    // If player finished the whole sequence, start next round
    if (playerPos === sequence.length) {
      setTimeout(nextRound, 800);
    }
  } else {
    alert("Game Over! Final round: " + sequence.length);
    resetGame();
  }
}

/**
 * nextRound()
 * -----------
 * Adds one new color then re‑plays the sequence.
 */
function nextRound() {
  addStep();
  playSequence();
}

/**
 * resetGame()
 * -----------
 * Clears sequence, starts fresh at round 1.
 */
function resetGame() {
  sequence = [];
  addStep();
  playSequence();
}

// Attach click listeners *once* when the script loads
pads.forEach(clr => {
  document.getElementById(clr).addEventListener("click", () => handleClick(clr));
});

// ---------- GAME START ----------
//CHANGE: Added start delay
setTimeout(function() {
addStep();      // create round 1
playSequence(); // show it
}, startDelayMs);