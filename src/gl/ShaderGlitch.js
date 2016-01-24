const React = require('react-native')
const GL = require('gl-react')
const {Surface} = require('gl-react-native')

const shaders = GL.Shaders.create({
  rgbshift: {
    frag: `
precision highp float;
varying vec2 uv;
uniform sampler2D tInput;
uniform float time;
uniform float shiftAmount;

// parts of this shader were taken from here:
// https://www.shadertoy.com/view/MlfSWr

#define t time

//random hash
vec4 hash42(vec2 p){

	vec4 p4 = fract(vec4(p.xyxy) * vec4(443.8975,397.2973, 491.1871, 470.7827));
    p4 += dot(p4.wzxy, p4+19.19);
    return fract(vec4(p4.x * p4.y, p4.x*p4.z, p4.y*p4.w, p4.x*p4.w));
}


float hash( float n ){
    return fract(sin(n)*43758.5453123);
}

// 3d noise function (iq's)
float n( in vec3 x ){
    vec3 p = floor(x);
    vec3 f = fract(x);
    f = f*f*(3.0-2.0*f);
    float n = p.x + p.y*57.0 + 113.0*p.z;
    float res = mix(mix(mix( hash(n+  0.0), hash(n+  1.0),f.x),
                        mix( hash(n+ 57.0), hash(n+ 58.0),f.x),f.y),
                    mix(mix( hash(n+113.0), hash(n+114.0),f.x),
                        mix( hash(n+170.0), hash(n+171.0),f.x),f.y),f.z);
    return res;
}

//tape noise
float nn(vec2 p){

    float y = p.y;
    float s = t*4.;

    float v = (n( vec3(y*.01 +s, 			1., 1.0) ) + .0)
          	 *(n( vec3(y*.011+1000.0+s, 	1., 1.0) ) + .0)
          	 *(n( vec3(y*.51+421.0+s, 	1., 1.0) ) + .0)
        ;

   	v*= hash42(   vec2(p.x +t*0.01, p.y) ).x +.3 ;


    v = pow(v+.3, 1.);
	if(v<.7) v = 0.;  //threshold
    return v;
}

void main () {
  float ourtime = (time);
  float ourshiftAmount = (shiftAmount);

  float linesN = 200.; //fields per seconds
  float one_y = 25006.0 / linesN; //field line

  vec2 newuv = floor(uv*vec2(3001.0,10006.0)/one_y)*one_y;
  float col =  nn(newuv);

  vec4 c3 = texture2D( tInput, uv + (col * 20.) / 1656.0 );

  gl_FragColor = c3;
}
    `,
  },
});

  class GlitchShader extends React.Component {
    constructor (props) {
      super(props);
      this.state = {
        value: 0.0,
      }
    }

    componentDidMount () {
      let updateVal = 0.0

      const loop = () => {
        updateVal  = this.props.animate ? 0.015 : 0.0
        // if (this.props.shiftAmount) updateVal = updateVal + 0.01

        this.raf = requestAnimationFrame(loop) //eslint-disable-line no-undef
        this.setState({
          value: parseFloat(this.state.value + updateVal),
        })
      }
      this.raf = requestAnimationFrame(loop) //eslint-disable-line no-undef
    }

    shouldComponentUpdate() {
      return true
    }

    componentWillUnmount () {
      cancelAnimationFrame(this.raf) //eslint-disable-line no-undef
    }

    render () {
      const { value } = this.state;
      const { width, height, children } = this.props;

      let shiftAmount = this.props.shiftAmount ? this.props.shiftAmount : 0.0

      return (
      <Surface
          width={width} height={height}
          pixelRatio={2}
          opaque={true}
          eventsThrough
          visibleContent
          ref="rgbshift"
          style={{position:'absolute', width, height, top:0, left: 0}}
      >
          <GL.Node
              shader={shaders.rgbshift}
              uniforms={{ tInput: children, time: value, shiftAmount: shiftAmount}} //eslint-disable-line object-shorthand
          />
      </Surface>
      )
    }
  }

  module.exports = GlitchShader;
