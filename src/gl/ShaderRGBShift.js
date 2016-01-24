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

void main () {
  float ourtime = (time);
  float ourshiftAmount = (shiftAmount);

  vec2 delta = vec2(ourshiftAmount, ourshiftAmount);
  vec2 dir = uv - vec2( -0.6, 0.9 );

	float d = 1.0 * length( dir );
	normalize( dir );
	vec2 value = d * dir * delta;

	vec4 c1 = texture2D( tInput, uv - value / 931.0 );
	vec4 c2 = texture2D( tInput, uv );
	vec4 c3 = texture2D( tInput, uv + value / 1656.0 );

	gl_FragColor = vec4( c1.r, c2.g, c3.b, c1.a + c2.a + c3.b );
}
    `,
  },
});

  class RGBShiftShader extends React.Component {
    constructor (props) {
      super(props);
      this.state = {
        value: 0.0,
      }
    }

    componentDidMount () {
      let updateVal = 0.0

      // const loop = () => {
      //   updateVal  = this.props.animate ? 0.005 : 0.0
      //   // if (this.props.shiftAmount) updateVal = updateVal + 0.01
      //
      //   this.raf = requestAnimationFrame(loop) //eslint-disable-line no-undef
      //   this.setState({
      //     value: parseFloat(this.state.value + updateVal),
      //   })
      // }
      // this.raf = requestAnimationFrame(loop) //eslint-disable-line no-undef
    }
    //
    // componentWillUnmount () {
    //   cancelAnimationFrame(this.raf) //eslint-disable-line no-undef
    // }

    shouldComponentUpdate() {
      return true
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

  module.exports = RGBShiftShader;
