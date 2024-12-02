const router = require("express").Router();
const User = require("../models/User");

// CRUD
// ユーザー情報の更新
router.put("/:id", async (req, res) => {
  if(req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      return res.status(200).json("Account has been updated");
    }catch (err) {
      return res.status(500).json(err);
    }
  }else {
    return res.status(403).json("you can update only your account!");
  }
});

// ユーザー情報の消去
router.delete("/:id", async (req, res) => {
  if(req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      return res.status(200).json("Account has been deleted");
    }catch (err) {
      return res.status(500).json(err);
    }
  }else {
    return res.status(403).json("you can delete only your account!");
  }
});

// ユーザー情報の取得
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, updatedAt, ...other } = user._doc;
    return res.status(200).json(other);
  }catch (err) {
    return res.status(500).json(err);
  }
});

// ユーザーのフォロー
router.put("/:id/follow", async (req, res) => {
  if(req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      // フォロワーに自分がいなかったらフォローできる
      if(!user.followers.includes(req.body.userId)) {
        await user.updateOne({
          $push: {
            followers: req.body.userId,
          }
        })
        await currentUser.updateOne({
          $push: {
            followings: req.params.id,
          }
        })
        return res.status(200).json("user has been followed");
      }else {
        return res.status(403).json("you already follow this user");
      }

    }catch (err) {
      return res.status(500).json(err);
    }
  }else {
    return res.status(403).json("you can't follow yourself!");
  }
});


// ユーザーのフォローを外す
router.put("/:id/unfollow", async (req, res) => {
  if(req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      // フォロワーに自分がいなかったらフォローできる
      if(user.followers.includes(req.body.userId)) {
        await user.updateOne({
          $pull: {
            followers: req.body.userId,
          }
        })
        await currentUser.updateOne({
          $pull: {
            followings: req.params.id,
          }
        })
        return res.status(200).json("user has been unfollowed");
      }else {
        return res.status(403).json("you don't follow this user");
      }

    }catch (err) {
      return res.status(500).json(err);
    }
  }else {
    return res.status(403).json("you can't unfollow yourself!");
  }
});

module.exports = router;
