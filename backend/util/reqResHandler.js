exports.handleGetResp = (req, res) => {
    if(res.isSuccess){
        res.json({
            isSuccess: true,
            message: "Data has been found",
            result: res.result
        });
    } else{
        res.json({
            isSuccess: false,
            message: "No data found",
            result: {}
        });
    }

    res.end();
}

exports.handlePostResp = (req, res) => {
    if(res.isSuccess){
        res.json({
            isSuccess: true,
            message: "Data has been added"
        });
    } else{
        res.json({
            isSuccess: false,
            message: "Problems with adding data"
        });
    }

    res.end();
}

exports.handlePutResp = (req, res) => {
    if(res.isSuccess){
        res.json({
            isSuccess: true,
            message: "Data has been updated"
        });
    } else{
        res.json({
            isSuccess: false,
            message: "Problems with updating data"
        });
    }

    res.end();
}

exports.handleDeleteResp = (req, res) => {
    if(res.isSuccess){
        res.json({
            isSuccess: true,
            message: "Data has been deleted"
        });
    } else{
        res.json({
            isSuccess: false,
            message: "Problems with deleting data"
        });
    }

    res.end();
}