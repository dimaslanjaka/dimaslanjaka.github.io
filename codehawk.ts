import { analyzeProject } from 'codehawk-cli';
const output = analyzeProject(__dirname); // returns a Results object

// Get summary maintainability scores
const { average, median, worst } = output.summary;

console.log(average, median, worst);
