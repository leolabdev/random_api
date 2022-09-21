exports.handleGetResp = (req, res) => {
    if(res.isSuccess){
        res.json({
            hasAccess: true,
            message: "Data has been found",
            result: res.result
        });
    } else{
        res.json({
            hasAccess: false,
            message: "No data found",
            result: {}
        });
    }

    res.end();
}

exports.handlePostResp = (req, res) => {
    if(res.isSuccess){
        res.json({
            hasAccess: true,
            message: "Data has been added"
        });
    } else{
        res.json({
            hasAccess: false,
            message: "Problems with adding data"
        });
    }

    res.end();
}