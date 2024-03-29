import { Component, OnInit, Input, Inject, ViewChild, ElementRef } from '@angular/core';
import { CrearPartituraDialogComponent } from '../crear-partitura-dialog/crear-partitura-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UploadService } from '../../../../shared/services/upload.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

const CARGAR_ARCHIVO_NONE =`
<svg width="348" height="171" viewBox="0 0 348 171" fill="none" xmlns="http://www.w3.org/2000/svg">
 <mask height="50" width="39" y="35" x="156" maskUnits="userSpaceOnUse" id="mask0_3417_12649">
  <path id="svg_1" fill="#555555" d="m156,84.5154l0,-48.5662l24.283,0l1.735,13.0088l12.141,0.8673l0,34.6901l-38.159,0z"/>
 </mask>
 <g>
  <title>Layer 1</title>
  <rect id="svg_2" stroke-dasharray="6 6" stroke="#FFBABA" fill="#FFE7E7" rx="4.5" height="170" width="347" y="0.5" x="0.5"/>
  <path id="svg_3" fill="#3EAEFF" d="m122.137,116.66c0,-1.02 -0.564,-1.812 -1.668,-2.04c0.948,-0.252 1.428,-0.96 1.428,-1.908c0,-1.344 -0.972,-2.256 -2.736,-2.256l-4.008,0l0,8.544l4.248,0c1.764,0 2.736,-0.996 2.736,-2.34zm-1.332,-0.096c0,0.84 -0.528,1.428 -1.548,1.428l-2.772,0l0,-2.856l2.772,0c1.02,0 1.548,0.588 1.548,1.428zm-0.24,-3.756c0,0.84 -0.528,1.344 -1.548,1.344l-2.532,0l0,-2.688l2.532,0c1.02,0 1.548,0.504 1.548,1.344zm4.631,6.312c1.032,0 1.62,-0.48 1.968,-1.188l0,1.068l1.212,0l0,-6.192l-1.272,0l0,3.456c0,1.128 -0.6,1.824 -1.524,1.824c-0.876,0 -1.212,-0.48 -1.212,-1.416l0,-3.864l-1.272,0l0,4.092c0,1.5 0.684,2.22 2.1,2.22zm6.829,0c1.944,0 2.688,-0.852 2.688,-1.92c0,-1.128 -0.768,-1.584 -2.028,-1.764l-1.14,-0.168c-0.48,-0.072 -0.768,-0.252 -0.768,-0.756c0,-0.6 0.336,-0.972 1.236,-0.972c1.056,0 1.248,0.516 1.308,1.092l1.224,0c0,-1.092 -0.672,-1.944 -2.52,-1.944c-1.848,0 -2.52,0.852 -2.52,1.92c0,1.032 0.552,1.488 1.848,1.668l1.14,0.168c0.588,0.084 0.948,0.336 0.948,0.828c0,0.528 -0.324,0.996 -1.404,0.996c-1.104,0 -1.416,-0.48 -1.476,-1.188l-1.224,0c0,1.188 0.744,2.04 2.688,2.04zm6.406,0c1.884,0 2.808,-1.176 2.808,-2.448l-1.176,0c-0.132,0.984 -0.708,1.476 -1.632,1.476c-1.08,0 -1.728,-0.744 -1.728,-2.244c0,-1.488 0.648,-2.244 1.728,-2.244c1.056,0 1.512,0.66 1.632,1.428l1.176,0c0,-1.152 -0.852,-2.4 -2.808,-2.4c-1.908,0 -3,1.248 -3,3.216c0,1.968 1.092,3.216 3,3.216zm5.63,0c1.068,0 1.752,-0.396 2.088,-1.188c0,0.576 0.072,0.828 0.264,1.068l1.14,0c-0.12,-0.204 -0.192,-0.744 -0.192,-1.584l0,-2.688c0,-1.248 -0.78,-2.04 -2.592,-2.04c-1.824,0 -2.592,0.792 -2.592,2.04l1.248,0c0.06,-0.768 0.516,-1.128 1.356,-1.128c0.9,0 1.308,0.42 1.308,1.128c0,0.396 -0.216,0.564 -0.948,0.636l-1.2,0.096c-1.536,0.132 -2.1,0.864 -2.1,1.788c0,1.152 0.78,1.872 2.22,1.872zm0.348,-0.876c-0.912,0 -1.296,-0.444 -1.296,-1.08c0,-0.504 0.348,-0.876 1.236,-0.948l0.792,-0.072c0.48,-0.036 0.816,-0.132 0.948,-0.3l0,0.528c0,1.02 -0.588,1.872 -1.68,1.872zm9.972,0.876c1.608,0 2.508,-0.78 2.784,-2.04l-1.164,0c-0.192,0.708 -0.744,1.164 -1.62,1.164c-1.056,0 -1.752,-0.636 -1.788,-2.1l4.68,0c0.012,-0.12 0.024,-0.228 0.024,-0.348c0,-1.776 -1.032,-3.108 -2.988,-3.108c-1.956,0 -2.988,1.308 -2.988,3.216c0,1.968 1.092,3.216 3.06,3.216zm-0.072,-5.556c0.96,0 1.584,0.576 1.716,1.74l-3.432,0c0.132,-1.164 0.756,-1.74 1.716,-1.74zm9.224,5.436l0,-4.092c0,-1.5 -0.684,-2.22 -2.1,-2.22c-1.032,0 -1.632,0.48 -1.968,1.2l0,-1.08l-1.212,0l0,6.192l1.272,0l0,-3.456c0,-1.128 0.6,-1.824 1.524,-1.824c0.876,0 1.212,0.48 1.212,1.416l0,3.864l1.272,0zm6.48,0.06c0.252,0 0.696,-0.036 0.948,-0.06l0,-0.864l-0.66,0.012c-0.564,0 -0.768,-0.156 -0.768,-0.696l0,-3.732l1.428,0l0,-0.912l-1.428,0l0,-1.872l-1.272,0l0,1.872l-1.008,0l0,0.912l1.008,0l0,3.696c0,1.26 0.456,1.644 1.752,1.644zm3.957,0.06c1.032,0 1.62,-0.48 1.968,-1.188l0,1.068l1.212,0l0,-6.192l-1.272,0l0,3.456c0,1.128 -0.6,1.824 -1.524,1.824c-0.876,0 -1.212,-0.48 -1.212,-1.416l0,-3.864l-1.272,0l0,4.092c0,1.5 0.684,2.22 2.1,2.22zm10.2,0c1.968,0 3.06,-1.248 3.06,-3.216c0,-1.968 -1.092,-3.216 -3.06,-3.216c-1.968,0 -3.06,1.248 -3.06,3.216c0,1.968 1.092,3.216 3.06,3.216zm0,-0.972c-1.14,0 -1.788,-0.744 -1.788,-2.244c0,-1.488 0.648,-2.244 1.788,-2.244c1.14,0 1.788,0.756 1.788,2.244c0,1.5 -0.648,2.244 -1.788,2.244zm5.296,0.852l0,-2.94c0,-1.38 0.66,-2.16 1.668,-2.16l0.612,0.024l0,-1.116c-0.156,-0.036 -0.396,-0.072 -0.564,-0.072c-0.9,0 -1.452,0.408 -1.776,1.5l0,-1.428l-1.212,0l0,6.192l1.272,0zm5.313,0.12c1.08,0 1.74,-0.468 2.088,-1.26l0,1.14l1.212,0l0,-8.544l-1.272,0l0,3.408c-0.348,-0.768 -1.032,-1.176 -2.028,-1.176c-1.668,0 -2.7,1.188 -2.7,3.216c0,2.028 1.032,3.216 2.7,3.216zm0.3,-0.972c-1.032,0 -1.728,-0.684 -1.728,-2.244c0,-1.548 0.696,-2.244 1.728,-2.244c1.02,0 1.728,0.696 1.728,2.244c0,1.56 -0.708,2.244 -1.728,2.244zm7.021,0.972c1.608,0 2.508,-0.78 2.784,-2.04l-1.164,0c-0.192,0.708 -0.744,1.164 -1.62,1.164c-1.056,0 -1.752,-0.636 -1.788,-2.1l4.68,0c0.012,-0.12 0.024,-0.228 0.024,-0.348c0,-1.776 -1.032,-3.108 -2.988,-3.108c-1.956,0 -2.988,1.308 -2.988,3.216c0,1.968 1.092,3.216 3.06,3.216zm-0.072,-5.556c0.96,0 1.584,0.576 1.716,1.74l-3.432,0c0.132,-1.164 0.756,-1.74 1.716,-1.74zm9.223,5.436l0,-4.092c0,-1.5 -0.684,-2.22 -2.1,-2.22c-1.032,0 -1.632,0.48 -1.968,1.2l0,-1.08l-1.212,0l0,6.192l1.272,0l0,-3.456c0,-1.128 0.6,-1.824 1.524,-1.824c0.876,0 1.212,0.48 1.212,1.416l0,3.864l1.272,0zm3.181,0.12c1.068,0 1.752,-0.396 2.088,-1.188c0,0.576 0.072,0.828 0.264,1.068l1.14,0c-0.12,-0.204 -0.192,-0.744 -0.192,-1.584l0,-2.688c0,-1.248 -0.78,-2.04 -2.592,-2.04c-1.824,0 -2.592,0.792 -2.592,2.04l1.248,0c0.06,-0.768 0.516,-1.128 1.356,-1.128c0.9,0 1.308,0.42 1.308,1.128c0,0.396 -0.216,0.564 -0.948,0.636l-1.2,0.096c-1.536,0.132 -2.1,0.864 -2.1,1.788c0,1.152 0.78,1.872 2.22,1.872zm0.348,-0.876c-0.912,0 -1.296,-0.444 -1.296,-1.08c0,-0.504 0.348,-0.876 1.236,-0.948l0.792,-0.072c0.48,-0.036 0.816,-0.132 0.948,-0.3l0,0.528c0,1.02 -0.588,1.872 -1.68,1.872zm6.612,0.876c1.08,0 1.74,-0.468 2.088,-1.26l0,1.14l1.212,0l0,-8.544l-1.272,0l0,3.408c-0.348,-0.768 -1.032,-1.176 -2.028,-1.176c-1.668,0 -2.7,1.188 -2.7,3.216c0,2.028 1.032,3.216 2.7,3.216zm0.3,-0.972c-1.032,0 -1.728,-0.684 -1.728,-2.244c0,-1.548 0.696,-2.244 1.728,-2.244c1.02,0 1.728,0.696 1.728,2.244c0,1.56 -0.708,2.244 -1.728,2.244zm7.021,0.972c1.968,0 3.06,-1.248 3.06,-3.216c0,-1.968 -1.092,-3.216 -3.06,-3.216c-1.968,0 -3.06,1.248 -3.06,3.216c0,1.968 1.092,3.216 3.06,3.216zm0,-0.972c-1.14,0 -1.788,-0.744 -1.788,-2.244c0,-1.488 0.648,-2.244 1.788,-2.244c1.14,0 1.788,0.756 1.788,2.244c0,1.5 -0.648,2.244 -1.788,2.244zm5.296,0.852l0,-2.94c0,-1.38 0.66,-2.16 1.668,-2.16l0.612,0.024l0,-1.116c-0.156,-0.036 -0.396,-0.072 -0.564,-0.072c-0.9,0 -1.452,0.408 -1.776,1.5l0,-1.428l-1.212,0l0,6.192l1.272,0z"/>
  <path id="svg_4" fill="#3EAEFF" d="m114.469,120.2l122.06,0l0,0.6l-122.06,0l0,-0.6z"/>
  <path id="svg_5" fill="black" d="m102.222,140l0,-6.41l2.26,0l0,-0.71l-5.3897,0l0,0.71l2.2697,0l0,6.41l0.86,0zm3.752,0.1c0.91,0 1.52,-0.36 1.8,-1.08c0,0.55 0.06,0.76 0.22,0.98l0.73,0c-0.1,-0.17 -0.16,-0.62 -0.16,-1.32l0,-2.27c0,-1.02 -0.63,-1.67 -2.07,-1.67c-1.44,0 -2.07,0.65 -2.07,1.67l0.8,0c0.06,-0.73 0.48,-1.07 1.28,-1.07c0.86,0 1.23,0.41 1.23,1.07c0,0.38 -0.2,0.53 -0.9,0.59l-0.95,0.08c-1.26,0.11 -1.74,0.7 -1.74,1.46c0,0.96 0.66,1.56 1.83,1.56zm0.22,-0.58c-0.86,0 -1.22,-0.44 -1.22,-1.03c0,-0.48 0.33,-0.83 1.15,-0.89l0.71,-0.06c0.46,-0.04 0.78,-0.14 0.9,-0.3l0,0.51c0,0.96 -0.52,1.77 -1.54,1.77zm10.154,0.48l0,-3.41c0,-1.25 -0.49,-1.85 -1.52,-1.85c-0.71,0 -1.27,0.38 -1.53,1.11c-0.17,-0.74 -0.63,-1.11 -1.42,-1.11c-0.71,0 -1.22,0.41 -1.46,1.05l0,-0.95l-0.79,0l0,5.16l0.8,0l0,-2.9c0,-1.04 0.51,-1.69 1.21,-1.69c0.67,0 0.94,0.43 0.94,1.29l0,3.3l0.79,0l0,-2.9c0,-1.04 0.53,-1.69 1.23,-1.69c0.69,0 0.95,0.43 0.95,1.29l0,3.3l0.8,0zm2.693,0.1c0.91,0 1.52,-0.36 1.8,-1.08c0,0.55 0.06,0.76 0.22,0.98l0.73,0c-0.1,-0.17 -0.16,-0.62 -0.16,-1.32l0,-2.27c0,-1.02 -0.63,-1.67 -2.07,-1.67c-1.44,0 -2.07,0.65 -2.07,1.67l0.8,0c0.06,-0.73 0.48,-1.07 1.28,-1.07c0.86,0 1.23,0.41 1.23,1.07c0,0.38 -0.2,0.53 -0.9,0.59l-0.95,0.08c-1.26,0.11 -1.74,0.7 -1.74,1.46c0,0.96 0.66,1.56 1.83,1.56zm0.22,-0.58c-0.86,0 -1.22,-0.44 -1.22,-1.03c0,-0.48 0.33,-0.83 1.15,-0.89l0.71,-0.06c0.46,-0.04 0.78,-0.14 0.9,-0.3l0,0.51c0,0.96 -0.52,1.77 -1.54,1.77zm7.653,0.48l0,-3.41c0,-1.25 -0.56,-1.85 -1.74,-1.85c-0.87,0 -1.4,0.41 -1.69,1.05l0,-0.95l-0.79,0l0,5.16l0.83,0l0,-2.88c0,-1.04 0.56,-1.71 1.42,-1.71c0.83,0 1.14,0.45 1.14,1.31l0,3.28l0.83,0zm-1.51,-6.07c0.53,0 0.81,-0.37 0.81,-1.15l-0.45,0c0,0.38 -0.14,0.61 -0.39,0.61c-0.35,0 -0.61,-0.61 -1.18,-0.61c-0.52,0 -0.8,0.37 -0.8,1.15l0.45,0c0,-0.38 0.14,-0.62 0.39,-0.62c0.35,0 0.61,0.62 1.17,0.62zm4.843,6.17c1.6,0 2.48,-1.02 2.48,-2.68c0,-1.65 -0.88,-2.68 -2.48,-2.68c-1.59,0 -2.47,1.03 -2.47,2.68c0,1.66 0.88,2.68 2.47,2.68zm0,-0.64c-1.04,0 -1.64,-0.69 -1.64,-2.04c0,-1.35 0.6,-2.04 1.64,-2.04c1.05,0 1.65,0.69 1.65,2.04c0,1.35 -0.6,2.04 -1.65,2.04zm12.556,0.54l0,-3.41c0,-1.25 -0.49,-1.85 -1.52,-1.85c-0.71,0 -1.27,0.38 -1.53,1.11c-0.17,-0.74 -0.63,-1.11 -1.42,-1.11c-0.71,0 -1.22,0.41 -1.46,1.05l0,-0.95l-0.79,0l0,5.16l0.8,0l0,-2.9c0,-1.04 0.51,-1.69 1.21,-1.69c0.67,0 0.94,0.43 0.94,1.29l0,3.3l0.79,0l0,-2.9c0,-1.04 0.53,-1.69 1.23,-1.69c0.69,0 0.95,0.43 0.95,1.29l0,3.3l0.8,0zm2.693,0.1c0.91,0 1.52,-0.36 1.8,-1.08c0,0.55 0.06,0.76 0.22,0.98l0.73,0c-0.1,-0.17 -0.16,-0.62 -0.16,-1.32l0,-2.27c0,-1.02 -0.63,-1.67 -2.07,-1.67c-1.44,0 -2.07,0.65 -2.07,1.67l0.8,0c0.06,-0.73 0.48,-1.07 1.28,-1.07c0.86,0 1.23,0.41 1.23,1.07c0,0.38 -0.2,0.53 -0.9,0.59l-0.95,0.08c-1.26,0.11 -1.74,0.7 -1.74,1.46c0,0.96 0.66,1.56 1.83,1.56zm0.22,-0.58c-0.86,0 -1.22,-0.44 -1.22,-1.03c0,-0.48 0.33,-0.83 1.15,-0.89l0.71,-0.06c0.46,-0.04 0.78,-0.14 0.9,-0.3l0,0.51c0,0.96 -0.52,1.77 -1.54,1.77zm0.62,-5.45l1.09,-1.43l-0.88,0l-0.85,1.43l0.64,0zm6.989,5.93l-1.94,-2.67l1.84,-2.49l-0.92,0l-1.39,1.89l-1.39,-1.89l-0.92,0l1.83,2.49l-1.93,2.67l0.92,0l1.49,-2.02l1.49,2.02l0.92,0zm1.488,0l0,-5.16l-0.83,0l0,5.16l0.83,0zm-0.42,-6.19c0.33,0 0.52,-0.2 0.52,-0.46c0,-0.26 -0.19,-0.46 -0.52,-0.46c-0.33,0 -0.51,0.2 -0.51,0.46c0,0.26 0.18,0.46 0.51,0.46zm8.205,6.19l0,-3.41c0,-1.25 -0.49,-1.85 -1.52,-1.85c-0.71,0 -1.27,0.38 -1.53,1.11c-0.17,-0.74 -0.63,-1.11 -1.42,-1.11c-0.71,0 -1.22,0.41 -1.46,1.05l0,-0.95l-0.79,0l0,5.16l0.8,0l0,-2.9c0,-1.04 0.51,-1.69 1.21,-1.69c0.67,0 0.94,0.43 0.94,1.29l0,3.3l0.79,0l0,-2.9c0,-1.04 0.53,-1.69 1.23,-1.69c0.69,0 0.95,0.43 0.95,1.29l0,3.3l0.8,0zm3.333,0.1c1.6,0 2.48,-1.02 2.48,-2.68c0,-1.65 -0.88,-2.68 -2.48,-2.68c-1.59,0 -2.47,1.03 -2.47,2.68c0,1.66 0.88,2.68 2.47,2.68zm0,-0.64c-1.04,0 -1.64,-0.69 -1.64,-2.04c0,-1.35 0.6,-2.04 1.64,-2.04c1.05,0 1.65,0.69 1.65,2.04c0,1.35 -0.6,2.04 -1.65,2.04zm7.875,0.64c0.92,0 1.53,-0.4 1.82,-1.13l0,1.03l0.79,0l0,-7.12l-0.83,0l0,2.94c-0.29,-0.72 -0.9,-1.08 -1.78,-1.08c-1.39,0 -2.24,0.99 -2.24,2.68c0,1.69 0.85,2.68 2.24,2.68zm0.18,-0.64c-0.94,0 -1.59,-0.63 -1.59,-2.04c0,-1.41 0.65,-2.04 1.59,-2.04c0.95,0 1.6,0.63 1.6,2.04c0,1.41 -0.65,2.04 -1.6,2.04zm5.763,0.64c1.3,0 2.01,-0.64 2.25,-1.67l-0.74,0c-0.18,0.65 -0.68,1.09 -1.51,1.09c-0.96,0 -1.62,-0.57 -1.64,-1.97l3.98,0c0.02,-0.08 0.02,-0.17 0.02,-0.25c0,-1.44 -0.82,-2.56 -2.42,-2.56c-1.59,0 -2.41,1.09 -2.41,2.68c0,1.66 0.88,2.68 2.47,2.68zm-0.06,-4.78c0.89,0 1.48,0.55 1.59,1.67l-3.17,0c0.11,-1.12 0.69,-1.67 1.58,-1.67zm11.999,4.68l-2.79,-7.12l-1.04,0l-2.79,7.12l0.89,0l0.71,-1.8l3.42,0l0.71,1.8l0.89,0zm-1.83,-2.47l-2.97,0l1.49,-3.83l1.48,3.83zm3.324,2.47l0,-2.49c0,-1.27 0.57,-1.97 1.45,-1.97l0.5,0.02l0,-0.72c-0.15,-0.03 -0.33,-0.05 -0.47,-0.05c-0.77,0 -1.24,0.37 -1.52,1.27l0,-1.22l-0.79,0l0,5.16l0.83,0zm4.622,0.1c1.52,0 2.25,-0.97 2.25,-1.98l-0.75,0c-0.12,0.87 -0.64,1.34 -1.5,1.34c-0.98,0 -1.58,-0.69 -1.58,-2.04c0,-1.35 0.6,-2.04 1.58,-2.04c0.98,0 1.4,0.62 1.5,1.3l0.75,0c0,-0.91 -0.67,-1.94 -2.25,-1.94c-1.53,0 -2.41,1.03 -2.41,2.68c0,1.66 0.88,2.68 2.41,2.68zm7.235,-0.1l0,-3.41c0,-1.25 -0.56,-1.85 -1.74,-1.85c-0.84,0 -1.37,0.38 -1.65,1l0,-2.86l-0.83,0l0,7.12l0.83,0l0,-2.88c0,-1.04 0.56,-1.71 1.42,-1.71c0.83,0 1.14,0.45 1.14,1.31l0,3.28l0.83,0zm1.893,0l0,-5.16l-0.83,0l0,5.16l0.83,0zm-0.42,-6.19c0.33,0 0.52,-0.2 0.52,-0.46c0,-0.26 -0.19,-0.46 -0.52,-0.46c-0.33,0 -0.51,0.2 -0.51,0.46c0,0.26 0.18,0.46 0.51,0.46zm4.095,6.19l2.01,-5.16l-0.86,0l-1.65,4.41l-1.65,-4.41l-0.86,0l2.01,5.16l1,0zm4.64,0.1c1.6,0 2.48,-1.02 2.48,-2.68c0,-1.65 -0.88,-2.68 -2.48,-2.68c-1.59,0 -2.47,1.03 -2.47,2.68c0,1.66 0.88,2.68 2.47,2.68zm0,-0.64c-1.04,0 -1.64,-0.69 -1.64,-2.04c0,-1.35 0.6,-2.04 1.64,-2.04c1.05,0 1.65,0.69 1.65,2.04c0,1.35 -0.6,2.04 -1.65,2.04zm3.746,0.6c0.34,0 0.53,-0.21 0.53,-0.48c0,-0.26 -0.19,-0.48 -0.53,-0.48c-0.34,0 -0.53,0.22 -0.53,0.48c0,0.27 0.19,0.48 0.53,0.48zm0,-4.06c0.34,0 0.53,-0.21 0.53,-0.48c0,-0.27 -0.19,-0.48 -0.53,-0.48c-0.34,0 -0.53,0.21 -0.53,0.48c0,0.27 0.19,0.48 0.53,0.48zm8.734,4l0,-0.67l-4.12,0c0.01,-1.03 0.42,-1.63 1.4,-1.98l1.13,-0.41c1,-0.37 1.59,-0.99 1.59,-1.99c0,-1.33 -0.87,-2.17 -2.4,-2.17c-1.56,0 -2.39,0.84 -2.39,2.43l0.74,0c0.1,-1.17 0.61,-1.76 1.66,-1.76c0.94,0 1.56,0.55 1.56,1.48c0,0.65 -0.29,1.13 -1.11,1.42l-1.09,0.4c-1.42,0.52 -1.92,1.3 -1.92,2.82l0,0.43l4.95,0zm3.176,0.1c1.54,0 2.52,-0.87 2.52,-2.37c0,-1.51 -0.98,-2.31 -2.43,-2.31c-0.57,0 -1.17,0.15 -1.54,0.64l0.35,-2.51l3.22,0l0,-0.67l-3.9,0l-0.6,4.32l0.77,0c0.14,-0.55 0.57,-1.17 1.61,-1.17c0.99,0 1.7,0.61 1.7,1.72c0,1.1 -0.71,1.71 -1.7,1.71c-1.12,0 -1.57,-0.72 -1.64,-1.26l-0.78,0c0,0.9 0.76,1.9 2.42,1.9zm11.013,-0.1l0,-7.12l-1.34,0l-2.44,5.87l-2.45,-5.87l-1.34,0l0,7.12l0.83,0l0,-6.31l2.58,6.31l0.75,0l2.58,-6.31l0,6.31l0.83,0zm6.85,-1.93c0,-0.85 -0.47,-1.52 -1.38,-1.72c0.78,-0.23 1.18,-0.82 1.18,-1.61c0,-1.1 -0.78,-1.86 -2.2,-1.86l-3.27,0l0,7.12l3.47,0c1.42,0 2.2,-0.83 2.2,-1.93zm-0.86,-0.05c0,0.76 -0.49,1.32 -1.43,1.32l-2.52,0l0,-2.65l2.52,0c0.94,0 1.43,0.57 1.43,1.33zm-0.2,-3.22c0,0.76 -0.49,1.25 -1.43,1.25l-2.32,0l0,-2.51l2.32,0c0.94,0 1.43,0.5 1.43,1.26z"/>
  <rect id="svg_6" fill="#FFB6B6" transform="rotate(-45 130 58.0137)" rx="4" height="39.8686" width="30.866" y="58.0137" x="130"/>
  <rect id="svg_7" fill="#FFB6B6" transform="rotate(45 196.589 35)" rx="4" height="39.8686" width="30.866" y="35" x="196.589"/>
  <g id="svg_8" mask="url(#mask0_3417_12649)">
   <path id="svg_9" fill="#FE5050" d="m156,79.5154l0,-38.5662c0,-2.7614 2.239,-5 5,-5l21.704,0c2.164,0 3.643,2.1852 2.839,4.194c-1.103,2.758 1.977,5.3109 4.483,3.7154l1.339,-0.853c2.472,-1.5743 5.684,0.3371 5.478,3.261l-2.358,33.5988c-0.183,2.6191 -2.362,4.65 -4.987,4.65l-28.498,0c-2.761,0 -5,-2.2386 -5,-5z"/>
  </g>
  <path id="svg_10" fill="#A25656" d="m194.16,49.8253l-13.871,-13.8761l0,10.407c0,0 -0.107,1.6355 0.864,2.6018c0.97,0.9663 3.468,0.8673 3.468,0.8673l9.539,0z"/>
  <circle id="svg_11" fill="white" r="8.5" cy="60.5" cx="175.5"/>
  <path id="svg_12" stroke-linejoin="round" stroke-linecap="round" stroke="#FE5050" d="m171,62l0,2c0,0.5523 0.448,1 1,1l7,0c0.552,0 1,-0.4477 1,-1l0,-2"/>
  <path id="svg_13" stroke-linejoin="round" stroke-linecap="round" stroke="#FE5050" d="m175.5,61.5l0,-5.5m0,0l-1.5,2.1429m1.5,-2.1429l1.5,2.1429"/>
  <rect stroke="#ffe8e8" stroke-dasharray="6 6" id="svg_14" height="15.78328" width="6.41388" y="127.18" x="221.78176" fill="#FFE7E7"/>
 </g>
</svg>
`;

const CARGAR_ARCHIVO_UPLOAD =`
<svg width="348" height="171" viewBox="0 0 348 171" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="0.5" y="0.5" width="347" height="170" rx="4.5" fill="#F4FFFC" stroke="#BAFEEC" stroke-dasharray="6 6"/>
<rect x="130" y="58.0132" width="30.866" height="39.8686" rx="4" transform="rotate(-45 130 58.0132)" fill="#D1FFF3"/>
<rect x="196.589" y="35" width="30.866" height="39.8686" rx="4" transform="rotate(45 196.589 35)" fill="#D1FFF3"/>
<mask id="mask0_1304_9688" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="156" y="35" width="39" height="50">
<path d="M156 84.5154V35.9492H180.283L182.018 48.958L194.159 49.8253L194.159 84.5154H156Z" fill="#555555"/>
</mask>
<g mask="url(#mask0_1304_9688)">
<path d="M156 79.5154V40.9492C156 38.1878 158.239 35.9492 161 35.9492H182.704C184.868 35.9492 186.347 38.1344 185.543 40.1432C184.44 42.9012 187.52 45.4541 190.026 43.8586L191.365 43.0056C193.837 41.4313 197.049 43.3427 196.843 46.2666L194.485 79.8654C194.302 82.4845 192.123 84.5154 189.498 84.5154H161C158.239 84.5154 156 82.2768 156 79.5154Z" fill="#00F1B2"/>
</g>
<path d="M194.16 49.8253L180.289 35.9492V46.3562C180.289 46.3562 180.182 47.9917 181.153 48.958C182.123 49.9243 184.621 49.8253 184.621 49.8253H194.16Z" fill="#DAFFF5"/>
<circle cx="175.5" cy="60.5" r="8.5" fill="white"/>
<path d="M171 62V64C171 64.5523 171.448 65 172 65H179C179.552 65 180 64.5523 180 64V62" stroke="#00F1B2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M175.5 61.5V56M175.5 56L174 58.1429M175.5 56L177 58.1429" stroke="#00F1B2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

const CARGAR_ARCHIVO_ICON =`
<svg width="19" height="23" viewBox="0 0 19 23" fill="none" xmlns="http://www.w3.org/2000/svg">
<mask id="mask0_3417_12634" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="19" height="23">
<path d="M0.53418 23V0H12.0342L12.8556 6.16071L18.6056 6.57143L18.6056 23H0.53418Z" fill="#555555"/>
</mask>
<g mask="url(#mask0_3417_12634)">
<path d="M0.53418 18V5C0.53418 2.23858 2.77276 0 5.53418 0H13.1807C14.2053 0 14.906 1.03485 14.5254 1.98619C14.003 3.29232 15.4615 4.50132 16.6481 3.74572L17.2824 3.34179C18.4532 2.5962 19.974 3.50142 19.8768 4.88611L18.9319 18.35C18.7481 20.9692 16.5698 23 13.9442 23H5.53418C2.77276 23 0.53418 20.7614 0.53418 18Z" fill="#00F1B2"/>
</g>
<path d="M18.6059 6.57143L12.0368 0V4.92857C12.0368 4.92857 11.9862 5.70309 12.4459 6.16071C12.9056 6.61834 14.0887 6.57143 14.0887 6.57143H18.6059Z" fill="#DAFFF5"/>
</svg>
`;

const CARGAR_CLOSE_ICON =`
<svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.20605 1.07227L10.2061 10.0723" stroke="#323232"/>
<path d="M10.2061 1.07227L1.20606 10.0723" stroke="#323232"/>
</svg>
`;

@Component({
  selector: 'app-agregar-partitura',
  templateUrl: './agregar-partitura.component.html',
  styleUrls: ['./agregar-partitura.component.scss']
})
export class AgregarPartituraComponent implements OnInit {

  @Input() cancion!: any ;
  public fileTmp:any;
  nombreFile:any [] =[];
  formDialog:any= FormGroup;

  fileCarga = true;
  fileImgExcel = false;
  MAXIMO_TAMANIO_BYTES = 5242880;
  sizeIsValid=true;

  @ViewChild('archivo') archivo:any= ElementRef;

  constructor(
    public dialogRef: MatDialogRef<CrearPartituraDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,

    private uploadService: UploadService,
    private snackBar: MatSnackBar,
    private _matIcon: MatIconRegistry,
    private _domSanitizer: DomSanitizer,
    private _formBuilder: FormBuilder,
  ) {
    this._matIcon.addSvgIconLiteral('fileNone', this._domSanitizer.bypassSecurityTrustHtml(CARGAR_ARCHIVO_NONE));
    this._matIcon.addSvgIconLiteral('fileUpload', this._domSanitizer.bypassSecurityTrustHtml(CARGAR_ARCHIVO_UPLOAD));
    this._matIcon.addSvgIconLiteral('fileIcon', this._domSanitizer.bypassSecurityTrustHtml(CARGAR_ARCHIVO_ICON));
    this._matIcon.addSvgIconLiteral('closeIcon', this._domSanitizer.bypassSecurityTrustHtml(CARGAR_CLOSE_ICON));
   }
  
  ngOnInit(): void {
    if(this.data?.content?.hasOwnProperty('_id')){
      this.cancion=this.data.content;
      console.log(this.cancion)
    }
    this.buildForm();
  }
  buildForm() {
    this.formDialog = this._formBuilder.group({
      files: [[], [Validators.required]]
    });
  }

  validarSize(){
    if (this.fileTmp.fileRaw.size > this.MAXIMO_TAMANIO_BYTES) {
      console.log(this.fileTmp.fileRaw.size);
      this.sizeIsValid=false;
    } else {
      console.log(this.fileTmp.fileRaw.size);
      this.sizeIsValid=true;
    }
  }
  // ===========================================================================
  // *************************  UPLOAD FILE  ***********************************
  // ===========================================================================
  
  onFileChange(event:any){
    if(event.target.files.length > 0) {
      const [file] = event.target.files;
      this.fileTmp = {
        fileRaw: file,
        fileName: file.name,
      }
      this.nombreFile=[]
      this.nombreFile.push(this.fileTmp.fileName);
      console.log(" fileTmp", this.fileTmp);
      this.validarSize();
      this.fileCarga = false;
      this.fileImgExcel = true;
    } else {
      this.fileCarga = true;
      this.fileImgExcel = false;
      this.sizeIsValid=true;
    }
    
  }

  onUpload(){
    
    const cancion= new FormData();
    cancion.append('archivo',this.fileTmp.fileRaw);
    cancion.append('_id',this.cancion._id);

    this.uploadService.actualizarCanPartitura(cancion)
      .subscribe(resp=>{
        this.dialogRef.close();
        window.location.reload();
        
      })
  }

  closeDialog() {
    this.dialogRef.close();
  }
  // ===========================================================================

  mostrarSnackBar( mensaje:string){
    this.snackBar.open(mensaje, '!Ok', {
      duration: 2000,
    });
  }
  volver(){
    // this.router.navigate(['/home/repertorios']);
    window.history.back();
  }
  // 
  removerFile(file: File) {
    this.nombreFile.splice(this.nombreFile.indexOf(file), 1);
    this.fileCarga = true;
    this.fileImgExcel = false;
    this.archivo.nativeElement.value = '';
    this.sizeIsValid=true;
    this.fileTmp=[];
  }

}
