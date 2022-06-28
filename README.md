# Confetti for Remotion

remotion-confetti is a Confetti cannon component for Remotion videos. You can use it to put pops of confetti in your
compositions.

# Installation

Install remotion-confetti with NPM (or Yarn, or pnpm) using `npm i remotion-confetti`.

# Using remotion-confetti

In your composition import the `Confetti` component from remotion-confetti and add it to your composition JSX.

```js
<Composition>
    <Confetti {...options} />
</Composition>
```

The confetti component will create a canvas that overlays your video content, and displays confetti as the video progresses.

# Confetti Options

remotion-confetti is based on Canvas Confetti (https://github.com/catdad/canvas-confetti), and has mostly the same options.

### Original Canvase Confetti options

- `particleCount`: The number of confetti to launch. More is always fun... but be cool, there's a lot of math involved.
- `angle`: The angle in which to launch the confetti, in degrees. 90 is straight up.
- `spread`: How far off center the confetti can go, in degrees. 45 means the confetti will launch at the defined angle plus or minus 22.5 degrees.
- `startVelocity`: How fast the confetti will start going, in pixels.
- `decay`: How quickly the confetti will lose speed. Keep this number between 0 and 1, otherwise the confetti will gain speed. Better yet, just never change it.
- `gravity`: How quickly the particles are pulled down. 1 is full gravity, 0.5 is half gravity, etc., but there are no limits. You can even make particles go up if you'd like.
- `drift`: How much to the side the confetti will drift. The default is 0, meaning that they will fall straight down. Use a negative number for left and positive number for right.
- `ticks`: How many times the confetti will move. This is abstract... but play with it if the confetti disappear too quickly for you.
- `colors`: An array of color strings, in the HEX format... you know, like #bada55.
- `shapes`: An array of shapes for the confetti. The possible values are square and circle. The default is to use both shapes in an even mix. You can even change the mix by providing a value such as ['circle', 'circle', 'square'] to use two third circles and one third squares.
- `scalar`: Scale factor for each confetti particle. Use decimals to make the confetti smaller. Go on, try teeny tiny confetti, they are adorable!

### remotion-confetti options

- `x`: Horizontal position of the origin in pixels.
- `y`: Vertical position of the origin in pixels.

# An example

```js
import { AbsoluteFill } from 'remotion';
import Confetti from 'remotion-confetti';

export const ConfettiExample = () => {

	const confettiConfig1 = {
		particleCount: 200,
		startVelocity: 30,
		spread: 60,
		x: 320,
		y: 360,
		scalar: 1
	}

	const confettiConfig2 = {
		particleCount: 200,
		startVelocity: 50,
		decay: 0.8,
		spread: 360,
		ticks: 100,
		gravity: 0.5,
		x: 960,
		y: 360,
		scalar: 1,
		colors: ['#000000', '#FFFFFF']
	}

	return <AbsoluteFill style={{ backgroundColor: 'black' }}>
		<Confetti {...confettiConfig1} />
		<Confetti {...confettiConfig2} />
	</AbsoluteFill>;
};

```