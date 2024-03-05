# formatInJS
JS로 format 함수 구현

```
if(true) { // testCases of formatString.format(...args);
    let testCase = [ // [formatString, args]
        ["{0}", [0]],
        ["{0:05}", [0]],
        ["{0:5}", [12]],
        ["{0:5.2}", [0]],
        ["{0:5.2f}", [0]],
        ["{0:5.2f}", [1]],
        ["{0:5.2f}", [1.1]],
        ["{0:5.2f}", [1.11]],
        ["{0:5.2f}", [1.111]],
        ["{0:*|15s}", ["NJH"]]
    ];
    let testCount = testCase.length;

    for(let i = 0; i < testCount; i++) {
        let [formatString, args] = testCase[i];
        console.log(formatString + '\t@ ' + formatString.format(...args) + ' @');
    }
}
```
output
```
{0}	@ 0 @ Format.js:106
{0:05}	@ 00000 @ Format.js:106
{0:5}	@    12 @ Format.js:106
{0:5.2}	@     0.00 @ Format.js:106
{0:5.2f}	@     0.00 @ Format.js:106
{0:5.2f}	@     1.00 @ Format.js:106
{0:5.2f}	@     1.10 @ Format.js:106
{0:5.2f}	@     1.11 @ Format.js:106
{0:5.2f}	@     1.11 @ Format.js:106
{0:*|15s}	@ ******NJH****** @ Format.js:106
```
