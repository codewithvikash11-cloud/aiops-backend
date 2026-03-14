const calculateTokenCost = (input_tokens, output_tokens, input_price, output_price) => {
  const cost = (input_tokens / 1000000 * input_price) + (output_tokens / 1000000 * output_price);
  return cost;
};

module.exports = { calculateTokenCost };
