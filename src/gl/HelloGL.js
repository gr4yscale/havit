const React = require('react-native');
const GL = require('gl-react');
const {Surface} = require('gl-react-native');

const shaders = GL.Shaders.create({
  helloGL: {
    frag: `
precision highp float;
varying vec2 uv; // This variable vary in all pixel position (normalized from vec2(0.0,0.0) to vec2(1.0,1.0))

void main () { // This function is called FOR EACH PIXEL
  gl_FragColor = vec4(uv.x, uv.y, 0.5, 1.0); // red vary over X, green vary over Y, blue is 50%, alpha is 100%.
}
    `,
  },
});

module.exports = GL.createComponent(() =>
  <GL.Node shader={shaders.helloGL} />,
  { displayName: 'HelloGL' }
);


class HelloGL extends React.Component {
  render () {
    const { width, height } = this.props;

    return (
    <Surface
        width={width} height={height}
        pixelRatio={2}
        opaque={true}
        ref="helloGL"
        style={{position:'absolute', width, height, top:0, left: 0}}
    >
        <GL.Node
            shader={shaders.helloGL}
        />
    </Surface>
    )
  }
}

module.exports = HelloGL
