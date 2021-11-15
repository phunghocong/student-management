module.exports = mongoose => {
  var accountSchema = mongoose.Schema(
    {
      username: String,
      password: String,
      firstName: String,
      surName: String,
      email: String,
      published: Boolean,
      messageOn: Boolean,
      isStudent: Boolean,//nếu là sinh viên
      avatarColor: String,
    },
    { timestamps: true }
  );

  accountSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Account = mongoose.model("account", accountSchema);
  return Account;
};