import Validator from "validatorjs";
import Controller from "./controller.js";
import SalesforceConnector from "../modules/salesforce.js";
import { setCookies } from "../modules/cookie.js";

class Login extends Controller {
  constructor() {
    super();
  }

  get(req, res) {
    res.render("login", {
      messages: req.flash("messages"),
      csrfToken: req.csrfToken(),
      addContext: "ABCDEF",
    });
  }

  async post(req, res) {
    const sf = new SalesforceConnector();
    const validation = new Validator(req.body, {
      email: "required|email|max:255",
      password: "required|max:255",
    });
    if (validation.check()) {
      try {
        const result = await sf.login(req.body.email, req.body.password);
        setCookies(res, [
          {
            name: "userId",
            value: result.id,
          },
        ]);
      } catch (e) {
        req.flash("messages", e);
        return res.redirect("/login");
      }
    }
    return res.redirect("/");
  }
}

export default new Login();
