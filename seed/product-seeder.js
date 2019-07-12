let dbconfig=require('../dbconfig/db-connect');

dbconfig.connect(function (err) {
    if(err){
        console.log('DB-Connection Error');
        process.exit(1);
    }else{
        console.log('connected successfully')

        dbconfig.get().collection('product').insertMany([{
            imagePath:'https://images.g2a.com/newlayout/323x433/1x1x0/0017f67ada95/59e60aeaae653a34fe0e9633',
            title:'PUBG PC Blue-Ray',
            description:'sfsdf fdgsg sgfsgf gfdg sfdg fdg fd gs dgdfdgfdgfd gdfg sfdgd',
            price:'20'
        },{
            imagePath:'https://images-eds-ssl.xboxlive.com/image?url=8Oaj9Ryq1G1_p3lLnXlsaZgGzAie6Mnu24_PawYuDYIoH77pJ.X5Z.MqQPibUVTcwkMYknDgWXahdPiLuy3BtAUBO5yYbA756VRozxElu9q2H2PJvm5KORwTLn_Y4ehrq67vtLKW3pNXfVZwRrer8kb2V9yQ1xGixYwr2.7alpLmjRs9Hzk4nntVrVL9eTCJI16S9QZa8oIYlaZKsfcE7Hzr0SgkBU7ZStln9LfNwtw-&h=225&w=150&format=jpg',
            title:'NFS PayBack PC Blue-Ray',
            description:'sfsdf fdgsg sgfsgf gfdg sfdg fdg fd gs dgdfdgfdgfd gdfg sfdgd',
            price:'12'
        },{
            imagePath:'https://images-na.ssl-images-amazon.com/images/I/81BgPnK9iDL._SY500_.jpg',
            title:'Call of Duty PC Blue-Ray',
            description:'sfsdf fdgsg sgfsgf gfdg sfdg fdg fd gs dgdfdgfdgfd gdfg sfdgd',
            price:'12'
        },{
            imagePath:'https://store.ubi.com/dw/image/v2/ABBS_PRD/on/demandware.static/-/Sites-masterCatalog/en_US/dw7889b3a2/images/large/5cc81f5f6b54a4cd3c0e9cfd.jpg?sw=220&sh=440&sm=fit',
            title:'Ghost Recon PC Blue-Ray',
            description:'sfsdf fdgsg sgfsgf gfdg sfdg fdg fd gs dgdfdgfdgfd gdfg sfdgd',
            price:'12'
        },{
            imagePath:'https://ubistatic19-a.akamaihd.net/ubicomstatic/en-us/global/game-info/watchdogs_box_mobile_mobile_157439.jpg',
                title:'Watch Dogs PC Blue-Ray',
                description:'sfsdf fdgsg sgfsgf gfdg sfdg fdg fd gs dgdfdgfdgfd gdfg sfdgd',
                price:'12'
        },{
            imagePath:'https://cdn.cdkeys.com/500x706/media/catalog/product/m/g/mgsv-gz.jpg',
            title:'Metal Gear Solid PC Blue-Ray',
            description:'sfsdf fdgsg sgfsgf gfdg sfdg fdg fd gs dgdfdgfdgfd gdfg sfdgd',
            price:'50'
        }]);

    }
});