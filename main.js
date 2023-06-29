function cached(func) {
    const cache = {};
    const callHistory = [];

    return function(...args) {
       const argString = args.join('-');

       if (cache[argString]) {
        return cache[argString];
       } else {
        const result = func(...args);
        cache[argString] = result;
       }
        
       callHistory.push(argString);
       if (callHistory.length > 10) {
        const oldestCall = callHistory.shift();
        delete cache[oldestCall];
        return result;
       }
    }
}

function callback(phone) {
    return 'tel: ' + phone;
}

const cacheCallback = cached(callback);

console.log(cacheCallback('344-111-111'));
console.log(cacheCallback('333-222-222'));
console.log(cacheCallback('111-111-111'));
console.log(cacheCallback('111-111-111'));
console.log(cacheCallback('222-222-222'));
console.log(cacheCallback('344-111-119'));
console.log(cacheCallback('333-222-226'));
console.log(cacheCallback('111-111-117'));
console.log(cacheCallback('111-111-116'));
console.log(cacheCallback('222-222-225'));
console.log(cacheCallback('344-111-115'));
console.log(cacheCallback('222-222-222'));