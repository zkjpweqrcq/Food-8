const names = ['IvAn', 'SonyA', 'YaRosLav', 'Dima   ', '  dima    ', 'diMa', '    dIma', 'dimA', 'dIMA','Nazar', 'Angelina', 'Me',  'wwwwwqqqqqwwwwwqqqqqwwwwwqqqqq', 'wwwwwqqqqqwwwwwqqqqqwwwwwqqqqq'];
const tags = ['div', 'header', 'h1', 'sup', 'li'];

// remove names where length > 15

// names.forEach((name) => {
//     if (name.length > 15) {
//         console.log('Something wrong');
//     }
// });
// const numbers = [12,13,14,15,16,17,19, 33, '33']
const validationNames = names.filter(name => name.toLowerCase().trim() != 'dima' && name.length <= 15);

const validationNamesSize = validationNames.map((name) => {
    if(name.toLowerCase() == 'me') {
        return 'admin';
    }

    return name.toLowerCase();
})
// {

//     return name.length <= 15;
//     // if (name.length > 15) {
//     //     return false;
//     // }
//     // else {
//     //     return true;
//     // }
// })

console.log(validationNamesSize);
console.log(tags.map(tag => `<${tag}></${tag}>`));
