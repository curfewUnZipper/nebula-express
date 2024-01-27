const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({user: String,
    orderQty:Object,
    orderProduct:Object,
    order: Object                                        
    })
ORDER = mongoose.model("orders", orderSchema)

module.exports = ORDER