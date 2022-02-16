import Controller from "./controller.js";
import SalesforceConnector from "../modules/salesforce.js";
import { getCookie } from "../modules/cookie.js";
import { couponQuery } from "../modules/soql.js";

class Top extends Controller {
  constructor() {
    super();
  }

  async get(req, res) {
    try {
      const sf = new SalesforceConnector();
      await sf.connectApi();
      const result = await sf.query(couponQuery);
      console.log(result);
      const s = await sf.userInfo(getCookie(req, "userId"));
      console.log(s);
    } catch (e) {
      console.log(e);
    }
    res.render("top");
  }
}

export default new Top();
