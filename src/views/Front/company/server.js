var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var express = require("express"); //引入express框架
var ObjectID = require('mongodb').ObjectID; //用于mongodb自身id的转化
var app = express();
var us = {}; //存储用户登录状态时间戳,与前台返回的时间戳不一致时证明在别处登录
var ejs = require('ejs');
app.set("views", "../views");
app.engine('html', ejs.__express);
app.set('view engine', 'html');
app.use(express.static('../views')); //配置静态资源文件路径
app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "content-type");
  res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
  if (req.method.toLowerCase() == 'options')
    res.send(200);
  else
    next();
}) //配置跨域
MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
  if (err) throw err;
  var dbo = db.db("a5");
  dbo.collection("users").updateMany({login: 1}, {$set: {login: 0}}, function (err, update) {
    if (err) throw err;
    console.log(update.result.nModified + ' Update to 0.')
  })
}) //服务器开始运行时移除所有用户的登录状态

app.get('/', function (req, res) {
  res.type('html');
  res.render('Login');
  console.log("Login Open.")
}) //访问登录页面

app.post('/Login', function (req, res) {
  req.on('data', function (data) {
    data = JSON.parse(data);
    MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
      if (err) throw err;
      var dbo = db.db("a5");
      dbo.collection("users").find({account: data.account, password: data.password}).toArray(function (err, result) { // 返回集合中所有数据
        if (err) throw err;
        if (result.length == 0) {
          res.send(JSON.stringify({"statusNum": 200}));
          console.log("Login faild.")
          //200 账号密码错误
        } else if (data.user != result[0]._id && data.user != null) {
          res.send(JSON.stringify({"statusNum": 500, id: result[0]._id, url: 'http://127.0.0.1:3000/' + result[0]._id}))
          //500 本地登陆的用户不是该用户,提示已有其他用户登录
        } else if (result.length > 0 && result[0].login == 0) {
          us[result[0]._id] = new Date().getTime();
          var str = "/" + result[0]._id;
          app.get(str, function (req, res) {
            res.type('html');
            res.render('main');
            console.log("Home Open.")
          })
          dbo.collection("users").updateOne({_id: result[0]._id}, {$set: {login: 1}}, function (err, update) {
            if (err) throw err;
            console.log("Login successfully.")
          })
          res.send(JSON.stringify({
            "statusNum": 100,
            url: 'http://127.0.0.1:3000' + str,
            id: result[0]._id,
            timestamp: us[result[0]._id + '']
          }));
          //100 账号密码正确且未在他处登录同时没有其他用户在此登录,配置独有的地址，返回地址,以及登录状态判断时间戳,用于用户在别处登陆时在此处退出登录
        } else if (result[0].login == 1) {
          res.send(JSON.stringify({
            "statusNum": 300,
            id: result[0]._id,
            url: 'http://127.0.0.1:3000/' + result[0]._id
          }));
          console.log("Already logged in elsewhere.")
          //300 账号密码正确但已经在别处登录
        }
        db.close();
      });
    });
  })
})


app.get('/Register', function (req, res) {
  res.type('html');
  res.render('Register');
  console.log("Register Open.")
  //打开注册页面
})


app.post('/RegisterAccount', function (req, res) {
  req.on('data', function (data) {
    data = JSON.parse(data);
    MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
      if (err) throw err;
      var dbo = db.db("a5");
      dbo.collection('users').find({
        $or: [{
          name: {$eq: data.name}
        }, {
          account: {$eq: data.account}
        }]
        //判断账号和用户名是否重复
      }).toArray(function (err, result) { // 返回集合中所有数据
        if (err) throw err;
        if (result.length > 0) {
          db.close();
          res.send({statusNum: 200, text: "Register faild,account or name repeat."});
          //200 账号或用户名重复
        } else {
          data.login = 0;
          data.cardsnum = 10;
          dbo.collection('users').insertOne(data, function (err, inss) {
            if (err) throw err;
            console.log("Insert " + inss.insertedCount + "  data.");
            var rnum = Math.floor(Math.random() * 1267);
            dbo.collection('cards').find({}).skip(rnum).limit(10).toArray(function (err, card) {
              if (err) throw err;
              for (var i = 0; i < card.length; i++) {
                dbo.collection('user_card').insertOne({
                  user_id: inss.insertedId,
                  card_id: card[i]._id
                }, function (err, inst) {
                  if (err) throw err;
                  console.log("Insert to user_card  " + inst.insertedCount + "  data.");
                })
              }
              db.close();
              res.send({statusNum: 100, text: "Register Successful."});
              //100 账号或用户名未重复，将用户信息插入user表中
            })
          })
        }

      });
    });
  })
})


app.post('/switchlogin', function (req, res) {
  req.on('data', function (data) {
    data = JSON.parse(data);
    us[data.id] = data.timestamp;
    res.send('Switch login.')
  })
  //切换登录位置
})


app.post('/getstatus', function (req, res) {
  req.on('data', function (data) {
    data = JSON.parse(data);
    if ((us[data.id] == data.timestamp) && us[data.id] != undefined && data.timestamp != null) {
      res.send(true);
    } else {
      res.send(false);
    }
  })
  //获取登录状态时间戳，判断是否在别处登录
})


app.post('/finds', function (req, res) { //查找用户拥有的卡牌
  req.on('data', function (data) {
    data = JSON.parse(data);
    MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
      if (err) throw err;
      var dbo = db.db("a5");
      dbo.collection('user_card').find({user_id: ObjectID(data.id)}).project({
        _id: 0,
        card_id: 1
      }).toArray(function (err, result) { // 返回集合中所有数据
        if (err) throw err;
        var r = [];
        for (var i = 0; i < result.length; i++) {
          r.push(result[i].card_id)
        }
        //根据用户id从user_card表中取出卡牌id数组r
        dbo.collection('cards').find({_id: {$in: r}}).toArray(function (err, ress) { // 返回集合中所有数据
          if (err) throw err;
          db.close();
          res.send(ress);
          //根据卡牌id数组r从cards表中获取详细的卡牌信息
        });

      });
    });
  })

})

app.post('/fincardsByR', function (req, res) { //根据稀有度查找用户拥有的卡牌
  req.on('data', function (data) {
    data = JSON.parse(data);
    MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
      if (err) throw err;
      var dbo = db.db("a5");
      dbo.collection('user_card').find({user_id: ObjectID(data.id)}).project({
        _id: 0,
        card_id: 1
      }).toArray(function (err, result) { // 返回集合中所有数据
        if (err) throw err;
        var r = [];
        for (var i = 0; i < result.length; i++) {
          r.push(result[i].card_id)
        }
        dbo.collection('cards').find({_id: {$in: r}, rarity: {$eq: data.rarity}}).toArray(function (err, ress) { // 返回集合中所有数据
          if (err) throw err;
          db.close();
          res.send(ress);
        });

      });
    });
  })

})


app.post('/getUser', function (req, res) {
  req.on('data', function (data) {
    data = JSON.parse(data);
    MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
      if (err) throw err;
      var dbo = db.db("a5");
      dbo.collection("users").find({_id: ObjectID(data.id)}).toArray(function (err, info) { // 返回集合中所有数据
        if (err) throw err;
        dbo.collection("cards").aggregate([{
          $lookup: {
            from: 'user_card',
            localField: '_id',
            foreignField: 'card_id',
            as: 'owner'
          }
        },
          {
            $match: {
              'owner.0.user_id': {$eq: ObjectID(data.id)},
            }

          },
          {
            $group: {_id: "$rarity", count: {$sum: 1}}
          }
        ]).toArray(function (err, statistics) {
          if (err) throw err;
          var result = {};
          result.info = info;
          result.statistics = statistics;
          db.close();
          res.send(result);
          //获取用户信息，包含用户基本信息和用户所拥有的各稀有度卡牌数量的统计信息

        })

      });
    });
  })
})


app.post('/sendTrade', function (req, res) { //发起卡牌交换请求
  req.on('data', function (data) {
    data = JSON.parse(data);
    data.user_1 = ObjectID(data.user_1);
    data.user_2 = ObjectID(data.user_2);
    for (i in data.u1c) {
      data.u1c[i] = ObjectID(data.u1c[i]);
    }
    for (i in data.u2c) {
      data.u2c[i] = ObjectID(data.u2c[i]);
    }
    MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
      if (err) throw err;
      var dbo = db.db("a5");
      dbo.collection("user_card").aggregate([{
        $lookup: { //lookup是mongoDB的连接操作
          from: 'cards',
          localField: 'card_id',
          foreignField: '_id',
          as: 'owner'
        } //此处的结果是在 user_card.card_id=cards._id 的前提下在user_card表中添加一个数组字段 owner存储cards表中对应的信息，前提不成立也会添加一个空的owner，所以下面要把空的owner删选出去
      },
        {
          $match: { //match是mongoDB的筛选操作
            owner: {$ne: []}, //ne是mongoDB的不等号
            $or: [{
              user_id: {$eq: data.user_1},
              card_id: {$in: data.u1c} //in是mongoDB中表示元素是否包含在某个元素里
            },
              {
                user_id: {$eq: data.user_2},
                card_id: {$in: data.u2c}
              }
            ]
          }
        }
        //判断请求交换的卡牌是否还在
      ]).toArray(function (err, reslut) {
        if (err) throw err;
        if (reslut.length == (data.u2c.length + data.u1c.length)) {
          dbo.collection("trades").insertOne({
            user_1: data.user_1,
            user_2: data.user_2,
            u1_cards: data.u1c,
            u2_cards: data.u2c
          }, function (err, ress) {
            if (err) throw err;
            console.log('Send Successful  ' + ress.insertedCount + "  data.");
            db.close();
            res.send("Send Successful.")

          })
          //如果还在就向trades表中插入交换信息
        } else {
          db.close();
          res.send("Send failed,Some cards changed.");
        }
      })
    })
  })
})


app.post('/regectTrade', function (req, res) {
  req.on('data', function (data) {
    data = JSON.parse(data);
    MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
      if (err) throw err;
      var dbo = db.db("a5");
      dbo.collection("trades").deleteOne({_id: ObjectID(data.id)}, function (err, obj) {
        if (err) throw err;
        console.log(obj.result.n + " data be deleted.");
        db.close();
        res.send("Regect Successful.");
        //拒绝交换请求，从trades表中删除交换信息
      })
    })
  })
})

app.post('/confirmTrade', function (req, res) { //接受交易请求
  req.on('data', function (data) {
    data = JSON.parse(data);
    MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
      if (err) throw err;
      var dbo = db.db("a5");
      dbo.collection("trades").find({_id: ObjectID(data.id)}).toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
        dbo.collection("user_card").find({
          $or: [{
            user_id: {$eq: result[0].user_1}, //eq是mongoDB的等号
            card_id: {$in: result[0].u1_cards}
          },
            {
              user_id: {$eq: result[0].user_2},
              card_id: {$in: result[0].u2_cards}
            }
          ]
          //判断交易中的卡牌是否还在
        }).toArray(function (err, ress) {
          if (err) throw err;
          if (ress.length == (result[0].u1_cards.length + result[0].u2_cards.length)) {
            dbo.collection("user_card").updateMany({
              user_id: {$eq: result[0].user_1},
              card_id: {$in: result[0].u1_cards}
            }, {$set: {user_id: result[0].user_2}}, function (err, upp) {
              if (err) throw err;
              console.log(upp.result.nModified + " datas be updated.");
            })
            dbo.collection("user_card").updateMany({
              user_id: {$eq: result[0].user_2},
              card_id: {$in: result[0].u2_cards}
            }, {$set: {user_id: result[0].user_1}}, function (err, upp) {
              if (err) throw err;
              console.log(upp.result.nModified + " datas be updated.");
            })
            //交换交易信息中卡牌的所有权
            dbo.collection("users").updateOne({_id: {$eq: result[0].user_1}}, {$inc: {cardsnum: result[0].u2_cards.length - result[0].u1_cards.length}}, function (err, upp) {
              if (err) throw err; //inc是 =+
              console.log(upp.result.nModified + " datas be updated.");
            })
            dbo.collection("users").updateOne({_id: {$eq: result[0].user_2}}, {$inc: {cardsnum: result[0].u1_cards.length - result[0].u2_cards.length}}, function (err, upp) {
              if (err) throw err;
              console.log(upp.result.nModified + " datas be updated.");
            })
            //更新用户所拥有的卡牌数量
            dbo.collection("trades").deleteOne({_id: ObjectID(data.id)}, function (err, dee) {
              if (err) throw err;
              console.log(dee.result.n + " datas be deleted.");
            })
            //交易完成，删除交易信息
            db.close();
            res.send("Confirm Successful.");
          } else {
            dbo.collection("trades").deleteOne({_id: ObjectID(data.id)}, function (err, de) {
              if (err) throw err;
              console.log(de.result.n + " datas be deleted.");
            })
            //交易中的卡牌发生变化，删除交易信息
            db.close();
            res.send("Confirm failed,Some cards changed.");
          }

        })
      })
    })
  })
})


app.post('/getTrade', function (req, res) { //获取交易列表
  req.on('data', function (data) {
    data = JSON.parse(data);
    MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
      if (err) throw err;
      var dbo = db.db("a5");
      var r = [];
      dbo.collection("trades").aggregate([{
        $lookup: {
          from: 'users',
          localField: 'user_1',
          foreignField: '_id',
          as: 'trade_from'
        }
      }, {
        $match: {
          'user_2': {$eq: ObjectID(data.id)}
        }
      }, {
        $lookup: {
          from: 'cards',
          localField: 'u1_cards',
          foreignField: '_id',
          as: 'his_card'
        }
      },
        {
          $lookup: {
            from: 'cards',
            localField: 'u2_cards',
            foreignField: '_id',
            as: 'my_card'
          }
        }
      ]).toArray(function (err, result) {
        if (err) throw err;
        for (var i = 0; i < result.length; i++) {
          r.push({
            trade_id: result[i]._id,
            id: result[i].trade_from[0]._id,
            name: result[i].trade_from[0].name,
            my_cards: result[i].my_card,
            his_cards: result[i].his_card
          });
        }
        //r中的每个元素的字段分别对应交易id,请求交易的用户id,用户名，我需要给出的卡牌数组，他给我的卡牌数组
        db.close();
        res.send(r);
      })

    })
  })
})

app.post('/logout', function (req, res) { //登出账号
  req.on('data', function (data) {
    data = JSON.parse(data);
    MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
      if (err) throw err;
      var dbo = db.db("a5");
      dbo.collection("users").updateOne({_id: ObjectID(data.id)}, {$set: {login: 0}}, function (err, update) {
        if (err) throw err;
        console.log("Logout successfully.")
        db.close();
        res.send("Logout successfully.");
        delete us[data.id];
        //更新users表中的登陆状态loginz字段为0，从登录状态判断对象us中移除该用户
      })

    });
  })
})


app.post('/passFRequest', function (req, res) { //通过好友验证请求
  req.on('data', function (data) {
    data = JSON.parse(data);
    MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
      if (err) throw err;
      var dbo = db.db("a5");
      dbo.collection("user_user").updateOne({_id: ObjectID(data.id)}, {$set: {contact: 1}}, function (err, del) {
        if (err) throw err;
        console.log(del.result.n + " datas be updated.");
        db.close();
        res.send("Pass successfully.");
        //更新user_user表中对应的好友关系状态contact为1代表已添加
      })

    });
  })
})

app.post('/deleteFriend', function (req, res) {
  req.on('data', function (data) {
    data = JSON.parse(data);
    MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
      if (err) throw err;
      var dbo = db.db("a5");
      dbo.collection("user_user").deleteOne({_id: ObjectID(data.id)}, function (err, del) {
        if (err) throw err;
        console.log(del.result.n + " datas be deleted.");
        db.close();
        res.send("Delete/Refuse successfully.");
        //删除user_user表中对应的好友关系
      })
    });
  })
})

app.post('/addFriend', function (req, res) {
  req.on('data', function (data) {
    data = JSON.parse(data);
    MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
      if (err) throw err;
      var dbo = db.db("a5");
      dbo.collection("user_user").find({
        $or: [{
          user_1: {$eq: ObjectID(data.user_1)},
          user_2: {$eq: ObjectID(data.user_2)},
        }, {
          user_1: {$eq: ObjectID(data.user_2)},
          user_2: {$eq: ObjectID(data.user_1)},
        }]
        //判断是否已经发送过请求
      }).toArray(function (err, reslut) {
        if (err) throw err;
        console.log(reslut.length);
        if (reslut.length == 0) {
          dbo.collection("user_user").insertOne({
            user_1: ObjectID(data.user_1),
            user_2: ObjectID(data.user_2),
            contact: 0
          }, function (err, inss) {
            if (err) throw err;
            console.log("Insert " + inss.insertedCount + "  data.");
            db.close();
            res.send("Request sent successfully.");
            //没发送过请求则在user_user表中创建新的关系，并且状态contact为0,表示已申请未审批
          })
        } else {
          db.close();
          res.send("Request sent faild,you have already sent before.");
        }
      })

    });
  })
})


app.post('/getFriends', function (req, res) { //获取好友列表，包括已添加和为通过验证的好友信息
  req.on('data', function (data) {
    data = JSON.parse(data);
    MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
      if (err) throw err;
      var dbo = db.db("a5");
      dbo.collection("user_user").aggregate([{
        $lookup: {
          from: 'users',
          localField: 'user_1',
          foreignField: '_id',
          as: 'ship1'
        }
      },
        {
          $lookup: {
            from: 'users',
            localField: 'user_2',
            foreignField: '_id',
            as: 'ship2'
          }
        },
        {
          $match: {
            $or: [{'user_1': {$eq: ObjectID(data.id)}},
              {'user_2': {$eq: ObjectID(data.id)}}

            ]
          }
        }
      ]).toArray(function (err, reslut) {
        if (err) throw err;
        var r = {ToBeAdded: [], Added: []}
        for (var i = 0; i < reslut.length; i++) {
          if (reslut[i].contact == 1) { //状态为1为已添加
            if (reslut[i].ship1[0]._id != data.id) {
              reslut[i].ship1[0].ship_id = reslut[i]._id;
              r.Added.push(reslut[i].ship1[0]);
            } else {
              reslut[i].ship2[0].ship_id = reslut[i]._id;
              r.Added.push(reslut[i].ship2[0]);
            }
          } else { //状态为0为未添加
            if (reslut[i].ship2[0]._id == data.id) {
              reslut[i].ship1[0].ship_id = reslut[i]._id;
              r.ToBeAdded.push(reslut[i].ship1[0]);
            }
          }
        }
        db.close();
        res.send(r);

      })
    })
  })
})

app.post('/findFriend', function (req, res) {
  req.on('data', function (data) {
    data = JSON.parse(data);
    MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
      if (err) throw err;
      var dbo = db.db("a5");
      dbo.collection("users").aggregate([{
        $lookup: {
          from: 'user_user',
          localField: '_id',
          foreignField: 'user_1',
          as: 'ship1'
        }
      },
        {
          $lookup: {
            from: 'user_user',
            localField: '_id',
            foreignField: 'user_2',
            as: 'ship2'
          }
        },
        {
          $match: {
            'ship1.user_1': {$ne: ObjectID(data.id)},
            'ship2.user_1': {$ne: ObjectID(data.id)},
            'ship1.user_2': {$ne: ObjectID(data.id)},
            'ship2.user_2': {$ne: ObjectID(data.id)},
            $or: [{name: new RegExp(data.key)}, {account: new RegExp(data.key)}, {email: new RegExp(data.key)}]
          }
        }
        //判断是否已经存在好友关系或已经发送好友请求
      ]).toArray(function (err, reslut) {
        if (err) throw err;
        for (var i = 0; i < reslut.length; i++) {
          delete reslut[i].ship1;
          delete reslut[i].ship2;
        }
        db.close();
        res.send(reslut);
        //返回name，account，email中包含用户输入字符串的用户信息
      })
    })
  })
})

var server = app.listen(3000, '127.0.0.1', function () {
  var host = server.address().address
  var port = server.address().port
  console.log(host, port)
})
