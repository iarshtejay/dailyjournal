import { TypeAnimation } from 'react-type-animation';

const AnimatedWelcomeMessage = () => {
  return (
    <TypeAnimation
      sequence={[
        'Welcome To Journally ', 
        1000, // Waits 1s
        'We are thrilled to have you here 😄', 
        1000, // Waits 2s // Waits 2s
        'Start by creating your first journal',
        5000,
        () => {
          console.log('Sequence completed'); // Place optional callbacks anywhere in the array
        }
      ]}
      wrapper="span"
      cursor={true}
      repeat={Infinity}
      style={{ fontSize: '2.5em', display: 'inline-block', marginBottom:"2em" }}
    />
  );
};

export default AnimatedWelcomeMessage