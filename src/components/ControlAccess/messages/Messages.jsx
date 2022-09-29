const Messages = () => {

    const messages = [
        {id : 1, username : "petya" , message : "hello i am petya" },
        {id : 2, username : "vasya" , message : "hello i am vasya" },
        {id : 3, username : "misha" , message : "hello i am misha" },
        {id : 4, username : "leo" , message : "hello i am leo" },
        {id : 5, username : "andrew" , message : "hello i am andrew" },
    ]

    return (
        <div>
            {
                messages.map((m)=> (

                    <div>
                        <div>{m.id}</div>
                        <div>{m.username}</div>
                        <div>{m.message}</div>
                    </div>

                ))
            }
        </div>
    );
};

export default Messages;
