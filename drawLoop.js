function drawLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    // CREATING ALL ELELEMNTS
    theBall.createBall()
    theBall.moveTheBall()


    createGameCoins()
    renderingGameElements()
    final.createPlatform()




    renderEnemies()

    // END OF CREATING ELEMENTS

    // CREATES MOVING BLACK PLATFORM
    movingPlat.createPlatform()
    movingPlat.movePlatForm()
    // END OF BLACK PLATFORM

    // DETECTS COLISSION
    detectIntersection(platform1)
    detectIntersection(platform2)
    detectIntersection(platform3)
    detectIntersection(platform4)
    detectIntersection(platform5)
    detectIntersection(platform6)
    detectIntersection(platform7)
    detectIntersection(final)
    movingColission(movingPlat)




    // END OF COLISSION DETECTION
    requestAnimationFrame(drawLoop)
}



drawLoop()