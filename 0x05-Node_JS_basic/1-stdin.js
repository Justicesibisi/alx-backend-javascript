console.log('Welcome to Holberton School, what is your name?');

// Enable reading from stdin
process.stdin.resume();

// Handle user input
process.stdin.on('readable', () => {
  const name = process.stdin.read();
  if (name !== null) {
    process.stdout.write(`Your name is: ${name}`);
    if (process.stdin.isTTY) {
      process.exit();
    } else {
      process.stdout.write('This important software is now closing\n');
      process.exit();
    }
  }
});
