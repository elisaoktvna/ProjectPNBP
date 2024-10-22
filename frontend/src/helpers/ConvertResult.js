const abjads = [
  "Open",
  "One",
  "Two",
  "Three",
  "Four",
  "Thumb Down",
  "Thumb Up",
  "Okay",
  "Close",
  "Arrow Left",
  "Arrow Right",
];

const ConvertResult = (result) => {
  return `Abjad ${abjads[result]}`;
};

export default ConvertResult;
