class Laser {
    constructor(theRoot, laserSpot) {
        this.root = theRoot;
        this.spot = laserSpot;
        // this.x = gameEngine.player.x;
        // this.y = gameEngine.player.y;
        this.x = gameEngine.player.x;
        this.y = GAME_HEIGHT - PLAYER_HEIGHT - 100;
        this.destroyed = false;
        this.destroyed = false;
        this.domElement = document.createElement('img');
        this.domElement.src = './images/lasers.png';
        this.domElement.style.position = 'absolute';
        this.domElement.style.left = `${gameEngine.player.x}px`;
        this.domElement.style.top = `${this.y}px`;
        this.domElement.style.zIndex = 5;
        this.domElement.style.width = '75px'
        // this.root.appendChild(this.domElement);
        theRoot.appendChild(this.domElement);
        this.speed = 2;
    
        this.interval = setInterval(() => {
            this.y = this.y - 10;
            this.domElement.style.top = `${this.y}px`;
        }, 10);
        if (this.y > GAME_HEIGHT) {
            this.domElement.remove();
            // this.root.removeChild(this.domElement);
            this.destroyed = true;
        }
    }
    // laserUpdate(timeDiff) {
    //     this.y = this.y + timeDiff * this.speed;
    //     this.domElement.style.top = `${this.y}px`;
    //     if (this.y > GAME_HEIGHT) {
    //         this.root.removeChild(this.domElement);
    
    //     this.destroyed = true;
    //     }
    

}

    // fireLaser() {
    //     console.log("up arrow");
    //     let newLaser = new Laser(appContainer);
    //     gameEngine.lasers.push();
    // }
    
    // function fireLaser() {
    //     let laserInterval = setInterval(() => {
    //         let yPosition = parseInt(this.domElement.style.bottom)
    //         if (yPosition === 800) {
    //             laserInterval.destroyed()
    //         } else {
    //             this.domElement.style.bottom = `${yPosition + 4}px`
    //         }
    //     }, 10)
    // }






// function fireLaser() {
//     let laser = createLaserElement();
    
// }