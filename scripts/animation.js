// Simulating a sliding loot box roll
async function startAnimatedRoll(rollTable) {
    let results = rollTable.results.map(r => ({
        img: r.img,
        text: r.text
    }));

    let winningIndex = Math.floor(Math.random() * results.length);
    let winningResult = results[winningIndex];

    // Open the UI window
    new RollAnimationWindow(results, winningResult).render(true);
}

// Animation Logic
class RollAnimationWindow extends Application {
    constructor(results, winningResult) {
        super();
        this.results = results;
        this.winningResult = winningResult;
    }

    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            id: "roll-animation",
            title: "Rolling...",
            template: "modules/animated-roll-tables/templates/roll-animation.html",
            width: 600,
            height: 200
        });
    }

    async getData() {
        return { results: this.results };
    }

    activateListeners(html) {
        let strip = html.find(".roll-strip");

        // Populate images dynamically
        this.results.forEach((r) => {
            strip.append(`<img src="${r.img}" alt="${r.text}" />`);
        });

        // Simulate rolling motion
        let rollAmount = -((this.results.length - 3) * 100);
        setTimeout(() => {
            strip.css("transform", `translateX(${rollAmount}px)`);
        }, 100);

        // Stop animation after 5 seconds
        setTimeout(() => {
            ui.notifications.info(`You got: ${this.winningResult.text}`);
            AudioHelper.play({ src: "modules/animated-roll-tables/assets/sounds/win.mp3" });
        }, 5000);
    }
}
