//导入模块
const mongodb = require('./tool/02.mongodb抽取'),
    express = require('express'),
    multer = require('multer'),
    path = require('path'),
    upload = multer({
        dest: './views/imgs'
    }),
    //实例化服务器
    app = express()

//托管静态文件
app.use(express.static('./views'))

//获取英雄列表逻辑
app.get('/heroList', (req, res) => {
    const pageNum = +req.query.pageNum,
        pageSize = +req.query.pageSize,
        query = req.query.query

    mongodb.find('cqlist', {}, result => {
        result.reverse()
        const heroList = result.filter(v => {

            return v.heroName.indexOf(query) != -1 || v.skillName.indexOf(query) != -1
        })
        const totalPage = Math.ceil(heroList.length / pageSize),
            startpage = (pageNum - 1) * pageSize,
            overPage = startpage + pageSize
        
        let queryList = []
       
        for (let i = startpage; i < overPage; i++) {
           if(heroList[i]){
            queryList.push(heroList[i])
           }
        }
        // console.log(queryList.heroName);
        res.send({
            totalPage,
            queryList
        })
    })

})

//查看英雄详情逻辑
app.get('/heroDetail', (req, res) => {
    const id = req.query.id
    mongodb.find('cqlist', {
        _id: mongodb.ObjectId(id)
    }, result => {
        console.log(result);
        res.send(result[0]);
    })
})

//新增英雄逻辑
app.post('/addHero', upload.single('heroIcon'), (req, res) => {
    const heroName = req.body.heroName,
        skillName = req.body.skillName,
        heroIcon = path.join('imgs', req.file.filename)

    mongodb.insertOne('cqlist', {
        heroName,
        skillName,
        heroIcon
    }, result => {
        console.log(result);
        res.send({
            mes: '新增成功',
            code: 200
        })
    })
})

//修改英雄逻辑
app.post('/updateHero', upload.single('heroIcon'), (req, res) => {
    const heroName = req.body.heroName,
        skillName = req.body.skillName,
        id = req.body.id
        // console.log(req.file);
    if(req.file){
       const heroIcon = path.join('imgs', req.file.filename)
        mongodb.update('cqlist',{_id:mongodb.ObjectId(id)},{
            heroName,
            skillName,
            heroIcon
        }, result => {
            // console.log(result);
            res.send({
                mes: '修改成功',
                code: 200
            })
        })
    }else{
        mongodb.update('cqlist',{_id:mongodb.ObjectId(id)},{
            heroName,
            skillName
        }, result => {
            console.log(result);
            res.send({
                mes: '修改成功',
                code: 200
            })
        })
    }
})

//删除英雄逻辑
app.get('/deleteHero',(req,res)=>{
    const id = req.query.id

    mongodb.deleteOne('cqlist',{_id: mongodb.ObjectId(id)},result=>{
        res.send({
            mes: '删除成功',
            code: 200
        })
    })
})


//开启监听
app.listen(600)

