const AccessControl = require("accesscontrol");
const ac = new AccessControl();

ac.grant("basic")
  .readAny("problem")
  .createAny("submission")

ac.grant("supervisor")
  .extend("basic")
  .createAny("problem")
  .createAny("test")


// ac.grant("admin")
//   .extend("basic")
//   .extend("supervisor")
//   .updateAny("profile")
//   .deleteAny("profile")

module.exports = ac;

