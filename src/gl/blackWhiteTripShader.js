const React = require("react-native");
const GL = require("gl-react");
const {Surface} = require("gl-react-native");

const shaders = GL.Shaders.create({
  blackWhiteTrip: {
    frag: `
precision highp float;
varying vec2 uv;
uniform float time;

//uniform vec2 resolution;
float pi = 3.1415926535897932384626433832795028841;

float sin1(float val) {
  return ((sin((val*2.)-1.5)/2.)+0.5);
}

float strobes(float val) {
	//return step(0.5,fract(val*8.));
	return pow(sin1(val*pi*8.),10.)*6000.;
}

void main () {
  float ourtime = (time);

  vec2 position = ( gl_FragCoord.xy / vec2(800.0, 1200.0));

  //vec2 position = ( gl_FragCoord.xy / resolution.xy );
  //vec2 uv = vec2(position.x,((position.y-0.5)*(resolution.y/resolution.x))+0.5);

  float swirla2 = (1.-length(abs(uv-0.5)-50.))*5.;
  float swirl2 = clamp(strobes(swirla2-ourtime),0.,1.);

  gl_FragColor = vec4(vec3(swirl2), 1.0);
}
    `
  },
});

class BlackWhiteTripShader extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      value: 0.1,
    }
  }

  componentDidMount () {
    const loop = time => {
      this.raf = requestAnimationFrame(loop);
      this.setState({
        value: parseFloat(this.state.value + 0.005),
        // value: (1 + Math.cos(time / 500)) / 2 // cycle between 0 and 1
      });
    }
    this.raf = requestAnimationFrame(loop);
  }

  componentWillUnmount () {
    cancelAnimationFrame(this.raf);
  }
  render () {
    const { value } = this.state;
    const { width, height } = this.props;

    return <Surface
        width={width} height={height}
        pixelRatio={2}
        opaque={true}
        ref="blackWhiteTrip"
        style={{position:'absolute', width: width, height: height, top:0, left: 0}}
          >
            <GL.Node
                shader={shaders.blackWhiteTrip}
                uniforms={{ time: value }}

            />
      </Surface>
  }
}

module.exports = BlackWhiteTripShader;
