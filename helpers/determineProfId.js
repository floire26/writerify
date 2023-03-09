const determineProfId = (prompt) => {
    prompt = prompt.toLowerCase();

    if (prompt.includes('beginner')) {
        return 1;
    } else if (prompt.includes('intermediate')) {
        return 2;
    } else if (prompt.includes('advanced')) {
        return 3;
    }
}

module.exports = determineProfId;
