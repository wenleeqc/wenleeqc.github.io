/*
Angry Cat
A Whac-A-Mole clone

How to play:
- Hit as enemy objects before time runs out
- Score is displayed in the green picture frame
- Timer is displayed in the blue picture frame
*/

window.addEventListener('load', () => {
    const canvas = document.querySelector('#canvas');
    const context = canvas.getContext('2d');
    canvas.width = 1920;
    canvas.height = 1080;

    // image assets
    const catPaw = document.querySelector('.paw');
    const bird = document.querySelector('.bird');
    const birdInactive = document.querySelector('.bird-inactive');
    const fly = document.querySelector('.fly');
    const flyInactive = document.querySelector('.fly-inactive');
    const hand = document.querySelector('.hand');
    const handInactive = document.querySelector('.hand-inactive');
    const mouseRight = document.querySelector('.mouse-right');
    const mouseRightInactive = document.querySelector('.mouse-right-inactive');
    const mouseLeft = document.querySelector('.mouse-left');
    const mouseLeftInactive = document.querySelector('.mouse-left-inactive');
    const mousePop = document.querySelector('.mouse-pop-1');
    const mousePopInactive = document.querySelector('.mouse-pop-1-inactive');
    const mousePop2 = document.querySelector('.mouse-pop-2');
    const mousePop2Inactive = document.querySelector('.mouse-pop-2-inactive');
    const squirrel = document.querySelector('.squirrel');
    const squirrelInactive = document.querySelector('.squirrel-inactive');
    const yarn = document.querySelector('.yarn');
    const yarnInactive = document.querySelector('.yarn-inactive');
    const spider = document.querySelector('.spider');
    const spiderInactive = document.querySelector('.spider-inactive');
    const hole = document.querySelector('.hole');
    const holeBottomChair = document.querySelector('.hole-bottom-chair');
    const holeBottomTable = document.querySelector('.hole-bottom-table');
    const wallRightFront = document.querySelector('.wall-right-front');
    const wallRightBack = document.querySelector('.wall-right-back');
    const wallRightHole = document.querySelector('.wall-right-hole');
    const catFood = document.querySelector('.cat-food');
    const planter = document.querySelector('.planter');
    const sofa = document.querySelector('.sofa');
    const background = document.querySelector('.background');
    const table = document.querySelector('.table');
    const chair = document.querySelector('.chair');
    const chairLeg = document.querySelector('.chair-leg');
    const light = document.querySelector('.light');
    const plant = document.querySelector('.plant');
    const frame1 = document.querySelector('.frame1');
    const frame2 = document.querySelector('.frame2');
    const frame3 = document.querySelector('.frame3');
    const angryCat = document.querySelector('.angry-cat');

    class Player {
        constructor(game) {
            this.game = game;
            this.width = 155;
            this.height = 150;
            this.x = 0;
            this.y = 0;
        }

        draw(context) {
            // hitbox
            //context.fillRect(this.x, this.y, this.width, this.height);
            context.drawImage(catPaw, this.x, this.y, 157, 1100);
        }
    }

    class Enemy {
        constructor(game, xStart, yStart, xEnd, yEnd, width, height, interval, waitTime, stepX, stepY) {
            this.game = game;
            this.width = width;
            this.height = height;
            this.xStart = xStart;
            this.yStart = yStart;
            this.xEnd = xEnd;
            this.yEnd = yEnd;
            this.xCurrent = xStart;
            this.yCurrent = yStart;
            this.xRate = stepX;
            this.yRate = stepY;
            this.stepX = stepX;
            this.stepY = stepY;
            this.timer = 0;
            this.interval = interval;
            this.waitTimer = 0;
            this.waitTime = waitTime;
            this.isActive = false;
        }

        draw(context, img, imgInactive, imgWidth, imgHeight, xOffset=0, yOffset=0) {
            // hitbox
            //context.fillRect(this.xCurrent, this.yCurrent, this.width, this.height);
            if(this.isActive) {
                context.drawImage(img, this.xCurrent - xOffset, this.yCurrent - yOffset, imgWidth, imgHeight);
            } else {
                context.drawImage(imgInactive, this.xCurrent - xOffset, this.yCurrent - yOffset, imgWidth, imgHeight);
            }
        }

        update() {
            // interval timer
            // wait time before object is active
            if(!this.isActive && this.start()) {
                if(this.timer < this.interval) {
                    this.timer += 10;
                } else {
                    this.timer = 0;
                    this.stepX = this.xRate;
                    this.stepY = this.yRate;
                    this.isActive = true;
                }
            }

            // hold timer
            // wait time before moving back to start position
            if(this.wait()) {
                if(this.waitTimer <= this.waitTime) {
                    this.waitTimer += 5;
                } else {
                    this.waitTimer = 0;
                    this.stepX = this.xRate * 3;
                    this.stepY = this.yRate * 3;
                    this.isActive = false;
                }
            }

            if(this.isActive) {
                this.moveLong(this.xEnd);
                this.moveLat(this.yEnd);
            } else {
                this.moveLong(this.xStart);
                this.moveLat(this.yStart);
            }
        }

        // check if enemy is at start position
        start() {
            let xHold = false;
            let yHold = false;

            if(this.xStart < this.xEnd) {
                if(this.xCurrent <= this.xEnd) {
                    xHold = true;
                }
            } else {
                if(this.xCurrent >= this.xEnd) {
                    xHold = true;
                }
            }

            if(this.yStart < this.yEnd) {
                if(this.yCurrent <= this.yEnd) {
                    yHold = true;
                }
            } else {
                if(this.yCurrent >= this.yEnd) {
                    yHold = true;
                }
            }

            if(xHold && yHold) {
                return true;
            } else {
                return false;
            }
        }

        // check if enemy is at end position
        wait() {
            let xHold = false;
            let yHold = false;

            if(this.xStart < this.xEnd) {
                if(this.xCurrent >= this.xEnd) {
                    xHold = true;
                }
            } else {
                if(this.xCurrent <= this.xEnd) {
                    xHold = true;
                }
            }

            if(this.yStart < this.yEnd) {
                if(this.yCurrent >= this.yEnd) {
                    yHold = true;
                }
            } else {
                if(this.yCurrent <= this.yEnd) {
                    yHold = true;
                }
            }

            if(xHold && yHold) {
                return true;
            } else {
                return false;
            }
        }

        // move left and right
        moveLong(destination) {
            if(this.xCurrent < destination) {
                this.xCurrent += this.stepX;
            }

            if(this.xCurrent > destination) {
                this.xCurrent -= this.stepX;
            }
        }

        // move up and down
        moveLat(destination) {
            if(this.yCurrent < destination) {
                this.yCurrent += this.stepY;
            }

            if(this.yCurrent > destination) {
                this.yCurrent -= this.stepY;
            }
        }
    }

    class UI {
        constructor(game) {
            this.game = game;
            this.fontSize = 50;
            this.fontFamily = 'Monoton, san-serif';
            this.fontFamilyTitle = 'Creepster, san-serif';
            this.fontFamilyButton = 'Bangers, san-serif';
            this.colorScore = 'mediumaquamarine';
            this.colorTimer = 'mediumturquoise';
            this.color = 'red';
            this.colorShadow = 'firebrick';
            this.width = canvas.width;
            this.height = canvas.height;
            this.x = 0;
            this.y = 0;
            this.xCurrent = 0;
            this.yCurrent = 0;
        }

        draw(context) {
            // score
            context.save();
            context.fillStyle = this.colorScore;

            context.transform(1, -0.55, 0.1, 1, 78, 178);
            context.textAlign = 'center';
            context.font = this.fontSize + 'px ' + this.fontFamily;
            context.fillText(this.game.score, 0, 0);
            context.restore();

            // timer
            context.save();
            const time = Math.ceil((this.game.gameTime * 0.001));

            if(time > 5) {
                context.fillStyle = this.colorTimer;
            } else {
                context.fillStyle = 'red';
            }
            context.transform(1, -0.55, 0.1, 1, 270, 195);
            context.textAlign = 'center';
            context.font = this.fontSize + 'px ' + this.fontFamily;
            context.fillText(time, 0, 0);
            context.restore();
        }

        drawStartScreen(context) {
            context.save();
            context.fillStyle = 'pink';
            context.fillRect(0, 0, canvas.width, canvas.height);

            context.shadowOffsetX = 5;
            context.shadowOffsetY = 5;
            context.shadowColor = this.colorShadow;
            context.fillStyle = this.color;
            context.textAlign = 'center';
            
            context.font = 400 + 'px ' + this.fontFamilyTitle;
            context.fillText('ANGRY CAT', this.game.width * 0.5, this.game.height * 0.3);

            context.font = 80 + 'px ' + this.fontFamilyButton;
            context.fillText('Click To Play!', this.game.width * 0.84, this.game.height * 0.8);
            context.restore();

            context.drawImage(angryCat, 45, 240); 
        }

        drawGameOver(context) {
            if(this.game.gameOver) {
                context.save();
                context.fillStyle = '#ff00ff33';
                context.fillRect(0, 0, canvas.width, canvas.height);
                context.restore();
                
                context.save();
                context.fillStyle = this.color;
                context.shadowOffsetX = 5;
                context.shadowOffsetY = 5;
                context.shadowColor = this.colorShadow;
                context.textAlign = 'center';
                context.font = 300 + 'px ' + this.fontFamilyTitle;
                context.fillText('Game Over!', this.game.width * 0.42, this.game.height * 0.55);
                context.restore();

                context.save();
                context.font = 240 + 'px ' + this.fontFamily;
                context.fillStyle = this.color;
                context.fillText('😾', this.game.width * 0.77, this.game.height * 0.53);
                context.restore();
            }
        }
    }

    class Game {
        constructor(width, height) {
            this.width = width; 
            this.height = height;
            this.x = 0;
            this.y = 0;
            this.ui = new UI(this);
            this.paw = new Player(this);
            // enemy parameters: (game, xStart, yStart, xEnd, yEnd, width, height, interval, waitTime, stepX, stepY)
            this.bird = new Enemy(this, 500, 120, 640, 120, 100, 230, 600, 900, 10, 10);
            this.fly = new Enemy(this, 435, 970, 470, 970, 30, 30, 300, 1500, 1, 1); 
            this.hand = new Enemy(this, 1980, -310, 1150, 500, 250, 250, 1000, 1000, 15, 15);
            this.mouse1 = new Enemy(this, 30, 500, 200, 500, 100, 100, 800, 800, 5, 5);
            this.mouse2 = new Enemy(this, 800, 830, 800, 670, 100, 100, 700, 500, 6, 6);
            this.mouse3 = new Enemy(this, 1550, 990, 1550, 840, 110, 100, 500, 300, 7, 7);
            this.mouse4 = new Enemy(this, 1800, 500, 1500, 500, 100, 90, 1400, 900, 5, 5);
            this.spider = new Enemy(this, 1080, 100, 1080, 190, 50, 50, 900, 600, 3, 3);
            this.squirrel = new Enemy(this, 1600, 170, 1300, 170, 180, 250, 900, 1100, 10, 10);
            this.yarn = new Enemy(this, 447, 475, 540, 475, 60, 60, 700, 500, 3, 3);
            this.enemies = [this.mouse1, this.mouse2, this.mouse3, this.mouse4, this.fly, this.bird, this.hand, this.spider, this.squirrel, this.yarn];
            this.score = 0;
            this.gameOver = false;
            this.gameTime = 15000;
            this.start = false;

            canvas.addEventListener('mousemove', (event) => {
                // track and set position of player
                const xPosOffset = canvas.width / canvas.offsetWidth;
                const yPosOffset = canvas.height / canvas.offsetHeight;
                this.paw.x = event.offsetX * xPosOffset;
                this.paw.y = event.offsetY * yPosOffset;
            });

            window.addEventListener('click', (event) => {
                // check for collision for each enemy
                this.enemies.forEach( (enemy) => {
                    if(enemy.isActive) {
                        if(this.checkHit(this.paw, enemy)) {
                            enemy.stepX = enemy.xRate * 3;
                            enemy.stepY = enemy.yRate * 3;
                            enemy.isActive = false;
                            enemy.waitTimer = 0;
                            if(!this.gameOver) {
                                this.score++;
                            }
                        }
                    }
                });

                // listen for click on start screen
                if(!this.start) {
                    if(this.checkHit(this.paw, this.ui)) {
                        this.start = true;
                    }
                }
            });
        }

        // collision detection
        // takes two objects with x/y coordinates and defined width/height dimensions 
        checkHit(rect1, rect2) {
            return (
                rect1.x < rect2.xCurrent + rect2.width &&
                rect1.x  + rect1.width > rect2.xCurrent &&
                rect1.y  < rect2.yCurrent + rect2.height &&
                rect1.height + rect1.y > rect2.yCurrent
            )
        }

        update(deltaTime) {
            if(!this.gameOver) {
                this.gameTime -= deltaTime;
            }

            if(this.gameTime <= 0) {
                this.gameOver = true;
            }
    
            this.mouse1.update();
            this.mouse2.update();
            this.mouse3.update();
            this.mouse4.update();
            this.fly.update();
            this.bird.update();
            this.hand.update();
            this.spider.update();
            this.squirrel.update();
            this.yarn.update();       
        }

        draw(context) {
            // left wall
            context.drawImage(wallRightHole, 133, 460);
            context.drawImage(wallRightBack, 193, -1038);
            this.mouse1.draw(context, mouseLeft, mouseLeftInactive, 298, 150, 200);
            context.drawImage(wallRightFront, -600, -750);

            context.drawImage(background, 600, -165, 1010, 517);
            
            this.bird.draw(context, bird, birdInactive, 202, 270, 100);
            this.squirrel.draw(context, squirrel, squirrelInactive, 500, 380, 0, 130);

            // back wall
            context.save();
            context.fillStyle = 'yellow';
            context.fillRect(350, 350, 2000, 142);
            context.fillRect(350, 0, 250, 490);
            context.fillRect(1600, 0, 350, 490);
            context.restore();

            // window border
            context.save();
            context.fillStyle = "#DBD500";
            context.fillRect(590, 0, 10, 350);
            context.fillRect(1600, 0, 10, 350);
            context.fillRect(580, 350, 1040, 15);
            context.restore();

            context.drawImage(frame3, 45, 240);
            context.drawImage(frame2, 10, 10);
            context.drawImage(frame1, 200, 30);

            this.spider.draw(context, spider, spiderInactive, 60, 90, 5, 30);
            context.drawImage(light, 1000, -150, 200, 323);

            this.yarn.draw(context, yarn, yarnInactive, 94, 70, 30, 0); // 142, 80     101, 75, 0, 130

            // plant shadow
             context.save()
             context.fillStyle = '#0000ce';
             context.beginPath();
             context.ellipse(460, 565, 80, 30, 0, 60, 100);
             context.fill();
             context.closePath();
             context.restore()

            context.drawImage(plant, 380, 30, 195, 550); // 177, 500

            this.mouse4.draw(context, mouseRight, mouseRightInactive, 251, 90);

            // sofa shadow
            context.save();
            context.fillStyle = "#0000ce";
            context.beginPath();
            context.moveTo(1600,630);
            context.lineTo(1800,530);
            context.lineTo(2400,1000);
            context.lineTo(2360,1100);
            context.fill();
            context.closePath();
            context.restore();

            context.drawImage(sofa, 1550, 200);

            // chair shadow
            context.save();
            context.fillStyle = "#0000ce";
            context.beginPath();
            context.moveTo(830,750);
            context.lineTo(1005,750);
            context.lineTo(920,830);
            context.lineTo(695,820);
            context.fill();
            context.closePath();
            context.restore();

            context.drawImage(chairLeg, 829, 550);
            context.drawImage(hole, 700, 750);
            this.mouse2.draw(context, mousePop, mousePopInactive, 159, 240, 25);
            context.drawImage(holeBottomChair, 705, 790);
            context.drawImage(chair, 600, 335,);

            // cat treats shadow
            context.save()
            context.fillStyle = '#0000ce';
            context.beginPath();
            context.ellipse(1231, 780, 110, 35, 0, 60, 100);
            context.fill();
            context.closePath();
            context.restore();

            context.drawImage(catFood, 1130, 560, 200, 241);
            this.hand.draw(context, hand, handInactive, 1200, 1400, 100, 1070);
            
            // table shadow
             context.save()
             context.fillStyle = '#0000ce';
             context.beginPath();
             context.ellipse(1600, 940, 180, 50, 0, 60, 100);
             context.fill();
             context.closePath();
             context.restore()

            context.drawImage(table, 1400, 625, 400, 345);
            context.drawImage(hole, 1450, 900);
            this.mouse3.draw(context, mousePop2, mousePop2Inactive, 123, 200, 8);
            context.drawImage(holeBottomTable, 1455, 940);

            // planter shadow
            context.save()
            context.fillStyle = '#0000ce';
            context.beginPath();
            context.ellipse(259, 1005, 230, 60, 0, 60, 100);
            context.fill();
            context.closePath();
            context.restore();
            
            this.fly.draw(context, fly, flyInactive, 60, 41, 30);
            context.drawImage(planter, 50, 650, 424, 396);
            
            this.ui.draw(context);
            this.paw.draw(context);
        }
    }

    const game = new Game(canvas.width, canvas.height);
    let prevTime = 0;

    // game loop
    function gameLoop(timeStamp) {
        const deltaTime = timeStamp - prevTime;
        prevTime = timeStamp;

        // if game start, run game loop
        // else show start screen
        if(game.start) {
            context.clearRect(0, 0, canvas.width, canvas.height);
            game.update(deltaTime);
            game.draw(context);

            if(!game.gameOver) {
                window.requestAnimationFrame(gameLoop);
            }

            // show end game screen
            if(game.gameOver) {
                game.ui.drawGameOver(context);
            }
        } else {
            game.ui.drawStartScreen(context);
            window.requestAnimationFrame(gameLoop);
        }
    }

        gameLoop(0);
});