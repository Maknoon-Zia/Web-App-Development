// Mix Named + Default Export

function sayHi(name) {
    return "Hi " + name;
}
function sayThanks(name) {
    return "Thanks " + name;
}
function sayBye(name) {
    return "Bye " + name;
}

export default sayHi;
export {sayThanks , sayBye};