export default function isNumberGreaterEqualZero (number) {
    return((typeof number === 'number' || number instanceof Number)&&number>=0);
  }