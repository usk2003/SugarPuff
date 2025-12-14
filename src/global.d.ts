declare global{
    var mongoose:{
        connection:Connection | null, // mongoose lo connection type
        promise: Promise<Connection> | null
    }
}

export {}