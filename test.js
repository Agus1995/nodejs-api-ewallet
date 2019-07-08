s = 'abcdeefffgh'
var list = {};
for (let i = 0; i < s.length; i++) {
    if (s[i] in list) {
        list[s[i]] += 1;
    } else {
        list[s[i]] = 1;
    }
}
console.log(list)

var frequency = [];
var lastIneq;
var keys = Object.keys(list);
// console.log(list)
for (var i = 0; i < keys.length; i++) {
    frequency.push(list[keys[i]]);
}

console.log(frequency)

var difference = (Math.max(...frequency) - Math.min(...frequency))
var count=0;
for (let i = 1; i < frequency.length; i++) {
    if (frequency[0] !== frequency[i]) {
        count ++;
        lastIneq = i;
    }
}

console.log(count)

console.log(
    difference
)

if(count <= 1){
    if(frequency[lastIneq] == 1 || difference <= 1){
        console.log("YES");
    }
    else{
        console.log("NO");
    }
}
else{
    console.log("NO");
}

