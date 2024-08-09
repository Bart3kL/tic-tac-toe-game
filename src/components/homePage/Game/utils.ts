export const getTypewriterText = (
  gameType: string,
  usernames: string[],
): string => {
  return gameType === "PlayWithAFriend"
    ? `${usernames[0]} vs. ${usernames[1]} in <b>${gameType}</b>`
    : `${usernames[0]} vs. AI in <b>${gameType}</b>`;
};

export const getCurrentPlayerText = (
  gameType: string,
  currentPlayer: string,
  usernames: string[],
): string => {
  if (gameType === "PlayWithAFriend") {
    return currentPlayer === "x" ? usernames[0] : usernames[1];
  } else {
    return currentPlayer === "x" ? usernames[0] : "AI";
  }
};
