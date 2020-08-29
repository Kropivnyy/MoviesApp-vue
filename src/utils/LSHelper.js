export default {
  getFromLS(key) {
    try {
      const items = localStorage.getItem(key);
      return items ? JSON.parse(items) : null;
    } catch {
      throw new Error();
    }
  },

  setToLS(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      throw new Error();
    }
  },
  deleteFromLS(key) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      throw new Error();
    }
  },
};
