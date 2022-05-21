export const separateByThousands = (n: string | number) => {
  const parts = n.toString().split(".");
  const numberPart = parts[0];
  const decimalPart = parts[1];
  const thousands = /\B(?=(\d{3})+(?!\d))/g;
  return (
    numberPart.replace(thousands, " ") + (decimalPart ? "." + decimalPart : "")
  );
};

export const formatCard = (n: string | number): string => {
  const number = n.toString().split("");
  const result: string[] = [];
  number.forEach((digit, i) => {
    result.push(digit);
    if ((i + 1) % 4 === 0) {
      result.push(" ");
    }
  });
  return result.join("");
};
