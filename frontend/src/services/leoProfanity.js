import filter from 'leo-profanity';

const initLeoProfanity = () => {
    filter.add(filter.getDictionary('en'));
    filter.add(filter.getDictionary('ru'));
};

export default initLeoProfanity;
