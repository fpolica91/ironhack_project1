// // / COLISSION DETECTION FOR MOVING PLATFORM
// function detectIntersection(platform) {
//     if (platform.x < theBall.x + theBall.r &&
//         platform.x + platform.width > theBall.x &&
//         platform.y < theBall.y + theBall.r &&
//         platform.y + platform.height > theBall.y) {
//         theBall.y = platform.y - theBall.r
//         theBall.gravitySpeed = 0
//     } else {
//         theBall.gravitySpeed += theBall.gravity
//     }
// }

// function movingColission(platform) {
//     if (platform.x < theBall.x + theBall.r &&
//         platform.x + platform.width > theBall.x &&
//         platform.y < theBall.y + theBall.r &&
//         platform.y + platform.height > theBall.y) {
//         theBall.y = platform.y - theBall.r
//         // theBall.x = (platform.x + platform.width / 2)
//         theBall.gravitySpeed = 0

//     } else {
//         theBall.gravitySpeed += theBall.gravity
//     }
// }


// // COLISSION DETECTION FOR MOVING COIN
// function collectCoin(coin) {
//     if (coin.x < theBall.x + theBall.r &&
//         coin.x + coin.width > theBall.x &&
//         coin.y < theBall.y + theBall.r &&
//         coin.y + coin.height > theBall.y) {
//         return true;
//     }
// }



// // COLISSION DETECTION FOR BULLET
// function bulletColission(bullet) {
//     if (bullet.x < theBall.x + theBall.r &&
//         bullet.x + bullet.width > theBall.x &&
//         bullet.y < theBall.y + theBall.r &&
//         bullet.y + bullet.height > theBall.y) {
//         gameOver()


//     }
// }




// / COLISSION DETECTION FOR MOVING PLATFORM
function detectIntersection(platform) {
    if (platform.x < theBall.x + theBall.width &&
        platform.x + platform.width > theBall.x &&
        platform.y < theBall.y + theBall.height &&
        platform.y + platform.height > theBall.y) {
        theBall.y = platform.y - theBall.height
        theBall.gravitySpeed = 0
    } else {
        theBall.gravitySpeed += theBall.gravity
    }
}

function movingColission(platform) {
    if (platform.x < theBall.x + theBall.width &&
        platform.x + platform.width > theBall.x &&
        platform.y < theBall.y + theBall.height &&
        platform.y + platform.height > theBall.y) {
        theBall.y = platform.y - theBall.height
        // theBall.x = (platform.x + platform.width / 2)
        theBall.gravitySpeed = 0

    } else {
        theBall.gravitySpeed += theBall.gravity
    }
}


// COLISSION DETECTION FOR MOVING COIN
function collectCoin(coin) {
    if (coin.x < theBall.x + theBall.width &&
        coin.x + coin.width > theBall.x &&
        coin.y < theBall.y + theBall.height &&
        coin.y + coin.height > theBall.y) {
        return true;
    }
}



// COLISSION DETECTION FOR BULLET
function bulletColission(bullet) {
    if (bullet.x < theBall.x + theBall.width &&
        bullet.x + bullet.width > theBall.x &&
        bullet.y < theBall.y + theBall.height &&
        bullet.y + bullet.height > theBall.y) {
        gameOver()
    }
}