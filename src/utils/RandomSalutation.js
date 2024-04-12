const getRandomSalutation = () => {
  const salutations = ["Hello", "Hi", "Hey", "Greetings", "Salutations"];
  const randomIndex = Math.floor(Math.random() * salutations.length);
  return salutations[randomIndex];
};

export default getRandomSalutation;
