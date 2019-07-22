function drawLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    if (!game1.won) {
        // CREATING ALL ELELEMNTS
        theBall.createBall()
        theBall.moveTheBall()


        createGameCoins()
        renderingGameElements()
        renderEnemies()
        spongeBob.drawMisc()
        decideIfMessage()






        // DETECTS COLISSION
        detectIntersection(platform1)
        detectIntersection(platform2)
        detectIntersection(platform3)
        detectIntersection(platform4)
        detectIntersection(platform5)
        detectIntersection(platform6)
        detectIntersection(platform7)
        detectIntersection(rightPlatform1)
        detectIntersection(rightPlatform2)
        detectIntersection(rightPlatform3)
        detectIntersection(rightPlatform4)
        detectIntersection(rightPlatform5)

        detectIntersection(final)
        movingColission(movingPlat)
        movingColission(elevatorPlatform)





        // END OF COLISSION DETECTION

    } if (game1.won) {
        displayWinningImage()
    }


    if (game1.lost) {
        lostImage()
    }
    requestAnimationFrame(drawLoop)

}



drawLoop()