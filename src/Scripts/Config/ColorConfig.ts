export type Color = string;

export const Colors: string[] = [
  'Red',
  'Green',
  'Blue',
  'Yellow',
  'Orange',
  'Purple',
  'Pink'
];

export const getRandomColor = () => {
  var rand = Math.floor(Math.random() * 4);
  if (rand === Colors.length) rand = rand - 1;

  return Colors[rand];
};
