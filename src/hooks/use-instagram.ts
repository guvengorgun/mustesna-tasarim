import { useState, useEffect } from 'react';

const useInstagram = () => {
  const [state, setState] = useState([]);
  // instagram basic display api
  // agency carousel
  const url = `https://graph.instagram.com/17942554087639245/children?fields=id,media_url,media_type,permalink&access_token=${process.env.INSTAGRAM_ACCESS_TOKEN}`;

  useEffect(() => {
    fetch(url)
      .then((response) => response.json()) // parse JSON from request
      .then((result) => setState(result?.data));
  }, []);

  return state;
};

export default useInstagram;
