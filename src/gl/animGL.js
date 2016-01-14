const React = require("react-native");
const GL = require("gl-react");
const {Surface} = require("gl-react-native");

const shaders = GL.Shaders.create({
  helloGL: {
    frag: `
precision highp float;
varying vec2 uv;

uniform float value;

const float PI = 3.14159265;

void main () {

  float color1, color2, color;

	color1 = (sin(dot(uv.xy * 400.,vec2(sin(value*3.0),cos(value*3.0)))*0.02+value*3.0)+1.0)/2.0;

	vec2 center = vec2(640.0/2.0, 360.0/2.0) + vec2(640.0/2.0*sin(-value*3.0),360.0/2.0*cos(-value*3.0));

	color2 = (cos(length(uv.xy * 400.)*0.03)+1.0)/2.0;

	color = (color1+ color2)/2.0;

	float red	= (cos(PI*color/0.5+value*3.0)+1.0)/2.0;
	float green	= (sin(PI*color/0.5+value*3.0)+1.0)/2.0;
	float blue	= (sin(+value*3.0)+1.0)/2.0;

  gl_FragColor = vec4(red, green, blue, 1.0);
}
    `
  },
});

class animGL extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      value: 0,
    }
  }
  componentDidMount () {
    const loop = time => {
      this.raf = requestAnimationFrame(loop);
      this.setState({
        value: (1 + Math.cos(time / 6000)) / 2 // cycle between 0 and 1
      });
    };
    this.raf = requestAnimationFrame(loop);
  }
  componentWillUnmount () {
    cancelAnimationFrame(this.raf);
  }
  render () {
    const { width, height } = this.props;
    const { value } = this.state;
    return <Surface width={width} height={height} pixelRatio={2} eventsThrough
        style={{position:'absolute', width: width, height: height, top:0, left: 0}}>
      <GL.Node
          shader={shaders.helloGL}
          uniforms={{ value }}
      />
    </Surface>;
  }
}

module.exports = animGL;
