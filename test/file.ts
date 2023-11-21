const code = `
%macro ari 4
  ; entity  [arithmetic-combinator], %0, %1, %2, %3
  arith  %0, %1, %2, %3
%endmacro

%macro dec 4
  entity  [decider-combinator], %0, %1, %2, %3
%endmacro

%macro add 3
  arith   [+], %0, %1, %2, %3, %4
%endmacro



.global q1, q2, q3
  add     [red], [green], [blue] 1, memr, out
  decid   [=], [black], 0, [everything], [cyan] 1 [pink] 2 [yellow] 3 [everything] 4
  const   [iron-plate] -1 [W] 4 [dot] [fluid=water]
`

const code2 = `
; .define ip [black] [B]
; .define read [green]
; .define write [red]
; .define stack [S]

%macro push 1
%endmacro

%macro pop 1
  sub r1, 1
%endmacro

%macro call 1
  load r2, -2
  add r2, %0
  j r2
%endmacro

%macro return 0
  pop r1
  j r1
%endmacro

.global r1, r2, r3

:bob
  return

:main
  mov r1, [B] 0b100 [1] 2 [red] 4 [iron-gear-wheel] 1 [item=advanced-circuit] -4 [virtual-signal=signal-C] 0xff
  mov r2, [item=<artillery-shell:atomic-bomb>] 0x7 [entity=cliff] 010
  call :bob, [blob=hey-there]
  j :main ; loop back to top
`
const ARITH = 'arith'
const DECID = 'decid'
const CONST = 'const'

//                             ,,
//   .g8"""bgd               `7MM
// .dP'     `M                 MM
// dM'       ` ,pW"Wq.    ,M""bMM  .gP"Ya
// MM         6W'   `Wb ,AP    MM ,M'   Yb
// MM.        8M     M8 8MI    MM 8M""""""
// `Mb.     ,'YA.   ,A9 `Mb    MM YM.    ,
//   `"bmmmd'  `Ybmd9'   `Wbmd"MML.`Mbmmd'

//                                ,...  ,...
//  .M"""bgd mm                 .d' "".d' ""
// ,MI    "Y MM                 dM`   dM`
// `MMb.   mmMMmm `7MM  `7MM   mMMmm mMMmm
//   `YMMNq. MM     MM    MM    MM    MM
// .     `MM MM     MM    MM    MM    MM
// Mb     dM MM     MM    MM    MM    MM
// P"Ybmmd"  `Mbmo  `Mbod"YML..JMML..JMML.

const os = require('node:os')
const { deflate, unzip } = require('node:zlib')

// const input = '.................................';
// deflate(input, (err, buffer) => {
//   if (err) {
//     console.error('An error occurred:', err);
//     process.exitCode = 1;
//   }
//   console.log(buffer.toString('base64'));
// });

// const buffer = Buffer.from('eJzT0yMAAGTvBe8=', 'base64');
// unzip(buffer, (err, buffer) => {
//   if (err) {
//     console.error('An error occurred:', err);
//     process.exitCode = 1;
//   }
//   console.log(buffer.toString());
// });

// // Or, Promisified

const { promisify } = require('node:util')

const do_unzip = promisify(unzip)
const do_deflate = promisify(deflate)

// do_unzip(buffer)
//   .then((buf) => console.log(buf.toString()))
//   .catch((err) => {
//     console.error('An error occurred:', err);
//     process.exitCode = 1;
//   });

function inspect(s) {
  	return require('node:util').inspect(s, {
    	showHidden: false,
   		depth: null,
   		maxArrayLength: null,
  })
}

const fs = require('node:fs')

function print(name, str) {
  fs.mkdir('./asm_out', (err) => {
    if (!err || err.code == 'EEXIST')
      fs.writeFile(`./asm_out/${name}`, str, (err) => {})
  })
}

const str = '0eNqVVU2PmzAQ/S8+w2oJVZNy7HelSr1U2l1VlWVgAlZgHNkmH0L899pACCUc7Bsev3nvjT14WpJWDRwlR02SlvBMoCLJn5YoXiCrbExfj0ASwjXUJCDIaruSkDVS8ROEU74KVcYQQZIuIBxzuJAk6v4GBFBzzWHg7RdXik2dGmQSuTEG5CiUIRFoHRni0CReSbIxUpoVykZL4EVpqngOxk/6UMOJS92YyCQ6IMLv1rICrTkOXCcwVgaxWuT0brE3Fx6rRhmSCUWip/gpinsW45gyCWw02i6kXk3ewk3Xl7IEvq0CzzzX5SP4ZRV8O5H2odw19J5X2l7JEv11BT3B+9NKK4YHkuxZpcCcQCnOVIISjczspc/DgIZCYA223eYbacOrfDj9ebgohdKLmG1ERQXSQooG83HTOMrM8mapwaxkUkPed7WiNhPvPFNj/F+qKSQ7rB6OoUAomDb9OROs+H6vvBQ+ubNrJgvQfvRf3OnPbLxtZ/Kf7uSz6/cQ+OUuMOsXD4GP7gK3zvNg/+bO/tDDHjI/PFpIAijKMKdSZAe/an57yAiaAs3BDg8tm8z3t/vsKtXdX8Dn8cv9kX+xpJc+8+Ke9To+zybr6p71Zp5IO/r6oZnMZuxsaGx20bvth812u4t3cfy+6/4BjRmaSw=='
// let str = '0eNqtUdFKxTAM/Zc814vbrm6W+ycio9uiBta0dN3ljtF/N+18EARB8SWQk3NOTsgOw7yiD8QR9A40Ol5AP++w0BubOWNx8wgaKKIFBWxs7iYcacJwNzo7EJvoAiQFxBPeQFfpRQFypEh4uJVm63m1AwYh/OSjwLtFpI7z9lthb1JPD7JhooDjMasVSNoY3NwP+G6uJFoRfDr2MpuKy5LRfFc0+cj7LLPehLJMwwUy4DcRrBz71+BsT+xXocawYkpJfctf/yF//U/5q1/nl2eU5+kvv1ZwxbAcObrq3D7Vbds1XdM8pvQBrx64fA=='
// let str = '0eNqVkN0KgzAMhd/lXHeCf9P1VYYMf4IU2ii2jon03de6G2G72U0gycn5kuzo9ErzothB7lD9xBbyvsOqkVsda26bCRLKkYEAtyZm1rRaX3RrZngBxQO9IFPfCBA75RR9XI5ke/BqOlqC4Ne8wDzZMDJxpEWbIikFNsgqKYN5WImpj30bBWkM40LEZ4IaIDPfeO/FFzX7j1r/R00Pajj8eJA8/VPgSYs9CFmdFtUtq6o6r/P86v0byI18HQ=='
// let str = '0eNrNU8lqwzAQ/Zc5K6HemlT0T0owsj1NB6yRkOVQE/TvlexQDG1C0lMvhlnehkdnaPoRrSP2IM9AreEB5NsZBjqy6lPPTxZBAnnUIICVTlWHLXXoNq3RDbHyxkEQQNzhJ8gsHAQge/KEC9tcTDWPukEXF27xCLBmiFDDST3RlQImkOW2ihIdOWyXYS4g2vXO9HWDH+pEERwRF8o6zrqZZkjdFMyrlPIpwbRVblaT8AqpYacIGNnX787omtiOcdW7EUOYZXhRnbmy9HHYraNRrIpwCHH9R9z8L3Grfx+3vBK3+I47aNX3m15p+0vMfFut/uudmvFyWnLtSH4pV/IXSwKODpHvNVs+ZrZ6xGx+22xx1exySHE6Pzq5eqMCTuiG5R72Wbl7yXe7fbEviucQvgCSVUv8'

// let str = '0eNrNl92OqjAQx99lrutGvgRJziOcKy9PDEEYdRIopBTPEsO7bwuuHyso7K7r3mgK7b8zv5nplD2skhJzQVyCvweKMl6A/28PBW14mOhnssoRfCCJKTDgYapHoSC5TVFSNImydEU8lJmAmgHxGF/BN2p2VyPGiGIU3QJmvWSAXJIkbC1qBlXAy3SFQu1wxxYGeVao1RnXBijFiecxqNS/ZRsvjtopJoFRO8FkoDyXIkuCFW7DHSkBteqkHKjXcaNW6BdrEoUMrvzbkZClenI0rZ0xERhr1wrUKlqqkKEGrnzIchRhawRM1MKslHk5VrquG/t5605joal/NgKRn8OjWJNlF2NLrSURlSSboVEvtd4Vb/O0cxomySQJ07wL8uzFucTcBfZ9wyPVz0M90ZzqQZqHoom/D3+gg4vRy8W45GD2cLBu5W8HD2ds0h1kvyXjbsEZn2u4Q1HJLfFNq51XysiSy2AtsjQgrsTAl6LEr3JnbfpqJz5Mtoclqz0ySNZTgvR/qw7EXximDu7WVZBYdzTtMdF0PqnaF3ZnfE8wntUTWj8f1BUO4n194X5hfWwSs2EBmI2rO9d7St0d0f/+unNuh8XtiYM7rFm7859q1oOQj+AyMB+9ox3v+95JyKvby1lK2t141pRIFD235j4ef1sW5aHej7fmZZcX89HHmmv3ejF77LG2eNSRthh1nBnTnowwpgNLw/mp0lh8Y1nMu+6wqqk2H17+2bceA3VYFe1J6xm2Ozdd17M8y5rV9RsUdNZU'
// let str = '0eNrtWttu4jAQ/Rc/hwqPcwNpP2Gf+riqUAC3WCIXOU53UcW/r520QBMb7KQ3Li+tQpyJfc54PHMmL2i+rmjBWSbQ9AWxRZ6VaPrnBZXsKUvW6jexKSiaIiZoijyUJam6SjgTq5QKthgt8nTOskTkHG09xLIl/YemeOudtLGkC7akXG8Atg8eoplggtFmRvXFZpZV6Zxy+YYTc/FQkZfy6TxTE5AWR3HsoY38T3xyF8g3LRmni2YAeEiuXPB8PZvTVfLMpAH51N7yTN5e1tZKdeOR8VLMOut7ZlxU8pfd1JoRI06XamklVVaUqVIkCnC5hrygPGkmgUbywbwSReVqerut5581y6lnCOqPunkAHVs2K2V8UTFRX2IF8xOnNGsPJIrBg+ug86B6bYcWGEALXD4t2EALfo+u9H75rJFDbEui3yIxtCOR7JeTJuv1aJ2khY658C54v6V0bL29cEdVf6b2FI3VRVokvHaqKfqFHMD2jXhpaNDh47vjA2eET3vrAxgBAzvAgmNBXwNc4BqpX81+SDw4hqJ7JKDPlG/EimVPje1iIydZZWL2yPN0xjJpDE0Fr6gDQaHt/ncKK7FdcAj7cgk3LjWod87V1t4jtlyDC9eRHdeRI9fkW7j+u5KJ5VnuXHNgjVzYxOOeZk28x315JzfebXa5maDYhfdJT6sm2ifuyTv+rpqqWecnpe+vxh3qqg5v78M4tq672nvZxJUa15ssuA6y6t2oRXky4LDscGtdjoFlEY2xW/yN4m85d3es/vz42z0hWxweqQnhRIamKaqPHNVwfCIQ2lVUGPq6CLm5iN1h2vIQYvYQ7OQBliIDtlRhoslXqTBWZLpsSvtD0TeB5LuDBOcFkvXpgju6TWRCba/HvM3yRPToKH0H8cPXg/nI1oJyQzfBhN7vBrnqNTXYdRMeHAALzQiFJkDCAYDATwckaPtFbEZIN1YPWeScf0a+EbLwc/PP+8/KPe/dVH6ntBPHbS4mluljbBkUg68KivcfGRAj26oXxi0AydiE2GSAM5PLdmaw5KGTF5vAhrG7e5LzcU9rUQabQisM6W3j622imhVwfXiA01q7nh9w7//hi+iPgmXtAqRvkwjfmkRDGn7g9iGBb+nwft9+AL71A/TIE+skxndiNOhr18h9MEBnxteuM2s6cw77ESykRi1nYV9xEN/EQct91ZVavlQdhMhd+MJnJXxBOFgdhHiArIMvUOeCIXUuvlLRxulTDKPEQHpUvfhsql5wrXrl7fpr8OnBB+gekpG7bI6dGPvRBKIoJjEh4Xb7H1IU9oQ='
// let str = '0eNrtXMty6jgQ/RetzZT1sGRTdZd3MYtZZVYzlaJ4KIlqwFDGZIZK8e8jmzyILZluOyT4xpsUBrslndMtdZ8mPJHZcqc3mUlzMn4iZr5Ot2T89xPZmvt0uizey/cbTcbE5HpFApJOV8XVQs/NQmej+Xo1M+k0X2fkEBCTLvR/ZEwPwVkD08zkDyudm7nbBjvcBkSnucmNPs6ovNhP0t1qpjM7yKupYs75NM1PDQVks97aZ9dpMQNrbxTHv0UB2dtXXNmXdiT7XJ6tl5OZfpg+GvuQvfPOLHOdeSB4NFm+s++8jny8Y0RJaW1XYEhPULg9DpLqeTGRbWGJFn8yvThdkbFXdmpzk813Ji8vi2cPBYqVRTPsotXFFv1n90Ur2KL529Cr6XI5Wk5XG9daJWStLwPazxavj9+ZbJtPwEsvlnI0X1JAxmFxsdpMs5KGMflBDnAU5MmSSxiUBwfRFH0OPCpoLEx2nE3pRi5sns2+YbO9DDgBWe/yzQ5hVD/qbJ8/mPT+aHuzn5SuN7nL1quJSa0xMs6zne6Ce1J3x4CwbgEbITnjX8LZvw92c+4Ha7TCmnjPQ3ls3Gdap2cIY43squrN7weNa+TDBq1OnnKP20jsPs/e9r7kZe+DwMmb4axNWHiXGp95MnSYcq5dIUOGDiHTzLE/JhQmJiJopAGP9RjHs4q/hOfjCnvBc9S8adUj0E9h9WxkEnM2Vu9mHg9IkLucih273Mdks394stkAYeOn0wZD2bhx2lAoG787bcQFCXUOaAjLrgvAPye7BkUcIizAh3XN6X2JOMXWnkpdtePOltP5Px/gvH99gPP+RDkvth5WtRrx5BgRn0DLbQe/rXhn4nXk4iO34wJLaRV9VrDftA10WI7/HjLuSzmpwPoRb5lvy4bdxzO36Ixm5pK6XuamgKnSm+UPKf63urAyeePVhsB6oy2r5STIqEXGVJp2eIMvCaESuu9TBVACnNTIDtTIX58abw2PqsV5BCYyru6RIZBIhZcYVY8kxmqVb4HyYhjBcnca4yGTPYKstilw/9ZNgfUOTdoquGpQcB0cnRGrHNGPcPqG8pYBmzVhW7rlQLcrJJNmvrkC8y1RfFMg37St2C8H5dKNfAjVHKscnTAKut/LKWvLqRo4BUVxA6cMFaW8rV0v9xyf3tOvqrxeVbNLJPjPxhHVV527s4Kyjy0BZEt0YEt+D7b8yokjeppiDVyScWApzaK23SA5dIPcHIkzEeivAevBWWkSh926Qc3WfNUTk21dRA0uAjwy6w2Qdt1+xwbR4CHxmWkAJQmm8K0s1atWFvzUrDV7WexDLcajJvuFGvi0YlXRR3jPq6RD50ldeeeJ1honod/RXPe6v8YZdoBMXjlkLKl6Dmtqz9XvdUNG0TmtEl7I5GVz2ptL5bM3qOYCR2WyvJaNcOCXkhm+lSqvs5XqgoVCi2kuqgD6mqycd3Bm9Ws7MwPyQKEdbS7w7qn6455grYdWW1/cu9d26bNH37iZK3HKK5fnZXs3QRLfcYz61HH0F+QcWAFx1bbjFA0dJ0D/gaIYasg6YqDLx227D9HQfXAjr8CJTYxiNGlr18t90kHPjr69ni26xCMDCJ7O/9AL20qU0SBRAuOqLtD4ymyUBgkVGQXFy2VRr+QyAT70vJqi6PK97OjKpZ4GMcyrfYkutW/0TYUcitnCvbKDaFEJR72phAW4En4ufO3H5Q8xjE9++CEgdufeHo+dmAqVMKViHnNbqh3+B+gWj+Q='

// let str = '0eNqtlGFPgzAQhv/LfYZF6OYmib/EGFLgdBdpS8qxSBb+u1fQbSq6EP2y7KB9+vJcc0co6g4bT5YhOwKVzraQPRyhpWer6/CM+wYhA2I0EIHVJlRhHWvLcelMQVaz8zBEQLbCV8iSIbpK0J54b5CpnGekw2MEaJmYcIo0Fn1uO1Ogl0N+DRNB41rZ62xIILx4k642EfTyT6VqtRlCxi/I9Eq679C1ukRGUJHHclogMAnG3tV5gXt9IAHIrjM5l9fVSGvDiyfyLeffrB3IcydPTtGmFXFR6/Il+GoxcPIPCaMY16DXUwyIZavruOmWw8VR+AY7fdKYMg0/HqvLjpBUa1lJvuyIxzIZHoc5w+p8ktF1HdfaNHNak8+9mlf5ceDJ4180nv3dhMI02o89z+AeZjwkf/OwPuWosKQK/ZVrdrP0mr1j/+mO/SZn+e3CA/qe92SfJ3bTS8zOcv7kncnJCgwy9h0u8J5+9p5eOA+1+qEPm4VDRO2uDpHbpcjtF6TMvXFUZhezOQJx1k4N3yXr7V263e7UTqnbYXgDlBf3Fg=='
// let str = '0eNrtmMFuozAQht/FZ7LCOASC1CdZVcgBNxktGGRMtFHEu68N2yQNdoOhPVTtBWEYjz/+GcYDZ7QrWlYL4BIlZwRZxRuU/D6jBvacFvqaPNUMJQgkK5GHOC31SNtJyuUqq8odcCorgToPAc/ZX5TgznvogQqQh5JJyMw+gu7ZQ4xLkMAGpH5wSnlb7phQi7wL46G6atTcimsC5W8VBr9CD53UGSHqVK2k5nGWaZtGG2F9ECy/XQzUKNIke8EYN9zpOv2sd2jBg6ccw63JW7QcxEDWO1OgUlRFumMHegTlQM26ek7V7Rwuj/ECopHpSP0jCNmqKxe0wWK1K2j2R+veMO0nfRWzF7iqmaADBlqpqVUr69bdeTcWO7CIvVaWILIWZD/EVu23I0NjKMgVqaRFsSpoWZv0x4bkGGn+uuBF8CV6X4X29aCsqeiTI0FPqJuenZMFwzaJ1hfEnGWQM/EgVX3XVP3v9oPy9D3d3DOUHZk4yQPw/eC7PinMlsv0RVRlClw5Q4kULXMISfA2JMGN5npM7CEKpiV16Fj6SDyz9OHQzhpa4DaucNFcOHthxrbKHC3YNLAT3F3QYzvr2NKIHi9A9z93v9su2O/w99jverGNoo6qxbOabdseDRXCllb+tFqi7WYHz//uwds6BW89MSTYvWnBX6ppmZ7G5K46YmITLZjbxuCfNsYYpO37bQy2B22U596892BG8+5/rfdgefeOZ7fv/k/em4PiP0j85Q08XtLBO/Wh4T38xgpvMjXTbxbQ+5/9/YGjBR8gTtpu7gWzN/kmUzN9vIDe/9jPJ3W7/2eX3Pwk9JB645qhXMR4HW2DKIpJTMim6/4BNE7pbw=='
// let str = '0eNrtW99vozgQ/l/8TFb4Bxgi7eu9rnSvp1VEEre1NkBETG+jiv/9TLi2WeMBG19XFzUvVUkGM/5mxvN9k+QFbQ+tODayUmj9guSurk5o/dcLOsnHqjj0r6nzUaA1kkqUKEJVUfZXvZ0qKrXa1eVWVoWqG9RFSFZ78ROtcRfNrlA0Uj2VQsmdfQ3SfY+QqJRUUgwuXS7Om6ott6LRD5l0JkLH+qTvraveA73eirIvSYTO/X88+5LoJ+n7KrHrbU69Ee7/NGJ//TCpr7Lek8dGiMryTtf1ezVcIzO7HDtHDNf2shk8uyymHVVNfdhsxVPxLPUC+q73lTf67b1828aDbE5qM0L/WTaq1a+8uTZYrLaHYvejx/0k+nU2r2BqgOM4jlB9FE0xeIJW+u66VcfWf/1ujDcB8GbaUja7VqrLJQbhx2RkaQ0HffepLA6H1aEoj7YYUEuCjHB/feAb6CGYv4Md9xflsWguCbJGX1HnnqHuiKUAROzNxb3Yyb1oZtKV+Kbrv8v+R7k6hZt/iopn0ZzVk6weh7WPZ+1mW6nNQ1OXG1npxdBaNa3wCImRmuQK8/6awiFK3JI68Tz+SLzw+MPw+YehAzD1dA7nC50jMehc/5bVOR7QOFK/xvFr0Ame6CRjU6vzWYDz3CvshkcczoKxpdX13DdjuYn7/DHzIA9KNACFgepfVg/1UPltf6SsyAyRgdbZ1+pqGXxNZTxwx+bJYUcTxwFw8o+Ec0gSGxDYCwjiCAQOYFvp/4dtfSTVumDsxKGGXIWoWW6UOqauzIOkbm0Nh3Bn/tmj6RVMHJvRTJx5JHaMJl3KK9M7r3RsD0YMmQezNDhHPg7qRPZAbR4zf7mV3pTccj/1tN4yMIYYM06WVgq/V4ojf4hGWhgIG5suFEv8XwvFT4ng1L9U+G2VinNLoZaDzA4aD1C+XvrNjPMog0zVRsmUVB7b2veXBezPS+Il5n5gjWcztXufB0j/1FP6G4iyqVnA2NY+uo0D/PdC32wNOAfdT2eIGrEsZd9dyNA88dkdNxuf6SNxbqKWpYDdkYDdMa/cM1sChZuJ1dbuP/XWPpT8Gp3fp32+WXWP8YHBtz8XkIE/YNFjD8UUTTV1J5g7zPfUTc3K+KBxylVLHsZTC+cprgqcJAGDJfaRSPSbesdh6ZTu7yepRPicjnDHxEoDBhrJJxpo2DBmzhOI6VEHmWFyFukLnebcsYp4QNjZp59jpV7RNdkpxc6qI3cMZ+av1JKbUmruJaCVmQE3pG9JvnSokdyHGo50ZjxfgsJGp6calqKZqDlQvtLYv1LYTVWK++lCTNHPoEqheGmlsHulOPKz8aEFhS2frhTmVykJFHMSMOjxEuOYz/CdETgT30/hFlv7/mjA/rzkODX9Z/Agzmpr958FjIL84mN+rtrnDIS/zdbufxLgvx/+Mx9KUZMxMDi/rLb2/aUB4x7qNe6B0wkcRlEeMFCgv3WgwJYNFFy5M80CBgr0Br6pQnO3UQDNAzQh/dyjAMqdJfm0WKSZQze3fkV2AbGlt/U1YnfZDPFYtpjH0juPdTxcxpICihL2+5wa7LQshKl6ddoJ4gnyTEYDeI6fdzAto8nMsTI0BX375Wcw66vf3URIp81pyPkMM54TzjOaUZp23T//c4O6'

// let str = '0eNqV09tugzAMBuB38XWoRoFCuetzTFXFwQVr4KAQ6BDKuy+h0tRJ2TQuE/3+nETOCmU34aCINeQrUCV5hPx9hZEaLjq3p5cBIQfS2IMALnq3cjldsA4q2ZfEhZYKjADiGj8hD81VALImTfjktsVy46kvUdnAn5CAQY62VrLrb734kAhYIH87JLaJLdFKdrcS22Imm7ehO3Ua1S9Hn0npye58N30mghA2bXJ3D18OL3YYF69x3GVULVYfXifa5RDfpZeJdzEKa6+S7FIahYuXOe1iaqm9SupVfg7pQ8oa2T3v6EeyfyCkJAcNFip4tIid1zmbq3Ejv1XmL19KwGynchvkYxbG6fmYplmURdHJmC+NOie+'
// let str = '0eNqlVNtugzAM/Rc/TmkFAdaC9idThQK4raWSoBCqoSr/vgS23tYL1XhA2LHPOT4yOUCx67DRJA1kB6BSyRayzwO0tJFi53OmbxAyIIM1MJCi9pGvM0KaWanqgqQwSoNlQLLCL8hCy54iCE1mW6Oh8jYGtysGKA0ZwlHSEPS57OoCtSN5KIZBo1rXq6RX4PBmYRDNEwa9+4x4PE8cVUUay7EmZh5GjmHre0L/0lidc5OLuKskXXZkhjC0K2v9vFfy+JNJbwkM78rjgzyj1S4vcCv25BBc2wk6d8cVHcWvSbcm/zUGsoBBi77kMqca1GJkgDdwY0w1wU/NgN85jaZZFB0tqrCkCvVjf9L0VXt+YK+8uXDAMTZCD4wZfIBPNL1r6KTJ11rVOcmmc6VGd/iCP1dLwh/aldzxJ35xw9P304InExd8oxHlVEHJPwT944+L/pjJbuuOB93udLhqsrO7jcEedTvuyjKMFylfuIcvg8Dab/KMsl4='
// let str = '0eNp9j8EOgjAQRP9lz4VILVb7K8aYAhuzCd2SthgJ4d9t4eLJ287m7czsCt044xSIE5gVqPccwdxXiPRiO5ZdWiYEA5TQgQC2rqjCJcup6r3riG3yATYBxAN+wDTbQwByokR42O1iefLsOgwZ+GskYPIx33ou+dmvaqSuWwFLHs9a1W2OGihgfzCqxO39zM87At4Y4g7Ia6P0TWqtT1pe1LZ9AQQnUaU='
const ztr = '0eJx9j8EOgjAQRP9lz4VILVb7K8aYAhuzCd2SthgJ4d9t4eLJ287m7czsCt044xSIE5gVqPccwdxXiPRiO5ZdWiYEA5TQgQC2rqjCJcup6r3riG3yATYBxAN+wDTbQwByokR42O1iefLsOgwZ+GskYPIx33ou+dmvaqSuWwFLHs9a1W2OGihgfzCqxO39zM87At4Y4g7Ia6P0TWqtT1pe1LZ9AQQnUaU='

function deepcopy(obj) {
  return JSON.parse(JSON.stringify(obj))
}

// function parse_line(line) {
//   let line_without_comment = line.replace(/;.*/, '')
//   let instruction = line_without_comment.trim()
//   if (instruction.length == 0) return null

//   let operation = instruction.replace(/ .*$/, '')
//   let operands = instruction.replace(/^[^\s]*\s/, '').split(',').map(q=>q.trim())
//   console.log(operation, operands)
// }

// function parse_code(code) {
//   for (let i = 0; i < code.length && code[i]; ++i) {

//   }
//   let lines = code.split('\n')
//   for (line of lines) {
//     parse_line(line)
//   }
//   // console.log(lines)
// }

//                                                ,,
// MMP""MM""YMM    `7MM                           db
// P'   MM   `7      MM
//      MM  ,pW"Wq.  MM  ,MP'.gP"Ya `7MMpMMMb.  `7MM  M"""MMV .gP"Ya
//      MM 6W'   `Wb MM ;Y  ,M'   Yb  MM    MM    MM  '  AMV ,M'   Yb
//      MM 8M     M8 MM;Mm  8M""""""  MM    MM    MM    AMV  8M""""""
//      MM YA.   ,A9 MM `Mb.YM.    ,  MM    MM    MM   AMV  ,YM.    ,
//    .JMML.`Ybmd9'.JMML. YA.`Mbmmd'.JMML  JMML..JMML.AMMmmmM `Mbmmd'

function tokenize(code) {
  let c = 0
  let line = 1
  let column = 1
  const tokens = []

  function tokenize_signal() {
    let i = 1
    for (; c + i < code.length && /[^\n\]\.]/.test(code[c + i]); ++i) {}
    if (c + i == code.length || code[c + i] != ']') {
      return { token: 'TOKEN_ERROR', line, column: column + i }
    }
    ++i
    return ({ token: 'signal', string: code.slice(c + 1, c + i - 1) })
  }

  function tokenize_identifier(token_type) {
    let i = 1
    for (; c + i < code.length && /\w/.test(code[c + i]); ++i) {}
    return ({ token: token_type, string: code.slice(c, c + i) })
  }

  for (c = 0; c < code.length;) {
    const chr = code[c]
    if ([' ', '\t'].includes(chr)) {
      ++c
      ++column
      continue
    }
    if (chr == '\n') {
      const token = { token: 'EOL', line, column }
      tokens.push(token)
      column = 1
      ++line
      ++c
      continue
    }
    if (/[_a-zA-Z0-9]/.test(chr)) {
      const token = tokenize_identifier(/[0-9]/.test(chr) ? 'number' : 'identifier')
      if (token.token == 'number')
        token.number = Number(token.string)

      token.line = line
      token.column = column
      c += token.string.length
      column += token.string.length
      tokens.push(token)
      continue
    }
    if (chr == '[') {
      const token = tokenize_signal()
      if (token.token == 'TOKEN_ERROR')
        return [token]
      token.line = line
      token.column = column
      c += token.string.length + 2
      column += token.string.length + 2
      tokens.push(token)
      continue
    }
    if (chr == ';') {
      for (++c, ++column; c < code.length && code[c] != '\n'; ++c, ++column) {}
      continue
    }
    const single = '.:,%-{}'.split('').includes(chr)
    if (single) {
      const token = { token: chr, line, column }
      tokens.push(token)
      ++c
      ++column
      continue
    }
    const token = { token: 'TOKEN_ERROR', string: chr, line, column }
    return [token]
  }
  const token = { token: 'EOL', line, column }
  tokens.push(token)
  return tokens
}

// `7MM"""Mq.
//   MM   `MM.
//   MM   ,M9 ,6"Yb.  `7Mb,od8 ,pP"Ybd  .gP"Ya
//   MMmmdM9 8)   MM    MM' "' 8I   `" ,M'   Yb
//   MM       ,pm9MM    MM     `YMMMa. 8M""""""
//   MM      8M   MM    MM     L.   I8 YM.    ,
// .JMML.    `Moo9^Yo..JMML.   M9mmmP'  `Mbmmd'

function parse(tokens) {
  const parse_tree = []
  let t = 0
  const bracket_depth = 0

  function peek() {
    if (t >= tokens)
      throw new Error(`peek() called expecting a token but found EOF`)
    else return tokens[t].token
  }

  function eat(type, keyword) {
    // if (t < tokens.length && tokens[t].token == 'EOL' && tokens[t].line == 24) {
    //   console.log(22224444, type)
    //   throw new Error('aha!')
    // }
    if (tokens[t].token !== type)
      throw new Error(`eat() called with type '${type}' but found token with type '${tokens[t].token}' L:${tokens[t].line} C:${tokens[t].column}`, { cause: { function: 'eat', type, token: tokens[t] } })
    if (keyword !== undefined && tokens[t].string !== keyword)
      throw new Error(`eat() expected keyword '${keyword}' but found '${tokens[t].string} L:${tokens[t].line} C:${tokens[t].column}`, { cause: { function: 'eat', type, keyword, token: tokens[t] } })
    const token = tokens[t]
    ++t
    // let a = peek()
    // if (t < tokens.length && tokens[t].token == 'EOL' && tokens[t].line == 24) {
    //   console.log(1111111333)
    // }
    return token
  }

  function fail(type) {
    if (tokens[t].token == type)
      throw new Error(`fail() called with type '${type}' but token with type '${tokens[t].token} matched anyways L:${tokens[t].line} C:${tokens[t].column}'`, { cause: { function: 'fail', type, token: tokens[t] } })
  }

  function parse_macro() {
    eat('%')
    eat('identifier', 'macro')
    const macro = eat('identifier')
    const parameters = eat('number')
    eat('EOL')
    const operations = []
    while (peek() != '%') {
      if (peek() == 'EOL') {
        eat('EOL')
        continue
      }
      const operation = parse_operation()
      operations.push(operation)
    }
    eat('%')
    eat('identifier', 'endmacro')
    eat('EOL')
    return { node: 'macro', macro, parameters, operations }
  }

  function parse_directive() {
    eat('.')
    // let directive = eat('identifier')
    const directive = eat('identifier', 'global')
    const globals = parse_list(() => eat('identifier'))
    return { node: 'directive', directive, globals }
    // if (directive.string == 'global') {
    // }
    // return {node: 'directive', directive}
  }

  function parse_label() {
    eat(':')
    const label = eat('identifier')
    return { node: 'label', label }
  }

  function parse_macro_parameter() {
    eat('%')
    const parameter = eat('number')
    return { node: 'parameter', parameter }
  }

  function parse_constant_expression() {
    const units = []
    const token_types = 'identifier number : -'.split(' ')
    let p
    while (token_types.includes(p = peek())) {
      if (p == ':')
        units.push(parse_label())
      else units.push(eat(p))
    }
    return { node: 'constant_expression', constant_expression: units }
  }

  // function parse_signal_name() {
  //   eat('[')
  //   let identifiers = [eat('identifier')]
  //   if (peek() == '=') {
  //     eat('=')
  //     identifiers.push(eat('identifier'))
  //   }
  //   eat(']')
  //   return {node: 'signal_name', signal_name: identifiers}
  // }

  function parse_signal() {
    const name = eat('signal')
    const value = parse_constant_expression()
    return { node: 'signal', name, value }
  }

  function parse_signals() {
    const signals = []
    while (peek() != ',' && peek() != 'EOL') {
      const signal = parse_signal()
      signals.push(signal)
    }
    return { node: 'signals', signals }
    // return signals
  }

  function parse_operand() {
    let operand = []
    if (peek() == 'identifier') {
      while (peek() == 'identifier')
        operand.push(eat('identifier'))
    }
    else if (peek() == 'number') { operand.push(eat('number')) }
    else if (peek() == '-') {
      operand.push(eat('-'))
      operand.push(eat('number'))
    }
    else if (peek() == 'signal') {
      operand = parse_signals()
    }
    else if (peek() == '%') { operand.push(parse_macro_parameter()) }
    else { operand.push(parse_label()) }
    // return {node: 'operand', operand}
    return operand
  }

  function parse_list(parse_item) {
    const list = []
    while (peek() != 'EOL') {
      const item = parse_item()
      list.push(item)
      if (peek() == ',') {
        eat(',')
        fail('EOL')
      }
    }
    eat('EOL')
    // let retobj = {node: type}
    // retobj[type] = list
    // return retobj
    return list
  }

  // function parse_operands() {
  //   let operands = []
  //   while (peek() != 'EOL') {
  //     let operand = parse_operand()
  //     operands.push(operand)
  //     if (peek() == ',') {
  //       eat(',')
  //       fail('EOL')
  //     }
  //   }
  //   eat('EOL')
  //   return {node: 'operands', operands}
  // }

  function parse_operation() {
    const operator = eat('identifier')
    const operands = parse_list(parse_operand)
    // let operands = parse_operands()
    return { node: 'operation', operator, operands }
  }

  function parse_label_definition() {
    const node = parse_label()
    eat('EOL')
    return node
  }

  try {
    for (; t < tokens.length;) {
      if (peek() == 'identifier') {
        const node = parse_operation()
        parse_tree.push(node)
        continue
      }
      if (peek() == ':') {
        const node = parse_label_definition()
        parse_tree.push(node)
        continue
      }
      if (peek() == '%') {
        const node = parse_macro()
        parse_tree.push(node)
        continue
      }
      if (peek() == '.') {
        const node = parse_directive()
        parse_tree.push(node)
        continue
      }
      if (peek() == '{') {
        const node = eat('{')
        parse_tree.push(node)
        continue
      }
      if (peek() == '}') {
        const node = eat('}')
        parse_tree.push(node)
        continue
      }
      if (peek() == 'EOL') {
        eat('EOL')
        continue
      }
      return { node: 'PARSE_ERROR', token: tokens[t] }
    }
  }
  catch (e) {
    console.log(e)
    return { node: 'PARSE_ERROR', token: tokens[t] }
  }
  return { node: 'parse_tree', parse_tree }
}

//                                                         ,,        ,,
//       db                                               *MM      `7MM
//      ;MM:                                               MM        MM
//     ,V^MM.    ,pP"Ybd ,pP"Ybd  .gP"Ya `7MMpMMMb.pMMMb.  MM,dMMb.  MM  .gP"Ya
//    ,M  `MM    8I   `" 8I   `" ,M'   Yb  MM    MM    MM  MM    `Mb MM ,M'   Yb
//    AbmmmqMA   `YMMMa. `YMMMa. 8M""""""  MM    MM    MM  MM     M8 MM 8M""""""
//   A'     VML  L.   I8 L.   I8 YM.    ,  MM    MM    MM  MM.   ,M9 MM YM.    ,
// .AMA.   .AMMA.M9mmmP' M9mmmP'  `Mbmmd'.JMML  JMML  JMML.P^YbmdP'.JMML.`Mbmmd'

function assemble(parse_tree) {
  const pt = parse_tree.parse_tree
  let instruction_ptr = 0
  const globals = new Set()
  const labels = new Map()
  const macros = new Map()

  for (let i = 0; i < pt.length; ++i) {
    const node = pt[i]
    if (node.node == 'macro')
      macros.set(node.macro.string, node)
  }

  for (const [name, macro] of macros.entries()) {
    // TODO prevent recursion
  }

  const addressed_units = []

  function push_macro(node, macro_args) {
    for (const op of macros.get(node.operator.string).operations)
      push_operation(op, node.operands)
  }

  function push_operation(node, macro_args) {
    if (macro_args !== undefined) {
      if (node.node == 'label')
        throw new Error(`Found illegal label definition '${node.label.string}' inside macro  L:${node.line} C:${node.column}`)
      node = deepcopy(node)
      for (let j = 0; j < node.operands.length; ++j) {
        const operand = node.operands[j]
        for (let i = 0; i < operand.length; ++i) {
          const operand_part = operand[i]
          if (operand_part.node == 'parameter') {
            const n = operand_part.parameter.number
            node.operands[j] = macro_args[n]
            i = Number.POSITIVE_INFINITY
          }
        }
      }
    }
    if (macros.has(node.operator.string))
      push_macro(node, node.operands)
    else
      addressed_units.push(node)
  }

  for (let i = 0; i < pt.length; ++i) {
    const node = pt[i]
    if (node.node == 'label') {
      addressed_units.push(node)
    }
    else if (node.node == 'directive') {
      if (node.directive = 'global')
        node.globals.forEach(g => globals.add(g.string))
    }
    else if (node.node == 'operation') {
      push_operation(node)
    }
  }

  for (let i = 0; i < addressed_units.length; ++i) {
    const node = addressed_units[i]
    if (node.node == 'label') {
      labels.set(node.label.string, instruction_ptr)
      continue
    }
    if (node.node == 'operation') {
      node.address = instruction_ptr
      ++instruction_ptr
      continue
    }
  }
  return { macros, addressed_units, labels, globals }
}

//              ,,                                         ,,
// `7MM"""Yp, `7MM                                         db              mm
//   MM    Yb   MM                                                         MM
//   MM    dP   MM `7MM  `7MM  .gP"Ya `7MMpdMAo.`7Mb,od8 `7MM  `7MMpMMMb.mmMMmm
//   MM"""bg.   MM   MM    MM ,M'   Yb  MM   `Wb  MM' "'   MM    MM    MM  MM
//   MM    `Y   MM   MM    MM 8M""""""  MM    M8  MM       MM    MM    MM  MM
//   MM    ,9   MM   MM    MM YM.    ,  MM   ,AP  MM       MM    MM    MM  MM
// .JMMmmmd9  .JMML. `Mbod"YML.`Mbmmd'  MMbmmd' .JMML.   .JMML..JMML  JMML.`Mbmo
//                                      MM
//                                    .JMML.

/*
  connect() references the actual entity instead of writing the entity_number
    at the connection definitions. This means entities can be connected before
    they have an entity_number. These entity references need to be replaced with
    entity_number later.
*/

function connect(wire_color, entity0, entity1, connection0, connection1) {
  const multi_connection_entity = ['arithmetic-combinator', 'decider-combinator']
  if (connection0 === undefined && multi_connection_entity.includes(entity0.name))
    connection0 = 2
  if (connection1 === undefined && multi_connection_entity.includes(entity1.name))
    connection1 = 1

  const entities = [entity0, entity1]
  const connections = [connection0, connection1]
  for (let i = 0; i < 1; ++i) {
    const o = 1 - i
    const ent = entities[i]
    const other = entities[o]
    ent.connections = ent.connections || {}
    const c = connections[i] !== undefined ? connections[i] : 1
    const c_oth = connections[o] !== undefined ? connections[o] : 1
    ent.connections[c] = ent.connections[c] || {}
    ent.connections[c][wire_color] = ent.connections[c][wire_color] || []
    const wire = ent.connections[c][wire_color]
    const connection = { entity_id: other }
    if (connections[o] || multi_connection_entity.includes(other.name))
      connection.circuit_id = connections[o]

    wire.push(connection)
  }
}

function get_constant_value(operand) {
  // console.log(inspect(operand))
  if (operand.length == 0)
    return 0
  if (operand[0].token == '-')
    return -operand[1].number

  return operand[0].number
}

function decode_rich_text_token(signal) {
  // console.log('signal', inspect(signal))

  let s = signal.string

  let expanded_string = s

  // [virtual-signal=signal-everything]
  // [virtual-signal=signal-anything]
  // [virtual-signal=signal-each]
  // [virtual-signal=signal-0]
  // [virtual-signal=signal-9]
  // [virtual-signal=signal-A]
  // [virtual-signal=signal-Z]
  // [virtual-signal=signal-red]
  // [virtual-signal=signal-green]
  // [virtual-signal=signal-blue]
  // [virtual-signal=signal-yellow]
  // [virtual-signal=signal-pink]
  // [virtual-signal=signal-cyan]
  // [virtual-signal=signal-white]
  // [virtual-signal=signal-grey]
  // [virtual-signal=signal-black]
  // [virtual-signal=signal-check]
  // [virtual-signal=signal-info]
  // [virtual-signal=signal-dot]

  vcheck = /^everything|anything|each|[0-9A-Z]|red|green|blue|yellow|pink|cyan|white|grey|black|check|info|dot$/
  if (vcheck.test(signal.string))
    expanded_string = `virtual-signal=` + `signal-${signal.string}`

  // if (expanded_string.slice(0, 'signal-'.length) == 'signal-' && vcheck.test(expanded_string.slice('signal-'.length))) {
  //   expanded_string = 'virtual-signal=' + expanded_string
  // } else

  let position = expanded_string.search(/=/)
  if (position == -1) {
    expanded_string = `item=${expanded_string}`
    position = expanded_string.search(/=/)
  }

  s = expanded_string

  let type = s.substring(0, position)

  if (type == 'virtual-signal')
    type = 'virtual'

  // if (position >= 0) {
  //   ++position
  // }
  const name = s.substring(position + 1)
  return { type, name }
}

function generate_compute_combinator({ operator, operands }) {
  operator = operator.string

  const control_behavior = {}
  if (operator == CONST && operands.length) {
    control_behavior.filters = []
    let i = 1
    if (operands[0].node == 'signals') {
      const signals = operands[0].signals
      for (const signal of signals) {
        control_behavior.filters.push({
          signal: decode_rich_text_token(signal.name),
          count: get_constant_value(signal.value.constant_expression),
          index: i++,
        })
        if (i > 20)
          break
      }
    } // else {} TODO what should we do?
    return { name: 'constant-combinator', control_behavior, direction: 2 }
  }
  else if ([ARITH, DECID].includes(operator)) {
    const conditions = {}

    conditions[operator == ARITH ? 'operation' : 'comparator'] = operands[0].signals[0].name.string

    if (operands[1].node == 'signals') {
      const signal = decode_rich_text_token(operands[1].signals[0].name)
      conditions.first_signal = signal
    }
    else {
      conditions.first_constant = get_constant_value(operands[1])
    }

    if (operands[2].node == 'signals') {
      const signal = decode_rich_text_token(operands[2].signals[0].name)
      conditions.second_signal = signal
    }
    else {
      conditions[operator == ARITH ? 'second_constant' : 'constant'] = get_constant_value(operands[2])
    }

    if (operands[3].node == 'signals') {
      const signal = decode_rich_text_token(operands[3].signals[0].name)
      conditions.output_signal = signal
      if (operator == DECID) {
        let v = operands[3].signals
        v = v.length ? v[0].value.constant_expression : 0
        v = v.length ? v[0].number : 0
        conditions.copy_count_from_input = v != 1
      }
    }

    const control_behavior = {}
    control_behavior[operator == ARITH ? 'arithmetic_conditions' : 'decider_conditions'] = conditions

    const name = operator == ARITH ? 'arithmetic-combinator' : 'decider-combinator'

    return { name, control_behavior, direction: 2 }
  }
}

function assign_entity_numbers(entities) {
  for (let i = 0; i < entities.length; ++i)
    entities[i].entity_number = i + 1
}

function finalize_connections(entities) {
  for (let i = 0; i < entities.length; ++i) {
    if (!entities[i].connections)
      continue
    for (const connection_number in entities[i].connections) {
      const connection = entities[i].connections[connection_number]
      for (const color in connection) {
        for (const wire of connection[color])
          wire.entity_id = wire.entity_id.entity_number
          // if (wire.circuit_id) wire.circuit_id = wire.circuit_id.entity_number
      }
    }
  }
}

function generate_memory_cell(address) {
  const line = {
    write_address: 'constant-combinator',
    write_lamp: 'small-lamp',
    write_gate: 'decider-combinator',
    cell: 'decider-combinator',
    query_address: 'constant-combinator',
    query_lamp: 'small-lamp',
    query_gate: 'decider-combinator',
  }
  for (const k in line)
    line[k] = { name: line[k] }

  if (line.cell) {
    line.query_gate.control_behavior = {
      decider_conditions: {
        comparator: '=',
        first_signal: { type: 'virtual', name: 'signal-white' },
        constant: 0,
        output_signal: { type: 'virtual', name: 'signal-everything' },
        copy_count_from_input: true,
      },
    }
    connect('green', line.cell, line.cell)
  }
  if (line.write_address) {
    line.write_address.control_behavior = { filters: [{
      signal: { type: 'virtual', name: 'signal-red' },
      count: -address,
      index: 1,
    }] }
    line.write_address.direction = 2
  }
  if (line.query_address) {
    line.query_address.control_behavior = { filters: [{
      signal: { type: 'virtual', name: 'signal-green' },
      count: -address,
      index: 1,
    }] }
    line.query_address.direction = 2
  }
  if (line.write_lamp) {
    line.write_lamp.control_behavior = {
      circuit_condition: {
        first_signal: { type: 'virtual', name: 'signal-red' },
        constant: 0,
        comparator: '=',
      },
    }
  }
  if (line.query_lamp) {
    line.query_lamp.control_behavior = {
      circuit_condition: {
        first_signal: { type: 'virtual', name: 'signal-green' },
        constant: 0,
        comparator: '=',
      },
    }
  }
  if (line.write_gate) {
    line.write_gate.control_behavior = {
      decider_conditions: {
        comparator: '=',
        first_signal: { type: 'virtual', name: 'signal-red' },
        constant: 0,
        output_signal: { type: 'virtual', name: 'signal-everything' },
        copy_count_from_input: true,
      },
    }
  }
  if (line.query_gate) {
    line.query_gate.control_behavior = {
      decider_conditions: {
        comparator: '=',
        first_signal: { type: 'virtual', name: 'signal-green' },
        constant: 0,
        output_signal: { type: 'virtual', name: 'signal-everything' },
        copy_count_from_input: true,
      },
    }
  }
  connect('red', line.write_address, line.write_lamp)
  connect('red', line.write_address, line.write_gate)
  connect('red', line.write_gate, line.cell)
  connect('red', line.cell, line.query_gate)
  connect('red', line.query_lamp, line.query_gate)
}

function make_entity_composition(assembled) {
  const { macros, addressed_units, labels, globals } = assembled

  const entities = []
  const compute_combinators = []
  // let lines = []
  let code_line

  function generate_line(operation) {
    const line = {
      input: 'constant-combinator',
      compute: operation => generate_compute_combinator(operation),
      address: 'constant-combinator',
      lamp: 'small-lamp',
      gate: 'decider-combinator',
      memqw: 'constant-combinator',
      out_jump: 'constant-combinator',
    }
    for (const k in line) {
      if (typeof (line[k]) == 'string') { line[k] = { name: line[k] } }
      else {
        line[k] = line[k](operation)
        compute_combinators.push(line[k])
      }
    }

    if (line.address) {
      line.address.control_behavior = { filters: [{
        signal: { type: 'virtual', name: 'signal-black' },
        count: -operation.address,
        index: 20,
      }] }
      line.address.direction = 2
      if (operation.operands[4] && operation.operands[4].node == 'signals') {
        let i = 1
        for (const signal of operation.operands[operation.operator.string == CONST ? 1 : 4].signals) {
          line.address.control_behavior.filters.push({
            signal: decode_rich_text_token(signal.name),
            count: get_constant_value(signal.value.constant_expression),
            index: i++,
          })
          if (i > 19)
            break
        }
      }
    }
    if (line.lamp) {
      line.lamp.control_behavior = {
        circuit_condition: {
          first_signal: { type: 'virtual', name: 'signal-black' },
          constant: 0,
          comparator: '=',
        },
      }
    }
    if (line.gate) {
      line.gate.control_behavior = {
        decider_conditions: {
          comparator: '=',
          first_signal: { type: 'virtual', name: 'signal-black' },
          constant: 0,
          output_signal: { type: 'virtual', name: 'signal-everything' },
          copy_count_from_input: true,
        },
      }
    }

    connect('red', line.address, line.gate)
    connect('red', line.lamp, line.gate)

    const operands = operation.operands
    let IN, OUT
    if ([ARITH, DECID].includes(operation.operator.string)) { [IN, OUT] = [4, 5] }
    else if (CONST == operation.operator.string) { [IN, OUT] = [2, 3] }
    else {} // TODO error at least duh, until proper fix
    if (Array.isArray(operands[IN]) && operands[IN].length && operands[IN][0].token == 'identifier') {
      const connection_points = operands[IN].map(t => t.string)

      if (connection_points.includes('memr'))
        connect('red', line.input, line.compute)

      if (connection_points.includes('in'))
        connect('green', line.input, line.compute)
    }
    if (Array.isArray(operands[OUT]) && operands[OUT].length && operands[OUT][0].token == 'identifier') {
      const connection_points = operands[OUT].map(t => t.string)

      if (connection_points.includes('memq'))
        connect('green', line.gate, line.memqw)
      else if (connection_points.includes('out'))
        connect('green', line.gate, line.out_jump)

      if (connection_points.includes('memw'))
        connect('red', line.gate, line.memqw)
      else if (connection_points.includes('jump'))
        connect('red', line.gate, line.out_jump)
      else if (connection_points.includes('memr'))
        connect('red', line.gate, line.input)
    }
    connect('red', line.compute, line.address)

    return line
  }

  let y = 0
  let line
  for (let i = 0; /* i < 5 && */i < addressed_units.length; ++i) {
    if (addressed_units[i].node != 'operation')
      continue

    let x = 0
    const prev_line = line

    function position_entities(line) {
      for (const k in line) {
        if (k == 'compute' && line[k].name == 'constant-combinator')
          ++x
        line[k].position = { x: x + 0.5, y: y + 0.5 }
        if (['arithmetic-combinator', 'decider-combinator'].includes(line[k].name)) {
          // ++line[k].position.x
          line[k].direction = 2
          x += 2
        }
        else {
          ++x
        }
      }
    }

    function connect_entities_bus(line) {
      if (prev_line) {
        for (const c of ['red', 'green']) {
          for (const k of ['input', 'memqw', 'out_jump']) {
            if (prev_line[k] && line[k])
              connect(c, prev_line[k], line[k])
          }
        }
        connect('green', prev_line.lamp, line.lamp)
        connect('green', prev_line.gate, line.gate, 1)
      }
    }

    line = generate_line(addressed_units[i])

    connect_entities_bus(line)

    position_entities(line)

    for (const k in line) entities.push(line[k])

    // lines.push(line)

    ++y
  }

  assign_entity_numbers(entities)

  finalize_connections(entities)

  print('compute_combinators.js', inspect(compute_combinators))
  return entities
}

/*
        connections: {
          '1': {
            red: [ { entity_id: 2, circuit_id: 2 }, { entity_id: 3 } ]
          }
        }
*/

//                           ,,
//  .M"""bgd mm              db
// ,MI    "Y MM
// `MMb.   mmMMmm `7Mb,od8 `7MM  `7MMpMMMb.  .P"Ybmmm
//   `YMMNq. MM     MM' "'   MM    MM    MM :MI  I8
// .     `MM MM     MM       MM    MM    MM  WmmmP"
// Mb     dM MM     MM       MM    MM    MM 8M
// P"Ybmmd"  `Mbmo.JMML.   .JMML..JMML  JMML.YMMMMMb
//                                          6'     dP
//                                          Ybmmmd'

function read_blueprint_string(str) {
  const buffer = Buffer.from(str.slice(1), 'base64')
  return do_unzip(buffer).then((buf) => {
    return JSON.parse(buf.toString())
  })
}

function write_blueprint_string(obj) {
  const json = JSON.stringify(obj)
  return do_deflate(json).then(deflated => `0${deflated.toString('base64')}`)
}

read_blueprint_string(str)
  .then((bp) => {
    print('input_blueprint.js', inspect(bp))
    return bp
  })
  .then(write_blueprint_string)
  // .then(str => console.log(str))

//                                                                                           ,,        ,,
// `7MM"""Mq.                                                                               *MM      `7MM
//   MM   `MM.                                                                               MM        MM
//   MM   ,M9 `7MM  `7MM  `7MMpMMMb.       ,6"Yb.  ,pP"Ybd ,pP"Ybd  .gP"Ya `7MMpMMMb.pMMMb.  MM,dMMb.  MM  .gP"Ya `7Mb,od8
//   MMmmdM9    MM    MM    MM    MM      8)   MM  8I   `" 8I   `" ,M'   Yb  MM    MM    MM  MM    `Mb MM ,M'   Yb  MM' "'
//   MM  YM.    MM    MM    MM    MM       ,pm9MM  `YMMMa. `YMMMa. 8M""""""  MM    MM    MM  MM     M8 MM 8M""""""  MM
//   MM   `Mb.  MM    MM    MM    MM      8M   MM  L.   I8 L.   I8 YM.    ,  MM    MM    MM  MM.   ,M9 MM YM.    ,  MM
// .JMML. .JMM. `Mbod"YML..JMML  JMML.    `Moo9^Yo.M9mmmP' M9mmmP'  `Mbmmd'.JMML  JMML  JMML.P^YbmdP'.JMML.`Mbmmd'.JMML.

print('code.js', inspect(code))

let once = true
while (once) {
  once = false

  const tokens = tokenize((code))
  print('tokens.js', inspect(tokens))
  if (tokens[0].token == 'TOKEN_ERROR')
    continue

  const parse_tree = parse(tokens)
  print('parse_tree.js', inspect(parse_tree))
  if (parse_tree.node == 'PARSE_ERROR')
    continue

  const assembled = assemble(parse_tree)
  print('assembled.js', inspect(assembled))

  const entities = make_entity_composition(assembled)
  print('entities.js', inspect(entities))

  const blueprint = {
    blueprint: {
      icons: [{ signal: { type: 'item', name: 'constant-combinator' }, index: 1 }],
      entities,
      item: 'blueprint',
      version: 281479277838336,
    },
  }

  print('blueprint.js', inspect(blueprint))

  write_blueprint_string(blueprint).then((generated_bp_str) => {
    print('generated_bp_str.txt', generated_bp_str)
    console.log(generated_bp_str)
  })
}

/*
[virtual-signal=signal-everything]
[virtual-signal=signal-anything]
[virtual-signal=signal-each]
[virtual-signal=signal-2]
[virtual-signal=signal-B]
[virtual-signal=signal-grey]
[virtual-signal=signal-red]
[virtual-signal=signal-check]
[item=copper-cable]
[item=iron-gear-wheel]
[item=electric-engine-unit]
*/

/*
[entity=crude-oil]
[virtual-signal=signal-curclose]
[virtual-signal=sl-own-x]
[virtual-signal=signal-stopname-richtext]
[virtual-signal=spidersentinel-tag-marker]
[entity=cliff]
[entity=autodrive-passenger]
[entity=tree-09]
[entity=behemoth-biter-corpse]
[entity=tree-09-stump]
[item=<artillery-shell:slowdown-capsule>]
[item=<artillery-shell:atomic-bomb>]
[item=spidersentinel-spider-mother-item]
[item=spider-mother]
*/
