import { Component, OnInit,Inject, Input } from '@angular/core';

// import { default as _rollupMoment, Moment } from 'moment';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog'; 
import * as _moment from 'moment';   
import { CrearPartituraDialogComponent } from '../crear-partitura-dialog/crear-partitura-dialog.component';



const ILUSTRACION_WORD = `
<?xml version="1.0" encoding="iso-8859-1"?>
<!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
<path style="fill:#ECEFF1;" d="M496,432.004H272c-8.832,0-16-7.136-16-16s0-311.168,0-320s7.168-16,16-16h224
	c8.832,0,16,7.168,16,16v320C512,424.868,504.832,432.004,496,432.004z"/>
<g>
	<path style="fill:#1976D2;" d="M432,176.004H272c-8.832,0-16-7.136-16-16s7.168-16,16-16h160c8.832,0,16,7.168,16,16
		S440.832,176.004,432,176.004z"/>
	<path style="fill:#1976D2;" d="M432,240.004H272c-8.832,0-16-7.136-16-16s7.168-16,16-16h160c8.832,0,16,7.168,16,16
		S440.832,240.004,432,240.004z"/>
	<path style="fill:#1976D2;" d="M432,304.004H272c-8.832,0-16-7.136-16-16c0-8.864,7.168-16,16-16h160c8.832,0,16,7.168,16,16
		S440.832,304.004,432,304.004z"/>
	<path style="fill:#1976D2;" d="M432,368.004H272c-8.832,0-16-7.136-16-16s7.168-16,16-16h160c8.832,0,16,7.168,16,16
		S440.832,368.004,432,368.004z"/>
</g>
<path style="fill:#1565C0;" d="M282.208,19.716c-3.648-3.072-8.544-4.352-13.152-3.424l-256,48C5.504,65.7,0,72.324,0,80.004v352
	c0,7.68,5.472,14.304,13.056,15.712l256,48c0.992,0.192,1.952,0.288,2.944,0.288c3.712,0,7.328-1.28,10.208-3.68
	c3.68-3.04,5.792-7.552,5.792-12.32v-448C288,27.236,285.888,22.756,282.208,19.716z"/>
<path style="fill:#FAFAFA;" d="M207.904,337.796c-0.832,7.328-6.592,13.184-13.92,14.08c-0.672,0.096-1.312,0.128-1.984,0.128
	c-6.592,0-12.608-4.096-14.976-10.368L144,253.572l-33.024,88.064c-2.56,6.848-9.28,11.04-16.704,10.272
	c-7.264-0.768-13.088-6.4-14.112-13.664l-16-112c-1.248-8.704,4.832-16.832,13.568-18.08c8.768-1.28,16.864,4.832,18.112,13.568
	l7.136,50.048l26.016-69.408c4.672-12.48,25.28-12.48,29.984,0l24.512,65.344l8.608-77.504c0.992-8.768,9.12-15.072,17.664-14.144
	c8.8,1.024,15.104,8.928,14.144,17.696L207.904,337.796z"/>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
</svg>

`;

const ILUSTRACION_EXCEL = `
<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_226_5436)">
<path d="M13.8139 10.488L5.11621 8.95312V20.2943C5.11621 20.8121 5.53602 21.2323 6.05422 21.2323H21.0623C21.5801 21.2323 22.0003 20.8125 22.0003 20.2943V16.116L13.8139 10.488Z" fill="#185C37"/>
<path d="M13.8139 0.767578H6.05422C5.53645 0.767578 5.11621 1.18738 5.11621 1.70559V5.88387L13.8139 11.0002L18.4185 12.535L21.9999 11.0002V5.88387L13.8139 0.767578Z" fill="#21A366"/>
<path d="M5.11621 5.88281H13.8139V10.9991H5.11621V5.88281Z" fill="#107C41"/>
<path opacity="0.1" d="M11.3411 4.86133H5.11621V17.6518H11.3411C11.8584 17.6501 12.2774 17.2312 12.2791 16.7138V5.79891C12.2774 5.28156 11.8584 4.86305 11.3411 4.86133Z" fill="#222222"/>
<path opacity="0.2" d="M10.8298 5.37109H5.11621V18.162H10.8298C11.3471 18.1603 11.766 17.7414 11.7678 17.224V6.3091C11.7656 5.79176 11.3467 5.37281 10.8298 5.37109Z" fill="#222222"/>
<path opacity="0.2" d="M10.8298 5.37109H5.11621V17.1385H10.8298C11.3471 17.1368 11.766 16.7179 11.7678 16.2005V6.3091C11.7656 5.79176 11.3467 5.37281 10.8298 5.37109Z" fill="#222222"/>
<path opacity="0.2" d="M10.318 5.37109H5.11621V17.1385H10.318C10.8354 17.1368 11.2543 16.7179 11.256 16.2005V6.3091C11.2539 5.79176 10.8354 5.37281 10.318 5.37109Z" fill="#222222"/>
<path d="M0.938008 5.37109H10.3181C10.8359 5.37109 11.2561 5.7909 11.2561 6.3091V15.6892C11.2561 16.207 10.8363 16.6272 10.3181 16.6272H0.938008C0.419805 16.6272 0 16.2074 0 15.6892V6.3091C0 5.7909 0.419805 5.37109 0.938008 5.37109Z" fill="url(#paint0_linear_226_5436)"/>
<path d="M2.9043 14.048L4.87699 10.9912L3.0693 7.95117H4.52336L5.50992 9.89551C5.60102 10.0803 5.66332 10.2173 5.69727 10.308H5.71016C5.77504 10.1606 5.84336 10.0175 5.91469 9.87875L6.96914 7.95246H8.30418L6.45051 10.9745L8.35102 14.0484H6.93047L5.79094 11.9146C5.73723 11.8239 5.69168 11.7286 5.65473 11.6297H5.63797C5.60445 11.7264 5.5602 11.8192 5.50605 11.906L4.33301 14.0489L2.9043 14.048Z" fill="white"/>
<path d="M21.0624 0.767578H13.8145V5.88387H22.0004V1.70559C22.0004 1.18738 21.5806 0.767578 21.0624 0.767578Z" fill="#33C481"/>
<path d="M13.8145 11H22.0004V16.1163H13.8145V11Z" fill="#107C41"/>
</g>
<defs>
<linearGradient id="paint0_linear_226_5436" x1="1.95536" y1="4.63844" x2="9.30045" y2="17.3598" gradientUnits="userSpaceOnUse">
<stop stop-color="#18884F"/>
<stop offset="0.5" stop-color="#117E43"/>
<stop offset="1" stop-color="#0B6631"/>
</linearGradient>
<clipPath id="clip0_226_5436">
<rect width="22" height="22" fill="white"/>
</clipPath>
</defs>
</svg>
`;

const ILUSTRACION_POWERPOINT = `
<?xml version="1.0" encoding="iso-8859-1"?>
<!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
<path style="fill:#ECEFF1;" d="M496,80.011H272c-8.832,0-16,7.168-16,16v320c0,8.832,7.168,16,16,16h224c8.832,0,16-7.168,16-16
	v-320C512,87.179,504.832,80.011,496,80.011z"/>
<g>
	<path style="fill:#F57C00;" d="M432,368.011H272c-8.832,0-16-7.168-16-16s7.168-16,16-16h160c8.832,0,16,7.168,16,16
		S440.832,368.011,432,368.011z"/>
	<path style="fill:#F57C00;" d="M352,144.011c-44.192,0-80,35.808-80,80s35.808,80,80,80s80-35.808,80-80h-80V144.011z"/>
	<path style="fill:#F57C00;" d="M384,112.011v80h80C464,147.819,428.192,112.011,384,112.011z"/>
</g>
<path style="fill:#EF6C00;" d="M282.208,19.691c-3.648-3.04-8.544-4.352-13.152-3.392l-256,48C5.472,65.707,0,72.299,0,80.011v352
	c0,7.68,5.472,14.304,13.056,15.712l256,48c0.96,0.192,1.952,0.288,2.944,0.288c3.712,0,7.328-1.28,10.208-3.68
	c3.68-3.04,5.792-7.584,5.792-12.32v-448C288,27.243,285.888,22.731,282.208,19.691z"/>
<path style="fill:#FAFAFA;" d="M112,368.011c-8.832,0-16-7.168-16-16v-160c0-8.832,7.168-16,16-16h48c35.296,0,64,28.704,64,64
	s-28.704,64-64,64h-32v48C128,360.843,120.832,368.011,112,368.011z M128,272.011h32c17.632,0,32-14.368,32-32s-14.368-32-32-32h-32
	V272.011z"/>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
</svg>

`;

const ILUSTRACION_TEXTO = `
<svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<rect x="0.0888672" y="0.416138" width="40.022" height="40.022" fill="url(#pattern0)"/>
<defs>
<pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
<use xlink:href="#image0_303_642" transform="scale(0.00390625)"/>
</pattern>
<image id="image0_303_642" width="256" height="256" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAYAAABccqhmAAAaPUlEQVR42u1de3AW13U/K8RDEkIYGwwCSWAwT/OwMWBixzxsTOq0AXfqdDKTaSGZSZN2OoPTxHnU6WOmMxm3JXbstnaTmUDzhzONZ0ritnFqwIBjU4xJbWzeCCweRhiBMdbL5qHbu5+0YrXa/bTf993dPffe3xl2vif7Xd3d3znnd8859zhkkQxe9/Q8+bBOHkvl0RD4+IQ8tstj45Un/3w7xoo5tUEcS4A/0b2w8lgS87/skMcaeSM0YayYUygAvcG/uufi1xT4Xy/13AS/wFgxp1AA+oJ/U4mneSiNm0CXsWJOzZIyC9z+UmVjz7msHyvmFApAJynG7QuTGkU3kgljxZyCAmhh/ZfKh22KT3u7dAXfsnWsmNNkxgoPIBlZk8A511k+VswpKIA2slSTc+o0VswpFIA20qDJOXUaK+YUCgACgUABQCAQKAAIBAIFAIFAoAAgEAgUAAQCIWQClih/faR9jXxYTd3x1z4pnUL0Pgv9v99/ZkMiY3r0T/6Y+v1y+BDk25Ef9Plv63/800TG+siXvxg1gt5fFyL/OYTv2VM/eS6Rcf7Zmi8E5lBQ9Kuweez/jWd++u+JjPUrX3y4/zDEQBWFYrt8/MW/LBi3kSPOyhkCf2lP7nVo3HUg8IuEx1c08EPAn8o4SwR+4gMW6oCftogBhyBcw7VKfm/V13Y3/418vuaZheO2QwHkt/obOAJfpdVPd9TxgZ86+BMAvhAsgB/2PdegbZOKYK1UAhuhAPqDf518eKJk4IvUzSpj4DO1+oUqcCbgLxL4Qdnw1d3N9CwTJVDOyO1/InqyGYA/AeALDYAvsgQ/I6uveL6lEjjT9OzC2u1QANRbu63A6otsgc8G/HoAP/J3zAW+/49z7/mJ1iuAHt7foAL4QierL7K+ZbMHfzLAF7pQq4avvn5mzbOLajfangew2p3E7okUkRASkW/0B/+I6uHKBzlieFX4jdkzFhEKddH/VeCL7nlVS3XEOUWf2eo/aJHHIlcnPc6SwS96/3d1VaXysQ7vPWfP7wglXtZq6z0AOYlLVVv9+tqxtO9wo9Jx1slzFrvAl8/qTxg3lg4cPaZ0rBPG3azG4vtAOX7sGDrU+K7ScdbePEYR8Pv+DePkWFuPNakfq/p1laVYA+iOlSp19xfMnqlcAcyfPUO5u+++fcdt05UrgNtnTY+9sh93AW7ezGnKFcDcGVOVAt+TOdOn0hHFCuC26VOSWFepIdszAf/qcJtQzfPdC/WzF35Np5rPqrH+0qL+4e+tVAp8/7Pn/2sznT77vpKxupb6Dx5cocTqB2XTr7fSe2fPKbKoo2nVyuVqwe9744XN26j5/RYlYx03ZjR99v4liayp/OuiWge1AFH8s0Dw+9cSHlx2Nw0dMqTkcbnn+MySu0vi+QPdLCuXLJa/M1jBWAfTins/VTTP7/66iLTK991zFw1RME73HMvvXhTjOkbzfJHn5nGfLl28kIYMVjBWeY57F9+ZAPhFtivBnDwAFcAPm+6jTSdp0/+Utjns6hXLaPLEuvgZbKK4G6XxxCn6zy07ShrrZ++7lyY3TCjK4sfi4fI4fvI0vfjyb0oa52eW3UOT6sYrtfhhc9x06j16acfOksbqKtSGCbWKgX/9b/3RXeMdqxXA9/wUQBHw/e+6SuDFba/RJ5cvF2z5f0da/v7gVwt8/8tjUgm89MpOOdYrBVvUFZ9eXDT44wDf/+T4yVO09bXX6XIR43QtfxD8QsS2r7HB74mrBLbvfIMuX7lSsOVfsnhBP/CrAr4nUACuAiiS58eKHsgnl1rb6MXtr8o1gfdjc37X7e8bTkwO+H75qK0tZ7VOx+TaLudfce/i7nBiwsD3n7G1rZ22vPo6nXn/XGzO74I/GE5UbfXD7pPW9nbaIZVA87mW2Jzfdfurq6oKSpUupvoSCuBQm1Bt9aM+PnfhA9rzzgE6deasBFo7BeP8bqjvjttm0JgbR5WUyKPCSrR8cJHe3H+ITkul1RoYqwsiN9Q3b9Y0Gj3qhuSAH6Na77wc594DR3KKoN84JYBqx46mOTOm0U2jRqYO/KBcuPgh7Tt0NDfWtvYOCsb5x0klddu0W+nGG0YmavWhAPoogFaRNPCVp++K5ICfWAafAqufbN5+ocAvDPzpznf88/84YwVQziOTunjgp1GmmzXwVSXz8AR+slY/C+AX9huEYqDUrX5KwM/U6icN/EysflrAT8GLE1AAbIGvtbtfwI45+rj7ooRqQD7uPkcNUG4F8A3i+Xq7+/GAr5O7X5zFF4QdgcDzjeP5err7xZREq7H6AgpAQ56vobsPns/L3edj/3lUA6YEfIPCeuD5WvJ8TsBnuwgYL9FGmMXzjQrr5UnoEmbyfF3Bz28RUFueb4C7D56frtVHGJAP8E1w9+OEmQR4fvbuPqPGJnwyAYsEvtHpuwWW6erM8/UO66lfULXLA0BYT1ueb1L6bqI8nyHwGS8CgucnDXwz03dTSMc2CPjsFAB4vtoyXYT1AHxN1gBQposyXf3y9pUqc3gA4Pko02VWppvUfCMMmD3wkb6LMt3sgY8wIMp0kb5rBc/nCn5WYUCU6aJMN5vrmZ3VRzUgA+AjfRfpuzYCn+EaQLHAR/ou0ncF4wU+3kVB5XqDHzwf6bs80ncL/g1EAfLcaijTRZmuJum7ugJfs2pApO/axPNNCOsVtqCKakCLynRNDOvZVaZbKvgFIxXAuBoQ6bvg+WbxfE7A578lGNJ3kb5rCM/nCHyG1YAWp+/aUKZrYPquigVVKACE9ZC+ayHPFwgDhty+4PlI3+VSpms48HnlAYDnW8rzzQnrqVlQRRQAZboI67Er001uvhEGBM8Hz89uQTUzd18gEQhlukjfJV3KdBOw+NgSDGW6KNPVlufrbfUZKwCU6YLnJwh8Tu4+woC8uuwcbDxOu9/aR61t7QQxV6oqK2nurGk0eWK91cBnFQZMdFPIGFZiy6u76FDju0CHBdLe0UE733iTzracp08tuCMhD6uYrdRtXQTM2N13LT/Ab58cbzpFN4++iSY31CtMnNIH+Lz7AqTI8123H2KnvL3/cB8FkD7wkQeQefouOL/ddCAtns8R/OwUAIfVfYhdIopO3y3R6iMKAOBD+OagJg18JAKVUg1oSFcWCEN1YAnwNa0GNLM5A0RD4BsAfr2qAQF8CKy+hdWAAD4kdfCnA3yBMCCPMl0IRFk8XyPw800ESrFar7qqilrbkQtgo1RVVgycApSU1UcYkEeZ7p3zZtG213YDDRbK7JnT03f3UQzEq0x3+uRJdObsOTp8rAmIsEhuaaiTx4RUFvgE49XAchutflCW372Iam8eQ3v27gcdsMDtnz1zGk2SCkAUHI1Sa/VRDchoO65p0hNwj1g1Yeiyo+m22zzcfVQDUvY3IrrpmtdlJ+t4vk7A16Aa0OTdd1PY9xBddlJN5Ckc/AgDarztNrrsaLntdiFluolZfYQB0WUnQeCjyw5Xdx/VgNEThS47pe17iC47rOL5OtUGlDM0/+iyA56fycYctlh9fuXA6KabEvDN67KTRpmuicA3rhoQXXbA8wF8o3oDosuOHsA3L6yXBs8XiAKYAHwDeL5BYb1s0neLBT7yANBNF+m7Gqfv6g18LasBkb6rF/DNTN8tYvMPxhvSlsPdB89H+m42Vh/VgAyAb1L6rg083wR3H4lAJTcNFSjTBc9nGdbTCfxsFYC2PN/A9F17y3QTtvoIAyKsB55vIc9HGBBluijT1T99tyhXX8RtSWrTIqBAmS7Sdw3n+QyBz3gNAGE9lOlyT9/VH/gMFQB4fjEdjcxL3+VXpmsi8NmVA1tZpmtkWI9Pl5000nd1Bj+/LcFQpssI+Aam7xbiVSRs9VENOHBVKXg+ynSjs0Y1dfdRDaggsQTpuyjT1ZHncywKKtcN/EjfRfqubjwf1YBUhAueMvCPHj9B/7fvALW1dxDEXKmUvQFnTruVJtZPsM7dZ74GkB3Pf2XXHjr67gmgwwLp6OikPW++TS3nP6A7b59tLfDZ7gqctrvvWn6A3z45ceo0jb5pFDXUjY9JmdSCH1GAkiZHHc933X6InXLg0NFeBZCW1RcCHkD6wM+zOAXObzEd6Oy0FviaVAOmncwDsVYSDOvFyZpENSCAD9EE/KqAj3JgJum7ENvBbx/w+ZcDM0jfhdihAdLh+QJ7AupSpgux0PtP2+ojDAjgQxgrBsOBzyoRiEOZLgSSOM8XaAxScBQgaas/vKoSuQCWSmVFRVHpu2k0q0FjkJTKdOfNmkGv7v4t0GChzJg2JVV3nxPw2SqAtMt0p0xqoLPnWqix6SQQYZHUyxTgugnje+4X+4DPvxw4xW669yyaT2PHjKa39h8EHbDA7Z8+dUpOAajI4NMZ/K44WQ/ga7ubBbrsoMsOt+240upXsWnldAf7AaDLDrrpFt1XT7CK56vZtt62/QCwHRe67GRs9Xm0oceegOimiy47jOrzzbT6zBcBwfPB83mU6SYNfIE8gCSAb16XHXTTNY/nC/QFsKnLDni+CTxfqdVHMRC66YLnmxfW0wX4elcDostO+DvosgPgm1gNiC476LKjNc+PPd+oBtQO+Ca4+0q8Cl15fgZWH1uCESOLj7AeeH5mwEcYEDzf0m66Jrn7JS2oQgGA5+vJ85G+q2K+oQCQvpsR8E1M3xUpKfN08ifsyQRE+i54Ppnh7sex+FgEjNYAKNNF+q5BYT2eVp91e3Ck7yJ9N7m5ttvd17MaEOm7KNPV1N0XhGrAxIFvAs9H+q7uPF9P8PNNBEKZLtJ3DeX5qAZkBXwD03dRpsvb3Uc1oErgmxfWEzF4AdJ39Yrnc64ILIe7j/Rd8PxsrD6qAZG+C56vYfquCcA3rxoQZboo09WA5wtQAEL6Lsp0reP5gqkmKAfwu79//MQpeufAYWrv6CSIuVJRMYymTrmFJoyvzcaLE4RyYG48f9eet3IKAGK+dHZ+THvfOUAXPrhIc2bPygz4qAYsthpQsbt/TAIf4LdPTr/XTKNG3SA9gXHJ83ym4GfWGiwbnr9Puv0QO+Vo4/FuBWCZ1derGjDhBT5wfrvpQEhvWiuAz78aMIMyXYh9IhJe4ON+i5WbAH4AH5JYcpqgFHZBQjkwo/RdCMCfBvARBkwM+AA/hC/wed195ZzAn02ZLgTALzBvX3Orz3wRMIOmmhCsBGbg7qMakEmZLgTgtw34bPMA0i7TraqsQC4A2VsXkPZ+CKgGLKljsPpqvVkzptLu3+4FGiyUKZMnZWf1EQbkUaY7qb6OzrVcoKaTp4EIi2R87bjckR3wEQZk02Vn0fx5NGb0jbTv4BHqAB0w3u13LX9tEPxp8HyGKcLlNlr9sDDQxLoJuQO771q2HVcaPB/VgIUvCqLLDrrscCvTNQn4DBUAtuNCl50i9z3MOH0X1YBJAN/A3XfRTVcvdz/R3ZQRBaAS8vbRZQdddordgDNjq88sB02TakDwfPB8zd19gUQgKrwaMEVeCJ6vRzddpsAvDvxoD44uO+D57Mt01Vt9lAMzaMckBihHRpcd7dprsXf3BaEakBDWQ5cdG3k+P/AzTAQyq5uuSe4+y266nNJ3C7X6CAPqAHyk7yJ910zg80oESrTtsjCymy7SdzXj+QKZgAPhHzzfEJ5vfPquIvALhAGRvssS+EjfNR74rHcEQvpuKQVSAjyfqbsvsCtw6cBH+q6mPN+osF4elasR+PltCYb0XaTv2sLzEQYEz0f6roU8H9WAIRMFno8yXUPCeiIGd8WWYETJrzYjrIf0XcUFO6ZYfeaLgOD5SN9Vtd8+d3cfeQAo0wXPN8/djzWH6AugbvMPlOmiTDfl9N1Srb5AFMCcvH3wfAPLdIXZwNe7GhBluijTFXrxfIFiIAXVgCjTBc/XkOdzBT+rMCDKdFGmaxvPx5ZgrIBvcJcdlOmycvcFIQyo3jVEWA/puxrwfE7gZ6sAUKarD/CNTt+N5TkVafURBkSZLsp0dU7f1Rv4vKoBkb6LMl3Teb7AImCemwXpu+D5BvN8QRy3AuChAIY6XfSJcFCmi/RdxmW6aqx+8L8PdRAFoLpBV6nx6mCk7yJ9V9v03WIt/sTyK1AA04Z2SQUAno8yXUPi+bHdfUEzh8EDoLkV1+iVzi76qKsM6btI39Umfbd4nt/9yQhJfRdWO1AAgwYNot+t+piea61EmS7SdzVK3y0O+N75Hx51LXfvW68AHMehW4Y59ODVTvpVxzDwfAt5vglhvThxD+83fn/EZbq1oozKysqgANxJEHJm5lVelY9SCXRWgOejTNeQsF7/33io+hNaMNzJ3fccFEDmJOTw4cOiq6uLrly5QteuXaN3Pyb6b6kEWsUg8HzwfK15vv/8NWVdOcs/tbIs5/p7x7x58xyrFcCRI0dyCsAFv3e4yuDtT8rpqAwPnr42hC5TGdJ3wfO14/lD5et6GeqbOfQa3Vkl+gDfPVwPYO7cuXYrgMbGRuGCPqgEvPfc4+rVq73PvcOlDd7RPekht5bCnRhEArs6qD6nDmPUTdy/312nyreG5X3uufXe4YHc/+g99445c+Y4WAMI3GTepLpKwH30vhMFfv+NGnzfFgDooExMUFR+ZRB87h0euP3Pww5EAXoUQHCCXeB7zz3Au4/ehAaBHqYQYE35jVOXOY1zTg/8QQ8gTBGEKQPPE4AC8E2CB3j/c+9wvxe0/lHuf6k3ha2uuU7uftbADyqBMC8gzCMIUgAogIhJ8E+eXwl4wPcURb41APB8uPtp0AE/8MM8gig6kG9twVoPwDs8l9+92EHr7ymD4M1Q7I0Bng93v9R1AD/wwxRCEPz5jJ91mYBBMHuT5oHdW4n1FIB/4bBUBQB3H+scpVp/79G7T/MpgKB3CwUQYfWjrL93eJ/nu6D5LjLcfcLfX6TVH+i9MPD7jR0nBZA5CTl37pzwLkoQ6FHx/qD1L+Siwt23091P+rpHuf9+qhumHBoaGuxOBGppaRFhIPfAHxXyi7qwURfaVtdct0QeHRcNw2hAlDcQPOrq6uxWAOfPnxdB4Ecl9gwE/qiLDp4Pd18VyKPOGRUSjPIKPGVRX1/vWL8G4Ln/YZmBfq4fBWqdrT7CenrNaVQmYJQSCFMKnLyyzD2A5lNNYnDF8FBOPxDHH+h91AIA+EnXAsRNEPKfy3u82tlGk6bOsNsDeG/fLpq0cEXeiR7I/YqzOgt3H39/kueL8gbCzuN5AmcOvgEPYMNja8XnHvnH2Pw9LXcfPN/eBclCxxlWzBZGYYOfbf7nv6S13/83uxcB/3T+cPGt5/6XqkePLwrw4Plw9zmcsxCv0/1u2/kz9KOv3EfrX//IbgWwbuFwMX7WXfTl9T8v6IJ4i4a48eH1cDhfUAHk8wpc+dljf0QtkgI8vstyBfDo4mrRflnQ/JUP0+pvrI91oeDuA/iclclA3sCLT3+XDm7bRBWDHPq7nZfsVgDfu6dafCwbg3Rc6VYCD33zB+D54PlGntNVDL966ju0/+VNNEwuvw+RCuBvf3PJ7ijA4DK5IlruTpxDb770PF1oPkWf//aTNGLMeK3cffB8KJN81KC15Qy98MS3qPnAGznwu/d99pUAHBqD5GbBoQo5EjknubDg419YRLev/DzN+fRKqp+zmIZWViu7sOD54PlJbhPml8sdrXRy327a/9pmafX/QwK/TB4OyX+5e53BdgAMMgF7lIA7GbkdU+Tzwdcc2r/ledq7+ed0TRr/rsBOriLkNRWxjXSczr+WMTK1oNP0R50Yp+kGr9P3yjndj+5nrl1zQV5e1m3tKweX5Vz+Mg/8hPbgOXEno0tcnyxJCLqVgDzcnQGFpwB6QC96LrKIce37Kn2H8X3oKPkxAeArP42T77XT9z3HUwB03cK793K5I/cA9Fl9T0lw8AAyH8Ljy0bkcOoqAc/Sd/UAPPcoeqy3D/RBJSBi3ghdbO5WtdMP4Ks7Tdwr4gevE/AAvM9lATCVlfVVCuQDv2vsHtvxod1RgL9fXiO6hOhj4fs9+gAfVAZx3HmRwt0qMpp2YSvwE7T6FNcLCHoAvUrA6eMNUA8l8N7zvuMqhO9uhwIQHsi7y32vg95z4UVe6x+/G48wgefD3U907E4xV9IDfYgX4CkBv+tPPeB3n37HdgXwD/fV9C7QdvWgPcr6B5VBvkXANBb4hMWAM4nnxweLU4AX4Ae8Xxlc9w4ICoBo/f0uBegLbiFEH8D3rvznWwAUhrr7sPiZjt2J+5nf5fcD32f1+3sCRN/eZrkC+MH93R5AP7ffF78NKoM+n+drKimyvoEcJT8mAHwW488XEQguCl6nAn2BH6QGj0IB1Iggt4+0/j6KELy4QnBy92H1tXf3nWLWAfqSBSckTBiMGjz6suUK4MkVPYuA/Sw/xbL8/TK94O7D6ic8difiHSfME4gAvvfZN6EArnsA/YDeXSLQb+FPhPV4F2pvAABf3x8VKYAkzENwYuQJBBXDN7ZargB++ECNCEvqCU31db/nBLwFET99Ezzf7nh+kmDxW3kREhUI9wgc+outF+1WAE89MPJDqQFqwqxg3tAfeD6sfkZjd/JkD0aFB/t7Bbl1gktf33pxpO0K4Jfy4XNhST0ialFfqFUAAD6AX9Id4OSJFDj9cwl8b70gFcAqqxXA0ytHrpUPPwkCuisEKXFBLwB8uPsZASV8bcAJ9Q6kfOnrWy5usL7+VCqBJvnQQFEuvwgp5y1BGdjM82H11YcCC8kY9K0TnJDgn0goQCf6p5Ujl8mHl0VIWq+rDOIu8IkY34LVB/BLA4xTFDUIebn8kS0Xt0EBBKhAX6ufb4eX6D9AoGAHwGeCooiPvvRIxq4/yy1ockpA+JSAgpsiC4uPsB5Zl4hUwJ3DBvws96B6+oGRy+SgNgjfmgD7eD6svrXAL+DOOiH/rrUc3H4tNqGTimCtXIRZJe+GpfJljUBYD8DXzxu4JF9sl3T1l5ysvl/+H/k/yDaiuH2aAAAAAElFTkSuQmCC"/>
</defs>
</svg>
`;

const ILUSTRACION_IMAGEN = `
<svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<rect x="0.890625" y="0.416138" width="40.022" height="40.022" fill="url(#pattern0)"/>
<defs>
<pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
<use xlink:href="#image0_304_630" transform="scale(0.00390625)"/>
</pattern>
<image id="image0_304_630" width="256" height="256" xlink:href="data:image/png;base64,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"/>
</defs>
</svg>
`;

const ILUSTRACION_PDF = `
<?xml version="1.0" encoding="iso-8859-1"?>
<!-- Generator: Adobe Illustrator 18.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 56 56" style="enable-background:new 0 0 56 56;" xml:space="preserve">
<g>
	<path style="fill:#E9E9E0;" d="M36.985,0H7.963C7.155,0,6.5,0.655,6.5,1.926V55c0,0.345,0.655,1,1.463,1h40.074
		c0.808,0,1.463-0.655,1.463-1V12.978c0-0.696-0.093-0.92-0.257-1.085L37.607,0.257C37.442,0.093,37.218,0,36.985,0z"/>
	<polygon style="fill:#D9D7CA;" points="37.5,0.151 37.5,12 49.349,12 	"/>
	<path style="fill:#CC4B4C;" d="M19.514,33.324L19.514,33.324c-0.348,0-0.682-0.113-0.967-0.326
		c-1.041-0.781-1.181-1.65-1.115-2.242c0.182-1.628,2.195-3.332,5.985-5.068c1.504-3.296,2.935-7.357,3.788-10.75
		c-0.998-2.172-1.968-4.99-1.261-6.643c0.248-0.579,0.557-1.023,1.134-1.215c0.228-0.076,0.804-0.172,1.016-0.172
		c0.504,0,0.947,0.649,1.261,1.049c0.295,0.376,0.964,1.173-0.373,6.802c1.348,2.784,3.258,5.62,5.088,7.562
		c1.311-0.237,2.439-0.358,3.358-0.358c1.566,0,2.515,0.365,2.902,1.117c0.32,0.622,0.189,1.349-0.39,2.16
		c-0.557,0.779-1.325,1.191-2.22,1.191c-1.216,0-2.632-0.768-4.211-2.285c-2.837,0.593-6.15,1.651-8.828,2.822
		c-0.836,1.774-1.637,3.203-2.383,4.251C21.273,32.654,20.389,33.324,19.514,33.324z M22.176,28.198
		c-2.137,1.201-3.008,2.188-3.071,2.744c-0.01,0.092-0.037,0.334,0.431,0.692C19.685,31.587,20.555,31.19,22.176,28.198z
		 M35.813,23.756c0.815,0.627,1.014,0.944,1.547,0.944c0.234,0,0.901-0.01,1.21-0.441c0.149-0.209,0.207-0.343,0.23-0.415
		c-0.123-0.065-0.286-0.197-1.175-0.197C37.12,23.648,36.485,23.67,35.813,23.756z M28.343,17.174
		c-0.715,2.474-1.659,5.145-2.674,7.564c2.09-0.811,4.362-1.519,6.496-2.02C30.815,21.15,29.466,19.192,28.343,17.174z
		 M27.736,8.712c-0.098,0.033-1.33,1.757,0.096,3.216C28.781,9.813,27.779,8.698,27.736,8.712z"/>
	<path style="fill:#CC4B4C;" d="M48.037,56H7.963C7.155,56,6.5,55.345,6.5,54.537V39h43v15.537C49.5,55.345,48.845,56,48.037,56z"/>
	<g>
		<path style="fill:#FFFFFF;" d="M17.385,53h-1.641V42.924h2.898c0.428,0,0.852,0.068,1.271,0.205
			c0.419,0.137,0.795,0.342,1.128,0.615c0.333,0.273,0.602,0.604,0.807,0.991s0.308,0.822,0.308,1.306
			c0,0.511-0.087,0.973-0.26,1.388c-0.173,0.415-0.415,0.764-0.725,1.046c-0.31,0.282-0.684,0.501-1.121,0.656
			s-0.921,0.232-1.449,0.232h-1.217V53z M17.385,44.168v3.992h1.504c0.2,0,0.398-0.034,0.595-0.103
			c0.196-0.068,0.376-0.18,0.54-0.335c0.164-0.155,0.296-0.371,0.396-0.649c0.1-0.278,0.15-0.622,0.15-1.032
			c0-0.164-0.023-0.354-0.068-0.567c-0.046-0.214-0.139-0.419-0.28-0.615c-0.142-0.196-0.34-0.36-0.595-0.492
			c-0.255-0.132-0.593-0.198-1.012-0.198H17.385z"/>
		<path style="fill:#FFFFFF;" d="M32.219,47.682c0,0.829-0.089,1.538-0.267,2.126s-0.403,1.08-0.677,1.477s-0.581,0.709-0.923,0.937
			s-0.672,0.398-0.991,0.513c-0.319,0.114-0.611,0.187-0.875,0.219C28.222,52.984,28.026,53,27.898,53h-3.814V42.924h3.035
			c0.848,0,1.593,0.135,2.235,0.403s1.176,0.627,1.6,1.073s0.74,0.955,0.95,1.524C32.114,46.494,32.219,47.08,32.219,47.682z
			 M27.352,51.797c1.112,0,1.914-0.355,2.406-1.066s0.738-1.741,0.738-3.09c0-0.419-0.05-0.834-0.15-1.244
			c-0.101-0.41-0.294-0.781-0.581-1.114s-0.677-0.602-1.169-0.807s-1.13-0.308-1.914-0.308h-0.957v7.629H27.352z"/>
		<path style="fill:#FFFFFF;" d="M36.266,44.168v3.172h4.211v1.121h-4.211V53h-1.668V42.924H40.9v1.244H36.266z"/>
	</g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
</svg>

`;

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {

    typeFile: string;
    visorPage?: any;
    routePage: string;
    previewDoc: boolean = false;

    @Input() cancion!: any ;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: { src: string, name: string , content:any}, 
        public _matDialogRef: MatDialogRef<PreviewComponent>,
        private _domSanitizer: DomSanitizer, 
        private _matIcon: MatIconRegistry,
        public dialog: MatDialog,
    ) { 
        console.log(data);
        this.typeFile = data.src.slice(data.src.lastIndexOf('.'));
        let cadena = this.typeFile;
        if(cadena == '.doc' || cadena == '.docx' || cadena == '.xls' || cadena == '.xlsx' || cadena == '.ppt' || cadena == '.pptx') {
            this.previewDoc = true;
            this.visorPage = 'office';
            this.routePage = this.data.src;
        } else if (cadena == '.pdf' || cadena == '.txt') {
            this.previewDoc = true;
            this.visorPage = 'google';
            this.routePage = this.data.src;
        } else  {
            this.previewDoc = false;
            this.routePage = this.data.src;
        }

        this._matIcon.addSvgIconLiteral('word', this._domSanitizer.bypassSecurityTrustHtml(ILUSTRACION_WORD));
        this._matIcon.addSvgIconLiteral('excel', this._domSanitizer.bypassSecurityTrustHtml(ILUSTRACION_EXCEL));
        this._matIcon.addSvgIconLiteral('powerpoint', this._domSanitizer.bypassSecurityTrustHtml(ILUSTRACION_POWERPOINT));
        this._matIcon.addSvgIconLiteral('text', this._domSanitizer.bypassSecurityTrustHtml(ILUSTRACION_TEXTO));
        this._matIcon.addSvgIconLiteral('image', this._domSanitizer.bypassSecurityTrustHtml(ILUSTRACION_IMAGEN));
        this._matIcon.addSvgIconLiteral('pdf', this._domSanitizer.bypassSecurityTrustHtml(ILUSTRACION_PDF));
    }
    ngOnInit(): void { 
        if(this.data?.content?.hasOwnProperty('_id')){
            this.cancion=this.data.content;
          }
    }
    convertIconFormat(icon: string): string {
        let newicon = icon;
        if(icon == '.doc' || icon == '.docx') return newicon = 'word';
        else if(icon == '.xls' || icon == '.xlsx') return newicon = 'excel';
        else if(icon == '.ppt' || icon == '.pptx') return newicon = 'powerpoint';
        else if(icon == '.txt') return newicon = 'text';
        else if(icon == '.pdf') return newicon = 'pdf';
        else return newicon = 'image';
    }
    

    async downloadFile() {
        const url = this.data.src.valueOf();
        const image = await fetch(url);
        const imageBlob = await image.blob();
        const imageUrl = URL.createObjectURL(imageBlob);
        const link = document.createElement('a');
        
        link.href = imageUrl;
        link.download = `${this.data.name}`;
        document.body.appendChild(link);
        
        link.click();
        document.body.removeChild(link);
    }

    closeDialog() {
        this._matDialogRef.close();
    }

    //Editar pdf   
    editPartitura(){
        this._matDialogRef.close(this.cancion);
        this.openDialog(this.cancion);
    }
    openDialog(cancion?: any): void {
        const config={
        data:{
            content:this.cancion
        }
        };
        const dialogRef= this.dialog.open(CrearPartituraDialogComponent,config);
        dialogRef.afterClosed().subscribe(resp=>{
        if(resp){
            console.log("onEditCancion",resp);
        }
        });
  }
}
