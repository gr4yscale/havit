const React = require('react-native')
const GL = require('gl-react')

const shaders = GL.Shaders.create({
  rgbshift: {
    frag: `
precision mediump float;
varying vec2 uv;
uniform sampler2D tInput;

void main () {
  vec2 delta = vec2(20.0, 100.0);
  vec2 dir = uv - vec2( .5 );

	float d = .7 * length( dir );
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


module.exports = GL.createComponent(
  ({ width, height, children }) => {
    return <GL.Node
      shader={shaders.rgbshift}
      width={width}
      height={height}
      uniforms={{ tInput: children }}
    />;
  },
  { displayName: "rgbshift" });
