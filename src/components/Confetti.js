import confetti from 'canvas-confetti';

const launchConfetti = () => {
  let defaults = {
    spread: 360,
    ticks: 50,
    gravity: 0,
    decay: 0.94,
    startVelocity: 30,
    shapes: ['star'],
    colors: ['FFE400', 'FFBD00', 'E89400', 'FFCA6C', 'FDFFB8']
  };
  
  function shoot() {
    confetti({
      ...defaults,
      particleCount: 40,
      scalar: 1.2,
      shapes: ['star']
    });
  
    confetti({
      ...defaults,
      particleCount: 10,
      scalar: 0.75,
      shapes: ['circle']
    });
  }
  
  setTimeout(shoot, 0);
  setTimeout(shoot, 100);
  setTimeout(shoot, 200);
  setTimeout(shoot, 300);
  setTimeout(shoot, 400);
  setTimeout(shoot, 500);
  setTimeout(shoot, 600);
  setTimeout(shoot, 700);
  setTimeout(shoot, 800);
  setTimeout(shoot, 900);
  setTimeout(shoot, 1000);
}

export default launchConfetti;