const maxAge = 86400000 * 3650;

export const setCookie = (res, name, value) => {
  res.cookie(name, value, {
    maxAge: maxAge,
    httpOnly: false,
  });
};

export const setCookies = (res, array) => {
  for (let a of array) {
    res.cookie(a.name, a.value, {
      maxAge: maxAge,
      httpOnly: false,
    });
  }
};

export const getCookie = (req, name) => {
  return req.cookies[name] || null;
};
