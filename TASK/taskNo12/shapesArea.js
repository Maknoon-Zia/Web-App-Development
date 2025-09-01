// exporting and importing as all 
function areaCircle(radius) {
    return 3.14 * radius * radius;
}
function areaSquare(side) {
    return side * side;
}
function areaTriangle(base , height) {
    return 0.5 * base * height;
}

export {areaCircle , areaSquare , areaTriangle};