// Initialize module
Hooks.on("ready", () => {
    console.log("My Awesome Module is loaded!");
});

// EXAMPLES

// Adding button to sidebar example
Hooks.on("renderSidebarTab", (app, html) => {
    if (app.options.id === "chat") {
        let button = $(`<button class="my-button">Click Me</button>`);
        button.on("click", () => console.log("Button Clicked!"));
        html.append(button);
    }
});

// Modify actor data example
Hooks.on("createActor", (actor) => {
    console.log(`A new actor has been created: ${actor.name}`);
});

// Modify item data example
Hooks.on("createItem", (item) => {
    console.log(`A new item has been created: ${item.name}`);
});

// Add a new Chat Command example
Hooks.on("chatMessage", (chatLog, messageText) => {
    if (messageText.startsWith("/hello")) {
        ChatMessage.create({ content: "Hello, Foundry!" });
        return false;  // Prevents Foundry from processing further
    }
});

