export const getMinutesAgo = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMin = Math.floor(diffMs / (1000 * 60));
    return diffMin === 0 ? 'Just now' : `${diffMin} Minute${diffMin > 1 ? 's' : ''} ago`;
};
