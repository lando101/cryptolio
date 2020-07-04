import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-particles',
  templateUrl: './particles.component.html',
  styleUrls: ['./particles.component.scss'],
})
export class ParticlesComponent implements OnInit {
  myStyle: object = {};
  myParams: object = {};
  width: number = 100;
  height: number = 100;

  constructor() {}

  ngOnInit(): void {
    this.myStyle = {
      position: 'fixed',
      width: '100%',
      height: '100%',
      background: 'rgb(26, 30, 33)',
      'z-index': 0,
      // filter: 'blur(10px)',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    };
    this.myParams = {
      particles: {
        number: {
          value: 10,
          density: {
            enable: true,
            value_area: 800,
          },
        },
        color: {
          // value: '#d83f87',
          // value: ['#05386b', '#379683', '#5cdb95'],
          value: ['#000000', '#ff2146']
        },
        shape: {
          type: ['edge'],
        },
        size: {
          value: 150,
          random: true,
          anim: {
            enable: false,
            speed: 40,
            size_min: 0.1,
            sync: false,
          },
        },
        opacity: {
          value: 0.5,
          random: true,
          anim: {
            enable: false,
            speed: 1,
            opacity_min: 0.1,
            sync: false,
          },
        },
        line_linked: {
          enable: true,
          distance: 173.61933172340872,
          color: '#ffffff',
          opacity: 0,
          width: 1,
        },
        move: {
          enable: true,
          speed: 0.5,
          direction: 'top',
          random: false,
          straight: false,
          out_mode: 'out',
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200,
          },
        },
      },
    };
  }
}
