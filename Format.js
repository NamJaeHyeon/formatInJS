String.prototype.format = function() {
    let args = arguments;
    let str = this;
    let regex = /{(\d)+(:([^1-9.><|])?([><|])?(\d+)?(.\d+)?([bodxXfegFEGcs])?)?}/g;
    return str.replace(regex, function(match, p1, p2, p3, p4, p5, p6, p7) {
        let target = args[+p1|0]; target = Number.isNaN(+target) ? target : +target;
        let paddingShape = p3;
        let alignment = p4;
        let width = +p5;
        let precision;
        let type = p7;
        let decimal;
        let exponent;

        if(p2 == null) return target;
        if(p3 == null) paddingShape = ' ';
        if(p4 == null) alignment = '>';
        if(p5 == null) width = 0;
        precision = p6 ? +p6.slice(1) : "fegFEG".includes(type) ? 6 : 0;
        if(p7 == null) {
            if(typeof target == 'number') {
                type = 'f';
            } else if(typeof target == 'string') {
                type = 's';
            } else {
                return;
            }
        };

        switch(type) {
            case 'b':
            case 'o':
            case 'd':
            case 'x':
            case 'X':
                target = target.toString([2,8,10,16,16][['b','o','d','x','X'].indexOf(type)]);
                break;
            case 'f':
            case 'e':
            case 'g':
            case 'F':
            case 'E':
            case 'G':
                target = target.toString();
                if(target.includes('.')) {
                    decimal = target.split('.')[1];
                    target = target.split('.')[0];
                    if(target.includes('e')) {
                        exponent = decimal.split('e')[1];
                        target = decimal.split('e')[0];
                    }
                }
                break;
            case 'c':
                target = target[0];
                break;
            case 's':
                break;
            default:
                target = target.toString();
        }

        switch(alignment) {
            case '<':
                target = target.padEnd(width, paddingShape);
                break;
            case '>':
                target = target.padStart(width, paddingShape);
                break;
            case '|':
                target = target.padStart((width - target.length) / 2 + target.length, paddingShape).padEnd(width, paddingShape);
                break;
        }

        if("fegFEG".includes(type)) {
            if(precision != 0) {
                decimal = decimal || '0';
                target += '.' + decimal.padEnd(precision, '0').slice(0, precision);
                if(exponent) {
                    target += ("feg".includes(type) ? 'e' : 'E') + exponent;
                }
            }
        }

        return target;
    });
};

// if(false) {
//     let testCase = [
//         ["{0}", [0]],
//         ["{0:05}", [0]],
//         ["{0:5}", [12]],
//         ["{0:5.2}", [0]],
//         ["{0:5.2f}", [0]],
//         ["{0:5.2f}", [1]],
//         ["{0:5.2f}", [1.1]],
//         ["{0:5.2f}", [1.11]],
//         ["{0:5.2f}", [1.111]],
//         ["{0:*|15s}", ["NJH"]]
//     ];
//     let testCount = testCase.length;

//     for(let i = 0; i < testCount; i++) {
//         let [formatString, args] = testCase[i];
//         console.log(formatString + '\t@ ' + formatString.format(...args) + ' @');
//     }
// }
