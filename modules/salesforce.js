import jsforce from "jsforce";

export default class SalesforceConnector {
  constructor(accessToken, instanceUrl) {
    this.connect = new jsforce.Connection({
      version: "52.0",
      loginUrl:
        process.env.SALESFORCE_LOGIN_URL || "https://login.salesforce.com",
      accessToken: accessToken,
      instanceUrl: instanceUrl,
    });
  }

  async login(email, password) {
    try {
      return await this.connect.login(email, password);
    } catch (e) {
      throw "ユーザ名、パスワードが間違えてます。";
    }
  }

  async userInfo(userId) {
    try {
      const result = await this.query(`
        SELECT
          Id,
          Name
        FROM
          User
        WHERE
          Id='${userId}'`);
      if (result.records.length === 0) {
        throw "USER_EMPTY";
      }
      return result.records[0];
    } catch (e) {
      return e;
    }
  }

  async connectApi() {
    await this.connect.login(
      process.env.SALESFORCE_USERNAME,
      process.env.SALESFORCE_PASSWORD
    );
  }

  async query(queryString) {
    try {
      await this.connectApi();
      return await this.connect.query(queryString);
    } catch (e) {
      throw e.errorCode;
    }
  }

  async create(sObject, data) {
    try {
      await this.connectApi();
      return await this.connect.sobject(sObject).create(data);
    } catch (e) {
      throw e.errorCode;
    }
  }

  async update(sObject, data) {
    try {
      await this.connectApi();
      return await this.connect.sobject(sObject).update(data);
    } catch (e) {
      throw e.errorCode;
    }
  }
}
